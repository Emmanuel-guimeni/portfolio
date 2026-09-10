'use client';

import { useEffect, useRef, useState, type FormEvent } from 'react';
import { HONEYPOT_FIELD, TIMESTAMP_FIELD } from '@/lib/antispam';
import { BUDGET_OPTIONS, SERVICE_OPTIONS } from '@/lib/leads';
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

/** A short, honest country list — Emmanuel's main markets first, then "Other". */
const COUNTRIES = [
  'Morocco', 'Cameroon', 'Congo', 'Gabon', 'Chad',
  'Central African Republic', 'Equatorial Guinea', 'Ivory Coast', 'Senegal',
  'France', 'Belgium', 'Switzerland', 'Canada', 'United States',
  'United Kingdom', 'Other',
];

export default function LeadForm() {
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

  // "Request this service" on a service card pre-selects the right option.
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

  /** Mirrors src/lib/validation.ts. The server is still the authority. */
  function validate(): Record<string, string> {
    const next: Record<string, string> = {};
    if (values.first_name.trim().length < 2) next.first_name = 'Please enter your first name.';
    if (values.last_name.trim().length < 2) next.last_name = 'Please enter your last name.';
    if (!/^[^\s@]+@[^\s@.]+(\.[^\s@.]+)+$/.test(values.email.trim())) {
      next.email = 'Please enter a valid email address.';
    }
    if (!values.service_requested) next.service_requested = 'Please tell me what you are looking for.';
    const consent = formRef.current?.querySelector<HTMLInputElement>('#consent');
    if (!consent?.checked) next.consent = 'Your consent is required.';
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
        error?: string;
        errors?: Record<string, string>;
        message?: string;
      };

      if (!res.ok || !data.ok) {
        setStatus('error');
        setErrors(data.errors ?? {});
        setFeedback(data.error ?? 'Something went wrong. Please try again.');
        return;
      }

      setStatus('success');
      setFeedback(data.message ?? 'Thank you — your request has been received.');
      track('form_submit', { form: 'lead', service: values.service_requested });
      track(
        values.service_requested.includes('Audit') ? 'audit_request' : 'consulting_request',
        { service: values.service_requested, location: 'form' },
      );
      setValues({ ...EMPTY });
      startedRef.current = false;
    } catch {
      setStatus('error');
      setFeedback(
        'Network error. Please check your connection, or email me at christguimeni@gmail.com.',
      );
    }
  }

  const siteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;

  if (status === 'success') {
    return (
      <div className="form" role="status" aria-live="polite">
        <div className="form__status form__status--ok">
          <IconCheck size={20} />
          <span>
            <b>Request received.</b>
            {feedback} I read every submission personally and normally reply within one
            business day. If it is urgent, WhatsApp is the fastest route.
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
          Send another request
        </button>
      </div>
    );
  }

  return (
    <form className="form" ref={formRef} onSubmit={onSubmit} noValidate>
      {/* Honeypot — hidden from humans, irresistible to naive bots */}
      <div className="hp" aria-hidden="true">
        <label htmlFor={HONEYPOT_FIELD}>Leave this field empty</label>
        <input
          id={HONEYPOT_FIELD}
          name={HONEYPOT_FIELD}
          type="text"
          tabIndex={-1}
          autoComplete="off"
        />
      </div>

      <div className="form__row">
        <Field id="first_name" label="First name" required error={errors.first_name}>
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

        <Field id="last_name" label="Last name" required error={errors.last_name}>
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
          label="Professional email"
          required
          error={errors.email}
          hint="A company domain scores higher than a free mailbox."
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

        <Field id="phone" label="Phone / WhatsApp" error={errors.phone}>
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
        <Field id="country" label="Country" error={errors.country}>
          <select id="country" name="country" value={values.country} onChange={set('country')}>
            <option value="">Select a country</option>
            {COUNTRIES.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </Field>

        <Field id="company" label="Company" error={errors.company}>
          <input
            id="company"
            name="company"
            type="text"
            autoComplete="organization"
            value={values.company}
            onChange={set('company')}
            placeholder="Company name"
          />
        </Field>

        <Field id="job_title" label="Job title" error={errors.job_title}>
          <input
            id="job_title"
            name="job_title"
            type="text"
            autoComplete="organization-title"
            value={values.job_title}
            onChange={set('job_title')}
            placeholder="Marketing Manager"
          />
        </Field>
      </div>

      <div className="form__row">
        <Field
          id="service_requested"
          label="What are you looking for?"
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
            <option value="">Select a service</option>
            {SERVICE_OPTIONS.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </Field>

        <Field id="budget" label="Budget" error={errors.budget}>
          <select id="budget" name="budget" value={values.budget} onChange={set('budget')}>
            <option value="">Select a range</option>
            {BUDGET_OPTIONS.map((b) => (
              <option key={b} value={b}>
                {b}
              </option>
            ))}
          </select>
        </Field>
      </div>

      <Field
        id="message"
        label="Tell me about your project or challenge"
        error={errors.message}
        hint="What you are trying to automate, what is slowing you down, what you have already tried."
      >
        <textarea
          id="message"
          name="message"
          value={values.message}
          onChange={set('message')}
          aria-invalid={Boolean(errors.message)}
          placeholder="We publish content manually, our leads land in a spreadsheet and nobody follows up. We would like…"
          rows={5}
        />
      </Field>

      {siteKey && (
        <div
          className="cf-turnstile"
          data-sitekey={siteKey}
          data-theme="dark"
          aria-label="Anti-spam verification"
        />
      )}

      <div className="consent">
        <input id="consent" name="consent" type="checkbox" required />
        <label htmlFor="consent">
          I agree that my information may be used to contact me regarding my request.{' '}
          <a href="/privacy">Privacy Policy</a>
        </label>
      </div>
      {errors.consent && <p className="field__error">{errors.consent}</p>}

      {status === 'error' && feedback && (
        <div className="form__status form__status--err" role="alert">
          <IconAlert size={20} />
          <span>
            <b>Your request was not sent.</b>
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
            Sending…
          </>
        ) : (
          <>
            Request My Consultation
            <IconArrowRight size={17} />
          </>
        )}
      </button>

      <p className="field__hint" style={{ textAlign: 'center' }}>
        Validated, stored, scored and notified automatically — the exact lead pipeline
        described further up this page.
      </p>
    </form>
  );
}

function Field({
  id,
  label,
  required,
  error,
  hint,
  children,
}: {
  id: string;
  label: string;
  required?: boolean;
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
        {required && <span className="sr-only"> (required)</span>}
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
