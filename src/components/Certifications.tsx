import { ArrowUpRight, BadgeCheck, ChevronDown } from 'lucide-react';
import { credentials, primaryCertificate } from '../data/certifications';
import { Reveal, Section } from './ui';

export default function Certifications() {
  const c = primaryCertificate;

  return (
    <Section
      id="certifications"
      eyebrow="Certifications"
      title={
        <>
          Verified <span className="text-gradient">credentials</span>
        </>
      }
      intro="Professional certificates, each with a verification link."
    >
      <Reveal>
        <article className="glass-strong glow-ring relative overflow-hidden rounded-3xl border-electric/30 p-6 md:p-8">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -right-20 -top-20 h-72 w-72 rounded-full"
            style={{ background: 'radial-gradient(circle, rgba(37,99,235,0.25), transparent 70%)' }}
          />

          <div className="relative flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
            <div className="flex items-start gap-4">
              <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-[linear-gradient(135deg,#2563EB,#00A3FF)] text-white shadow-[0_8px_24px_rgba(37,99,235,0.4)]">
                <BadgeCheck size={28} strokeWidth={1.75} aria-hidden="true" />
              </span>
              <div>
                <p className="text-[13px] font-semibold uppercase tracking-[0.14em] text-sky">Primary certificate</p>
                <h3 className="mt-1.5 text-[22px] font-bold leading-snug text-text md:text-[26px]">{c.name}</h3>
                <p className="mt-1 text-[15px] text-text-2">
                  {c.issuer} · {c.platform} · {c.date}
                </p>
              </div>
            </div>
          </div>

          <dl className="relative mt-6 grid gap-4 border-t border-sky/15 pt-6 sm:grid-cols-2">
            <div>
              <dt className="text-[13px] text-muted">Credential ID</dt>
              <dd className="mt-1 font-mono text-[16px] font-semibold tracking-wide text-text">{c.credentialId}</dd>
            </div>
            <div>
              <dt className="text-[13px] text-muted">Verification</dt>
              <dd className="mt-1">
                <a
                  href={c.verifyUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 break-all text-[15px] font-semibold text-sky transition-colors duration-200 hover:text-text"
                >
                  Verify credential
                  <ArrowUpRight size={16} strokeWidth={1.75} className="shrink-0" aria-hidden="true" />
                </a>
              </dd>
            </div>
          </dl>

          <details className="group relative mt-6 rounded-2xl border border-sky/15 bg-bg-2/60">
            <summary className="flex cursor-pointer list-none items-center justify-between px-5 py-3.5 text-[15px] font-semibold text-text transition-colors duration-200 hover:text-sky [&::-webkit-details-marker]:hidden">
              Included courses ({c.courses.length})
              <ChevronDown
                size={18}
                strokeWidth={1.75}
                className="text-sky transition-transform duration-300 group-open:rotate-180"
                aria-hidden="true"
              />
            </summary>
            <ul className="grid gap-2.5 border-t border-sky/10 p-4 sm:grid-cols-2">
              {c.courses.map((course) => (
                <li
                  key={course}
                  className="tag flex items-center gap-2.5 rounded-xl px-3.5 py-2.5 text-[14px] text-text"
                >
                  <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-electric" aria-hidden="true" />
                  {course}
                </li>
              ))}
            </ul>
          </details>
        </article>
      </Reveal>

      <ul className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {credentials.map((cred) => (
          <li key={cred.name}>
            <a
                href={cred.url}
                target="_blank"
                rel="noopener noreferrer"
                className="glass group flex h-full flex-col justify-between gap-6 rounded-2xl p-5 transition-all duration-300 hover:-translate-y-1 hover:border-electric/50 hover:shadow-[0_14px_36px_rgba(0,163,255,0.12)]"
              >
                <div className="flex items-start justify-between gap-3">
                  <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary/15 text-sky">
                    <BadgeCheck size={18} strokeWidth={1.75} aria-hidden="true" />
                  </span>
                  <ArrowUpRight
                    size={18}
                    strokeWidth={1.75}
                    className="text-muted transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-sky"
                    aria-hidden="true"
                  />
                </div>
                <div>
                  <p className="text-[15px] font-semibold leading-snug text-text">{cred.name}</p>
                  <p className="mt-1 text-[13px] text-text-2">{cred.issuer}</p>
                </div>
            </a>
          </li>
        ))}
      </ul>
    </Section>
  );
}
