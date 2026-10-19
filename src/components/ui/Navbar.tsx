"use client";

import * as React from "react";
import Link from "next/link";
import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import { Menu, X, ArrowRight, ChevronDown, TrendingUp, Sparkles, Receipt, PieChart } from "lucide-react";
import { Button } from "./Button";
import { cn } from "@/lib/utils";
import Image from "next/image";
import logoSaviora from "@/assets/logo/logo-saviora-web-tag.svg";
import { AnnouncementBar } from "./AnnouncementBar";

export function Navbar() {
  const { scrollY } = useScroll();
  const [isScrolled, setIsScrolled] = React.useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);
  const [featuresDropdownOpen, setFeaturesDropdownOpen] = React.useState(false);
  const [mobileFeaturesOpen, setMobileFeaturesOpen] = React.useState(true);
  const dropdownRef = React.useRef<HTMLDivElement>(null);

  useMotionValueEvent(scrollY, "change", (latest) => {
    if (latest > 50 && !isScrolled) {
      setIsScrolled(true);
    } else if (latest <= 50 && isScrolled) {
      setIsScrolled(false);
    }
  });

  React.useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setFeaturesDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const featureSubmenu = [
     {
      name: "Income Tracker",
      description: "Track earnings, sources, and monthly cash flow",
      href: "/income-tracker",
      icon: TrendingUp,
      badge: "Popular",
      iconColor: "bg-emerald-50 text-emerald-600 dark:bg-emerald-950/60 dark:text-emerald-400 border-emerald-100 dark:border-emerald-900/40",
    },
    {
      name: "Expense Tracker",
      description: "Record daily spending, organize categories, and track habits",
      href: "/expense-tracker",
      icon: Receipt,
      badge: "Popular",
      iconColor: "bg-orange-50 text-[#c2410c] dark:bg-orange-950/60 dark:text-orange-400 border-orange-100 dark:border-orange-900/40",
    },
    {
      name: "Monthly Budget Planning",
      description: "Category spending limits, remaining balances, and strict controls",
      href: "/monthly-budget-planning",
      icon: PieChart,
      badge: "New",
      iconColor: "bg-emerald-50 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-400 border-emerald-100 dark:border-emerald-900/40",
    },
    {
      name: "All Features Overview",
      description: "Explore the full suite of budgeting and finance tools",
      href: "/#features",
      icon: Sparkles,
      iconColor: "bg-blue-50 text-blue-600 dark:bg-blue-950/60 dark:text-blue-400 border-blue-100 dark:border-blue-900/40",
    },
  ];
 
  const standardNavLinks = [
    { name: "Pricing", href: "/pricing" },
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
      <div className="container mx-auto px-4 md:px-6 flex items-center justify-between py-2 sm:py-3">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <Image src={logoSaviora} alt="Saviora" width={200} height={71} unoptimized priority className="h-8 sm:h-10 md:h-12 w-auto object-contain" />
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-7">
          {/* Features Dropdown Menu */}
          <div
            ref={dropdownRef}
            className="relative group"
            onMouseEnter={() => setFeaturesDropdownOpen(true)}
            onMouseLeave={() => setFeaturesDropdownOpen(false)}
          >
            <button
              type="button"
              onClick={() => setFeaturesDropdownOpen(!featuresDropdownOpen)}
              className={cn(
                "inline-flex items-center gap-1.5 text-sm font-medium transition-colors py-2 focus:outline-none cursor-pointer",
                featuresDropdownOpen
                  ? "text-primary-500 dark:text-primary-400"
                  : "text-slate-600 hover:text-primary-500 dark:text-slate-300 dark:hover:text-primary-400"
              )}
              aria-expanded={featuresDropdownOpen}
              aria-haspopup="true"
            >
              <span>Features</span>
              <ChevronDown
                className={cn(
                  "w-4 h-4 transition-transform duration-200 group-hover:rotate-180",
                  featuresDropdownOpen && "rotate-180"
                )}
              />
            </button>

            {/* Dropdown Menu Panel (always in DOM for crawler SEO, animated via CSS/state) */}
            <div
              className={cn(
                "absolute left-0 top-full pt-2 w-80 z-50 transition-all duration-200",
                featuresDropdownOpen
                  ? "opacity-100 visible translate-y-0 pointer-events-auto"
                  : "opacity-0 invisible -translate-y-1 pointer-events-none group-hover:opacity-100 group-hover:visible group-hover:translate-y-0 group-hover:pointer-events-auto"
              )}
            >
              <div className="rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-xl shadow-slate-900/10 p-2 overflow-hidden">
                <div className="space-y-1">
                  {featureSubmenu.map((item) => {
                    const Icon = item.icon;
                    return (
                      <Link
                        key={item.name}
                        href={item.href}
                        onClick={() => setFeaturesDropdownOpen(false)}
                        className="flex items-start gap-3 p-3 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800/60 transition-colors group/item"
                      >
                        <div
                          className={cn(
                            "w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 border transition-transform duration-200 group-hover/item:scale-105",
                            item.iconColor
                          )}
                        >
                          <Icon className="w-5 h-5" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-0.5">
                            <span className="text-sm font-semibold text-slate-900 dark:text-white group-hover/item:text-emerald-600 dark:group-hover/item:text-emerald-400 transition-colors">
                              {item.name}
                            </span>
                            {item.badge && (
                              <span className="inline-flex items-center text-[10px] font-bold px-1.5 py-0.5 rounded-full bg-emerald-100 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-400">
                                {item.badge}
                              </span>
                            )}
                          </div>
                          <p className="text-xs text-slate-500 dark:text-slate-400 leading-snug line-clamp-2">
                            {item.description}
                          </p>
                        </div>
                      </Link>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>

          {/* Standard Navigation Links */}
          {standardNavLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="text-sm font-medium text-slate-600 hover:text-primary-500 dark:text-slate-300 dark:hover:text-primary-400 transition-colors"
            >
              {link.name}
            </Link>
          ))}
        </nav>

        {/* Desktop Actions */}
        <div className="hidden md:flex items-center gap-4">
          <Link href="https://cloud.saviora.app/login" target="_blank" className="text-sm font-medium text-slate-600 hover:text-primary-500 dark:text-slate-300 transition-colors">
            Log in
          </Link>
          <Button asChild size="sm">
            <Link href="https://cloud.saviora.app/register" target="_blank">
              Get Started <ArrowRight className="w-4 h-4 ml-1" />
            </Link>
          </Button>
        </div>

        {/* Mobile Menu Toggle */}
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
          className="md:hidden bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800"
        >
          <div className="container mx-auto px-4 py-4 flex flex-col gap-3">
            {/* Features Collapsible Group in Mobile */}
            <div>
              <button
                type="button"
                onClick={() => setMobileFeaturesOpen(!mobileFeaturesOpen)}
                className="w-full flex items-center justify-between text-base font-semibold text-slate-900 dark:text-white py-1"
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
                <div className="mt-2 pl-3 border-l-2 border-slate-200 dark:border-slate-800 space-y-1.5">
                  {featureSubmenu.map((item) => {
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
                              item.iconColor
                            )}
                          >
                            <Icon className="w-3.5 h-3.5" />
                          </span>
                          <span>{item.name}</span>
                        </span>
                        {item.badge && (
                          <span
                            className={cn(
                              "text-[10px] font-bold px-1.5 py-0.5 rounded-full",
                              item.badge === "New"
                                ? "bg-orange-100 text-[#ea580c] dark:bg-orange-950/60 dark:text-orange-400"
                                : "bg-emerald-100 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-400"
                            )}
                          >
                            {item.badge}
                          </span>
                        )}
                      </Link>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Other standard nav links */}
            {standardNavLinks.map((link) => (
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
              <Link href="https://cloud.saviora.app/login" target="_blank" onClick={() => setMobileMenuOpen(false)}>
                Log in
              </Link>
            </Button>
            <Button asChild className="w-full justify-center">
              <Link href="https://cloud.saviora.app/register" target="_blank" onClick={() => setMobileMenuOpen(false)}>
                Get Started Free
              </Link>
            </Button>
          </div>
        </motion.div>
      )}
    </motion.header>
  );
}
