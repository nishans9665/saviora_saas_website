import React from "react";
import type { Metadata } from "next";
import { Navbar } from "@/components/ui/Navbar";
import { Footer } from "@/components/ui/Footer";
import { CompoundInterestCalculatorView } from "@/components/loan-calculators/CompoundInterestCalculatorView";

export const metadata: Metadata = {
  title: {
    absolute: "Compound Interest Calculator | Investment Growth & Monthly Deposits – Saviora",
  },
  description: "Free compound interest calculator. Project investment growth with regular monthly deposits, custom compounding frequencies, and year-by-year tables.",
  keywords: ["Compound Interest Calculator","Compound Interest Formula","Compound Interest Calculator Online","Investment Growth Calculator","Compound Interest with Monthly Contributions","Compound Savings Calculator"],
  alternates: {
    canonical: "https://saviora.app/free-tools/compound-interest-calculator",
  },
  openGraph: {
    title: "Compound Interest Calculator | Investment Growth & Monthly Deposits – Saviora",
    description: "Free compound interest calculator. Project investment growth with regular monthly deposits, custom compounding frequencies, and year-by-year tables.",
    url: "https://saviora.app/free-tools/compound-interest-calculator",
    siteName: "Saviora",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Compound Interest Calculator | Investment Growth & Monthly Deposits – Saviora",
    description: "Free compound interest calculator. Project investment growth with regular monthly deposits, custom compounding frequencies, and year-by-year tables.",
  },
};

export default function Page() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "Compound Interest Calculator",
    url: "https://saviora.app/free-tools/compound-interest-calculator",
    applicationCategory: "FinanceApplication",
    operatingSystem: "Any",
    description: "Free compound interest calculator. Project investment growth with regular monthly deposits, custom compounding frequencies, and year-by-year tables.",
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
        name: "Compound Interest Calculator",
        item: "https://saviora.app/free-tools/compound-interest-calculator",
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
        <CompoundInterestCalculatorView />
      </main>
      <Footer />
    </>
  );
}
