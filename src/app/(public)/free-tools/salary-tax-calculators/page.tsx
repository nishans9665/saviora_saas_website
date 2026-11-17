import React from "react";
import type { Metadata } from "next";
import { Navbar } from "@/components/ui/Navbar";
import { Footer } from "@/components/ui/Footer";
import { FreeToolsHubView } from "@/components/calculators/hub/FreeToolsHubView";

export const metadata: Metadata = {
  title: {
    absolute: "Salary & Tax Calculators – Free Global Income Tax & Take-Home Pay Tools | Saviora",
  },
  description:
    "Free interactive salary and tax calculators. Calculate gross-to-net salary, progressive income tax, EPF, ETF, VAT, gratuity, and overtime accurately across 8 countries.",
  keywords: [
    "salary calculator",
    "income tax calculator",
    "take-home pay calculator",
    "gross to net salary",
    "EPF calculator",
    "ETF calculator",
    "VAT calculator",
    "gratuity calculator",
    "overtime pay calculator",
    "statutory deductions",
  ],
  alternates: {
    canonical: "https://saviora.app/free-tools/salary-tax-calculators",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    title: "Salary & Tax Calculators – Free Global Income Tax & Take-Home Pay Tools | Saviora",
    description:
      "Calculate your net take-home salary, progressive income tax, retirement deductions, VAT, gratuity, and overtime with official statutory accuracy.",
    url: "https://saviora.app/free-tools/salary-tax-calculators",
    siteName: "Saviora",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "https://saviora.app/images/og-image.png",
        width: 1200,
        height: 630,
        alt: "Salary and Tax Calculators – Saviora",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Salary & Tax Calculators – Free Global Income Tax & Take-Home Pay Tools | Saviora",
    description:
      "Calculate your net take-home salary, progressive income tax, retirement deductions, VAT, gratuity, and overtime with official statutory accuracy.",
    images: ["https://saviora.app/images/og-image.png"],
    creator: "@Saviora",
  },
};

const jsonLd = [
  {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "Saviora Salary & Tax Calculators Hub",
    applicationCategory: "FinanceApplication",
    operatingSystem: "Web, iOS, Android, macOS, Windows",
    browserRequirements: "Requires JavaScript. Requires HTML5.",
    offers: {
      "@type": "Offer",
      price: "0.00",
      priceCurrency: "USD",
    },
    description:
      "Free interactive salary and tax calculators. Calculate gross-to-net salary, progressive income tax, EPF, ETF, VAT, gratuity, and overtime accurately across 8 countries.",
    url: "https://saviora.app/free-tools/salary-tax-calculators",
    publisher: {
      "@type": "Organization",
      name: "Saviora",
      url: "https://saviora.app",
      logo: {
        "@type": "ImageObject",
        url: "https://saviora.app/icon.png",
      },
    },
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
      {
        "@type": "ListItem",
        position: 3,
        name: "Salary & Tax Calculators",
        item: "https://saviora.app/free-tools/salary-tax-calculators",
      },
    ],
  },
];

export default function SalaryTaxCalculatorsPage() {
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
