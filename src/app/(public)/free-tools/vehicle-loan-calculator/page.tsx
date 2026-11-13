import React from "react";
import type { Metadata } from "next";
import { Navbar } from "@/components/ui/Navbar";
import { Footer } from "@/components/ui/Footer";
import { VehicleLoanCalculatorView } from "@/components/loan-calculators/VehicleLoanCalculatorView";

export const metadata: Metadata = {
  title: {
    absolute: "Vehicle & Car Loan Calculator | Auto Finance, Trade-in & Fees – Saviora",
  },
  description: "Calculate monthly vehicle loan payments with down payment, trade-in credit, sales tax, dealer fees, and compare 36 to 84-month tenures.",
  keywords: ["Vehicle Loan Calculator","Car Loan Calculator","Auto Loan Calculator","Car EMI Calculator","Monthly Car Payment Calculator","Vehicle Finance Calculator"],
  alternates: {
    canonical: "https://saviora.app/free-tools/vehicle-loan-calculator",
  },
  openGraph: {
    title: "Vehicle & Car Loan Calculator | Auto Finance, Trade-in & Fees – Saviora",
    description: "Calculate monthly vehicle loan payments with down payment, trade-in credit, sales tax, dealer fees, and compare 36 to 84-month tenures.",
    url: "https://saviora.app/free-tools/vehicle-loan-calculator",
    siteName: "Saviora",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Vehicle & Car Loan Calculator | Auto Finance, Trade-in & Fees – Saviora",
    description: "Calculate monthly vehicle loan payments with down payment, trade-in credit, sales tax, dealer fees, and compare 36 to 84-month tenures.",
  },
};

export default function Page() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "Vehicle & Car Loan Calculator",
    url: "https://saviora.app/free-tools/vehicle-loan-calculator",
    applicationCategory: "FinanceApplication",
    operatingSystem: "Any",
    description: "Calculate monthly vehicle loan payments with down payment, trade-in credit, sales tax, dealer fees, and compare 36 to 84-month tenures.",
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
        name: "Vehicle & Car Loan Calculator",
        item: "https://saviora.app/free-tools/vehicle-loan-calculator",
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
        <VehicleLoanCalculatorView />
      </main>
      <Footer />
    </>
  );
}
