"use client";

import React from "react";
import {
  MapPin,
  Compass,
  Laptop,
  CalendarCheck,
  CheckCircle2,
  ShieldAlert,
} from "lucide-react";

const REGIONAL_USE_CASES = [
  {
    icon: Laptop,
    title: "Remote Workers & Freelancers",
    description:
      "If you live in one country but invoice clients or receive income in USD, EUR, or GBP, Saviora allows you to track your money in your primary billing currency without location lockouts.",
  },
  {
    icon: Compass,
    title: "Expatriates & Global Living",
    description:
      "Relocating across borders? Keep your preferred budgeting currency intact or adjust your timezone and country independently whenever your living arrangements change.",
  },
  {
    icon: CalendarCheck,
    title: "Flexible Fiscal Year Alignment",
    description:
      "Align your annual summaries with your local tax or personal accounting schedule (such as calendar years or custom fiscal calendars) alongside tailored budget cycles.",
  },
  {
    icon: MapPin,
    title: "Accurate Localized Timestamps",
    description:
      "With timezone configuration (e.g. Asia/Colombo GMT+05:30), transactions and budget period boundaries register in your exact local time, avoiding day-shift discrepancies.",
  },
];

export function GlobalPreferencesSection() {
  return (
    <section className="py-20 sm:py-24 bg-slate-50/70 relative" id="regional-fit">
      <div className="container mx-auto px-4 md:px-6">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-100/80 border border-emerald-200/80 text-emerald-800 text-xs font-semibold uppercase tracking-wider mb-4 shadow-xs">
            <Compass className="w-3.5 h-3.5 text-primary-600 flex-shrink-0" />
            <span>GLOBAL ADAPTABILITY</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 mb-4">
            Personal Finance Management That Fits Your Region
          </h2>
          <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
            Personal financial realities vary around the world. Saviora provides modular localization controls so you can structure your money management according to how you actually earn, budget, and live.
          </p>
        </div>

        {/* 4 Use Case Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 max-w-5xl mx-auto mb-14">
          {REGIONAL_USE_CASES.map((item, index) => {
            const Icon = item.icon;
            return (
              <div
                key={index}
                className="rounded-3xl border border-slate-200/90 bg-white p-7 sm:p-8 shadow-xs hover:shadow-md hover:border-emerald-200 transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-primary-600 border border-emerald-100 flex items-center justify-center mb-5">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-3">
                    {item.title}
                  </h3>
                  <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                    {item.description}
                  </p>
                </div>
                <div className="mt-6 pt-4 border-t border-slate-100 flex items-center gap-2 text-xs font-semibold text-emerald-700">
                  {/* <CheckCircle2 className="w-4 h-4 text-primary-500" /> */}
                  {/* <span>Configured without artificial limitations</span> */}
                </div>
              </div>
            );
          })}
        </div>

        {/* Responsible Product Scope Notice */}
        <div className="max-w-4xl mx-auto rounded-2xl bg-white border border-slate-200 p-6 sm:p-8 shadow-sm">
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 border border-amber-100 flex items-center justify-center flex-shrink-0">
              <ShieldAlert className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-bold text-slate-900 text-base mb-1">
                Straightforward & Transparent Personal Finance
              </h4>
              <p className="text-sm text-slate-600 leading-relaxed">
                Saviora is crafted for clear personal income tracking, expense categorization, and budget planning. We do not claim universal banking integrations, localized tax compliance, or live automated currency conversion across world currencies. Instead, we provide reliable, customizable financial tracking that puts you in direct control of your numbers.
              </p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
