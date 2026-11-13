"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight, Calculator } from "lucide-react";

export interface RelatedToolItem {
  title: string;
  description: string;
  href: string;
  badge?: string;
}

interface LoanRelatedToolsProps {
  tools: RelatedToolItem[];
}

export function LoanRelatedTools({ tools }: LoanRelatedToolsProps) {
  return (
    <section className="mt-14 pt-10 border-t border-gray-200/70">
      <div className="text-center max-w-2xl mx-auto mb-8">
        <h2 className="text-2xl font-bold text-gray-900">Related Free Calculators</h2>
        <p className="text-xs sm:text-sm text-gray-600 mt-1">
          Explore complementary borrowing, investment, and debt payoff tools.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-5xl mx-auto">
        {tools.map((t, idx) => (
          <Link
            key={idx}
            href={t.href}
            className="group bg-white p-5 rounded-2xl border border-gray-200/80 shadow-2xs hover:border-emerald-400 hover:shadow-xs transition flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center">
                  <Calculator className="w-4 h-4" />
                </span>
                {t.badge && (
                  <span className="text-[10px] font-bold text-emerald-800 bg-emerald-100/70 px-2 py-0.5 rounded-full">
                    {t.badge}
                  </span>
                )}
              </div>
              <h3 className="text-sm font-bold text-gray-900 group-hover:text-emerald-600 transition">
                {t.title}
              </h3>
              <p className="text-xs text-gray-600 mt-1.5 line-clamp-2">
                {t.description}
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-gray-100 flex items-center justify-between text-xs font-semibold text-emerald-600 group-hover:text-emerald-700">
              <span>Calculate Now</span>
              <ArrowRight className="w-3.5 h-3.5 transform group-hover:translate-x-1 transition" />
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
