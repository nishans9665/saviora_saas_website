import React from "react";
import type { Metadata } from "next";
import { Navbar } from "@/components/ui/Navbar";
import { Footer } from "@/components/ui/Footer";
import { LoanFinancialHubView } from "@/components/loan-calculators/LoanFinancialHubView";

export const metadata: Metadata = {
  title: {
    absolute: "Free Loan & Financial Calculators – Calculate EMI, Interest & Repayments | Saviora",
  },
  description: "Use Saviora's free online financial calculators to calculate loan EMI, personal loans, home loans, vehicle loans, compound interest, fixed deposits and debt repayments.",
  keywords: ["loan calculator","financial calculators","EMI calculator","compound interest calculator","mortgage calculator","car loan calculator","fixed deposit calculator","debt repayment calculator","credit card interest calculator"],
  alternates: {
    canonical: "https://saviora.app/free-tools/loan-financial-tools",
  },
  openGraph: {
    title: "Free Loan & Financial Calculators – Calculate EMI, Interest & Repayments | Saviora",
    description: "Use Saviora's free online financial calculators to calculate loan EMI, personal loans, home loans, vehicle loans, compound interest, fixed deposits and debt repayments.",
    url: "https://saviora.app/free-tools/loan-financial-tools",
    siteName: "Saviora",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Free Loan & Financial Calculators – Calculate EMI, Interest & Repayments | Saviora",
    description: "Use Saviora's free online financial calculators to calculate loan EMI, personal loans, home loans, vehicle loans, compound interest, fixed deposits and debt repayments.",
  },
};

export default function Page() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "Free Loan & Financial Calculators – Calculate EMI, Interest & Repayments",
    url: "https://saviora.app/free-tools/loan-financial-tools",
    applicationCategory: "FinanceApplication",
    operatingSystem: "Any",
    description: "Use Saviora's free online financial calculators to calculate loan EMI, personal loans, home loans, vehicle loans, compound interest, fixed deposits and debt repayments.",
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
        name: "Free Loan & Financial Calculators – Calculate EMI, Interest & Repayments",
        item: "https://saviora.app/free-tools/loan-financial-tools",
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
        <LoanFinancialHubView />
      </main>
      <Footer />
    </>
  );
}
