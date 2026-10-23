import React from "react";
import type { Metadata } from "next";
import { Navbar } from "@/components/ui/Navbar";
import { Footer } from "@/components/ui/Footer";
import { Features } from "@/components/sections/Features";
import { SmartFeatures } from "@/components/sections/SmartFeatures";
import { FinalCTA } from "@/components/sections/FinalCTA";

export const metadata: Metadata = {
  title: "Features - Personal Finance & Budget Tracker | Saviora",
  description:
    "Explore Saviora features: smart expense tracking, interactive budget planning, savings goals, cash flow projections, and data security.",
  alternates: {
    canonical: "/features",
  },
  openGraph: {
    title: "Features | Saviora",
    description:
      "Explore Saviora features: smart expense tracking, interactive budget planning, savings goals, and data security.",
    url: "https://saviora.app/features",
  },
};

const jsonLdData = [
  {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": "https://saviora.app/features#webpage",
    url: "https://saviora.app/features",
    name: "Features - Personal Finance & Budget Tracker | Saviora",
    description:
      "Explore Saviora features: smart expense tracking, interactive budget planning, savings goals, cash flow projections, and data security.",
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
          name: "Features",
          item: "https://saviora.app/features",
        },
      ],
    },
  },
  {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "Saviora Personal Finance Features",
    applicationCategory: "FinanceApplication",
    operatingSystem: "Web",
    url: "https://saviora.app/features",
    description:
      "Explore Saviora features: smart expense tracking, interactive budget planning, savings goals, cash flow projections, and data security.",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
      description: "90-day free trial with full Pro access, no credit card required.",
    },
    featureList: [
      "Smart Expense Tracking",
      "Income Tracking & Multiple Sources",
      "Monthly Budget Planning & Category Limits",
      "Interactive Savings Goals Tracker",
      "Financial Health Analytics & Reports",
      "Multi-Currency Management",
      "CSV & PDF Data Export",
      "Bank-Grade 256-Bit Data Encryption",
    ],
  },
];

export default function FeaturesPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLdData).replace(/</g, "\\u003c"),
        }}
      />
      <main className="min-h-screen bg-slate-50 dark:bg-slate-950 flex flex-col justify-between">
        <Navbar />
        <div className="pt-24 pb-16">
          <Features />
          <SmartFeatures />
          <FinalCTA />
        </div>
        <Footer />
      </main>
    </>
  );
}
