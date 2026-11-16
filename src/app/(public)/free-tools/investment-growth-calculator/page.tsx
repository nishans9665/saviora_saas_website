import React from "react";
import type { Metadata } from "next";
import { Navbar } from "@/components/ui/Navbar";
import { Footer } from "@/components/ui/Footer";
import { InvestmentGrowthCalculatorView } from "@/components/investment-calculators/InvestmentGrowthCalculatorView";

export const metadata: Metadata = {
  title: {
    absolute: "Investment Growth Calculator – Portfolio Compound Simulator | Saviora",
  },
  description: "Simulate multi-year portfolio growth with initial capital, recurring deposits, and customizable compounding frequencies. See interactive growth charts.",
  alternates: {
    canonical: "https://saviora.app/free-tools/investment-growth-calculator",
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
    title: "Investment Growth Calculator – Portfolio Compound Simulator | Saviora",
    description: "Simulate multi-year portfolio growth with initial capital, recurring deposits, and customizable compounding frequencies. See interactive growth charts.",
    url: "https://saviora.app/free-tools/investment-growth-calculator",
    siteName: "Saviora",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "https://saviora.app/images/og-image.png",
        width: 1200,
        height: 630,
        alt: "Investment Growth Calculator – Saviora",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Investment Growth Calculator – Portfolio Compound Simulator | Saviora",
    description: "Simulate multi-year portfolio growth with initial capital, recurring deposits, and customizable compounding frequencies. See interactive growth charts.",
    images: ["https://saviora.app/images/og-image.png"],
    creator: "@Saviora",
  },
};

const jsonLd = [
  {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "Saviora Investment Growth Calculator",
    "applicationCategory": "FinanceApplication",
    "operatingSystem": "Web, iOS, Android, macOS, Windows",
    "browserRequirements": "Requires JavaScript. Requires HTML5.",
    "offers": {
      "@type": "Offer",
      "price": "0.00",
      "priceCurrency": "USD"
    },
    "description": "Simulate multi-year portfolio growth with initial capital, recurring deposits, and customizable compounding frequencies. See interactive growth charts.",
    "url": "https://saviora.app/free-tools/investment-growth-calculator",
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
        "name": "Investment Growth Calculator",
        "item": "https://saviora.app/free-tools/investment-growth-calculator"
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
        <InvestmentGrowthCalculatorView />
      </main>
      <Footer />
    </>
  );
}
