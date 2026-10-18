/**
 * All résumé content lives here. Strings support a tiny inline markup,
 * rendered by <RichText>:
 *   **text**   highlighted figure
 *   {{text}}   delta badge (e.g. {{−55%}})
 *   `text`     inline code
 */

/** Calendar month in `YYYY-MM` form. */
export type YearMonth = `${number}-${number}`;

export interface Link {
  label: string;
  href: string;
}

export interface Role {
  org: string;
  /** Path under `public/`. */
  logo: string;
  title: string;
  location: string;
  start: YearMonth;
  /** `null` means the role is ongoing. */
  end: YearMonth | null;
  bullets: string[];
}

export interface Project {
  name: string;
  blurb: string;
  stack: string[];
  href: string;
}

export interface SkillGroup {
  name: string;
  items: string[];
}

export const profile = {
  firstName: 'Ulisses',
  lastName: 'Molina-Becerra',
  domain: 'umolina.com',
  lede: 'Software engineering student at **Auburn University **',
  email: 'umolina2005@gmail.com',
  links: {
    github: { label: 'github.com/UlissesMolina', href: 'https://github.com/UlissesMolina' },
    linkedin: {
      label: 'linkedin.com/in/ulissesmolina',
      href: 'https://linkedin.com/in/ulissesmolina',
    },
  },
  education: {
    school: 'Auburn University',
    degree: 'B.S. Software Engineering',
    expected: 'Expected May 2028',
    logo: '/logos/auburn.png',
    location: 'Auburn, AL',
  },
} as const;

export const roles: Role[] = [
  {
    org: 'RFID Lab',
    logo: '/logos/rfid-lab.png',
    title: 'Software Developer',
    location: 'Auburn, AL',
    start: '2026-08',
    end: null,
    bullets: [
      'Cut dashboard load from **11s to 5s** {{−55%}} across 75K+ test submissions.',
      'Split a seven-CTE MySQL query into concurrent Go `errgroup` queries: **8s → 3s** {{−63%}}.',
      'Removed **O(n²)** buffer copying from a React streaming hook.',
    ],
  },
  {
    org: 'OCV, LLC',
    logo: '/logos/ocv.png',
    title: 'Software Engineering Intern',
    location: 'Opelika, AL',
    start: '2025-09',
    end: '2026-08',
    bullets: [
      'Owned releases for **300+ mobile apps**, about **50 a month**.',
      'Fixed **100+ production defects**: crashes, config errors, failed deploys.',
      'Brought **200+ apps** into line with new Apple, Google, and accessibility rules.',
    ],
  },
  {
    org: 'Room2Room Movers',
    logo: '/logos/room2room.png',
    title: 'Software Engineering Intern',
    location: 'Auburn, AL',
    start: '2026-01',
    end: '2026-05',
    bullets: [
      'Built a lead-intake system: **200+ leads**, **$60K+** pipeline.',
      'Shipped **12+ features** on Firebase and Azure Functions for 30+ field operators.',
    ],
  },
];

export const projects: Project[] = [
  {
    name: 'World Cup Predictor',
    blurb: 'XGBoost and PyTorch models serving live match odds and 10,000-run tournament simulations.',
    stack: ['Python', 'PyTorch', 'XGBoost', 'FastAPI'],
    href: 'https://github.com/UlissesMolina/worldCup',
  },
  {
    name: 'Audaz',
    blurb: 'A C++ chess engine with alpha-beta search, a UCI interface, and an SFML board.',
    stack: ['C++', 'SFML', 'CMake'],
    href: 'https://github.com/UlissesMolina/Audaz',
  },
  {
    name: 'Trackr',
    blurb: 'Full-stack job application tracker with dashboard analytics.',
    stack: ['TypeScript', 'React', 'Express', 'PostgreSQL'],
    href: 'https://github.com/UlissesMolina/Trackr',
  },
  {
    name: 'Course Auto-Register',
    blurb: 'Watches for open seats and registers the moment one appears.',
    stack: ['Python', 'Selenium', 'Docker'],
    href: 'https://github.com/UlissesMolina/Tiger-Scheduler-Course-Auto-Register-Tool',
  },
];

export const skills: SkillGroup[] = [
  { name: 'Languages', items: ['Go', 'Python', 'TypeScript', 'JavaScript', 'Java', 'SQL', 'Bash'] },
  {
    name: 'Frameworks & libraries',
    items: ['React', 'React Native', 'Express', 'FastAPI', 'PyTorch', 'Selenium', 'Prisma'],
  },
  {
    name: 'Cloud & databases',
    items: ['AWS Lambda', 'API Gateway', 'Azure Functions', 'Firebase', 'PostgreSQL', 'MySQL'],
  },
  {
    name: 'Developer tools',
    items: ['Docker', 'Kubernetes', 'ArgoCD', 'Git', 'GitHub Actions', 'Jira', 'Xcode'],
  },
];
