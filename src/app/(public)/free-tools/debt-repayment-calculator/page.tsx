import React from "react";
import type { Metadata } from "next";
import { Navbar } from "@/components/ui/Navbar";
import { Footer } from "@/components/ui/Footer";
import { DebtRepaymentCalculatorView } from "@/components/loan-calculators/DebtRepaymentCalculatorView";

export const metadata: Metadata = {
  title: {
    absolute: "Debt Repayment Calculator | Snowball vs Avalanche Debt Payoff – Saviora",
  },
  description: "Free multi-debt payoff planner. Compare Debt Snowball vs Debt Avalanche, see your debt-free date, calculate interest savings, and export your payoff plan.",
  keywords: ["Debt Repayment Calculator","Debt Payoff Calculator","Debt Snowball Calculator","Debt Avalanche Calculator","Loan Payoff Calculator","Debt Free Calculator"],
  alternates: {
    canonical: "https://saviora.app/free-tools/debt-repayment-calculator",
  },
  openGraph: {
    title: "Debt Repayment Calculator | Snowball vs Avalanche Debt Payoff – Saviora",
    description: "Free multi-debt payoff planner. Compare Debt Snowball vs Debt Avalanche, see your debt-free date, calculate interest savings, and export your payoff plan.",
    url: "https://saviora.app/free-tools/debt-repayment-calculator",
    siteName: "Saviora",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Debt Repayment Calculator | Snowball vs Avalanche Debt Payoff – Saviora",
    description: "Free multi-debt payoff planner. Compare Debt Snowball vs Debt Avalanche, see your debt-free date, calculate interest savings, and export your payoff plan.",
  },
};

export default function Page() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "Debt Repayment Calculator",
    url: "https://saviora.app/free-tools/debt-repayment-calculator",
    applicationCategory: "FinanceApplication",
    operatingSystem: "Any",
    description: "Free multi-debt payoff planner. Compare Debt Snowball vs Debt Avalanche, see your debt-free date, calculate interest savings, and export your payoff plan.",
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
        name: "Debt Repayment Calculator",
        item: "https://saviora.app/free-tools/debt-repayment-calculator",
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
        <DebtRepaymentCalculatorView />
      </main>
      <Footer />
    </>
  );
}
