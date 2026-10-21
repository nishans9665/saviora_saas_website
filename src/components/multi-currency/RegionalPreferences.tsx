"use client";

import React from "react";
import Image from "next/image";
import {
  Globe,
  Coins,
  Languages,
  Clock,
  CalendarDays,
  Repeat,
  Sliders,
  CheckCircle2,
  Info,
} from "lucide-react";

const SETTINGS_LIST = [
  {
    icon: Globe,
    title: "Country",
    field: "Search country...",
    description:
      "Select your residence country from a searchable global list. Configures country-level regional reference for your profile without forcing restrictions on your currency or language.",
    tag: "Searchable Selection",
  },
  {
    icon: Coins,
    title: "Main Currency",
    field: "USD ($) - US Dollar",
    description:
      "Set your account's primary currency code and symbol. Governs how money figures appear across your overview dashboard, category budgets, expense streams, and savings targets.",
    tag: "Universal Display Unit",
  },
  {
    icon: Languages,
    title: "Language",
    field: "Search language...",
    description:
      "Choose your preferred interface language. Read navigation menus, button labels, and system notifications in the language most comfortable for you.",
    tag: "Custom Interface",
  },
  {
    icon: Clock,
    title: "Timezone",
    field: "Asia/Colombo (GMT+05:30)",
    description:
      "Configure your exact GMT/UTC timezone offset so all transaction dates, daily spending logs, and recurring budget resets align precisely with your local day.",
    tag: "Timestamp Accuracy",
  },
  {
    icon: CalendarDays,
    title: "Financial Year",
    field: "January - December",
    description:
      "Select your 12-month fiscal accounting period (such as calendar year January to December) to align financial overviews with personal or professional tax calendars.",
    tag: "Fiscal Accounting",
  },
  {
    icon: Repeat,
    title: "Budget Cycle",
    field: "Monthly",
    description:
      "Define the recurring cycle for your spending budgets. Plan category allocations and evaluate limit utilization on your preferred pacing.",
    tag: "Spending Cadence",
  },
];

export function RegionalPreferences() {
  return (
    <section className="py-20 sm:py-24 bg-slate-50/70 relative" id="regional-preferences">
      <div className="container mx-auto px-4 md:px-6">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-100/80 border border-emerald-200/80 text-emerald-800 text-xs font-semibold uppercase tracking-wider mb-4 shadow-xs">
            <Sliders className="w-3.5 h-3.5 text-primary-600 flex-shrink-0" />
            <span>LOCALIZATION CONTROLS</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 mb-4">
            More Than Currency Settings
          </h2>
          <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
            Saviora provides a complete suite of regional controls within Settings → Localization. Each preference is managed independently—allowing you to combine your preferred country, currency, timezone, language, and budget cycles to match your unique financial life.
          </p>
        </div>

        {/* Real Screenshot Visual with Callout Annotation */}
        <div className="mb-16 max-w-5xl mx-auto">
          <div className="relative rounded-2xl sm:rounded-3xl border border-slate-200 bg-white p-3 sm:p-5 shadow-xl shadow-slate-900/5">
            <div className="relative w-full aspect-[1024/522] rounded-xl sm:rounded-2xl overflow-hidden border border-slate-100">
              <Image
                src="/images/features/multi-currency/saviora-localization-settings.png"
                alt="Saviora Account Settings Localization screen with Country, Main Currency, Language, Timezone, Financial Year, and Budget Cycle"
                fill
                sizes="(max-width: 1024px) 100vw, 1024px"
                className="object-cover object-top"
              />
            </div>
            <div className="mt-4 px-2 sm:px-3 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-slate-500">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-primary-500" />
                <span className="font-semibold text-slate-700">Settings → Localization:</span>
                <span>Genuine Saviora settings interface</span>
              </div>
              <div className="text-slate-400">
                All 6 regional preferences can be customized and saved at any time
              </div>
            </div>
          </div>
        </div>

        {/* 6 Settings Breakdown Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {SETTINGS_LIST.map((item, index) => {
            const Icon = item.icon;
            return (
              <div
                key={index}
                className="rounded-2xl border border-slate-200/90 bg-white p-6 shadow-xs hover:shadow-md hover:border-emerald-300 transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-11 h-11 rounded-xl bg-emerald-50 text-primary-600 border border-emerald-100 flex items-center justify-center">
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="text-[11px] font-semibold px-2.5 py-1 rounded-full bg-slate-100 text-slate-600">
                      {item.tag}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-slate-900 mb-1">
                    {item.title}
                  </h3>

                  <div className="text-xs font-mono font-medium text-emerald-700 bg-emerald-50/70 px-2 py-1 rounded-md inline-block mb-3 border border-emerald-100">
                    Sample: {item.field}
                  </div>

                  <p className="text-slate-600 text-sm leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Independent Configuration Highlight Note */}
        <div className="max-w-4xl mx-auto rounded-2xl bg-emerald-50/80 border border-emerald-200/90 p-5 sm:p-6 flex items-start gap-4 text-emerald-950">
          <Info className="w-5 h-5 text-primary-600 flex-shrink-0 mt-0.5" />
          <div className="text-sm leading-relaxed">
            <strong className="font-semibold text-emerald-900 block mb-1">
              Independent Regional Configuration:
            </strong>
            Saviora does not assume your currency or timezone solely based on your country. You are free to select your country of residence while tracking your finances in USD, EUR, GBP, or any other supported currency, alongside your preferred timezone and language.
          </div>
        </div>

      </div>
    </section>
  );
}
