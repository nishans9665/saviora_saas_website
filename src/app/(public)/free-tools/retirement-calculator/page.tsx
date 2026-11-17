import React from "react";
import type { Metadata } from "next";
import { Navbar } from "@/components/ui/Navbar";
import { Footer } from "@/components/ui/Footer";
import { RetirementCalculatorView } from "@/components/investment-calculators/RetirementCalculatorView";

export const metadata: Metadata = {
  title: {
    absolute: "Retirement Calculator – Nest Egg & Safe Withdrawal Planner | Saviora",
  },
  description: "Calculate your required retirement nest egg and monthly contribution. Adjust for inflation, working years, life expectancy, and the 4% safe withdrawal rule.",
  alternates: {
    canonical: "https://saviora.app/free-tools/retirement-calculator",
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
    title: "Retirement Calculator – Nest Egg & Safe Withdrawal Planner | Saviora",
    description: "Calculate your required retirement nest egg and monthly contribution. Adjust for inflation, working years, life expectancy, and the 4% safe withdrawal rule.",
    url: "https://saviora.app/free-tools/retirement-calculator",
    siteName: "Saviora",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "https://saviora.app/images/og-image.png",
        width: 1200,
        height: 630,
        alt: "Retirement Calculator – Saviora",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Retirement Calculator – Nest Egg & Safe Withdrawal Planner | Saviora",
    description: "Calculate your required retirement nest egg and monthly contribution. Adjust for inflation, working years, life expectancy, and the 4% safe withdrawal rule.",
    images: ["https://saviora.app/images/og-image.png"],
    creator: "@Saviora",
  },
};

const jsonLd = [
  {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "Saviora Retirement Calculator",
    "applicationCategory": "FinanceApplication",
    "operatingSystem": "Web, iOS, Android, macOS, Windows",
    "browserRequirements": "Requires JavaScript. Requires HTML5.",
    "offers": {
      "@type": "Offer",
      "price": "0.00",
      "priceCurrency": "USD"
    },
    "description": "Calculate your required retirement nest egg and monthly contribution. Adjust for inflation, working years, life expectancy, and the 4% safe withdrawal rule.",
    "url": "https://saviora.app/free-tools/retirement-calculator",
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
        "name": "Retirement Calculator",
        "item": "https://saviora.app/free-tools/retirement-calculator"
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
        <RetirementCalculatorView />
      </main>
      <Footer />
    </>
  );
}
