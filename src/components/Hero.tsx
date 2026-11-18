import type { ReactNode } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { ArrowRight, Download, Github, Linkedin, MapPin } from 'lucide-react';
import { profile } from '../data/profile';
import { asset } from '../lib/asset';

// Labels sit at the frame's corners, outside the face area.
const floatingLabels = [
  { label: 'Python', pos: 'left-[-2%] top-[9%] lg:left-[-9%]', delay: 0 },
  { label: 'React', pos: 'right-[-2%] top-[4%] lg:right-[-7%]', delay: 0.8 },
  { label: 'Spring Boot', pos: 'right-[-2%] bottom-[24%] lg:right-[-10%]', delay: 1.6 },
  { label: 'FastAPI', pos: 'left-[-2%] bottom-[8%] lg:left-[-8%]', delay: 2.4 },
];

export default function Hero() {
  const reduce = useReducedMotion();

  const rise = (delay: number) => ({
    initial: reduce ? false : { opacity: 0, y: 18 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.7, delay, ease: [0.22, 0.7, 0.2, 1] as const },
  });

  return (
    <section id="home" className="relative scroll-mt-28 pb-14 pt-28 sm:pt-32 md:pt-36 lg:pb-24 lg:pt-40">
      <div className="mx-auto grid w-full max-w-[1380px] items-center gap-14 px-5 md:px-8 lg:grid-cols-[55fr_45fr] lg:gap-12">
        {/* Copy — left, about 55% on wide screens */}
        <div className="order-2 lg:order-1">
          <motion.p {...rise(0.05)} className="text-[17px] font-medium text-text-2">
            Hi, I&apos;m <span className="font-semibold text-text">{profile.name}</span>
          </motion.p>

          <motion.h1
            {...rise(0.15)}
            className="mt-4 text-[40px] font-extrabold leading-[1.05] tracking-[-0.03em] text-text sm:text-[56px] md:text-[64px] lg:text-[76px] xl:text-[88px]"
          >
            Building <span className="text-gradient">Digital</span>
            <br />
            <span className="text-gradient">Experiences</span> with Code
            <br />
            &amp; Creativity.
          </motion.h1>

          <motion.p {...rise(0.25)} className="mt-6 max-w-[600px] text-[16px] leading-relaxed text-text-2 md:text-[18px]">
            {profile.intro}
          </motion.p>

          <motion.div {...rise(0.35)} className="mt-7 flex flex-wrap items-center gap-3">
            <span className="glass inline-flex items-center gap-2 rounded-full px-3.5 py-1.5 text-[13px] font-semibold text-text">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-electric opacity-60" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-electric" />
              </span>
              Open to Work
            </span>
            <span className="inline-flex items-center gap-1.5 text-[14px] text-muted">
              <MapPin size={16} strokeWidth={1.75} aria-hidden="true" />
              {profile.location}
            </span>
          </motion.div>

          <motion.div {...rise(0.45)} className="mt-8 flex flex-wrap gap-3">
            <a href="#projects" className="btn-primary inline-flex h-12 items-center gap-2 rounded-xl px-6 text-[15px] font-semibold">
              Explore Projects
              <ArrowRight size={18} strokeWidth={1.75} aria-hidden="true" />
            </a>
            <a
              href={profile.links.resumeDownload}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-ghost inline-flex h-12 items-center gap-2 rounded-xl px-6 text-[15px] font-semibold"
            >
              <Download size={18} strokeWidth={1.75} aria-hidden="true" />
              Download Resume
            </a>
          </motion.div>

          <motion.div {...rise(0.55)} className="mt-7 flex items-center gap-3">
            <SocialIcon href={profile.links.github} label="GitHub">
              <Github size={19} strokeWidth={1.75} />
            </SocialIcon>
            <SocialIcon href={profile.links.linkedin} label="LinkedIn">
              <Linkedin size={19} strokeWidth={1.75} />
            </SocialIcon>
          </motion.div>
        </div>

        {/* Photo — right, about 45% on wide screens */}
        <motion.div
          initial={reduce ? false : { opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, delay: 0.2, ease: [0.22, 0.7, 0.2, 1] }}
          className="relative order-1 mx-auto w-full max-w-[440px] lg:order-2 lg:max-w-none"
        >
          {/* Animated blue glow behind the frame */}
          <div
            aria-hidden="true"
            className="anim-glow absolute inset-[-14%] rounded-full blur-3xl"
            style={{
              background: 'radial-gradient(circle, rgba(37,99,235,0.45), rgba(0,183,255,0.12) 45%, transparent 70%)',
              animation: reduce ? undefined : 'glow-breathe 7s ease-in-out infinite',
            }}
          />

          <div className="glow-ring glass-strong relative aspect-[4/5] overflow-hidden rounded-[28px] border-electric/45 p-2">
            <img
              src={asset('assets/Images/vamshi.jpg')}
              alt={profile.name}
              width={460}
              height={575}
              className="h-full w-full rounded-[22px] object-cover object-[center_20%]"
            />
          </div>

          {floatingLabels.map((f) => (
            <FloatingLabel key={f.label} label={f.label} pos={f.pos} delay={f.delay} reduce={!!reduce} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}

function FloatingLabel({ label, pos, delay, reduce }: { label: string; pos: string; delay: number; reduce: boolean }) {
  return (
    <div
      aria-hidden="true"
      className={`absolute hidden sm:block ${pos}`}
    >
      <span
        className="anim-float glass inline-flex items-center gap-2 rounded-full px-3.5 py-1.5 text-[13px] font-medium text-text"
        style={{ animation: reduce ? undefined : `float-soft 6s ease-in-out ${delay}s infinite` }}
      >
        <span className="h-1.5 w-1.5 rounded-full bg-sky" />
        {label}
      </span>
    </div>
  );
}

function SocialIcon({ href, label, children }: { href: string; label: string; children: ReactNode }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className="glass flex h-11 w-11 items-center justify-center rounded-xl text-text-2 transition-all duration-300 hover:-translate-y-0.5 hover:border-electric/60 hover:bg-primary/15 hover:text-sky hover:shadow-[0_0_24px_rgba(0,140,255,0.3)]"
    >
      {children}
    </a>
  );
}
