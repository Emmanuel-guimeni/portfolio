# Mr GUEHEDI Emmanuel — Landing page & lead generation system

Premium landing page, portfolio and **working lead-generation system** for
**Mr GUEHEDI Emmanuel**, *Digital Marketing & AI Automation Specialist*
(Casablanca – Morocco).

This is not a mockup. When a visitor submits the form:

```
Form → server validation → anti-spam → duplicate check → lead score
     → database → notification → confirmation
```

…actually runs, and every step is in this repository.

---

## Contents

1. [What is built](#1-what-is-built)
2. [Requirements & installation](#2-requirements--installation)
3. [Environment variables](#3-environment-variables)
4. [Supabase / PostgreSQL setup](#4-supabase--postgresql-setup)
5. [Admin dashboard](#5-admin-dashboard)
6. [Email notifications](#6-email-notifications)
7. [Analytics & marketing tags](#7-analytics--marketing-tags)
8. [Anti-spam](#8-anti-spam)
9. [API reference](#9-api-reference)
10. [Lead scoring](#10-lead-scoring)
11. [Deployment](#11-deployment)
12. [How to change the content](#12-how-to-change-the-content)
13. [Project structure](#13-project-structure)
14. [Security notes](#14-security-notes)
15. [Feature status: ready vs. needs configuration](#15-feature-status)

---

## 1. What is built

**Landing page** — 22 sections: navigation, hero, stats band, problem, solution,
AI marketing system, the 7 AI agents, content factory, social media automation,
lead generation, CRM automation, email automation, advertising automation, SEO
automation, data & analytics, technology stack, pricing / real cost, services,
how I work, contact & lead capture, FAQ, design principles, final CTA, footer.

**Pricing engine** — every tool price is stored once in its official billing
currency and converted live into **USD, EUR, MAD, XAF**. Visitors can switch
currency, switch monthly/annual billing, **edit the exchange rates themselves**,
and run a **Total Cost of Ownership simulator** across the 8 cost types
(software, AI subscription, API, automation, advertising media, data,
implementation, maintenance). A **tool redundancy score** shows which tools
overlap and can be collapsed.

**Lead system** — validated form → PostgreSQL → automatic scoring
(Cold / Warm / Hot) → email alert + optional prospect confirmation → optional
webhook to HubSpot / Brevo / Make / Zapier / n8n.

**Admin dashboard** at `/admin` — KPIs, filters (date, service, country, status,
score, source), inline status editing, bulk re-scoring, CSV export.

**SEO** — metadata, canonical, Open Graph, Twitter cards, Schema.org
(Person + ProfessionalService + WebSite + FAQPage), `sitemap.xml`, `robots.txt`,
favicon set, web manifest.

**Stack** — Next.js 16 (App Router) · React 19 · TypeScript · plain CSS.
**Zero runtime dependencies beyond Next and React.** Supabase is reached over
its REST API with `fetch`, so there is no SDK to keep up to date and the install
stays small.

---

## 2. Requirements & installation

- **Node.js 20.9+** (Node 22 recommended)
- npm

```bash
cd landing
npm install
cp .env.example .env.local     # then fill it in — see §3
npm run dev                    # http://localhost:3000
```

**It works immediately with no configuration.** Until you add Supabase
credentials, leads are written to `data/leads.jsonl` so you can test the whole
pipeline locally. That fallback is development-only — serverless filesystems are
ephemeral, so configure Supabase before going live. The dashboard tells you
which store is active.

Useful scripts:

```bash
npm run dev        # development server
npm run build      # production build
npm start          # run the production build
npm run typecheck  # TypeScript, no emit
```

Regenerate the raster brand assets (OG image, favicons) after changing the
portrait or the wording:

```bash
python3 -m pip install Pillow
python3 scripts/generate-assets.py
```

---

## 3. Environment variables

Copy `.env.example` → `.env.local`. **Never commit `.env.local`.**

Only variables prefixed `NEXT_PUBLIC_` reach the browser — everything else stays
server-side.

| Variable | Required | What it does |
| --- | --- | --- |
| `NEXT_PUBLIC_SITE_URL` | production | Canonical URL used by canonical tags, OG, sitemap. No trailing slash. |
| `SUPABASE_URL` | production | Supabase project URL. |
| `SUPABASE_SERVICE_ROLE_KEY` | production | Server-only key. **Never** expose it to the browser. |
| `SUPABASE_ANON_KEY` | optional | Not used by the server; kept for future browser-side features. |
| `DATABASE_URL` | optional | Direct Postgres connection, for migrations and BI tools only. |
| `ADMIN_PASSWORD` | for `/admin` | Password for the lead dashboard. |
| `ADMIN_SESSION_SECRET` | for `/admin` | 32+ random chars, signs the session cookie. `openssl rand -base64 48` |
| `LEADS_API_TOKEN` | optional | Bearer token so Make / Zapier / n8n can call the lead API. |
| `EMAIL_PROVIDER` | optional | `resend`, `brevo` or `none`. |
| `EMAIL_API_KEY` | with provider | Provider API key. |
| `EMAIL_FROM` | with provider | Verified sender, e.g. `Emmanuel <noreply@yourdomain.com>`. |
| `EMAIL_NOTIFY_TO` | optional | Where new-lead alerts go. Defaults to `christguimeni@gmail.com`. |
| `EMAIL_SEND_CONFIRMATION` | optional | `true` to auto-reply to the prospect. |
| `LEAD_WEBHOOK_URL` | optional | Every accepted lead is POSTed here as JSON. |
| `LEAD_WEBHOOK_SECRET` | optional | Sent as `X-Webhook-Secret` so the receiver can verify. |
| `NEXT_PUBLIC_TURNSTILE_SITE_KEY` / `TURNSTILE_SECRET_KEY` | optional | Cloudflare Turnstile anti-spam. |
| `NEXT_PUBLIC_GA4_ID` | optional | e.g. `G-XXXXXXXXXX` |
| `NEXT_PUBLIC_GTM_ID` | optional | e.g. `GTM-XXXXXXX` |
| `NEXT_PUBLIC_META_PIXEL_ID` | optional | Meta Pixel ID. |
| `NEXT_PUBLIC_LINKEDIN_PARTNER_ID` | optional | LinkedIn Insight partner ID. |
| `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION` | optional | Search Console verification token. |

---

## 4. Supabase / PostgreSQL setup

1. Create a project at [supabase.com](https://supabase.com).
2. **SQL Editor** → paste the whole of `database/schema.sql` → **Run**.
   It is idempotent, so re-running it is safe.
3. **Project Settings → API** → copy:
   - *Project URL* → `SUPABASE_URL`
   - *service_role* secret → `SUPABASE_SERVICE_ROLE_KEY`
4. Restart the dev server. `/admin` will now report
   **Storage: Supabase / PostgreSQL**.

The schema creates the `leads` table (all 21 fields), a `lead_status` enum,
indexes (including trigram indexes so dashboard search stays fast), an
`updated_at` trigger, a `consent = true` **database-level** constraint, and two
reporting views (`lead_stats`, `lead_sources`).

**On Row Level Security:** RLS is enabled with *no* policy granting access to
`anon` or `authenticated`. That is deliberate. The app talks to the table only
from the server with the `service_role` key (which bypasses RLS), so the anon
key — the only key that could ever leak into a browser — can neither read nor
write a single lead. Do **not** add an "anon can insert" policy to submit the
form directly from the browser; submit through `POST /api/leads` so validation,
scoring, rate limiting and anti-spam all apply.

---

## 5. Admin dashboard

```
ADMIN_PASSWORD=your-strong-password
ADMIN_SESSION_SECRET=$(openssl rand -base64 48)
```

Then open `/admin`. If either variable is missing the dashboard closes itself
rather than opening — failing shut is the only safe default.

Authentication is a signed, `httpOnly`, `SameSite=Lax` cookie valid for 12
hours. Login is rate limited to 8 attempts per IP per 15 minutes, and the
password comparison is constant-time.

The dashboard shows: total leads, new, warm, hot, audit requests, consulting
requests, conversion rate and lead sources; filters by date, service, country,
status, minimum score, source and free text; lets you change a lead's status
inline, delete a lead, re-score everything with the current rules, and export
the filtered set to CSV.

> The CSV export prefixes any value starting with `=`, `+`, `-` or `@` with an
> apostrophe, so a hostile lead cannot inject a formula that executes when you
> open the file in Excel or Sheets. A leading `'` on a phone number is that
> guard doing its job.

---

## 6. Email notifications

**Option A — Resend**

```
EMAIL_PROVIDER=resend
EMAIL_API_KEY=re_xxxxxxxx
EMAIL_FROM=Emmanuel <noreply@yourdomain.com>
EMAIL_NOTIFY_TO=christguimeni@gmail.com
EMAIL_SEND_CONFIRMATION=true
```

**Option B — Brevo**

```
EMAIL_PROVIDER=brevo
EMAIL_API_KEY=xkeysib-xxxxxxxx
EMAIL_FROM=Emmanuel <noreply@yourdomain.com>
```

Verify your sending domain with the provider first, or your alerts land in spam.

**Webhook (HubSpot / Make / Zapier / n8n)** — set `LEAD_WEBHOOK_URL` and every
accepted lead is POSTed as:

```json
{
  "event": "lead.created",
  "sentAt": "2026-09-10T09:00:00.000Z",
  "temperature": "Hot",
  "lead": { "id": "...", "first_name": "...", "lead_score": 90, "...": "..." }
}
```

All three channels fail softly and in parallel: a provider outage can never lose
a lead that is already stored. Replay a failed notification with
`POST /api/notifications`.

---

## 7. Analytics & marketing tags

Set any of `NEXT_PUBLIC_GA4_ID`, `NEXT_PUBLIC_GTM_ID`,
`NEXT_PUBLIC_META_PIXEL_ID`, `NEXT_PUBLIC_LINKEDIN_PARTNER_ID`. With none set,
**no tag loads and no cookie is written** — which is also the correct GDPR
default until you have a consent banner.

Events emitted (`src/lib/tracking.ts`): `page_view`, `scroll_depth`,
`cta_click`, `form_start`, `form_submit`, `audit_request`,
`consulting_request`, `whatsapp_click`, `email_click`, `phone_click`,
`pricing_currency_change`.

UTM parameters are captured on arrival, stored first-touch in `sessionStorage`
and attached to the lead on submission, together with the landing page and a
derived `source` (organic-search, linkedin, meta, whatsapp, direct, referral…).

---

## 8. Anti-spam

Four independent layers, all active:

1. **Honeypot** — a hidden `website_url` field. Filled in → silently discarded
   with a `200` so bots learn nothing.
2. **Time trap** — submitted in under 3 seconds, or from a tab left open more
   than 6 hours → discarded.
3. **Rate limiting** — 5 submissions per IP per 10 minutes.
4. **Cloudflare Turnstile** — optional. Set both keys to enable; without them
   the form still works.

---

## 9. API reference

| Method | Route | Auth | Purpose |
| --- | --- | --- | --- |
| `POST` | `/api/leads` | public | Create a lead (full pipeline). |
| `GET` | `/api/leads` | protected | List/filter leads. |
| `GET` | `/api/leads/:id` | protected | One lead. |
| `PATCH` | `/api/leads/:id` | protected | Update status, notes, score, company, job title, country, phone. |
| `DELETE` | `/api/leads/:id` | protected | Delete a lead. |
| `GET` | `/api/leads/export` | protected | CSV export (honours the same filters). |
| `GET` | `/api/score` | public | The scoring model itself — bands and rules. |
| `POST` | `/api/score` | public | Score a payload **without storing it**. |
| `POST` | `/api/score` `{"recalculate":true}` | protected | Re-score every stored lead. |
| `GET` | `/api/notifications` | protected | Which notification channels are configured. |
| `POST` | `/api/notifications` `{"leadId"}` | protected | Re-fire notifications for a lead. |
| `POST` | `/api/admin/login` | public | Sign in (rate limited). |
| `POST` | `/api/admin/logout` | — | Sign out. |

**Protected** = an admin session cookie, or `Authorization: Bearer $LEADS_API_TOKEN`
for machine clients.

`GET /api/leads` query parameters: `status`, `service`, `country`, `source`,
`minScore`, `from`, `to`, `search`, `limit`, `offset`.

```bash
# Pull hot leads into an automation
curl -H "Authorization: Bearer $LEADS_API_TOKEN" \
  "https://yourdomain.com/api/leads?minScore=61&status=New"
```

---

## 10. Lead scoring

Rules live in `src/lib/scoring.ts` — one row per rule, trivially editable:

| Rule | Points |
| --- | --- |
| Professional email domain (not gmail/yahoo/outlook…) | +10 |
| Company provided | +10 |
| Phone / WhatsApp provided | +10 |
| Declared budget | +0 to +20, by band |
| Audit requested | +10 |
| Consulting requested | +15 |
| Automation project described in the message | +20 |
| Detailed message (120+ characters) | +5 |
| Job title provided | +5 |

Bands: **0–30 Cold · 31–60 Warm · 61+ Hot** (clamped to 100).

Change a weight, then run **Re-score all** in the dashboard (or
`POST /api/score {"recalculate": true}`) to apply it to existing leads.

---

## 11. Deployment

### Vercel (recommended)

1. Push this repository to GitHub.
2. [vercel.com/new](https://vercel.com/new) → import the repository.
3. **Set the Root Directory to `landing`** — this project lives in a
   subdirectory. Framework preset: Next.js (auto-detected).
4. **Settings → Environment Variables** → add everything from §3 for
   *Production* (and *Preview* if you want previews to work).
5. Deploy.
6. **Settings → Domains** → add your domain, follow the DNS instructions, then
   set `NEXT_PUBLIC_SITE_URL` to the final `https://` URL and redeploy so
   canonical tags, OG and the sitemap are correct.
7. Submit `https://yourdomain.com/sitemap.xml` in Google Search Console.

```bash
# or from the CLI
npm i -g vercel
cd landing && vercel --prod
```

### Netlify

Build command `npm run build`, base directory `landing`, and install
`@netlify/plugin-nextjs`. Add the same environment variables under
**Site settings → Environment variables**.

### Cloudflare Pages

Use the Next.js preset with `@cloudflare/next-on-pages`. Root directory
`landing`, build command `npx @cloudflare/next-on-pages`, output `.vercel/output/static`.
Note that the in-memory rate limiter is per-isolate on Workers — move it to a
KV/Durable Object binding if you need hard guarantees.

### Any Node host (VPS, Render, Railway, Fly.io)

```bash
cd landing
npm ci
npm run build
npm start          # serves on $PORT, default 3000
```

Put it behind a reverse proxy with TLS. Set every environment variable in the
process environment, never in a file inside the web root.

### Post-deployment checklist

- [ ] `NEXT_PUBLIC_SITE_URL` matches the live domain (no trailing slash)
- [ ] `database/schema.sql` applied; `/admin` reports **Supabase / PostgreSQL**
- [ ] Test submission arrives in the database **and** by email
- [ ] `/admin` login works; CSV export downloads
- [ ] `/robots.txt` and `/sitemap.xml` show the production domain
- [ ] Sitemap submitted to Google Search Console
- [ ] Analytics tags firing (GA4 DebugView / Meta Pixel Helper)
- [ ] OG card renders correctly (LinkedIn Post Inspector, X Card Validator)

---

## 12. How to change the content

Everything is data-driven. No component needs editing for routine changes.

| To change… | Edit |
| --- | --- |
| Name, role, email, phone, WhatsApp message, location, nav, social links | `src/config/site.ts` |
| SEO title, description, keywords, Schema.org | `src/config/seo.ts` |
| The 7 AI agents | `src/config/agents.ts` |
| Services and the "How I work" steps | `src/config/services.ts` |
| Tool prices, plans, limits, sources, verification dates | `src/config/tools.ts` |
| The three stacks (Starter / Professional / Advanced) | `src/config/stacks.ts` |
| Exchange rates and currency formatting | `src/config/currency.ts` |
| Workflow diagrams, problems, design principles | `src/config/workflows.ts` |
| FAQ (also feeds the FAQPage schema) | `src/config/faq.ts` |
| Colours, spacing, typography | `src/styles/tokens.css` |
| Lead scoring rules | `src/lib/scoring.ts` |
| Form options (services, budgets, statuses) | `src/lib/leads.ts` |

**Contact details** live in exactly one place — `src/config/site.ts`. The
`mailto:`, `tel:` and WhatsApp links are *derived* from it, so they can never
drift out of sync.

**Social links:** add a real URL to `site.socials`. Entries with an empty `url`
are not rendered — no invented profiles.

**Adding a tool to the pricing table:** append an entry to `TOOLS` in
`src/config/tools.ts`. It appears automatically in the pricing table *and* in
the Technology Stack section. Always fill in `source` (the vendor's own pricing
page) and `verifiedOn`. Set `confidence: 'indicative'` when the price varies by
region, volume or negotiation — the table then tags the row **Verify**.

### ⚠️ About the prices

Prices were checked on **2026-09-09** against each vendor's official pricing
page, and every row links to its source. **Vendors change prices without
notice.** Re-verify before quoting a client. Prices marked *Verify* additionally
vary by region, contact volume, seat count or negotiation.

Exchange rates are indicative and editable by the visitor. `XAF` is the
**Central African CFA franc (CEMAC)**, pegged at 1 EUR = 655.957 XAF — not to be
confused with `XOF` (West Africa).

---

## 13. Project structure

```
landing/
├── src/
│   ├── app/
│   │   ├── layout.tsx            root layout, metadata, JSON-LD, fonts
│   │   ├── page.tsx              the landing page (22 sections)
│   │   ├── sitemap.ts            /sitemap.xml
│   │   ├── robots.ts             /robots.txt
│   │   ├── privacy/, terms/      legal pages
│   │   ├── admin/                dashboard (server-guarded) + login
│   │   └── api/
│   │       ├── leads/            POST, GET, [id] PATCH/DELETE, export CSV
│   │       ├── score/            scoring model + recalculation
│   │       ├── notifications/    replay notifications
│   │       └── admin/            login / logout
│   ├── components/               Nav, Hero, Sections, Pricing, LeadForm, …
│   ├── config/                   ALL editable content lives here
│   ├── lib/                      db, scoring, validation, auth, antispam,
│   │                             rate-limit, notifications, tracking
│   └── styles/                   tokens, base, layout, sections, pricing, forms
├── public/                       portrait, favicons, og.png, manifest
├── database/schema.sql           PostgreSQL schema, indexes, RLS, views
├── scripts/generate-assets.py    regenerates og.png + favicons
├── .env.example
└── next.config.ts                security headers, image config
```

---

## 14. Security notes

- No credential, API key or database secret is ever sent to the browser. Only
  `NEXT_PUBLIC_*` variables are public, and none of them is a secret.
- Every write is validated and sanitised server-side (`src/lib/validation.ts`);
  browser validation is UX only.
- Database writes are JSON payloads to PostgREST — no string-concatenated SQL,
  so there is no injection surface.
- RLS is on and closed to `anon`; only the server's `service_role` key can read
  or write leads.
- Admin sessions are HMAC-signed, `httpOnly`, `SameSite=Lax`, 12-hour expiry.
  Login is rate limited and the password comparison is constant-time.
- Security headers (HSTS, `X-Content-Type-Options`, `X-Frame-Options`,
  `Referrer-Policy`, `Permissions-Policy`) are set in `next.config.ts`.
  A stricter CSP is commented there — enable it once you know which marketing
  tags you actually use.
- `/admin` and `/api/` are excluded from `robots.txt`.
- Consent is required by the form, by the API **and** by a database constraint.

---

## 15. Feature status

**READY IN CODE** — works with no external setup:

- The complete landing page and all 22 sections
- Pricing engine, 4-currency conversion, editable FX, TCO simulator
- Form validation (client + server), sanitisation, rate limiting, honeypot,
  time trap, duplicate guard
- Lead scoring and the scoring API
- Local JSONL storage fallback (development)
- Admin dashboard, filters, CSV export, inline status editing
- SEO metadata, Schema.org, sitemap, robots, OG image, favicons
- Event tracking layer

**REQUIRES EXTERNAL CONFIGURATION** — code is complete, credentials are yours:

| Feature | What to do |
| --- | --- |
| Supabase / PostgreSQL | §4 — run `database/schema.sql`, set 2 variables |
| Admin dashboard access | §5 — set `ADMIN_PASSWORD` + `ADMIN_SESSION_SECRET` |
| Email alerts & confirmations | §6 — pick Resend or Brevo, verify your domain |
| CRM / automation webhook | §6 — set `LEAD_WEBHOOK_URL` |
| GA4 / GTM / Meta Pixel / LinkedIn | §7 — set the corresponding IDs |
| Cloudflare Turnstile | §8 — set both Turnstile keys |
| Custom domain | §11 — configure at your host, then set `NEXT_PUBLIC_SITE_URL` |

---

## Credits & assets

The portrait is Emmanuel's own photograph, background-removed and retouched by
`scripts/`. All other visuals — the monogram, the system diagram, the entire
icon set, the OG card — were generated for this project as inline SVG or by
`scripts/generate-assets.py`. **No stock photo is hotlinked and no third-party
image is embedded**, so there is no licence to track and nothing to break if an
external host disappears.

If you later want photography, use a source whose licence actually permits
commercial reuse and hotlinking — [Unsplash](https://unsplash.com) or
[Pexels](https://pexels.com). `next.config.ts` already allows their CDNs.
Pinterest is *not* such a source: it is a collection of other people's
copyrighted images and its terms do not grant reuse rights.

---

**Mr GUEHEDI Emmanuel** — Digital Marketing & AI Automation Specialist
[christguimeni@gmail.com](mailto:christguimeni@gmail.com) · +212 779 63 56 85 ·
Casablanca – Morocco

> Automate the repetitive. Augment the strategic. Humanize the critical decisions.
