import type { Metadata } from 'next';
import { hasAdminSession, isAdminConfigured } from '@/lib/auth';
import { listLeads, storageMode } from '@/lib/db';
import AdminLogin from './AdminLogin';
import Dashboard from './Dashboard';

export const metadata: Metadata = {
  title: 'Lead dashboard',
  robots: { index: false, follow: false, nocache: true },
};

export const dynamic = 'force-dynamic';

/**
 * /admin — Lead Management Dashboard.
 *
 * Server component: the session is checked BEFORE any lead is fetched, so an
 * unauthenticated visitor never receives lead data in the HTML payload.
 */
export default async function AdminPage() {
  if (!isAdminConfigured()) {
    return (
      <div className="login-wrap">
        <div className="login-card">
          <h1 style={{ fontSize: 'var(--fs-xl)' }}>Dashboard not configured</h1>
          <p className="muted">
            Set <code className="mono">ADMIN_PASSWORD</code> and{' '}
            <code className="mono">ADMIN_SESSION_SECRET</code> in your environment, then
            reload. See README §4.
          </p>
          <a className="btn btn--ghost" href="/">
            ← Back to the site
          </a>
        </div>
      </div>
    );
  }

  if (!(await hasAdminSession())) return <AdminLogin />;

  const leads = await listLeads({ limit: 1000 });
  return <Dashboard leads={leads} storage={storageMode()} />;
}
