import { roles } from '../data/profile';
import { longLabel } from '../lib/months';
import { stagger } from '../lib/reveal';
import { RichText } from '../lib/RichText';
import { Section } from './Section';
import { Timeline } from './Timeline';
import s from './Experience.module.css';

export function Experience() {
  return (
    <Section id="experience" eyebrow="Experience" title="Where I’ve worked">
      <Timeline roles={roles} />
      <div className={s.roles}>
        {roles.map((role, i) => (
          <article key={role.org} className={`tile ${s.role}`} data-reveal style={stagger(i, 80)}>
            <header className={s.header}>
              <img className={s.logo} src={role.logo} alt="" width="44" height="44" />
              <div className={s.who}>
                <h3 className={s.title}>{role.title}</h3>
                <p className={s.org}>
                  {role.org} · {role.location}
                </p>
              </div>
              <span className={`${s.dates} ${role.end ? '' : s.current}`}>
                {longLabel(role.start)} – {role.end ? longLabel(role.end) : 'Present'}
              </span>
            </header>
            <ul className={s.bullets}>
              {role.bullets.map((b) => (
                <li key={b}>
                  <RichText text={b} />
                </li>
              ))}
            </ul>
          </article>
        ))}
      </div>
    </Section>
  );
}
