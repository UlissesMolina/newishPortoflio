import { useRef } from 'react';
import { Backdrop } from './components/Backdrop';
import { Contact } from './components/Contact';
import { Education } from './components/Education';
import { Experience } from './components/Experience';
import { Footer } from './components/Footer';
import { Intro } from './components/Intro';
import { Nav } from './components/Nav';
import { Projects } from './components/Projects';
import { Skills } from './components/Skills';
import { Stage } from './components/Stage';
import { useScrollReveal } from './lib/reveal';
import { useScrollProgress } from './lib/useScrollProgress';

export default function App() {
  // --p / --scroll live on the root so the backdrop and the stage both read them.
  const rootRef = useRef<HTMLDivElement>(null);
  useScrollProgress(rootRef);
  useScrollReveal();

  return (
    <div ref={rootRef}>
      <Backdrop />
      <Nav />
      <div style={{ position: 'relative', zIndex: 1 }}>
        <Stage />
        <main>
          <Intro />
          <Experience />
          <Projects />
          <Skills />
          <Education />
          <Contact />
        </main>
        <Footer />
      </div>
    </div>
  );
}
