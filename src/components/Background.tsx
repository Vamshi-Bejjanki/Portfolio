/**
 * Live background, built from CSS only (no video, no canvas, no JS loops).
 * Everything sits behind the content and is disabled by prefers-reduced-motion.
 */

// Fixed positions keep the layout identical on every render.
const particles = [
  { left: '8%', top: '62%', delay: '0s', dur: '11s', size: 3 },
  { left: '18%', top: '78%', delay: '3s', dur: '13s', size: 2 },
  { left: '31%', top: '42%', delay: '6s', dur: '15s', size: 2 },
  { left: '44%', top: '70%', delay: '1s', dur: '12s', size: 3 },
  { left: '57%', top: '55%', delay: '8s', dur: '14s', size: 2 },
  { left: '66%', top: '82%', delay: '4s', dur: '16s', size: 2 },
  { left: '78%', top: '48%', delay: '2s', dur: '12s', size: 3 },
  { left: '88%', top: '70%', delay: '9s', dur: '13s', size: 2 },
  { left: '93%', top: '34%', delay: '5s', dur: '17s', size: 2 },
  { left: '24%', top: '28%', delay: '7s', dur: '15s', size: 2 },
];

export default function Background() {
  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-bg">
      <div className="ambient absolute inset-0" />

      {/* Slowly drifting blue light orbs */}
      <div
        className="anim-orb absolute -left-40 -top-40 h-[560px] w-[560px] rounded-full blur-3xl"
        style={{ background: 'radial-gradient(circle, var(--orb), transparent 70%)', animation: 'orb-drift-a 26s ease-in-out infinite' }}
      />
      <div
        className="anim-orb absolute -right-48 top-[30%] h-[620px] w-[620px] rounded-full blur-3xl"
        style={{ background: 'radial-gradient(circle, var(--orb-2), transparent 70%)', animation: 'orb-drift-b 32s ease-in-out infinite' }}
      />

      {/* Technical grid, drifting very slowly */}
      <div
        className="grid-pattern anim-grid absolute inset-0 opacity-70"
        style={{ animation: 'grid-drift 40s linear infinite' }}
      />

      {/* Diagonal light trail behind the hero */}
      <div
        className="anim-trail absolute left-0 right-0 top-[8%] h-px"
        style={{
          background: 'linear-gradient(90deg, transparent, rgba(0,183,255,0.55), transparent)',
          animation: 'trail-sweep 14s ease-in-out infinite',
          boxShadow: '0 0 18px rgba(0,183,255,0.35)',
        }}
      />
      <div
        className="anim-trail absolute left-0 right-0 top-[30%] h-px"
        style={{
          background: 'linear-gradient(90deg, transparent, rgba(37,99,235,0.5), transparent)',
          animation: 'trail-sweep 19s ease-in-out infinite 4s',
        }}
      />

      {/* A few slow floating particles */}
      {particles.map((p, i) => (
        <span
          key={i}
          className="anim-particle absolute rounded-full bg-sky"
          style={{
            left: p.left,
            top: p.top,
            width: p.size,
            height: p.size,
            opacity: 0,
            boxShadow: '0 0 8px rgba(0,183,255,0.8)',
            animation: `particle-rise ${p.dur} ease-in-out ${p.delay} infinite`,
          }}
        />
      ))}
    </div>
  );
}
