import type { Metadata } from "next";
import { Inter } from "next/font/google";
import React from "react";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const siteUrl = "https://saviora.app";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),

  title: { 
    default: "Saviora - Grow Your Financial Future",
    template: "%s | Saviora",
  },

  description:
    "Saviora is a modern personal finance platform that helps you track income, manage expenses, create budgets, achieve savings goals, and build a stronger financial future.",

  applicationName: "Saviora",

  authors: [
    {
      name: "Saviora",
      url: siteUrl,
    },
  ],

  creator: "Saviora",

  publisher: "Saviora",

  keywords: [
    "Saviora",
    "Personal Finance",
    "Budget Planner",
    "Budget Tracking",
    "Expense Tracker",
    "Income Tracker",
    "Savings Goals",
    "Money Manager",
    "Financial Planning",
    "Personal Budget",
    "Budget Management",
    "Expense Management",
    "Finance Dashboard",
    "Monthly Budget",
    "Cash Flow",
    "Financial Reports",
    "Money Management App",
    "Finance Software",
    "Budget App",
    "Personal Finance Software",
  ],

  alternates: {
    canonical: "/",
  },

  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },

  openGraph: {
    title: "Saviora - Grow Your Financial Future",
    description:
      "Track income, manage expenses, create budgets, achieve savings goals, and build your financial future with Saviora.",
    url: siteUrl,
    siteName: "Saviora",
    locale: "en_US",
    type: "website",

    images: [
      {
        url: "/assets/logo/icon.svg",
        width: 1200,
        height: 630,
        alt: "Saviora - Personal Finance Platform",
        type: "image/png",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "Saviora - Grow Your Financial Future",
    description:
      "Manage your finances with smart budgeting, expense tracking, savings goals, and financial insights.",
    images: ["/assets/logo/icon.svg"],
    creator: "@Saviora",
  },

  icons: {
    // Next.js App Router auto-serves src/app/icon.svg as /icon.svg
    // We also expose it via /favicon.svg in public/ for broad browser support
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
    ],
    shortcut: "/favicon.svg",
  },

  manifest: "/site.webmanifest",

  category: "Finance",

  appleWebApp: {
    capable: true,
    title: "Saviora",
    statusBarStyle: "default",
  },

  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-background text-foreground">
        {children}
      </body>
    </html>
  );
}