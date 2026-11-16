// Safe Google Analytics / Event tracking helper for Saviora Financial Tools
export type CalculatorEventType =
  | "calculator_calculate"
  | "calculator_currency_change"
  | "calculator_download_csv"
  | "calculator_print_report"
  | "calculator_copy_summary"
  | "calculator_schedule_toggle"
  | "calculator_cta_click";

export function trackCalculatorEvent(
  action: CalculatorEventType,
  params: {
    tool: string;
    category?: string;
    currency?: string;
    label?: string;
    value?: number;
    [key: string]: unknown;
  }
) {
  if (typeof window === "undefined") return;

  try {
    const win = window as unknown as { gtag?: (...args: unknown[]) => void; dataLayer?: unknown[] };
    if (typeof win.gtag === "function") {
      win.gtag("event", action, {
        event_category: params.category || "Investment Calculators",
        event_label: `${params.tool}${params.label ? ` - ${params.label}` : ""}`,
        currency: params.currency,
        value: params.value,
        ...params,
      });
    }
  } catch {
    // Silently continue if tracking is blocked by ad-blocker or unavailable
  }
}
