import { motion, useReducedMotion } from 'motion/react';
import { ArrowRight, ArrowUpRight, ChevronDown, Github } from 'lucide-react';
import { projects, type Project } from '../data/projects';
import { asset } from '../lib/asset';
import { Section, Tag } from './ui';

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
};
const cardIn = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.22, 0.7, 0.2, 1] as const } },
};

export default function Projects() {
  // The first two projects are featured and span the full width.
  const [first, second, ...rest] = projects;
  const reduce = useReducedMotion();

  return (
    <Section
      id="projects"
      eyebrow="Projects"
      title={
        <>
          Selected <span className="text-gradient">work</span>
        </>
      }
      intro="Case studies with the problem each project solves, what I built and the stack behind it."
    >
      <motion.div
        variants={reduce ? undefined : container}
        initial={reduce ? false : 'hidden'}
        whileInView="show"
        viewport={{ once: true, amount: 0.1 }}
        className="grid gap-6 md:grid-cols-2"
      >
        {[first, second].map((p) => (
          <motion.div key={p.id} variants={reduce ? undefined : cardIn} className="md:col-span-2">
            <ProjectCard project={p} featured />
          </motion.div>
        ))}
        {rest.map((p) => (
          <motion.div key={p.id} variants={reduce ? undefined : cardIn} className="flex">
            <ProjectCard project={p} />
          </motion.div>
        ))}
      </motion.div>
    </Section>
  );
}

function ProjectCard({ project, featured = false }: { project: Project; featured?: boolean }) {
  const reduce = useReducedMotion();
  const shot = project.screenshots?.[0];

  return (
    <motion.article
      whileHover={reduce ? undefined : { y: -6 }}
      transition={{ duration: 0.25, ease: [0.22, 0.7, 0.2, 1] }}
      className="group glass relative flex w-full flex-col overflow-hidden rounded-3xl p-5 transition-[border-color,box-shadow] duration-300 hover:border-electric/50 hover:shadow-[0_18px_50px_rgba(0,163,255,0.14)] md:p-7"
    >
      {/* Ambient glow that strengthens on hover */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-24 -top-24 h-64 w-64 rounded-full opacity-60 transition-opacity duration-500 group-hover:opacity-100"
        style={{ background: 'radial-gradient(circle, rgba(37,99,235,0.22), transparent 70%)' }}
      />

      <div className={featured && shot ? 'grid gap-8 lg:grid-cols-[1.05fr_1fr] lg:items-start' : 'flex flex-col gap-5'}>
        <div className="relative flex flex-col gap-4">
          <h3 className={`font-bold leading-snug text-text ${featured ? 'text-[24px] md:text-[26px]' : 'text-[22px]'}`}>
            {project.name}
          </h3>
          <p className="text-[15px] leading-relaxed text-text-2">{project.summary}</p>

          {project.contribution && (
            <div className="rounded-2xl border border-sky/10 bg-bg-2/60 p-4">
              <p className="text-[13px] font-semibold text-sky">My contribution</p>
              <p className="mt-1.5 text-[15px] leading-relaxed text-text-2">{project.contribution}</p>
            </div>
          )}

          <div className="flex flex-wrap gap-2" aria-label="Technology">
            {project.tags.map((t) => (
              <Tag key={t}>{t}</Tag>
            ))}
          </div>

          <div className="flex flex-wrap items-center gap-x-5 gap-y-3 pt-1">
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-ghost inline-flex h-10 items-center gap-2 rounded-xl px-4 text-[14px] font-semibold"
            >
              <Github size={17} strokeWidth={1.75} aria-hidden="true" />
              GitHub
            </a>
            {project.live && (
              <a
                href={project.live}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary inline-flex h-10 items-center gap-2 rounded-xl px-4 text-[14px] font-semibold"
              >
                Live demo
                <ArrowUpRight size={17} strokeWidth={1.75} aria-hidden="true" />
              </a>
            )}
          </div>

          {project.caseStudy && (
            <details className="group/cs rounded-2xl border border-sky/15 bg-bg-2/50">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-3 px-4 py-3 text-[15px] font-semibold text-text transition-colors duration-200 hover:text-sky [&::-webkit-details-marker]:hidden">
                Case study
                <ChevronDown
                  size={18}
                  strokeWidth={1.75}
                  className="text-sky transition-transform duration-300 group-open/cs:rotate-180"
                  aria-hidden="true"
                />
              </summary>
              <div className="space-y-4 border-t border-sky/10 px-4 py-4 text-[15px] leading-relaxed">
                <CaseBlock label="Problem" text={project.caseStudy.problem} />
                <CaseBlock label="Solution" text={project.caseStudy.solution} />
                <CaseBlock label="Result" text={project.caseStudy.result} />
                <div>
                  <p className="font-semibold text-text">Key features</p>
                  <ul className="mt-2 space-y-1.5 text-text-2">
                    {project.caseStudy.features.map((f) => (
                      <li key={f} className="flex gap-2.5">
                        <span className="mt-2.5 h-1 w-3 shrink-0 rounded-full bg-electric" aria-hidden="true" />
                        {f}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </details>
          )}

          <span className="mt-1 inline-flex items-center gap-1.5 text-[13px] font-medium text-muted transition-all duration-300 group-hover:gap-2.5 group-hover:text-sky">
            View on GitHub
            <ArrowRight size={15} strokeWidth={1.75} aria-hidden="true" />
          </span>
        </div>

        <ProjectVisual project={project} screenshot={shot} featured={featured} />
      </div>
    </motion.article>
  );
}

/** Real screenshot where one exists; otherwise a neutral visual panel (no fake screenshots). */
function ProjectVisual({ project, screenshot, featured }: { project: Project; screenshot?: string; featured: boolean }) {
  const initials = project.name
    .split(/[\s&—-]+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0]?.toUpperCase())
    .join('');

  return (
    <div
      className={`relative overflow-hidden rounded-2xl border border-sky/15 bg-bg-2 ${
        featured && screenshot ? 'order-first lg:order-none' : 'order-first'
      } ${screenshot ? '' : 'h-44 md:h-52'}`}
    >
      {screenshot ? (
        <img
          src={asset(screenshot)}
          alt={`${project.name} screenshot`}
          loading="lazy"
          className="aspect-video w-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-[1.04]"
        />
      ) : (
        <div className="relative flex h-full w-full items-center justify-center">
          <div className="grid-pattern absolute inset-0 opacity-80" />
          <div
            className="absolute h-44 w-44 rounded-full blur-2xl transition-transform duration-700 group-hover:scale-110"
            style={{ background: 'radial-gradient(circle, rgba(0,163,255,0.35), transparent 70%)' }}
          />
          <span className="relative text-[56px] font-extrabold tracking-tight text-gradient transition-transform duration-500 group-hover:scale-105">
            {initials}
          </span>
          <div className="absolute inset-x-4 bottom-4 flex flex-wrap gap-1.5">
            {project.tags.slice(0, 4).map((t) => (
              <span key={t} className="glass rounded-md px-2 py-0.5 text-[12px] text-text-2">
                {t}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function CaseBlock({ label, text }: { label: string; text: string }) {
  return (
    <div>
      <p className="font-semibold text-text">{label}</p>
      <p className="mt-1 text-text-2">{text}</p>
    </div>
  );
}
