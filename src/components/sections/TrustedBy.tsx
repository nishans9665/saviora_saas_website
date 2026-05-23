"use client";

import React from "react";
import { AnimatedSection } from "@/components/ui/AnimatedSection";

export function TrustedBy() {
  const stats = [
    { value: "10K+", label: "Active Users" },
    { value: "$5M+", label: "Assets Managed" },
    { value: "99.9%", label: "Uptime & Security" },
    { value: "50+", label: "Countries Supported" },
  ];

  return (
    <section className="py-12 border-y border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50">
      <div className="container mx-auto px-4 md:px-6">
        <AnimatedSection>
          <div className="text-center mb-10">
            <p className="text-sm font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
              Trusted by forward-thinking individuals worldwide
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-2">
                  {stat.value}
                </div>
                <div className="text-sm font-medium text-slate-500 dark:text-slate-400">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 flex flex-wrap justify-center items-center gap-8 md:gap-16 opacity-50 grayscale hover:grayscale-0 transition-all duration-500">
            {/* Placeholder for company logos */}
            <div className="text-xl font-bold text-slate-400">Stripe</div>
            <div className="text-xl font-bold text-slate-400">Plaid</div>
            <div className="text-xl font-bold text-slate-400">Coinbase</div>
            <div className="text-xl font-bold text-slate-400">Binance</div>
            <div className="text-xl font-bold text-slate-400">Revolut</div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}
