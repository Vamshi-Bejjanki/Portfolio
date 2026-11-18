import type { ReactNode } from 'react';
import { GraduationCap, Layers, Target } from 'lucide-react';
import { profile } from '../data/profile';
import { Reveal, Section } from './ui';

export default function About() {
  return (
    <Section id="about" eyebrow="About" title={<>Who I <span className="text-gradient">am</span></>}>
      <div className="grid gap-6 lg:grid-cols-[1.25fr_1fr]">
        <Reveal className="glass rounded-3xl p-6 md:p-8">
          <p className="text-[19px] font-semibold leading-snug text-text md:text-[22px]">{profile.about[0]}</p>
          <div className="mt-5 space-y-4 text-[15px] leading-relaxed text-text-2 md:text-[16px]">
            {profile.about.slice(1).map((p) => (
              <p key={p}>{p}</p>
            ))}
          </div>
        </Reveal>

        <Reveal delay={0.1} className="grid gap-4">
          <InfoCard icon={<GraduationCap size={20} strokeWidth={1.75} />} title="Education">
            <p className="text-[15px] font-medium text-text">{profile.education.degree}</p>
            <p className="text-[15px] text-text-2">{profile.education.school}</p>
          </InfoCard>
          <InfoCard icon={<Target size={20} strokeWidth={1.75} />} title="Career interests">
            <BulletList items={profile.interests} />
          </InfoCard>
        </Reveal>
      </div>

      <Reveal delay={0.15} className="mt-6">
        <InfoCard icon={<Layers size={20} strokeWidth={1.75} />} title="Areas of focus">
          <div className="mt-1 grid gap-x-8 gap-y-3 sm:grid-cols-2">
            {profile.focus.map((item) => (
              <p key={item} className="flex items-start gap-3 text-[15px] text-text-2">
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-electric" aria-hidden="true" />
                {item}
              </p>
            ))}
          </div>
        </InfoCard>
      </Reveal>

      <Reveal delay={0.2} className="mt-6 grid grid-cols-2 gap-4 md:grid-cols-4">
        {profile.stats.map((stat) => (
          <div key={stat.label} className="glass rounded-2xl p-5 transition-colors duration-300 hover:border-electric/50 md:p-6">
            <p className="text-[32px] font-extrabold tracking-tight text-text md:text-[38px]">{stat.value}</p>
            <p className="mt-1 text-[14px] text-text-2">{stat.label}</p>
          </div>
        ))}
      </Reveal>
    </Section>
  );
}

function InfoCard({ icon, title, children }: { icon: ReactNode; title: string; children: ReactNode }) {
  return (
    <div className="glass rounded-3xl p-6">
      <div className="flex items-center gap-2.5 text-[15px] font-semibold text-text">
        <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/15 text-sky">{icon}</span>
        {title}
      </div>
      <div className="mt-3">{children}</div>
    </div>
  );
}

function BulletList({ items }: { items: string[] }) {
  return (
    <ul className="space-y-2 text-[15px] text-text-2">
      {items.map((i) => (
        <li key={i} className="flex gap-2.5">
          <span className="mt-2.5 h-1 w-3 shrink-0 rounded-full bg-electric" aria-hidden="true" />
          {i}
        </li>
      ))}
    </ul>
  );
}
