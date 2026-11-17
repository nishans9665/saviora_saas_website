import React from "react";
import type { Metadata } from "next";
import { Navbar } from "@/components/ui/Navbar";
import { Footer } from "@/components/ui/Footer";
import { CreditCardInterestCalculatorView } from "@/components/loan-calculators/CreditCardInterestCalculatorView";

export const metadata: Metadata = {
  title: {
    absolute: "Credit Card Interest Calculator | Minimum Payment Trap & Payoff – Saviora",
  },
  description: "Calculate credit card payoff timelines, see interest charges, avoid negative amortization, and discover how paying extra eliminates card debt years sooner.",
  keywords: ["Credit Card Interest Calculator","Credit Card Payment Calculator","Credit Card APR Calculator","Credit Card Monthly Interest","Credit Card Minimum Payment Calculator","Credit Card Payoff Calculator"],
  alternates: {
    canonical: "https://saviora.app/free-tools/credit-card-interest-calculator",
  },
  openGraph: {
    title: "Credit Card Interest Calculator | Minimum Payment Trap & Payoff – Saviora",
    description: "Calculate credit card payoff timelines, see interest charges, avoid negative amortization, and discover how paying extra eliminates card debt years sooner.",
    url: "https://saviora.app/free-tools/credit-card-interest-calculator",
    siteName: "Saviora",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Credit Card Interest Calculator | Minimum Payment Trap & Payoff – Saviora",
    description: "Calculate credit card payoff timelines, see interest charges, avoid negative amortization, and discover how paying extra eliminates card debt years sooner.",
  },
};

export default function Page() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "Credit Card Interest Calculator",
    url: "https://saviora.app/free-tools/credit-card-interest-calculator",
    applicationCategory: "FinanceApplication",
    operatingSystem: "Any",
    description: "Calculate credit card payoff timelines, see interest charges, avoid negative amortization, and discover how paying extra eliminates card debt years sooner.",
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
        name: "Credit Card Interest Calculator",
        item: "https://saviora.app/free-tools/credit-card-interest-calculator",
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
        <CreditCardInterestCalculatorView />
      </main>
      <Footer />
    </>
  );
}
