import { LOGO } from './paths';

type Props = { className?: string; title?: string; ink?: string; mark?: string };

/** TØNNE, traced from the bar's own logo. Ink follows `currentColor`; the Ø stays red. */
export function Wordmark({ className, title = 'Tønne', ink = 'currentColor', mark = 'var(--o-red)' }: Props) {
  const w = LOGO.wordmark;
  return (
    <svg className={className} viewBox={w.viewBox} role="img" aria-label={title} focusable="false">
      <path fill={ink} fillRule="evenodd" d={w.ink} />
      <path fill={mark} fillRule="evenodd" d={w.red} />
    </svg>
  );
}

/** Just the Ø, cropped out of the wordmark. */
export function OMark({ className, fill = 'var(--o-red)', title }: { className?: string; fill?: string; title?: string }) {
  const w = LOGO.wordmark;
  return (
    <svg
      className={className}
      viewBox="296 0 290 397"
      role={title ? 'img' : undefined}
      aria-label={title}
      aria-hidden={title ? undefined : true}
      focusable="false"
    >
      <path fill={fill} fillRule="evenodd" d={w.red} />
    </svg>
  );
}

/** The octopus round the barrel, from the bar's logo. */
export function Octopus({
  className,
  paper = 'var(--cream)',
  ink = 'var(--ink)',
  title,
}: {
  className?: string;
  paper?: string;
  ink?: string;
  title?: string;
}) {
  const o = LOGO.octopus;
  return (
    <svg
      className={className}
      viewBox={o.viewBox}
      role={title ? 'img' : undefined}
      aria-label={title}
      aria-hidden={title ? undefined : true}
      focusable="false"
    >
      <path fill={paper} d={o.paper} />
      <path fill={ink} fillRule="evenodd" d={o.ink} />
      <path fill="var(--o-red)" fillRule="evenodd" d={o.red} />
    </svg>
  );
}
