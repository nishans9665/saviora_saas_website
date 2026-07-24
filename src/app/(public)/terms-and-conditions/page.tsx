import type { Metadata } from "next";
import { TermsClient } from "@/components/terms/TermsClient";

export const metadata: Metadata = {
  title: "Terms & Conditions",
  description:
    "Review Saviora's official Terms & Conditions governing your use of our personal finance platform, account responsibilities, disclaimers, and service policies.",
  keywords: [
    "Saviora Terms and Conditions",
    "Terms of Service",
    "Legal Agreement",
    "Personal Finance Terms",
    "Saviora User Agreement",
  ],
  openGraph: {
    title: "Terms & Conditions | Saviora",
    description:
      "Review Saviora's official Terms & Conditions governing your use of our personal finance platform.",
    url: "https://saviora.app/terms-and-conditions",
    siteName: "Saviora",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Terms & Conditions | Saviora",
    description:
      "Review Saviora's official Terms & Conditions governing your use of our personal finance platform.",
  },
};

export default function TermsAndConditionsPage() {
  return <TermsClient />;
}
