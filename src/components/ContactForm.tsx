import { useState, type FormEvent, type ReactNode } from 'react';
import { AlertCircle, CheckCircle2, Loader2, Send } from 'lucide-react';

type Values = { name: string; email: string; subject: string; message: string };
type Errors = Partial<Record<keyof Values, string>>;
type Status = 'idle' | 'sending' | 'success' | 'error';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

/** Returns an error message for one field, or undefined when it is valid. */
function validate(name: keyof Values, value: string): string | undefined {
  const v = value.trim();
  switch (name) {
    case 'name':
      if (!v) return 'Please enter your name.';
      if (v.length < 2) return 'Name must be at least 2 characters.';
      return undefined;
    case 'email':
      if (!v) return 'Please enter your email address.';
      if (!EMAIL_RE.test(v)) return 'Please enter a valid email address.';
      return undefined;
    case 'subject':
      if (!v) return 'Please enter a subject.';
      if (v.length < 3) return 'Subject must be at least 3 characters.';
      return undefined;
    case 'message':
      if (!v) return 'Please enter a message.';
      if (v.length < 10) return 'Message must be at least 10 characters.';
      return undefined;
  }
}

// Set at build time from VITE_FORMSPREE_ENDPOINT (see .env.example and README).
const ENDPOINT: string | undefined = import.meta.env.VITE_FORMSPREE_ENDPOINT?.trim() || undefined;

const fieldClass =
  'w-full rounded-xl border bg-bg-2/70 px-4 py-3 text-[15px] text-text placeholder:text-muted outline-none transition-[border-color,box-shadow] duration-200 focus:border-electric focus:shadow-[0_0_0_4px_rgba(0,140,255,0.18)]';

export default function ContactForm() {
  const [values, setValues] = useState<Values>({ name: '', email: '', subject: '', message: '' });
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<Status>('idle');
  const [serverError, setServerError] = useState('');
  const [honeypot, setHoneypot] = useState('');

  const setField = (name: keyof Values, value: string) => {
    setValues((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: validate(name, value) }));
  };

  const blurField = (name: keyof Values) => {
    setErrors((prev) => ({ ...prev, [name]: validate(name, values[name]) }));
  };

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (status === 'sending') return; // block duplicate submissions

    const next: Errors = {};
    (Object.keys(values) as (keyof Values)[]).forEach((k) => {
      const msg = validate(k, values[k]);
      if (msg) next[k] = msg;
    });
    setErrors(next);
    const firstInvalid = (['name', 'email', 'subject', 'message'] as const).find((k) => next[k]);
    if (firstInvalid) {
      // Focus after React has re-rendered the error state.
      window.setTimeout(() => document.getElementById(firstInvalid)?.focus(), 0);
      return;
    }

    if (!ENDPOINT) {
      setStatus('error');
      setServerError(
        'The contact form is not configured yet. Set VITE_FORMSPREE_ENDPOINT to your Formspree endpoint, or email me directly.',
      );
      return;
    }

    setStatus('sending');
    setServerError('');
    try {
      const body = new FormData();
      body.append('name', values.name.trim());
      body.append('_replyto', values.email.trim());
      body.append('email', values.email.trim());
      body.append('subject', values.subject.trim());
      body.append('message', values.message.trim());
      body.append('_subject', `Portfolio contact: ${values.subject.trim()}`);
      body.append('_gotcha', honeypot); // Formspree spam trap; must stay empty for humans

      const res = await fetch(ENDPOINT, {
        method: 'POST',
        body,
        headers: { Accept: 'application/json' },
      });

      if (res.ok) {
        setStatus('success');
        setValues({ name: '', email: '', subject: '', message: '' });
        setErrors({});
      } else {
        const json = (await res.json().catch(() => ({}))) as { errors?: { message: string }[] };
        setServerError(
          json.errors?.map((x) => x.message).join(' ') ||
            'Your message could not be sent. Please try again, or email me directly.',
        );
        setStatus('error');
      }
    } catch {
      setServerError('Network error. Check your connection and try again, or email me directly.');
      setStatus('error');
    }
  }

  const invalid = (k: keyof Values) => (errors[k] ? true : undefined);

  return (
    <form onSubmit={onSubmit} noValidate className="glass-strong rounded-3xl p-6 md:p-8" aria-label="Contact form">
      {/* Honeypot: hidden from people, visible to bots */}
      <div className="hidden" aria-hidden="true">
        <label>
          Leave this empty
          <input tabIndex={-1} autoComplete="off" value={honeypot} onChange={(e) => setHoneypot(e.target.value)} />
        </label>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <Field id="name" label="Full Name" error={errors.name}>
          <input
            id="name"
            className={`${fieldClass} ${errors.name ? 'border-red-400/70' : 'border-border'}`}
            value={values.name}
            onChange={(e) => setField('name', e.target.value)}
            onBlur={() => blurField('name')}
            autoComplete="name"
            aria-invalid={invalid('name')}
            aria-describedby={errors.name ? 'name-error' : undefined}
            placeholder="e.g. Rahul Sharma"
          />
        </Field>
        <Field id="email" label="Email Address" error={errors.email}>
          <input
            id="email"
            type="email"
            className={`${fieldClass} ${errors.email ? 'border-red-400/70' : 'border-border'}`}
            value={values.email}
            onChange={(e) => setField('email', e.target.value)}
            onBlur={() => blurField('email')}
            autoComplete="email"
            aria-invalid={invalid('email')}
            aria-describedby={errors.email ? 'email-error' : undefined}
            placeholder="you@example.com"
          />
        </Field>
      </div>

      <div className="mt-5">
        <Field id="subject" label="Subject" error={errors.subject}>
          <input
            id="subject"
            className={`${fieldClass} ${errors.subject ? 'border-red-400/70' : 'border-border'}`}
            value={values.subject}
            onChange={(e) => setField('subject', e.target.value)}
            onBlur={() => blurField('subject')}
            aria-invalid={invalid('subject')}
            aria-describedby={errors.subject ? 'subject-error' : undefined}
            placeholder="e.g. Full-time opportunity"
          />
        </Field>
      </div>

      <div className="mt-5">
        <Field id="message" label="Message" error={errors.message}>
          <textarea
            id="message"
            rows={5}
            className={`${fieldClass} resize-y ${errors.message ? 'border-red-400/70' : 'border-border'}`}
            value={values.message}
            onChange={(e) => setField('message', e.target.value)}
            onBlur={() => blurField('message')}
            aria-invalid={invalid('message')}
            aria-describedby={errors.message ? 'message-error' : undefined}
            placeholder="Tell me about the opportunity, project or idea…"
          />
        </Field>
      </div>

      <div className="mt-7 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <button
          type="submit"
          disabled={status === 'sending'}
          aria-busy={status === 'sending'}
          className="btn-primary inline-flex h-12 items-center justify-center gap-2 rounded-xl px-7 text-[15px] font-semibold"
        >
          {status === 'sending' ? (
            <>
              <Loader2 size={18} className="animate-spin" aria-hidden="true" />
              Sending…
            </>
          ) : (
            <>
              <Send size={18} strokeWidth={1.75} aria-hidden="true" />
              Send Message
            </>
          )}
        </button>
        <p className="text-[13px] text-muted">Sent straight to my inbox.</p>
      </div>

      <div role="status" aria-live="polite" className="mt-5 empty:hidden">
        {status === 'success' && (
          <p className="flex items-start gap-3 rounded-xl border border-electric/40 bg-primary/10 p-4 text-[15px] text-text">
            <CheckCircle2 size={20} className="mt-0.5 shrink-0 text-electric" aria-hidden="true" />
            Thanks, your message was sent. I&apos;ll reply as soon as I can.
          </p>
        )}
        {status === 'error' && serverError && (
          <p className="flex items-start gap-3 rounded-xl border border-red-400/30 bg-red-400/10 p-4 text-[15px] text-text">
            <AlertCircle size={20} className="mt-0.5 shrink-0 text-red-400" aria-hidden="true" />
            {serverError}
          </p>
        )}
      </div>
    </form>
  );
}

function Field({
  id,
  label,
  error,
  children,
}: {
  id: string;
  label: string;
  error?: string;
  children: ReactNode;
}) {
  return (
    <div>
      <label htmlFor={id} className="mb-2 block text-[14px] font-semibold text-text">
        {label} <span className="text-sky">*</span>
      </label>
      {children}
      {error && (
        <p id={`${id}-error`} className="mt-1.5 text-[13px] text-red-400">
          {error}
        </p>
      )}
    </div>
  );
}
