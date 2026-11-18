import type { ReactNode } from 'react';
import { ArrowUpRight, Download, Github, Linkedin, Mail, MapPin, Phone } from 'lucide-react';
import { profile } from '../data/profile';
import ContactForm from './ContactForm';
import { Reveal } from './ui';

export default function Contact() {
  return (
    <section id="contact" className="relative scroll-mt-28 py-14 md:py-20 lg:py-24">
      <div className="mx-auto w-full max-w-[1380px] px-5 md:px-8">
        <Reveal>
          <p className="mb-3 text-[13px] font-semibold uppercase tracking-[0.18em] text-sky">Contact</p>
          <h2 className="text-[32px] font-extrabold leading-[1.1] tracking-tight text-text sm:text-[40px] md:text-[48px]">
            Let&apos;s <span className="text-gradient">Connect</span>
          </h2>
          <p className="mt-4 max-w-[620px] text-[16px] leading-relaxed text-text-2 md:text-[18px]">
            Have an opportunity, project idea or collaboration in mind? I&apos;d love to hear from you.
          </p>
        </Reveal>

        <div className="mt-10 grid gap-8 lg:grid-cols-[1fr_1.35fr] lg:gap-10">
          <Reveal className="space-y-4">
            <ul className="glass divide-y divide-border rounded-3xl">
              <ContactRow icon={<Mail size={18} strokeWidth={1.75} />} href={`mailto:${profile.email}`} text={profile.email} />
              <ContactRow icon={<Phone size={18} strokeWidth={1.75} />} href={`tel:${profile.phone.replace(/\s/g, '')}`} text={profile.phone} />
              <ContactRow icon={<MapPin size={18} strokeWidth={1.75} />} text={profile.location} />
              <ContactRow icon={<Linkedin size={18} strokeWidth={1.75} />} href={profile.links.linkedin} text="LinkedIn" external />
              <ContactRow icon={<Github size={18} strokeWidth={1.75} />} href={profile.links.github} text="GitHub" external />
            </ul>
            <a
              href={profile.links.resumeDownload}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-ghost inline-flex h-12 w-full items-center justify-center gap-2 rounded-xl px-6 text-[15px] font-semibold"
            >
              <Download size={18} strokeWidth={1.75} aria-hidden="true" />
              Download Resume
            </a>
          </Reveal>

          <Reveal delay={0.1}>
            <ContactForm />
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function ContactRow({
  icon,
  text,
  href,
  external = false,
}: {
  icon: ReactNode;
  text: string;
  href?: string;
  external?: boolean;
}) {
  const inner = (
    <>
      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary/15 text-sky">{icon}</span>
      <span className="flex-1 truncate text-[15px] text-text">{text}</span>
      {href && <ArrowUpRight size={16} strokeWidth={1.75} className="text-muted" aria-hidden="true" />}
    </>
  );
  const cls = 'flex items-center gap-3.5 px-5 py-4';
  return (
    <li>
      {href ? (
        <a
          href={href}
          target={external ? '_blank' : undefined}
          rel={external ? 'noopener noreferrer' : undefined}
          className={`${cls} transition-colors duration-200 hover:bg-primary/10 hover:text-sky`}
        >
          {inner}
        </a>
      ) : (
        <div className={cls}>{inner}</div>
      )}
    </li>
  );
}
