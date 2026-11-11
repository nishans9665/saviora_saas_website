import React from "react";
import type { Metadata } from "next";
import { Navbar } from "@/components/ui/Navbar";
import { Footer } from "@/components/ui/Footer";
import { RecurringHero } from "@/components/recurring-transactions/RecurringHero";
import { RecurringProblemSolution } from "@/components/recurring-transactions/RecurringProblemSolution";
import { RecurringFeatures } from "@/components/recurring-transactions/RecurringFeatures";
import { RecurringFlexibleScheduling } from "@/components/recurring-transactions/RecurringFlexibleScheduling";
import { RecurringHowItWorks } from "@/components/recurring-transactions/RecurringHowItWorks";
import { RecurringLifecycleAndEditing } from "@/components/recurring-transactions/RecurringLifecycleAndEditing";
import { RecurringRelatedFeatures } from "@/components/recurring-transactions/RecurringRelatedFeatures";
import { RecurringUseCases } from "@/components/recurring-transactions/RecurringUseCases";
import { RecurringFAQ } from "@/components/recurring-transactions/RecurringFAQ";
import { recurringFaqData } from "@/components/recurring-transactions/faq-data";
import { RecurringFinalCTA } from "@/components/recurring-transactions/RecurringFinalCTA";

export const metadata: Metadata = {
  title: {
    absolute: "Recurring Transactions Tracker | Automate Income & Expenses – Saviora",
  },
  description:
    "Track recurring income and expenses with Saviora. Schedule weekly, bi-weekly, monthly, and yearly transactions, manage upcoming bills, and simplify your financial planning.",
  keywords: [
    "recurring transactions tracker",
    "recurring expense tracker",
    "recurring income tracker",
    "automated expense tracking",
    "recurring bill management",
    "monthly expense tracker",
    "recurring payment tracker",
    "personal finance automation",
    "subscription expense tracker",
    "cash flow planning",
  ],
  alternates: {
    canonical: "https://saviora.app/features/recurring-transactions",
  },
  openGraph: {
    title: "Recurring Transactions Tracker | Automate Income & Expenses – Saviora",
    description:
      "Track recurring income and expenses with Saviora. Schedule weekly, bi-weekly, monthly, and yearly transactions, manage upcoming bills, and simplify your financial planning.",
    url: "https://saviora.app/features/recurring-transactions",
    siteName: "Saviora",
    type: "website",
    images: [
      {
        url: "https://saviora.app/images/og-image.png",
        width: 1200,
        height: 630,
        alt: "Recurring Transactions Tracker | Automate Income & Expenses – Saviora",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Recurring Transactions Tracker | Automate Income & Expenses – Saviora",
    description:
      "Track recurring income and expenses with Saviora. Schedule weekly, bi-weekly, monthly, and yearly transactions, manage upcoming bills, and simplify your financial planning.",
    images: ["https://saviora.app/images/og-image.png"],
  },
};

const jsonLdData = [
  {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": "https://saviora.app/features/recurring-transactions#webpage",
    url: "https://saviora.app/features/recurring-transactions",
    name: "Recurring Transactions Tracker | Automate Income & Expenses – Saviora",
    description:
      "Track recurring income and expenses with Saviora. Schedule weekly, bi-weekly, monthly, and yearly transactions, manage upcoming bills, and simplify your financial planning.",
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
          name: "Features",
          item: "https://saviora.app/features",
        },
        {
          "@type": "ListItem",
          position: 3,
          name: "Recurring Transactions",
          item: "https://saviora.app/features/recurring-transactions",
        },
      ],
    },
  },
  {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "Saviora Recurring Transactions Tracker",
    applicationCategory: "FinanceApplication",
    operatingSystem: "Web, iOS, Android",
    url: "https://saviora.app/features/recurring-transactions",
    description:
      "Track recurring income and expenses with Saviora. Schedule weekly, bi-weekly, monthly, and yearly transactions, manage upcoming bills, and simplify your financial planning.",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
      description: "30-day free trial with full Pro access, no credit card required.",
    },
    featureList: [
      "Recurring Income and Expense Schedules",
      "Weekly, Bi-weekly, Monthly, and Annual Frequencies",
      "Automatic Scheduled-to-Realized Status Transitions",
      "Period-to-Period Rollover and Instance Generation",
      "Independent Single Occurrence or Future Series Editing",
      "In-App Processing Notifications",
      "Historical Record Preservation on Cancellation",
      "Shorter Calendar Month Adjustment and Duplicate Prevention",
    ],
  },
  {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: recurringFaqData.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  },
];

export default function RecurringTransactionsPage() {
  return (
    <>
      {/* Schema.org Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLdData).replace(/</g, "\\u003c"),
        }}
      />

      {/* Header and Navigation */}
      <Navbar />

      <main className="min-h-screen bg-white">
        {/* Section 1: Hero */}
        <RecurringHero />

        {/* Section 2: Problem and Solution */}
        <RecurringProblemSolution />

        {/* Section 3: Key Features (6 cards) */}
        <RecurringFeatures />

        {/* Section 4: Flexible Scheduling */}
        <RecurringFlexibleScheduling />

        {/* Section 5: How It Works (4 connected steps) */}
        <RecurringHowItWorks />

        {/* Section 6: Manage Recurring Transactions (Status demonstration, editing, cancellation) */}
        <RecurringLifecycleAndEditing />

        {/* Section 7: Connected Saviora Features */}
        <RecurringRelatedFeatures />

        {/* Section 8: Real-World Use Cases */}
        <RecurringUseCases />

        {/* Section 9: Frequently Asked Questions (12 Q&A Accordion) */}
        <RecurringFAQ />

        {/* Section 10: Final Call to Action */}
        <RecurringFinalCTA />
      </main>

      {/* Footer */}
      <Footer />
    </>
  );
}
