-- ═══════════════════════════════════════════════════════════════════════════
--  LEAD GENERATION SCHEMA — PostgreSQL / Supabase
--  Mr GUEHEDI Emmanuel — Digital Marketing & AI Automation Specialist
--
--  How to apply:
--    Supabase → SQL Editor → paste this whole file → Run.
--    Or:  psql "$DATABASE_URL" -f database/schema.sql
--
--  Safe to re-run: every statement is idempotent.
-- ═══════════════════════════════════════════════════════════════════════════

create extension if not exists "pgcrypto";   -- gen_random_uuid()
create extension if not exists "pg_trgm";    -- fast ILIKE search on names/emails

-- ── Enumerated types ───────────────────────────────────────────────────────
-- Pipeline: New → Contacted → Qualified → Meeting → Proposal → Won → Lost
do $$
begin
  if not exists (select 1 from pg_type where typname = 'lead_status') then
    create type lead_status as enum (
      'New', 'Contacted', 'Qualified', 'Meeting', 'Proposal', 'Won', 'Lost'
    );
  end if;
end $$;

-- ── Table: leads ───────────────────────────────────────────────────────────
create table if not exists public.leads (
  id                uuid primary key default gen_random_uuid(),

  -- Identity
  first_name        text        not null check (length(btrim(first_name)) between 2 and 80),
  last_name         text        not null check (length(btrim(last_name))  between 2 and 80),
  email             text        not null check (email ~* '^[^@\s]+@[^@\s]+\.[^@\s]+$'),
  phone             text,
  country           text,
  company           text,
  job_title         text,

  -- Request
  service_requested text        not null,
  budget            text,
  message           text        check (message is null or length(message) <= 4000),

  -- Qualification
  source            text        default 'website',
  status            lead_status not null default 'New',
  lead_score        integer     not null default 0 check (lead_score between 0 and 100),

  -- Attribution
  utm_source        text,
  utm_medium        text,
  utm_campaign      text,
  landing_page      text,

  -- Compliance
  consent           boolean     not null default false,

  -- Internal
  notes             text,

  created_at        timestamptz not null default now(),
  updated_at        timestamptz not null default now()
);

comment on table  public.leads               is 'Prospects captured by the landing page form.';
comment on column public.leads.lead_score    is '0-30 Cold · 31-60 Warm · 61+ Hot. Computed in src/lib/scoring.ts.';
comment on column public.leads.consent       is 'GDPR/CNDP consent. A row must never be written with consent = false.';
comment on column public.leads.landing_page  is 'Page the form was submitted from — used for attribution.';

-- A lead must have consented. This is a legal requirement, so it is enforced
-- by the database and not only by the application.
alter table public.leads drop constraint if exists leads_consent_required;
alter table public.leads add  constraint leads_consent_required check (consent = true);

-- ── Indexes ────────────────────────────────────────────────────────────────
create index if not exists leads_created_at_idx  on public.leads (created_at desc);
create index if not exists leads_status_idx      on public.leads (status);
create index if not exists leads_score_idx       on public.leads (lead_score desc);
create index if not exists leads_service_idx     on public.leads (service_requested);
create index if not exists leads_source_idx      on public.leads (source);
create index if not exists leads_country_idx     on public.leads (country);
create index if not exists leads_email_idx       on public.leads (lower(email));
-- Trigram indexes make the dashboard's ILIKE search fast as the table grows.
create index if not exists leads_name_trgm_idx   on public.leads using gin ((first_name || ' ' || last_name) gin_trgm_ops);
create index if not exists leads_email_trgm_idx  on public.leads using gin (email gin_trgm_ops);

-- ── updated_at trigger ─────────────────────────────────────────────────────
create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists leads_set_updated_at on public.leads;
create trigger leads_set_updated_at
  before update on public.leads
  for each row execute function public.set_updated_at();

-- ═══════════════════════════════════════════════════════════════════════════
--  ROW LEVEL SECURITY
--
--  RLS is ON and NO policy grants access to the anon or authenticated roles.
--  That is deliberate: the application talks to this table exclusively with the
--  service_role key from the server (src/lib/db.ts), and service_role bypasses
--  RLS. The result is that the anon key — the only key that could ever reach a
--  browser — can neither read nor write a single lead.
--
--  Do NOT add an "anon can insert" policy to submit the form from the browser.
--  Submit through POST /api/leads instead, so validation, scoring, rate
--  limiting and anti-spam are all applied.
-- ═══════════════════════════════════════════════════════════════════════════
alter table public.leads enable row level security;
alter table public.leads force row level security;

drop policy if exists "no public access" on public.leads;

-- ── Reporting view used by the dashboard KPIs ──────────────────────────────
create or replace view public.lead_stats as
select
  count(*)                                                     as total_leads,
  count(*) filter (where status = 'New')                       as new_leads,
  count(*) filter (where lead_score between 31 and 60)         as warm_leads,
  count(*) filter (where lead_score >= 61)                     as hot_leads,
  count(*) filter (where service_requested ilike '%Audit%')    as audit_requests,
  count(*) filter (where service_requested ilike '%Consulting%'
                      or service_requested ilike '%Strategy%') as consulting_requests,
  count(*) filter (where status = 'Won')                       as won_leads,
  round(
    100.0 * count(*) filter (where status = 'Won')
    / nullif(count(*), 0)
  , 1)                                                         as conversion_rate,
  count(*) filter (where created_at >= now() - interval '30 days') as leads_last_30_days
from public.leads;

comment on view public.lead_stats is 'Aggregates powering the /admin dashboard KPI tiles.';

-- ── Leads per source, last 90 days ─────────────────────────────────────────
create or replace view public.lead_sources as
select
  coalesce(nullif(btrim(source), ''), 'unknown') as source,
  count(*)                                       as leads,
  round(avg(lead_score), 1)                      as avg_score,
  count(*) filter (where status = 'Won')         as won
from public.leads
where created_at >= now() - interval '90 days'
group by 1
order by leads desc;

-- ═══════════════════════════════════════════════════════════════════════════
--  OPTIONAL — activity log, for when you start tracking touchpoints.
--  Uncomment when you need it.
-- ═══════════════════════════════════════════════════════════════════════════
-- create table if not exists public.lead_activities (
--   id          uuid primary key default gen_random_uuid(),
--   lead_id     uuid not null references public.leads (id) on delete cascade,
--   kind        text not null,            -- email_sent | call | meeting | note | status_change
--   payload     jsonb not null default '{}'::jsonb,
--   created_at  timestamptz not null default now()
-- );
-- create index if not exists lead_activities_lead_idx on public.lead_activities (lead_id, created_at desc);
-- alter table public.lead_activities enable row level security;
