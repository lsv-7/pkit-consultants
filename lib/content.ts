// PKIT Consultants — Public Website Content Layer
// This file acts as the decoupled content gateway. UI components consume these functions,
// making it trivial to migrate to dynamic database-driven content (CRM/Prisma) in the future.

export interface ServiceItem {
  id: string;
  title: string;
  features: string[];
  desc: string;
  iconName: string;
  technologies: string[]; // Tech stack listed on individual service pages
}

export interface IndustryItem {
  id: string;
  title: string;
  solutions: string[];
  desc: string;
  iconName: string;
}

export interface TestimonialItem {
  id: string;
  quote: string;
  clientName: string;
  role: string;
  company: string;
  location: string;
  projectScope: string;
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: string;
}

export interface TechItem {
  name: string;
  category: string;
  description: string;
}

export interface CompanyInfo {
  name: string;
  tagline: string;
  email: string;
  phone: string;
  whatsappLink: string;
  address: string;
  hours: string;
  mapEmbedUrl: string;
}

// ─── COMPANY INFO ───────────────────────────────────────────────────────────
const companyInfo: CompanyInfo = {
  name: "PKIT Consultants",
  tagline: "Technology Consulting",
  email: "pkitconsultants@gmail.com",
  phone: "+971 50 116 4565",
  whatsappLink: "https://wa.me/971501164565",
  address: "Dubai, United Arab Emirates",
  hours: "Monday - Friday: 9:00 AM - 6:00 PM (GST)",
  mapEmbedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d115494.39860649718!2d55.19799863481267!3d25.194849313063546!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e5f43348a6d489b%3A0x2f6cf9cf0c9a44c!2sDubai!5e0!3m2!1sen!2sae!4v1700000000000",
};

export function getCompanyInfo(): CompanyInfo {
  return companyInfo;
}

// ─── HERO CONTENT ───────────────────────────────────────────────────────────
export function getHeroContent() {
  return {
    eyebrow: "PKIT Consultants",
    headingNormal: "Connecting Business",
    headingHighlight: "Technology",
    subheading: "PKIT Consultants helps startups, enterprises, and growing businesses accelerate digital transformation through AI solutions, custom software development, mobile applications, and strategic IT consultancy services.",
    primaryCta: "Get Free Consultation",
    secondaryCta: "Explore Services",
  };
}

// ─── SERVICES (8 items) ──────────────────────────────────────────────────────
const services: ServiceItem[] = [
  {
    id: "ai-solutions",
    title: "AI Solutions",
    features: ["Generative AI & LLMs", "AI Chatbots & Agents", "Machine Learning Models", "Intelligent Workflows"],
    desc: "Architect and integrate custom machine learning models and intelligent automations designed for measurable outcomes, reducing overhead and supercharging productivity.",
    iconName: "Brain",
    technologies: ["OpenAI API", "LangChain", "Python", "PyTorch", "TensorFlow", "Hugging Face"],
  },
  {
    id: "software-dev",
    title: "Software Development",
    features: ["SaaS & Cloud Platforms", "Custom ERP / CRM Systems", "API Engineering", "Legacy Modernization"],
    desc: "Bespoke software engineered around your exact operations and workflows. We write clean, tested, and highly scalable code using modern technologies.",
    iconName: "Code2",
    technologies: ["TypeScript", "Node.js", "Go", "Prisma", "PostgreSQL", "Next.js"],
  },
  {
    id: "web-dev",
    title: "Web Development",
    features: ["Next.js & React Apps", "Headless CMS Solutions", "E-Commerce Engines", "Premium Corporate Sites"],
    desc: "Stunning, blazing-fast, and SEO-optimized web experiences designed for ultimate performance. Desktop first, mobile-optimized, and built to convert.",
    iconName: "Globe",
    technologies: ["Next.js", "React", "Tailwind CSS", "GraphQL", "Vercel", "Sanity.io"],
  },
  {
    id: "mobile-apps",
    title: "Mobile Apps",
    features: ["iOS App Development", "Android App Development", "Cross-Platform Apps", "App Store Deployment"],
    desc: "Native and hybrid mobile applications tuned for performance, fluid animations, and intuitive user experiences on the exact devices your customers use.",
    iconName: "Smartphone",
    technologies: ["React Native", "Flutter", "Swift", "Kotlin", "Firebase", "App Store Connect"],
  },
  {
    id: "cloud-solutions",
    title: "Cloud Solutions",
    features: ["AWS & Azure Migration", "Serverless Infrastructure", "CI/CD & DevOps Automation", "Cost Optimization"],
    desc: "Establish, secure, and automate your cloud infrastructure. We build fail-safe, autoscaling environments optimized to minimize resource spend.",
    iconName: "Cloud",
    technologies: ["AWS", "Microsoft Azure", "Terraform", "Docker", "Kubernetes", "GitHub Actions"],
  },
  {
    id: "cybersecurity",
    title: "Cybersecurity",
    features: ["Vulnerability Audits", "Secure Architecture Design", "Compliance & Governance", "Penetration Testing"],
    desc: "Protect your proprietary codebase, intellectual property, and client data. We implement zero-trust structures and audit for security vulnerabilities.",
    iconName: "Shield",
    technologies: ["OWASP", "Zero-Trust", "Cloudflare WAF", "Nessus", "Snyk", "IAM Policies"],
  },
  {
    id: "it-consulting",
    title: "IT Consulting",
    features: ["Technical Strategy", "Software Architecture Audits", "Due Diligence", "Scalability Planning"],
    desc: "Review your architecture, analyze database queries, draft clear roadmaps, and secure your systems to withstand high traffic and prevent server failures.",
    iconName: "Network",
    technologies: ["System Design", "Database Tuning", "Microservices", "Scalability Audits"],
  },
  {
    id: "digital-trans",
    title: "Digital Transformation",
    features: ["Legacy Tech Migration", "Workflow Automation", "Systems Integration", "Tech Stack Audit"],
    desc: "Upgrade your legacy business operations with modern digital workflows. We connect isolated software tools and eliminate manual input errors.",
    iconName: "Zap",
    technologies: ["Zapier API", "RPA tools", "RESTful Integrations", "Workato", "Make.com"],
  },
];

export function getServices(): ServiceItem[] {
  return services;
}

// ─── INDUSTRIES (8 items) ────────────────────────────────────────────────────
const industries: IndustryItem[] = [
  {
    id: "healthcare",
    title: "Healthcare",
    solutions: ["Patient Portals", "Telehealth Apps", "EHR Integrations", "Compliance Auditing"],
    desc: "Secure, HIPAA-aligned healthcare platforms. We build accessible patient portals, telemedicine systems, and billing pipelines to streamline medical workflows.",
    iconName: "Heart",
  },
  {
    id: "education",
    title: "Education",
    solutions: ["LMS Development", "Student Portals", "Virtual Classrooms", "Admin Dashboards"],
    desc: "Robust learning management systems and virtual class portals. We design interactive systems that scale to handle high concurrent user traffic during exam periods.",
    iconName: "GraduationCap",
  },
  {
    id: "retail",
    title: "Retail",
    solutions: ["Custom E-Commerce", "Inventory Engines", "POS Integrations", "CRM & Loyalty Programs"],
    desc: "Headless e-commerce web applications built to convert. We connect online storefronts with real-time warehouse inventory and legacy POS systems.",
    iconName: "ShoppingBag",
  },
  {
    id: "construction",
    title: "Construction",
    solutions: ["Resource Allocators", "Onsite Logging Apps", "Contract Portals", "Project Trackers"],
    desc: "Custom management systems for contractors and developers. We build mobile-responsive tools for real-time site logging, worker hours, and client progress portals.",
    iconName: "Hammer",
  },
  {
    id: "manufacturing",
    title: "Manufacturing",
    solutions: ["Supply Chain Systems", "ERP Implementations", "Smart Analytics", "Asset Tracking"],
    desc: "Enterprise resource planning (ERP) extensions and logistics trackers. We automate data pipeline synchronization across machinery, vendors, and shipping lines.",
    iconName: "Factory",
  },
  {
    id: "real-estate",
    title: "Real Estate",
    solutions: ["Listing Catalogs", "Custom Lead CRMs", "Client Portals", "Payment Gateways"],
    desc: "Premium real estate software. We construct custom CRM platforms, automated lead routing systems, and online booking pipelines for luxury property agencies.",
    iconName: "Building",
  },
  {
    id: "government",
    title: "Government",
    solutions: ["Public Service Portals", "Digitized Workflows", "Data Sovereignty", "High-Load Infrastructure"],
    desc: "Accessible and secure citizen portals. We build systems that comply with local UAE data sovereignty rules, maintaining high uptime under massive public usage.",
    iconName: "Building2",
  },
  {
    id: "startups",
    title: "Startups",
    solutions: ["Rapid MVP Creation", "Backend Blueprinting", "Tech Due Diligence", "Scalable Foundations"],
    desc: "We help early-stage ventures ship products fast without accumulating heavy technical debt, preparing their codebases to pass VC technical due diligence.",
    iconName: "Rocket",
  },
];

export function getIndustries(): IndustryItem[] {
  return industries;
}

// ─── TECHNOLOGY STACK ────────────────────────────────────────────────────────
const techStack: TechItem[] = [
  { name: "React", category: "Frontend", description: "UI library for building modular interfaces." },
  { name: "Next.js", category: "Frontend", description: "Meta-framework for server rendering and static routing." },
  { name: "TypeScript", category: "Frontend & Backend", description: "Superset of JS ensuring type safety." },
  { name: "Node.js", category: "Backend", description: "JavaScript runtime for building scalable server layers." },
  { name: "Python", category: "AI & Data", description: "Core language for machine learning and LLM piping." },
  { name: "PostgreSQL", category: "Database", description: "Robust relational database for transactional safety." },
  { name: "Prisma", category: "Database", description: "Next-gen ORM for type-safe database queries." },
  { name: "AWS", category: "Cloud & SecOps", description: "Cloud infrastructure hosting and serverless APIs." },
  { name: "Docker", category: "Cloud & SecOps", description: "Containerized environments ensuring unified dev-prod parity." },
];

export function getTechStack(): TechItem[] {
  return techStack;
}

// ─── TESTIMONIALS (3 items) ──────────────────────────────────────────────────
const testimonials: TestimonialItem[] = [];

export function getTestimonials(): TestimonialItem[] {
  return testimonials;
}

// ─── FAQS (5 items) ─────────────────────────────────────────────────────────
const faqs: FAQItem[] = [
  {
    id: "faq-1",
    question: "Do you work with fixed-scope pricing or hourly rates?",
    answer: "We prefer fixed-scope delivery for most custom software and MVP projects. We agree on clear requirements, pricing, and timelines upfront, ensuring there are no surprises or billing creep. For ongoing support and research consulting, we offer retained hourly resources.",
    category: "Engagements",
  },
  {
    id: "faq-2",
    question: "Where is the PKIT team located?",
    answer: "Our leadership and senior software architects are located in Dubai, United Arab Emirates. We manage all direct system scoping and client deliveries locally to maintain alignment with your business workflows.",
    category: "Company",
  },
  {
    id: "faq-3",
    question: "Can you migrate legacy systems to modern cloud infrastructures?",
    answer: "Yes, digital transformation and cloud migration are core disciplines. We refactor old databases, rewrite legacy APIs, establish serverless AWS/Azure setups, and automate containerized deployments with Docker.",
    category: "Services",
  },
  {
    id: "faq-4",
    question: "How do you ensure data security and UAE compliance?",
    answer: "We design cloud setups and database models with strict compliance in mind. We support local UAE data residency requirements and build zero-trust security layers, including encrypted database configurations and firewalls.",
    category: "Security",
  },
  {
    id: "faq-5",
    question: "Will the scoping team be the same team building our software?",
    answer: "Yes. At PKIT Consultants, we follow a senior-engineers-only delivery model. The architects who examine your systems and design your technical blueprint are the same engineers who write your production code.",
    category: "Quality",
  },
];

export function getFAQs(): FAQItem[] {
  return faqs;
}

// ─── ABOUT CONTENT ──────────────────────────────────────────────────────────
export function getAboutContent() {
  return {
    storyTitle: "Established in Dubai for Global Impact",
    storyParagraphs: [
      "Originally founded in 2026, PKIT Consultants was born out of a simple observation: most businesses struggle to get genuine ROI from technology. Large agencies build bloated, standard systems, while outsourcing shops often lack accountability.",
      "We set out to build a consultancy where engineering excellence meets commercial business goals. Today, we provide elite custom software, mobile apps, generative AI integrations, and cloud architectures for organizations across the UAE and globally.",
    ],
    mission: "To empower companies with customized, performant digital infrastructure. We solve business challenges with strategic software development, ensuring our clients achieve long-term growth and operational efficiency.",
    vision: "To become the premier tech-enabler for scaling firms and enterprises in the Middle East, recognized for our commitment to clean code, reliable architecture, and transparent communication.",
    founder: {
      name: "M. Prasanna Kumar",
      title: "Founder & Chief Executive Officer",
      bio: [
        "M. Prasanna Kumar founded PKIT Consultants with a deep passion for clean engineering and a commitment to helping UAE businesses bridge the technical gap. Originally from Andhra Pradesh, India, he established the firm in Dubai, UAE, to assemble an elite squad of engineers capable of executing high-complexity software systems.",
        "Under his leadership, PKIT operates with a customer-centric delivery framework. We strictly focus on outcomes, engineering robustness, and absolute technical transparency.",
      ],
    },
    values: [
      {
        title: "Innovation",
        desc: "Building modern, future-proof systems that solve real business bottlenecks — never just following templates.",
      },
      {
        title: "Reliability",
        desc: "Architecting software that performs under heavy production traffic and is easy to maintain long-term.",
      },
      {
        title: "Transparency",
        desc: "Honest feedback, transparent pricing, and clear roadmaps. We operate as an extension of your own team.",
      },
      {
        title: "Excellence",
        desc: "Uncompromising engineering standards from our senior devs. Clean code, optimal queries, and elegant UIs.",
      },
    ],
  };
}

export interface CaseStudyItem {
  id: string;
  projectName: string;
  clientName: string;
  company: string;
  service: string;
  status: string;
  description: string;
  progress: number;
  impact: string;
  tags: string[];
}

const presetCaseStudies: CaseStudyItem[] = [];

export function getPresetCaseStudies(): CaseStudyItem[] {
  return presetCaseStudies;
}

