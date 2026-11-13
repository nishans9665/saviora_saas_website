"use client";

import React, { useState } from "react";
import { ChevronDown, HelpCircle } from "lucide-react";

export interface FAQItem {
  question: string;
  answer: string;
}

interface LoanCalculatorFAQProps {
  faqs: FAQItem[];
  title?: string;
  description?: string;
}

export function LoanCalculatorFAQ({
  faqs,
  title = "Frequently Asked Questions",
  description = "Get answers to common borrowing, interest calculation, and repayment questions.",
}: LoanCalculatorFAQProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section className="mt-14 pt-10 border-t border-gray-200/70">
      <div className="text-center max-w-2xl mx-auto mb-8">
        <h2 className="text-2xl font-bold text-gray-900 flex items-center justify-center gap-2">
          <HelpCircle className="w-5 h-5 text-emerald-600" />
          <span>{title}</span>
        </h2>
        <p className="text-xs sm:text-sm text-gray-600 mt-1">{description}</p>
      </div>

      <div className="max-w-3xl mx-auto space-y-3">
        {faqs.map((faq, i) => {
          const isOpen = openIndex === i;
          return (
            <div
              key={i}
              className="bg-white border border-gray-200/80 rounded-xl overflow-hidden shadow-2xs transition"
            >
              <button
                type="button"
                onClick={() => toggle(i)}
                className="w-full py-3.5 px-4 sm:px-5 text-left flex items-center justify-between gap-4 font-semibold text-sm sm:text-base text-gray-900 hover:text-emerald-600 transition"
                aria-expanded={isOpen}
              >
                <span>{faq.question}</span>
                <ChevronDown
                  className={`w-4 h-4 text-gray-400 shrink-0 transition-transform duration-200 ${
                    isOpen ? "rotate-180 text-emerald-600" : ""
                  }`}
                />
              </button>
              {isOpen && (
                <div className="px-4 sm:px-5 pb-4 text-xs sm:text-sm text-gray-600 leading-relaxed border-t border-gray-100 pt-3">
                  <p>{faq.answer}</p>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}
