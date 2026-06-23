import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ThemeProvider } from "@/components/ThemeProvider";
import { getSettings } from "@/lib/services/settings";
import { getServices } from "@/lib/services/services";

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSettings();

  return {
    metadataBase: new URL("https://pkitconsultants.com"),
    title: {
      default: settings.defaultSeoTitle,
      template: "%s | " + settings.companyName,
    },
    description: settings.defaultSeoDescription,
    keywords: [
      "IT consultancy Dubai",
      "AI solutions UAE",
      "software development Dubai",
      "mobile app development UAE",
      "cloud solutions Dubai",
      "cybersecurity Dubai",
      "digital transformation UAE",
      settings.companyName,
    ],
    authors: [{ name: settings.companyName, url: "https://pkitconsultants.com" }],
    creator: settings.companyName,
    openGraph: {
      type: "website",
      locale: "en_AE",
      url: "https://pkitconsultants.com",
      siteName: settings.companyName,
      title: settings.defaultSeoTitle,
      description: settings.defaultSeoDescription,
      images: [
        {
          url: "/og-image.png",
          width: 1200,
          height: 630,
          alt: settings.companyName + " — " + settings.tagline,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: settings.defaultSeoTitle,
      description: settings.defaultSeoDescription,
      images: ["/og-image.png"],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: { index: true, follow: true },
    },
  };
}

export default async function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const settings = await getSettings();
  const services = await getServices(true); // active only

  // Map database settings to the expected shape of CompanyInfo in components
  const mappedSettings = {
    name: settings.companyName,
    tagline: settings.tagline,
    email: settings.email,
    phone: settings.phone,
    whatsappLink: settings.whatsapp,
    address: settings.officeAddress,
    hours: settings.workingHours,
    mapEmbedUrl: settings.googleMapsLink,
  };
  
  const mappedServices = services.map(s => ({
    id: s.slug, // mapping slug to id
    title: s.title,
    features: s.features,
    desc: s.shortDescription,
    iconName: s.icon,
    technologies: s.technologies,
  }));

  return (
    <html lang="en" className="h-full antialiased">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;600;700&family=Inter:wght@400;500;600&family=JetBrains+Mono:wght@500&display=swap"
          rel="stylesheet"
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var saved = localStorage.getItem('theme');
                  var preference = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
                  var theme = saved || preference;
                  document.documentElement.setAttribute('data-theme', theme);
                } catch(e) {}
              })();
            `
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: settings.companyName,
              url: "https://pkitconsultants.com",
              logo: "https://pkitconsultants.com" + settings.logoUrl,
              description: settings.defaultSeoDescription,
              address: {
                "@type": "PostalAddress",
                addressLocality: settings.officeAddress,
                addressCountry: "AE",
              },
              contactPoint: {
                "@type": "ContactPoint",
                telephone: settings.phone,
                contactType: "customer service",
                email: settings.email,
                availableLanguage: "English",
              },
              sameAs: [],
            }),
          }}
        />
      </head>
      <body
        style={{
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          background: "var(--bg)",
          color: "var(--text)",
        }}
      >
        <ThemeProvider>
          <Navbar settings={mappedSettings} />
          <main style={{ flex: 1 }}>{children}</main>
          <Footer settings={mappedSettings} services={mappedServices} />
        </ThemeProvider>
      </body>
    </html>
  );
}

