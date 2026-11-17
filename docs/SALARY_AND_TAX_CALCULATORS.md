# Saviora Global Salary & Tax Tools: Statutory Formulas, Multi-Country Architecture & Documentation

## 1. Executive Summary & Overview
The Saviora Global Salary & Tax Tools suite is a production-grade, client-side financial computation system built into the Saviora SaaS marketing platform (Next.js 16 App Router, React 19, Tailwind CSS).

The platform serves users across **eight target international markets**:
1. **United States (USA)** – IRS 2024 Federal brackets (10%–37%), FICA (6.2% SS + 1.45% Medicare), 401(k), FLSA Overtime.
2. **United Kingdom (UK)** – HMRC 2024/2025 PAYE bands (20%, 40%, 45%), Personal Allowance (£12,570), Class 1 NI Primary (8%), Auto-Enrolment Workplace Pension (5% / 3%), 20% VAT.
3. **Australia (AU)** – ATO 2024/2025 Stage 3 tax cuts (16%, 30%, 37%, 45%), Medicare Levy (2.0%), Superannuation Guarantee (11.5% employer-funded), 10% GST.
4. **Canada (CA)** – CRA 2024 Federal tax brackets (15%–33%), Basic Personal Amount ($15,705), CPP (5.95%), EI (1.66%), provincial tax benchmarks, GST/HST.
5. **India (IN)** – Section 115BAC New Tax Regime (Budget 2024 revised slabs 5%–30%, ₹75,000 standard deduction, 4% Health & Education Cess, 87A rebate up to ₹7L), EPF (12%), Payment of Gratuity Act 1972, 18% GST.
6. **Sri Lanka (LK)** – Inland Revenue Act No. 24 of 2017 (APIT 6%–36%, 2024/25 Rs. 1.2M vs 2025/26 Rs. 1.8M relief), EPF Act No. 15 of 1958 (8% / 12%), ETF Act No. 46 of 1980 (3%), 18% VAT, Shop & Office Act (200 hrs/mo basis, 1.5x OT).
7. **Singapore (SG)** – IRAS YA 2024 progressive resident slabs (2%–24%), CPF (20% employee / 17% employer up to Ordinary Wage ceiling), 9% GST.
8. **United Arab Emirates (UAE)** – UAE Federal Tax Authority (FTA) 0% Personal Income Tax, UAE Labour Law (Federal Decree-Law No. 33 of 2021) End of Service Gratuity (21 days/yr for 1–5 yrs, 30 days/yr > 5 yrs, capped at 2 yrs gross pay), 5% VAT.

---

## 2. Supported Calculators (8 Core Tools)

| Tool ID | Base URL | Supported Route Range | Core Capabilities |
| :--- | :--- | :--- | :--- |
| **01. Salary Calculator** | `/free-tools/salary-calculator` | `/free-tools/salary-calculator/[country]` | Gross-to-net pay breakdown, retirement deductions, statutory social insurance, income tax, net take-home salary, employer CTC. |
| **02. Income Tax Calculator** | `/free-tools/income-tax-calculator` | `/free-tools/income-tax-calculator/[country]` | Progressive bracket calculations, standard tax-free allowances, effective vs marginal tax rates, 87A rebates, Medicare/NI/FICA deductions. |
| **03. Take-Home Pay** | `/free-tools/take-home-salary-calculator` | `/free-tools/take-home-salary-calculator/[country]` | Net in-hand monthly & annual pay, auto or manual tax deduction mode, itemized deductions table, visual distribution bar. |
| **04. Pension / EPF** | `/free-tools/epf-calculator` | `/free-tools/epf-calculator/[country]` | 401(k), Superannuation Guarantee, CPF, CPP, and EPF contributions with compound growth forecasting. |
| **05. Employer Contribution** | `/free-tools/etf-calculator` | `/free-tools/etf-calculator/[country]` | 100% employer-funded benefits: ETF 3%, Employer Super 11.5%, Employer FICA 7.65%, Employer NI 13.8%, Employer CPF 17%. |
| **06. VAT / GST / Sales Tax** | `/free-tools/vat-calculator` | `/free-tools/vat-calculator/[country]` | Add or remove consumption tax with preset regional rates (5%, 9%, 10%, 12%, 18%, 20%) and mathematical formula transparency. |
| **07. Gratuity & Severance** | `/free-tools/gratuity-calculator` | `/free-tools/gratuity-calculator/[country]` | Statutory end-of-service gratuity (UAE / Sri Lanka / India), redundancy pay (UK / Australia), or severance payout estimation. |
| **08. Overtime Pay** | `/free-tools/overtime-calculator` | `/free-tools/overtime-calculator/[country]` | Hourly rate derivation from monthly salary, 1.5x normal overtime, and double-time (2.0x) holiday pay under national labour acts. |

---

## 3. SEO & Information Architecture
* **Programmatic Country Routes:**
  * 8 core tools × 8 supported countries = **64 high-performing programmatic SEO landing pages** under `/free-tools/[tool]/[country]/`.
  * Generated at build time via Next.js `generateStaticParams()`.
* **Central Hub:**
  * `/free-tools/` and alias `/free-tools/salary-and-tax-tools/` with country filter tabs.
* **Structured Data (JSON-LD):**
  * Every page injects Google-compliant `WebApplication` and `BreadcrumbList` schema.
* **Sitemap Integration:**
  * Dynamic sitemap at `src/app/sitemap.ts` indexing all 72 URLs with appropriate priorities and frequencies.

---

## 4. Architectural Guarantees & Privacy
1. **100% Client-Side Computation:**
   All calculation engines run directly in the user's browser with 0 external network requests during calculations.
2. **Zero Data Storage:**
   No salary, wage, deduction, or personal financial inputs are sent to Saviora servers or logged in any database.
3. **Type Safety:**
   Fully typed in TypeScript with strict compile checks and 0 errors (`npx tsc --noEmit`).
4. **Unit Test Verification:**
   Automated regression test suite in `src/lib/calculators/__tests__/calculators.test.ts` validating statutory bounds for all 8 countries.
