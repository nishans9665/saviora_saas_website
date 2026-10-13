"use client";

import React from "react";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { 
  Wallet, 
  Receipt, 
  PieChart, 
  Target, 
  BarChart4, 
  Globe2 
} from "lucide-react";

import Link from "next/link";
import { ArrowRight } from "lucide-react";

const features = [
  {
    title: "Income Tracking",
    description: "Track multiple income streams, organize cash inflows, and monitor monthly earning trends over time.",
    icon: Wallet,
    color: "bg-emerald-100 text-emerald-600 dark:bg-emerald-900/50 dark:text-emerald-400"
  },
  {
    title: "Expense Tracking",
    description: "Record daily expenses, categorize transactions into clear buckets, and review where your money goes.",
    icon: Receipt,
    color: "bg-rose-100 text-rose-600 dark:bg-rose-900/50 dark:text-rose-400"
  },
  {
    title: "Monthly Budget Planning",
    description: "Set monthly category spending limits, monitor remaining balances, and maintain healthy spending habits.",
    icon: PieChart,
    color: "bg-blue-100 text-blue-600 dark:bg-blue-900/50 dark:text-blue-400"
  },
  {
    title: "Savings Goal Tracker",
    description: "Set milestone targets, track regular contributions, and watch your savings progress grow visually.",
    icon: Target,
    color: "bg-purple-100 text-purple-600 dark:bg-purple-900/50 dark:text-purple-400"
  },
  {
    title: "Financial Analytics & Reports",
    description: "Interactive visual charts and category breakdowns to help you understand your cash flow and habits.",
    icon: BarChart4,
    color: "bg-amber-100 text-amber-600 dark:bg-amber-900/50 dark:text-amber-400"
  },
  {
    title: "Multi-Currency Management",
    description: "Manage your finances in USD, EUR, GBP, or other global currencies with flexible regional settings.",
    icon: Globe2,
    color: "bg-cyan-100 text-cyan-600 dark:bg-cyan-900/50 dark:text-cyan-400"
  }
];

export function Features() {
  return (
    <section className="py-24 relative overflow-hidden" id="features">
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <AnimatedSection className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-4">
            Personal Finance Tools Built for <br></br><span className="text-gradient">Everyday Clarity</span>
          </h2>
          <p className="text-lg text-slate-600 dark:text-slate-400">
            Saviora provides an intuitive set of budgeting and expense tracking tools to give you complete visibility over your personal finances.
          </p>
        </AnimatedSection>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {features.map((feature, index) => (
            <AnimatedSection key={index} delay={index * 0.1}>
              <div className="glass-card p-8 rounded-3xl h-full group hover:-translate-y-1 transition-all duration-300">
                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-6 transition-transform group-hover:scale-110 ${feature.color}`}>
                  <feature.icon className="w-7 h-7" />
                </div>
                <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-3">
                  {feature.title}
                </h3>
                <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </AnimatedSection>
          ))}
        </div>

        {/* Descriptive Internal Link */}
        <AnimatedSection className="text-center">
          <Link
            href="/pricing"
            className="inline-flex items-center gap-2 text-sm sm:text-base font-semibold text-[#16a34a] hover:text-[#15803d] dark:text-emerald-400 dark:hover:text-emerald-300 hover:underline transition-colors"
          >
            <span>Explore all Saviora Pro features &amp; 90-day free trial</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </AnimatedSection>
      </div>
    </section>
  );
}
