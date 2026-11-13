import React from "react";
import type { Metadata } from "next";
import { Navbar } from "@/components/ui/Navbar";
import { Footer } from "@/components/ui/Footer";
import { PersonalLoanCalculatorView } from "@/components/loan-calculators/PersonalLoanCalculatorView";

export const metadata: Metadata = {
  title: {
    absolute: "Personal Loan Calculator | Compare Reducing vs Flat Rate & Fees – Saviora",
  },
  description: "Calculate personal loan instalments, compare reducing balance vs flat rate interest, factor in processing fees, and understand your true cost of borrowing.",
  keywords: ["Personal Loan Calculator","Personal Loan EMI Calculator","Personal Loan Monthly Payment","Personal Loan Interest Calculator","Personal Loan Repayment Calculator"],
  alternates: {
    canonical: "https://saviora.app/free-tools/personal-loan-calculator",
  },
  openGraph: {
    title: "Personal Loan Calculator | Compare Reducing vs Flat Rate & Fees – Saviora",
    description: "Calculate personal loan instalments, compare reducing balance vs flat rate interest, factor in processing fees, and understand your true cost of borrowing.",
    url: "https://saviora.app/free-tools/personal-loan-calculator",
    siteName: "Saviora",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Personal Loan Calculator | Compare Reducing vs Flat Rate & Fees – Saviora",
    description: "Calculate personal loan instalments, compare reducing balance vs flat rate interest, factor in processing fees, and understand your true cost of borrowing.",
  },
};

export default function Page() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "Personal Loan Calculator",
    url: "https://saviora.app/free-tools/personal-loan-calculator",
    applicationCategory: "FinanceApplication",
    operatingSystem: "Any",
    description: "Calculate personal loan instalments, compare reducing balance vs flat rate interest, factor in processing fees, and understand your true cost of borrowing.",
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
        name: "Personal Loan Calculator",
        item: "https://saviora.app/free-tools/personal-loan-calculator",
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
        <PersonalLoanCalculatorView />
      </main>
      <Footer />
    </>
  );
}
