import { COMPANY } from "@/lib/company";

interface BaseLayoutOptions {
  title: string;
  previewText?: string;
  contentHtml: string;
}

export function getBaseLayout(options: BaseLayoutOptions): string {
  const preview = options.previewText ? `<div style="display: none; max-height: 0px; overflow: hidden;">${options.previewText}</div>` : "";
  
  return `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${options.title}</title>
  <style>
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
      background-color: #f8fafc;
      color: #334155;
      margin: 0;
      padding: 0;
      -webkit-font-smoothing: antialiased;
      -webkit-text-size-adjust: none;
      width: 100% !important;
    }
    table {
      border-collapse: collapse;
      mso-table-lspace: 0pt;
      mso-table-rspace: 0pt;
    }
    img {
      border: 0;
      height: auto;
      line-height: 100%;
      outline: none;
      text-decoration: none;
    }
    .wrapper {
      width: 100%;
      table-layout: fixed;
      background-color: #f8fafc;
      padding: 40px 0;
    }
    .container {
      max-width: 600px;
      margin: 0 auto;
      background-color: #ffffff;
      border: 1px solid #e2e8f0;
      border-radius: 12px;
      overflow: hidden;
      box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -1px rgba(0, 0, 0, 0.02);
    }
    .header {
      background-color: #0b193d;
      padding: 32px 40px;
      border-bottom: 3px solid #0066FF;
      text-align: left;
    }
    .logo-text {
      color: #ffffff;
      font-size: 20px;
      font-weight: 700;
      letter-spacing: 1.5px;
      margin: 0;
    }
    .tagline {
      color: #38bdf8;
      font-size: 11px;
      font-weight: 500;
      letter-spacing: 1px;
      margin: 4px 0 0 0;
      text-transform: uppercase;
    }
    .content {
      padding: 40px;
      line-height: 1.6;
      font-size: 15px;
    }
    .footer {
      background-color: #f1f5f9;
      padding: 32px 40px;
      text-align: center;
      font-size: 12px;
      color: #64748b;
      border-top: 1px solid #e2e8f0;
    }
    .footer-links a {
      color: #0066FF;
      text-decoration: none;
      margin: 0 8px;
    }
    .btn-primary {
      display: inline-block;
      background-color: #0066FF;
      color: #ffffff !important;
      text-decoration: none;
      padding: 12px 28px;
      font-size: 14px;
      font-weight: 600;
      border-radius: 6px;
      margin: 24px 0;
      text-align: center;
    }
    .highlight-box {
      background-color: #f8fafc;
      border: 1px solid #e2e8f0;
      border-left: 4px solid #0066FF;
      padding: 20px;
      border-radius: 6px;
      margin: 20px 0;
    }
  </style>
</head>
<body>
  ${preview}
  <table role="presentation" class="wrapper" width="100%" cellspacing="0" cellpadding="0">
    <tr>
      <td align="center">
        <table role="presentation" class="container" width="100%" cellspacing="0" cellpadding="0">
          <!-- Header -->
          <tr>
            <td class="header">
              <h1 class="logo-text">${COMPANY.name.toUpperCase()}</h1>
              <p class="tagline">${COMPANY.tagline}</p>
            </td>
          </tr>
          
          <!-- Content Body -->
          <tr>
            <td class="content">
              ${options.contentHtml}
            </td>
          </tr>
          
          <!-- Footer -->
          <tr>
            <td class="footer">
              <p style="margin: 0 0 8px 0; font-weight: 600; color: #475569;">${COMPANY.name}</p>
              <p style="margin: 0 0 16px 0; line-height: 1.5;">${COMPANY.address.line1}, ${COMPANY.address.line2}, ${COMPANY.address.line3}</p>
              <p class="footer-links" style="margin: 0 0 16px 0;">
                <a href="tel:${COMPANY.phone}">Call Us: ${COMPANY.phone}</a> | 
                <a href="mailto:${COMPANY.email}">Email: ${COMPANY.email}</a>
              </p>
              <p style="margin: 0; font-size: 11px;">
                &copy; ${new Date().getFullYear()} ${COMPANY.name}. All rights reserved.
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}
