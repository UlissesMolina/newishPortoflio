import type { YearMonth } from '../data/profile';

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

/** Months since year 0, so ranges can be compared and subtracted. */
export function monthIndex(ym: YearMonth): number {
  const [y, m] = ym.split('-').map(Number) as [number, number];
  return y * 12 + (m - 1);
}

/** Fractional month index for a date, e.g. mid-October ≈ x.5. */
export function dateToMonthIndex(d: Date): number {
  const daysInMonth = new Date(d.getFullYear(), d.getMonth() + 1, 0).getDate();
  return d.getFullYear() * 12 + d.getMonth() + (d.getDate() - 1) / daysInMonth;
}

/** "Sep ’25" */
export function shortLabel(index: number): string {
  const y = Math.floor(index / 12);
  return `${MONTHS[index % 12]} ’${String(y).slice(-2)}`;
}

/** "Sep 2025" */
export function longLabel(ym: YearMonth): string {
  const i = monthIndex(ym);
  return `${MONTHS[i % 12]} ${Math.floor(i / 12)}`;
}
