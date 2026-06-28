import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { verifyAdmin } from "@/lib/auth";
import { COMPANY } from "@/lib/company";

// Number to Words Helper for UAE Dirhams
function numberToWords(amount: number): string {
  const units = ["", "One", "Two", "Three", "Four", "Five", "Six", "Seven", "Eight", "Nine", "Ten", "Eleven", "Twelve", "Thirteen", "Fourteen", "Fifteen", "Sixteen", "Seventeen", "Eighteen", "Nineteen"];
  const tens = ["", "", "Twenty", "Thirty", "Forty", "Fifty", "Sixty", "Seventy", "Eighty", "Ninety"];
  const scales = ["", "Thousand", "Million", "Billion"];

  if (amount === 0) return "Zero Dirhams Only";

  const dirhams = Math.floor(amount);
  const fils = Math.round((amount - dirhams) * 100);

  function helper(num: number): string {
    if (num < 20) return units[num];
    if (num < 100) return tens[Math.floor(num / 10)] + (num % 10 !== 0 ? " " + units[num % 10] : "");
    return units[Math.floor(num / 100)] + " Hundred" + (num % 100 !== 0 ? " and " + helper(num % 100) : "");
  }

  let scaleIndex = 0;
  let remainingDirhams = dirhams;
  const parts = [];

  while (remainingDirhams > 0) {
    const chunk = remainingDirhams % 1000;
    if (chunk > 0) {
      const chunkStr = helper(chunk);
      const scale = scales[scaleIndex];
      parts.unshift(chunkStr + (scale ? " " + scale : ""));
    }
    remainingDirhams = Math.floor(remainingDirhams / 1000);
    scaleIndex++;
  }

  let result = parts.join(", ") + " United Arab Emirates Dirhams";
  if (fils > 0) {
    result += " and " + helper(fils) + " Fils";
  }
  result += " Only";

  return result;
}

// GET all invoices
export async function GET(req: Request) {
  const isAdmin = await verifyAdmin();
  if (!isAdmin) {
    return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
  }

  try {
    const invoices = await prisma.invoice.findMany({
      include: {
        client: {
          select: {
            id: true,
            company: true,
            contactPerson: true,
            email: true,
          },
        },
        project: {
          select: {
            id: true,
            projectName: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json({
      success: true,
      invoices,
    });
  } catch (error) {
    console.error("Failed to fetch invoices:", error);
    return NextResponse.json({ success: false, message: "Failed to fetch invoices" }, { status: 500 });
  }
}

// POST create invoice
export async function POST(req: Request) {
  const isAdmin = await verifyAdmin();
  if (!isAdmin) {
    return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await req.json();
    const {
      invoiceNumber,
      invoiceDate,
      dueDate,
      clientId,
      projectId,
      status = "DRAFT",
      vatRate = 5.0,
      discount = 0.0,
      notes,
      authorizedBy = "Authorized By",
      founderName = COMPANY.ceoName,
      designation = COMPANY.ceoDesignation,
      items = [],
    } = body;

    if (!invoiceNumber || !invoiceDate || !dueDate || !clientId || items.length === 0) {
      return NextResponse.json({ success: false, message: "Missing required fields or item list is empty" }, { status: 400 });
    }

    let actualClientId = clientId;
    let actualProjectId = projectId;

    if (clientId === "manual" && body.manualClientData) {
      const { company, contactPerson, email, phone, address, projectName } = body.manualClientData;
      if (!company || !contactPerson || !email || !phone) {
        return NextResponse.json({ success: false, message: "Missing required fields for manual client entry" }, { status: 400 });
      }

      // Create new client
      const newClient = await prisma.client.create({
        data: {
          company,
          contactPerson,
          email,
          phone,
          address: address || "",
          notes: "Auto-created from manual/offline invoice builder entry.",
        }
      });
      actualClientId = newClient.id;

      // Create new project if projectName provided
      if (projectName && projectName.trim()) {
        const newProject = await prisma.project.create({
          data: {
            projectName: projectName.trim(),
            clientName: contactPerson,
            email,
            phone,
            company,
            service: "Consulting",
            status: "IN_PROGRESS",
            progress: 0,
            clientId: newClient.id,
          }
        });
        actualProjectId = newProject.id;
      }
    }

    // Check for duplicate invoice number
    const existing = await prisma.invoice.findUnique({
      where: { invoiceNumber },
    });
    if (existing) {
      return NextResponse.json({ success: false, message: `Invoice number ${invoiceNumber} already exists` }, { status: 400 });
    }

    // Calculate totals
    let subtotal = 0;
    const formattedItems = items.map((item: any, idx: number) => {
      const quantity = parseFloat(item.quantity) || 0;
      const unitPrice = parseFloat(item.unitPrice) || 0;
      const amount = quantity * unitPrice;
      subtotal += amount;

      return {
        serialNumber: idx + 1,
        description: item.description,
        quantity,
        unitPrice,
        amount,
      };
    });

    const vatAmount = subtotal * (parseFloat(vatRate) / 100);
    const discVal = parseFloat(discount) || 0;
    const grandTotal = subtotal + vatAmount - discVal;
    const amountInWords = numberToWords(grandTotal);

    const invoice = await prisma.invoice.create({
      data: {
        invoiceNumber,
        invoiceDate: new Date(invoiceDate),
        dueDate: new Date(dueDate),
        clientId: actualClientId,
        projectId: actualProjectId || null,
        status,
        subtotal,
        vatRate: parseFloat(vatRate),
        vatAmount,
        discount: discVal,
        grandTotal,
        amountInWords,
        notes,
        authorizedBy,
        founderName,
        designation,
        paymentStatus: status === "PAID" ? "PAID" : "UNPAID",
        items: {
          create: formattedItems,
        },
      },
      include: {
        items: true,
      },
    });

    return NextResponse.json({
      success: true,
      invoice,
    });
  } catch (error: any) {
    console.error("Failed to create invoice:", error);
    return NextResponse.json({ success: false, message: error.message || "Failed to create invoice" }, { status: 500 });
  }
}
