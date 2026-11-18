import { ArrowUp, Github, Linkedin } from 'lucide-react';
import { useEffect, useState } from 'react';
import { profile } from '../data/profile';

export default function Footer() {
  const [showTop, setShowTop] = useState(false);

  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 480);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <footer className="relative border-t border-sky/10 bg-bg-2/60">
      <div className="mx-auto flex w-full max-w-[1160px] flex-col items-center justify-between gap-5 px-5 py-8 md:flex-row md:px-8">
        <div className="text-center md:text-left">
          <p className="text-[15px] font-semibold text-text">{profile.name}</p>
          <p className="mt-1 text-[13px] text-muted">
            © {new Date().getFullYear()} All rights reserved.
          </p>
        </div>

        <nav aria-label="Social" className="flex items-center gap-3">
          <a
            href={profile.links.github}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            className="glass flex h-10 w-10 items-center justify-center rounded-xl text-text-2 transition-all duration-300 hover:-translate-y-0.5 hover:border-electric/60 hover:text-sky hover:shadow-[0_0_20px_rgba(0,163,255,0.25)]"
          >
            <Github size={18} strokeWidth={1.75} />
          </a>
          <a
            href={profile.links.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className="glass flex h-10 w-10 items-center justify-center rounded-xl text-text-2 transition-all duration-300 hover:-translate-y-0.5 hover:border-electric/60 hover:text-sky hover:shadow-[0_0_20px_rgba(0,163,255,0.25)]"
          >
            <Linkedin size={18} strokeWidth={1.75} />
          </a>
          <a
            href="#home"
            aria-label="Back to top"
            className={`btn-primary flex h-10 w-10 items-center justify-center rounded-xl transition-all duration-300 ${
              showTop ? 'opacity-100' : 'pointer-events-none opacity-0'
            }`}
          >
            <ArrowUp size={18} strokeWidth={1.75} />
          </a>
        </nav>
      </div>
    </footer>
  );
}
