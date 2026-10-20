"use client";

import React from "react";
import Link from "next/link";
import { Sparkles, CheckCircle2, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/Button";

const checklist = [
  "Goal-based savings with flexible categories",
  "Monthly targets and deadline options",
  "Contribution tracking and history",
  "Clear progress visualization",
  "Works seamlessly with income, expenses and budgets",
  "Simple, clean and easy to use",
];

export function SavingsWhySaviora() {
  return (
    <section className="py-20 sm:py-24 bg-white relative overflow-hidden" id="why-choose-saviora">
      <div className="container mx-auto px-4 md:px-6">
        <div className="relative rounded-3xl bg-gradient-to-br from-emerald-50/90 via-teal-50/50 to-emerald-50/30 border border-emerald-200/70 p-8 sm:p-12 lg:p-16 overflow-hidden shadow-lg shadow-emerald-950/5">
          {/* Ambient Glow */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-200/30 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-200/20 rounded-full blur-3xl pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center relative z-10">
            {/* Left Column: Heading & Checklist */}
            <div className="lg:col-span-8 text-left">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-100/80 border border-emerald-200/80 text-emerald-800 text-xs font-semibold uppercase tracking-wider mb-5 shadow-xs">
                <Sparkles className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
                <span>WHY CHOOSE SAVIORA</span>
              </div>

              <h2 className="text-3xl sm:text-4xl lg:text-[40px] font-extrabold tracking-tight text-slate-900 leading-[1.2] mb-4">
                A Complete Personal Finance Platform for Your Financial Goals
              </h2>

              <p className="text-base sm:text-lg text-slate-600 leading-relaxed mb-8 max-w-2xl">
                Saviora combines powerful savings goal tracking with income tracking, expense management, budgeting, and analytics—so you can manage your entire financial life in one place.
              </p>

              {/* 2-Column Checklist */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 mb-8">
                {checklist.map((item, idx) => (
                  <div key={idx} className="flex items-center gap-3">
                    <div className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center flex-shrink-0">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                    </div>
                    <span className="text-sm sm:text-base font-medium text-slate-700">
                      {item}
                    </span>
                  </div>
                ))}
              </div>

              {/* CTA Button */}
              <div>
                <Button
                  asChild
                  size="lg"
                  className="bg-[#22c55e] hover:bg-[#16a34a] text-white font-semibold rounded-full px-8 py-3.5 shadow-md shadow-[#22c55e]/25 hover:shadow-lg hover:shadow-[#22c55e]/35 hover:-translate-y-0.5 transition-all duration-300 justify-center cursor-pointer"
                >
                  <Link href="https://cloud.saviora.app/register" target="_blank" className="flex items-center">
                    <span>Start Your 90-Day Pro Trial</span>
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Link>
                </Button>
              </div>
            </div>

            {/* Right Column: Visual Target & Coins Illustration (Matches Screenshot 1) */}
            <div className="lg:col-span-4 flex items-center justify-center">
              <div className="relative w-64 h-64 sm:w-72 sm:h-72 flex items-center justify-center">
                {/* Visual target concentric rings */}
                <div className="absolute inset-0 rounded-full border-4 border-dashed border-purple-300/60 animate-[spin_60s_linear_infinite]" />
                <div className="absolute inset-4 rounded-full border-2 border-emerald-300/50" />

                {/* Central Target & 3D Stacks Graphic */}
                <div className="relative z-10 flex flex-col items-center justify-center text-center">
                  <div className="w-24 h-24 rounded-3xl bg-gradient-to-tr from-purple-600 to-indigo-500 shadow-xl shadow-purple-600/30 flex items-center justify-center text-white mb-3">
                    <svg
                      className="w-12 h-12"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <circle cx="12" cy="12" r="10" />
                      <circle cx="12" cy="12" r="6" />
                      <circle cx="12" cy="12" r="2" />
                    </svg>
                  </div>

                  {/* 3D Stack Graphic simulation */}
                  <div className="flex items-center gap-1.5 bg-white/90 backdrop-blur-sm border border-emerald-200/80 rounded-2xl px-4 py-2 shadow-sm">
                    <span className="w-3 h-3 rounded-full bg-emerald-500 animate-pulse" />
                    <span className="text-xs font-bold text-slate-800">Complete Financial Clarity</span>
                  </div>
                </div>

                {/* Decorative floating badges */}
                <div className="absolute top-4 left-2 bg-white/95 border border-purple-200 px-3 py-1 rounded-full text-[11px] font-bold text-purple-700 shadow-sm">
                  🎯 Targets
                </div>
                <div className="absolute bottom-6 right-2 bg-white/95 border border-emerald-200 px-3 py-1 rounded-full text-[11px] font-bold text-emerald-700 shadow-sm">
                  📈 Progress
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
