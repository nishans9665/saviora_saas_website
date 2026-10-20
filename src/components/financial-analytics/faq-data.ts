export interface AnalyticsFAQItem {
  id: string;
  question: string;
  answer: string;
}

export const analyticsFaqData: AnalyticsFAQItem[] = [
  {
    id: "faq-analytics-1",
    question: "What is financial analytics in a personal finance app?",
    answer:
      "Financial analytics in Saviora transforms your recorded transactions into visual summaries, category distributions, income-versus-expense comparisons, and trend charts. It helps you review spending patterns, understand where your money goes, and make data-driven financial decisions without manual calculations.",
  },
  {
    id: "faq-analytics-2",
    question: "What can I track with Saviora Financial Analytics?",
    answer:
      "Based on the Saviora Analytics dashboard, you can track total expenses, your top spending category, most-used payment methods, average daily spending, monthly growth rates, and total transaction counts. You can also explore visual charts for category distribution, income vs expenses, spending by payment method, daily spending timelines, and smart budget insights.",
  },
  {
    id: "faq-analytics-3",
    question: "Can I compare income and expenses?",
    answer:
      "Yes. The Analytics interface includes a dedicated Income vs Expenses comparison chart that tracks your recorded inflows against your spending across selected monthly reporting periods, giving you a clear view of your net cash flow direction.",
  },
  {
    id: "faq-analytics-4",
    question: "Can I see which categories account for the most spending?",
    answer:
      "Yes. The Category Distribution section features an interactive donut breakdown and percentage table showing exact expense amounts, proportion of total spending, and transaction counts for every category (such as Education, Food & Groceries, Entertainment, and Travel).",
  },
  {
    id: "faq-analytics-5",
    question: "Can I analyze spending by payment method?",
    answer:
      "Yes. The Spending by Payment Method visualization summarizes recorded transactions according to how you paid—such as Bank Transfer, Credit Card, or Cash—helping you understand payment channel allocation.",
  },
  {
    id: "faq-analytics-6",
    question: "Can I view daily spending patterns?",
    answer:
      "Yes. The Daily Spending Pattern timeline plots your daily expense totals across the active reporting period. This makes it easy to identify specific days with peak spending and investigate the transactions behind those totals.",
  },
  {
    id: "faq-analytics-7",
    question: "Can I filter expense reports?",
    answer:
      "Yes. The Detailed Expense Report includes keyword search, category filtering, and payment-method filtering, alongside customizable date range controls so you can narrow down records to precisely what you need to review.",
  },
  {
    id: "faq-analytics-8",
    question: "Can I export my financial reports?",
    answer:
      "Yes. The dashboard includes an Export action that allows you to download your expense records and financial report data for offline recordkeeping, tax preparation, or spreadsheet analysis.",
  },
  {
    id: "faq-analytics-9",
    question: "Does Saviora automatically connect to my bank?",
    answer:
      "Saviora is an intentional personal finance management tool focused on privacy and user control. Financial records are added through simple manual entries or supported import options rather than automated third-party bank screen-scraping, ensuring your financial credentials remain secure.",
  },
  {
    id: "faq-analytics-10",
    question: "Does Saviora provide AI financial advice?",
    answer:
      "No. Saviora provides objective financial analytics, data visualizations, and rule-based budget alerts (such as warnings when you approach or exceed configured category limits). Saviora does not provide automated AI financial advice or professional investment advisory services.",
  },
];
