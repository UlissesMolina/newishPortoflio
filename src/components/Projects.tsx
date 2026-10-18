import { projects } from '../data/profile';
import { stagger } from '../lib/reveal';
import { Section } from './Section';
import s from './Projects.module.css';

export function Projects() {
  return (
    <Section id="projects" eyebrow="Projects" title="Side projects">
      <div className={s.grid}>
        {projects.map((p, i) => (
          <a
            key={p.name}
            className={s.card}
            href={p.href}
            target="_blank"
            rel="noopener"
            data-reveal
            style={stagger(i, 80)}
          >
            <h3 className={s.name}>
              {p.name} <span className={s.arrow}>↗</span>
            </h3>
            <p className={s.blurb}>{p.blurb}</p>
            <div className={s.stack}>
              {p.stack.map((t) => (
                <span key={t}>{t}</span>
              ))}
            </div>
          </a>
        ))}
      </div>
    </Section>
  );
}
