import { ArrowUpRight, Briefcase } from 'lucide-react';
import { experience } from '../data/experience';
import { Reveal, Section, Tag } from './ui';

export default function Experience() {
  return (
    <Section
      id="experience"
      eyebrow="Experience"
      title={
        <>
          Where I&apos;ve <span className="text-gradient">worked</span>
        </>
      }
      intro="Internships and training, with the work I did in each."
    >
      <div className="relative ml-2 space-y-8 md:ml-4">
        {/* Blue timeline line */}
        <span
          aria-hidden="true"
          className="absolute bottom-2 left-[7px] top-2 w-px bg-gradient-to-b from-electric via-primary to-transparent shadow-[0_0_12px_rgba(0,163,255,0.5)] md:left-[9px]"
        />

        {experience.map((item, i) => (
          <Reveal key={`${item.organisation}-${item.role}`} delay={i * 0.08}>
            <div className="relative grid gap-4 pl-10 md:grid-cols-[150px_1fr] md:gap-8 md:pl-12">
              {/* Glowing timeline point */}
              <span
                aria-hidden="true"
                className="absolute left-0 top-2 flex h-4 w-4 items-center justify-center rounded-full border-2 border-electric bg-bg shadow-[0_0_16px_rgba(0,163,255,0.7)] md:left-[1px]"
              >
                <span className="h-1.5 w-1.5 rounded-full bg-electric" />
              </span>

              <p className="pt-1 text-[15px] font-semibold text-sky">{item.duration}</p>

              <div
                className={`glass rounded-3xl p-6 transition-[border-color,box-shadow,transform] duration-300 hover:-translate-y-1 hover:border-electric/50 hover:shadow-[0_16px_40px_rgba(0,163,255,0.12)] md:p-7 ${item.proof ? 'relative cursor-pointer' : ''}`}
              >
                <div className="flex flex-wrap items-start justify-between gap-4">
                  <div className="flex items-start gap-3">
                    <span className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/15 text-sky">
                      <Briefcase size={19} strokeWidth={1.75} aria-hidden="true" />
                    </span>
                    <div>
                      <h3 className="text-[19px] font-bold text-text md:text-[21px]">{item.role}</h3>
                      <p className="text-[15px] font-medium text-text-2">{item.organisation}</p>
                    </div>
                  </div>
                  {item.proof && (
                    <a
                      href={item.proof}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`View certificate for ${item.role} at ${item.organisation}`}
                      className="inline-flex items-center gap-1 rounded-lg text-[14px] font-semibold text-sky transition-colors duration-200 hover:text-text after:absolute after:inset-0 after:rounded-3xl after:content-['']"
                    >
                      View certificate
                      <ArrowUpRight size={16} strokeWidth={1.75} aria-hidden="true" />
                    </a>
                  )}
                </div>

                <ul className="mt-5 space-y-2.5 text-[15px] leading-relaxed text-text-2">
                  {item.responsibilities.map((r) => (
                    <li key={r} className="flex gap-3">
                      <span className="mt-2.5 h-1 w-3 shrink-0 rounded-full bg-electric" aria-hidden="true" />
                      {r}
                    </li>
                  ))}
                </ul>

                <div className="mt-5 flex flex-wrap gap-2">
                  {item.tags.map((t) => (
                    <Tag key={t}>{t}</Tag>
                  ))}
                </div>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
