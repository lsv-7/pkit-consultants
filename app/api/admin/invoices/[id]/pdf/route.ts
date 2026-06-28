import { NextResponse } from "next/server";
import { verifyAdmin } from "@/lib/auth";
import puppeteer from "puppeteer-core";
import fs from "fs";

function getBrowserPath(): string {
  if (process.env.PUPPETEER_EXECUTABLE_PATH) {
    return process.env.PUPPETEER_EXECUTABLE_PATH;
  }
  const paths = [
    // Windows paths
    "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe",
    "C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe",
    "C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe",
    "C:\\Program Files\\Microsoft\\Edge\\Application\\msedge.exe",
    // Linux/UNIX common paths
    "/usr/bin/chromium",
    "/usr/bin/chromium-browser",
    "/usr/bin/google-chrome-stable",
    "/usr/bin/google-chrome",
    "/usr/bin/google-chrome-unstable",
    "/usr/bin/google-chrome-beta",
    // macOS paths
    "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
    "/Applications/Microsoft Edge.app/Contents/MacOS/Microsoft Edge",
  ];
  for (const p of paths) {
    if (fs.existsSync(p)) return p;
  }
  throw new Error("No compatible Chrome/Edge browser installation found.");
}

type Props = {
  params: Promise<{ id: string }>;
};

export async function GET(req: Request, { params }: Props) {
  const { id } = await params;
  const isAdmin = await verifyAdmin();
  if (!isAdmin) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  let browser;
  try {
    const host = req.headers.get("host") || "localhost:3000";
    const protocol = host.includes("localhost") || host.includes("127.0.0.1") ? "http" : "https";
    const targetUrl = `${protocol}://${host}/admin/invoices/${id}/preview`;

    const browserPath = getBrowserPath();
    browser = await puppeteer.launch({
      executablePath: browserPath,
      headless: true,
      args: ["--no-sandbox", "--disable-setuid-sandbox"],
    });

    const page = await browser.newPage();
    
    // Pass cookies to bypass auth check
    const cookieHeader = req.headers.get("cookie") || "";
    if (cookieHeader) {
      const parsedCookies = cookieHeader.split(";").map(pair => {
        const eqIdx = pair.indexOf("=");
        const name = eqIdx > -1 ? pair.substring(0, eqIdx).trim() : pair.trim();
        const value = eqIdx > -1 ? pair.substring(eqIdx + 1).trim() : "";
        return {
          name,
          value,
          domain: host.split(":")[0],
          path: "/",
        };
      });
      await page.setCookie(...parsedCookies);
    }

    // Set viewport
    await page.setViewport({ width: 1200, height: 1600 });

    // Navigate to preview page and wait for content loading
    await page.goto(targetUrl, { waitUntil: "networkidle0" });

    // Wait for fonts to be ready and hide toolbar
    await page.evaluate(async () => {
      await document.fonts.ready;
      const toolbar = document.querySelector(".no-print");
      if (toolbar) (toolbar as HTMLElement).style.display = "none";
    });

    // Generate PDF
    const pdfBuffer = await page.pdf({
      format: "A4",
      printBackground: true,
      margin: {
        top: "0mm",
        bottom: "0mm",
        left: "0mm",
        right: "0mm",
      },
      preferCSSPageSize: true,
    });

    await browser.close();

    return new Response(pdfBuffer as any, {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename="Invoice-${id}.pdf"`,
      },
    });
  } catch (error: any) {
    console.error("PDF generation failed:", error);
    if (browser) {
      try {
        await (browser as any).close();
      } catch (e) {}
    }
    return NextResponse.json({ message: error.message || "Failed to generate PDF" }, { status: 500 });
  }
}
