import { EmergencyFundInput, EmergencyFundResult, EmergencyFundMilestone } from "../types";

export function calculateEmergencyFund(input: EmergencyFundInput): EmergencyFundResult {
  const monthlyHousing = Math.max(0, input.monthlyHousing || 0);
  const monthlyFood = Math.max(0, input.monthlyFood || 0);
  const monthlyUtilities = Math.max(0, input.monthlyUtilities || 0);
  const monthlyTransportation = Math.max(0, input.monthlyTransportation || 0);
  const monthlyHealthcare = Math.max(0, input.monthlyHealthcare || 0);
  const monthlyDebtMinimums = Math.max(0, input.monthlyDebtMinimums || 0);
  const monthlyOtherEssentials = Math.max(0, input.monthlyOtherEssentials || 0);
  const existingSavings = Math.max(0, input.existingSavings || 0);
  const desiredMonths = Math.max(1, Math.min(24, input.desiredMonths || 6));
  const monthlyContribution = Math.max(0, input.monthlyContribution || 0);

  const totalEssentialMonthlyExpenses =
    monthlyHousing +
    monthlyFood +
    monthlyUtilities +
    monthlyTransportation +
    monthlyHealthcare +
    monthlyDebtMinimums +
    monthlyOtherEssentials;

  const emergencyFundTarget = totalEssentialMonthlyExpenses * desiredMonths;
  const remainingAmountNeeded = Math.max(0, emergencyFundTarget - existingSavings);
  const surplusAmount = Math.max(0, existingSavings - emergencyFundTarget);
  const isGoalMet = existingSavings >= emergencyFundTarget;

  const progressPercent = emergencyFundTarget > 0
    ? Math.min(100, (existingSavings / emergencyFundTarget) * 100)
    : 100;

  let estimatedMonthsToReachGoal = 0;
  if (!isGoalMet && monthlyContribution > 0) {
    estimatedMonthsToReachGoal = Math.ceil(remainingAmountNeeded / monthlyContribution);
  }

  // Milestones: 3 Months, 6 Months, 9 Months, 12 Months
  const milestoneDefs = [
    { months: 3, label: "3-Month Starter Buffer" },
    { months: 6, label: "6-Month Essential Baseline" },
    { months: 9, label: "9-Month Solid Safety Net" },
    { months: 12, label: "12-Month Bulletproof Reserve" },
  ];

  const milestones: EmergencyFundMilestone[] = milestoneDefs.map((m) => {
    const target = totalEssentialMonthlyExpenses * m.months;
    const remaining = Math.max(0, target - existingSavings);
    const monthsToReach = monthlyContribution > 0 ? Math.ceil(remaining / monthlyContribution) : 0;
    return {
      months: m.months,
      label: m.label,
      targetAmount: Math.round(target * 100) / 100,
      remainingAmount: Math.round(remaining * 100) / 100,
      monthsToReach: remaining === 0 ? 0 : monthsToReach,
      isAchieved: existingSavings >= target,
    };
  });

  return {
    totalEssentialMonthlyExpenses: Math.round(totalEssentialMonthlyExpenses * 100) / 100,
    desiredMonths,
    emergencyFundTarget: Math.round(emergencyFundTarget * 100) / 100,
    existingSavings: Math.round(existingSavings * 100) / 100,
    remainingAmountNeeded: Math.round(remainingAmountNeeded * 100) / 100,
    surplusAmount: Math.round(surplusAmount * 100) / 100,
    estimatedMonthsToReachGoal,
    isGoalMet,
    progressPercent: Math.round(progressPercent * 10) / 10,
    milestones,
  };
}
