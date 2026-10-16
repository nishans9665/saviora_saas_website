import React from "react";
import type { Metadata } from "next";
import { Navbar } from "@/components/ui/Navbar";
import { Footer } from "@/components/ui/Footer";
import { ExpenseHero } from "@/components/expense-tracker/ExpenseHero";
import { ExpenseFeatures } from "@/components/expense-tracker/ExpenseFeatures";
import { ExpenseFormShowcase } from "@/components/expense-tracker/ExpenseFormShowcase";
import { ExpenseSpendingInsights } from "@/components/expense-tracker/ExpenseSpendingInsights";
import { ExpenseHowItWorks } from "@/components/expense-tracker/ExpenseHowItWorks";
import { ExpenseRelatedFeatures } from "@/components/expense-tracker/ExpenseRelatedFeatures";
import { ExpenseFAQ } from "@/components/expense-tracker/ExpenseFAQ";
import { ExpenseFinalCTA } from "@/components/expense-tracker/ExpenseFinalCTA";

export const metadata: Metadata = {
  title: {
    absolute: "Expense Tracker App | Track Spending with Saviora",
  },
  description:
    "Track daily expenses with Saviora. Organize transactions, review your spending history, and understand where your money goes to manage your finances with confidence.",
  alternates: {
    canonical: "https://saviora.app/expense-tracker",
  },
  openGraph: {
    title: "Expense Tracker App | Track Spending with Saviora",
    description:
      "Track daily expenses with Saviora. Organize transactions, review your spending history, and understand where your money goes to manage your finances with confidence.",
    url: "https://saviora.app/expense-tracker",
    siteName: "Saviora",
    type: "website",
    images: [
      {
        url: "https://saviora.app/images/og-image.png",
        width: 1200,
        height: 630,
        alt: "Expense Tracker App | Track Spending with Saviora",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Expense Tracker App | Track Spending with Saviora",
    description:
      "Track daily expenses with Saviora. Organize transactions, review your spending history, and understand where your money goes to manage your finances with confidence.",
    images: ["https://saviora.app/images/og-image.png"],
  },
};

const jsonLdData = [
  {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": "https://saviora.app/expense-tracker#webpage",
    url: "https://saviora.app/expense-tracker",
    name: "Expense Tracker App | Track Spending with Saviora",
    description:
      "Track daily expenses with Saviora. Organize transactions, review your spending history, and understand where your money goes to manage your finances with confidence.",
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
          name: "Expense Tracker",
          item: "https://saviora.app/expense-tracker",
        },
      ],
    },
  },
  {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "Saviora Expense Tracker",
    applicationCategory: "FinanceApplication",
    operatingSystem: "Web, iOS, Android",
    url: "https://saviora.app/expense-tracker",
    description:
      "Track daily expenses with Saviora. Organize transactions, review your spending history, and understand where your money goes to manage your finances with confidence.",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
      description: "90-day free trial with full Pro access, no credit card required.",
    },
    featureList: [
      "Record Daily Expenses",
      "Expense Categorization",
      "Payment Method Tracking",
      "Transaction History Review",
      "Recurring Expense Management",
      "CSV & PDF Export",
    ],
  },
  {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "What is an expense tracker?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "An expense tracker is a tool for recording and reviewing money you spend. It helps you organize transactions, understand spending habits, and keep expense records in one place.",
        },
      },
      {
        "@type": "Question",
        name: "How can I track my daily expenses?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Record each expense with its amount, date, and relevant category. Review your transaction history regularly to understand how you spend your money. Saviora provides tools to help you organize these records.",
        },
      },
      {
        "@type": "Question",
        name: "Why should I categorize my expenses?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Categorizing expenses groups similar purchases together, making it easier to review spending across areas such as groceries, transport, utilities, and entertainment.",
        },
      },
      {
        "@type": "Question",
        name: "Can an expense tracker help me manage my budget?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes. Reviewing your expenses helps you understand spending patterns. Comparing that information with a budget can help you make more informed spending and saving decisions.",
        },
      },
      {
        "@type": "Question",
        name: "Can I review my previous expenses in Saviora?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes. Saviora provides full expense tracking functionality with searchable transaction history, date filters, category breakdowns, and exportable reports in CSV and PDF formats so you can review your spending history whenever you need to.",
        },
      },
      {
        "@type": "Question",
        name: "Is Saviora an expense tracker or a budgeting app?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Saviora combines expense tracking with other personal finance features, including income tracking, budget planning, and savings goals, giving you an all-in-one financial management solution.",
        },
      },
    ],
  },
];

export default function ExpenseTrackerPage() {
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
        <ExpenseHero />
        <ExpenseFeatures />
        <ExpenseFormShowcase />
        <ExpenseSpendingInsights />
        <ExpenseHowItWorks />
        <ExpenseRelatedFeatures />
        <ExpenseFAQ />
        <ExpenseFinalCTA />
      </main>
      <Footer />
    </>
  );
}
