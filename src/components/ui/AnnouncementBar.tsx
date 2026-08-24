"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { X, ArrowRight, Sparkles } from "lucide-react";
import { LAUNCH_OFFER } from "@/lib/offer-config";

const DISMISS_KEY = "saviora_announcement_dismissed_v1";

export function AnnouncementBar() {
  const [mounted, setMounted] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    setMounted(true);
    try {
      if (localStorage.getItem(DISMISS_KEY) === "true") {
        setDismissed(true);
      }
    } catch {
      // Ignore localStorage errors
    }
  }, []);

  const handleDismiss = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDismissed(true);
    try {
      localStorage.setItem(DISMISS_KEY, "true");
    } catch {
      // Ignore
    }

    if (typeof window !== "undefined" && (window as unknown as Record<string, unknown>).gtag) {
      const gtag = (window as unknown as Record<string, Function>).gtag;
      gtag("event", "launch_offer_dismiss", {
        event_category: "promotional_offer",
        event_label: "announcement_bar",
      });
    }
  };

  const handleCtaClick = () => {
    if (typeof window !== "undefined" && (window as unknown as Record<string, unknown>).gtag) {
      const gtag = (window as unknown as Record<string, Function>).gtag;
      gtag("event", "launch_offer_click", {
        event_category: "promotional_offer",
        event_label: "announcement_bar",
      });
    }
  };

  if (!mounted || dismissed || !LAUNCH_OFFER.enabled) return null;

  return (
    <div className="bg-emerald-600 dark:bg-emerald-700 text-white text-xs sm:text-sm py-2.5 px-4 relative z-50 shadow-sm border-b border-emerald-500/40">
      <div className="container mx-auto flex items-center justify-between gap-3 relative z-10">
        <div className="flex-1 text-center font-medium">
          <Link
            href={LAUNCH_OFFER.registerUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={handleCtaClick}
            className="inline-flex items-center gap-2 hover:opacity-95 transition-all group"
          >
            {/* Badge pill */}
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-700/70 border border-emerald-400/40 text-emerald-100 text-[11px] font-bold uppercase tracking-wider shadow-xs">
              <Sparkles className="w-3 h-3 text-emerald-200 animate-pulse" />
              🎉 90-Day Launch Offer
            </span>

            {/* Desktop message */}
            <span className="hidden md:inline text-white/95 font-medium">
              Get Saviora Pro <strong className="font-extrabold text-white">FREE for 90 days</strong>
            </span>

            {/* Tablet message */}
            <span className="hidden sm:inline md:hidden text-white/95 font-medium">
              Get Saviora Pro Free for 90 days
            </span>

            {/* Mobile message */}
            <span className="inline sm:hidden text-white/95 font-medium">
              90 Days Pro Free
            </span>

            {/* Arrow CTA */}
            <span className="inline-flex items-center font-bold text-white group-hover:translate-x-1 transition-transform ml-1">
              &rarr; Start Now
            </span>
          </Link>
        </div>

        <button
          onClick={handleDismiss}
          className="p-1 text-emerald-100 hover:text-white rounded-lg hover:bg-emerald-700/60 transition-colors flex-shrink-0 cursor-pointer"
          aria-label="Dismiss announcement"
        >
          <X className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
        </button>
      </div>
    </div>
  );
}
