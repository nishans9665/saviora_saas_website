"use client";

import React from "react";
import { BookOpen, Calculator, CheckCircle2, AlertTriangle, FileText, ShieldAlert, Sparkles } from "lucide-react";

export interface SEOContentProps {
  toolName: string;
  howToUseSteps: Array<{
    title: string;
    description: string;
  }>;
  formula: {
    title: string;
    formulaCode: string;
    description: string;
    variables: Array<{
      symbol: string;
      meaning: string;
    }>;
  };
  example: {
    title: string;
    scenario: string;
    inputs: Array<{ label: string; value: string }>;
    results: Array<{ label: string; value: string }>;
    explanation: string;
  };
  assumptions: string[];
  limitations: string[];
  authoritativeReferences: Array<{
    organization: string;
    topic: string;
    note: string;
  }>;
  lastReviewedDate?: string;
}

export function InvestmentCalculatorSEOContent({
  toolName,
  howToUseSteps,
  formula,
  example,
  assumptions,
  limitations,
  authoritativeReferences,
  lastReviewedDate = "November 2024",
}: SEOContentProps) {
  return (
    <article className="mt-14 space-y-10 text-slate-700 text-sm leading-relaxed" aria-label={`${toolName} Calculation Guide & Methodology`}>
      {/* 1. How to Use Section */}
      <section className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-xs" aria-labelledby="how-to-use-heading">
        <div className="flex items-center gap-2.5 mb-4">
          <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
            <BookOpen className="w-4 h-4" />
          </div>
          <h2 id="how-to-use-heading" className="text-xl font-bold text-slate-900 tracking-tight">
            How to Use This {toolName}
          </h2>
        </div>
        <p className="text-slate-600 mb-6 text-xs sm:text-sm">
          Follow these practical steps to calculate accurate projections, adjust key assumptions, and evaluate outcomes.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {howToUseSteps.map((step, idx) => (
            <div key={idx} className="p-4 rounded-2xl bg-slate-50/80 border border-slate-200/70 flex gap-3.5">
              <span className="w-6 h-6 rounded-full bg-emerald-600 text-white font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                {idx + 1}
              </span>
              <div>
                <h3 className="font-bold text-slate-900 text-sm mb-1">{step.title}</h3>
                <p className="text-xs text-slate-600 leading-relaxed">{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 2. Formulas & Calculation Methodology */}
      <section className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-xs" aria-labelledby="formula-methodology-heading">
        <div className="flex items-center gap-2.5 mb-4">
          <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
            <Calculator className="w-4 h-4" />
          </div>
          <h2 id="formula-methodology-heading" className="text-xl font-bold text-slate-900 tracking-tight">
            Calculation Methodology &amp; Mathematical Formula
          </h2>
        </div>

        <p className="text-slate-600 mb-4 text-xs sm:text-sm">
          {formula.description}
        </p>

        <div className="bg-slate-900 text-emerald-400 p-4 sm:p-5 rounded-2xl font-mono text-xs sm:text-sm shadow-inner overflow-x-auto my-4 border border-slate-800">
          <div className="text-[11px] uppercase tracking-wider text-slate-400 font-sans mb-1 font-semibold">
            {formula.title}
          </div>
          <div className="font-bold text-white whitespace-pre-wrap">{formula.formulaCode}</div>
        </div>

        <div className="mt-5">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-3">
            Formula Variables Explained
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
            {formula.variables.map((v, idx) => (
              <div key={idx} className="p-2.5 rounded-xl bg-slate-50 border border-slate-100 flex items-start gap-2">
                <span className="font-mono font-bold text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-100">
                  {v.symbol}
                </span>
                <span className="text-slate-700 leading-relaxed">{v.meaning}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. Real-World Practical Example */}
      <section className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-xs" aria-labelledby="practical-example-heading">
        <div className="flex items-center gap-2.5 mb-4">
          <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
            <FileText className="w-4 h-4" />
          </div>
          <h2 id="practical-example-heading" className="text-xl font-bold text-slate-900 tracking-tight">
            Practical Real-World Example: {example.title}
          </h2>
        </div>

        <p className="text-slate-600 mb-4 text-xs sm:text-sm">
          {example.scenario}
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-5">
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80">
            <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-2.5">
              Input Assumptions
            </h3>
            <ul className="space-y-1.5 text-xs text-slate-600">
              {example.inputs.map((inp, idx) => (
                <li key={idx} className="flex justify-between border-b border-slate-100 pb-1">
                  <span>{inp.label}:</span>
                  <span className="font-semibold text-slate-900">{inp.value}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="p-4 rounded-2xl bg-emerald-50/70 border border-emerald-200/80">
            <h3 className="text-xs font-bold text-emerald-900 uppercase tracking-wider mb-2.5">
              Calculated Outcome
            </h3>
            <ul className="space-y-1.5 text-xs text-emerald-800">
              {example.results.map((res, idx) => (
                <li key={idx} className="flex justify-between border-b border-emerald-100/60 pb-1">
                  <span>{res.label}:</span>
                  <span className="font-bold text-emerald-950">{res.value}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <p className="text-xs sm:text-sm text-slate-700 leading-relaxed bg-slate-50/80 p-4 rounded-2xl border border-slate-200/70">
          <strong className="text-slate-900">Analysis:</strong> {example.explanation}
        </p>
      </section>

      {/* 4. Assumptions & Limitations (E-E-A-T) */}
      <section className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-xs" aria-labelledby="assumptions-heading">
        <div className="flex items-center gap-2.5 mb-4">
          <div className="w-8 h-8 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center shrink-0">
            <AlertTriangle className="w-4 h-4" />
          </div>
          <h2 id="assumptions-heading" className="text-xl font-bold text-slate-900 tracking-tight">
            Key Financial Assumptions &amp; Practical Limitations
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700 mb-3 flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
              <span>Calculation Assumptions</span>
            </h3>
            <ul className="space-y-2 text-xs text-slate-600">
              {assumptions.map((assump, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-1.5 shrink-0" />
                  <span>{assump}</span>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700 mb-3 flex items-center gap-1.5">
              <ShieldAlert className="w-3.5 h-3.5 text-amber-600" />
              <span>Real-World Limitations</span>
            </h3>
            <ul className="space-y-2 text-xs text-slate-600">
              {limitations.map((limit, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-500 mt-1.5 shrink-0" />
                  <span>{limit}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* 5. Authoritative References & E-E-A-T Review */}
      <section className="bg-slate-50/90 rounded-3xl p-6 sm:p-8 border border-slate-200/90" aria-labelledby="references-heading">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-6 pb-4 border-b border-slate-200">
          <div>
            <h2 id="references-heading" className="text-lg font-bold text-slate-900 tracking-tight">
              Authoritative Regulatory &amp; Research References
            </h2>
            <p className="text-xs text-slate-600 mt-0.5">
              Mathematical formulas benchmarked against publications from global regulatory and financial standards bodies.
            </p>
          </div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-semibold bg-emerald-100/80 text-emerald-800 border border-emerald-200 self-start sm:self-auto shrink-0">
            <Sparkles className="w-3 h-3 text-emerald-600" />
            <span>Reviewed: {lastReviewedDate}</span>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {authoritativeReferences.map((ref, idx) => (
            <div key={idx} className="p-3.5 bg-white rounded-xl border border-slate-200/70 text-xs">
              <p className="font-bold text-slate-900">{ref.organization}</p>
              <p className="text-emerald-700 font-semibold mt-0.5">{ref.topic}</p>
              <p className="text-slate-500 mt-1 leading-relaxed text-[11px]">{ref.note}</p>
            </div>
          ))}
        </div>

        {/* Financial Disclaimer Banner */}
        <div className="mt-6 pt-5 border-t border-slate-200 text-xs text-slate-500 leading-relaxed">
          <p>
            <strong className="text-slate-700">Financial Planning Disclaimer:</strong> Saviora financial calculators, formulas, and estimates are provided for general educational, illustrative, and financial modeling purposes only. Saviora does not provide personalized investment advisory, tax, legal, or wealth management advice. Actual investment returns, compound annual growth, savings yields, and inflation rates vary based on changing macroeconomic conditions, fees, market fluctuations, and jurisdiction-specific tax laws. Please consult a licensed financial advisor, certified tax professional, or registered fiduciary before making significant financial commitments.
          </p>
        </div>
      </section>
    </article>
  );
}
