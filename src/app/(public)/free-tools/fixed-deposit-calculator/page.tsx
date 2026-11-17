import React from "react";
import type { Metadata } from "next";
import { Navbar } from "@/components/ui/Navbar";
import { Footer } from "@/components/ui/Footer";
import { FixedDepositCalculatorView } from "@/components/loan-calculators/FixedDepositCalculatorView";

export const metadata: Metadata = {
  title: {
    absolute: "Fixed Deposit (FD) Calculator | Term Deposit Maturity & Tax – Saviora",
  },
  description: "Free fixed deposit maturity calculator. Calculate cumulative growth vs periodic monthly/quarterly payouts, maturity dates, and withholding tax deductions.",
  keywords: ["Fixed Deposit Calculator","FD Calculator","Fixed Deposit Interest Calculator","Fixed Deposit Maturity Calculator","Deposit Interest Calculator","FD Maturity Amount Calculator"],
  alternates: {
    canonical: "https://saviora.app/free-tools/fixed-deposit-calculator",
  },
  openGraph: {
    title: "Fixed Deposit (FD) Calculator | Term Deposit Maturity & Tax – Saviora",
    description: "Free fixed deposit maturity calculator. Calculate cumulative growth vs periodic monthly/quarterly payouts, maturity dates, and withholding tax deductions.",
    url: "https://saviora.app/free-tools/fixed-deposit-calculator",
    siteName: "Saviora",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Fixed Deposit (FD) Calculator | Term Deposit Maturity & Tax – Saviora",
    description: "Free fixed deposit maturity calculator. Calculate cumulative growth vs periodic monthly/quarterly payouts, maturity dates, and withholding tax deductions.",
  },
};

export default function Page() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "Fixed Deposit (FD) Calculator",
    url: "https://saviora.app/free-tools/fixed-deposit-calculator",
    applicationCategory: "FinanceApplication",
    operatingSystem: "Any",
    description: "Free fixed deposit maturity calculator. Calculate cumulative growth vs periodic monthly/quarterly payouts, maturity dates, and withholding tax deductions.",
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
        name: "Fixed Deposit (FD) Calculator",
        item: "https://saviora.app/free-tools/fixed-deposit-calculator",
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
        <FixedDepositCalculatorView />
      </main>
      <Footer />
    </>
  );
}
