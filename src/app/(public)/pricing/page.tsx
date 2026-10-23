import React from "react";
import type { Metadata } from "next";
import { Navbar } from "@/components/ui/Navbar";
import { Footer } from "@/components/ui/Footer";
import { Pricing } from "@/components/sections/Pricing";
import { FAQ } from "@/components/sections/FAQ";
import { FinalCTA } from "@/components/sections/FinalCTA";
import { faqs } from "@/lib/faqs";

export const metadata: Metadata = {
  title: {
    absolute: "Saviora Pricing | Plans & 90-Day Free Trial",
  },
  description:
    "Explore Saviora pricing and features. Try Saviora Pro free for 90 days, then choose the monthly or yearly plan that fits your needs.",
  alternates: {
    canonical: "/pricing",
  },
  openGraph: {
    title: "Saviora Pricing | Plans & 90-Day Free Trial",
    description:
      "Explore Saviora pricing and features. Try Saviora Pro free for 90 days, then choose the monthly or yearly plan that fits your needs.",
    url: "https://saviora.app/pricing",
    siteName: "Saviora",
    type: "website",
    images: [
      {
        url: "https://saviora.app/images/android-chrome-512x512.png",
        width: 512,
        height: 512,
        alt: "Saviora personal finance app for expense tracking and budgeting",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Saviora Pricing | Plans & 90-Day Free Trial",
    description:
      "Explore Saviora pricing and features. Try Saviora Pro free for 90 days, then choose the monthly or yearly plan that fits your needs.",
    images: ["https://saviora.app/images/android-chrome-512x512.png"],
  },
};

const jsonLdData = [
  {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": "https://saviora.app/pricing#webpage",
    url: "https://saviora.app/pricing",
    name: "Saviora Pricing | Plans & 90-Day Free Trial",
    description:
      "Explore Saviora pricing and features. Try Saviora Pro free for 90 days, then choose the monthly or yearly plan that fits your needs.",
    isPartOf: {
      "@type": "WebSite",
      "@id": "https://saviora.app/#website",
      name: "Saviora",
      url: "https://saviora.app",
    },
    breadcrumb: {
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
          name: "Pricing",
          item: "https://saviora.app/pricing",
        },
      ],
    },
  },
  {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "Saviora",
    applicationCategory: "FinanceApplication",
    operatingSystem: "Web",
    url: "https://saviora.app/pricing",
    description:
      "Saviora personal finance management app offering 90-day free trial, expense tracking, budget planning, and savings goals.",
    offers: [
      {
        "@type": "Offer",
        name: "Free Trial",
        price: "0",
        priceCurrency: "USD",
        description: "90-day free trial with full Pro access, no credit card required.",
      },
      {
        "@type": "Offer",
        name: "Saviora Pro Monthly",
        price: "2.99",
        priceCurrency: "USD",
        priceSpecification: {
          "@type": "UnitPriceSpecification",
          price: "2.99",
          priceCurrency: "USD",
          unitCode: "MON",
        },
        description: "Saviora Pro Monthly subscription billed monthly, cancel anytime.",
      },
      {
        "@type": "Offer",
        name: "Saviora Pro Yearly",
        price: "29.99",
        priceCurrency: "USD",
        priceSpecification: {
          "@type": "UnitPriceSpecification",
          price: "29.99",
          priceCurrency: "USD",
          unitCode: "ANN",
        },
        description: "Saviora Pro Yearly subscription billed annually, save 16%.",
      },
    ],
  },
  {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  },
];

export default function PricingPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLdData).replace(/</g, "\\u003c"),
        }}
      />
      <Navbar />
      <main className="min-h-screen pt-20">
        <Pricing />
        <FAQ />
        <FinalCTA />
      </main>
      <Footer />
    </>
  );
}
