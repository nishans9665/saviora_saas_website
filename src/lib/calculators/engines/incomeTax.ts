import {
  IncomeTaxInput,
  IncomeTaxResult,
  TaxSlabBreakdown,
} from "../types";
import { getCountryProfile, normalizeCountryId } from "../rules/countryRegistry";
import { USA_TAX_BRACKETS_2024 } from "../rules/countries/usa";
import { UK_TAX_BRACKETS_2024_2025 } from "../rules/countries/uk";
import { AUSTRALIA_TAX_BRACKETS_2024_2025 } from "../rules/countries/australia";
import { CANADA_TAX_BRACKETS_2024 } from "../rules/countries/canada";
import { INDIA_TAX_BRACKETS_FY2425 } from "../rules/countries/india";
import { SINGAPORE_TAX_BRACKETS_YA2024 } from "../rules/countries/singapore";
import { SRI_LANKA_TAX_RULESET_2024_2025, SRI_LANKA_TAX_RULESET_2025_2026 } from "../rules/srilanka";
import { parseSafeNumber } from "../formatters";

export function calculateIncomeTax(input: IncomeTaxInput): IncomeTaxResult {
  const countryId = normalizeCountryId(input.country);
  const profile = getCountryProfile(countryId);

  const rawIncome = parseSafeNumber(input.incomeAmount);
  const otherIncome = parseSafeNumber(input.otherTaxableIncome);
  const totalEntered = Math.max(0, rawIncome + otherIncome);

  const isMonthly = input.frequency === "monthly";
  const grossAnnualIncome = isMonthly ? totalEntered * 12 : totalEntered;
  const grossMonthlyIncome = isMonthly ? totalEntered : totalEntered / 12;

  let annualRelief = 0;
  let annualTaxableIncome = 0;
  let totalAnnualTax = 0;
  let socialSecurityTaxAnnual = 0;
  const slabs: TaxSlabBreakdown[] = [];
  let marginalTaxRatePercent = 0;
  let taxYearLabel = profile.defaultTaxYear;
  let regionalNotes: string | undefined = undefined;

  // --- COUNTRY SPECIFIC ENGINES ---
  if (countryId === "usa") {
    taxYearLabel = "2024 Federal";
    const rules = USA_TAX_BRACKETS_2024;
    annualRelief = input.customRelief !== undefined ? Math.max(0, input.customRelief) : rules.standardDeduction.single;
    annualTaxableIncome = Math.max(0, grossAnnualIncome - annualRelief);

    let remaining = annualTaxableIncome;
    let prev = 0;
    for (let i = 0; i < rules.bracketsSingle.length; i++) {
      const b = rules.bracketsSingle[i];
      const span = b.limit - prev;
      const taxableInSlab = Math.min(remaining, span);
      if (taxableInSlab > 0) {
        const slabTax = taxableInSlab * b.rate;
        totalAnnualTax += slabTax;
        remaining -= taxableInSlab;
        slabs.push({
          slabIndex: i + 1,
          slabRangeLabel: `$${(prev / 1000).toFixed(0)}k – $${(b.limit / 1000).toFixed(0)}k`,
          rate: b.rate,
          taxableAmountInSlab: Math.round(taxableInSlab),
          taxForSlab: Math.round(slabTax),
        });
      } else {
        slabs.push({ slabIndex: i + 1, slabRangeLabel: `$${(prev / 1000).toFixed(0)}k – $${(b.limit / 1000).toFixed(0)}k`, rate: b.rate, taxableAmountInSlab: 0, taxForSlab: 0 });
      }
      prev = b.limit;
    }
    if (remaining > 0) {
      const topTax = remaining * rules.topRate;
      totalAnnualTax += topTax;
      slabs.push({ slabIndex: rules.bracketsSingle.length + 1, slabRangeLabel: `Above $${(prev / 1000).toFixed(0)}k`, rate: rules.topRate, taxableAmountInSlab: Math.round(remaining), taxForSlab: Math.round(topTax) });
    }

    // FICA (Social Security + Medicare)
    const ssTaxable = Math.min(grossAnnualIncome, rules.fica.socialSecurityWageBaseLimit2024);
    const ssTax = ssTaxable * rules.fica.socialSecurityRateEmployee;
    const medTax = grossAnnualIncome * rules.fica.medicareRateEmployee;
    const addMedTax = grossAnnualIncome > rules.fica.additionalMedicareThreshold
      ? (grossAnnualIncome - rules.fica.additionalMedicareThreshold) * rules.fica.additionalMedicareRate
      : 0;
    socialSecurityTaxAnnual = ssTax + medTax + addMedTax;
    regionalNotes = "Calculates US Federal income tax + employee FICA (Social Security 6.2% + Medicare 1.45%). State and local taxes vary by state.";

  } else if (countryId === "uk") {
    taxYearLabel = "2024/2025 HMRC";
    const rules = UK_TAX_BRACKETS_2024_2025;
    // Personal allowance tapering above £100,000
    let personalAllowance = rules.personalAllowance;
    if (grossAnnualIncome > rules.personalAllowanceTaperThreshold) {
      const reduction = (grossAnnualIncome - rules.personalAllowanceTaperThreshold) / 2;
      personalAllowance = Math.max(0, personalAllowance - reduction);
    }
    annualRelief = input.customRelief !== undefined ? Math.max(0, input.customRelief) : personalAllowance;
    annualTaxableIncome = Math.max(0, grossAnnualIncome - annualRelief);

    let remaining = annualTaxableIncome;
    let prev = 0;
    for (let i = 0; i < rules.brackets.length; i++) {
      const b = rules.brackets[i];
      const span = b.limit - prev;
      const taxableInSlab = Math.min(remaining, span);
      if (taxableInSlab > 0) {
        const slabTax = taxableInSlab * b.rate;
        totalAnnualTax += slabTax;
        remaining -= taxableInSlab;
        slabs.push({
          slabIndex: i + 1,
          slabRangeLabel: `£${(prev / 1000).toFixed(0)}k – £${(b.limit / 1000).toFixed(0)}k`,
          rate: b.rate,
          taxableAmountInSlab: Math.round(taxableInSlab),
          taxForSlab: Math.round(slabTax),
        });
      } else {
        slabs.push({ slabIndex: i + 1, slabRangeLabel: `£${(prev / 1000).toFixed(0)}k – £${(b.limit / 1000).toFixed(0)}k`, rate: b.rate, taxableAmountInSlab: 0, taxForSlab: 0 });
      }
      prev = b.limit;
    }
    if (remaining > 0) {
      const topTax = remaining * rules.topRate;
      totalAnnualTax += topTax;
      slabs.push({ slabIndex: rules.brackets.length + 1, slabRangeLabel: `Above £${(prev / 1000).toFixed(0)}k`, rate: rules.topRate, taxableAmountInSlab: Math.round(remaining), taxForSlab: Math.round(topTax) });
    }

    // National Insurance (Class 1 Primary)
    const niThreshold = rules.nationalInsurance.primaryThresholdAnnual;
    const niUel = rules.nationalInsurance.upperEarningsLimitAnnual;
    if (grossAnnualIncome > niThreshold) {
      const niMainPortion = Math.min(grossAnnualIncome, niUel) - niThreshold;
      const niMainTax = niMainPortion * rules.nationalInsurance.mainRateEmployee;
      const niExcess = Math.max(0, grossAnnualIncome - niUel);
      const niHigherTax = niExcess * rules.nationalInsurance.higherRateEmployee;
      socialSecurityTaxAnnual = niMainTax + niHigherTax;
    }
    regionalNotes = "Calculates UK HMRC income tax + employee National Insurance (8% Class 1 Primary). Reflects standard England, Wales & NI bands.";

  } else if (countryId === "australia") {
    taxYearLabel = "2024/2025 Stage 3";
    const rules = AUSTRALIA_TAX_BRACKETS_2024_2025;
    annualRelief = input.customRelief !== undefined ? Math.max(0, input.customRelief) : rules.taxFreeThreshold;
    annualTaxableIncome = grossAnnualIncome;

    const auBrackets = [
      { rate: 0.00, from: 0, to: 18200, label: "$0 – A$18,200 (Tax-Free)" },
      { rate: 0.16, from: 18200, to: 45000, label: "A$18,201 – A$45,000 (16%)" },
      { rate: 0.30, from: 45000, to: 135000, label: "A$45,001 – A$135,000 (30%)" },
      { rate: 0.37, from: 135000, to: 190000, label: "A$135,001 – A$190,000 (37%)" },
      { rate: 0.45, from: 190000, to: Infinity, label: "Above A$190,000 (45%)" },
    ];

    for (let i = 0; i < auBrackets.length; i++) {
      const b = auBrackets[i];
      if (grossAnnualIncome > b.from) {
        const taxableInSlab = Math.min(grossAnnualIncome, b.to) - b.from;
        const slabTax = taxableInSlab * b.rate;
        totalAnnualTax += slabTax;
        slabs.push({
          slabIndex: i + 1,
          slabRangeLabel: b.label,
          rate: b.rate,
          taxableAmountInSlab: Math.round(taxableInSlab * 100) / 100,
          taxForSlab: Math.round(slabTax * 100) / 100,
        });
      }
    }

    // Medicare Levy: 2% of total taxable income
    const medicareLevy = grossAnnualIncome > 26000 ? grossAnnualIncome * rules.medicareLevyRate : 0;
    totalAnnualTax += medicareLevy;
    regionalNotes = "Calculates ATO 2024/2025 Stage 3 tax cuts (16%, 30%, 37%, 45%) plus 2% Medicare levy.";
  } else if (countryId === "canada") {
    taxYearLabel = "2024 Federal";
    const rules = CANADA_TAX_BRACKETS_2024;
    annualRelief = input.customRelief !== undefined ? Math.max(0, input.customRelief) : rules.basicPersonalAmountFederal;
    annualTaxableIncome = Math.max(0, grossAnnualIncome - annualRelief);

    let remaining = annualTaxableIncome;
    let prev = 0;
    for (let i = 0; i < rules.federalBrackets.length; i++) {
      const b = rules.federalBrackets[i];
      const span = b.limit - prev;
      const taxableInSlab = Math.min(remaining, span);
      if (taxableInSlab > 0) {
        const slabTax = taxableInSlab * b.rate;
        totalAnnualTax += slabTax;
        remaining -= taxableInSlab;
        slabs.push({
          slabIndex: i + 1,
          slabRangeLabel: `C$${(prev / 1000).toFixed(0)}k – C$${(b.limit / 1000).toFixed(0)}k`,
          rate: b.rate,
          taxableAmountInSlab: Math.round(taxableInSlab),
          taxForSlab: Math.round(slabTax),
        });
      } else {
        slabs.push({ slabIndex: i + 1, slabRangeLabel: `C$${(prev / 1000).toFixed(0)}k – C$${(b.limit / 1000).toFixed(0)}k`, rate: b.rate, taxableAmountInSlab: 0, taxForSlab: 0 });
      }
      prev = b.limit;
    }
    if (remaining > 0) {
      const topTax = remaining * rules.federalTopRate;
      totalAnnualTax += topTax;
      slabs.push({ slabIndex: rules.federalBrackets.length + 1, slabRangeLabel: `Above C$${(prev / 1000).toFixed(0)}k`, rate: rules.federalTopRate, taxableAmountInSlab: Math.round(remaining), taxForSlab: Math.round(topTax) });
    }

    // Add estimated provincial benchmark tax (~9%)
    const provincialTax = annualTaxableIncome * rules.estimatedProvincialBenchmarkRate;
    totalAnnualTax += provincialTax;

    // CPP & EI
    const cppEarnings = Math.max(0, Math.min(grossAnnualIncome, rules.cpp.ympe2024) - rules.cpp.basicExemption);
    const cppTax = cppEarnings * rules.cpp.employeeRate;
    const eiEarnings = Math.min(grossAnnualIncome, rules.ei.maximumInsurableEarnings);
    const eiTax = eiEarnings * rules.ei.employeeRate;
    socialSecurityTaxAnnual = cppTax + eiTax;
    regionalNotes = "Calculates CRA Federal income tax + estimated provincial tax (~9%) + employee CPP (5.95%) & EI (1.66%).";

  } else if (countryId === "india") {
    taxYearLabel = "FY 2024-25 (New Regime)";
    const rules = INDIA_TAX_BRACKETS_FY2425.newRegime;
    annualRelief = input.customRelief !== undefined ? Math.max(0, input.customRelief) : rules.standardDeduction;
    annualTaxableIncome = Math.max(0, grossAnnualIncome - annualRelief);

    if (annualTaxableIncome <= rules.rebate87ALimit) {
      totalAnnualTax = 0;
      slabs.push({
        slabIndex: 1,
        slabRangeLabel: "Up to ₹7,00,000 (Section 87A Rebate - Nil Tax)",
        rate: 0,
        taxableAmountInSlab: annualTaxableIncome,
        taxForSlab: 0,
      });
    } else {
      const inSlabs = [
        { rate: 0.00, from: 0, to: 300000, label: "₹0 – ₹3,00,000 (Nil)" },
        { rate: 0.05, from: 300000, to: 700000, label: "₹3,00,001 – ₹7,00,000 (5%)" },
        { rate: 0.10, from: 700000, to: 1000000, label: "₹7,00,001 – ₹10,00,000 (10%)" },
        { rate: 0.15, from: 1000000, to: 1200000, label: "₹10,00,001 – ₹12,00,000 (15%)" },
        { rate: 0.20, from: 1200000, to: 1500000, label: "₹12,00,001 – ₹15,00,000 (20%)" },
        { rate: 0.30, from: 1500000, to: Infinity, label: "Above ₹15,00,000 (30%)" },
      ];

      for (let i = 0; i < inSlabs.length; i++) {
        const s = inSlabs[i];
        if (annualTaxableIncome > s.from) {
          const taxableInSlab = Math.min(annualTaxableIncome, s.to) - s.from;
          const slabTax = taxableInSlab * s.rate;
          totalAnnualTax += slabTax;
          slabs.push({
            slabIndex: i + 1,
            slabRangeLabel: s.label,
            rate: s.rate,
            taxableAmountInSlab: Math.round(taxableInSlab * 100) / 100,
            taxForSlab: Math.round(slabTax * 100) / 100,
          });
        }
      }
      const cess = totalAnnualTax * rules.cessRate;
      totalAnnualTax += cess;
    }
    regionalNotes = "Calculates Indian income tax under New Tax Regime (Section 115BAC revised Budget 2024) including ₹75k standard deduction and 4% Cess.";
  } else if (countryId === "singapore") {
    taxYearLabel = "YA 2024 IRAS";
    const rules = SINGAPORE_TAX_BRACKETS_YA2024;
    annualRelief = input.customRelief !== undefined ? Math.max(0, input.customRelief) : rules.taxFreeThreshold;
    annualTaxableIncome = Math.max(0, grossAnnualIncome - annualRelief);

    let remaining = annualTaxableIncome;
    let prev = 0;
    for (let i = 0; i < rules.brackets.length; i++) {
      const b = rules.brackets[i];
      const span = b.limit - prev;
      const taxableInSlab = Math.min(remaining, span);
      if (taxableInSlab > 0) {
        const slabTax = taxableInSlab * b.rate;
        totalAnnualTax += slabTax;
        remaining -= taxableInSlab;
        slabs.push({
          slabIndex: i + 1,
          slabRangeLabel: `S$${(prev / 1000).toFixed(0)}k – S$${(b.limit / 1000).toFixed(0)}k`,
          rate: b.rate,
          taxableAmountInSlab: Math.round(taxableInSlab),
          taxForSlab: Math.round(slabTax),
        });
      }
      prev = b.limit;
    }
    if (remaining > 0) {
      const topTax = remaining * rules.topRate;
      totalAnnualTax += topTax;
      slabs.push({
        slabIndex: rules.brackets.length + 1,
        slabRangeLabel: `Above S$${(prev / 1000).toFixed(0)}k`,
        rate: rules.topRate,
        taxableAmountInSlab: Math.round(remaining),
        taxForSlab: Math.round(topTax),
      });
    }
    regionalNotes = "Calculates IRAS resident personal income tax. Singapore does not levy capital gains or dividend taxes.";

  } else if (countryId === "uae") {
    taxYearLabel = "2024 (0% Personal Tax)";
    annualRelief = grossAnnualIncome;
    annualTaxableIncome = 0;
    totalAnnualTax = 0;
    slabs.push({
      slabIndex: 1,
      slabRangeLabel: "All Employment Income",
      rate: 0,
      taxableAmountInSlab: grossAnnualIncome,
      taxForSlab: 0,
    });
    regionalNotes = "The United Arab Emirates imposes 0% personal income tax on salaries and employment compensation under Federal Decree-Law.";

  } else {
    // Default: Sri Lanka
    const isRevised = input.taxYear === "2025_2026";
    const rules = isRevised ? SRI_LANKA_TAX_RULESET_2025_2026 : SRI_LANKA_TAX_RULESET_2024_2025;
    taxYearLabel = rules.name;
    annualRelief = input.customRelief !== undefined ? Math.max(0, input.customRelief) : rules.annualRelief;
    annualTaxableIncome = Math.max(0, grossAnnualIncome - annualRelief);

    let remaining = annualTaxableIncome;
    let prev = 0;
    for (let i = 0; i < rules.brackets.length; i++) {
      const b = rules.brackets[i];
      const span = b.annualLimit - prev;
      const taxableInSlab = Math.min(remaining, span);
      if (taxableInSlab > 0) {
        const slabTax = taxableInSlab * b.rate;
        totalAnnualTax += slabTax;
        remaining -= taxableInSlab;
        slabs.push({
          slabIndex: i + 1,
          slabRangeLabel: `Rs. ${(prev / 1000).toFixed(0)}k – Rs. ${(b.annualLimit / 1000).toFixed(0)}k`,
          rate: b.rate,
          taxableAmountInSlab: Math.round(taxableInSlab),
          taxForSlab: Math.round(slabTax),
        });
      }
      prev = b.annualLimit;
    }
    if (remaining > 0) {
      const topTax = remaining * rules.topRate;
      totalAnnualTax += topTax;
      slabs.push({
        slabIndex: rules.brackets.length + 1,
        slabRangeLabel: `Above Rs. ${(prev / 1000).toFixed(0)}k`,
        rate: rules.topRate,
        taxableAmountInSlab: Math.round(remaining),
        taxForSlab: Math.round(topTax),
      });
    }
    regionalNotes = "Calculates Sri Lanka Inland Revenue Department (IRD) Advance Personal Income Tax (APIT) under progressive slabs.";
  }

  // Calculate marginal rate
  if (slabs.length > 0) {
    for (let i = slabs.length - 1; i >= 0; i--) {
      if (slabs[i].taxableAmountInSlab > 0) {
        marginalTaxRatePercent = slabs[i].rate * 100;
        break;
      }
    }
  }

  const estimatedMonthlyTax = totalAnnualTax / 12;
  const socialSecurityTaxMonthly = socialSecurityTaxAnnual / 12;
  const totalAnnualDeductions = totalAnnualTax + socialSecurityTaxAnnual;
  const totalMonthlyDeductions = totalAnnualDeductions / 12;

  const effectiveTaxRatePercent = grossAnnualIncome > 0
    ? (totalAnnualDeductions / grossAnnualIncome) * 100
    : 0;

  const netAnnualIncome = Math.max(0, grossAnnualIncome - totalAnnualDeductions);
  const netMonthlyIncome = netAnnualIncome / 12;

  return {
    countryId,
    currency: profile.defaultCurrency,
    currencySymbol: profile.currencySymbol,
    grossMonthlyIncome: Math.round(grossMonthlyIncome * 100) / 100,
    grossAnnualIncome: Math.round(grossAnnualIncome * 100) / 100,
    annualTaxFreeAllowance: Math.round(annualRelief * 100) / 100,
    monthlyTaxFreeAllowance: Math.round((annualRelief / 12) * 100) / 100,
    annualTaxableIncome: Math.round(annualTaxableIncome * 100) / 100,
    monthlyTaxableIncome: Math.round((annualTaxableIncome / 12) * 100) / 100,
    slabs,
    totalAnnualTax: Math.round(totalAnnualTax * 100) / 100,
    estimatedMonthlyTax: Math.round(estimatedMonthlyTax * 100) / 100,
    socialSecurityTaxAnnual: Math.round(socialSecurityTaxAnnual * 100) / 100,
    socialSecurityTaxMonthly: Math.round(socialSecurityTaxMonthly * 100) / 100,
    totalAnnualDeductions: Math.round(totalAnnualDeductions * 100) / 100,
    totalMonthlyDeductions: Math.round(totalMonthlyDeductions * 100) / 100,
    effectiveTaxRatePercent: Math.round(effectiveTaxRatePercent * 100) / 100,
    marginalTaxRatePercent: Math.round(marginalTaxRatePercent * 100) / 100,
    netAnnualIncome: Math.round(netAnnualIncome * 100) / 100,
    netMonthlyIncome: Math.round(netMonthlyIncome * 100) / 100,
    taxYearLabel,
    authorityName: profile.taxAuthorityName,
    authorityUrl: profile.taxAuthorityUrl,
    regionalNotes,
  };
}
