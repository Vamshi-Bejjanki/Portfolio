import { useEffect, useState, type ReactNode } from 'react';
import { motion, useReducedMotion } from 'motion/react';

/** Tracks which section id is currently in view, for the navigation indicator. */
export function useActiveSection(ids: string[]) {
  const [active, setActive] = useState(ids[0]);

  useEffect(() => {
    const sections = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting);
        if (visible.length > 0) setActive(visible[visible.length - 1].target.id);
      },
      { rootMargin: '-45% 0px -50% 0px' },
    );
    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
    // ids is a constant list supplied by the caller
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return active;
}

/** Fade-and-rise when a block scrolls into view. Instant when reduced motion is on. */
export function Reveal({
  children,
  delay = 0,
  className = '',
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={reduce ? false : { opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.6, delay, ease: [0.22, 0.7, 0.2, 1] }}
    >
      {children}
    </motion.div>
  );
}

/** Page section. Uses the spec's vertical rhythm (48 / 64 / 96px). */
export function Section({
  id,
  eyebrow,
  title,
  intro,
  children,
}: {
  id: string;
  eyebrow: string;
  title: ReactNode;
  intro?: string;
  children: ReactNode;
}) {
  return (
    <section id={id} className="relative scroll-mt-28 py-12 sm:py-14 md:py-16 lg:py-24">
      <div className="mx-auto w-full max-w-[1160px] px-5 md:px-8">
        <Reveal className="mb-10 md:mb-14">
          <p className="mb-3 text-[13px] font-semibold uppercase tracking-[0.18em] text-sky">{eyebrow}</p>
          <h2 className="text-[30px] font-bold leading-[1.1] tracking-tight text-text sm:text-[36px] md:text-[44px]">
            {title}
          </h2>
          {intro && <p className="mt-4 max-w-[680px] text-[15px] leading-relaxed text-text-2 md:text-[17px]">{intro}</p>}
        </Reveal>
        {children}
      </div>
    </section>
  );
}

/** Neutral technology tag with a blue highlight on hover. */
export function Tag({ children }: { children: ReactNode }) {
  return (
    <span className="tag inline-flex items-center rounded-lg px-2.5 py-1 text-[13px] font-medium">{children}</span>
  );
}

/** Small motion wrapper for hover lift on interactive cards. */
export function Lift({ children, className = '' }: { children: ReactNode; className?: string }) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className={className}
      whileHover={reduce ? undefined : { y: -6 }}
      transition={{ duration: 0.25, ease: [0.22, 0.7, 0.2, 1] }}
    >
      {children}
    </motion.div>
  );
}
