import { LiquidGlass } from './LiquidGlass';
import s from './Stage.module.css';

/** First screen: nothing but the photo and a glass scroll cue. */
export function Stage() {
  return (
    <div className={s.stage} id="top">
      <a className={s.cueLink} href="#intro" aria-label="Scroll to content">
        <LiquidGlass className={s.cue} refract strength={26} bevel={14}>
          <span>Scroll</span>
          <svg viewBox="0 0 16 16" width="14" height="14" aria-hidden="true" className={s.chevron}>
            <path
              d="M3.5 6l4.5 4.5L12.5 6"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </LiquidGlass>
      </a>
    </div>
  );
}
