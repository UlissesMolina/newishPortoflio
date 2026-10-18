# umolina.com

Personal portfolio. React 19 + TypeScript + Vite, CSS Modules, Lenis smooth scrolling.

```sh
npm install
npm run dev      # http://localhost:5173
npm run build    # type-check + production build to dist/
npm run lint
npm run format
```

## Layout

- `src/data/profile.ts` holds all résumé content (roles, projects, skills). Edit this, not the components.
  Strings support `**figure**`, `{{delta badge}}` and `` `code` `` markup.
- `src/components/` has one component per section, each with a co-located `.module.css`.
- `src/components/Backdrop.tsx` is the fixed photo behind the page. `public/images/dawn-*` shows in light mode and
  `night-*` in dark mode, each in 1280/2000/2800px WebP. Both are from Unsplash. The previous mountain photos are in `image-backup/`. To swap a photo, replace the three
  files and keep the names.
- `src/components/LiquidGlass.tsx` and `src/lib/refraction.ts` handle the glass surfaces. Every panel uses the global
  `.glass` class (frosted blur, rim and sheen). With `refract`, the edges also bend the backdrop like a lens. That
  part only renders in Chromium browsers; other browsers fall back to frosted glass.
- `src/lib/reveal.ts` handles scroll reveals. Add `data-reveal` to an element, plus `style={stagger(i)}` for groups.
- `src/styles/global.css` holds the design tokens (Apple system colours and glass material for light and dark).
- `legacy/index.html` is the original single-file version, kept for reference.

Requires Node 20.19+ or 22.12+.
