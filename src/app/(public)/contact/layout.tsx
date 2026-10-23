import type { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Contact Us - Saviora",
  description:
    "Get in touch with the Saviora team for customer support, inquiries, feedback, or enterprise questions.",
  alternates: {
    canonical: "/contact",
  },
  openGraph: {
    title: "Contact Us | Saviora",
    description:
      "Get in touch with the Saviora team for customer support, inquiries, feedback, or enterprise questions.",
    url: "https://saviora.app/contact",
  },
};

const jsonLdData = [
  {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    "@id": "https://saviora.app/contact#webpage",
    url: "https://saviora.app/contact",
    name: "Contact Us | Saviora",
    description:
      "Get in touch with the Saviora team for customer support, inquiries, feedback, or enterprise questions.",
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
          name: "Contact",
          item: "https://saviora.app/contact",
        },
      ],
    },
    mainEntity: {
      "@type": "Organization",
      "@id": "https://saviora.app/#organization",
      name: "Saviora",
      url: "https://saviora.app",
      contactPoint: {
        "@type": "ContactPoint",
        contactType: "customer support",
        email: "support@saviora.com",
        availableLanguage: ["English"],
      },
    },
  },
];

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLdData).replace(/</g, "\\u003c"),
        }}
      />
      {children}
    </>
  );
}
