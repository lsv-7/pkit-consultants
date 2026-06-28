import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getClientIp, rateLimit } from "@/lib/rate-limit";
import { CommunicationService } from "@/lib/communication/communication";

export async function POST(req: Request) {
  const ip = getClientIp(req);
  const limit = rateLimit(`contact:${ip}`, 5, 60_000);
  if (!limit.success) {
    return NextResponse.json(
      { success: false, message: "Too many requests. Please try again shortly." },
      { status: 429 }
    );
  }

  try {
    const body = await req.json();

    // 1. Mandatory Fields Validation (Simplified: Name, Company, Email, Phone)
    const { fullName, email, phone, company } = body;
    
    if (!fullName || typeof fullName !== "string" || !fullName.trim()) {
      return NextResponse.json({ success: false, message: "Full Name is required" }, { status: 400 });
    }
    if (!email || typeof email !== "string" || !email.trim()) {
      return NextResponse.json({ success: false, message: "Email address is required" }, { status: 400 });
    }
    if (!phone || typeof phone !== "string" || !phone.trim()) {
      return NextResponse.json({ success: false, message: "Phone number is required" }, { status: 400 });
    }

    // 2. Length & Format Validations
    if (fullName.length > 100) {
      return NextResponse.json({ success: false, message: "Full name must not exceed 100 characters" }, { status: 400 });
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ success: false, message: "Invalid email address format" }, { status: 400 });
    }
    if (email.length > 150) {
      return NextResponse.json({ success: false, message: "Email address must not exceed 150 characters" }, { status: 400 });
    }
    
    const cleanPhone = phone.replace(/[\s\-\+\(\)]/g, "");
    if (cleanPhone.length < 7 || phone.length > 25) {
      return NextResponse.json({ success: false, message: "Phone number must be between 7 and 25 characters" }, { status: 400 });
    }
    if (company && company.length > 100) {
      return NextResponse.json({ success: false, message: "Company name must not exceed 100 characters" }, { status: 400 });
    }

    const cleanEmail = email.trim().toLowerCase();

    const lead = await prisma.lead.create({
      data: {
        fullName: body.fullName.trim(),
        email: cleanEmail,
        phone: body.phone.trim(),
        company: body.company || "",
        service: body.service || "General Consulting",
        budget: body.budget || "Not Specified",
        contactMethod: body.contactMethod || "Email",
        timeline: body.timeline || "Not Specified",
        projectDescription: body.projectDescription || "General consultation request.",
      },
    });

    // Create New Lead Notification inside DB
    await prisma.notification.create({
      data: {
        type: "NEW_LEAD",
        title: "New Consultation Request",
        message: `${lead.fullName} submitted a consultation request for ${lead.company || "Individual"}.`,
        read: false,
      },
    });

    // Trigger Enterprise Communication Service
    // 1. Send confirmation email to the visitor
    try {
      await CommunicationService.sendConsultationConfirmation(lead.id, lead.fullName, lead.email);
    } catch (err: any) {
      console.error("[Contact API] Failed to trigger visitor confirmation email:", err);
      await prisma.sentEmail.create({
        data: {
          recipient: lead.email,
          subject: "Thank you for contacting PKIT Consultants",
          body: "Failed to render or queue confirmation email.",
          type: "CONSULTATION_CONFIRMATION",
          status: "FAILED",
          errorMessage: err.message || "Synchronous dispatch error",
          leadId: lead.id,
        }
      }).catch(e => console.error("Failed to log failed visitor email:", e));
    }

    // 2. Send notification alert email to PKIT
    try {
      await CommunicationService.notifyAdminOfConsultation(lead.id, lead.fullName, lead.company || "", lead.email, lead.phone);
    } catch (err: any) {
      console.error("[Contact API] Failed to trigger admin notification email:", err);
      await prisma.sentEmail.create({
        data: {
          recipient: "mpkitconsultants@gmail.com",
          subject: `New Consultation Request – ${lead.company || "Individual"}`,
          body: "Failed to render or queue admin alert email.",
          type: "ADMIN_NOTIFICATION",
          status: "FAILED",
          errorMessage: err.message || "Synchronous dispatch error",
          leadId: lead.id,
        }
      }).catch(e => console.error("Failed to log failed admin email:", e));
    }

    return NextResponse.json({
      success: true,
      lead,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message: "Something went wrong",
      },
      {
        status: 500,
      }
    );
  }
}