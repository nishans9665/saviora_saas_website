import type { Metadata } from "next";
import { TermsClient } from "@/components/terms/TermsClient";

export const metadata: Metadata = {
  title: "Terms & Conditions",
  description:
    "Review Saviora's official Terms & Conditions governing your use of our personal finance platform, account responsibilities, disclaimers, and service policies.",
  alternates: {
    canonical: "/terms-and-conditions",
  },
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

const jsonLdData = [
  {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": "https://saviora.app/terms-and-conditions#webpage",
    url: "https://saviora.app/terms-and-conditions",
    name: "Terms & Conditions | Saviora",
    description:
      "Review Saviora's official Terms & Conditions governing your use of our personal finance platform, account responsibilities, disclaimers, and service policies.",
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
          name: "Terms & Conditions",
          item: "https://saviora.app/terms-and-conditions",
        },
      ],
    },
  },
];

export default function TermsAndConditionsPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLdData).replace(/</g, "\\u003c"),
        }}
      />
      <TermsClient />
    </>
  );
}
