"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Sparkles, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/Button";

interface FAQItem {
  id: string;
  question: string;
  answer: React.ReactNode;
}

const leftFaqs: FAQItem[] = [
  {
    id: "faq-exp-1",
    question: "What is an expense tracker?",
    answer:
      "An expense tracker is a tool for recording and reviewing money you spend. It helps you organize transactions, understand spending habits, and keep expense records in one place.",
  },
  {
    id: "faq-exp-2",
    question: "How can I track my daily expenses?",
    answer:
      "Record each expense with its amount, date, and relevant category. Review your transaction history regularly to understand how you spend your money. Saviora provides tools to help you organize these records.",
  },
  {
    id: "faq-exp-3",
    question: "Why should I categorize my expenses?",
    answer:
      "Categorizing expenses groups similar purchases together, making it easier to review spending across areas such as groceries, transport, utilities, and entertainment.",
  },
];

const rightFaqs: FAQItem[] = [
  {
    id: "faq-exp-4",
    question: "Can an expense tracker help me manage my budget?",
    answer:
      "Yes. Reviewing your expenses helps you understand spending patterns. Comparing that information with a budget can help you make more informed spending and saving decisions.",
  },
  {
    id: "faq-exp-5",
    question: "Can I review my previous expenses in Saviora?",
    answer: (
      <span>
        Yes. Saviora provides full expense tracking functionality with searchable transaction history, date filters, category breakdowns, and exportable reports in CSV and PDF formats so you can review your spending history whenever you need to.
      </span>
    ),
  },
  {
    id: "faq-exp-6",
    question: "Is Saviora an expense tracker or a budgeting app?",
    answer: (
      <span>
        Saviora combines expense tracking with other personal finance features, including income tracking, budget planning, and savings goals, giving you an all-in-one financial management solution.
      </span>
    ),
  },
];

export function ExpenseFAQ() {
  const [openItems, setOpenItems] = useState<Record<string, boolean>>({
    "faq-exp-1": false,
  });

  const toggleItem = (id: string) => {
    setOpenItems((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const renderFaqColumn = (items: FAQItem[]) => (
    <div className="space-y-4">
      {items.map((item) => {
        const isOpen = !!openItems[item.id];
        return (
          <div
            key={item.id}
            className="border border-slate-200/90 rounded-2xl bg-white overflow-hidden transition-shadow duration-200 hover:shadow-xs"
          >
            <button
              type="button"
              id={`button-${item.id}`}
              aria-expanded={isOpen}
              aria-controls={`panel-${item.id}`}
              onClick={() => toggleItem(item.id)}
              className="w-full px-5 sm:px-6 py-4 sm:py-5 text-left flex justify-between items-center gap-4 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#ea580c] focus-visible:ring-inset cursor-pointer"
            >
              <h3 className="font-semibold text-base sm:text-lg text-slate-900 leading-snug">
                {item.question}
              </h3>
              <ChevronDown
                className={`w-5 h-5 text-slate-400 flex-shrink-0 transition-transform duration-300 ${
                  isOpen ? "rotate-180 text-[#ea580c]" : ""
                }`}
              />
            </button>

            {isOpen && (
              <div
                id={`panel-${item.id}`}
                role="region"
                aria-labelledby={`button-${item.id}`}
                className="px-5 sm:px-6 pb-5 pt-1 text-sm sm:text-base text-slate-600 leading-relaxed border-t border-slate-100"
              >
                {item.answer}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );

  return (
    <section className="py-20 sm:py-24 bg-white relative" id="faq">
      <div className="container mx-auto px-4 md:px-6">
        
        {/* Top Header with Contact Support button */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 sm:mb-14">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#ea580c]/10 border border-[#ea580c]/25 text-[#ea580c] text-xs font-semibold uppercase tracking-wider mb-4 shadow-xs">
              <Sparkles className="w-3.5 h-3.5 text-[#ea580c] flex-shrink-0" />
              <span>FREQUENTLY ASKED QUESTIONS</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900">
              Expense Tracking FAQs
            </h2>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-sm text-slate-500">Still have questions?</span>
            <Button asChild variant="outline" size="sm" className="rounded-full border-slate-200 hover:border-slate-300 text-slate-700 hover:bg-slate-50">
              <Link href="/contact">
                Contact Support
              </Link>
            </Button>
          </div>
        </div>

        {/* 2-Column Accordion */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6 items-start">
          {renderFaqColumn(leftFaqs)}
          {renderFaqColumn(rightFaqs)}
        </div>

      </div>
    </section>
  );
}
