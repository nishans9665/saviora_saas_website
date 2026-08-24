"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { Cookie, ShieldCheck, Settings2, X, Check, Lock, Info } from "lucide-react";

export interface CookiePreferences {
  essential: boolean;
  analytics: boolean;
  marketing: boolean;
  timestamp: string;
}

const STORAGE_KEY = "saviora_cookie_consent_v1";

export function CookieConsent() {
  const [mounted, setMounted] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isPreferencesOpen, setIsPreferencesOpen] = useState(false);

  const [preferences, setPreferences] = useState<CookiePreferences>({
    essential: true, // Always true
    analytics: true,
    marketing: false,
    timestamp: "",
  });

  useEffect(() => {
    setMounted(true);
    
    // Check saved preferences
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        setPreferences(parsed);
      } else {
        // Show banner after brief delay for optimal UX
        const timer = setTimeout(() => setIsVisible(true), 600);
        return () => clearTimeout(timer);
      }
    } catch {
      // Fallback
      const timer = setTimeout(() => setIsVisible(true), 600);
      return () => clearTimeout(timer);
    }
  }, []);

  // Listen for custom event to re-open preferences (e.g. from Footer link)
  useEffect(() => {
    const handleOpenPreferences = () => {
      setIsPreferencesOpen(true);
      setIsVisible(true);
    };

    window.addEventListener("openCookiePreferences", handleOpenPreferences);
    return () => {
      window.removeEventListener("openCookiePreferences", handleOpenPreferences);
    };
  }, []);

  const saveConsent = (updatedPreferences: CookiePreferences) => {
    const dataToSave = {
      ...updatedPreferences,
      essential: true,
      timestamp: new Date().toISOString(),
    };
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(dataToSave));
    } catch {
      // Ignore localStorage errors
    }
    setPreferences(dataToSave);
    setIsVisible(false);
    setIsPreferencesOpen(false);

    // Dispatch event so analytics scripts can adjust
    window.dispatchEvent(
      new CustomEvent("cookieConsentChanged", { detail: dataToSave })
    );
  };

  const handleAcceptAll = () => {
    saveConsent({
      essential: true,
      analytics: true,
      marketing: true,
      timestamp: "",
    });
  };

  const handleRejectOptional = () => {
    saveConsent({
      essential: true,
      analytics: false,
      marketing: false,
      timestamp: "",
    });
  };

  const handleSavePreferences = () => {
    saveConsent(preferences);
  };

  if (!mounted) return null;

  return (
    <>
      {/* Single-Line Full-Width Bottom Cookie Bar */}
      <AnimatePresence>
        {isVisible && !isPreferencesOpen && (
          <motion.div
            initial={{ y: 80, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 80, opacity: 0 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="fixed bottom-0 inset-x-0 z-50 pointer-events-auto bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl border-t border-slate-200/90 dark:border-slate-800 shadow-2xl py-3 px-4 sm:px-6 md:px-8"
          >
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-3 md:gap-6">
              {/* Left Side: Icon + GDPR Tag + Copy */}
              <div className="flex items-center gap-3 text-slate-700 dark:text-slate-300 text-xs md:text-sm">
                <div className="p-1.5 rounded-lg bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex-shrink-0 border border-emerald-200/50 dark:border-emerald-800/40">
                  <Cookie className="w-5 h-5 animate-pulse" />
                </div>
                <p className="leading-snug">
                  We use cookies to improve your experience and analyze site traffic. Read our{" "}
                  <Link
                    href="/privacy-policy"
                    className="text-emerald-600 dark:text-emerald-400 underline font-medium hover:text-emerald-700 transition-colors whitespace-nowrap"
                  >
                    Privacy Policy
                  </Link>
                  .
                </p>
              </div>

              {/* Right Side: Action Buttons in 1 Line */}
              <div className="flex items-center gap-2 flex-shrink-0 w-full md:w-auto justify-end">
                <button
                  onClick={handleAcceptAll}
                  className="bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 text-white font-medium px-4 py-2 rounded-xl text-xs shadow-md shadow-emerald-600/20 transition-all flex items-center justify-center gap-1.5 whitespace-nowrap cursor-pointer"
                >
                  <Check className="w-3.5 h-3.5" />
                  Accept All
                </button>

                <button
                  onClick={handleRejectOptional}
                  className="bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 font-medium px-3.5 py-2 rounded-xl text-xs transition-all whitespace-nowrap cursor-pointer"
                >
                  Reject Optional
                </button>

                <button
                  onClick={() => setIsPreferencesOpen(true)}
                  className="text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-100 font-medium px-3 py-2 rounded-xl text-xs flex items-center justify-center gap-1.5 transition-colors border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/50 whitespace-nowrap cursor-pointer"
                >
                  <Settings2 className="w-3.5 h-3.5" />
                  Customize
                </button>

                <button
                  onClick={() => setIsVisible(false)}
                  className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 p-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors ml-1 cursor-pointer"
                  aria-label="Close cookie banner"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Granular Preferences Modal */}
      <AnimatePresence>
        {isPreferencesOpen && (
          <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsPreferencesOpen(false)}
              className="fixed inset-0 bg-slate-950/60 backdrop-blur-sm"
            />

            {/* Modal Box */}
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="relative w-full max-w-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl shadow-2xl overflow-hidden z-10 my-auto"
            >
              {/* Header */}
              <div className="flex items-center justify-between px-6 py-5 border-b border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400">
                    <Settings2 className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-900 dark:text-slate-100 text-lg">
                      Cookie Settings
                    </h3>
                    <p className="text-slate-500 dark:text-slate-400 text-xs">
                      Manage your consent preferences for Saviora
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setIsPreferencesOpen(false)}
                  className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 p-2 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Body / Toggles */}
              <div className="p-6 space-y-5 max-h-[60vh] overflow-y-auto">
                <p className="text-slate-600 dark:text-slate-300 text-xs leading-relaxed">
                  When you visit Saviora, we store or retrieve information on your browser, mostly in the form of cookies. You can choose not to allow some types of cookies, though blocking them may impact your site experience.
                </p>

                {/* Essential Cookies */}
                <div className="p-4 rounded-2xl border border-slate-200/80 dark:border-slate-800 bg-slate-50/60 dark:bg-slate-800/30">
                  <div className="flex items-center justify-between gap-4 mb-2">
                    <div className="flex items-center gap-2">
                      <Lock className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                      <h4 className="font-medium text-slate-900 dark:text-slate-100 text-sm">
                        Strictly Necessary Cookies
                      </h4>
                    </div>
                    <span className="text-[11px] font-semibold text-emerald-700 dark:text-emerald-400 bg-emerald-100 dark:bg-emerald-950/80 px-2.5 py-0.5 rounded-full border border-emerald-200 dark:border-emerald-800">
                      Always Active
                    </span>
                  </div>
                  <p className="text-slate-500 dark:text-slate-400 text-xs leading-relaxed">
                    Necessary for the website to function properly, including user authentication, security enforcement, and basic page navigation. These cannot be switched off.
                  </p>
                </div>

                {/* Analytics Cookies */}
                <div className="p-4 rounded-2xl border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900">
                  <div className="flex items-center justify-between gap-4 mb-2">
                    <div className="flex items-center gap-2">
                      <Info className="w-4 h-4 text-slate-500 dark:text-slate-400" />
                      <h4 className="font-medium text-slate-900 dark:text-slate-100 text-sm">
                        Analytics & Performance Cookies
                      </h4>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={preferences.analytics}
                        onChange={(e) =>
                          setPreferences((prev) => ({
                            ...prev,
                            analytics: e.target.checked,
                          }))
                        }
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer dark:bg-slate-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:after:border-slate-600 peer-checked:bg-emerald-600"></div>
                    </label>
                  </div>
                  <p className="text-slate-500 dark:text-slate-400 text-xs leading-relaxed">
                    Allow us to count visits and traffic sources so we can measure and improve performance. They help us know which pages are most popular and how visitors move around the site.
                  </p>
                </div>

                {/* Marketing Cookies */}
                <div className="p-4 rounded-2xl border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900">
                  <div className="flex items-center justify-between gap-4 mb-2">
                    <div className="flex items-center gap-2">
                      <Cookie className="w-4 h-4 text-slate-500 dark:text-slate-400" />
                      <h4 className="font-medium text-slate-900 dark:text-slate-100 text-sm">
                        Marketing & Advertising Cookies
                      </h4>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={preferences.marketing}
                        onChange={(e) =>
                          setPreferences((prev) => ({
                            ...prev,
                            marketing: e.target.checked,
                          }))
                        }
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer dark:bg-slate-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:after:border-slate-600 peer-checked:bg-emerald-600"></div>
                    </label>
                  </div>
                  <p className="text-slate-500 dark:text-slate-400 text-xs leading-relaxed">
                    Used to build a profile of your interests and show relevant ads on other sites. They do not store directly personal information, but are based on uniquely identifying your browser and device.
                  </p>
                </div>
              </div>

              {/* Footer Actions */}
              <div className="flex items-center justify-between gap-3 px-6 py-4 border-t border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50">
                <button
                  onClick={handleAcceptAll}
                  className="text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-100 text-xs font-medium underline underline-offset-4 cursor-pointer"
                >
                  Accept All Cookies
                </button>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setIsPreferencesOpen(false)}
                    className="px-4 py-2 text-xs font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-colors cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleSavePreferences}
                    className="px-5 py-2 text-xs font-medium bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 text-white rounded-xl shadow-md shadow-emerald-600/20 transition-all cursor-pointer"
                  >
                    Save Preferences
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
