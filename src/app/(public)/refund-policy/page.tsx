import type { Metadata } from "next";
import { RefundPolicyClient } from "@/components/refund/RefundPolicyClient";

export const metadata: Metadata = {
  title: "Returns & Refunds Policy",
  description:
    "Review Saviora's official Returns & Refunds Policy. Learn about 14-day refund eligibility, technical support assistance, device compatibility, and refund request procedures.",
  alternates: {
    canonical: "/refund-policy",
  },
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

const jsonLdData = [
  {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": "https://saviora.app/refund-policy#webpage",
    url: "https://saviora.app/refund-policy",
    name: "Returns & Refunds Policy | Saviora",
    description:
      "Review Saviora's official Returns & Refunds Policy. Learn about 14-day refund eligibility, technical support assistance, device compatibility, and refund request procedures.",
    isPartOf: {
      "@type": "WebSite",
      "@id": "https://saviora.app/#website",
      name: "Saviora",
      url: "https://saviora.app",
    },
    breadcrumb: {
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Home",
          item: "https://saviora.app",
        },
        {
          "@type": "ListItem",
          position: 2,
          name: "Returns & Refunds Policy",
          item: "https://saviora.app/refund-policy",
        },
      ],
    },
  },
];

export default function RefundPolicyPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLdData).replace(/</g, "\\u003c"),
        }}
      />
      <RefundPolicyClient />
    </>
  );
}
