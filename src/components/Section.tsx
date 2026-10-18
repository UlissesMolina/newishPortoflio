import type { ReactNode } from 'react';
import s from './Section.module.css';

interface Props {
  id?: string;
  eyebrow: string;
  title?: ReactNode;
  className?: string;
  children?: ReactNode;
}

/** Content section rendered as one large glass panel over the photo. */
export function Section({ id, eyebrow, title, className, children }: Props) {
  return (
    <section id={id} className={`wrap ${s.section}`}>
      <div className={`glass ${s.panel} ${className ?? ''}`} data-reveal>
        <header className={s.head}>
          <p className={s.eyebrow}>{eyebrow}</p>
          {title && <h2 className={s.title}>{title}</h2>}
        </header>
        {children}
      </div>
    </section>
  );
}
