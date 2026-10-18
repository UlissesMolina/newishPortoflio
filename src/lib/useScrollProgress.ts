import { useEffect, type RefObject } from 'react';

/**
 * Writes scroll position onto `ref` as CSS custom properties, once per frame:
 *   --scroll  px scrolled, clamped to one viewport
 *   --p       0–1 progress through the first viewport
 */
export function useScrollProgress(ref: RefObject<HTMLElement | null>) {
  useEffect(() => {
    const el = ref.current;
    if (!el || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    let frame = 0;

    const update = () => {
      frame = 0;
      const vh = window.innerHeight;
      const y = Math.min(window.scrollY, vh);
      el.style.setProperty('--scroll', y.toFixed(1));
      el.style.setProperty('--p', (y / vh).toFixed(4));
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      cancelAnimationFrame(frame);
    };
  }, [ref]);
}
