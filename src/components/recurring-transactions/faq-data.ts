export interface RecurringFAQItem {
  id: string;
  question: string;
  answer: string;
}

export const recurringFaqData: RecurringFAQItem[] = [
  {
    id: "faq-recurring-1",
    question: "What are recurring transactions?",
    answer:
      "Recurring transactions in Saviora are repeating income or expense records configured on a preset schedule—such as weekly, bi-weekly, monthly, or yearly. Instead of manually re-entering identical bills, subscriptions, or paychecks every period, Saviora automatically generates upcoming transaction records and tracks their lifecycle so your financial records stay accurate and organized.",
  },
  {
    id: "faq-recurring-2",
    question: "Can I create recurring income and expenses?",
    answer:
      "Yes. Saviora fully supports both recurring income (such as monthly salaries, freelance client retainers, and repeating dividends) and recurring expenses (such as rent, utility bills, software subscriptions, and loan repayments). Both income and expense streams integrate directly into your cash flow and financial records.",
  },
  {
    id: "faq-recurring-3",
    question: "Which recurrence schedules are supported?",
    answer:
      "Saviora supports four core recurrence schedules: Weekly, Bi-weekly (every two weeks), Monthly, and Yearly (annually). These frequencies cover common personal and professional commitments, from bi-weekly paychecks and monthly utility bills to annual software licenses and insurance renewals.",
  },
  {
    id: "faq-recurring-4",
    question: "Does Saviora automatically process recurring transactions?",
    answer:
      "Yes, within your Saviora account records. When an active recurring transaction reaches its scheduled date, Saviora automatically processes the transaction and transitions its status from 'Scheduled' to 'Completed' (for expenses) or 'Received' (for income), logging the activity in your financial reports and period balances.",
  },
  {
    id: "faq-recurring-5",
    question: "Does Saviora automatically withdraw money from my bank account?",
    answer:
      "No. Saviora is a personal finance tracking and planning platform, not a banking institution or payment processor. It does not connect to bank payment rails to move funds or withdraw money from your accounts. You maintain complete control over your actual banking payments; Saviora automates the digital accounting, recordkeeping, and schedule tracking.",
  },
  {
    id: "faq-recurring-6",
    question: "Can I change the amount of a recurring expense?",
    answer:
      "Yes. Saviora provides flexible editing options. If an expense fluctuates for a single billing period (such as an electricity bill with higher seasonal AC usage), you can edit that individual occurrence without affecting the rest of the schedule. If your recurring cost changes permanently (such as a rent increase), you can choose to update all future occurrences across the series starting from that date forward.",
  },
  {
    id: "faq-recurring-7",
    question: "What happens when a recurring transaction reaches its due date?",
    answer:
      "When a scheduled transaction reaches its scheduled date, Saviora automatically updates its status to 'Completed' for expenses or 'Received' for income. The financial activity is recorded in your current period ledger, and an in-app notification confirms that the transaction was processed.",
  },
  {
    id: "faq-recurring-8",
    question: "What happens when a monthly transaction is scheduled for the 31st?",
    answer:
      "Saviora includes built-in calendar logic to handle shorter calendar months. For months with fewer than 31 days (such as February, April, June, September, and November), the transaction automatically adjusts to the final calendar day of that month (for example, February 28 or 29, April 30), preventing missed occurrences and avoiding duplicate records.",
  },
  {
    id: "faq-recurring-9",
    question: "Can I cancel a recurring transaction?",
    answer:
      "Yes. You can cancel a recurring series at any time. When cancelled, future scheduled transaction instances are removed from your calendar, while all past completed and received transaction records remain safely preserved in your historical ledger and reports.",
  },
  {
    id: "faq-recurring-10",
    question: "Can I pause a recurring schedule?",
    answer:
      "Currently, pausing and resuming an active schedule is not supported. If you need to stop a repeating payment temporarily, you can cancel the recurring series and recreate it when you wish to resume. Dedicated pause and resume controls are planned for an upcoming platform release.",
  },
  {
    id: "faq-recurring-11",
    question: "Can I set reminders before a bill is due?",
    answer:
      "Saviora currently provides in-app notifications when recurring transactions are processed on their scheduled date. Advance alert notifications (such as reminders 1 to 3 days prior to due dates) are part of our development roadmap and are not yet available in the current release.",
  },
  {
    id: "faq-recurring-12",
    question: "Does Saviora support automatic bank payments?",
    answer:
      "No. Saviora automates your financial records, schedule generation, and transaction statuses within the app, but does not execute monetary payments or bank-to-bank transfers. All physical payments continue to be processed directly through your bank, credit card, or payment provider.",
  },
];
