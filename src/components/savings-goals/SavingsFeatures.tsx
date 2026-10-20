"use client";

import React from "react";
import { Target, Calendar, TrendingUp, History, Sparkles } from "lucide-react";
import { AnimatedSection } from "@/components/ui/AnimatedSection";

const featureCards = [
  {
    title: "Create Personalized Goals",
    description:
      "Give each goal a name, target amount, category, and optional deadline so your savings plan reflects what matters to you.",
    icon: Target,
    color: "bg-purple-100 text-purple-600 dark:bg-purple-950/60 dark:text-purple-400 border-purple-200/60",
    glow: "group-hover:border-purple-300 dark:group-hover:border-purple-600",
  },
  {
    title: "Set Monthly Targets",
    description:
      "Define an optional monthly contribution target to help organize your savings plan and maintain a consistent approach.",
    icon: Calendar,
    color: "bg-emerald-100 text-[#16a34a] dark:bg-emerald-950/60 dark:text-emerald-400 border-emerald-200/60",
    glow: "group-hover:border-emerald-300 dark:group-hover:border-emerald-600",
  },
  {
    title: "Track Your Progress",
    description:
      "Review saved amounts, target totals, and progress percentages to understand how close you are to reaching each goal.",
    icon: TrendingUp,
    color: "bg-amber-100 text-amber-600 dark:bg-amber-950/60 dark:text-amber-400 border-amber-200/60",
    glow: "group-hover:border-amber-300 dark:group-hover:border-amber-600",
  },
  {
    title: "Record Contributions",
    description:
      "Add contributions to your goals and review the available savings history for each goal.",
    icon: History,
    color: "bg-blue-100 text-blue-600 dark:bg-blue-950/60 dark:text-blue-400 border-blue-200/60",
    glow: "group-hover:border-blue-300 dark:group-hover:border-blue-600",
  },
];

export function SavingsFeatures() {
  return (
    <section className="py-20 sm:py-24 bg-white relative overflow-hidden" id="key-features">
      <div className="container mx-auto px-4 md:px-6">
        {/* Section Header */}
        <AnimatedSection className="text-center max-w-3xl mx-auto mb-14 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-purple-100/80 border border-purple-200/80 text-purple-700 text-xs font-semibold uppercase tracking-wider mb-4 shadow-xs">
            <Sparkles className="w-3.5 h-3.5 text-purple-600 flex-shrink-0" />
            <span>KEY FEATURES</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 mb-4">
            Everything You Need to Manage Your Savings Goals
          </h2>

          <p className="text-base sm:text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
            Plan your savings, track contributions, and monitor your progress with simple tools designed to help you stay focused on your financial goals.
          </p>
        </AnimatedSection>

        {/* 4 Feature Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featureCards.map((card, index) => {
            const Icon = card.icon;
            return (
              <AnimatedSection key={index} delay={index * 0.1}>
                <div
                  className={`bg-white rounded-3xl border border-slate-200/90 p-7 sm:p-8 h-full flex flex-col justify-between transition-all duration-300 shadow-xs hover:shadow-md hover:-translate-y-1 group ${card.glow}`}
                >
                  <div>
                    <div
                      className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-6 border transition-transform duration-300 group-hover:scale-105 ${card.color}`}
                    >
                      <Icon className="w-7 h-7" />
                    </div>

                    <h3 className="text-xl font-bold text-slate-900 mb-3 leading-snug">
                      {card.title}
                    </h3>

                    <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
                      {card.description}
                    </p>
                  </div>
                </div>
              </AnimatedSection>
            );
          })}
        </div>
      </div>
    </section>
  );
}
