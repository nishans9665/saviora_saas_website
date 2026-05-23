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

const features = [
  {
    title: "Income Management",
    description: "Track multiple income streams with real-time analytics and predictive forecasting.",
    icon: Wallet,
    color: "bg-emerald-100 text-emerald-600 dark:bg-emerald-900/50 dark:text-emerald-400"
  },
  {
    title: "Expense Tracking",
    description: "Monitor daily expenses, categorize spending habits, and identify areas to save.",
    icon: Receipt,
    color: "bg-rose-100 text-rose-600 dark:bg-rose-900/50 dark:text-rose-400"
  },
  {
    title: "Budget Planning",
    description: "Create smart monthly budgets, get overspending alerts, and stay on track.",
    icon: PieChart,
    color: "bg-blue-100 text-blue-600 dark:bg-blue-900/50 dark:text-blue-400"
  },
  {
    title: "Savings Goals",
    description: "Set financial goals and track your progress visually towards financial freedom.",
    icon: Target,
    color: "bg-purple-100 text-purple-600 dark:bg-purple-900/50 dark:text-purple-400"
  },
  {
    title: "Financial Analytics",
    description: "Interactive charts and deep financial insights to understand your wealth growth.",
    icon: BarChart4,
    color: "bg-amber-100 text-amber-600 dark:bg-amber-900/50 dark:text-amber-400"
  },
  {
    title: "Global Currency Support",
    description: "Multi-country and multi-currency support with real-time exchange rates.",
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
            Everything you need to <span className="text-gradient">manage your wealth</span>
          </h2>
          <p className="text-lg text-slate-600 dark:text-slate-400">
            Saviora provides a comprehensive suite of tools designed to give you complete clarity and control over your financial life.
          </p>
        </AnimatedSection>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
      </div>
    </section>
  );
}
