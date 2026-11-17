import { CountryProfile, SupportedCountryId, SupportedCountry } from "../types";

export const COUNTRY_PROFILES: Record<SupportedCountryId, CountryProfile> = {
  "usa": {
    id: "usa",
    code: "US",
    name: "United States",
    flag: "\u{1F1FA}\u{1F1F8}",
    defaultCurrency: "USD",
    currencySymbol: "$",
    taxAuthorityName: "Internal Revenue Service (IRS)",
    taxAuthorityUrl: "https://www.irs.gov/",
    pensionName: "401(k) / Social Security",
    consumptionTaxName: "Sales Tax",
    severanceName: "Severance Pay",
    defaultTaxYear: "2024",
    availableTaxYears: [
      { id: "2024", label: "2024 Federal Tax Year" },
      { id: "2025", label: "2025 Projected Tax Year" },
    ],
  },
  "uk": {
    id: "uk",
    code: "GB",
    name: "United Kingdom",
    flag: "\u{1F1EC}\u{1F1E7}",
    defaultCurrency: "GBP",
    currencySymbol: "£",
    taxAuthorityName: "HM Revenue & Customs (HMRC)",
    taxAuthorityUrl: "https://www.gov.uk/government/organisations/hm-revenue-customs",
    pensionName: "Workplace Pension",
    consumptionTaxName: "VAT",
    severanceName: "Statutory Redundancy Pay",
    defaultTaxYear: "2024_2025",
    availableTaxYears: [
      { id: "2024_2025", label: "2024/2025 Tax Year" },
      { id: "2025_2026", label: "2025/2026 Tax Year" },
    ],
  },
  "australia": {
    id: "australia",
    code: "AU",
    name: "Australia",
    flag: "\u{1F1E6}\u{1F1FA}",
    defaultCurrency: "AUD",
    currencySymbol: "A$",
    taxAuthorityName: "Australian Taxation Office (ATO)",
    taxAuthorityUrl: "https://www.ato.gov.au/",
    pensionName: "Superannuation (11.5%)",
    consumptionTaxName: "GST",
    severanceName: "Statutory Redundancy (NES)",
    defaultTaxYear: "2024_2025",
    availableTaxYears: [
      { id: "2024_2025", label: "2024/2025 (Stage 3 Cuts)" },
      { id: "2025_2026", label: "2025/2026 Tax Year" },
    ],
  },
  "canada": {
    id: "canada",
    code: "CA",
    name: "Canada",
    flag: "\u{1F1E8}\u{1F1E6}",
    defaultCurrency: "CAD",
    currencySymbol: "C$",
    taxAuthorityName: "Canada Revenue Agency (CRA)",
    taxAuthorityUrl: "https://www.canada.ca/en/revenue-agency.html",
    pensionName: "CPP / RRSP",
    consumptionTaxName: "GST / HST",
    severanceName: "Severance Pay",
    defaultTaxYear: "2024",
    availableTaxYears: [
      { id: "2024", label: "2024 Tax Year" },
      { id: "2025", label: "2025 Tax Year" },
    ],
  },
  "india": {
    id: "india",
    code: "IN",
    name: "India",
    flag: "\u{1F1EE}\u{1F1F3}",
    defaultCurrency: "INR",
    currencySymbol: "₹",
    taxAuthorityName: "Income Tax Department of India",
    taxAuthorityUrl: "https://www.incometax.gov.in/",
    pensionName: "EPF (12%)",
    consumptionTaxName: "GST",
    severanceName: "Statutory Gratuity",
    defaultTaxYear: "2024_2025",
    availableTaxYears: [
      { id: "2024_2025", label: "FY 2024-25 (New Regime)" },
      { id: "old_regime", label: "FY 2024-25 (Old Regime)" },
    ],
  },
  "sri-lanka": {
    id: "sri-lanka",
    code: "LK",
    name: "Sri Lanka",
    flag: "\u{1F1F1}\u{1F1F0}",
    defaultCurrency: "LKR",
    currencySymbol: "Rs. ",
    taxAuthorityName: "Inland Revenue Department (IRD)",
    taxAuthorityUrl: "https://www.ird.gov.lk/",
    pensionName: "EPF (8%) / ETF (3%)",
    consumptionTaxName: "VAT",
    severanceName: "Statutory Gratuity",
    defaultTaxYear: "2024_2025",
    availableTaxYears: [
      { id: "2024_2025", label: "2024/2025 Assessment Year" },
      { id: "2025_2026", label: "2025/2026 Revised Relief" },
    ],
  },
  "singapore": {
    id: "singapore",
    code: "SG",
    name: "Singapore",
    flag: "\u{1F1F8}\u{1F1EC}",
    defaultCurrency: "SGD",
    currencySymbol: "S$",
    taxAuthorityName: "Inland Revenue Authority of Singapore (IRAS)",
    taxAuthorityUrl: "https://www.iras.gov.sg/",
    pensionName: "CPF (20% Employee)",
    consumptionTaxName: "GST",
    severanceName: "Retrenchment Benefit",
    defaultTaxYear: "2024",
    availableTaxYears: [
      { id: "2024", label: "YA 2024" },
      { id: "2025", label: "YA 2025" },
    ],
  },
  "uae": {
    id: "uae",
    code: "AE",
    name: "United Arab Emirates",
    flag: "\u{1F1E6}\u{1F1EA}",
    defaultCurrency: "AED",
    currencySymbol: "AED ",
    taxAuthorityName: "Federal Tax Authority (FTA)",
    taxAuthorityUrl: "https://tax.gov.ae/",
    pensionName: "GPSSA / Gratuity",
    consumptionTaxName: "VAT",
    severanceName: "End of Service Gratuity",
    defaultTaxYear: "2024",
    availableTaxYears: [
      { id: "2024", label: "2024 Tax Year (0% Income Tax)" },
    ],
  },
};

export const ALL_COUNTRY_IDS: SupportedCountryId[] = [
  "usa",
  "uk",
  "australia",
  "canada",
  "india",
  "sri-lanka",
  "singapore",
  "uae",
];

export function normalizeCountryId(country?: SupportedCountry | null, fallback: SupportedCountryId = "sri-lanka"): SupportedCountryId {
  if (!country) return fallback;
  const norm = String(country).toLowerCase().trim();
  if (norm === "us" || norm === "usa" || norm === "united-states" || norm === "united states") return "usa";
  if (norm === "gb" || norm === "uk" || norm === "united-kingdom" || norm === "united kingdom") return "uk";
  if (norm === "au" || norm === "australia") return "australia";
  if (norm === "ca" || norm === "canada") return "canada";
  if (norm === "in" || norm === "india") return "india";
  if (norm === "lk" || norm === "sri-lanka" || norm === "srilanka" || norm === "sri lanka") return "sri-lanka";
  if (norm === "sg" || norm === "singapore") return "singapore";
  if (norm === "ae" || norm === "uae" || norm === "united-arab-emirates" || norm === "united arab emirates") return "uae";
  return fallback;
}

export function getCountryProfile(country?: SupportedCountry | null): CountryProfile {
  const id = normalizeCountryId(country);
  return COUNTRY_PROFILES[id] || COUNTRY_PROFILES["usa"];
}
