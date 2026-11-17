import React from "react";
import type { Metadata } from "next";
import { Navbar } from "@/components/ui/Navbar";
import { Footer } from "@/components/ui/Footer";
import { InvestmentSavingsHubView } from "@/components/investment-calculators/InvestmentSavingsHubView";

export const metadata: Metadata = {
  title: {
    absolute: "Free Investment & Savings Calculators – Wealth Planning Tools | Saviora",
  },
  description: "Free online investment and savings calculators. Project compound interest, monthly SIP returns, retirement nest eggs, emergency cushions, and inflation impact.",
  alternates: {
    canonical: "https://saviora.app/free-tools/investment-savings-tools",
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
    title: "Free Investment & Savings Calculators – Wealth Planning Tools | Saviora",
    description: "Free online investment and savings calculators. Project compound interest, monthly SIP returns, retirement nest eggs, emergency cushions, and inflation impact.",
    url: "https://saviora.app/free-tools/investment-savings-tools",
    siteName: "Saviora",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "https://saviora.app/images/og-image.png",
        width: 1200,
        height: 630,
        alt: "Free Investment & Savings Calculators Hub – Saviora",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Free Investment & Savings Calculators – Wealth Planning Tools | Saviora",
    description: "Free online investment and savings calculators. Project compound interest, monthly SIP returns, retirement nest eggs, emergency cushions, and inflation impact.",
    images: ["https://saviora.app/images/og-image.png"],
    creator: "@Saviora",
  },
};

const jsonLd = [
  {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "Saviora Free Investment & Savings Calculators Hub",
    "applicationCategory": "FinanceApplication",
    "operatingSystem": "Web, iOS, Android, macOS, Windows",
    "browserRequirements": "Requires JavaScript. Requires HTML5.",
    "offers": {
      "@type": "Offer",
      "price": "0.00",
      "priceCurrency": "USD"
    },
    "description": "Free online investment and savings calculators. Project compound interest, monthly SIP returns, retirement nest eggs, emergency cushions, and inflation impact.",
    "url": "https://saviora.app/free-tools/investment-savings-tools",
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
        <InvestmentSavingsHubView />
      </main>
      <Footer />
    </>
  );
}
