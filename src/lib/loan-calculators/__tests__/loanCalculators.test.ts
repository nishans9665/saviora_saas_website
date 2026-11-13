import {
  calculateLoanEMI,
  calculatePersonalLoan,
  calculateHomeLoan,
  calculateVehicleLoan,
  calculateSimpleInterest,
  calculateCompoundInterest,
  calculateFixedDeposit,
  calculateCreditCardInterest,
  calculateDebtRepayment,
} from "../engines";

export function runAllLoanCalculatorTests() {
  const results: { test: string; passed: boolean; error?: string }[] = [];

  function test(name: string, fn: () => void) {
    try {
      fn();
      results.push({ test: name, passed: true });
    } catch (e: unknown) {
      results.push({ test: name, passed: false, error: (e as Error)?.message || String(e) });
    }
  }

  function assert(condition: boolean, msg: string) {
    if (!condition) throw new Error("Assertion failed: " + msg);
  }

  function assertClose(a: number, b: number, msg: string, maxDiff = 0.5) {
    if (Math.abs(a - b) > maxDiff) {
      throw new Error(`Assertion failed: ${msg}. Got ${a}, expected ${b}`);
    }
  }

  // 1. Loan EMI
  test("Loan EMI: Standard 30-year fixed rate mortgage ($100k, 7%)", () => {
    const res = calculateLoanEMI({
      loanAmount: 100000,
      annualInterestRate: 7,
      tenureYears: 30,
      paymentFrequency: "monthly",
    });
    assertClose(res.periodicPayment, 665.30, "EMI should be ~665.30");
    assert(res.totalInterest > 139000, "Total interest should be > 139000");
    assertClose(res.totalRepayment, res.principal + res.totalInterest, "Total repayment = principal + interest");
    assert(res.totalPaymentsCount === 360, "Total payments count should be 360");
    assert(res.amortizationSchedule.length === 360, "Schedule length should be 360");
    assert(res.yearlySummary.length === 30, "Yearly summary length should be 30");
  });

  test("Loan EMI: Zero interest scenario ($12k, 1 year)", () => {
    const res = calculateLoanEMI({
      loanAmount: 12000,
      annualInterestRate: 0,
      tenureYears: 1,
      paymentFrequency: "monthly",
    });
    assert(res.periodicPayment === 1000, "Payment should be 1000");
    assert(res.totalInterest === 0, "Interest should be 0");
    assert(res.totalRepayment === 12000, "Repayment should be 12000");
  });

  // 2. Personal Loan
  test("Personal Loan: Reducing vs Flat rate comparison", () => {
    const reducing = calculatePersonalLoan({
      loanAmount: 10000,
      annualInterestRate: 10,
      tenureMonths: 12,
      method: "reducing",
      processingFeePercent: 2,
    });

    const flat = calculatePersonalLoan({
      loanAmount: 10000,
      annualInterestRate: 10,
      tenureMonths: 12,
      method: "flat",
      processingFeePercent: 2,
    });

    assert(flat.totalInterest === 1000, "Flat interest should be 1000");
    assert(reducing.totalInterest < flat.totalInterest, "Reducing interest should be lower than flat");
    assertClose(flat.monthlyPayment, 916.67, "Flat monthly should be 916.67");
    assert(flat.netDisbursement === 9800, "Net disbursement should be 9800");
  });

  // 3. Home Loan
  test("Home Loan: Down payment, LTV, and extra payment acceleration", () => {
    const withoutExtra = calculateHomeLoan({
      propertyPrice: 400000,
      downPayment: 80000,
      annualInterestRate: 6.5,
      tenureYears: 30,
    });

    assert(withoutExtra.loanPrincipal === 320000, "Principal should be 320k");
    assert(withoutExtra.ltvRatio === 80, "LTV should be 80%");
    assert(withoutExtra.originalPayoffMonths === 360, "Original months should be 360");

    const withExtra = calculateHomeLoan({
      propertyPrice: 400000,
      downPayment: 80000,
      annualInterestRate: 6.5,
      tenureYears: 30,
      extraMonthlyPayment: 300,
    });

    assert(withExtra.actualPayoffMonths < 360, "Actual payoff should be < 360");
    assert(withExtra.monthsSaved > 60, "Should save > 60 months");
    assert(withExtra.interestSaved > 50000, "Should save > 50k interest");
  });

  // 4. Vehicle Loan
  test("Vehicle Loan: Trade-in, fees, and tenure comparisons", () => {
    const res = calculateVehicleLoan({
      vehiclePrice: 30000,
      downPayment: 5000,
      tradeInValue: 3000,
      salesTaxRate: 5,
      dealerFees: 500,
      includeFeesInLoan: true,
      annualInterestRate: 5.5,
      tenureMonths: 48,
    });

    assert(res.financedAmount === 24000, "Financed should be 24000");
    assert(res.tenureComparisons.length === 5, "Should have 5 tenure comparisons");
    assert(res.tenureComparisons[0].monthlyPayment > res.tenureComparisons[4].monthlyPayment, "36M payment > 84M payment");
    assert(res.tenureComparisons[4].totalInterest > res.tenureComparisons[0].totalInterest, "84M interest > 36M interest");
  });

  // 5. Simple Interest
  test("Simple Interest: Formula and periodic breakdown", () => {
    const res = calculateSimpleInterest({
      principal: 10000,
      annualInterestRate: 5,
      timePeriod: 3,
      timeUnit: "years",
    });

    assert(res.totalSimpleInterest === 1500, "Simple interest should be 1500");
    assert(res.finalMaturityAmount === 11500, "Maturity should be 11500");
    assert(res.interestPerYear === 500, "Interest/year should be 500");
    assert(res.compoundInterestComparison.difference > 0, "Compound difference should be > 0");
  });

  // 6. Compound Interest
  test("Compound Interest: Lump sum + monthly regular contributions", () => {
    const res = calculateCompoundInterest({
      initialInvestment: 10000,
      annualInterestRate: 8,
      durationYears: 10,
      compoundingFrequency: "monthly",
      regularContribution: 200,
      contributionFrequency: "monthly",
    });

    assert(res.totalPrincipalInvested === 34000, "Total deposited should be 34000");
    assert(res.finalBalance > 55000, "Final balance should be > 55000");
    assertClose(res.totalInterestEarned, res.finalBalance - res.totalPrincipalInvested, "Interest earned should match");
    assert(res.yearByYearGrowth.length === 10, "Should have 10 year rows");
    assert(res.growthMultiple > 1.6, "Growth multiple > 1.6");
  });

  // 7. Fixed Deposit
  test("Fixed Deposit: Cumulative vs Monthly Payout with tax deduction", () => {
    const cumulative = calculateFixedDeposit({
      depositAmount: 50000,
      annualInterestRate: 7,
      tenureValue: 2,
      tenureUnit: "years",
      compoundingFrequency: "quarterly",
      payoutOption: "cumulative",
      withholdingTaxRate: 10,
    });

    assert(cumulative.grossInterestEarned > 7000, "Gross interest > 7000");
    assertClose(cumulative.withholdingTaxAmount, cumulative.grossInterestEarned * 0.1, "Tax should be 10%");
    assertClose(cumulative.totalMaturityOrPayoutAmount, 50000 + cumulative.netInterestEarned, "Maturity matches");

    const monthlyPayout = calculateFixedDeposit({
      depositAmount: 50000,
      annualInterestRate: 7,
      tenureValue: 1,
      tenureUnit: "years",
      payoutOption: "monthly",
      withholdingTaxRate: 10,
    });

    assertClose(monthlyPayout.periodicPayoutAmount, (50000 * (0.07 / 12)) * 0.9, "Monthly payout matches");
  });

  // 8. Credit Card Interest
  test("Credit Card Interest: Fixed payoff vs Negative amortization trap", () => {
    const payoff = calculateCreditCardInterest({
      balance: 5000,
      apr: 20,
      paymentMode: "fixed",
      fixedMonthlyPayment: 200,
    });

    assert(payoff.isNegativeAmortization === false, "Should not be negative amort");
    assert(payoff.monthsToPayOff < 36, "Should be paid off in < 36 months");
    assert(payoff.totalInterestPaid > 0, "Interest should be > 0");

    const trapped = calculateCreditCardInterest({
      balance: 5000,
      apr: 24,
      paymentMode: "fixed",
      fixedMonthlyPayment: 50,
    });

    assert(trapped.isNegativeAmortization === true, "Should detect negative amort");
    assert(String(trapped.warningMessage).includes("less than or equal to the monthly interest"), "Warning message matches");
  });

  // 9. Debt Repayment
  test("Debt Repayment: Snowball vs Avalanche strategy comparison", () => {
    const debts = [
      { id: "1", name: "Credit Card A", balance: 2500, interestRate: 22, minimumPayment: 75 },
      { id: "2", name: "Personal Loan", balance: 6000, interestRate: 11, minimumPayment: 150 },
      { id: "3", name: "Auto Loan", balance: 12000, interestRate: 6, minimumPayment: 250 },
    ];

    const res = calculateDebtRepayment({
      debts,
      extraMonthlyPayment: 150,
      strategy: "snowball",
    });

    assert(res.totalInitialDebt === 20500, "Initial debt = 20500");
    assert(res.totalMinimumPayments === 475, "Total min payments = 475");
    assert(res.totalMonthlyPayment === 625, "Total monthly = 625");
    assert(res.avalancheResult.totalInterestPaid <= res.snowballResult.totalInterestPaid, "Avalanche interest <= Snowball");
    assert(res.avalancheResult.totalMonths <= res.minimumsOnlyResult.totalMonths, "Avalanche months <= Minimums");
    assert(res.selectedStrategyResult.timeline.length > 0, "Timeline should have entries");
  });

  return results;
}
