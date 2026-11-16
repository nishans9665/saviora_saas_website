import React from "react";
import type { Metadata } from "next";
import { Navbar } from "@/components/ui/Navbar";
import { Footer } from "@/components/ui/Footer";
import { EmergencyFundCalculatorView } from "@/components/investment-calculators/EmergencyFundCalculatorView";

export const metadata: Metadata = {
  title: {
    absolute: "Emergency Fund Calculator – 3 to 12-Month Safety Net Planner | Saviora",
  },
  description: "Calculate your recommended emergency fund based on itemized monthly essential living expenses. Find your savings gap and required monthly savings rate.",
  alternates: {
    canonical: "https://saviora.app/free-tools/emergency-fund-calculator",
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
    title: "Emergency Fund Calculator – 3 to 12-Month Safety Net Planner | Saviora",
    description: "Calculate your recommended emergency fund based on itemized monthly essential living expenses. Find your savings gap and required monthly savings rate.",
    url: "https://saviora.app/free-tools/emergency-fund-calculator",
    siteName: "Saviora",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "https://saviora.app/images/og-image.png",
        width: 1200,
        height: 630,
        alt: "Emergency Fund Calculator – Saviora",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Emergency Fund Calculator – 3 to 12-Month Safety Net Planner | Saviora",
    description: "Calculate your recommended emergency fund based on itemized monthly essential living expenses. Find your savings gap and required monthly savings rate.",
    images: ["https://saviora.app/images/og-image.png"],
    creator: "@Saviora",
  },
};

const jsonLd = [
  {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "Saviora Emergency Fund Calculator",
    "applicationCategory": "FinanceApplication",
    "operatingSystem": "Web, iOS, Android, macOS, Windows",
    "browserRequirements": "Requires JavaScript. Requires HTML5.",
    "offers": {
      "@type": "Offer",
      "price": "0.00",
      "priceCurrency": "USD"
    },
    "description": "Calculate your recommended emergency fund based on itemized monthly essential living expenses. Find your savings gap and required monthly savings rate.",
    "url": "https://saviora.app/free-tools/emergency-fund-calculator",
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
        "name": "Emergency Fund Calculator",
        "item": "https://saviora.app/free-tools/emergency-fund-calculator"
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
        <EmergencyFundCalculatorView />
      </main>
      <Footer />
    </>
  );
}
