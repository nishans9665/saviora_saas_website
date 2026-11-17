import React from "react";
import type { Metadata } from "next";
import { Navbar } from "@/components/ui/Navbar";
import { Footer } from "@/components/ui/Footer";
import { HomeLoanCalculatorView } from "@/components/loan-calculators/HomeLoanCalculatorView";

export const metadata: Metadata = {
  title: {
    absolute: "Home Loan & Mortgage Calculator | Payments, LTV, Taxes & Extra Pay – Saviora",
  },
  description: "Free home loan and mortgage calculator. Calculate monthly P&I, property taxes, insurance, HOA fees, LTV ratio, and extra payment interest savings.",
  keywords: ["Home Loan Calculator","Mortgage Calculator","Home Mortgage Calculator","Monthly Mortgage Payment","Home Loan EMI Calculator","House Loan Calculator"],
  alternates: {
    canonical: "https://saviora.app/free-tools/home-loan-calculator",
  },
  openGraph: {
    title: "Home Loan & Mortgage Calculator | Payments, LTV, Taxes & Extra Pay – Saviora",
    description: "Free home loan and mortgage calculator. Calculate monthly P&I, property taxes, insurance, HOA fees, LTV ratio, and extra payment interest savings.",
    url: "https://saviora.app/free-tools/home-loan-calculator",
    siteName: "Saviora",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Home Loan & Mortgage Calculator | Payments, LTV, Taxes & Extra Pay – Saviora",
    description: "Free home loan and mortgage calculator. Calculate monthly P&I, property taxes, insurance, HOA fees, LTV ratio, and extra payment interest savings.",
  },
};

export default function Page() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "Home Loan & Mortgage Calculator",
    url: "https://saviora.app/free-tools/home-loan-calculator",
    applicationCategory: "FinanceApplication",
    operatingSystem: "Any",
    description: "Free home loan and mortgage calculator. Calculate monthly P&I, property taxes, insurance, HOA fees, LTV ratio, and extra payment interest savings.",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
  };

  const breadcrumbJsonLd = {
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
        name: "Loan & Financial Tools",
        item: "https://saviora.app/free-tools/loan-financial-tools",
      },
      {
        "@type": "ListItem",
        position: 4,
        name: "Home Loan & Mortgage Calculator",
        item: "https://saviora.app/free-tools/home-loan-calculator",
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <Navbar />
      <main className="min-h-screen bg-slate-50/50">
        <HomeLoanCalculatorView />
      </main>
      <Footer />
    </>
  );
}
