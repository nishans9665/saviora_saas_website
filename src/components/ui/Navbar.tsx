"use client";

import * as React from "react";
import Link from "next/link";
import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import { Menu, X, ArrowRight, ChevronDown, Zap, Globe, Sparkles } from "lucide-react";
import { Button } from "./Button";
import { cn } from "@/lib/utils";
import Image from "next/image";
import logoSaviora from "@/assets/logo/logo-saviora-web-tag.svg";
import { AnnouncementBar } from "./AnnouncementBar";
import {
  FeaturesMegaMenu,
  CORE_FEATURES,
  MORE_FEATURES,
} from "./FeaturesMegaMenu";
import {
  FreeToolsMegaMenu,
  FREE_TOOLS_CATEGORIES,
} from "./FreeToolsMegaMenu";

export function Navbar() {
  const { scrollY } = useScroll();
  const [isScrolled, setIsScrolled] = React.useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);
  
  // Features Mega Menu state
  const [featuresDropdownOpen, setFeaturesDropdownOpen] = React.useState(false);
  const [mobileFeaturesOpen, setMobileFeaturesOpen] = React.useState(false);
  const timeoutRef = React.useRef<NodeJS.Timeout | null>(null);

  // Free Tools Menu state
  const [freeToolsDropdownOpen, setFreeToolsDropdownOpen] = React.useState(false);
  const [mobileFreeToolsOpen, setMobileFreeToolsOpen] = React.useState(false);
  const freeToolsTimeoutRef = React.useRef<NodeJS.Timeout | null>(null);

  const navContainerRef = React.useRef<HTMLDivElement>(null);

  useMotionValueEvent(scrollY, "change", (latest) => {
    if (latest > 50 && !isScrolled) {
      setIsScrolled(true);
    } else if (latest <= 50 && isScrolled) {
      setIsScrolled(false);
    }
  });

  // Features hover handlers
  const handleMouseEnter = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    if (freeToolsTimeoutRef.current) {
      clearTimeout(freeToolsTimeoutRef.current);
      freeToolsTimeoutRef.current = null;
    }
    setFreeToolsDropdownOpen(false);
    setFeaturesDropdownOpen(true);
  };

  const handleMouseLeave = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    timeoutRef.current = setTimeout(() => {
      setFeaturesDropdownOpen(false);
    }, 150);
  };

  // Free Tools hover handlers
  const handleFreeToolsMouseEnter = () => {
    if (freeToolsTimeoutRef.current) {
      clearTimeout(freeToolsTimeoutRef.current);
      freeToolsTimeoutRef.current = null;
    }
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    setFeaturesDropdownOpen(false);
    setFreeToolsDropdownOpen(true);
  };

  const handleFreeToolsMouseLeave = () => {
    if (freeToolsTimeoutRef.current) {
      clearTimeout(freeToolsTimeoutRef.current);
    }
    freeToolsTimeoutRef.current = setTimeout(() => {
      setFreeToolsDropdownOpen(false);
    }, 150);
  };

  React.useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        navContainerRef.current &&
        !navContainerRef.current.contains(event.target as Node)
      ) {
        setFeaturesDropdownOpen(false);
        setFreeToolsDropdownOpen(false);
      }
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setFeaturesDropdownOpen(false);
        setFreeToolsDropdownOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      if (freeToolsTimeoutRef.current) {
        clearTimeout(freeToolsTimeoutRef.current);
      }
    };
  }, []);

  const otherNavLinks = [
    { name: "FAQ", href: "/#faq" },
    { name: "About Us", href: "/about" },
    { name: "Contact Us", href: "/contact" },
  ];

  return (
    <motion.header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        isScrolled
          ? "bg-white/80 backdrop-blur-md border-b border-slate-200/50 shadow-sm dark:bg-slate-900/80 dark:border-slate-800/50"
          : "bg-transparent"
      )}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <AnnouncementBar />
      
      {/* Container with relative positioning for Mega Menu anchoring */}
      <div
        ref={navContainerRef}
        className="container mx-auto px-4 md:px-6 flex items-center justify-between py-2 sm:py-3 relative"
      >
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <Image
            src={logoSaviora}
            alt="Saviora"
            width={200}
            height={71}
            unoptimized
            priority
            className="h-8 sm:h-10 md:h-12 w-auto object-contain"
          />
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-7">
          
          {/* Features Dropdown Trigger */}
          <div
            className="relative"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <button
              type="button"
              onClick={() => setFeaturesDropdownOpen(!featuresDropdownOpen)}
              className={cn(
                "inline-flex items-center gap-1.5 text-sm font-medium transition-colors py-2 focus:outline-none cursor-pointer select-none",
                featuresDropdownOpen
                  ? "text-primary-600 dark:text-primary-400 font-semibold"
                  : "text-slate-600 hover:text-primary-500 dark:text-slate-300 dark:hover:text-primary-400"
              )}
              aria-expanded={featuresDropdownOpen}
              aria-haspopup="true"
              aria-label="Features navigation menu"
            >
              <span>Features</span>
              <ChevronDown
                className={cn(
                  "w-4 h-4 transition-transform duration-200",
                  featuresDropdownOpen && "rotate-180 text-primary-600 dark:text-primary-400"
                )}
              />
            </button>
          </div>

          {/* Pricing Link */}
          <Link
            href="/pricing"
            className="text-sm font-medium text-slate-600 hover:text-primary-500 dark:text-slate-300 dark:hover:text-primary-400 transition-colors"
          >
            Pricing
          </Link>

          {/* Free Tools Dropdown Trigger with Centered One-Column Menu */}
          <div
            className="relative"
            onMouseEnter={handleFreeToolsMouseEnter}
            onMouseLeave={handleFreeToolsMouseLeave}
          >
            <Link
              href="/free-tools"
              onClick={() => setFreeToolsDropdownOpen(false)}
              className={cn(
                "inline-flex items-center gap-1.5 text-sm font-medium transition-colors py-2 focus:outline-none cursor-pointer select-none",
                freeToolsDropdownOpen
                  ? "text-primary-600 dark:text-primary-400 font-semibold"
                  : "text-slate-600 hover:text-primary-500 dark:text-slate-300 dark:hover:text-primary-400"
              )}
              aria-expanded={freeToolsDropdownOpen}
              aria-haspopup="true"
              aria-label="Free Tools navigation menu"
            >
              <span>Free Tools</span>
              <ChevronDown
                className={cn(
                  "w-4 h-4 transition-transform duration-200",
                  freeToolsDropdownOpen && "rotate-180 text-primary-600 dark:text-primary-400"
                )}
              />
            </Link>

            {/* One-Column Free Tools Menu */}
            <FreeToolsMegaMenu
              isOpen={freeToolsDropdownOpen}
              onClose={() => setFreeToolsDropdownOpen(false)}
              onMouseEnter={handleFreeToolsMouseEnter}
              onMouseLeave={handleFreeToolsMouseLeave}
            />
          </div>

          {/* Remaining Standard Navigation Links */}
          {otherNavLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="text-sm font-medium text-slate-600 hover:text-primary-500 dark:text-slate-300 dark:hover:text-primary-400 transition-colors"
            >
              {link.name}
            </Link>
          ))}
        </nav>

        {/* Two-Column Features Mega Menu */}
        <FeaturesMegaMenu
          isOpen={featuresDropdownOpen}
          onClose={() => setFeaturesDropdownOpen(false)}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        />

        {/* Desktop Actions */}
        <div className="hidden md:flex items-center gap-4">
          <Link
            href="https://cloud.saviora.app/login"
            target="_blank"
            className="text-sm font-medium text-slate-600 hover:text-primary-500 dark:text-slate-300 transition-colors"
          >
            Log in
          </Link>
          <Button asChild size="sm">
            <Link href="https://cloud.saviora.app/register" target="_blank">
              Get Started <ArrowRight className="w-4 h-4 ml-1" />
            </Link>
          </Button>
        </div>

        {/* Mobile Menu Toggle Button */}
        <button
          className="md:hidden p-2 text-slate-600 dark:text-slate-300"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          className="md:hidden bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 max-h-[calc(100vh-80px)] overflow-y-auto"
        >
          <div className="container mx-auto px-4 py-4 flex flex-col gap-3">
            
            {/* Features Collapsible Accordion Group in Mobile */}
            <div>
              <button
                type="button"
                onClick={() => setMobileFeaturesOpen(!mobileFeaturesOpen)}
                className="w-full flex items-center justify-between text-base font-semibold text-slate-900 dark:text-white py-1 cursor-pointer"
              >
                <span>Features</span>
                <ChevronDown
                  className={cn(
                    "w-4 h-4 transition-transform duration-200 text-slate-400",
                    mobileFeaturesOpen && "rotate-180"
                  )}
                />
              </button>

              {mobileFeaturesOpen && (
                <div className="mt-3 pl-3 border-l-2 border-emerald-200 dark:border-emerald-800 space-y-4">
                  
                  {/* Core Features Subgroup */}
                  <div>
                    <div className="flex items-center gap-1.5 text-xs font-bold text-slate-400 dark:text-slate-400 uppercase tracking-wider mb-2">
                      <Zap className="w-3 h-3 text-primary-600" />
                      <span>Core Features</span>
                    </div>

                    <div className="space-y-1">
                      {CORE_FEATURES.map((item) => {
                        const Icon = item.icon;
                        return (
                          <Link
                            key={item.name}
                            href={item.href}
                            className="flex items-center justify-between text-sm font-medium text-slate-700 dark:text-slate-200 hover:text-primary-600 dark:hover:text-primary-400 py-1.5 px-2 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors"
                            onClick={() => setMobileMenuOpen(false)}
                          >
                            <span className="flex items-center gap-2.5">
                              <span
                                className={cn(
                                  "w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0 border",
                                  item.iconBg
                                )}
                              >
                                <Icon className="w-3.5 h-3.5" />
                              </span>
                              <span>{item.name}</span>
                            </span>
                            {item.badge && (
                              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 dark:bg-emerald-950/80 dark:text-emerald-300">
                                {item.badge}
                              </span>
                            )}
                          </Link>
                        );
                      })}
                    </div>
                  </div>

                  {/* More Features Subgroup */}
                  <div>
                    <div className="flex items-center gap-1.5 text-xs font-bold text-slate-400 dark:text-slate-400 uppercase tracking-wider mb-2">
                      <Globe className="w-3 h-3 text-primary-600" />
                      <span>More Features</span>
                    </div>

                    <div className="space-y-1">
                      {MORE_FEATURES.map((item) => {
                        const Icon = item.icon;
                        return (
                          <Link
                            key={item.name}
                            href={item.href}
                            className="flex items-center justify-between text-sm font-medium text-slate-700 dark:text-slate-200 hover:text-primary-600 dark:hover:text-primary-400 py-1.5 px-2 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors"
                            onClick={() => setMobileMenuOpen(false)}
                          >
                            <span className="flex items-center gap-2.5">
                              <span
                                className={cn(
                                  "w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0 border",
                                  item.iconBg
                                )}
                              >
                                <Icon className="w-3.5 h-3.5" />
                              </span>
                              <span>{item.name}</span>
                            </span>
                            {item.badge && (
                              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 dark:bg-emerald-950/80 dark:text-emerald-300">
                                {item.badge}
                              </span>
                            )}
                          </Link>
                        );
                      })}
                    </div>
                  </div>

                </div>
              )}
            </div>

            {/* Pricing Link in Mobile */}
            <Link
              href="/pricing"
              className="text-base font-medium text-slate-600 hover:text-primary-500 dark:text-slate-300 py-1"
              onClick={() => setMobileMenuOpen(false)}
            >
              Pricing
            </Link>

            {/* Free Tools Collapsible Accordion Group in Mobile (Main Pages Only, No Sub-Tools) */}
            <div>
              <button
                type="button"
                onClick={() => setMobileFreeToolsOpen(!mobileFreeToolsOpen)}
                className="w-full flex items-center justify-between text-base font-semibold text-slate-900 dark:text-white py-1 cursor-pointer"
              >
                <span>Free Tools</span>
                <ChevronDown
                  className={cn(
                    "w-4 h-4 transition-transform duration-200 text-slate-400",
                    mobileFreeToolsOpen && "rotate-180"
                  )}
                />
              </button>

              {mobileFreeToolsOpen && (
                <div className="mt-3 pl-3 border-l-2 border-emerald-200 dark:border-emerald-800 space-y-2">
                  {/* Directory All Tools Link */}
                  <Link
                    href="/free-tools"
                    className="flex items-center justify-between text-xs font-bold text-emerald-700 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/60 p-2.5 rounded-xl border border-emerald-200 dark:border-emerald-800/60"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <span className="flex items-center gap-2">
                      <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
                      <span>Browse All 27 Free Tools Directory</span>
                    </span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>

                  {/* Main Category Pages Only */}
                  {FREE_TOOLS_CATEGORIES.map((category) => {
                    const CatIcon = category.icon;
                    return (
                      <Link
                        key={category.id}
                        href={category.hubHref}
                        onClick={() => setMobileMenuOpen(false)}
                        className="flex items-center justify-between p-2 rounded-xl text-slate-700 dark:text-slate-200 hover:text-primary-600 dark:hover:text-primary-400 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors"
                      >
                        <span className="flex items-center gap-2.5 min-w-0">
                          <span
                            className={cn(
                              "w-7 h-7 rounded-lg flex items-center justify-center border flex-shrink-0",
                              category.headerBg,
                              category.headerBorder,
                              category.iconColor
                            )}
                          >
                            <CatIcon className="w-3.5 h-3.5" />
                          </span>
                          <span className="min-w-0">
                            <span className="text-xs font-bold block truncate text-slate-900 dark:text-white">
                              {category.title}
                            </span>
                            <span className="text-[10px] text-slate-400 block truncate">
                              {category.badge}
                            </span>
                          </span>
                        </span>
                        <ArrowRight className="w-3.5 h-3.5 text-slate-300 dark:text-slate-600 flex-shrink-0" />
                      </Link>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Other standard nav links */}
            {otherNavLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="text-base font-medium text-slate-600 hover:text-primary-500 dark:text-slate-300 py-1"
                onClick={() => setMobileMenuOpen(false)}
              >
                {link.name}
              </Link>
            ))}

            <hr className="border-slate-200 dark:border-slate-800 my-1" />
            
            <Button asChild variant="outline" className="w-full justify-center">
              <Link
                href="https://cloud.saviora.app/login"
                target="_blank"
                onClick={() => setMobileMenuOpen(false)}
              >
                Log in
              </Link>
            </Button>
            <Button asChild className="w-full justify-center">
              <Link
                href="https://cloud.saviora.app/register"
                target="_blank"
                onClick={() => setMobileMenuOpen(false)}
              >
                Get Started Free
              </Link>
            </Button>
          </div>
        </motion.div>
      )}
    </motion.header>
  );
}
