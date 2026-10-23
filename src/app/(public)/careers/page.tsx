import React from "react";
import type { Metadata } from "next";
import { ComingSoon } from "@/components/ui/ComingSoon";

export const metadata: Metadata = {
  title: "Careers - Saviora",
  description: "Join the Saviora team and help us build the future of personal finance.",
  alternates: {
    canonical: "/careers",
  },
};

const jsonLdData = [
  {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": "https://saviora.app/careers#webpage",
    url: "https://saviora.app/careers",
    name: "Careers - Saviora",
    description: "Join the Saviora team and help us build the future of personal finance.",
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
          name: "Careers",
          item: "https://saviora.app/careers",
        },
      ],
    },
  },
];

export default function CareersPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLdData).replace(/</g, "\\u003c"),
        }}
      />
      <ComingSoon 
        title="Careers at Saviora - Coming Soon"
        subtitle="We are growing fast and will soon be opening remote positions across engineering, product design, marketing, and customer support!"
        category=" Join Our Team"
      />
    </>
  );
}
