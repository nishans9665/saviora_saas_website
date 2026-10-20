"use client";

import React from "react";
import {
  ShieldAlert,
  Car,
  Plane,
  GraduationCap,
  Home,
  Heart,
  Laptop,
  TrendingUp,
  Briefcase,
  HelpCircle,
} from "lucide-react";
import { AnimatedSection } from "@/components/ui/AnimatedSection";

const categories = [
  {
    title: "Emergency Fund",
    description: "Organize a dedicated safety reserve for unexpected healthcare, urgent repairs, or rainy day expenses.",
    icon: ShieldAlert,
    color: "bg-emerald-50 text-emerald-600 border-emerald-100",
  },
  {
    title: "Car Purchase",
    description: "Plan toward the down payment or full purchase price for a new, used, or family vehicle.",
    icon: Car,
    color: "bg-blue-50 text-blue-600 border-blue-100",
  },
  {
    title: "Vacation",
    description: "Set a savings target for an upcoming family getaway, holiday retreat, or international travel.",
    icon: Plane,
    color: "bg-cyan-50 text-cyan-600 border-cyan-100",
  },
  {
    title: "Education",
    description: "Organize funds for semester tuition, technical certifications, textbooks, or continuing study.",
    icon: GraduationCap,
    color: "bg-indigo-50 text-indigo-600 border-indigo-100",
  },
  {
    title: "House",
    description: "Track progress toward a home mortgage down payment, closing costs, or renovation plans.",
    icon: Home,
    color: "bg-violet-50 text-violet-600 border-violet-100",
  },
  {
    title: "Wedding",
    description: "Plan and budget milestone targets for wedding venues, photography, catering, and celebration costs.",
    icon: Heart,
    color: "bg-rose-50 text-rose-600 border-rose-100",
  },
  {
    title: "Electronics",
    description: "Organize savings for computers, smartphones, home office gear, or essential tech upgrades.",
    icon: Laptop,
    color: "bg-amber-50 text-amber-600 border-amber-100",
  },
  {
    title: "Investment",
    description: "Set milestone capital targets to support your investment planning, without automated broker execution.",
    icon: TrendingUp,
    color: "bg-teal-50 text-teal-600 border-teal-100",
  },
  {
    title: "Business",
    description: "Organize savings targets for initial business equipment, side project inventory, or working capital.",
    icon: Briefcase,
    color: "bg-purple-50 text-purple-600 border-purple-100",
  },
  {
    title: "Other",
    description: "Create a flexible, custom goal for hobbies, wellness, major gifts, or any personal financial target.",
    icon: HelpCircle,
    color: "bg-slate-50 text-slate-600 border-slate-200/80",
  },
];

export function SavingsCategories() {
  return (
    <section className="py-20 sm:py-24 bg-slate-50/50 relative overflow-hidden" id="categories">
      <div className="container mx-auto px-4 md:px-6">
        {/* Header */}
        <AnimatedSection className="text-center max-w-3xl mx-auto mb-14 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-purple-100/80 border border-purple-200/80 text-purple-700 text-xs font-semibold uppercase tracking-wider mb-4 shadow-xs">
            <span>PLANNING CATEGORIES</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 mb-4">
            Plan for the Things That Matter to You
          </h2>

          <p className="text-base sm:text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
            From building an emergency fund to preparing for a major purchase, organize different savings goals around your priorities.
          </p>
        </AnimatedSection>

        {/* Categories Grid (2 cols on mobile, 3 on tablet, 5 on desktop) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5">
          {categories.map((cat, index) => {
            const Icon = cat.icon;
            return (
              <AnimatedSection key={index} delay={index * 0.05}>
                <div className="bg-white rounded-2xl border border-slate-200/80 p-5 sm:p-6 h-full flex flex-col justify-between transition-all duration-300 shadow-2xs hover:shadow-md hover:-translate-y-1 group">
                  <div>
                    <div
                      className={`w-11 h-11 rounded-xl flex items-center justify-center mb-4 border transition-transform duration-300 group-hover:scale-105 ${cat.color}`}
                    >
                      <Icon className="w-5 h-5" />
                    </div>

                    <h3 className="text-base font-bold text-slate-900 mb-2 leading-snug">
                      {cat.title}
                    </h3>

                    <p className="text-xs text-slate-600 leading-relaxed">
                      {cat.description}
                    </p>
                  </div>
                </div>
              </AnimatedSection>
            );
          })}
        </div>

        {/* Footnote */}
        <div className="text-center mt-10 text-xs text-slate-400">
          Categories are organizational planning tags within Saviora to help structure your savings roadmap.
        </div>
      </div>
    </section>
  );
}
