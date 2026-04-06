import { cookies } from "next/headers";

export type SupportedCurrency = "DKK" | "SEK" | "NOK" | "EUR";

export const SUPPORTED_CURRENCIES: SupportedCurrency[] = [
  "DKK",
  "SEK",
  "NOK",
  "EUR",
];

export async function getActiveCurrency(): Promise<SupportedCurrency> {
  const cookieStore = await cookies();
  const value = cookieStore.get("currency")?.value;
  if (value && SUPPORTED_CURRENCIES.includes(value as SupportedCurrency)) {
    return value as SupportedCurrency;
  }
  return "DKK";
}

export function formatPrice(
  amountInSmallestUnit: number,
  currency: SupportedCurrency
): string {
  const amount = amountInSmallestUnit / 100;
  switch (currency) {
    case "DKK":
      return `${amount.toLocaleString("da-DK")} kr.`;
    case "SEK":
      return `${amount.toLocaleString("sv-SE")} kr`;
    case "NOK":
      return `${amount.toLocaleString("nb-NO")} kr`;
    case "EUR":
      return `€${amount.toLocaleString("de-DE")}`;
  }
}
