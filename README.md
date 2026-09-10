# emmanuel-guimeni / portfolio

This repository now holds two things:

## `landing/` — current site (Next.js)

The premium landing page, portfolio and **lead-generation system** for
**Mr GUEHEDI Emmanuel**, *Digital Marketing & AI Automation Specialist*.

Next.js 16 · React 19 · TypeScript · PostgreSQL (Supabase) · working contact
form with server-side validation, automatic lead scoring, notifications and an
admin dashboard.

→ **[landing/README.md](landing/README.md)** — installation, configuration,
environment variables, database setup, API reference and deployment.

```bash
cd landing
npm install
cp .env.example .env.local
npm run dev
```

> Deploying on Vercel/Netlify/Cloudflare: set the **Root Directory to `landing`**.

## Root files — previous portfolio

`index.html` and `assets/` are the earlier Bootstrap template site, left in
place so nothing that linked to it breaks. They are not used by `landing/`.
