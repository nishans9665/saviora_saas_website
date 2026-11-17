import React from "react";
import type { Metadata } from "next";
import { Navbar } from "@/components/ui/Navbar";
import { Footer } from "@/components/ui/Footer";
import { InvestmentProfitLossCalculatorView } from "@/components/investment-calculators/InvestmentProfitLossCalculatorView";

export const metadata: Metadata = {
  title: {
    absolute: "Investment Profit and Loss Calculator – Stock & Trade Returns | Saviora",
  },
  description: "Calculate net realized trade profits, ROI percentage, broker commissions, and break-even sale prices for stocks, ETFs, and crypto with instant formulas.",
  alternates: {
    canonical: "https://saviora.app/free-tools/investment-profit-loss-calculator",
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
    title: "Investment Profit and Loss Calculator – Stock & Trade Returns | Saviora",
    description: "Calculate net realized trade profits, ROI percentage, broker commissions, and break-even sale prices for stocks, ETFs, and crypto with instant formulas.",
    url: "https://saviora.app/free-tools/investment-profit-loss-calculator",
    siteName: "Saviora",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "https://saviora.app/images/og-image.png",
        width: 1200,
        height: 630,
        alt: "Investment Profit & Loss Calculator – Saviora",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Investment Profit and Loss Calculator – Stock & Trade Returns | Saviora",
    description: "Calculate net realized trade profits, ROI percentage, broker commissions, and break-even sale prices for stocks, ETFs, and crypto with instant formulas.",
    images: ["https://saviora.app/images/og-image.png"],
    creator: "@Saviora",
  },
};

const jsonLd = [
  {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "Saviora Investment Profit & Loss Calculator",
    "applicationCategory": "FinanceApplication",
    "operatingSystem": "Web, iOS, Android, macOS, Windows",
    "browserRequirements": "Requires JavaScript. Requires HTML5.",
    "offers": {
      "@type": "Offer",
      "price": "0.00",
      "priceCurrency": "USD"
    },
    "description": "Calculate net realized trade profits, ROI percentage, broker commissions, and break-even sale prices for stocks, ETFs, and crypto with instant formulas.",
    "url": "https://saviora.app/free-tools/investment-profit-loss-calculator",
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
        "name": "Investment Profit & Loss Calculator",
        "item": "https://saviora.app/free-tools/investment-profit-loss-calculator"
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
        <InvestmentProfitLossCalculatorView />
      </main>
      <Footer />
    </>
  );
}
