import type { Metadata } from "next";
import { Inter } from "next/font/google";
import React from "react";
import { Analytics } from "@vercel/analytics/next";
import { GoogleAnalytics } from "@next/third-parties/google";
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
        url: `${siteUrl}/assets/logo/social-share-logo.png`,
        width: 600,
        height: 600,
        alt: "Saviora - Grow Your Financial Future",
        type: "image/png",
      },
      {
        url: `${siteUrl}/images/og-image.png`,
        width: 1200,
        height: 630,
        alt: "Saviora - Grow Your Financial Future",
        type: "image/png",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "Saviora - Grow Your Financial Future",
    description:
      "Manage your finances with smart budgeting, expense tracking, savings goals, and financial insights.",
    images: [`${siteUrl}/assets/logo/social-share-logo.png`],
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

  verification: {
    other: {
      "p:domain_verify": "d1f19d7c6085d9fca56614f1f4bb3e3f",
    },
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
      suppressHydrationWarning
    >
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var clean = function() {
                    var els = document.querySelectorAll('[bis_skin_checked]');
                    for (var i = 0; i < els.length; i++) {
                      els[i].removeAttribute('bis_skin_checked');
                    }
                  };
                  clean();
                  if (typeof window !== 'undefined' && window.MutationObserver) {
                    var observer = new MutationObserver(function(mutations) {
                      for (var i = 0; i < mutations.length; i++) {
                        if (mutations[i].attributeName === 'bis_skin_checked') {
                          mutations[i].target.removeAttribute('bis_skin_checked');
                        }
                      }
                    });
                    if (document.documentElement) {
                      observer.observe(document.documentElement, {
                        attributes: true,
                        subtree: true,
                        attributeFilter: ['bis_skin_checked']
                      });
                    }
                  }
                } catch (e) {}
              })();
            `,
          }}
        />
      </head>
      <body className="min-h-full flex flex-col bg-background text-foreground" suppressHydrationWarning>
        {children}
        <Analytics />
        <GoogleAnalytics gaId="G-5QRMZ7FN8M" />
      </body>
    </html>
  );
}