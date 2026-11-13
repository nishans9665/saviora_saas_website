import React from "react";
import type { Metadata } from "next";
import { Navbar } from "@/components/ui/Navbar";
import { Footer } from "@/components/ui/Footer";
import { IncomeHero } from "@/components/income-tracker/IncomeHero";
import { IncomeFeatures } from "@/components/income-tracker/IncomeFeatures";
import { IncomeBenefits } from "@/components/income-tracker/IncomeBenefits";
import { IncomeHowItWorks } from "@/components/income-tracker/IncomeHowItWorks";
import { IncomeRelatedFeatures } from "@/components/income-tracker/IncomeRelatedFeatures";
import { IncomeFAQ } from "@/components/income-tracker/IncomeFAQ";
import { IncomeFinalCTA } from "@/components/income-tracker/IncomeFinalCTA";

export const metadata: Metadata = {
  title: {
    absolute: "Income Tracker App | Track Your Income with Saviora",
  },
  description:
    "Track income from different sources, organize earnings, and review your income history with Saviora. Understand your cash inflows and manage your money with confidence.",
  alternates: {
    canonical: "https://saviora.app/income-tracker",
  },
  keywords: [],
  openGraph: {
    title: "Income Tracker App | Track Your Income with Saviora",
    description:
      "Track income from different sources, organize earnings, and review your income history with Saviora. Understand your cash inflows and manage your money with confidence.",
    url: "https://saviora.app/income-tracker",
    siteName: "Saviora",
    type: "website",
    images: [
      {
        url: "https://saviora.app/images/og-image.png",
        width: 1200,
        height: 630,
        alt: "Income Tracker App | Track Your Income with Saviora",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Income Tracker App | Track Your Income with Saviora",
    description:
      "Track income from different sources, organize earnings, and review your income history with Saviora. Understand your cash inflows and manage your money with confidence.",
    images: ["https://saviora.app/images/og-image.png"],
  },
};

const jsonLdData = [
  {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": "https://saviora.app/income-tracker#webpage",
    url: "https://saviora.app/income-tracker",
    name: "Income Tracker App | Track Your Income with Saviora",
    description:
      "Track income from different sources, organize earnings, and review your income history with Saviora. Understand your cash inflows and manage your money with confidence.",
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
          name: "Income Tracker",
          item: "https://saviora.app/income-tracker",
        },
      ],
    },
  },
  {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "Saviora Income Tracker",
    applicationCategory: "FinanceApplication",
    operatingSystem: "Web, iOS, Android",
    url: "https://saviora.app/income-tracker",
    description:
      "Track income from different sources, organize earnings, and review your income history with Saviora. Understand your cash inflows and manage your money with confidence.",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
      description: "90-day free trial with full Pro access, no credit card required.",
    },
    featureList: [
      "Record Income Entries",
      "Multiple Income Sources Tracking",
      "Income Categorization",
      "Monthly Income History & Trend Summaries",
      "Multi-Currency Support",
    ],
  },
  {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "What is an income tracker?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "An income tracker is a tool for recording and reviewing money you receive. It helps you keep income records organized and understand your earnings over time.",
        },
      },
      {
        "@type": "Question",
        name: "How can I track my income with Saviora?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Use Saviora to record income entries, organize them using the available categories, and review your income history and financial summaries.",
        },
      },
      {
        "@type": "Question",
        name: "Can I track income from different sources?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Saviora's income tracking feature helps you organize income from different sources. Record each income entry using the details supported by the application.",
        },
      },
      {
        "@type": "Question",
        name: "Why should I track my income and expenses together?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Tracking both helps you compare the money coming in with the money going out. This provides a clearer foundation for planning budgets and setting savings goals.",
        },
      },
      {
        "@type": "Question",
        name: "Can income tracking help me plan a budget?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Keeping accurate income records can help you understand the money available for planned expenses and savings. Saviora's budget planning features can support this process.",
        },
      },
      {
        "@type": "Question",
        name: "Is my income data secure?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Saviora uses industry-standard encryption and secure cloud infrastructure to protect your personal financial records. Your data remains private and confidential. Please refer to our official Privacy Policy for more information on our data protection practices.",
        },
      },
    ],
  },
];

export default function IncomeTrackerPage() {
  return (
    <>
      {/* Schema.org Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLdData).replace(/</g, "\\u003c"),
        }}
      />
      <Navbar />
      <main className="min-h-screen bg-white">
        <IncomeHero />
        <IncomeFeatures />
        <IncomeBenefits />
        <IncomeHowItWorks />
        <IncomeRelatedFeatures />
        <IncomeFAQ />
        <IncomeFinalCTA />
      </main>
      <Footer />
    </>
  );
}
