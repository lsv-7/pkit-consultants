export interface Lead {
  id: string;

  fullName: string;

  email: string;

  phone: string;

  company: string | null;

  service: string;

  budget: string | null;

  contactMethod: string | null;

  timeline: string | null;

  projectDescription: string | null;

  status: string;

  createdAt: string;
}