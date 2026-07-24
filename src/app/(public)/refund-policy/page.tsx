import type { Metadata } from "next";
import { RefundPolicyClient } from "@/components/refund/RefundPolicyClient";

export const metadata: Metadata = {
  title: "Returns & Refunds Policy",
  description:
    "Review Saviora's official Returns & Refunds Policy. Learn about 14-day refund eligibility, technical support assistance, device compatibility, and refund request procedures.",
  keywords: [
    "Saviora Refund Policy",
    "Returns and Refunds",
    "14-Day Guarantee",
    "Subscription Refund",
    "Saviora Billing Support",
  ],
  openGraph: {
    title: "Returns & Refunds Policy | Saviora",
    description:
      "Review Saviora's official Returns & Refunds Policy and 14-day subscription eligibility details.",
    url: "https://saviora.app/refund-policy",
    siteName: "Saviora",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Returns & Refunds Policy | Saviora",
    description:
      "Review Saviora's official Returns & Refunds Policy and 14-day subscription eligibility details.",
  },
};

export default function RefundPolicyPage() {
  return <RefundPolicyClient />;
}
