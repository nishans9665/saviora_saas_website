import { permanentRedirect } from "next/navigation";

export default function SalaryAndTaxToolsRedirect() {
  permanentRedirect("/free-tools/salary-tax-calculators");
}
