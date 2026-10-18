import type { CSSProperties } from 'react';
import type { Role } from '../data/profile';
import { dateToMonthIndex, monthIndex, shortLabel } from '../lib/months';
import s from './Timeline.module.css';

const TICK_EVERY = 4;

/** Gantt strip of roles, scaled from the earliest start to one month past today. */
export function Timeline({ roles }: { roles: Role[] }) {
  const now = dateToMonthIndex(new Date());
  const start = Math.min(...roles.map((r) => monthIndex(r.start)));
  const end = Math.ceil(now) + 1;
  const span = end - start;
  const at = (m: number) => `${((m - start) / span) * 100}%`;

  const ticks: number[] = [];
  for (let m = start; m < end; m += TICK_EVERY) ticks.push(m);

  // Draw in chronological order of start date.
  const rows = [...roles].sort((a, b) => monthIndex(a.start) - monthIndex(b.start));

  return (
    <div
      className={s.gantt}
      aria-hidden="true"
      data-reveal
      style={{ '--months': span } as CSSProperties}
    >
      {rows.map((r, i) => {
        const from = monthIndex(r.start);
        // Inclusive end month, so a role ending in Aug fills Aug.
        const to = r.end ? monthIndex(r.end) + 1 : now;
        return (
          <div key={r.org} className={s.row}>
            <span className={s.name}>{r.org}</span>
            <div className={s.track}>
              <div
                className={`${s.bar} ${r.end ? '' : s.ongoing}`}
                style={{
                  left: at(from),
                  width: `calc(${at(to)} - ${at(from)})`,
                  transitionDelay: `${300 + i * 180}ms`,
                }}
              />
            </div>
          </div>
        );
      })}
      <div className={s.row}>
        <span />
        <div className={s.ticks}>
          {ticks.map((m) => (
            <span key={m} style={{ left: at(m) }}>
              {shortLabel(m)}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
