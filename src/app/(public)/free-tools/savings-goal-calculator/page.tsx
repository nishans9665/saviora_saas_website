import React from "react";
import type { Metadata } from "next";
import { Navbar } from "@/components/ui/Navbar";
import { Footer } from "@/components/ui/Footer";
import { SavingsGoalCalculatorView } from "@/components/investment-calculators/SavingsGoalCalculatorView";

export const metadata: Metadata = {
  title: {
    absolute: "Savings Goal Calculator – Monthly Target Savings Planner | Saviora",
  },
  description: "Calculate how much you need to save each month or week to hit your financial goals. Factor in starting savings and high-yield interest APY compounding.",
  alternates: {
    canonical: "https://saviora.app/free-tools/savings-goal-calculator",
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
    title: "Savings Goal Calculator – Monthly Target Savings Planner | Saviora",
    description: "Calculate how much you need to save each month or week to hit your financial goals. Factor in starting savings and high-yield interest APY compounding.",
    url: "https://saviora.app/free-tools/savings-goal-calculator",
    siteName: "Saviora",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "https://saviora.app/images/og-image.png",
        width: 1200,
        height: 630,
        alt: "Savings Goal Calculator – Saviora",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Savings Goal Calculator – Monthly Target Savings Planner | Saviora",
    description: "Calculate how much you need to save each month or week to hit your financial goals. Factor in starting savings and high-yield interest APY compounding.",
    images: ["https://saviora.app/images/og-image.png"],
    creator: "@Saviora",
  },
};

const jsonLd = [
  {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "Saviora Savings Goal Calculator",
    "applicationCategory": "FinanceApplication",
    "operatingSystem": "Web, iOS, Android, macOS, Windows",
    "browserRequirements": "Requires JavaScript. Requires HTML5.",
    "offers": {
      "@type": "Offer",
      "price": "0.00",
      "priceCurrency": "USD"
    },
    "description": "Calculate how much you need to save each month or week to hit your financial goals. Factor in starting savings and high-yield interest APY compounding.",
    "url": "https://saviora.app/free-tools/savings-goal-calculator",
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
        "name": "Savings Goal Calculator",
        "item": "https://saviora.app/free-tools/savings-goal-calculator"
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
        <SavingsGoalCalculatorView />
      </main>
      <Footer />
    </>
  );
}
