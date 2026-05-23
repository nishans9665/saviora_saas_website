"use client";

import React, { useState } from "react";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { ChevronDown, ChevronUp } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const faqs = [
  {
    question: "Is Saviora secure?",
    answer: "Yes, security is our top priority. We use bank-level 256-bit AES encryption to protect your data. We never sell your data to third parties, and we have strict access controls in place."
  },
  {
    question: "Can I use multiple currencies?",
    answer: "Absolutely! Saviora supports over 50 global currencies with real-time exchange rates, making it perfect for international users, expats, and frequent travelers."
  },
  {
    question: "Is there a mobile app?",
    answer: "Yes, Saviora is available on both iOS and Android. Your data syncs instantly across all your devices, whether you're using our web dashboard or mobile app."
  },
  {
    question: "Can I export my financial reports?",
    answer: "Yes, Pro and Business plan users can export detailed financial reports in CSV, PDF, and Excel formats, making tax season and accountant meetings a breeze."
  },
  {
    question: "Is my financial data protected?",
    answer: "We employ industry-leading security practices. We connect to your banks using secure, read-only connections via trusted aggregators like Plaid, meaning we can't move your money, and we never store your banking credentials."
  }
];

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="py-24 relative" id="faq">
      <div className="container mx-auto px-4 md:px-6">
        <AnimatedSection className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-4">
            Frequently Asked <span className="text-gradient">Questions</span>
          </h2>
          <p className="text-lg text-slate-600 dark:text-slate-400">
            Got questions? We&apos;ve got answers. If you don&apos;t see your question here, feel free to reach out to our support team.
          </p>
        </AnimatedSection>

        <div className="max-w-3xl mx-auto">
          {faqs.map((faq, index) => (
            <AnimatedSection key={index} delay={index * 0.1}>
              <div className="mb-4 border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden bg-white dark:bg-slate-950">
                <button
                  className="w-full px-6 py-5 text-left flex justify-between items-center focus:outline-none"
                  onClick={() => setOpenIndex(openIndex === index ? null : index)}
                >
                  <span className="font-semibold text-lg text-slate-900 dark:text-white">
                    {faq.question}
                  </span>
                  {openIndex === index ? (
                    <ChevronUp className="w-5 h-5 text-primary-500" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-slate-400" />
                  )}
                </button>
                
                <AnimatePresence>
                  {openIndex === index && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="px-6 pb-5 text-slate-600 dark:text-slate-400 leading-relaxed border-t border-slate-100 dark:border-slate-900 pt-4">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}
