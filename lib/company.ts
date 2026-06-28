/**
 * PKIT Consultants — single source of truth for company details.
 * Database settings override phone and other CMS-managed fields at runtime.
 */

export const COMPANY = {
  name: "PKIT Consultants",
  tagline: "Technology. Consulting. Solutions.",
  email: "mpkitconsultants@gmail.com",
  website: "https://www.pkitconsultants.com",
  phone: "+971 50 116 4565",
  whatsappUrl: "https://wa.me/971501164565",
  address: {
    line1: "Deira",
    line2: "Dubai",
    line3: "United Arab Emirates",
  },
  workingHours: "Monday - Friday: 9:00 AM - 6:00 PM (GST)",
  googleMapsEmbed:
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d115494.39860649718!2d55.19799863481267!3d25.194849313063546!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e5f43348a6d489b%3A0x2f6cf9cf0c9a44c!2sDubai!5e0!3m2!1sen!2sae!4v1700000000000",
  ceoName: "M. Prasanna Kumar",
  ceoDesignation: "Founder & Managing Director",
  defaultSeoTitle: "PKIT Consultants — Enterprise Software & AI Solutions in Dubai",
  defaultSeoDescription:
    "Professional technology consultancy in Dubai. AI solutions, custom software engineering, cloud architectures, and dedicated IT support.",
  logoUrl: "/logo.png",
  faviconUrl: "/favicon.ico",
} as const;

export function getAddressLine(): string {
  const { line1, line2, line3 } = COMPANY.address;
  return `${line1}, ${line2}, ${line3}`;
}

export function getAddressMultiline(): string {
  const { line1, line2, line3 } = COMPANY.address;
  return `${line1},\n${line2},\n${line3}`;
}

export function getWebsiteHost(): string {
  return COMPANY.website.replace(/^https?:\/\//, "");
}
