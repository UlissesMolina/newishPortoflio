import { profile } from '../data/profile';
import s from './Education.module.css';

export function Education() {
  const e = profile.education;
  return (
    <section id="education" className={`wrap ${s.section}`}>
      <div className={`glass ${s.panel}`} data-reveal>
        <img className={s.crest} src={e.logo} alt="" width="60" height="60" />
        <div className={s.body}>
          <p className={s.eyebrow}>Education</p>
          <h2 className={s.school}>{e.school}</h2>
          <p className={s.degree}>{e.degree}</p>
        </div>
        <div className={s.when}>
          <span>{e.expected}</span>
          <span>{e.location}</span>
        </div>
      </div>
    </section>
  );
}
