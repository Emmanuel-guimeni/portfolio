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
import { COST_TYPES, REDUNDANCY, TOOLS, type PricingModel } from '@/config/tools';
import { track } from '@/lib/tracking';
import { IconArrowRight, IconCheck } from './Icons';
import { SectionHead } from './Sections';

type Billing = 'monthly' | 'annual';

const MODEL_LABEL: Record<PricingModel, { text: string; cls: string }> = {
  free: { text: 'Free', cls: 'pill--free' },
  flat: { text: 'Flat', cls: 'pill--flat' },
  'per-user': { text: 'Per user', cls: 'pill--seat' },
  usage: { text: 'Usage-based', cls: 'pill--usage' },
  'contact-sales': { text: 'Contact sales', cls: 'pill--sales' },
  'media-spend': { text: 'Media spend', cls: 'pill--media' },
};

export default function Pricing() {
  const [currency, setCurrency] = useState<Currency>('EUR');
  const [billing, setBilling] = useState<Billing>('monthly');
  const [fx, setFx] = useState<Record<Currency, number>>({ ...FX_DEFAULT });
  const [fxOpen, setFxOpen] = useState(false);

  /** Extra TCO lines the visitor controls — all in the DISPLAY currency. */
  const [apiBudget, setApiBudget] = useState(30);
  const [mediaBudget, setMediaBudget] = useState(500);
  const [implementation, setImplementation] = useState(0);
  const [maintenance, setMaintenance] = useState(0);
  const [tcoStack, setTcoStack] = useState('professional');

  /** Convert a price expressed in `from` into the selected display currency. */
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
          eyebrow="Pricing &amp; real cost"
          title="How much does an AI-powered marketing system actually cost?"
          intro="Real, sourced, official prices — converted live into USD, EUR, MAD and XAF. Change the currency, change the billing cycle, or override the exchange rates yourself."
          center
        />

        {/* ── Toolbar: currency + billing ───────────────────────────────── */}
        <div className="pricing-toolbar">
          <div className="seg" role="group" aria-label="Display currency">
            {CURRENCIES.map((code) => (
              <button
                key={code}
                type="button"
                aria-pressed={currency === code}
                onClick={() => {
                  setCurrency(code);
                  track('pricing_currency_change', { currency: code });
                }}
                title={CURRENCY_META[code].name}
              >
                {code}
              </button>
            ))}
          </div>

          <div className="seg" role="group" aria-label="Billing cycle">
            <button
              type="button"
              aria-pressed={billing === 'monthly'}
              onClick={() => setBilling('monthly')}
            >
              Monthly
            </button>
            <button
              type="button"
              aria-pressed={billing === 'annual'}
              onClick={() => setBilling('annual')}
            >
              Annual
            </button>
          </div>
        </div>

        {/* ── FX panel ──────────────────────────────────────────────────── */}
        <div className="fx-panel">
          <button
            type="button"
            className="fx-panel__head"
            aria-expanded={fxOpen}
            onClick={() => setFxOpen((v) => !v)}
          >
            <span>
              <b>Exchange rates</b>
              <small>
                Base USD · updated {FX_META.date} · {FX_META.source} · {FX_META.pegNote}
              </small>
            </span>
            <span className="tag">{fxOpen ? 'Hide rates' : 'Edit rates'}</span>
          </button>

          {fxOpen && (
            <div className="fx-panel__body">
              {CURRENCIES.map((code) => (
                <div className="fx-field" key={code}>
                  <label htmlFor={`fx-${code}`}>
                    1 USD = {code}
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
                Every figure on this page is computed from these rates — nothing is
                hard-coded. XAF is the Central African CFA franc (CEMAC zone), pegged at
                1&nbsp;EUR&nbsp;=&nbsp;{EUR_XAF_PEG}&nbsp;XAF; it is a different currency
                from XOF (West Africa). Source:{' '}
                <a href={FX_META.sourceUrl} target="_blank" rel="noopener noreferrer">
                  live mid-market rates
                </a>
                . Re-check before quoting a client.
              </p>
            </div>
          )}
        </div>

        {/* ── Three stacks ──────────────────────────────────────────────── */}
        <div className="grid grid--3" style={{ alignItems: 'stretch' }}>
          {STACKS.map((stack) => {
            const lines = stackLines(stack);
            const t = totals[stack.id];
            const perMonth = billing === 'monthly' ? t.monthly : t.annualMonthly;

            return (
              <article
                className={`tier${stack.featured ? ' tier--featured' : ''}`}
                key={stack.id}
              >
                {stack.featured && <span className="tier__flag">Most common</span>}

                <div>
                  <span className="tier__name">{stack.name}</span>
                  <p className="tier__for" style={{ marginTop: 6 }}>
                    {stack.tagline}
                  </p>
                </div>

                <div>
                  <div className="tier__price">
                    {formatMoney(perMonth, currency)}
                    <small>/ month</small>
                  </div>
                  <p className="muted" style={{ fontSize: 'var(--fs-xs)', marginTop: 6 }}>
                    {billing === 'annual'
                      ? `Billed annually — ${formatMoney(t.annualTotal, currency)}/year${
                          t.savings > 0.5
                            ? `, saving ${formatMoney(t.savings, currency)}`
                            : ' — no annual discount on these plans'
                        }`
                      : `${formatMoney(t.monthly * 12, currency)}/year at the monthly rate`}
                    {t.unpriced > 0
                      ? ` · +${t.unpriced} usage-based or media line${t.unpriced > 1 ? 's' : ''} on top`
                      : ''}
                  </p>
                </div>

                <div className="tier__alt">
                  {CURRENCIES.filter((c) => c !== currency).map((c) => (
                    <span key={c}>
                      {c} {formatMoney(convert(perMonth, currency, c, fx), c)} / month
                    </span>
                  ))}
                </div>

                <ul className="agent__caps">
                  {stack.audience.map((a) => (
                    <li key={a}>{a}</li>
                  ))}
                </ul>

                <div className="tier__tools">
                  {lines.map((line, i) => (
                    <div className="tier__tool" key={`${line.tool.id}-${i}`}>
                      <span>
                        {line.tool.name}
                        <br />
                        <em>{line.tool.plan}</em>
                      </span>
                      <b>
                        {line.monthly === null && line.annualMonthly === null
                          ? MODEL_LABEL[line.tool.model].text
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
                    <span>Monthly cost</span>
                    <b>{formatMoney(perMonth, currency)}</b>
                  </div>
                  <div>
                    <span>Annual cost</span>
                    <b>
                      {formatMoney(
                        billing === 'monthly' ? t.monthly * 12 : t.annualTotal,
                        currency,
                      )}
                    </b>
                  </div>
                </div>

                <p className="muted" style={{ fontSize: 'var(--fs-xs)' }}>
                  <strong style={{ color: 'var(--text-secondary)' }}>
                    Not included:
                  </strong>{' '}
                  {stack.implementationNote} {stack.mediaBudgetNote}
                </p>

                <a
                  className={`btn ${stack.featured ? 'btn--primary' : 'btn--ghost'} btn--block`}
                  href="#contact"
                  onClick={() =>
                    track('cta_click', { location: 'pricing', label: stack.name })
                  }
                >
                  Build this stack with me
                  <IconArrowRight size={16} />
                </a>
              </article>
            );
          })}
        </div>

        {/* ── Total Cost of Ownership simulator ─────────────────────────── */}
        <div style={{ marginTop: 'clamp(3rem, 6vw, 4.5rem)' }}>
          <h3 style={{ fontSize: 'var(--fs-xl)', marginBottom: '0.6rem' }}>
            Total Cost of Ownership
          </h3>
          <p className="lede" style={{ marginBottom: '1.75rem', maxWidth: '68ch' }}>
            A software line alone is not a budget. Eight cost types make up the real
            number — and the four most often forgotten are API usage, advertising media,
            implementation and maintenance. Adjust them below.
          </p>

          <div className="cost-types" style={{ marginBottom: '1.75rem' }}>
            {COST_TYPES.map((type) => (
              <div className="cost-type" key={type.id}>
                <b>{type.label}</b>
                <small>{type.description}</small>
              </div>
            ))}
          </div>

          <div className="split" style={{ alignItems: 'start', gap: '1.5rem' }}>
            <div className="fx-panel">
              <div className="fx-panel__body" style={{ borderTop: 'none', paddingTop: 18 }}>
                <div className="fx-field" style={{ gridColumn: '1 / -1' }}>
                  <label htmlFor="tco-stack">Reference stack</label>
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
                    {STACKS.map((s) => (
                      <option key={s.id} value={s.id}>
                        {s.name}
                      </option>
                    ))}
                  </select>
                </div>
                {[
                  { id: 'api', label: `API / usage (${currency}/mo)`, value: apiBudget, set: setApiBudget },
                  { id: 'media', label: `Advertising media (${currency}/mo)`, value: mediaBudget, set: setMediaBudget },
                  { id: 'impl', label: `Implementation (${currency}, one-off)`, value: implementation, set: setImplementation },
                  { id: 'maint', label: `Maintenance (${currency}/mo)`, value: maintenance, set: setMaintenance },
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
                <span>Software + AI subscriptions ({billing})</span>
                <b>{formatMoney(softwareMonthly, currency)}</b>
              </div>
              <div className="tco__row">
                <span>API / usage cost</span>
                <b>{formatMoney(apiBudget, currency)}</b>
              </div>
              <div className="tco__row">
                <span>Advertising media spend</span>
                <b>{formatMoney(mediaBudget, currency)}</b>
              </div>
              <div className="tco__row">
                <span>Implementation (spread over 12 months)</span>
                <b>{formatMoney(implementation / 12, currency)}</b>
              </div>
              <div className="tco__row">
                <span>Maintenance</span>
                <b>{formatMoney(maintenance, currency)}</b>
              </div>
              <div className="tco__row tco__row--total">
                <span>Total per month</span>
                <b>{formatMoney(tcoMonthly, currency)}</b>
              </div>
              <div className="tco__row tco__row--total">
                <span>Total year one</span>
                <b>{formatMoney(tcoMonthly * 12, currency)}</b>
              </div>
              <p className="muted" style={{ fontSize: 'var(--fs-xs)', marginTop: 6 }}>
                {CURRENCIES.filter((c) => c !== currency)
                  .map((c) => `${c} ${formatMoney(convert(tcoMonthly, currency, c, fx), c)}/mo`)
                  .join('  ·  ')}
              </p>
            </div>
          </div>
        </div>

        {/* ── Anti tool-bloat ───────────────────────────────────────────── */}
        <div style={{ marginTop: 'clamp(3rem, 6vw, 4.5rem)' }}>
          <div className="transition-bar" style={{ marginTop: 0, marginBottom: '1.75rem' }}>
            <b>You don&rsquo;t need every tool. You need the right system.</b>
          </div>
          <p className="lede" style={{ marginBottom: '1.75rem', maxWidth: '68ch' }}>
            Minimum necessary stack → maximum operational efficiency. Below is the
            redundancy score: how much each pair of tools overlaps, and what can safely be
            collapsed. Every removed tool is one less subscription, one less integration
            and one less thing that breaks at 2am.
          </p>

          <div className="redundancy">
            {REDUNDANCY.map((r) => (
              <div className="redundancy__row" key={r.group}>
                <div>
                  <b>{r.group}</b>
                  <p>{r.overlap}</p>
                </div>
                <div>
                  <div
                    className={`meter ${r.score >= 75 ? 'meter--high' : r.score >= 55 ? 'meter--mid' : 'meter--low'}`}
                  >
                    <i style={{ width: `${r.score}%` }} />
                  </div>
                  <p style={{ marginTop: 7 }}>{r.verdict}</p>
                </div>
                <span className="num" style={{ fontWeight: 700 }}>
                  {r.score}% overlap
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* ── Full tool pricing table ───────────────────────────────────── */}
        <div style={{ marginTop: 'clamp(3rem, 6vw, 4.5rem)' }}>
          <h3 style={{ fontSize: 'var(--fs-xl)', marginBottom: '0.6rem' }}>
            Every tool, every plan, four currencies
          </h3>
          <p className="lede" style={{ marginBottom: '1.5rem', maxWidth: '68ch' }}>
            Prices are the vendor&rsquo;s official published rates in their own billing
            currency; the other three columns are converted with the rates above. Where a
            price is not published, the row says so rather than guessing.
          </p>

          <div className="table-wrap">
            <table className="price-table">
              <caption className="sr-only">
                Official pricing for every tool in the stack, with monthly and annual
                billing in USD, EUR, MAD and XAF.
              </caption>
              <thead>
                <tr>
                  <th scope="col">Tool</th>
                  <th scope="col">Category</th>
                  <th scope="col">Plan</th>
                  <th scope="col">Model</th>
                  <th scope="col" className="num">Monthly</th>
                  <th scope="col" className="num">Annual / mo</th>
                  <th scope="col" className="num">Annual total</th>
                  <th scope="col" className="num">Saving / yr</th>
                  <th scope="col">Users</th>
                  <th scope="col">Limits &amp; variable cost</th>
                  <th scope="col">Verified</th>
                </tr>
              </thead>
              <tbody>
                {TOOLS.map((tool) => {
                  const label = MODEL_LABEL[tool.model];
                  const annualTotal =
                    tool.annualMonthly !== null ? tool.annualMonthly * 12 : null;
                  const saving =
                    tool.monthly !== null && tool.annualMonthly !== null
                      ? tool.monthly * 12 - tool.annualMonthly * 12
                      : null;

                  return (
                    <tr key={tool.id + tool.plan}>
                      <th scope="row" className="tool-name">
                        {tool.name}
                        <small>{tool.functionality}</small>
                        <a href={tool.source} target="_blank" rel="noopener noreferrer">
                          Official pricing ↗
                        </a>
                      </th>
                      <td>{tool.category}</td>
                      <td>{tool.plan}</td>
                      <td>
                        <span className={`pill ${label.cls}`}>{label.text}</span>
                        {tool.confidence === 'indicative' && (
                          <>
                            <br />
                            <span className="pill pill--sales" style={{ marginTop: 5 }}>
                              Verify
                            </span>
                          </>
                        )}
                      </td>
                      <td className="num">
                        {tool.monthly === null ? (
                          <span className="muted">Not published</span>
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
                      <td style={{ minWidth: 130 }}>{tool.users}</td>
                      <td style={{ minWidth: 260, color: 'var(--text-muted)' }}>
                        {tool.limits}
                        {tool.variableCost ? ` · ${tool.variableCost}` : ''}
                        {tool.apiCost ? ` · API: ${tool.apiCost}` : ''}
                        {tool.extraCost ? ` · ${tool.extraCost}` : ''}
                        {tool.note ? ` · ${tool.note}` : ''}
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
            Original billing currency is USD for every row above; MAD, EUR and XAF are
            conversions. Rows tagged <em>Verify</em> vary by region, contact volume or
            negotiation — always confirm on the vendor&rsquo;s own pricing page before
            quoting. Vendors change prices without notice.
          </p>
        </div>
      </div>
    </section>
  );
}
