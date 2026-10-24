import { COMPANY, getAddressLine } from "@/lib/company";

export interface BotAction {
  label: string;
  url: string;
}

export interface BotResponse {
  message: string;
  actions?: BotAction[];
}

export const PKIT_SYSTEM_PROMPT = `You are the official AI Assistant for PK IT Consultants, a premier enterprise technology consultancy headquartered in Deira, Dubai, United Arab Emirates.

Official Company Facts:
- Company Name: PK IT Consultants (abbreviated PK IT)
- Tagline: Connecting Business with Technology
- Founder & Managing Director: M. Prasanna Kumar
- Headquarters: Deira, Dubai, United Arab Emirates
- Email: mpkitconsultants@gmail.com
- Phone / WhatsApp: +971 50 116 4565
- Website: www.pkitconsultants.com
- Delivery Model: Senior-engineers-only. The software architects who scope client systems write production code. No junior outsourcers.

Services Offered:
1. AI Solutions: Generative AI, LLM integration, custom autonomous AI agents, enterprise search with vector databases, automated workflows, and machine learning models.
2. Custom Software Development: Full-cycle scalable web platforms, high-throughput backend APIs, microservices, and robust database architectures.
3. Mobile Application Development: High-performance native & cross-platform iOS and Android apps with offline caching, biometrics, and real-time backend synchronization.
4. IT Consultancy: Enterprise architecture audits, technology stack selection, technical roadmaps, and digital transformation strategy.
5. Cloud & DevOps: AWS/Azure infrastructure, containerization (Docker/Kubernetes), automated CI/CD pipelines, and serverless architectures.
6. Cybersecurity & Compliance: Zero-trust architecture, encrypted databases, local UAE data residency compliance, and penetration testing defense.

Your Tone & Rules:
- Professional, concise, enterprise-grade, knowledgeable, and polite.
- Always spell the brand name as "PK IT Consultants" or "PK IT".
- Guide prospective clients toward booking a free consultation at /contact.
- Do NOT fabricate pricing, timelines, guarantees, unlisted services, or client names. Every project is scoped individually based on business requirements.
- If a question asks for details you do not know, clearly state that and encourage them to speak directly with an architect via the contact form or WhatsApp.
- Keep answers concise (2 to 4 sentences).`;

/**
 * Intelligent Fallback Knowledge Engine
 * Returns accurate, context-aware answers grounded in PK IT Consultants services
 * when external LLM APIs are not configured, unreachable, or rate-limited.
 */
export function getKnowledgeResponse(userMessage: string): BotResponse {
  const query = userMessage.toLowerCase().trim();

  // 1. Consultation / Contact / Meeting
  if (
    query.includes("contact") ||
    query.includes("consult") ||
    query.includes("hire") ||
    query.includes("meeting") ||
    query.includes("call") ||
    query.includes("reach") ||
    query.includes("phone") ||
    query.includes("email") ||
    query.includes("address") ||
    query.includes("location") ||
    query.includes("where") ||
    query.includes("office")
  ) {
    return {
      message: `PK IT Consultants is headquartered in ${getAddressLine()}. You can reach our team directly at ${COMPANY.email} or call ${COMPANY.phone}. You can also submit an enquiry to schedule a free 30-minute discovery consultation with our technical architects.`,
      actions: [
        { label: "Book Free Consultation", url: "/contact" },
        { label: "Chat on WhatsApp", url: COMPANY.whatsappUrl },
      ],
    };
  }

  // 2. AI Solutions / Machine Learning / LLMs / Chatbots
  if (
    query.includes("ai") ||
    query.includes("artificial intelligence") ||
    query.includes("llm") ||
    query.includes("gpt") ||
    query.includes("bot") ||
    query.includes("machine learning") ||
    query.includes("model") ||
    query.includes("automation")
  ) {
    return {
      message:
        "PK IT Consultants specializes in custom AI solutions, including Generative AI integrations, autonomous AI agents, enterprise search powered by vector databases, and intelligent workflow automation to optimize your business operations.",
      actions: [
        { label: "Explore AI Solutions", url: "/services#ai-solutions" },
        { label: "Request AI Discovery Call", url: "/contact" },
      ],
    };
  }

  // 3. Custom Software / Web App / Backend
  if (
    query.includes("software") ||
    query.includes("web") ||
    query.includes("development") ||
    query.includes("custom") ||
    query.includes("backend") ||
    query.includes("frontend") ||
    query.includes("api") ||
    query.includes("react") ||
    query.includes("next") ||
    query.includes("node")
  ) {
    return {
      message:
        "We build high-performance, enterprise-grade custom web applications, APIs, and microservices using modern technologies like React, Next.js, Node.js, and PostgreSQL. Every system is built by senior engineers with focus on speed, scalability, and clean architecture.",
      actions: [
        { label: "View Software Services", url: "/services#custom-software" },
        { label: "Discuss Your Project", url: "/contact" },
      ],
    };
  }

  // 4. Mobile Apps (iOS & Android)
  if (
    query.includes("mobile") ||
    query.includes("app") ||
    query.includes("ios") ||
    query.includes("android") ||
    query.includes("react native") ||
    query.includes("flutter")
  ) {
    return {
      message:
        "Our team develops high-performance native and cross-platform mobile applications for iOS and Android. We build responsive user experiences with offline data synchronization, biometric authentication, and seamless backend integrations.",
      actions: [
        { label: "View Mobile App Services", url: "/services#mobile-development" },
        { label: "Book Consultation", url: "/contact" },
      ],
    };
  }

  // 5. Cloud / DevOps / Infrastructure / Migration
  if (
    query.includes("cloud") ||
    query.includes("devops") ||
    query.includes("aws") ||
    query.includes("azure") ||
    query.includes("docker") ||
    query.includes("kubernetes") ||
    query.includes("migrate") ||
    query.includes("migration")
  ) {
    return {
      message:
        "We design resilient cloud architectures on AWS and Microsoft Azure, automate deployment pipelines with CI/CD and Docker, and execute zero-downtime legacy database and API migrations.",
      actions: [
        { label: "Explore Cloud & DevOps", url: "/services#cloud-devops" },
        { label: "Consult an Architect", url: "/contact" },
      ],
    };
  }

  // 6. Security / UAE Compliance / Data Residency
  if (
    query.includes("security") ||
    query.includes("compliance") ||
    query.includes("cyber") ||
    query.includes("uae") ||
    query.includes("privacy") ||
    query.includes("gdpr") ||
    query.includes("residency")
  ) {
    return {
      message:
        "Security is central to our engineering. We implement zero-trust architectures, end-to-end encryption, and design database and cloud topologies compliant with UAE local data residency regulations.",
      actions: [
        { label: "Security & Compliance Details", url: "/services" },
        { label: "Contact Us", url: "/contact" },
      ],
    };
  }

  // 7. Pricing / Cost / Budget / Rates
  if (
    query.includes("cost") ||
    query.includes("price") ||
    query.includes("pricing") ||
    query.includes("budget") ||
    query.includes("quote") ||
    query.includes("rate") ||
    query.includes("fee")
  ) {
    return {
      message:
        "Every project at PK IT Consultants is custom-scoped based on technical complexity, architectural requirements, and deliverable milestones. We provide transparent, itemized proposals after an initial discovery consultation.",
      actions: [
        { label: "Get a Free Project Quote", url: "/contact" },
      ],
    };
  }

  // 8. Founder / Leadership / Company Background
  if (
    query.includes("who are you") ||
    query.includes("about") ||
    query.includes("founder") ||
    query.includes("ceo") ||
    query.includes("managing director") ||
    query.includes("prasanna") ||
    query.includes("team") ||
    query.includes("company")
  ) {
    return {
      message:
        "PK IT Consultants was founded in Dubai by M. Prasanna Kumar, Founder & Managing Director, with a commitment to engineering excellence and client accountability. We operate on a senior-engineers-only delivery model.",
      actions: [
        { label: "Read Our Story", url: "/about" },
        { label: "Book Consultation", url: "/contact" },
      ],
    };
  }

  // 9. Client Portal
  if (query.includes("portal") || query.includes("login") || query.includes("client")) {
    return {
      message:
        "Clients of PK IT Consultants can access our dedicated Client Portal to monitor project progress, view deliverables, download invoices, and communicate securely with the engineering team.",
      actions: [
        { label: "Go to Client Portal", url: "/portal/login" },
        { label: "Need Access? Contact Us", url: "/contact" },
      ],
    };
  }

  // Default friendly response
  return {
    message:
      "Welcome to PK IT Consultants! We deliver enterprise AI solutions, custom software engineering, mobile apps, and strategic IT consultancy across Dubai, the UAE, and globally. How can we assist your technology goals today?",
    actions: [
      { label: "Our Services", url: "/services" },
      { label: "Book Free Consultation", url: "/contact" },
    ],
  };
}
