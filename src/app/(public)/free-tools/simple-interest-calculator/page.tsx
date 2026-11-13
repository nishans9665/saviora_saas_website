import React from "react";
import type { Metadata } from "next";
import { Navbar } from "@/components/ui/Navbar";
import { Footer } from "@/components/ui/Footer";
import { SimpleInterestCalculatorView } from "@/components/loan-calculators/SimpleInterestCalculatorView";

export const metadata: Metadata = {
  title: {
    absolute: "Simple Interest Calculator | Calculate Days, Months & Years Online – Saviora",
  },
  description: "Free online simple interest formula calculator. Calculate total interest and maturity amount across days, months, and years with compound comparisons.",
  keywords: ["Simple Interest Calculator","Simple Interest Formula Calculator","Calculate Simple Interest Online","Interest Calculator","Principal Interest Calculator"],
  alternates: {
    canonical: "https://saviora.app/free-tools/simple-interest-calculator",
  },
  openGraph: {
    title: "Simple Interest Calculator | Calculate Days, Months & Years Online – Saviora",
    description: "Free online simple interest formula calculator. Calculate total interest and maturity amount across days, months, and years with compound comparisons.",
    url: "https://saviora.app/free-tools/simple-interest-calculator",
    siteName: "Saviora",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Simple Interest Calculator | Calculate Days, Months & Years Online – Saviora",
    description: "Free online simple interest formula calculator. Calculate total interest and maturity amount across days, months, and years with compound comparisons.",
  },
};

export default function Page() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "Simple Interest Calculator",
    url: "https://saviora.app/free-tools/simple-interest-calculator",
    applicationCategory: "FinanceApplication",
    operatingSystem: "Any",
    description: "Free online simple interest formula calculator. Calculate total interest and maturity amount across days, months, and years with compound comparisons.",
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
        name: "Simple Interest Calculator",
        item: "https://saviora.app/free-tools/simple-interest-calculator",
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
        <SimpleInterestCalculatorView />
      </main>
      <Footer />
    </>
  );
}
