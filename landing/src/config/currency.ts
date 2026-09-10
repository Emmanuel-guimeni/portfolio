/**
 * Currencies & FX.
 *
 * Every price in `tools.ts` is stored ONCE, in its official billing currency.
 * All other currencies are DERIVED with the rates below, never hard-coded, so
 * updating a rate updates every figure on the page at once.
 *
 * XAF = Central African CFA franc (CEMAC zone). Not to be confused with XOF
 * (West African CFA franc). Both are pegged to the euro, but they are distinct
 * currencies issued by different central banks (BEAC vs BCEAO).
 */

export const CURRENCIES = ['USD', 'EUR', 'MAD', 'XAF'] as const;
export type Currency = (typeof CURRENCIES)[number];

export const CURRENCY_META: Record<
  Currency,
  { code: Currency; name: string; symbol: string; locale: string; decimals: number }
> = {
  USD: { code: 'USD', name: 'US Dollar', symbol: '$', locale: 'en-US', decimals: 2 },
  EUR: { code: 'EUR', name: 'Euro', symbol: '€', locale: 'fr-FR', decimals: 2 },
  MAD: { code: 'MAD', name: 'Moroccan Dirham', symbol: 'DH', locale: 'fr-MA', decimals: 0 },
  XAF: {
    code: 'XAF',
    name: 'Central African CFA Franc (CEMAC)',
    symbol: 'FCFA',
    locale: 'fr-CM',
    decimals: 0,
  },
};

/**
 * Rates expressed as: 1 USD = N <currency>.
 * ⚠️ These are INDICATIVE and must be refreshed. The FX panel on the pricing
 * section lets any visitor override them live in the browser.
 *
 * EUR→XAF is a fixed statutory peg: 1 EUR = 655.957 XAF. The USD→XAF default
 * below is therefore derived from the USD→EUR rate (0.86 × 655.957 ≈ 564.1).
 */
export const FX_DEFAULT: Record<Currency, number> = {
  USD: 1,
  EUR: 0.86,
  MAD: 9.15,
  XAF: 564.12,
};

export const FX_META = {
  /** Date the default rates above were last set. */
  date: '2026-09-09',
  source: 'Indicative mid-market rates — refresh before quoting a client',
  sourceUrl: 'https://www.xe.com/currencyconverter/',
  pegNote: '1 EUR = 655.957 XAF (fixed CEMAC peg)',
} as const;

/** Fixed statutory peg between the euro and the Central African CFA franc. */
export const EUR_XAF_PEG = 655.957;

export function convert(
  amount: number,
  from: Currency,
  to: Currency,
  fx: Record<Currency, number> = FX_DEFAULT,
): number {
  if (from === to) return amount;
  const inUsd = amount / (fx[from] || 1);
  return inUsd * (fx[to] || 1);
}

export function formatMoney(
  amount: number,
  currency: Currency,
  opts: { compact?: boolean } = {},
): string {
  const meta = CURRENCY_META[currency];
  const decimals = amount >= 100 || meta.decimals === 0 ? 0 : meta.decimals;
  const value = new Intl.NumberFormat(meta.locale, {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
    notation: opts.compact && amount >= 100000 ? 'compact' : 'standard',
  }).format(amount);

  // Symbol before for USD/EUR, after for MAD/XAF — matches local convention.
  return currency === 'USD' || currency === 'EUR'
    ? `${meta.symbol}${value}`
    : `${value} ${meta.symbol}`;
}
