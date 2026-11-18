import { ArrowUpRight, Brain, Cloud, Code2, Layers, Server, Wrench, type LucideIcon } from 'lucide-react';
import { competitive, skillGroups } from '../data/skills';
import { Reveal, Section } from './ui';

const icons: Record<string, LucideIcon> = {
  Programming: Code2,
  Frontend: Layers,
  Backend: Server,
  'Data & AI': Brain,
  'Tools & Platforms': Wrench,
};

export default function Skills() {
  return (
    <Section
      id="skills"
      eyebrow="Skills"
      title={
        <>
          Tech <span className="text-gradient">stack</span>
        </>
      }
      intro="The languages, frameworks and tools I use, grouped by area."
    >
      <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {skillGroups.map((group, i) => {
          const Icon = icons[group.title] ?? Cloud;
          return (
            <Reveal key={group.title} delay={i * 0.05}>
              <div className="glass group h-full rounded-3xl p-6 transition-[border-color,box-shadow,transform] duration-300 hover:-translate-y-1 hover:border-electric/50 hover:shadow-[0_14px_36px_rgba(0,163,255,0.12)]">
                <div className="flex items-center gap-3">
                  <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/15 text-sky transition-colors duration-300 group-hover:bg-primary/25">
                    <Icon size={20} strokeWidth={1.75} aria-hidden="true" />
                  </span>
                  <h3 className="text-[17px] font-bold text-text">{group.title}</h3>
                </div>
                <div className="mt-5 flex flex-wrap gap-2">
                  {group.items.map((item) => (
                    <span key={item} className="tag rounded-lg px-2.5 py-1 text-[13px] font-medium">
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            </Reveal>
          );
        })}
      </div>

      <Reveal className="mt-10">
        <h3 className="mb-4 text-[17px] font-bold text-text">Competitive programming</h3>
        <ul className="grid gap-4 sm:grid-cols-3">
          {competitive.map((item) => (
            <li key={item.name}>
              <a
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                className="glass group flex items-center justify-between gap-4 rounded-2xl p-5 transition-all duration-300 hover:-translate-y-1 hover:border-electric/50"
              >
                <span>
                  <span className="block text-[16px] font-semibold text-text">{item.name}</span>
                  <span className="block text-[14px] text-text-2">{item.value}</span>
                </span>
                <ArrowUpRight
                  size={19}
                  strokeWidth={1.75}
                  className="shrink-0 text-muted transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-sky"
                  aria-hidden="true"
                />
              </a>
            </li>
          ))}
        </ul>
      </Reveal>
    </Section>
  );
}
