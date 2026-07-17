"use client";

import React, { useState } from "react";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { ChevronDown, ChevronUp } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const faqs = [
  {
    question: "What is Saviora?",
    answer: "Saviora is a modern personal finance platform that helps you track income, manage expenses, create monthly budgets, achieve savings goals, and gain valuable financial insights - all in one secure and easy-to-use application."
  },
  {
    question: "Is Saviora free to use?",
    answer: "Yes. Every new user receives a 30-day free trial with full access to all premium features. After your trial ends, you can continue using Saviora by subscribing to the Monthly or Yearly Pro plan."
  },
  {
    question: "Can I manage multiple currencies?",
    answer: "Yes. Saviora supports multiple currencies and country-specific settings, making it easy to manage your finances wherever you are in the world."
  },
  {
    question: "Is my financial data secure?",
    answer: "Absolutely. Your financial information is protected using secure authentication, encrypted communication (HTTPS), and industry-standard security practices. Only you can access your personal financial data."
  },
  {
    question: "Can I export my financial reports?",
    answer: "Yes. You can export your income, expenses, budgets, savings goals, and financial reports in PDF and CSV formats for personal records, accounting, or tax preparation."
  },
  {
    question: "Can I set monthly budgets and savings goals?",
    answer: "Yes. Saviora allows you to create personalized monthly budgets, track category spending, monitor your progress, and set savings goals with visual progress indicators."
  },
  {
    question: "Can I access Saviora on my phone?",
    answer: "Yes. Saviora is fully responsive and works seamlessly on desktops, tablets, and mobile browsers. A dedicated mobile application is currently under development and will be available soon."
  },
  {
    question: "What happens when my free trial ends?",
    answer: "Your account and financial data remain safe. To continue creating and managing new income, expenses, budgets, and savings goals, simply upgrade to a Saviora Pro subscription."
  },
  {
    question: "What happens if I cancel my subscription?",
    answer: "You can cancel your subscription at any time. Your plan will remain active until the end of your billing cycle, after which you'll be downgraded to the Free plan. All your historical data will be securely preserved for future access."
  },
  {
    question: "How do I contact support?",
    answer: "Need assistance? Our Saviora Support Team is ready to help. Contact us by emailing support@saviora.app or submit a support ticket through the in-app Support Center. You can track your ticket status, receive updates, and communicate directly with our support team. We strive to respond to all support requests within 24 hours during business days."
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
