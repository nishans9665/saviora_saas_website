import React from "react";
import Link from "next/link";
import { Sparkles, CheckCircle2, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/Button";

export const metadata = {
  title: "Changelog - Saviora",
  description: "See the latest updates, features, and fixes released for Saviora.",
};

const updates = [
  {
    version: "v1.2.0",
    date: "July 2026",
    title: "Savings Goals & Smart Projections",
    description: "Introduced visual milestone tracking, automated progress projections, and customized emergency fund planning.",
    highlights: ["Visual progress bars for savings goals", "Automated monthly projection estimates", "Multi-category budget allocations"],
  },
  {
    version: "v1.1.0",
    date: "June 2026",
    title: "Expense Analytics & Health Score",
    description: "Added real-time expense breakdown charts and our proprietary 100-point Financial Health Score calculation.",
    highlights: ["Interactive donut charts for monthly spending", "Financial Health rating algorithm", "Export transaction reports to CSV"],
  },
  {
    version: "v1.0.0",
    date: "May 2026",
    title: "Saviora Official Launch",
    description: "Initial public launch of Saviora SaaS platform with budget management, secure auth, and responsive dashboard.",
    highlights: ["Core income & expense tracker", "Role-based user dashboard", "Dark mode & responsive modern UI"],
  },
];

export default function ChangelogPage() {
  return (
    <div className="py-20 min-h-screen bg-slate-50 dark:bg-slate-950">
      <div className="container mx-auto px-4 md:px-6 max-w-4xl">
        <div className="mb-8">
          <Button asChild variant="outline" size="sm" className="gap-2">
            <Link href="/">
              <ArrowLeft className="w-4 h-4" /> Back to Home
            </Link>
          </Button>
        </div>

        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 text-xs font-semibold mb-4">
            <Sparkles className="w-3.5 h-3.5" /> What&apos;s New
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-4">
            Product Changelog
          </h1>
          <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            Discover the latest improvements, new features, and fixes we&apos;ve added to Saviora.
          </p>
        </div>

        <div className="relative border-l-2 border-slate-200 dark:border-slate-800 ml-4 md:ml-8 space-y-12 pl-6 md:pl-10">
          {updates.map((item, idx) => (
            <div key={idx} className="relative group">
              <div className="absolute -left-[31px] md:-left-[47px] top-1.5 w-4 h-4 rounded-full bg-primary-500 border-4 border-white dark:border-slate-950 group-hover:scale-125 transition-transform" />
              
              <div className="glass-card p-6 md:p-8 rounded-2xl border border-slate-200/80 dark:border-slate-800/80 shadow-sm hover:shadow-md transition-shadow">
                <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                  <span className="px-2.5 py-0.5 rounded-md bg-primary-100 dark:bg-primary-950 text-primary-700 dark:text-primary-300 text-xs font-bold">
                    {item.version}
                  </span>
                  <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                    {item.date}
                  </span>
                </div>
                
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">
                  {item.title}
                </h3>
                <p className="text-slate-600 dark:text-slate-400 text-sm mb-4">
                  {item.description}
                </p>

                <div className="space-y-2 pt-2 border-t border-slate-100 dark:border-slate-800/60">
                  {item.highlights.map((h, i) => (
                    <div key={i} className="flex items-center gap-2 text-xs text-slate-700 dark:text-slate-300">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 flex-shrink-0" />
                      <span>{h}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
