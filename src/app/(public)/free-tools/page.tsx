import React from "react";
import type { Metadata } from "next";
import { Navbar } from "@/components/ui/Navbar";
import { Footer } from "@/components/ui/Footer";
import { FreeToolsHubView } from "@/components/calculators/hub/FreeToolsHubView";

export const metadata: Metadata = {
  title: {
    absolute: "Free Salary, Tax & Statutory Calculators Sri Lanka | Saviora",
  },
  description:
    "Free interactive salary and tax calculators for Sri Lanka. Calculate gross-to-net salary, IRD progressive APIT income tax, EPF, ETF, VAT, gratuity, and overtime accurately.",
  keywords: [
    "salary calculator Sri Lanka",
    "free salary calculator",
    "income tax calculator Sri Lanka",
    "APIT calculator Sri Lanka",
    "EPF calculator Sri Lanka",
    "ETF calculator Sri Lanka",
    "take-home salary calculator",
    "VAT calculator Sri Lanka",
    "gratuity calculator Sri Lanka",
    "overtime calculator Sri Lanka",
  ],
  alternates: {
    canonical: "https://saviora.app/free-tools",
  },
  openGraph: {
    title: "Free Salary, Tax & Statutory Calculators Sri Lanka | Saviora",
    description:
      "Calculate your net take-home salary, IRD progressive income tax, EPF, ETF, VAT, gratuity, and overtime with official Sri Lankan statutory accuracy.",
    url: "https://saviora.app/free-tools",
    siteName: "Saviora",
    type: "website",
    images: [
      {
        url: "https://saviora.app/images/og-image.png",
        width: 1200,
        height: 630,
        alt: "Free Salary and Tax Tools – Saviora",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Free Salary, Tax & Statutory Calculators Sri Lanka | Saviora",
    description:
      "Calculate your net take-home salary, IRD progressive income tax, EPF, ETF, VAT, gratuity, and overtime with official Sri Lankan statutory accuracy.",
    images: ["https://saviora.app/images/og-image.png"],
  },
};

const jsonLd = [
  {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": "https://saviora.app/free-tools#webpage",
    url: "https://saviora.app/free-tools",
    name: "Free Salary, Tax & Statutory Calculators Sri Lanka | Saviora",
    description:
      "Free interactive salary and tax calculators for Sri Lanka. Calculate gross-to-net salary, IRD progressive APIT income tax, EPF, ETF, VAT, gratuity, and overtime.",
  },
  {
    "@context": "https://schema.org",
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
        name: "Free Tools",
        item: "https://saviora.app/free-tools",
      },
    ],
  },
];

export default function FreeToolsPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Navbar />
      <main>
        <FreeToolsHubView />
      </main>
      <Footer />
    </>
  );
}
