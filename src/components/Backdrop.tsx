import { useEffect, useRef, useState } from 'react';
import s from './Backdrop.module.css';

const WIDTHS = [1280, 2000, 2800];
const srcSet = (name: string) => WIDTHS.map((w) => `/images/${name}-${w}.webp ${w}w`).join(', ');

/**
 * Fixed lake-and-forest photo behind the whole page: daylight in light mode, dusk in dark.
 * Reveals once the image has loaded; reads --p from an ancestor to zoom and dim on scroll.
 */
export function Backdrop() {
  const imgRef = useRef<HTMLImageElement>(null);
  const [loaded, setLoaded] = useState(false);

  // A cached image can finish before React attaches onLoad.
  useEffect(() => {
    if (imgRef.current?.complete) setLoaded(true);
  }, []);

  return (
    <div className={s.backdrop} data-loaded={loaded || undefined} aria-hidden="true">
      <div className={s.camera}>
        <picture>
          <source media="(prefers-color-scheme: dark)" srcSet={srcSet('night')} sizes="100vw" />
          <img
            ref={imgRef}
            className={s.photo}
            src="/images/dawn-2000.webp"
            srcSet={srcSet('dawn')}
            sizes="100vw"
            alt=""
            fetchPriority="high"
            onLoad={() => setLoaded(true)}
          />
        </picture>
      </div>
      <div className={s.scrim} />
      <div className={s.veil} />
    </div>
  );
}
