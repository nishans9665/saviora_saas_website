import React from "react";
import type { Metadata } from "next";
import { Navbar } from "@/components/ui/Navbar";
import { Footer } from "@/components/ui/Footer";
import { VATCalculatorView } from "@/components/calculators/vat/VATCalculatorView";

export const metadata: Metadata = {
  title: {
    absolute: "VAT / GST / Sales Tax Calculator | Add or Remove Consumption Tax – Saviora",
  },
  description: "Free consumption tax calculator. Add or remove Sales Tax, VAT, and GST with 100% mathematical accuracy and step-by-step formula transparency.",
  alternates: {
    canonical: "https://saviora.app/free-tools/vat-calculator",
  },
  openGraph: {
    title: "VAT / GST / Sales Tax Calculator | Add or Remove Consumption Tax – Saviora",
    description: "Free consumption tax calculator. Add or remove Sales Tax, VAT, and GST with 100% mathematical accuracy and step-by-step formula transparency.",
    url: "https://saviora.app/free-tools/vat-calculator",
    siteName: "Saviora",
    type: "website",
  },
};

const jsonLd = [
  {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "Saviora Vat Calculator",
    applicationCategory: "FinanceApplication",
    operatingSystem: "Web, iOS, Android",
    offers: { "@type": "Offer", price: "0.00", priceCurrency: "USD" },
    description: "Free consumption tax calculator. Add or remove Sales Tax, VAT, and GST with 100% mathematical accuracy and step-by-step formula transparency.",
    url: "https://saviora.app/free-tools/vat-calculator",
  },
  {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://saviora.app" },
      { "@type": "ListItem", position: 2, name: "Free Tools", item: "https://saviora.app/free-tools" },
      { "@type": "ListItem", position: 3, name: "Vat Calculator", item: "https://saviora.app/free-tools/vat-calculator" },
    ],
  },
];

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Navbar />
      <main>
        <VATCalculatorView />
      </main>
      <Footer />
    </>
  );
}
