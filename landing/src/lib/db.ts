import { promises as fs } from 'node:fs';
import path from 'node:path';
import { randomUUID } from 'node:crypto';
import type { Lead, LeadInput, LeadStatus } from './leads';

/**
 * ─────────────────────────────────────────────────────────────────────────────
 *  DATA ACCESS LAYER
 * ─────────────────────────────────────────────────────────────────────────────
 *  Primary store: Supabase (PostgreSQL) through its PostgREST HTTP API. No SDK
 *  dependency — plain `fetch`, so the route handlers run anywhere and the
 *  install stays tiny. Values are sent as JSON, never string-concatenated into
 *  SQL, so there is no injection surface here.
 *
 *  Fallback store: a local JSONL file (`landing/data/leads.jsonl`).
 *  It exists so that `npm run dev` gives you a WORKING end-to-end form on the
 *  first run — validation → storage → scoring → notification → confirmation —
 *  before you have created a Supabase project. It is NOT for production:
 *  serverless filesystems are ephemeral. `isSupabaseConfigured()` tells you
 *  which store is active, and the admin dashboard displays it.
 * ─────────────────────────────────────────────────────────────────────────────
 */

const SUPABASE_URL = process.env.SUPABASE_URL?.replace(/\/$/, '') ?? '';
const SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY ?? '';
const TABLE = 'leads';

export function isSupabaseConfigured(): boolean {
  return Boolean(SUPABASE_URL && SERVICE_KEY);
}

export function storageMode(): 'supabase' | 'file' {
  return isSupabaseConfigured() ? 'supabase' : 'file';
}

export interface ListLeadsQuery {
  status?: string;
  service?: string;
  country?: string;
  source?: string;
  minScore?: number;
  from?: string;
  to?: string;
  search?: string;
  limit?: number;
  offset?: number;
}

/* ───────────────────────────── Supabase (PostgREST) ─────────────────────── */

function supabaseHeaders(extra: Record<string, string> = {}): HeadersInit {
  return {
    apikey: SERVICE_KEY,
    Authorization: `Bearer ${SERVICE_KEY}`,
    'Content-Type': 'application/json',
    ...extra,
  };
}

async function supabaseRequest<T>(
  pathAndQuery: string,
  init: RequestInit,
): Promise<T> {
  const res = await fetch(`${SUPABASE_URL}/rest/v1/${pathAndQuery}`, {
    ...init,
    cache: 'no-store',
  });

  if (!res.ok) {
    const detail = await res.text().catch(() => '');
    throw new Error(`Supabase ${res.status}: ${detail.slice(0, 400)}`);
  }
  if (res.status === 204) return undefined as T;
  return (await res.json()) as T;
}

/* ───────────────────────────── JSONL fallback ───────────────────────────── */

const FILE_DIR = path.join(process.cwd(), 'data');
const FILE_PATH = path.join(FILE_DIR, 'leads.jsonl');

async function fileReadAll(): Promise<Lead[]> {
  try {
    const raw = await fs.readFile(FILE_PATH, 'utf8');
    return raw
      .split('\n')
      .filter(Boolean)
      .map((line) => JSON.parse(line) as Lead);
  } catch {
    return [];
  }
}

async function fileWriteAll(leads: Lead[]): Promise<void> {
  await fs.mkdir(FILE_DIR, { recursive: true });
  await fs.writeFile(
    FILE_PATH,
    leads.map((l) => JSON.stringify(l)).join('\n') + (leads.length ? '\n' : ''),
    'utf8',
  );
}

/* ───────────────────────────── Public API ───────────────────────────────── */

export async function createLead(
  input: LeadInput & { lead_score: number },
): Promise<Lead> {
  const now = new Date().toISOString();
  const row = {
    first_name: input.first_name,
    last_name: input.last_name,
    email: input.email,
    phone: input.phone ?? null,
    country: input.country ?? null,
    company: input.company ?? null,
    job_title: input.job_title ?? null,
    service_requested: input.service_requested,
    budget: input.budget ?? null,
    message: input.message ?? null,
    source: input.source ?? 'website',
    status: 'New' as LeadStatus,
    lead_score: input.lead_score,
    utm_source: input.utm_source ?? null,
    utm_medium: input.utm_medium ?? null,
    utm_campaign: input.utm_campaign ?? null,
    landing_page: input.landing_page ?? null,
    consent: input.consent,
    notes: null,
  };

  if (isSupabaseConfigured()) {
    const inserted = await supabaseRequest<Lead[]>(TABLE, {
      method: 'POST',
      headers: supabaseHeaders({ Prefer: 'return=representation' }),
      body: JSON.stringify(row),
    });
    return inserted[0];
  }

  const lead: Lead = { ...row, id: randomUUID(), created_at: now, updated_at: now };
  const all = await fileReadAll();
  all.push(lead);
  await fileWriteAll(all);
  return lead;
}

export async function listLeads(q: ListLeadsQuery = {}): Promise<Lead[]> {
  const limit = Math.min(Math.max(q.limit ?? 200, 1), 1000);
  const offset = Math.max(q.offset ?? 0, 0);

  if (isSupabaseConfigured()) {
    const params = new URLSearchParams();
    params.set('select', '*');
    params.set('order', 'created_at.desc');
    params.set('limit', String(limit));
    params.set('offset', String(offset));
    if (q.status) params.append('status', `eq.${q.status}`);
    if (q.service) params.append('service_requested', `eq.${q.service}`);
    if (q.country) params.append('country', `ilike.*${q.country}*`);
    if (q.source) params.append('source', `eq.${q.source}`);
    if (typeof q.minScore === 'number') {
      params.append('lead_score', `gte.${q.minScore}`);
    }
    if (q.from) params.append('created_at', `gte.${q.from}`);
    if (q.to) params.append('created_at', `lte.${q.to}`);
    if (q.search) {
      const s = q.search.replace(/[(),*]/g, '');
      params.set(
        'or',
        `(first_name.ilike.*${s}*,last_name.ilike.*${s}*,email.ilike.*${s}*,company.ilike.*${s}*)`,
      );
    }
    return supabaseRequest<Lead[]>(`${TABLE}?${params.toString()}`, {
      method: 'GET',
      headers: supabaseHeaders(),
    });
  }

  let all = await fileReadAll();
  if (q.status) all = all.filter((l) => l.status === q.status);
  if (q.service) all = all.filter((l) => l.service_requested === q.service);
  if (q.country) {
    all = all.filter((l) =>
      (l.country ?? '').toLowerCase().includes(q.country!.toLowerCase()),
    );
  }
  if (q.source) all = all.filter((l) => l.source === q.source);
  if (typeof q.minScore === 'number') {
    all = all.filter((l) => l.lead_score >= q.minScore!);
  }
  if (q.from) all = all.filter((l) => l.created_at >= q.from!);
  if (q.to) all = all.filter((l) => l.created_at <= q.to!);
  if (q.search) {
    const s = q.search.toLowerCase();
    all = all.filter((l) =>
      [l.first_name, l.last_name, l.email, l.company]
        .filter(Boolean)
        .some((v) => String(v).toLowerCase().includes(s)),
    );
  }
  return all
    .sort((a, b) => b.created_at.localeCompare(a.created_at))
    .slice(offset, offset + limit);
}

export async function getLead(id: string): Promise<Lead | null> {
  if (isSupabaseConfigured()) {
    const rows = await supabaseRequest<Lead[]>(
      `${TABLE}?id=eq.${encodeURIComponent(id)}&select=*&limit=1`,
      { method: 'GET', headers: supabaseHeaders() },
    );
    return rows[0] ?? null;
  }
  const all = await fileReadAll();
  return all.find((l) => l.id === id) ?? null;
}

/** Fields an authenticated operator is allowed to change. */
export type LeadPatch = Partial<
  Pick<Lead, 'status' | 'notes' | 'lead_score' | 'company' | 'job_title' | 'country' | 'phone'>
>;

export async function updateLead(id: string, patch: LeadPatch): Promise<Lead | null> {
  const body = { ...patch, updated_at: new Date().toISOString() };

  if (isSupabaseConfigured()) {
    const rows = await supabaseRequest<Lead[]>(
      `${TABLE}?id=eq.${encodeURIComponent(id)}`,
      {
        method: 'PATCH',
        headers: supabaseHeaders({ Prefer: 'return=representation' }),
        body: JSON.stringify(body),
      },
    );
    return rows[0] ?? null;
  }

  const all = await fileReadAll();
  const idx = all.findIndex((l) => l.id === id);
  if (idx === -1) return null;
  all[idx] = { ...all[idx], ...body };
  await fileWriteAll(all);
  return all[idx];
}

export async function deleteLead(id: string): Promise<boolean> {
  if (isSupabaseConfigured()) {
    await supabaseRequest<null>(`${TABLE}?id=eq.${encodeURIComponent(id)}`, {
      method: 'DELETE',
      headers: supabaseHeaders({ Prefer: 'return=minimal' }),
    });
    return true;
  }
  const all = await fileReadAll();
  const next = all.filter((l) => l.id !== id);
  if (next.length === all.length) return false;
  await fileWriteAll(next);
  return true;
}

/** Recent duplicate guard: same email + same service within the window. */
export async function findRecentDuplicate(
  email: string,
  service: string,
  windowMinutes = 30,
): Promise<Lead | null> {
  const since = new Date(Date.now() - windowMinutes * 60_000).toISOString();
  const recent = await listLeads({ from: since, limit: 200 });
  return (
    recent.find(
      (l) => l.email === email && l.service_requested === service,
    ) ?? null
  );
}
