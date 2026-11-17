"use client";

import React, { useState } from "react";
import { ChevronDown, HelpCircle } from "lucide-react";

export interface FAQItem {
  question: string;
  answer: string;
}

interface InvestmentCalculatorFAQProps {
  faqs: FAQItem[];
  title?: string;
}

export function InvestmentCalculatorFAQ({
  faqs,
  title = "Frequently Asked Questions",
}: InvestmentCalculatorFAQProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200/80 shadow-xs mt-10 print:hidden">
      <div className="flex items-center gap-2 mb-6">
        <div className="p-2 rounded-xl bg-emerald-50 text-emerald-600">
          <HelpCircle className="w-5 h-5" />
        </div>
        <div>
          <h2 className="text-xl font-bold text-slate-900">{title}</h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Answers to common questions about calculations, compounding, and financial planning.
          </p>
        </div>
      </div>

      <div className="divide-y divide-slate-100">
        {faqs.map((faq, idx) => {
          const isOpen = openIndex === idx;
          return (
            <div key={idx} className="py-4">
              <button
                type="button"
                onClick={() => toggle(idx)}
                className="w-full flex items-center justify-between text-left text-sm font-bold text-slate-900 hover:text-emerald-700 transition cursor-pointer"
              >
                <span>{faq.question}</span>
                <ChevronDown
                  className={`w-4 h-4 text-slate-400 transition-transform duration-200 shrink-0 ml-2 ${
                    isOpen ? "rotate-180 text-emerald-600" : ""
                  }`}
                />
              </button>
              {isOpen && (
                <div className="mt-2.5 text-xs sm:text-sm text-slate-600 leading-relaxed pr-6">
                  {faq.answer}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
