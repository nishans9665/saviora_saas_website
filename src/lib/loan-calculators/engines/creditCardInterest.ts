import { CreditCardInput, CreditCardResult, CreditCardScheduleRow } from "../types";
import { parseSafeNumber } from "../currencies";

export function calculateCreditCardInterest(
  input: CreditCardInput,
  skipExtraComparison = false
): CreditCardResult {
  const balance = Math.max(0, parseSafeNumber(input.balance));
  const apr = Math.max(0, parseSafeNumber(input.apr));
  const mode = input.paymentMode || "fixed";
  const monthlyRate = (apr / 100) / 12;

  const minPercent = Math.max(1, parseSafeNumber(input.minimumPaymentPercent, 2.5));
  const minFloor = Math.max(10, parseSafeNumber(input.minimumPaymentFloor, 25));
  const fixedPay = Math.max(0, parseSafeNumber(input.fixedMonthlyPayment));
  const targetMonths = Math.max(1, Math.round(parseSafeNumber(input.targetMonths, 12)));
  const newPurchases = Math.max(0, parseSafeNumber(input.monthlyNewPurchases));

  // Determine initial payment
  let initialMonthlyPayment = 0;
  if (mode === "fixed") {
    initialMonthlyPayment = fixedPay;
  } else if (mode === "minimum") {
    initialMonthlyPayment = Math.max(minFloor, balance * (minPercent / 100));
  } else {
    // target months: payment = balance * [r*(1+r)^N / ((1+r)^N - 1)]
    if (monthlyRate === 0) {
      initialMonthlyPayment = balance / targetMonths;
    } else {
      const factor = Math.pow(1 + monthlyRate, targetMonths);
      initialMonthlyPayment = (balance * monthlyRate * factor) / (factor - 1);
    }
  }

  // Check negative amortization trap
  const initialMonthlyInterest = balance * monthlyRate;
  const isNegative = initialMonthlyPayment <= initialMonthlyInterest && balance > 0;

  if (isNegative) {
    return {
      currentBalance: Math.round(balance * 100) / 100,
      apr: Math.round(apr * 100) / 100,
      isNegativeAmortization: true,
      warningMessage: `Warning: Your monthly payment of ${initialMonthlyPayment.toFixed(2)} is less than or equal to the monthly interest charge of ${initialMonthlyInterest.toFixed(2)}. Your balance will grow and this debt will never be paid off!`,
      monthsToPayOff: 0,
      monthlyPaymentInitial: Math.round(initialMonthlyPayment * 100) / 100,
      totalInterestPaid: 0,
      totalAmountPaid: 0,
      schedule: [],
    };
  }

  // Simulate month by month
  const schedule: CreditCardScheduleRow[] = [];
  let currentBal = balance;
  let totalInterest = 0;
  let totalPaid = 0;
  let month = 0;
  const maxMonths = 360; // 30-year cap

  while (currentBal > 0.01 && month < maxMonths) {
    month++;
    const startBal = currentBal;
    const interest = startBal * monthlyRate;
    totalInterest += interest;

    let pmt = initialMonthlyPayment;
    if (mode === "minimum") {
      pmt = Math.max(minFloor, (startBal + interest) * (minPercent / 100));
    }

    // Add new purchases if specified
    const balWithPurchases = startBal + interest + newPurchases;
    if (pmt >= balWithPurchases) {
      pmt = balWithPurchases;
    }

    const principalPaid = Math.max(0, pmt - interest);
    currentBal = Math.max(0, balWithPurchases - pmt);
    totalPaid += pmt;

    schedule.push({
      month,
      startingBalance: Math.round(startBal * 100) / 100,
      interestCharged: Math.round(interest * 100) / 100,
      payment: Math.round(pmt * 100) / 100,
      principalPaid: Math.round(principalPaid * 100) / 100,
      endingBalance: Math.round(currentBal * 100) / 100,
      totalInterestToDate: Math.round(totalInterest * 100) / 100,
    });
  }

  let extraPaymentComparison: CreditCardResult["extraPaymentComparison"] = undefined;

  if (!skipExtraComparison && initialMonthlyPayment > 0) {
    const extraAmount = initialMonthlyPayment >= 100 ? 50 : 25;
    const compRes = calculateCreditCardInterest(
      {
        balance,
        apr,
        paymentMode: "fixed",
        fixedMonthlyPayment: initialMonthlyPayment + extraAmount,
      },
      true // skip recursion
    );

    const monthsSaved = Math.max(0, month - compRes.monthsToPayOff);
    const interestSaved = Math.max(0, totalInterest - compRes.totalInterestPaid);

    extraPaymentComparison = {
      extraAmount,
      newMonths: compRes.monthsToPayOff,
      monthsSaved,
      interestSaved: Math.round(interestSaved * 100) / 100,
    };
  }

  return {
    currentBalance: Math.round(balance * 100) / 100,
    apr: Math.round(apr * 100) / 100,
    isNegativeAmortization: false,
    monthsToPayOff: month,
    monthlyPaymentInitial: Math.round(initialMonthlyPayment * 100) / 100,
    totalInterestPaid: Math.round(totalInterest * 100) / 100,
    totalAmountPaid: Math.round(totalPaid * 100) / 100,
    extraPaymentComparison,
    schedule,
  };
}
