import { profile } from '../data/profile';
import { stagger } from '../lib/reveal';
import { RichText } from '../lib/RichText';
import s from './Intro.module.css';

/** First panel after the photo: who this is and how to reach them. */
export function Intro() {
  return (
    <section className={`wrap ${s.section}`} id="intro">
      <div className={`glass ${s.panel}`} data-reveal>
        <h1 className={s.name} data-reveal style={stagger(2, 110)}>
          {profile.firstName} <span className={s.last}>{profile.lastName}</span>
        </h1>
        <p className={s.lede} data-reveal style={stagger(3, 110)}>
          <RichText text={profile.lede} />
        </p>
        <div className={s.cta} data-reveal style={stagger(4, 110)}>
          <a className="btn btn-primary" href="#contact">
            Get in touch
          </a>
          <a
            className={`btn ${s.ghost}`}
            href={profile.links.github.href}
            target="_blank"
            rel="noopener"
          >
            GitHub ↗
          </a>
          <a
            className={`btn ${s.ghost}`}
            href={profile.links.linkedin.href}
            target="_blank"
            rel="noopener"
          >
            LinkedIn ↗
          </a>
        </div>
      </div>
    </section>
  );
}
