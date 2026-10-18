import { profile } from '../data/profile';
import { LiquidGlass } from './LiquidGlass';
import s from './Nav.module.css';

const ITEMS = [
  { href: '#experience', label: 'Experience', optional: true },
  { href: '#projects', label: 'Projects', optional: true },
  { href: '#skills', label: 'Skills', optional: true },
];

/** Floating liquid-glass pill; drops in after the photo reveal. */
export function Nav() {
  return (
    <nav className={s.nav} aria-label="Primary">
      <LiquidGlass className={s.pill} refract strength={30} bevel={16}>
        <a className={s.name} href="#top">
          <span className={s.mark} aria-hidden="true">
            {profile.firstName[0]}
            {profile.lastName[0]}
          </span>
          <span className={s.full}>
            {profile.firstName} {profile.lastName}
          </span>
        </a>
        <ul>
          {ITEMS.map((item) => (
            <li key={item.href} className={item.optional ? s.optional : undefined}>
              <a href={item.href}>{item.label}</a>
            </li>
          ))}
          <li>
            <a href="#contact" className={s.primary}>
              Contact
            </a>
          </li>
        </ul>
      </LiquidGlass>
    </nav>
  );
}
