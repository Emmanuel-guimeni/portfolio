import type { Metadata } from 'next';
import { hasAdminSession, isAdminConfigured } from '@/lib/auth';
import { listLeads, storageMode } from '@/lib/db';
import AdminLogin from './AdminLogin';
import Dashboard from './Dashboard';

export const metadata: Metadata = {
  title: 'Tableau de bord des leads',
  robots: { index: false, follow: false, nocache: true },
};

export const dynamic = 'force-dynamic';

/**
 * /admin — Lead Management Dashboard.
 *
 * Server component: the session is checked BEFORE any lead is fetched, so an
 * unauthenticated visitor never receives lead data in the HTML payload.
 */
export default async function AdminPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isAdminConfigured()) {
    return (
      <div className="login-wrap">
        <div className="login-card">
          <h1 style={{ fontSize: 'var(--fs-xl)' }}>Tableau de bord non configuré</h1>
          <p className="muted">
            Renseignez <code className="mono">ADMIN_PASSWORD</code> et{' '}
            <code className="mono">ADMIN_SESSION_SECRET</code> dans votre environnement,
            puis rechargez. Voir le README §5.
          </p>
          <a className="btn btn--ghost" href={`/${locale}`}>
            ← Retour au site
          </a>
        </div>
      </div>
    );
  }

  if (!(await hasAdminSession())) return <AdminLogin />;

  const leads = await listLeads({ limit: 1000 });
  return <Dashboard leads={leads} storage={storageMode()} />;
}
