import { prisma } from "@/lib/prisma";

export interface HomepageData {
  heroTitleNormal: string;
  heroTitleHighlight: string;
  heroSubtitle: string;
  ctaText: string;
  ctaLink: string;
  whyChooseUs: any; // array of whyChooseUs cards
  devProcess: any; // array of process stages
}

export const DEFAULT_HOMEPAGE: HomepageData = {
  heroTitleNormal: "Connecting Business",
  heroTitleHighlight: "Technology",
  heroSubtitle: "PKIT Consultants helps startups, enterprises, and growing businesses accelerate digital transformation through AI solutions, custom software development, mobile applications, and strategic IT consultancy services.",
  ctaText: "Get Free Consultation",
  ctaLink: "/contact",
  whyChooseUs: [
    {
      title: "Modern Technology Stack",
      desc: "We build with top-tier, future-proof technologies like React, Next.js, Node.js, and Python, ensuring speed, security, and developer-friendly maintenance.",
      iconName: "Cpu",
    },
    {
      title: "AI-Driven Solutions",
      desc: "Seamless integration of custom LLM workflows, intelligent agent pipelines, and automated intelligence to optimize your operations.",
      iconName: "Brain",
    },
    {
      title: "Custom Software Development",
      desc: "Bespoke web applications, high-performance APIs, and custom CRM/ERP solutions built precisely for your unique business workflows.",
      iconName: "Code2",
    },
    {
      title: "Dedicated Support",
      desc: "Direct access to our senior engineering squad and post-launch maintenance, ensuring system stability and constant optimization.",
      iconName: "Headphones",
    },
    {
      title: "Scalable Architecture",
      desc: "Fail-safe system design, serverless microservices, and database tuning that can comfortably scale to support massive traffic growth.",
      iconName: "Layers",
    },
    {
      title: "Security First",
      desc: "Zero-trust environments, compliance audits (HIPAA, local UAE regulations), WAF filters, and encryption from day one.",
      iconName: "Shield",
    },
    {
      title: "Transparent Communication",
      desc: "No developer jargon. We provide clean, direct scoping reviews, realistic timelines, honest budgets, and weekly progress reports.",
      iconName: "MessageSquare",
    },
    {
      title: "Agile Development Process",
      desc: "Iterative cycles that prioritize shipping working code quickly, so you can test, refine, and scale without administrative bottlenecks.",
      iconName: "RefreshCw",
    },
  ],
  devProcess: [
    { num: "01", stepTitle: "Discovery & Consultation", desc: "We audit your current systems, analyze workflows, and align technology solutions with clear commercial business goals." },
    { num: "02", stepTitle: "Planning & Architecture", desc: "Our senior architects design a robust technical blueprint, including data models, APIs, and security configurations." },
    { num: "03", stepTitle: "UI/UX Design", desc: "We draft intuitive, responsive user journeys and premium visual mockups tailored to your brand identity." },
    { num: "04", stepTitle: "Development", desc: "Senior engineering teams build your product using clean, type-safe code, checking in updates regularly." },
    { num: "05", stepTitle: "Testing & QA", desc: "We conduct rigorous functional testing, load tests, compliance audits, and security vulnerability sweeps." },
    { num: "06", stepTitle: "Deployment", desc: "A stable production launch on optimized cloud environments with real-time telemetry monitoring." },
    { num: "07", stepTitle: "Ongoing Support", desc: "Post-launch adjustments, database scaling, feature updates, and weekly maintenance checks." },
  ],
};

export async function getHomepageSection(): Promise<HomepageData> {
  try {
    const page = await prisma.homepageSection.findUnique({
      where: { id: "default" },
    });
    if (!page) return DEFAULT_HOMEPAGE;
    return page as unknown as HomepageData;
  } catch (error) {
    console.error("Failed to fetch homepage sections from DB, using fallback", error);
    return DEFAULT_HOMEPAGE;
  }
}

export async function updateHomepageSection(data: Partial<HomepageData>) {
  return prisma.homepageSection.upsert({
    where: { id: "default" },
    create: {
      id: "default",
      heroTitleNormal: data.heroTitleNormal ?? DEFAULT_HOMEPAGE.heroTitleNormal,
      heroTitleHighlight: data.heroTitleHighlight ?? DEFAULT_HOMEPAGE.heroTitleHighlight,
      heroSubtitle: data.heroSubtitle ?? DEFAULT_HOMEPAGE.heroSubtitle,
      ctaText: data.ctaText ?? DEFAULT_HOMEPAGE.ctaText,
      ctaLink: data.ctaLink ?? DEFAULT_HOMEPAGE.ctaLink,
      whyChooseUs: data.whyChooseUs ?? DEFAULT_HOMEPAGE.whyChooseUs,
      devProcess: data.devProcess ?? DEFAULT_HOMEPAGE.devProcess,
    },
    update: data,
  });
}
