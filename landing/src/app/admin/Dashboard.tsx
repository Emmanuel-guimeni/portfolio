'use client';

import { useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  LEAD_STATUSES,
  SERVICE_OPTIONS,
  temperature,
  type Lead,
  type LeadStatus,
} from '@/lib/leads';

/**
 * Lead Management Dashboard.
 *
 * KPIs · filters (date, service, country, status, score, source) · inline status
 * editing · CSV export. Every mutation goes through the protected API routes,
 * never directly to the database from the browser.
 */

const EMPTY_FILTERS = {
  from: '',
  to: '',
  service: '',
  country: '',
  status: '',
  minScore: '',
  source: '',
  search: '',
};

export default function Dashboard({
  leads: initial,
  storage,
}: {
  leads: Lead[];
  storage: 'supabase' | 'file';
}) {
  const router = useRouter();
  const [leads, setLeads] = useState(initial);
  const [filters, setFilters] = useState({ ...EMPTY_FILTERS });
  const [busyId, setBusyId] = useState<string | null>(null);

  const filtered = useMemo(() => {
    return leads.filter((lead) => {
      if (filters.from && lead.created_at < filters.from) return false;
      if (filters.to && lead.created_at > `${filters.to}T23:59:59.999Z`) return false;
      if (filters.service && lead.service_requested !== filters.service) return false;
      if (filters.status && lead.status !== filters.status) return false;
      if (filters.source && lead.source !== filters.source) return false;
      if (filters.minScore && lead.lead_score < Number(filters.minScore)) return false;
      if (
        filters.country &&
        !(lead.country ?? '').toLowerCase().includes(filters.country.toLowerCase())
      ) {
        return false;
      }
      if (filters.search) {
        const s = filters.search.toLowerCase();
        const haystack = [
          lead.first_name,
          lead.last_name,
          lead.email,
          lead.company,
          lead.message,
        ]
          .filter(Boolean)
          .join(' ')
          .toLowerCase();
        if (!haystack.includes(s)) return false;
      }
      return true;
    });
  }, [leads, filters]);

  const kpi = useMemo(() => {
    const t = (lead: Lead) => temperature(lead.lead_score);
    const won = filtered.filter((l) => l.status === 'Won').length;
    return {
      total: filtered.length,
      fresh: filtered.filter((l) => l.status === 'New').length,
      warm: filtered.filter((l) => t(l) === 'Warm').length,
      hot: filtered.filter((l) => t(l) === 'Hot').length,
      audits: filtered.filter((l) => l.service_requested.includes('Audit')).length,
      consulting: filtered.filter(
        (l) =>
          l.service_requested.includes('Consulting') ||
          l.service_requested.includes('Strategy') ||
          l.service_requested.includes('Analytics'),
      ).length,
      conversion: filtered.length ? Math.round((won / filtered.length) * 100) : 0,
    };
  }, [filtered]);

  const sources = useMemo(
    () =>
      Object.entries(
        filtered.reduce<Record<string, number>>((acc, lead) => {
          const key = lead.source || 'unknown';
          acc[key] = (acc[key] ?? 0) + 1;
          return acc;
        }, {}),
      ).sort((a, b) => b[1] - a[1]),
    [filtered],
  );

  async function changeStatus(id: string, status: LeadStatus) {
    setBusyId(id);
    try {
      const res = await fetch(`/api/leads/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status }),
      });
      const data = (await res.json()) as { ok: boolean; lead?: Lead };
      if (data.ok && data.lead) {
        setLeads((prev) => prev.map((l) => (l.id === id ? data.lead! : l)));
      }
    } finally {
      setBusyId(null);
    }
  }

  async function remove(id: string) {
    if (!window.confirm('Delete this lead permanently? This cannot be undone.')) return;
    setBusyId(id);
    try {
      const res = await fetch(`/api/leads/${id}`, { method: 'DELETE' });
      if (res.ok) setLeads((prev) => prev.filter((l) => l.id !== id));
    } finally {
      setBusyId(null);
    }
  }

  async function recalculate() {
    const res = await fetch('/api/score', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ recalculate: true }),
    });
    const data = (await res.json()) as { ok: boolean; updated?: number };
    if (data.ok) {
      window.alert(`${data.updated ?? 0} lead(s) re-scored.`);
      router.refresh();
    }
  }

  async function logout() {
    await fetch('/api/admin/logout', { method: 'POST' });
    router.refresh();
  }

  const exportUrl = `/api/leads/export?${new URLSearchParams(
    Object.entries(filters).filter(([, v]) => v) as [string, string][],
  ).toString()}`;

  return (
    <div className="container container--wide admin">
      <header className="admin__head">
        <div>
          <h1 style={{ fontSize: 'var(--fs-2xl)' }}>Lead Management Dashboard</h1>
          <p className="muted" style={{ fontSize: 'var(--fs-sm)' }}>
            Storage:{' '}
            <strong style={{ color: storage === 'supabase' ? '#6ee7b7' : '#fcd34d' }}>
              {storage === 'supabase' ? 'Supabase / PostgreSQL' : 'local JSONL file (dev only)'}
            </strong>{' '}
            · {leads.length} lead(s) loaded
          </p>
        </div>
        <div className="btn-row">
          <a className="btn btn--ghost btn--sm" href={exportUrl}>
            Export CSV
          </a>
          <button type="button" className="btn btn--ghost btn--sm" onClick={recalculate}>
            Re-score all
          </button>
          <button type="button" className="btn btn--ghost btn--sm" onClick={logout}>
            Sign out
          </button>
          <a className="btn btn--quiet btn--sm" href="/">
            View site
          </a>
        </div>
      </header>

      <div className="kpi-grid">
        {[
          { label: 'Total leads', value: kpi.total },
          { label: 'New', value: kpi.fresh },
          { label: 'Warm', value: kpi.warm },
          { label: 'Hot', value: kpi.hot },
          { label: 'Audit requests', value: kpi.audits },
          { label: 'Consulting requests', value: kpi.consulting },
          { label: 'Conversion rate', value: `${kpi.conversion}%` },
        ].map((item) => (
          <div className="kpi" key={item.label}>
            <b>{item.value}</b>
            <span>{item.label}</span>
          </div>
        ))}
      </div>

      <div className="filters">
        <Filter label="From" id="from">
          <input
            id="from"
            type="date"
            value={filters.from}
            onChange={(e) => setFilters((f) => ({ ...f, from: e.target.value }))}
          />
        </Filter>
        <Filter label="To" id="to">
          <input
            id="to"
            type="date"
            value={filters.to}
            onChange={(e) => setFilters((f) => ({ ...f, to: e.target.value }))}
          />
        </Filter>
        <Filter label="Service" id="service">
          <select
            id="service"
            value={filters.service}
            onChange={(e) => setFilters((f) => ({ ...f, service: e.target.value }))}
          >
            <option value="">All</option>
            {SERVICE_OPTIONS.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </Filter>
        <Filter label="Status" id="status">
          <select
            id="status"
            value={filters.status}
            onChange={(e) => setFilters((f) => ({ ...f, status: e.target.value }))}
          >
            <option value="">All</option>
            {LEAD_STATUSES.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </Filter>
        <Filter label="Country" id="country">
          <input
            id="country"
            type="text"
            placeholder="Morocco"
            value={filters.country}
            onChange={(e) => setFilters((f) => ({ ...f, country: e.target.value }))}
          />
        </Filter>
        <Filter label="Min score" id="minScore">
          <input
            id="minScore"
            type="number"
            min={0}
            max={100}
            value={filters.minScore}
            onChange={(e) => setFilters((f) => ({ ...f, minScore: e.target.value }))}
          />
        </Filter>
        <Filter label="Source" id="source">
          <select
            id="source"
            value={filters.source}
            onChange={(e) => setFilters((f) => ({ ...f, source: e.target.value }))}
          >
            <option value="">All</option>
            {sources.map(([s]) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </Filter>
        <Filter label="Search" id="search">
          <input
            id="search"
            type="search"
            placeholder="Name, email, company…"
            value={filters.search}
            onChange={(e) => setFilters((f) => ({ ...f, search: e.target.value }))}
          />
        </Filter>
      </div>

      {sources.length > 0 && (
        <p className="muted" style={{ fontSize: 'var(--fs-xs)', marginBottom: 16 }}>
          <strong>Lead sources:</strong>{' '}
          {sources.map(([s, n]) => `${s} (${n})`).join(' · ')}
        </p>
      )}

      <div className="table-wrap">
        <table className="lead-table">
          <caption className="sr-only">Recent leads</caption>
          <thead>
            <tr>
              <th scope="col">Received</th>
              <th scope="col">Lead</th>
              <th scope="col">Company</th>
              <th scope="col">Service</th>
              <th scope="col">Budget</th>
              <th scope="col">Score</th>
              <th scope="col">Status</th>
              <th scope="col">Source</th>
              <th scope="col">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 && (
              <tr>
                <td colSpan={9} style={{ textAlign: 'center', padding: 32 }} className="muted">
                  No lead matches these filters.
                </td>
              </tr>
            )}
            {filtered.map((lead) => {
              const temp = temperature(lead.lead_score);
              return (
                <tr key={lead.id} style={{ opacity: busyId === lead.id ? 0.5 : 1 }}>
                  <td className="mono" style={{ whiteSpace: 'nowrap' }}>
                    {new Date(lead.created_at).toLocaleDateString()}
                    <br />
                    <span className="muted">
                      {new Date(lead.created_at).toLocaleTimeString([], {
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </span>
                  </td>
                  <td>
                    <strong>
                      {lead.first_name} {lead.last_name}
                    </strong>
                    <br />
                    <a href={`mailto:${lead.email}`} style={{ color: 'var(--blue-bright)' }}>
                      {lead.email}
                    </a>
                    {lead.phone && (
                      <>
                        <br />
                        <a href={`tel:${lead.phone}`} className="muted">
                          {lead.phone}
                        </a>
                      </>
                    )}
                  </td>
                  <td>
                    {lead.company ?? '—'}
                    {lead.job_title && (
                      <>
                        <br />
                        <span className="muted">{lead.job_title}</span>
                      </>
                    )}
                    {lead.country && (
                      <>
                        <br />
                        <span className="muted">{lead.country}</span>
                      </>
                    )}
                  </td>
                  <td style={{ maxWidth: 190 }}>
                    {lead.service_requested}
                    {lead.message && (
                      <details style={{ marginTop: 6 }}>
                        <summary
                          style={{
                            cursor: 'pointer',
                            color: 'var(--blue-bright)',
                            fontSize: 'var(--fs-xs)',
                          }}
                        >
                          Message
                        </summary>
                        <p
                          className="muted"
                          style={{ whiteSpace: 'pre-wrap', fontSize: 'var(--fs-xs)', marginTop: 6 }}
                        >
                          {lead.message}
                        </p>
                      </details>
                    )}
                  </td>
                  <td>{lead.budget ?? '—'}</td>
                  <td>
                    <span className={`score score--${temp.toLowerCase()}`}>
                      {lead.lead_score}
                    </span>
                    <br />
                    <span className="muted" style={{ fontSize: 'var(--fs-xs)' }}>
                      {temp}
                    </span>
                  </td>
                  <td>
                    <select
                      aria-label={`Status for ${lead.first_name} ${lead.last_name}`}
                      value={lead.status}
                      disabled={busyId === lead.id}
                      onChange={(e) => changeStatus(lead.id, e.target.value as LeadStatus)}
                      style={{
                        padding: '6px 8px',
                        borderRadius: 'var(--r-xs)',
                        border: '1px solid var(--line-strong)',
                        background: 'var(--bg-elevated)',
                        color: 'var(--text)',
                        fontSize: 'var(--fs-xs)',
                      }}
                    >
                      {LEAD_STATUSES.map((s) => (
                        <option key={s} value={s}>
                          {s}
                        </option>
                      ))}
                    </select>
                  </td>
                  <td className="muted" style={{ fontSize: 'var(--fs-xs)' }}>
                    {lead.source ?? '—'}
                    {lead.utm_campaign && (
                      <>
                        <br />
                        {lead.utm_campaign}
                      </>
                    )}
                  </td>
                  <td>
                    <button
                      type="button"
                      className="btn btn--quiet btn--sm"
                      style={{ color: '#fda4af' }}
                      disabled={busyId === lead.id}
                      onClick={() => remove(lead.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function Filter({
  label,
  id,
  children,
}: {
  label: string;
  id: string;
  children: React.ReactNode;
}) {
  return (
    <div className="field">
      <label htmlFor={id}>{label}</label>
      {children}
    </div>
  );
}
