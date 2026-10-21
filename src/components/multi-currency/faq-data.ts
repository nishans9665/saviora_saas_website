export interface CurrencyFAQItem {
  id: string;
  question: string;
  answer: string;
}

export const currencyFaqData: CurrencyFAQItem[] = [
  {
    id: "faq-currency-1",
    question: "What is multi-currency management in Saviora?",
    answer:
      "Multi-currency management in Saviora allows you to choose your preferred main currency (such as USD, EUR, GBP, and other supported global currencies) from Settings → Localization. This establishes the primary currency symbol and formatting used throughout your dashboard, income logs, expense records, budget limits, and savings goals.",
  },
  {
    id: "faq-currency-2",
    question: "How do I change my main currency?",
    answer:
      "To change your main currency, log in to Saviora and navigate to Settings in the sidebar. Select the Localization tab from the Account Settings menu, choose your preferred currency option from the 'Main Currency' dropdown, and click the green 'Save Settings' button. Your financial displays will immediately reflect your updated currency preference.",
  },
  {
    id: "faq-currency-3",
    question: "Can my selected currency be different from my country?",
    answer:
      "Yes. In Saviora's Localization settings, Country and Main Currency are entirely separate, independent fields. For example, you can select your country of residence while setting your Main Currency to USD, EUR, GBP, or any other supported currency that matches how you prefer to track your finances.",
  },
  {
    id: "faq-currency-4",
    question: "Does changing my main currency automatically convert existing transactions?",
    answer:
      "No. Saviora does not automatically convert or recalculate existing numerical transaction amounts when you switch your main currency. Changing your main currency updates the currency symbol and display formatting applied across your records; your recorded numerical numbers remain exactly as originally entered.",
  },
  {
    id: "faq-currency-5",
    question: "Does Saviora support live exchange rates?",
    answer:
      "No. Saviora is focused on clear personal finance tracking, category budgeting, and milestone savings using a designated main currency. It does not provide live foreign exchange (FX) rate feeds, automatic conversion between different currency balances, or multi-currency wallet conversion.",
  },
  {
    id: "faq-currency-6",
    question: "Can I change language and timezone separately?",
    answer:
      "Yes. The Localization screen provides independent dropdown controls for Country, Main Currency, Language, Timezone, Financial Year, and Budget Cycle. Updating one preference does not overwrite or restrict any of your other regional settings.",
  },
  {
    id: "faq-currency-7",
    question: "Can I use Saviora outside one country?",
    answer:
      "Yes. Saviora is accessible globally via any modern web browser or mobile device. Users worldwide can customize their country, select their regional timezone (such as GMT offsets like Asia/Colombo GMT+05:30), and set their preferred main currency to fit their locale.",
  },
];
