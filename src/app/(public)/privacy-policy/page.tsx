import type { Metadata } from "next";
import { PrivacyPolicyClient } from "@/components/privacy/PrivacyPolicyClient";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "Learn how Saviora collects, uses, stores, and protects your personal and financial information. Complete privacy rights, security standards, and data retention details.",
  keywords: [
    "Saviora Privacy Policy",
    "Data Protection",
    "Financial Data Security",
    "Personal Finance Privacy",
    "Account Data Retention",
  ],
  openGraph: {
    title: "Privacy Policy | Saviora",
    description:
      "Learn how Saviora collects, uses, stores, and protects your personal and financial information.",
    url: "https://saviora.app/privacy-policy",
    siteName: "Saviora",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Privacy Policy | Saviora",
    description:
      "Learn how Saviora collects, uses, stores, and protects your personal and financial information.",
  },
};

export default function PrivacyPolicyPage() {
  return <PrivacyPolicyClient />;
}
