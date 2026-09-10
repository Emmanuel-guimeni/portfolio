'use client';

import { useMemo, useState } from 'react';
import {
  CURRENCIES,
  CURRENCY_META,
  EUR_XAF_PEG,
  FX_DEFAULT,
  FX_META,
  convert,
  formatMoney,
  type Currency,
} from '@/config/currency';
import { STACKS, stackLines } from '@/config/stacks';
import { COST_TYPE_ORDER, REDUNDANCY, TOOLS, type PricingModel } from '@/config/tools';
import type { Dictionary } from '@/i18n/types';
import { track } from '@/lib/tracking';
import { IconArrowRight, IconCheck } from './Icons';
import { SectionHead } from './Primitives';

type Billing = 'monthly' | 'annual';

const MODEL_CLASS: Record<PricingModel, string> = {
  free: 'pill--free',
  flat: 'pill--flat',
  'per-user': 'pill--seat',
  usage: 'pill--usage',
  'contact-sales': 'pill--sales',
  'media-spend': 'pill--media',
};

export default function Pricing({ d }: { d: Dictionary }) {
  const t = d.pricing;
  const [currency, setCurrency] = useState<Currency>('EUR');
  const [billing, setBilling] = useState<Billing>('monthly');
  const [fx, setFx] = useState<Record<Currency, number>>({ ...FX_DEFAULT });
  const [fxOpen, setFxOpen] = useState(false);

  /** Lignes de TCO pilotées par le visiteur — toutes dans la devise AFFICHÉE. */
  const [apiBudget, setApiBudget] = useState(30);
  const [mediaBudget, setMediaBudget] = useState(500);
  const [implementation, setImplementation] = useState(0);
  const [maintenance, setMaintenance] = useState(0);
  const [tcoStack, setTcoStack] = useState('professional');

  /** Convertit un prix exprimé en `from` vers la devise d'affichage choisie. */
  const show = useMemo(
    () =>
      (amount: number | null, from: Currency = 'USD'): string =>
        amount === null ? '—' : formatMoney(convert(amount, from, currency, fx), currency),
    [currency, fx],
  );

  const totals = useMemo(
    () =>
      Object.fromEntries(
        STACKS.map((stack) => {
          const lines = stackLines(stack);
          let monthly = 0;
          let annualMonthly = 0;
          let unpriced = 0;

          for (const line of lines) {
            if (line.monthly === null && line.annualMonthly === null) {
              unpriced += 1;
              continue;
            }
            monthly += convert(line.monthly ?? line.annualMonthly ?? 0, line.tool.currency, currency, fx);
            annualMonthly += convert(
              line.annualMonthly ?? line.monthly ?? 0,
              line.tool.currency,
              currency,
              fx,
            );
          }

          return [
            stack.id,
            {
              monthly,
              annualMonthly,
              annualTotal: annualMonthly * 12,
              savings: monthly * 12 - annualMonthly * 12,
              unpriced,
            },
          ];
        }),
      ),
    [currency, fx],
  );

  const active = totals[tcoStack] ?? totals.professional;
  const softwareMonthly = billing === 'monthly' ? active.monthly : active.annualMonthly;
  const tcoMonthly =
    softwareMonthly + apiBudget + mediaBudget + implementation / 12 + maintenance;

  return (
    <section className="section section--panel" id="pricing">
      <div className="container container--wide">
        <SectionHead
          eyebrow={t.eyebrow}
          title={t.title}
          intro={t.intro}
          center
        />

        {/* ── Barre d'outils : devise + facturation ─────────────────────── */}
        <div className="pricing-toolbar">
          <div className="seg" role="group" aria-label={t.currencyGroup}>
            {CURRENCIES.map((code) => (
              <button
                key={code}
                type="button"
                aria-pressed={currency === code}
                onClick={() => {
                  setCurrency(code);
                  track('pricing_currency_change', { currency: code });
                }}
                title={t.currencyNames[code]}
              >
                {code}
              </button>
            ))}
          </div>

          <div className="seg" role="group" aria-label={t.billingGroup}>
            <button
              type="button"
              aria-pressed={billing === 'monthly'}
              onClick={() => setBilling('monthly')}
            >
              {t.monthly}
            </button>
            <button
              type="button"
              aria-pressed={billing === 'annual'}
              onClick={() => setBilling('annual')}
            >
              {t.annual}
            </button>
          </div>
        </div>

        {/* ── Panneau des taux de change ────────────────────────────────── */}
        <div className="fx-panel">
          <button
            type="button"
            className="fx-panel__head"
            aria-expanded={fxOpen}
            onClick={() => setFxOpen((v) => !v)}
          >
            <span>
              <b>{t.fxTitle}</b>
              <small>
                {t.fxBase} · {t.fxUpdated} {FX_META.date} · {t.fxSource} · {t.fxPegNote}
              </small>
            </span>
            <span className="tag">{fxOpen ? t.fxHide : t.fxEdit}</span>
          </button>

          {fxOpen && (
            <div className="fx-panel__body">
              {CURRENCIES.map((code) => (
                <div className="fx-field" key={code}>
                  <label htmlFor={`fx-${code}`}>
                    {t.fxRateLabel} {code}
                  </label>
                  <input
                    id={`fx-${code}`}
                    type="number"
                    min={0}
                    step="0.0001"
                    value={fx[code]}
                    disabled={code === 'USD'}
                    onChange={(e) =>
                      setFx((prev) => ({
                        ...prev,
                        [code]: Number(e.target.value) || prev[code],
                      }))
                    }
                  />
                </div>
              ))}
              <p className="fx-note">
                {t.fxNote[0]}{' '}
                <a href={FX_META.sourceUrl} target="_blank" rel="noopener noreferrer">
                  {t.fxSourceLink}
                </a>
                {t.fxNote[1]}
              </p>
            </div>
          )}
        </div>

        {/* ── Les trois stacks ──────────────────────────────────────────── */}
        <div className="grid grid--3" style={{ alignItems: 'stretch' }}>
          {STACKS.map((stack) => {
            const lines = stackLines(stack);
            const perMonth =
              billing === 'monthly'
                ? totals[stack.id].monthly
                : totals[stack.id].annualMonthly;

            return (
              <article
                className={`tier${stack.featured ? ' tier--featured' : ''}`}
                key={stack.id}
              >
                {stack.featured && <span className="tier__flag">{t.mostCommon}</span>}

                <div>
                  <span className="tier__name">{t.stacks[stack.id].name}</span>
                  <p className="tier__for" style={{ marginTop: 6 }}>
                    {t.stacks[stack.id].tagline}
                  </p>
                </div>

                <div>
                  <div className="tier__price">
                    {formatMoney(perMonth, currency)}
                    <small>{t.perMonth}</small>
                  </div>
                  <p className="muted" style={{ fontSize: 'var(--fs-xs)', marginTop: 6 }}>
                    {billing === 'annual'
                      ? `${t.billedAnnually} ${formatMoney(totals[stack.id].annualTotal, currency)}${
                          totals[stack.id].savings > 0.5
                            ? ` — ${formatMoney(totals[stack.id].savings, currency)} ${t.saving}`
                            : ` — ${t.noAnnualDiscount}`
                        }`
                      : `${formatMoney(totals[stack.id].monthly * 12, currency)} — ${t.atMonthlyRate}`}
                    {totals[stack.id].unpriced > 0
                      ? ` · +${totals[stack.id].unpriced} ${t.extraUsageLines}`
                      : ''}
                  </p>
                </div>

                <div className="tier__alt">
                  {CURRENCIES.filter((c) => c !== currency).map((c) => (
                    <span key={c}>
                      {c} {formatMoney(convert(perMonth, currency, c, fx), c)} {t.perMonth}
                    </span>
                  ))}
                </div>

                <ul className="agent__caps">
                  {t.stacks[stack.id].audience.map((a) => (
                    <li key={a}>{a}</li>
                  ))}
                </ul>

                <div className="tier__tools">
                  {lines.map((line, i) => (
                    <div className="tier__tool" key={`${line.tool.id}-${i}`}>
                      <span>
                        {line.tool.name}
                        <br />
                        <em>{d.tools[line.tool.id].plan}</em>
                      </span>
                      <b>
                        {line.monthly === null && line.annualMonthly === null
                          ? t.models[line.tool.model]
                          : show(
                              billing === 'monthly'
                                ? (line.monthly ?? line.annualMonthly)
                                : (line.annualMonthly ?? line.monthly),
                              line.tool.currency,
                            )}
                      </b>
                    </div>
                  ))}
                </div>

                <div className="tier__totals">
                  <div>
                    <span>{t.monthlyCost}</span>
                    <b>{formatMoney(perMonth, currency)}</b>
                  </div>
                  <div>
                    <span>{t.annualCost}</span>
                    <b>
                      {formatMoney(
                        billing === 'monthly'
                          ? totals[stack.id].monthly * 12
                          : totals[stack.id].annualTotal,
                        currency,
                      )}
                    </b>
                  </div>
                </div>

                <p className="muted" style={{ fontSize: 'var(--fs-xs)' }}>
                  <strong style={{ color: 'var(--text-secondary)' }}>
{t.notIncluded}
                  </strong>{' '}
                  {t.stacks[stack.id].implementationNote}{' '}
                  {t.stacks[stack.id].mediaBudgetNote}
                </p>

                <a
                  className={`btn ${stack.featured ? 'btn--primary' : 'btn--ghost'} btn--block`}
                  href="#contact"
                  onClick={() =>
                    track('cta_click', { location: 'pricing', label: stack.id })
                  }
                >
                  {t.buildThisStack}
                  <IconArrowRight size={16} />
                </a>
              </article>
            );
          })}
        </div>

        {/* ── Simulateur de coût total de possession ────────────────────── */}
        <div style={{ marginTop: 'clamp(3rem, 6vw, 4.5rem)' }}>
          <h3 style={{ fontSize: 'var(--fs-xl)', marginBottom: '0.6rem' }}>
            {t.tcoTitle}
          </h3>
          <p className="lede" style={{ marginBottom: '1.75rem', maxWidth: '68ch' }}>
            {t.tcoIntro}
          </p>

          <div className="cost-types" style={{ marginBottom: '1.75rem' }}>
            {COST_TYPE_ORDER.map((id) => (
              <div className="cost-type" key={id}>
                <b>{t.costTypes[id].label}</b>
                <small>{t.costTypes[id].description}</small>
              </div>
            ))}
          </div>

          <div className="split" style={{ alignItems: 'start', gap: '1.5rem' }}>
            <div className="fx-panel">
              <div className="fx-panel__body" style={{ borderTop: 'none', paddingTop: 18 }}>
                <div className="fx-field" style={{ gridColumn: '1 / -1' }}>
                  <label htmlFor="tco-stack">{t.referenceStack}</label>
                  <select
                    id="tco-stack"
                    value={tcoStack}
                    onChange={(e) => setTcoStack(e.target.value)}
                    style={{
                      padding: '10px 12px',
                      borderRadius: 'var(--r-sm)',
                      border: '1px solid var(--line-strong)',
                      background: 'var(--bg-elevated)',
                      color: 'var(--text)',
                    }}
                  >
                    {STACKS.map((stack) => (
                      <option key={stack.id} value={stack.id}>
                        {t.stacks[stack.id].name}
                      </option>
                    ))}
                  </select>
                </div>
                {[
                  { id: 'api', label: `${t.tcoApi} (${currency}/${t.monthly.toLowerCase()})`, value: apiBudget, set: setApiBudget },
                  { id: 'media', label: `${t.tcoMedia} (${currency})`, value: mediaBudget, set: setMediaBudget },
                  { id: 'impl', label: `${t.tcoImplementation} (${currency})`, value: implementation, set: setImplementation },
                  { id: 'maint', label: `${t.tcoMaintenance} (${currency})`, value: maintenance, set: setMaintenance },
                ].map((f) => (
                  <div className="fx-field" key={f.id}>
                    <label htmlFor={`tco-${f.id}`}>{f.label}</label>
                    <input
                      id={`tco-${f.id}`}
                      type="number"
                      min={0}
                      step="10"
                      value={f.value}
                      onChange={(e) => f.set(Math.max(0, Number(e.target.value) || 0))}
                    />
                  </div>
                ))}
              </div>
            </div>

            <div className="tco">
              <div className="tco__row">
                <span>{t.tcoSoftware} ({billing === 'monthly' ? t.monthly : t.annual})</span>
                <b>{formatMoney(softwareMonthly, currency)}</b>
              </div>
              <div className="tco__row">
                <span>{t.tcoApiRow}</span>
                <b>{formatMoney(apiBudget, currency)}</b>
              </div>
              <div className="tco__row">
                <span>{t.tcoMediaRow}</span>
                <b>{formatMoney(mediaBudget, currency)}</b>
              </div>
              <div className="tco__row">
                <span>{t.tcoImplementationRow}</span>
                <b>{formatMoney(implementation / 12, currency)}</b>
              </div>
              <div className="tco__row">
                <span>{t.tcoMaintenanceRow}</span>
                <b>{formatMoney(maintenance, currency)}</b>
              </div>
              <div className="tco__row tco__row--total">
                <span>{t.tcoTotalMonthly}</span>
                <b>{formatMoney(tcoMonthly, currency)}</b>
              </div>
              <div className="tco__row tco__row--total">
                <span>{t.tcoTotalYearOne}</span>
                <b>{formatMoney(tcoMonthly * 12, currency)}</b>
              </div>
              <p className="muted" style={{ fontSize: 'var(--fs-xs)', marginTop: 6 }}>
                {CURRENCIES.filter((c) => c !== currency)
                  .map((c) => `${c} ${formatMoney(convert(tcoMonthly, currency, c, fx), c)}`)
                  .join('  ·  ')}
              </p>
            </div>
          </div>
        </div>

        {/* ── Contre l'accumulation d'outils ───────────────────────────── */}
        <div style={{ marginTop: 'clamp(3rem, 6vw, 4.5rem)' }}>
          <div className="transition-bar" style={{ marginTop: 0, marginBottom: '1.75rem' }}>
            <b>{t.bloatBanner}</b>
          </div>
          <p className="lede" style={{ marginBottom: '1.75rem', maxWidth: '68ch' }}>
            {t.bloatIntro}
          </p>

          <div className="redundancy">
            {REDUNDANCY.map((r) => (
              <div className="redundancy__row" key={r.id}>
                <div>
                  <b>{t.redundancy[r.id].group}</b>
                  <p>{t.redundancy[r.id].overlap}</p>
                </div>
                <div>
                  <div
                    className={`meter ${r.score >= 75 ? 'meter--high' : r.score >= 55 ? 'meter--mid' : 'meter--low'}`}
                  >
                    <i style={{ width: `${r.score}%` }} />
                  </div>
                  <p style={{ marginTop: 7 }}>{t.redundancy[r.id].verdict}</p>
                </div>
                <span className="num" style={{ fontWeight: 700 }}>
                  {r.score}% {t.overlap}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* ── Tableau tarifaire complet ─────────────────────────────────── */}
        <div style={{ marginTop: 'clamp(3rem, 6vw, 4.5rem)' }}>
          <h3 style={{ fontSize: 'var(--fs-xl)', marginBottom: '0.6rem' }}>
            {t.tableTitle}
          </h3>
          <p className="lede" style={{ marginBottom: '1.5rem', maxWidth: '68ch' }}>
            {t.tableIntro}
          </p>

          <div className="table-wrap">
            <table className="price-table">
              <caption className="sr-only">
                {t.tableCaption}
              </caption>
              <thead>
                <tr>
                  <th scope="col">{t.columns.tool}</th>
                  <th scope="col">{t.columns.category}</th>
                  <th scope="col">{t.columns.plan}</th>
                  <th scope="col">{t.columns.model}</th>
                  <th scope="col" className="num">{t.columns.monthly}</th>
                  <th scope="col" className="num">{t.columns.annualPerMonth}</th>
                  <th scope="col" className="num">{t.columns.annualTotal}</th>
                  <th scope="col" className="num">{t.columns.savingPerYear}</th>
                  <th scope="col">{t.columns.users}</th>
                  <th scope="col">{t.columns.limits}</th>
                  <th scope="col">{t.columns.verified}</th>
                </tr>
              </thead>
              <tbody>
                {TOOLS.map((tool) => {
                  const copy = d.tools[tool.id];
                  const modelLabel = t.models[tool.model];
                  const annualTotal =
                    tool.annualMonthly !== null ? tool.annualMonthly * 12 : null;
                  const saving =
                    tool.monthly !== null && tool.annualMonthly !== null
                      ? tool.monthly * 12 - tool.annualMonthly * 12
                      : null;

                  return (
                    <tr key={tool.id}>
                      <th scope="row" className="tool-name">
                        {tool.name}
                        <small>{copy.functionality}</small>
                        <a href={tool.source} target="_blank" rel="noopener noreferrer">
                          {t.officialPricing}
                        </a>
                      </th>
                      <td>{d.stack.categories[tool.category]}</td>
                      <td>{copy.plan}</td>
                      <td>
                        <span className={`pill ${MODEL_CLASS[tool.model]}`}>{modelLabel}</span>
                        {tool.confidence === 'indicative' && (
                          <>
                            <br />
                            <span className="pill pill--sales" style={{ marginTop: 5 }}>
                              {t.verifyBadge}
                            </span>
                          </>
                        )}
                      </td>
                      <td className="num">
                        {tool.monthly === null ? (
                          <span className="muted">{t.notPublished}</span>
                        ) : (
                          show(tool.monthly, tool.currency)
                        )}
                      </td>
                      <td className="num">
                        {tool.annualMonthly === null ? (
                          <span className="muted">—</span>
                        ) : (
                          show(tool.annualMonthly, tool.currency)
                        )}
                      </td>
                      <td className="num">{show(annualTotal, tool.currency)}</td>
                      <td className="num">
                        {saving && saving > 0 ? (
                          <span style={{ color: '#6ee7b7' }}>
                            {show(saving, tool.currency)}
                          </span>
                        ) : (
                          <span className="muted">—</span>
                        )}
                      </td>
                      <td style={{ minWidth: 130 }}>{copy.users}</td>
                      <td style={{ minWidth: 260, color: 'var(--text-muted)' }}>
                        {copy.limits}
                        {copy.variableCost ? ` · ${copy.variableCost}` : ''}
                        {copy.apiCost ? ` · API : ${copy.apiCost}` : ''}
                        {copy.extraCost ? ` · ${copy.extraCost}` : ''}
                        {copy.note ? ` · ${copy.note}` : ''}
                      </td>
                      <td className="num muted">{tool.verifiedOn}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          <p className="muted" style={{ fontSize: 'var(--fs-xs)', marginTop: 14 }}>
            <IconCheck size={13} style={{ display: 'inline', verticalAlign: '-2px' }} />{' '}
            {t.tableFootnote}
          </p>
        </div>
      </div>
    </section>
  );
}
