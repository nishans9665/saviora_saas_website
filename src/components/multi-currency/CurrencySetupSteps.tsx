"use client";

import React from "react";
import Image from "next/image";
import {
  Settings,
  Globe2,
  Check,
  Save,
  ArrowRight,
  ListOrdered,
  Sparkles,
} from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";

const STEPS = [
  {
    step: "01",
    title: "Open Settings",
    instruction: "Navigate to Settings in the Saviora sidebar navigation menu.",
    detail: "From your main account screen, click 'Settings' at the bottom of the navigation bar to access Account Settings.",
    icon: Settings,
    badge: "Step 1",
  },
  {
    step: "02",
    title: "Select Localization",
    instruction: "Click the Localization tab under Account Settings.",
    detail: "In the settings submenu, click 'Localization' (identified with the globe icon) to open your regional preference controls.",
    icon: Globe2,
    badge: "Step 2",
  },
  {
    step: "03",
    title: "Choose an Available Option in Main Currency",
    instruction: "Open the Main Currency dropdown and choose your currency.",
    detail: "Select from supported global options such as USD ($), EUR (€), GBP (£), or other supported currencies that match your bookkeeping.",
    icon: Check,
    badge: "Step 3",
  },
  {
    step: "04",
    title: "Save Settings & Verify Your Displays",
    instruction: "Click 'Save Settings' and review your updated dashboard.",
    detail: "Click the green 'Save Settings' button. Your choice is instantly saved and your dashboard, budgets, and savings goals update their currency formatting.",
    icon: Save,
    badge: "Step 4",
  },
];

export function CurrencySetupSteps() {
  return (
    <section className="py-20 sm:py-24 bg-white relative" id="how-to-setup">
      <div className="container mx-auto px-4 md:px-6">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-50 border border-emerald-200/80 text-emerald-800 text-xs font-semibold uppercase tracking-wider mb-4 shadow-xs">
            <ListOrdered className="w-3.5 h-3.5 text-primary-600 flex-shrink-0" />
            <span>SETUP WALKTHROUGH</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 mb-4">
            Set Up Your Currency in a Few Simple Steps
          </h2>
          <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
            Personalizing your financial currency in Saviora takes less than a minute. Follow these four straightforward steps directly in your settings screen.
          </p>
        </div>

        {/* 4 Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {STEPS.map((s, index) => {
            const Icon = s.icon;
            return (
              <div
                key={index}
                className="rounded-3xl border border-slate-200/90 bg-slate-50/50 p-6 sm:p-7 relative hover:shadow-lg hover:border-emerald-300 hover:bg-white hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-5">
                    <span className="text-3xl font-black text-emerald-600/30">
                      {s.step}
                    </span>
                    <span className="text-xs font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-800">
                      {s.badge}
                    </span>
                  </div>

                  <div className="w-11 h-11 rounded-xl bg-white border border-slate-200 text-primary-600 flex items-center justify-center mb-4 shadow-2xs">
                    <Icon className="w-5 h-5" />
                  </div>

                  <h3 className="text-lg font-bold text-slate-900 mb-2 leading-snug">
                    {s.title}
                  </h3>

                  <p className="text-xs sm:text-sm font-semibold text-slate-700 mb-2">
                    {s.instruction}
                  </p>

                  <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
                    {s.detail}
                  </p>
                </div>

                <div className="mt-6 pt-3 border-t border-slate-200/60 flex items-center text-xs font-semibold text-primary-600">
                  <span>Fast & permanent</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Visual Walkthrough Card */}
        <div className="max-w-4xl mx-auto rounded-3xl border border-slate-200/90 bg-slate-900 text-white p-6 sm:p-10 shadow-xl overflow-hidden relative">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
            <div className="md:col-span-7">
              <div className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-emerald-400 mb-3">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Ready to personalize?</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-bold mb-3 text-white">
                Configure Your Currency Now
              </h3>
              <p className="text-slate-300 text-sm sm:text-base leading-relaxed mb-6">
                Start tracking your finances with complete clarity. Create your Saviora account today and personalize your localization settings in seconds.
              </p>
              <Button
                asChild
                className="bg-primary-500 hover:bg-primary-600 text-white font-semibold rounded-full px-6 py-3 cursor-pointer shadow-md"
              >
                <Link
                  href="https://cloud.saviora.app/register"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center"
                >
                  <span>Start Your 90-Day Pro Trial</span>
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
              </Button>
            </div>

            <div className="md:col-span-5">
              <div className="relative rounded-2xl overflow-hidden border border-slate-700 shadow-2xl bg-slate-800">
                <Image
                  src="/images/features/multi-currency/saviora-localization-settings.png"
                  alt="Walkthrough of the Saviora Localization Settings screen"
                  width={480}
                  height={245}
                  className="w-full h-auto object-cover"
                />
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
