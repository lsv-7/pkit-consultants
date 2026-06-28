import { Metadata } from "next";
import { COMPANY } from "@/lib/company";
import LoginClient from "./LoginClient";

export const metadata: Metadata = {
  title: "Admin Portal Login | " + COMPANY.name,
  description: "Securely log into the " + COMPANY.name + " administrator portal to access the CRM dashboard.",
};

export default function LoginPage() {
  return <LoginClient />;
}