import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { Menu, Moon, Sun, X } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useActiveSection } from './ui';
import { useTheme } from '../lib/theme';

const links = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'projects', label: 'Projects' },
  { id: 'experience', label: 'Experience' },
  { id: 'certifications', label: 'Certifications' },
  { id: 'skills', label: 'Skills' },
  { id: 'contact', label: 'Contact' },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const active = useActiveSection(links.map((l) => l.id));
  const reduce = useReducedMotion();
  const { theme, toggle } = useTheme();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header className="fixed inset-x-0 top-3 z-50 px-3 sm:top-4 sm:px-6">
      <nav
        aria-label="Main"
        className={`mx-auto flex h-16 w-full max-w-[1380px] items-center justify-between rounded-2xl px-3 pl-4 backdrop-blur-[18px] transition-shadow duration-300 md:px-4 ${
          scrolled ? 'glass-strong' : 'glass'
        }`}
      >
        <a href="#home" className="flex items-center gap-3" onClick={() => setOpen(false)}>
          <span className="btn-primary flex h-10 w-10 items-center justify-center rounded-xl text-[13px] font-extrabold">
            VB
          </span>
          <span className="hidden text-[15px] font-semibold text-text sm:block">Vamshi Bejjanki</span>
        </a>

        <ul className="hidden items-center gap-0.5 xl:flex">
          {links.map((link) => {
            const isActive = active === link.id;
            return (
              <li key={link.id}>
                <a
                  href={`#${link.id}`}
                  aria-current={isActive ? 'true' : undefined}
                  className={`relative block rounded-lg px-3 py-2 text-[14px] transition-colors duration-200 hover:text-sky ${
                    isActive ? 'font-semibold text-text' : 'text-text-2'
                  }`}
                >
                  {link.label}
                  {isActive && (
                    <motion.span
                      layoutId={reduce ? undefined : 'nav-indicator'}
                      className="absolute inset-x-3 -bottom-0.5 h-0.5 rounded-full bg-[linear-gradient(90deg,#2563EB,#00B7FF)]"
                      transition={{ duration: 0.3 }}
                    />
                  )}
                </a>
              </li>
            );
          })}
        </ul>

        <div className="flex items-center gap-2">
          <ThemeToggle theme={theme} onToggle={toggle} />
          <button
            type="button"
            className="flex h-10 w-10 items-center justify-center rounded-xl text-text transition-colors duration-200 hover:text-sky xl:hidden"
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X size={22} strokeWidth={1.75} /> : <Menu size={22} strokeWidth={1.75} />}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.ul
            id="mobile-menu"
            initial={reduce ? false : { opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="glass-strong mx-auto mt-2 w-full max-w-[1380px] rounded-2xl p-2 xl:hidden"
          >
            {links.map((link) => (
              <li key={link.id}>
                <a
                  href={`#${link.id}`}
                  onClick={() => setOpen(false)}
                  aria-current={active === link.id ? 'true' : undefined}
                  className={`block rounded-xl px-4 py-3.5 text-[15px] transition-colors duration-200 hover:bg-primary/10 hover:text-sky ${
                    active === link.id ? 'font-semibold text-sky' : 'text-text'
                  }`}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </header>
  );
}

function ThemeToggle({ theme, onToggle }: { theme: 'dark' | 'light'; onToggle: () => void }) {
  const isDark = theme === 'dark';
  return (
    <button
      type="button"
      onClick={onToggle}
      aria-label={isDark ? 'Switch to light theme' : 'Switch to dark theme'}
      title={isDark ? 'Light theme' : 'Dark theme'}
      className="btn-ghost relative flex h-10 w-10 items-center justify-center overflow-hidden rounded-xl"
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={theme}
          initial={{ rotate: -90, opacity: 0, scale: 0.6 }}
          animate={{ rotate: 0, opacity: 1, scale: 1 }}
          exit={{ rotate: 90, opacity: 0, scale: 0.6 }}
          transition={{ duration: 0.25 }}
          className="flex"
        >
          {isDark ? <Sun size={18} strokeWidth={1.75} /> : <Moon size={18} strokeWidth={1.75} />}
        </motion.span>
      </AnimatePresence>
    </button>
  );
}
