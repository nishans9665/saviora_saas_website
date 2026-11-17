import React from "react";
import type { Metadata } from "next";
import { Navbar } from "@/components/ui/Navbar";
import { Footer } from "@/components/ui/Footer";
import { LoanEMICalculatorView } from "@/components/loan-calculators/LoanEMICalculatorView";

export const metadata: Metadata = {
  title: {
    absolute: "Loan EMI Calculator | Free Monthly Instalment & Amortization Calculator – Saviora",
  },
  description: "Free loan EMI calculator with reducing balance interest. Calculate monthly payments, total interest, and download complete amortization schedules in CSV.",
  keywords: ["Loan EMI Calculator","EMI Calculator Online","Monthly Loan Payment Calculator","Loan Repayment Calculator","Loan Interest Calculator","Loan Amortization Calculator"],
  alternates: {
    canonical: "https://saviora.app/free-tools/loan-emi-calculator",
  },
  openGraph: {
    title: "Loan EMI Calculator | Free Monthly Instalment & Amortization Calculator – Saviora",
    description: "Free loan EMI calculator with reducing balance interest. Calculate monthly payments, total interest, and download complete amortization schedules in CSV.",
    url: "https://saviora.app/free-tools/loan-emi-calculator",
    siteName: "Saviora",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Loan EMI Calculator | Free Monthly Instalment & Amortization Calculator – Saviora",
    description: "Free loan EMI calculator with reducing balance interest. Calculate monthly payments, total interest, and download complete amortization schedules in CSV.",
  },
};

export default function Page() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "Loan EMI Calculator",
    url: "https://saviora.app/free-tools/loan-emi-calculator",
    applicationCategory: "FinanceApplication",
    operatingSystem: "Any",
    description: "Free loan EMI calculator with reducing balance interest. Calculate monthly payments, total interest, and download complete amortization schedules in CSV.",
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
        name: "Loan EMI Calculator",
        item: "https://saviora.app/free-tools/loan-emi-calculator",
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
        <LoanEMICalculatorView />
      </main>
      <Footer />
    </>
  );
}
