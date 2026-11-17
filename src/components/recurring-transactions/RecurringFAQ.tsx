"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Sparkles, ChevronDown, Search } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { RecurringFAQItem, recurringFaqData } from "./faq-data";

export function RecurringFAQ() {
  const [openItems, setOpenItems] = useState<Record<string, boolean>>({
    "faq-recurring-1": true,
  });
  const [searchQuery, setSearchQuery] = useState("");

  const toggleItem = (id: string) => {
    setOpenItems((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const filteredFaqs = recurringFaqData.filter(
    (faq) =>
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const leftFaqs = filteredFaqs.slice(0, Math.ceil(filteredFaqs.length / 2));
  const rightFaqs = filteredFaqs.slice(Math.ceil(filteredFaqs.length / 2));

  const renderColumn = (items: RecurringFAQItem[]) => (
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
              className="w-full px-5 sm:px-6 py-4 sm:py-5 text-left flex justify-between items-center gap-4 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-600 focus-visible:ring-inset cursor-pointer"
            >
              <h3 className="font-semibold text-base sm:text-lg text-slate-900 leading-snug">
                {item.question}
              </h3>
              <ChevronDown
                className={`w-5 h-5 text-slate-400 flex-shrink-0 transition-transform duration-300 ${
                  isOpen ? "rotate-180 text-[#16a34a]" : ""
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
        
        {/* Top Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10 sm:mb-12">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-100/80 border border-emerald-200/90 text-emerald-800 text-xs font-semibold uppercase tracking-wider mb-4 shadow-2xs">
              <Sparkles className="w-3.5 h-3.5 text-[#16a34a] flex-shrink-0" />
              <span>FREQUENTLY ASKED QUESTIONS</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900">
              Recurring Transactions FAQs
            </h2>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-sm text-slate-500">Need further assistance?</span>
            <Button
              asChild
              variant="outline"
              size="sm"
              className="rounded-full border-slate-200 hover:border-slate-300 text-slate-700 hover:bg-slate-50 cursor-pointer"
            >
              <Link href="/contact">Contact Support</Link>
            </Button>
          </div>
        </div>

        {/* Search input for accessibility */}
        {/* <div className="max-w-md mb-8">
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search recurring questions..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 text-sm rounded-full border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500 bg-slate-50/50"
            />
          </div>
        </div> */}

        {/* 2-Column Accordion */}
        {filteredFaqs.length > 0 ? (
          <div className="grid grid-cols-1 lg:grid-cols-1 gap-4 lg:gap-6 items-start max-w-6xl mx-auto">
            {renderColumn(leftFaqs)}
            {renderColumn(rightFaqs)}
          </div>
        ) : (
          <div className="text-center py-12 text-slate-500 text-sm">
            No matching questions found for &ldquo;{searchQuery}&rdquo;. Try another term or contact support.
          </div>
        )}

      </div>
    </section>
  );
}
