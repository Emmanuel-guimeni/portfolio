/**
 * Devises et taux de change.
 *
 * Chaque prix de `tools.ts` est stocké UNE SEULE FOIS, dans sa devise de
 * facturation officielle. Toutes les autres devises sont DÉRIVÉES des taux
 * ci-dessous, jamais codées en dur : mettre un taux à jour met à jour tous les
 * montants de la page d'un coup.
 *
 * XAF = franc CFA d'Afrique centrale (zone CEMAC). À ne pas confondre avec le
 * XOF (franc CFA d'Afrique de l'Ouest). Les deux sont arrimés à l'euro, mais ce
 * sont deux devises distinctes émises par des banques centrales différentes
 * (BEAC et BCEAO).
 */

export const CURRENCIES = ['USD', 'EUR', 'MAD', 'XAF'] as const;
export type Currency = (typeof CURRENCIES)[number];

export const CURRENCY_META: Record<
  Currency,
  { code: Currency; name: string; symbol: string; locale: string; decimals: number }
> = {
  USD: { code: 'USD', name: 'Dollar américain', symbol: '$', locale: 'en-US', decimals: 2 },
  EUR: { code: 'EUR', name: 'Euro', symbol: '€', locale: 'fr-FR', decimals: 2 },
  MAD: { code: 'MAD', name: 'Dirham marocain', symbol: 'DH', locale: 'fr-MA', decimals: 0 },
  XAF: {
    code: 'XAF',
    name: 'Franc CFA d’Afrique centrale (CEMAC)',
    symbol: 'FCFA',
    locale: 'fr-CM',
    decimals: 0,
  },
};

/**
 * Taux exprimés ainsi : 1 USD = N <devise>.
 * ⚠️ Ils sont INDICATIFS et doivent être rafraîchis. Le panneau de taux de la
 * section tarifs permet à n'importe quel visiteur de les modifier en direct.
 *
 * EUR→XAF est une parité fixe réglementaire : 1 EUR = 655,957 XAF. Le taux
 * USD→XAF par défaut en découle (0,86 × 655,957 ≈ 564,1).
 */
export const FX_DEFAULT: Record<Currency, number> = {
  USD: 1,
  EUR: 0.86,
  MAD: 9.15,
  XAF: 564.12,
};

export const FX_META = {
  /** Date de la dernière mise à jour des taux par défaut ci-dessus. */
  date: '2026-09-09',
  source: 'Taux interbancaires indicatifs — à rafraîchir avant tout chiffrage client',
  sourceUrl: 'https://www.xe.com/currencyconverter/',
  pegNote: '1 EUR = 655,957 XAF (parité fixe CEMAC)',
} as const;

/** Parité fixe réglementaire entre l'euro et le franc CFA d'Afrique centrale. */
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

  // Symbole avant pour USD/EUR, après pour MAD/XAF — convention locale.
  return currency === 'USD' || currency === 'EUR'
    ? `${meta.symbol}${value}`
    : `${value} ${meta.symbol}`;
}
