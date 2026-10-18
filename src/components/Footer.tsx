import { profile } from '../data/profile';
import s from './Footer.module.css';

export function Footer() {
  return (
    <footer className={`wrap ${s.footer}`}>
      <span>
        © {new Date().getFullYear()} {profile.firstName} {profile.lastName}
      </span>
      <span>
        Photography via{' '}
        <a href="https://unsplash.com" target="_blank" rel="noopener">
          Unsplash
        </a>
      </span>
    </footer>
  );
}
