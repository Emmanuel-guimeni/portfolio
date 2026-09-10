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
  free: { text: 'Gratuit', cls: 'pill--free' },
  flat: { text: 'Forfait', cls: 'pill--flat' },
  'per-user': { text: 'Par utilisateur', cls: 'pill--seat' },
  usage: { text: 'À la consommation', cls: 'pill--usage' },
  'contact-sales': { text: 'Sur devis', cls: 'pill--sales' },
  'media-spend': { text: 'Budget média', cls: 'pill--media' },
};

export default function Pricing() {
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
          eyebrow="Tarifs &amp; coût réel"
          title="Combien coûte réellement un système marketing piloté par l’IA ?"
          intro="Des prix officiels, réels et sourcés — convertis en direct en USD, EUR, MAD et XAF. Changez de devise, de cycle de facturation, ou modifiez vous-même les taux de change."
          center
        />

        {/* ── Barre d'outils : devise + facturation ─────────────────────── */}
        <div className="pricing-toolbar">
          <div className="seg" role="group" aria-label="Devise d’affichage">
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

          <div className="seg" role="group" aria-label="Cycle de facturation">
            <button
              type="button"
              aria-pressed={billing === 'monthly'}
              onClick={() => setBilling('monthly')}
            >
              Mensuel
            </button>
            <button
              type="button"
              aria-pressed={billing === 'annual'}
              onClick={() => setBilling('annual')}
            >
              Annuel
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
              <b>Taux de change</b>
              <small>
                Base USD · mis à jour le {FX_META.date} · {FX_META.source} · {FX_META.pegNote}
              </small>
            </span>
            <span className="tag">{fxOpen ? 'Masquer les taux' : 'Modifier les taux'}</span>
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
                Tous les montants de cette page sont calculés à partir de ces taux — rien
                n’est codé en dur. Le XAF est le franc CFA d’Afrique centrale (zone CEMAC),
                arrimé à 1&nbsp;EUR&nbsp;=&nbsp;{EUR_XAF_PEG}&nbsp;XAF ; c’est une devise
                différente du XOF (Afrique de l’Ouest). Source&nbsp;:{' '}
                <a href={FX_META.sourceUrl} target="_blank" rel="noopener noreferrer">
                  taux interbancaires en direct
                </a>
                . À revérifier avant tout chiffrage client.
              </p>
            </div>
          )}
        </div>

        {/* ── Les trois stacks ──────────────────────────────────────────── */}
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
                {stack.featured && <span className="tier__flag">Le plus courant</span>}

                <div>
                  <span className="tier__name">{stack.name}</span>
                  <p className="tier__for" style={{ marginTop: 6 }}>
                    {stack.tagline}
                  </p>
                </div>

                <div>
                  <div className="tier__price">
                    {formatMoney(perMonth, currency)}
                    <small>/ mois</small>
                  </div>
                  <p className="muted" style={{ fontSize: 'var(--fs-xs)', marginTop: 6 }}>
                    {billing === 'annual'
                      ? `Facturé annuellement — ${formatMoney(t.annualTotal, currency)}/an${
                          t.savings > 0.5
                            ? `, soit ${formatMoney(t.savings, currency)} d’économie`
                            : ' — pas de remise annuelle sur ces offres'
                        }`
                      : `${formatMoney(t.monthly * 12, currency)}/an au tarif mensuel`}
                    {t.unpriced > 0
                      ? ` · +${t.unpriced} ligne${t.unpriced > 1 ? 's' : ''} à la consommation ou média en sus`
                      : ''}
                  </p>
                </div>

                <div className="tier__alt">
                  {CURRENCIES.filter((c) => c !== currency).map((c) => (
                    <span key={c}>
                      {c} {formatMoney(convert(perMonth, currency, c, fx), c)} / mois
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
                    <span>Coût mensuel</span>
                    <b>{formatMoney(perMonth, currency)}</b>
                  </div>
                  <div>
                    <span>Coût annuel</span>
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
                    Non inclus :
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
                  Construire cette stack avec moi
                  <IconArrowRight size={16} />
                </a>
              </article>
            );
          })}
        </div>

        {/* ── Simulateur de coût total de possession ────────────────────── */}
        <div style={{ marginTop: 'clamp(3rem, 6vw, 4.5rem)' }}>
          <h3 style={{ fontSize: 'var(--fs-xl)', marginBottom: '0.6rem' }}>
            Coût total de possession (TCO)
          </h3>
          <p className="lede" style={{ marginBottom: '1.75rem', maxWidth: '68ch' }}>
            Une ligne logiciel ne fait pas un budget. Huit postes de coût composent le
            chiffre réel — et les quatre les plus souvent oubliés sont la consommation API,
            le budget publicitaire, la mise en place et la maintenance. Ajustez-les
            ci-dessous.
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
                  <label htmlFor="tco-stack">Stack de référence</label>
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
                  { id: 'api', label: `API / consommation (${currency}/mois)`, value: apiBudget, set: setApiBudget },
                  { id: 'media', label: `Budget média (${currency}/mois)`, value: mediaBudget, set: setMediaBudget },
                  { id: 'impl', label: `Mise en place (${currency}, ponctuel)`, value: implementation, set: setImplementation },
                  { id: 'maint', label: `Maintenance (${currency}/mois)`, value: maintenance, set: setMaintenance },
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
                <span>Logiciels + abonnements IA ({billing === 'monthly' ? 'mensuel' : 'annuel'})</span>
                <b>{formatMoney(softwareMonthly, currency)}</b>
              </div>
              <div className="tco__row">
                <span>Coût API / consommation</span>
                <b>{formatMoney(apiBudget, currency)}</b>
              </div>
              <div className="tco__row">
                <span>Budget média publicitaire</span>
                <b>{formatMoney(mediaBudget, currency)}</b>
              </div>
              <div className="tco__row">
                <span>Mise en place (lissée sur 12 mois)</span>
                <b>{formatMoney(implementation / 12, currency)}</b>
              </div>
              <div className="tco__row">
                <span>Maintenance</span>
                <b>{formatMoney(maintenance, currency)}</b>
              </div>
              <div className="tco__row tco__row--total">
                <span>Total par mois</span>
                <b>{formatMoney(tcoMonthly, currency)}</b>
              </div>
              <div className="tco__row tco__row--total">
                <span>Total première année</span>
                <b>{formatMoney(tcoMonthly * 12, currency)}</b>
              </div>
              <p className="muted" style={{ fontSize: 'var(--fs-xs)', marginTop: 6 }}>
                {CURRENCIES.filter((c) => c !== currency)
                  .map((c) => `${c} ${formatMoney(convert(tcoMonthly, currency, c, fx), c)}/mois`)
                  .join('  ·  ')}
              </p>
            </div>
          </div>
        </div>

        {/* ── Contre l'accumulation d'outils ───────────────────────────── */}
        <div style={{ marginTop: 'clamp(3rem, 6vw, 4.5rem)' }}>
          <div className="transition-bar" style={{ marginTop: 0, marginBottom: '1.75rem' }}>
            <b>Vous n’avez pas besoin de tous les outils. Vous avez besoin du bon système.</b>
          </div>
          <p className="lede" style={{ marginBottom: '1.75rem', maxWidth: '68ch' }}>
            Stack minimale nécessaire → efficacité opérationnelle maximale. Ci-dessous, le
            score de redondance : à quel point chaque paire d’outils se recouvre, et ce qui
            peut être fusionné sans risque. Chaque outil supprimé, c’est un abonnement en
            moins, une intégration en moins, et une chose de moins qui casse à 2h du matin.
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
                  {r.score}% de recouvrement
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* ── Tableau tarifaire complet ─────────────────────────────────── */}
        <div style={{ marginTop: 'clamp(3rem, 6vw, 4.5rem)' }}>
          <h3 style={{ fontSize: 'var(--fs-xl)', marginBottom: '0.6rem' }}>
            Chaque outil, chaque offre, quatre devises
          </h3>
          <p className="lede" style={{ marginBottom: '1.5rem', maxWidth: '68ch' }}>
            Les prix sont les tarifs officiels publiés par l’éditeur, dans sa propre devise
            de facturation ; les trois autres colonnes sont converties avec les taux
            ci-dessus. Lorsqu’un prix n’est pas publié, la ligne le dit plutôt que de
            deviner.
          </p>

          <div className="table-wrap">
            <table className="price-table">
              <caption className="sr-only">
                Tarifs officiels de chaque outil de la stack, en facturation mensuelle et
                annuelle, en USD, EUR, MAD et XAF.
              </caption>
              <thead>
                <tr>
                  <th scope="col">Outil</th>
                  <th scope="col">Catégorie</th>
                  <th scope="col">Offre</th>
                  <th scope="col">Modèle</th>
                  <th scope="col" className="num">Mensuel</th>
                  <th scope="col" className="num">Annuel / mois</th>
                  <th scope="col" className="num">Total annuel</th>
                  <th scope="col" className="num">Économie / an</th>
                  <th scope="col">Utilisateurs</th>
                  <th scope="col">Limites &amp; coûts variables</th>
                  <th scope="col">Vérifié le</th>
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
                          Tarif officiel ↗
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
                              À vérifier
                            </span>
                          </>
                        )}
                      </td>
                      <td className="num">
                        {tool.monthly === null ? (
                          <span className="muted">Non publié</span>
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
                        {tool.apiCost ? ` · API : ${tool.apiCost}` : ''}
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
            La devise de facturation d’origine est le USD pour toutes les lignes ci-dessus ;
            MAD, EUR et XAF sont des conversions. Les lignes marquées <em>À vérifier</em>
            varient selon la région, le volume de contacts ou la négociation — confirmez
            toujours sur la page tarifaire de l’éditeur avant de chiffrer. Les éditeurs
            changent leurs prix sans préavis.
          </p>
        </div>
      </div>
    </section>
  );
}
