'use client';

import { useEffect, useRef, useState, type FormEvent } from 'react';
import { HONEYPOT_FIELD, TIMESTAMP_FIELD } from '@/lib/antispam';
import type { Locale } from '@/i18n/config';
import { localePath } from '@/i18n/config';
import type { Dictionary } from '@/i18n/types';
import { captureAttribution, track } from '@/lib/tracking';
import { SELECT_SERVICE_EVENT } from './Services';
import { IconArrowRight, IconCheck, IconAlert } from './Icons';

type Status = 'idle' | 'submitting' | 'success' | 'error';

const EMPTY = {
  first_name: '',
  last_name: '',
  email: '',
  phone: '',
  country: '',
  company: '',
  job_title: '',
  service_requested: '',
  budget: '',
  message: '',
};

export default function LeadForm({ d, locale }: { d: Dictionary; locale: Locale }) {
  const t = d.form;
  const [values, setValues] = useState({ ...EMPTY });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<Status>('idle');
  const [feedback, setFeedback] = useState('');
  const startedRef = useRef(false);
  const loadedAtRef = useRef(0);
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    loadedAtRef.current = Date.now();
  }, []);

  // « Demander ce service » sur une carte présélectionne la bonne option.
  useEffect(() => {
    const onSelect = (e: Event) => {
      const value = (e as CustomEvent<string>).detail;
      if (!value) return;
      setValues((v) => ({ ...v, service_requested: value }));
      window.setTimeout(() => {
        formRef.current
          ?.querySelector<HTMLInputElement>('#first_name')
          ?.focus({ preventScroll: true });
      }, 600);
    };
    window.addEventListener(SELECT_SERVICE_EVENT, onSelect);
    return () => window.removeEventListener(SELECT_SERVICE_EVENT, onSelect);
  }, []);

  const set = (field: keyof typeof EMPTY) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>,
  ) => {
    if (!startedRef.current) {
      startedRef.current = true;
      track('form_start', { form: 'lead' });
    }
    setValues((v) => ({ ...v, [field]: e.target.value }));
    setErrors((prev) => (prev[field] ? { ...prev, [field]: '' } : prev));
  };

  /** Miroir de src/lib/validation.ts. Le serveur reste l'autorité. */
  function validate(): Record<string, string> {
    const next: Record<string, string> = {};
    if (values.first_name.trim().length < 2) next.first_name = t.errors.firstName;
    if (values.last_name.trim().length < 2) next.last_name = t.errors.lastName;
    if (!/^[^\s@]+@[^\s@.]+(\.[^\s@.]+)+$/.test(values.email.trim())) {
      next.email = t.errors.email;
    }
    if (!values.service_requested) next.service_requested = t.errors.service;
    const consent = formRef.current?.querySelector<HTMLInputElement>('#consent');
    if (!consent?.checked) next.consent = t.errors.consent;
    return next;
  }

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (status === 'submitting') return;

    const found = validate();
    setErrors(found);
    if (Object.keys(found).length > 0) {
      const firstField = Object.keys(found)[0];
      formRef.current
        ?.querySelector<HTMLElement>(`#${firstField}`)
        ?.focus({ preventScroll: false });
      return;
    }

    setStatus('submitting');
    setFeedback('');

    const form = new FormData(formRef.current!);
    const payload = {
      ...values,
      consent: true,
      [HONEYPOT_FIELD]: String(form.get(HONEYPOT_FIELD) ?? ''),
      [TIMESTAMP_FIELD]: loadedAtRef.current,
      turnstile_token: String(form.get('cf-turnstile-response') ?? ''),
      ...captureAttribution(),
    };

    try {
      const res = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const data = (await res.json()) as {
        ok: boolean;
        code?: string;
        error?: string;
        errors?: Record<string, string>;
      };

      if (!res.ok || !data.ok) {
        setStatus('error');
        setErrors(data.errors ?? {});
        // Le serveur renvoie un code stable ; le texte affiché vient d'ici,
        // dans la langue de la page.
        setFeedback(
          data.code === 'validation_failed' ? '' : (data.error ?? t.errors.generic),
        );
        return;
      }

      setStatus('success');
      setFeedback(data.code === 'duplicate' ? t.duplicateBody : '');
      track('form_submit', { form: 'lead', service: values.service_requested });
      track(
        values.service_requested.includes('audit') ? 'audit_request' : 'consulting_request',
        { service: values.service_requested, location: 'form' },
      );
      setValues({ ...EMPTY });
      startedRef.current = false;
    } catch {
      setStatus('error');
      setFeedback(t.errors.network);
    }
  }

  const siteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;

  if (status === 'success') {
    return (
      <div className="form" role="status" aria-live="polite">
        <div className="form__status form__status--ok">
          <IconCheck size={20} />
          <span>
            <b>{t.successTitle}</b>
            {feedback} {t.successBody}
          </span>
        </div>
        <button
          type="button"
          className="btn btn--ghost"
          onClick={() => {
            setStatus('idle');
            setFeedback('');
          }}
        >
          {t.sendAnother}
        </button>
      </div>
    );
  }

  return (
    <form className="form" ref={formRef} onSubmit={onSubmit} noValidate>
      {/* Pot de miel — invisible aux humains, irrésistible aux bots naïfs */}
      <div className="hp" aria-hidden="true">
        <label htmlFor={HONEYPOT_FIELD}>{t.honeypot}</label>
        <input
          id={HONEYPOT_FIELD}
          name={HONEYPOT_FIELD}
          type="text"
          tabIndex={-1}
          autoComplete="off"
        />
      </div>

      <div className="form__row">
        <Field id="first_name" label={t.firstName} required error={errors.first_name} requiredLabel={t.required}>
          <input
            id="first_name"
            name="first_name"
            type="text"
            autoComplete="given-name"
            value={values.first_name}
            onChange={set('first_name')}
            aria-invalid={Boolean(errors.first_name)}
            placeholder="Emmanuel"
            required
          />
        </Field>

        <Field id="last_name" label={t.lastName} required error={errors.last_name} requiredLabel={t.required}>
          <input
            id="last_name"
            name="last_name"
            type="text"
            autoComplete="family-name"
            value={values.last_name}
            onChange={set('last_name')}
            aria-invalid={Boolean(errors.last_name)}
            placeholder="GUEHEDI"
            required
          />
        </Field>
      </div>

      <div className="form__row">
        <Field
          id="email"
          label={t.email}
          required
          error={errors.email}
          hint={t.emailHint}
          requiredLabel={t.required}
        >
          <input
            id="email"
            name="email"
            type="email"
            inputMode="email"
            autoComplete="email"
            value={values.email}
            onChange={set('email')}
            aria-invalid={Boolean(errors.email)}
            placeholder="you@company.com"
            required
          />
        </Field>

        <Field id="phone" label={t.phone} error={errors.phone}>
          <input
            id="phone"
            name="phone"
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            value={values.phone}
            onChange={set('phone')}
            aria-invalid={Boolean(errors.phone)}
            placeholder="+212 6 00 00 00 00"
          />
        </Field>
      </div>

      <div className="form__row">
        <Field id="country" label={t.country} error={errors.country}>
          <select id="country" name="country" value={values.country} onChange={set('country')}>
            <option value="">{t.countryPlaceholder}</option>
            {t.countries.map((c) => (
              <option key={c.value} value={c.value}>
                {c.label}
              </option>
            ))}
          </select>
        </Field>

        <Field id="company" label={t.company} error={errors.company}>
          <input
            id="company"
            name="company"
            type="text"
            autoComplete="organization"
            value={values.company}
            onChange={set('company')}
            placeholder={t.companyPlaceholder}
          />
        </Field>

        <Field id="job_title" label={t.jobTitle} error={errors.job_title}>
          <input
            id="job_title"
            name="job_title"
            type="text"
            autoComplete="organization-title"
            value={values.job_title}
            onChange={set('job_title')}
            placeholder={t.jobTitlePlaceholder}
          />
        </Field>
      </div>

      <div className="form__row">
        <Field
          id="service_requested"
          label={t.service}
          requiredLabel={t.required}
          required
          error={errors.service_requested}
        >
          <select
            id="service_requested"
            name="service_requested"
            value={values.service_requested}
            onChange={set('service_requested')}
            aria-invalid={Boolean(errors.service_requested)}
            required
          >
            <option value="">{t.servicePlaceholder}</option>
            {t.serviceOptions.map((o) => (
              <option key={o.value} value={o.value}>
                {o.label}
              </option>
            ))}
          </select>
        </Field>

        <Field id="budget" label={t.budget} error={errors.budget}>
          <select id="budget" name="budget" value={values.budget} onChange={set('budget')}>
            <option value="">{t.budgetPlaceholder}</option>
            {t.budgetOptions.map((o) => (
              <option key={o.value} value={o.value}>
                {o.label}
              </option>
            ))}
          </select>
        </Field>
      </div>

      <Field
        id="message"
        label={t.message}
        error={errors.message}
        hint={t.messageHint}
      >
        <textarea
          id="message"
          name="message"
          value={values.message}
          onChange={set('message')}
          aria-invalid={Boolean(errors.message)}
          placeholder={t.messagePlaceholder}
          rows={5}
        />
      </Field>

      {siteKey && (
        <div
          className="cf-turnstile"
          data-sitekey={siteKey}
          data-theme="dark"
          aria-label={t.captchaLabel}
        />
      )}

      <div className="consent">
        <input id="consent" name="consent" type="checkbox" required />
        <label htmlFor="consent">
          {t.consent}{' '}
          <a href={localePath(locale, '/privacy')}>{t.privacyLink}</a>
        </label>
      </div>
      {errors.consent && <p className="field__error">{errors.consent}</p>}

      {status === 'error' && feedback && (
        <div className="form__status form__status--err" role="alert">
          <IconAlert size={20} />
          <span>
            <b>{t.errorTitle}</b>
            {feedback}
          </span>
        </div>
      )}

      <button
        type="submit"
        className="btn btn--primary btn--lg btn--block"
        disabled={status === 'submitting'}
      >
        {status === 'submitting' ? (
          <>
            <span className="spinner" aria-hidden="true" />
            {t.submitting}
          </>
        ) : (
          <>
            {t.submit}
            <IconArrowRight size={17} />
          </>
        )}
      </button>

      <p className="field__hint" style={{ textAlign: 'center' }}>
        {t.footnote}
      </p>
    </form>
  );
}

function Field({
  id,
  label,
  required,
  requiredLabel,
  error,
  hint,
  children,
}: {
  id: string;
  label: string;
  required?: boolean;
  requiredLabel?: string;
  error?: string;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="field">
      <label htmlFor={id}>
        {label}
        {required && (
          <span className="req" aria-hidden="true">
            *
          </span>
        )}
        {required && <span className="sr-only"> {requiredLabel}</span>}
      </label>
      {children}
      {hint && !error && <span className="field__hint">{hint}</span>}
      {error && (
        <span className="field__error" role="alert">
          {error}
        </span>
      )}
    </div>
  );
}
