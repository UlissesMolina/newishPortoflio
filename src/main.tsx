import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import Lenis from 'lenis';
import 'lenis/dist/lenis.css';
import App from './App';
import './styles/global.css';

// Momentum scrolling with an iOS-like ease; anchors glide instead of jumping.
if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  new Lenis({ autoRaf: true, anchors: { offset: -88 }, lerp: 0.09 });
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
