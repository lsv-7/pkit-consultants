import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

async function main() {
  // 1. Seed Admin Account
  const hashedPassword = await bcrypt.hash("Admin@123", 10);
  await prisma.admin.upsert({
    where: {
      email: "admin@pkitconsultants.com",
    },
    update: {},
    create: {
      name: "PKIT Admin",
      email: "admin@pkitconsultants.com",
      password: hashedPassword,
    },
  });
  console.log("✅ Admin seeded successfully");

  // 2. Seed Website Settings
  await prisma.websiteSettings.upsert({
    where: { id: "default" },
    update: {
      tagline: "Technology Consulting",
    },
    create: {
      id: "default",
      companyName: "PKIT Consultants",
      tagline: "Technology Consulting",
      email: "pkitconsultants@gmail.com",
      phone: "+971 50 116 4565",
      whatsapp: "https://wa.me/971501164565",
      officeAddress: "Dubai, United Arab Emirates",
      googleMapsLink: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d115494.39860649718!2d55.19799863481267!3d25.194849313063546!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e5f43348a6d489b%3A0x2f6cf9cf0c9a44c!2sDubai!5e0!3m2!1sen!2sae!4v1700000000000",
      workingHours: "Monday - Friday: 9:00 AM - 6:00 PM (GST)",
      logoUrl: "/logo.png",
      faviconUrl: "/favicon.ico",
      linkedin: "",
      instagram: "",
      facebook: "",
      twitter: "",
      youtube: "",
      defaultSeoTitle: "PKIT Consultants — Enterprise Software & AI Solutions in Dubai",
      defaultSeoDescription: "Professional technology consultancy in Dubai. AI solutions, custom software engineering, cloud architectures, and dedicated IT support.",
    },
  });
  console.log("✅ WebsiteSettings seeded successfully");

  // 3. Seed Homepage Section
  await prisma.homepageSection.upsert({
    where: { id: "default" },
    update: {},
    create: {
      id: "default",
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
    },
  });
  console.log("✅ HomepageSection seeded successfully");

  // 4. Seed Services (Clear and Re-insert)
  await prisma.service.deleteMany({});
  const services = [
    {
      title: "AI Solutions",
      slug: "ai-solutions",
      shortDescription: "Architect and integrate custom machine learning models and intelligent automations designed for measurable outcomes...",
      longDescription: "Architect and integrate custom machine learning models and intelligent automations designed for measurable outcomes, reducing overhead and supercharging productivity.",
      icon: "Brain",
      displayOrder: 0,
      active: true,
      features: ["Generative AI & LLMs", "AI Chatbots & Agents", "Machine Learning Models", "Intelligent Workflows"],
      technologies: ["OpenAI API", "LangChain", "Python", "PyTorch", "TensorFlow", "Hugging Face"],
    },
    {
      title: "Software Development",
      slug: "software-dev",
      shortDescription: "Bespoke software engineered around your exact operations and workflows. We write clean, tested, and highly scalable code...",
      longDescription: "Bespoke software engineered around your exact operations and workflows. We write clean, tested, and highly scalable code using modern technologies.",
      icon: "Code2",
      displayOrder: 1,
      active: true,
      features: ["SaaS & Cloud Platforms", "Custom ERP / CRM Systems", "API Engineering", "Legacy Modernization"],
      technologies: ["TypeScript", "Node.js", "Go", "Prisma", "PostgreSQL", "Next.js"],
    },
    {
      title: "Web Development",
      slug: "web-dev",
      shortDescription: "Stunning, blazing-fast, and SEO-optimized web experiences designed for ultimate performance. Desktop first, mobile-optimized...",
      longDescription: "Stunning, blazing-fast, and SEO-optimized web experiences designed for ultimate performance. Desktop first, mobile-optimized, and built to convert.",
      icon: "Globe",
      displayOrder: 2,
      active: true,
      features: ["Next.js & React Apps", "Headless CMS Solutions", "E-Commerce Engines", "Premium Corporate Sites"],
      technologies: ["Next.js", "React", "Tailwind CSS", "GraphQL", "Vercel", "Sanity.io"],
    },
    {
      title: "Mobile Apps",
      slug: "mobile-apps",
      shortDescription: "Native and hybrid mobile applications tuned for performance, fluid animations, and intuitive user experiences...",
      longDescription: "Native and hybrid mobile applications tuned for performance, fluid animations, and intuitive user experiences on the exact devices your customers use.",
      icon: "Smartphone",
      displayOrder: 3,
      active: true,
      features: ["iOS App Development", "Android App Development", "Cross-Platform Apps", "App Store Deployment"],
      technologies: ["React Native", "Flutter", "Swift", "Kotlin", "Firebase", "App Store Connect"],
    },
    {
      title: "Cloud Solutions",
      slug: "cloud-solutions",
      shortDescription: "Establish, secure, and automate your cloud infrastructure. We build fail-safe, autoscaling environments...",
      longDescription: "Establish, secure, and automate your cloud infrastructure. We build fail-safe, autoscaling environments optimized to minimize resource spend.",
      icon: "Cloud",
      displayOrder: 4,
      active: true,
      features: ["AWS & Azure Migration", "Serverless Infrastructure", "CI/CD & DevOps Automation", "Cost Optimization"],
      technologies: ["AWS", "Microsoft Azure", "Terraform", "Docker", "Kubernetes", "GitHub Actions"],
    },
    {
      title: "Cybersecurity",
      slug: "cybersecurity",
      shortDescription: "Protect your proprietary codebase, intellectual property, and client data. We implement zero-trust structures...",
      longDescription: "Protect your proprietary codebase, intellectual property, and client data. We implement zero-trust structures and audit for security vulnerabilities.",
      icon: "Shield",
      displayOrder: 5,
      active: true,
      features: ["Vulnerability Audits", "Secure Architecture Design", "Compliance & Governance", "Penetration Testing"],
      technologies: ["OWASP", "Zero-Trust", "Cloudflare WAF", "Nessus", "Snyk", "IAM Policies"],
    },
    {
      title: "IT Consulting",
      slug: "it-consulting",
      shortDescription: "Review your architecture, analyze database queries, draft clear roadmaps, and secure your systems to withstand high traffic...",
      longDescription: "Review your architecture, analyze database queries, draft clear roadmaps, and secure your systems to withstand high traffic and prevent server failures.",
      icon: "Network",
      displayOrder: 6,
      active: true,
      features: ["Technical Strategy", "Software Architecture Audits", "Due Diligence", "Scalability Planning"],
      technologies: ["System Design", "Database Tuning", "Microservices", "Scalability Audits"],
    },
    {
      title: "Digital Transformation",
      slug: "digital-trans",
      shortDescription: "Upgrade your legacy business operations with modern digital workflows. We connect isolated software tools and eliminate errors...",
      longDescription: "Upgrade your legacy business operations with modern digital workflows. We connect isolated software tools and eliminate manual input errors.",
      icon: "Zap",
      displayOrder: 7,
      active: true,
      features: ["Legacy Tech Migration", "Workflow Automation", "Systems Integration", "Tech Stack Audit"],
      technologies: ["Zapier API", "RPA tools", "RESTful Integrations", "Workato", "Make.com"],
    },
  ];
  for (const s of services) {
    await prisma.service.create({ data: s });
  }
  console.log("✅ Services seeded successfully");

  // 5. Seed Industries (Clear and Re-insert)
  await prisma.industry.deleteMany({});
  const industries = [
    {
      name: "Healthcare",
      slug: "healthcare",
      description: "Secure, HIPAA-aligned healthcare platforms. We build accessible patient portals, telemedicine systems, and billing pipelines to streamline medical workflows.",
      icon: "Heart",
      displayOrder: 0,
      active: true,
      solutions: ["Patient Portals", "Telehealth Apps", "EHR Integrations", "Compliance Auditing"],
    },
    {
      name: "Education",
      slug: "education",
      description: "Robust learning management systems and virtual class portals. We design interactive systems that scale to handle high concurrent user traffic during exam periods.",
      icon: "GraduationCap",
      displayOrder: 1,
      active: true,
      solutions: ["LMS Development", "Student Portals", "Virtual Classrooms", "Admin Dashboards"],
    },
    {
      name: "Retail",
      slug: "retail",
      description: "Headless e-commerce web applications built to convert. We connect online storefronts with real-time warehouse inventory and legacy POS systems.",
      icon: "ShoppingBag",
      displayOrder: 2,
      active: true,
      solutions: ["Custom E-Commerce", "Inventory Engines", "POS Integrations", "CRM & Loyalty Programs"],
    },
    {
      name: "Construction",
      slug: "construction",
      description: "Custom management systems for contractors and developers. We build mobile-responsive tools for real-time site logging, worker hours, and client progress portals.",
      icon: "Hammer",
      displayOrder: 3,
      active: true,
      solutions: ["Resource Allocators", "Onsite Logging Apps", "Contract Portals", "Project Trackers"],
    },
    {
      name: "Manufacturing",
      slug: "manufacturing",
      description: "Enterprise resource planning (ERP) extensions and logistics trackers. We automate data pipeline synchronization across machinery, vendors, and shipping lines.",
      icon: "Factory",
      displayOrder: 4,
      active: true,
      solutions: ["Supply Chain Systems", "ERP Implementations", "Smart Analytics", "Asset Tracking"],
    },
    {
      name: "Real Estate",
      slug: "real-estate",
      description: "Premium real estate software. We construct custom CRM platforms, automated lead routing systems, and online booking pipelines for luxury property agencies.",
      icon: "Building",
      displayOrder: 5,
      active: true,
      solutions: ["Listing Catalogs", "Custom Lead CRMs", "Client Portals", "Payment Gateways"],
    },
    {
      name: "Government",
      slug: "government",
      description: "Accessible and secure citizen portals. We build systems that comply with local UAE data sovereignty rules, maintaining high uptime under massive public usage.",
      icon: "Building2",
      displayOrder: 6,
      active: true,
      solutions: ["Public Service Portals", "Digitized Workflows", "Data Sovereignty", "High-Load Infrastructure"],
    },
    {
      name: "Startups",
      slug: "startups",
      description: "We help early-stage ventures ship products fast without accumulating heavy technical debt, preparing their codebases to pass VC technical due diligence.",
      icon: "Rocket",
      displayOrder: 7,
      active: true,
      solutions: ["Rapid MVP Creation", "Backend Blueprinting", "Tech Due Diligence", "Scalable Foundations"],
    },
  ];
  for (const ind of industries) {
    await prisma.industry.create({ data: ind });
  }
  console.log("✅ Industries seeded successfully");

  // 6. Seed Technologies (Clear and Re-insert)
  await prisma.technology.deleteMany({});
  const technologies = [
    { name: "React", category: "Frontend", logo: "", displayOrder: 0 },
    { name: "Next.js", category: "Frontend", logo: "", displayOrder: 1 },
    { name: "TypeScript", category: "Frontend & Backend", logo: "", displayOrder: 2 },
    { name: "Node.js", category: "Backend", logo: "", displayOrder: 3 },
    { name: "Python", category: "AI & Data", logo: "", displayOrder: 4 },
    { name: "PostgreSQL", category: "Database", logo: "", displayOrder: 5 },
    { name: "Prisma", category: "Database", logo: "", displayOrder: 6 },
    { name: "AWS", category: "Cloud & SecOps", logo: "", displayOrder: 7 },
    { name: "Docker", category: "Cloud & SecOps", logo: "", displayOrder: 8 },
  ];
  for (const t of technologies) {
    await prisma.technology.create({ data: t });
  }
  console.log("✅ Technologies seeded successfully");

  // 7. Seed FAQs (Clear and Re-insert)
  await prisma.fAQ.deleteMany({});
  const faqs = [
    {
      question: "Do you work with fixed-scope pricing or hourly rates?",
      answer: "We prefer fixed-scope delivery for most custom software and MVP projects. We agree on clear requirements, pricing, and timelines upfront, ensuring there are no surprises or billing creep. For ongoing support and research consulting, we offer retained hourly resources.",
      category: "Engagements",
      displayOrder: 0,
      active: true,
    },
    {
      question: "Where is the PKIT team located?",
      answer: "Our leadership and senior software architects are located in Dubai, United Arab Emirates. We manage all direct system scoping and client deliveries locally to maintain alignment with your business workflows.",
      category: "Company",
      displayOrder: 1,
      active: true,
    },
    {
      question: "Can you migrate legacy systems to modern cloud infrastructures?",
      answer: "Yes, digital transformation and cloud migration are core disciplines. We refactor old databases, rewrite legacy APIs, establish serverless AWS/Azure setups, and automate containerized deployments with Docker.",
      category: "Services",
      displayOrder: 2,
      active: true,
    },
    {
      question: "How do you ensure data security and UAE compliance?",
      answer: "We design cloud setups and database models with strict compliance in mind. We support local UAE data residency requirements and build zero-trust security layers, including encrypted database configurations and firewalls.",
      category: "Security",
      displayOrder: 3,
      active: true,
    },
    {
      question: "Will the scoping team be the same team building our software?",
      answer: "Yes. At PKIT Consultants, we follow a senior-engineers-only delivery model. The architects who examine your systems and design your technical blueprint are the same engineers who write your production code.",
      category: "Quality",
      displayOrder: 4,
      active: true,
    },
  ];
  for (const f of faqs) {
    await prisma.fAQ.create({ data: f });
  }
  console.log("✅ FAQs seeded successfully");
}

main()
  .catch(console.error)
  .finally(async () => {
    await prisma.$disconnect();
  });