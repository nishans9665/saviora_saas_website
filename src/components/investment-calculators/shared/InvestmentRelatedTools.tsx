"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight, Calculator } from "lucide-react";

export interface RelatedToolItem {
  name: string;
  href: string;
  description: string;
  tag?: string;
}

interface InvestmentRelatedToolsProps {
  tools: RelatedToolItem[];
  title?: string;
}

export function InvestmentRelatedTools({
  tools,
  title = "Related Financial Calculators",
}: InvestmentRelatedToolsProps) {
  return (
    <div className="mt-10 print:hidden">
      <div className="mb-4">
        <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
          <Calculator className="w-4 h-4 text-emerald-600" />
          <span>{title}</span>
        </h2>
        <p className="text-xs text-slate-500 mt-0.5">
          Explore complementary tools to optimize your savings and investment growth.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {tools.map((t, idx) => (
          <Link
            key={idx}
            href={t.href}
            className="group block p-4 bg-white rounded-xl border border-slate-200/80 hover:border-emerald-300 hover:shadow-md transition"
          >
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-slate-900 group-hover:text-emerald-600 transition">
                {t.name}
              </h3>
              <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-emerald-600 group-hover:translate-x-0.5 transition" />
            </div>
            <p className="text-xs text-slate-500 mt-1 line-clamp-2 leading-relaxed">
              {t.description}
            </p>
            {t.tag && (
              <span className="inline-block mt-2 px-2 py-0.5 rounded text-[10px] font-semibold bg-emerald-50 text-emerald-700">
                {t.tag}
              </span>
            )}
          </Link>
        ))}
      </div>
    </div>
  );
}
