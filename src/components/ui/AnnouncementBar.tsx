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
    <div className="bg-slate-900 text-slate-100 text-xs sm:text-sm py-2.5 px-4 relative z-50 shadow-md border-b border-slate-800">
      {/* Ambient background glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-full bg-emerald-500/10 blur-xl pointer-events-none" />

      <div className="container mx-auto flex items-center justify-between gap-3 relative z-10">
        <div className="flex-1 text-center font-medium">
          <Link
            href={LAUNCH_OFFER.registerUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={handleCtaClick}
            className="inline-flex items-center gap-2 hover:opacity-95 transition-all group"
          >
            {/* Desktop message */}
            <span className="hidden md:inline-flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 text-[11px] font-bold uppercase tracking-wider">
                <Sparkles className="w-3 h-3 text-emerald-400 inline mr-1 animate-pulse" />
                🎉 90-Day Launch Offer
              </span>
              <span className="text-slate-200 font-normal">
                Get Saviora Pro <strong className="font-bold text-white">FREE for 90 days</strong>
              </span>
              <span className="font-semibold text-emerald-400 group-hover:text-emerald-300 group-hover:translate-x-1 transition-all ml-1">
                &rarr; Start Now
              </span>
            </span>

            {/* Mobile / Tablet compact message */}
            <span className="inline-flex md:hidden items-center gap-1.5 text-xs font-semibold">
              <span className="px-2 py-0.5 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 text-[10px] sm:text-[11px] font-bold uppercase tracking-wider whitespace-nowrap">
                🎉 90 Days Free
              </span>
              <span className="text-emerald-400 font-bold whitespace-nowrap">
                &rarr; Start Now
              </span>
            </span>
          </Link>
        </div>

        <button
          onClick={handleDismiss}
          className="p-1 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors flex-shrink-0 cursor-pointer"
          aria-label="Dismiss announcement"
        >
          <X className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
        </button>
      </div>
    </div>
  );
}
