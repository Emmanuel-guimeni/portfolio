import { isAuthorised } from '@/lib/auth';
import { listLeads } from '@/lib/db';
import { NextResponse } from 'next/server';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const COLUMNS = [
  'id', 'created_at', 'updated_at', 'first_name', 'last_name', 'email',
  'phone', 'country', 'company', 'job_title', 'service_requested', 'budget',
  'status', 'lead_score', 'source', 'utm_source', 'utm_medium', 'utm_campaign',
  'landing_page', 'consent', 'message', 'notes',
] as const;

/**
 * GET /api/leads/export — protected. Streams the filtered leads as CSV.
 *
 * Values are escaped for RFC 4180 AND prefixed with an apostrophe when they
 * begin with =, +, - or @, so a lead cannot inject a formula that executes
 * when the export is opened in Excel or Sheets (CSV injection).
 */
export async function GET(req: Request) {
  if (!(await isAuthorised(req))) {
    return NextResponse.json({ ok: false, error: 'Non autorisé' }, { status: 401 });
  }

  const p = new URL(req.url).searchParams;
  const minScore = p.get('minScore');

  const leads = await listLeads({
    status: p.get('status') ?? undefined,
    service: p.get('service') ?? undefined,
    country: p.get('country') ?? undefined,
    source: p.get('source') ?? undefined,
    minScore: minScore ? Number(minScore) : undefined,
    from: p.get('from') ?? undefined,
    to: p.get('to') ?? undefined,
    search: p.get('search') ?? undefined,
    limit: 1000,
  });

  const rows = [
    COLUMNS.join(','),
    ...leads.map((lead) =>
      COLUMNS.map((c) => csvCell((lead as unknown as Record<string, unknown>)[c])).join(','),
    ),
  ];

  const date = new Date().toISOString().slice(0, 10);
  return new NextResponse(`﻿${rows.join('\r\n')}`, {
    headers: {
      'Content-Type': 'text/csv; charset=utf-8',
      'Content-Disposition': `attachment; filename="leads-${date}.csv"`,
      'Cache-Control': 'no-store',
    },
  });
}

function csvCell(value: unknown): string {
  if (value === null || value === undefined) return '';
  let text = String(value);
  if (/^[=+\-@\t\r]/.test(text)) text = `'${text}`; // neutralise formula injection
  return `"${text.replace(/"/g, '""')}"`;
}
