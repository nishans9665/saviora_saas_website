"use client";

import React, { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { X, ArrowRight, CheckCircle2, ShieldCheck, Sparkles } from "lucide-react";
import { LAUNCH_OFFER } from "@/lib/offer-config";

const DISMISS_KEY = "saviora_launch_offer_dismissed";
const SESSION_SHOWN_KEY = "saviora_launch_offer_shown_session";
const CONVERTED_KEY = "saviora_launch_offer_converted";

export function LaunchOfferModal() {
  const [mounted, setMounted] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const triggerModal = useCallback(() => {
    try {
      if (localStorage.getItem(DISMISS_KEY) === "true") return;
      if (localStorage.getItem(CONVERTED_KEY) === "true") return;
      if (sessionStorage.getItem(SESSION_SHOWN_KEY) === "true") return;

      sessionStorage.setItem(SESSION_SHOWN_KEY, "true");
      setIsOpen(true);

      // Analytics View Event
      if (typeof window !== "undefined" && (window as unknown as Record<string, unknown>).gtag) {
        const gtag = (window as unknown as Record<string, Function>).gtag;
        gtag("event", "launch_offer_popup_view", {
          event_category: "promotional_offer",
          event_label: "exit_delayed_modal",
        });
      }
    } catch {
      // Ignore storage errors
    }
  }, []);

  const handleClose = useCallback(() => {
    setIsOpen(false);
    try {
      localStorage.setItem(DISMISS_KEY, "true");
    } catch {
      // Ignore
    }
    if (typeof window !== "undefined" && (window as unknown as Record<string, unknown>).gtag) {
      const gtag = (window as unknown as Record<string, Function>).gtag;
      gtag("event", "launch_offer_dismiss", {
        event_category: "promotional_offer",
        event_label: "exit_delayed_modal",
      });
    }
  }, []);

  const handleConvert = () => {
    try {
      localStorage.setItem(CONVERTED_KEY, "true");
    } catch {
      // Ignore
    }
    setIsOpen(false);
    if (typeof window !== "undefined" && (window as unknown as Record<string, unknown>).gtag) {
      const gtag = (window as unknown as Record<string, Function>).gtag;
      gtag("event", "launch_offer_popup_click", {
        event_category: "promotional_offer",
        event_label: "exit_delayed_modal",
      });
    }
  };

  useEffect(() => {
    setMounted(true);
    if (!LAUNCH_OFFER.enabled) return;

    // Delayed Timer (25s)
    const timer = setTimeout(() => {
      triggerModal();
    }, 25000);

    // Desktop Exit Intent Handler
    const handleMouseLeave = (e: MouseEvent) => {
      if (e.clientY <= 15) {
        triggerModal();
      }
    };

    // Mobile Scroll Threshold (50% scroll)
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0 && window.scrollY / totalHeight > 0.5) {
        triggerModal();
      }
    };

    document.addEventListener("mouseleave", handleMouseLeave);
    window.addEventListener("scroll", handleScroll, { passive: true });

    // Keyboard ESC key listener
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        handleClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      clearTimeout(timer);
      document.removeEventListener("mouseleave", handleMouseLeave);
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [triggerModal, isOpen, handleClose]);

  if (!mounted || !LAUNCH_OFFER.enabled) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
            className="fixed inset-0 bg-slate-950/60 backdrop-blur-sm cursor-pointer"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ scale: 0.92, opacity: 0, y: 25 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.92, opacity: 0, y: 25 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="relative w-full max-w-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl shadow-2xl overflow-hidden z-10 my-auto text-slate-900 dark:text-slate-100"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Emerald Top Accent */}
            <div className="h-2 bg-gradient-to-r from-emerald-500 via-primary-500 to-emerald-400" />

            <button
              onClick={handleClose}
              className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="p-6 sm:p-8 text-center">
              {/* Emoji Badge */}
              <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/80 text-emerald-600 dark:text-emerald-400 flex items-center justify-center text-3xl shadow-xs border border-emerald-200/60 dark:border-emerald-800/60">
                🎉
              </div>

              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100/70 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-400 text-xs font-semibold uppercase tracking-wider mb-3 border border-emerald-200 dark:border-emerald-800">
                <Sparkles className="w-3.5 h-3.5" /> 90-Day Launch Offer
              </span>

              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white mb-3 leading-tight">
                Your 90 Days of Pro Are Waiting
              </h2>

              <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 mb-6 leading-relaxed">
                Get full access to Saviora Pro free for 90 days. Track your money, manage budgets, build savings goals, and understand your financial progress.
              </p>

              {/* Primary CTA */}
              <a
                href={LAUNCH_OFFER.registerUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={handleConvert}
                className="block w-full mb-3"
              >
                <button className="w-full bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 text-white font-semibold py-3.5 px-6 rounded-xl shadow-lg shadow-emerald-600/25 transition-all text-base flex items-center justify-center gap-2 cursor-pointer">
                  <span>{LAUNCH_OFFER.popupPrimaryCta}</span>
                  <ArrowRight className="w-5 h-5" />
                </button>
              </a>

              {/* Secondary CTA */}
              <button
                onClick={handleClose}
                className="w-full text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-200 font-medium py-2 text-sm transition-colors cursor-pointer mb-4"
              >
                Maybe Later
              </button>

              {/* Trust Badge */}
              <div className="pt-3 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-center gap-1.5 text-xs text-slate-500 dark:text-slate-400 font-medium">
                <ShieldCheck className="w-4 h-4 text-emerald-500" />
                <span>{LAUNCH_OFFER.trustText}</span>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
