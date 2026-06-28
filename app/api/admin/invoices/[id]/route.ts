import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { verifyAdmin } from "@/lib/auth";

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

type Props = {
  params: Promise<{ id: string }>;
};

// GET single invoice details
export async function GET(req: Request, { params }: Props) {
  const isAdmin = await verifyAdmin();
  if (!isAdmin) {
    return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;

  try {
    const invoice = await prisma.invoice.findUnique({
      where: { id },
      include: {
        items: {
          orderBy: {
            serialNumber: "asc",
          },
        },
        client: true,
        project: true,
        payments: {
          orderBy: {
            paymentDate: "desc",
          },
        },
      },
    });

    if (!invoice) {
      return NextResponse.json({ success: false, message: "Invoice not found" }, { status: 404 });
    }

    return NextResponse.json({
      success: true,
      invoice,
    });
  } catch (error) {
    console.error("Failed to fetch invoice details:", error);
    return NextResponse.json({ success: false, message: "Failed to fetch invoice" }, { status: 500 });
  }
}

// PUT update invoice details
export async function PUT(req: Request, { params }: Props) {
  const isAdmin = await verifyAdmin();
  if (!isAdmin) {
    return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;

  try {
    const body = await req.json();
    const {
      invoiceNumber,
      invoiceDate,
      dueDate,
      clientId,
      projectId,
      status,
      vatRate = 5.0,
      discount = 0.0,
      notes,
      authorizedBy,
      founderName,
      designation,
      items = [],
    } = body;

    if (!invoiceNumber || !invoiceDate || !dueDate || !clientId || items.length === 0) {
      return NextResponse.json({ success: false, message: "Missing required fields or item list is empty" }, { status: 400 });
    }

    // Check duplicate invoiceNumber (excluding current invoice)
    const existing = await prisma.invoice.findFirst({
      where: {
        invoiceNumber,
        NOT: { id },
      },
    });
    if (existing) {
      return NextResponse.json({ success: false, message: `Invoice number ${invoiceNumber} is already in use` }, { status: 400 });
    }

    // Check if invoice exists
    const currentInvoice = await prisma.invoice.findUnique({
      where: { id },
    });
    if (!currentInvoice) {
      return NextResponse.json({ success: false, message: "Invoice not found" }, { status: 404 });
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

    // Update using transaction to clear old items and insert new ones
    const updatedInvoice = await prisma.$transaction(async (tx) => {
      // 1. Delete existing items
      await tx.invoiceItem.deleteMany({
        where: { invoiceId: id },
      });

      // 2. Update invoice base and add new items
      return await tx.invoice.update({
        where: { id },
        data: {
          invoiceNumber,
          invoiceDate: new Date(invoiceDate),
          dueDate: new Date(dueDate),
          clientId,
          projectId: projectId || null,
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
          paymentStatus: status === "PAID" ? "PAID" : currentInvoice.paymentStatus,
          items: {
            create: formattedItems,
          },
        },
        include: {
          items: true,
        },
      });
    });

    return NextResponse.json({
      success: true,
      invoice: updatedInvoice,
    });
  } catch (error: any) {
    console.error("Failed to update invoice:", error);
    return NextResponse.json({ success: false, message: error.message || "Failed to update invoice" }, { status: 500 });
  }
}

// DELETE invoice
export async function DELETE(req: Request, { params }: Props) {
  const isAdmin = await verifyAdmin();
  if (!isAdmin) {
    return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;

  try {
    const existing = await prisma.invoice.findUnique({
      where: { id },
    });
    if (!existing) {
      return NextResponse.json({ success: false, message: "Invoice not found" }, { status: 404 });
    }

    await prisma.invoice.delete({
      where: { id },
    });

    return NextResponse.json({
      success: true,
      message: "Invoice deleted successfully",
    });
  } catch (error) {
    console.error("Failed to delete invoice:", error);
    return NextResponse.json({ success: false, message: "Failed to delete invoice" }, { status: 500 });
  }
}
