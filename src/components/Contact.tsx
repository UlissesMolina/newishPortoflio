import { useEffect, useRef, useState } from 'react';
import { profile } from '../data/profile';
import { stagger } from '../lib/reveal';
import s from './Contact.module.css';

type CopyState = 'idle' | 'copied' | 'selected';

const COPY_LABEL: Record<CopyState, string> = {
  idle: 'Copy email',
  copied: 'Copied',
  selected: 'Selected, press Ctrl+C',
};

export function Contact() {
  const emailRef = useRef<HTMLAnchorElement>(null);
  const [state, setState] = useState<CopyState>('idle');

  useEffect(() => {
    if (state === 'idle') return;
    const t = setTimeout(() => setState('idle'), 2000);
    return () => clearTimeout(t);
  }, [state]);

  const selectEmail = () => {
    const el = emailRef.current;
    const sel = window.getSelection();
    if (!el || !sel) return;
    const range = document.createRange();
    range.selectNodeContents(el);
    sel.removeAllRanges();
    sel.addRange(range);
    setState('selected');
  };

  const copy = () => {
    if (!navigator.clipboard) return selectEmail();
    navigator.clipboard.writeText(profile.email).then(() => setState('copied'), selectEmail);
  };

  return (
    <section className={`wrap ${s.section}`} id="contact">
      <div className={`glass ${s.panel}`} data-reveal>
        <p className={s.eyebrow}>Contact</p>
        <h2 className={s.title} data-reveal style={stagger(1)}>
          Have a slow endpoint? Let’s talk.
        </h2>
        <p className={s.copy} data-reveal style={stagger(2)}>
          Looking for backend and infrastructure internships.
        </p>
        <div className={s.emailRow} data-reveal style={stagger(3)}>
          <a className={s.email} ref={emailRef} href={`mailto:${profile.email}`}>
            {profile.email}
          </a>
          <button className="btn btn-primary" type="button" onClick={copy} aria-live="polite">
            {COPY_LABEL[state]}
          </button>
        </div>
        <div className={s.links} data-reveal style={stagger(4)}>
          {Object.values(profile.links).map((l) => (
            <a
              key={l.href}
              className={`btn ${s.ghost}`}
              href={l.href}
              target="_blank"
              rel="noopener"
            >
              {l.label} ↗
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
