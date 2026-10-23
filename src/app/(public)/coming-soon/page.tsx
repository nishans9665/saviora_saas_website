import React from "react";
import type { Metadata } from "next";
import { ComingSoon } from "@/components/ui/ComingSoon";

export const metadata: Metadata = {
  title: "Coming Soon - Saviora",
  description: "Exciting new features and pages are coming soon to Saviora.",
  alternates: {
    canonical: "/coming-soon",
  },
};

const jsonLdData = [
  {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": "https://saviora.app/coming-soon#webpage",
    url: "https://saviora.app/coming-soon",
    name: "Coming Soon - Saviora",
    description: "Exciting new features and pages are coming soon to Saviora.",
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
          name: "Coming Soon",
          item: "https://saviora.app/coming-soon",
        },
      ],
    },
  },
];

export default function ComingSoonPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLdData).replace(/</g, "\\u003c"),
        }}
      />
      <ComingSoon 
        title="We're Building Something Amazing"
        subtitle="This page is under active development by the Saviora team. Subscribe below to get notified as soon as it launches!"
        category="🚀 Launching Soon"
      />
    </>
  );
}
