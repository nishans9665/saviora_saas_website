export interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

export const budgetFaqData: FAQItem[] = [
  {
    id: "faq-budget-1",
    question: "What is monthly budget planning?",
    answer:
      "Monthly budget planning is the process of setting spending limits for different expense categories and monitoring actual spending against those limits throughout the month.",
  },
  {
    id: "faq-budget-2",
    question: "How do I create a monthly budget in Saviora?",
    answer:
      "Create a new budget, enter a title, select a category, specify the spending limit and target month, and save it. You can then monitor the budget from your Budget Management dashboard.",
  },
  {
    id: "faq-budget-3",
    question: "Can I create multiple category-wise budgets?",
    answer:
      "You can create separate budgets for different expense categories, subject to the application's existing budget rules and validation.",
  },
  {
    id: "faq-budget-4",
    question: "What does Strict Limit do?",
    answer:
      "Strict Limit applies a restriction to qualifying new expenses when adding them would exceed the configured budget limit. Its exact behavior depends on the budget rules implemented in Saviora.",
  },
  {
    id: "faq-budget-5",
    question: "Can I track my remaining budget?",
    answer:
      "Yes. The Budget Management dashboard displays the budget amount, spending to date, remaining balance, and budget utilization.",
  },
  {
    id: "faq-budget-6",
    question: "Can I see which expenses belong to a budget?",
    answer:
      "The budget card can display assigned expenses, allowing you to review transaction amounts and dates associated with that category.",
  },
  {
    id: "faq-budget-7",
    question: "Can I manage budgets for different months?",
    answer:
      "Saviora supports a target-month field in budget creation. Use the available financial-period selector to review the relevant month, subject to the application's current period-management rules.",
  },
  {
    id: "faq-budget-8",
    question: "Does Saviora automatically connect to my bank?",
    answer:
      "Saviora allows you to record and track your financial transactions directly within the platform. Automatic bank account synchronization depends on regional availability and specific institution support, with seamless manual entry and import options readily available.",
  },
];
