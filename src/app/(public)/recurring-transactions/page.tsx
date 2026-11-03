import { permanentRedirect } from "next/navigation";

export default function RecurringTransactionsRedirect() {
  permanentRedirect("/features/recurring-transactions");
}
