import { useEffect, type CSSProperties } from 'react';

/**
 * Scroll reveal. Mark any element with `data-reveal`; it eases up into place the first
 * time it enters the viewport. Styles live in global.css under `.reveal-ready`, which is
 * only set here, so content stays visible without JS or with reduced motion.
 */
export function useScrollReveal() {
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const root = document.documentElement;
    root.classList.add('reveal-ready');

    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (!e.isIntersecting) continue;
          e.target.setAttribute('data-shown', '');
          io.unobserve(e.target);
        }
      },
      { rootMargin: '0px 0px -10% 0px', threshold: 0.12 },
    );
    document.querySelectorAll('[data-reveal]:not([data-shown])').forEach((el) => io.observe(el));

    return () => {
      io.disconnect();
      root.classList.remove('reveal-ready');
    };
  }, []);
}

/** Transition delay for the i-th item of a staggered group. */
export const stagger = (i: number, stepMs = 90, baseMs = 0) =>
  ({ '--d': `${baseMs + i * stepMs}ms` }) as CSSProperties;
