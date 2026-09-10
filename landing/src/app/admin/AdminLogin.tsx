'use client';

import { useRouter } from 'next/navigation';
import { useState, type FormEvent } from 'react';
import { site } from '@/config/site';

export default function AdminLogin() {
  const router = useRouter();
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setBusy(true);
    setError('');
    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      });
      const data = (await res.json()) as { ok: boolean; error?: string };
      if (!data.ok) {
        setError(data.error ?? 'Échec de la connexion.');
        return;
      }
      router.refresh();
    } catch {
      setError('Erreur réseau. Merci de réessayer.');
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="login-wrap">
      <form className="login-card" onSubmit={onSubmit}>
        <div className="nav__brand">
          <span className="nav__mark" aria-hidden="true">
            {site.initials}
          </span>
          <span>
            <span className="nav__name">Tableau de bord</span>
            <span className="nav__role">{site.shortName}</span>
          </span>
        </div>

        <div className="field">
          <label htmlFor="password">Mot de passe</label>
          <input
            id="password"
            type="password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            autoFocus
          />
          {error && (
            <span className="field__error" role="alert">
              {error}
            </span>
          )}
        </div>

        <button type="submit" className="btn btn--primary btn--block" disabled={busy}>
          {busy ? 'Connexion…' : 'Se connecter'}
        </button>

        <a className="btn btn--quiet" href="/" style={{ justifySelf: 'center' }}>
          ← Retour au site
        </a>
      </form>
    </div>
  );
}
