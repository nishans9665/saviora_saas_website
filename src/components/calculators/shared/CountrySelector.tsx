"use client";

import React from "react";
import { SupportedCountryId } from "@/lib/calculators/types";
import {
  COUNTRY_PROFILES,
  ALL_COUNTRY_IDS,
  getCountryProfile,
} from "@/lib/calculators/rules/countryRegistry";
import { CountryFlag } from "./CountryFlag";

interface CountrySelectorProps {
  selectedCountry: SupportedCountryId;
  onCountryChange: (country: SupportedCountryId) => void;
  selectedTaxYear?: string;
  onTaxYearChange?: (taxYear: string) => void;
  showTaxYear?: boolean;
  className?: string;
}

export function CountrySelector({
  selectedCountry,
  onCountryChange,
  selectedTaxYear,
  onTaxYearChange,
  showTaxYear = true,
  className = "",
}: CountrySelectorProps) {
  const currentProfile = getCountryProfile(selectedCountry);

  const handleCountryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const nextId = e.target.value as SupportedCountryId;
    onCountryChange(nextId);
    if (onTaxYearChange) {
      const nextProfile = getCountryProfile(nextId);
      onTaxYearChange(nextProfile.defaultTaxYear);
    }
  };

  return (
    <div className={`bg-emerald-50/50 border border-emerald-100 rounded-2xl p-4 md:p-5 mb-8 ${className}`}>
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-3.5">
          <CountryFlag code={currentProfile.code} className="w-9 h-6 rounded shadow-xs shrink-0" />
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-800 bg-emerald-100/70 px-2 py-0.5 rounded-full">
                Regional Rules Active
              </span>
              <span className="text-xs text-gray-700">
                Currency: <strong className="text-gray-900">{currentProfile.defaultCurrency} ({currentProfile.currencySymbol.trim()})</strong>
              </span>
            </div>
            <h4 className="text-base font-semibold text-gray-900 mt-0.5">
              {currentProfile.name} Statutory Calculator
            </h4>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          {/* Country Dropdown */}
          <div className="flex-1 sm:flex-initial min-w-[200px]">
            <label htmlFor="country-select" className="sr-only">
              Select Country
            </label>
            <select
              id="country-select"
              value={selectedCountry}
              onChange={handleCountryChange}
              className="w-full bg-white border border-gray-300 hover:border-emerald-500 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 text-gray-900 text-sm font-medium rounded-xl px-3.5 py-2.5 transition shadow-xs outline-none cursor-pointer"
            >
              {ALL_COUNTRY_IDS.map((id) => {
                const profile = COUNTRY_PROFILES[id];
                return (
                  <option key={id} value={id}>
                    {profile.name} ({profile.defaultCurrency})
                  </option>
                );
              })}
            </select>
          </div>

          {/* Tax Year Dropdown (if applicable) */}
          {showTaxYear && currentProfile.availableTaxYears.length > 0 && onTaxYearChange && (
            <div className="flex-1 sm:flex-initial min-w-[180px]">
              <label htmlFor="tax-year-select" className="sr-only">
                Tax Year
              </label>
              <select
                id="tax-year-select"
                value={selectedTaxYear || currentProfile.defaultTaxYear}
                onChange={(e) => onTaxYearChange(e.target.value)}
                className="w-full bg-white border border-gray-300 hover:border-emerald-500 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 text-gray-900 text-sm font-medium rounded-xl px-3.5 py-2.5 transition shadow-xs outline-none cursor-pointer"
              >
                {currentProfile.availableTaxYears.map((opt) => (
                  <option key={opt.id} value={opt.id}>
                    {opt.label}
                  </option>
                ))}
              </select>
            </div>
          )}
        </div>
      </div>

      {/* Quick Country Pills */}
      <div className="flex items-center gap-2 overflow-x-auto pt-3 mt-3 border-t border-emerald-100/70 scrollbar-none">
        <span className="text-xs text-gray-700 whitespace-nowrap font-medium pr-1">
          Switch Market:
        </span>
        {ALL_COUNTRY_IDS.map((id) => {
          const p = COUNTRY_PROFILES[id];
          const isActive = id === selectedCountry;
          return (
            <button
              key={id}
              type="button"
              onClick={() => {
                onCountryChange(id);
                if (onTaxYearChange) {
                  onTaxYearChange(p.defaultTaxYear);
                }
              }}
              className={`text-xs px-2.5 py-1.5 rounded-lg font-medium transition flex items-center gap-1.5 whitespace-nowrap ${
                isActive
                  ? "bg-emerald-600 text-white shadow-xs font-semibold"
                  : "bg-white text-gray-700 hover:bg-emerald-50 hover:text-emerald-700 border border-gray-200/80"
              }`}
            >
              <CountryFlag code={p.code} className="w-3.5 h-2.5 rounded-2xs shrink-0" />
              <span>{p.code}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
