import { Fragment } from 'react';

const TOKEN = /(\*\*[^*]+\*\*|\{\{[^}]+\}\}|`[^`]+`)/g;

/** Renders the inline markup documented in `src/data/profile.ts`. */
export function RichText({ text }: { text: string }) {
  return (
    <>
      {text.split(TOKEN).map((part, i) => {
        if (part.startsWith('**')) return <strong key={i}>{part.slice(2, -2)}</strong>;
        if (part.startsWith('{{')) return <mark key={i}>{part.slice(2, -2)}</mark>;
        if (part.startsWith('`')) return <code key={i}>{part.slice(1, -1)}</code>;
        return <Fragment key={i}>{part}</Fragment>;
      })}
    </>
  );
}
