import { skills } from '../data/profile';
import { Section } from './Section';
import { stagger } from '../lib/reveal';
import s from './Skills.module.css';

export function Skills() {
  return (
    <Section id="skills" eyebrow="Toolkit" title="What I work with">
      <div className={s.grid}>
        {skills.map((g, i) => (
          <div key={g.name} data-reveal style={stagger(i)}>
            <h3 className={s.group}>{g.name}</h3>
            <div className={s.chips}>
              {g.items.map((item) => (
                <span key={item}>{item}</span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
}
