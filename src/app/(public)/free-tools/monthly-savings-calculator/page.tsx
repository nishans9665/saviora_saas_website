import React from "react";
import type { Metadata } from "next";
import { Navbar } from "@/components/ui/Navbar";
import { Footer } from "@/components/ui/Footer";
import { MonthlySavingsCalculatorView } from "@/components/investment-calculators/MonthlySavingsCalculatorView";

export const metadata: Metadata = {
  title: {
    absolute: "Monthly Savings Calculator – Compound Interest Account Growth | Saviora",
  },
  description: "Project how recurring monthly bank deposits grow with compound interest over time. Compare daily, monthly, and annual compounding frequencies easily.",
  alternates: {
    canonical: "https://saviora.app/free-tools/monthly-savings-calculator",
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
    title: "Monthly Savings Calculator – Compound Interest Account Growth | Saviora",
    description: "Project how recurring monthly bank deposits grow with compound interest over time. Compare daily, monthly, and annual compounding frequencies easily.",
    url: "https://saviora.app/free-tools/monthly-savings-calculator",
    siteName: "Saviora",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "https://saviora.app/images/og-image.png",
        width: 1200,
        height: 630,
        alt: "Monthly Savings Calculator – Saviora",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Monthly Savings Calculator – Compound Interest Account Growth | Saviora",
    description: "Project how recurring monthly bank deposits grow with compound interest over time. Compare daily, monthly, and annual compounding frequencies easily.",
    images: ["https://saviora.app/images/og-image.png"],
    creator: "@Saviora",
  },
};

const jsonLd = [
  {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "Saviora Monthly Savings Calculator",
    "applicationCategory": "FinanceApplication",
    "operatingSystem": "Web, iOS, Android, macOS, Windows",
    "browserRequirements": "Requires JavaScript. Requires HTML5.",
    "offers": {
      "@type": "Offer",
      "price": "0.00",
      "priceCurrency": "USD"
    },
    "description": "Project how recurring monthly bank deposits grow with compound interest over time. Compare daily, monthly, and annual compounding frequencies easily.",
    "url": "https://saviora.app/free-tools/monthly-savings-calculator",
    "publisher": {
      "@type": "Organization",
      "name": "Saviora",
      "url": "https://saviora.app",
      "logo": {
        "@type": "ImageObject",
        "url": "https://saviora.app/icon.png"
      }
    }
  },
  {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": "https://saviora.app"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Free Tools",
        "item": "https://saviora.app/free-tools"
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": "Investment & Savings Tools",
        "item": "https://saviora.app/free-tools/investment-savings-tools"
      },
      {
        "@type": "ListItem",
        "position": 4,
        "name": "Monthly Savings Calculator",
        "item": "https://saviora.app/free-tools/monthly-savings-calculator"
      }
    ]
  }
];

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Navbar />
      <main>
        <MonthlySavingsCalculatorView />
      </main>
      <Footer />
    </>
  );
}
