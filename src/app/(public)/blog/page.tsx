import React from "react";
import type { Metadata } from "next";
import { ComingSoon } from "@/components/ui/ComingSoon";

export const metadata: Metadata = {
  title: "Blog - Saviora",
  description: "Financial insights, budgeting tips, and personal finance guides from Saviora.",
  alternates: {
    canonical: "/blog",
  },
};

const jsonLdData = [
  {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "@id": "https://saviora.app/blog#webpage",
    url: "https://saviora.app/blog",
    name: "Blog - Saviora",
    description: "Financial insights, budgeting tips, and personal finance guides from Saviora.",
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
          name: "Blog",
          item: "https://saviora.app/blog",
        },
      ],
    },
  },
];

export default function BlogPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLdData).replace(/</g, "\\u003c"),
        }}
      />
      <ComingSoon 
        title="Saviora Blog - Coming Soon"
        subtitle="Our team of finance experts and writers are crafting in-depth guides, budgeting strategies, and money management tips for you."
        category=" Saviora Blog"
      />
    </>
  );
}
