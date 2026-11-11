"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight, CheckCircle2, Sparkles, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/Button";

interface ToolFinalCTAProps {
  headline?: string;
  subheadline?: string;
}

export function ToolFinalCTA({
  headline = "Want to Manage Your Complete Financial Life?",
  subheadline = "Track your income, expenses, budgets, recurring bills and savings goals with Saviora — all in one secure platform.",
}: ToolFinalCTAProps) {
  return (
    <section className="py-14 sm:py-20 bg-white relative overflow-hidden" id="saviora-cta">
      <div className="container mx-auto px-4 md:px-6">
        <div className="relative rounded-3xl border border-emerald-200/90 bg-gradient-to-br from-emerald-50/80 via-slate-50 to-[#1E104E]/5 p-7 sm:p-10 lg:p-12 overflow-hidden shadow-sm">
          
          {/* Subtle Glows */}
          <div className="absolute top-0 right-0 w-80 h-80 bg-emerald-400/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-10 -left-10 w-64 h-64 bg-amber-400/10 rounded-full blur-2xl pointer-events-none" />

          <div className="relative z-10 max-w-3xl mx-auto text-center">
            
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-100/80 border border-emerald-200 text-emerald-800 text-xs font-semibold uppercase tracking-wider mb-4 shadow-xs">
              <Sparkles className="w-3.5 h-3.5 text-emerald-700 flex-shrink-0" />
              <span>SAVIORA PERSONAL FINANCE</span>
            </div>

            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-[#1E104E] leading-[1.2] mb-4">
              {headline}
            </h2>

            <p className="text-sm sm:text-base text-slate-600 leading-relaxed max-w-xl mx-auto mb-8">
              {subheadline}
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 mb-8">
              <Button
                asChild
                size="lg"
                className="bg-emerald-600 hover:bg-emerald-700 text-white font-semibold rounded-full px-7 py-3.5 shadow-md shadow-emerald-600/20 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300 justify-center cursor-pointer text-sm sm:text-base w-full sm:w-auto"
              >
                <Link
                  href="https://cloud.saviora.app/register"
                  target="_blank"
                  className="flex items-center justify-center gap-2"
                >
                  <span>Start Managing Your Finances</span>
                  <ArrowRight className="w-4 h-4 ml-1" />
                </Link>
              </Button>

              <Button
                asChild
                size="lg"
                variant="outline"
                className="bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 font-semibold rounded-full px-7 py-3.5 shadow-2xs transition-all duration-300 justify-center cursor-pointer text-sm sm:text-base w-full sm:w-auto"
              >
                <Link href="/pricing" className="flex items-center justify-center">
                  View Pricing
                </Link>
              </Button>
            </div>

            {/* Trust Indicators */}
            <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs font-medium text-slate-600">
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                <span>30-Day Free Pro Trial</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                <span>No Credit Card Required</span>
              </div>
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                <span>Bank-Level Privacy</span>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
