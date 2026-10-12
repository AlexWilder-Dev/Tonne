import { m } from 'framer-motion';
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

/** The wordmark arriving: letters rise from behind the fascia, then the Ø lands. */
export function WordmarkRise({ className, title = 'Tønne' }: { className?: string; title?: string }) {
  const w = LOGO.wordmark;
  const ease = [0.2, 0.75, 0.2, 1] as const;
  return (
    <svg className={className} viewBox={w.viewBox} role="img" aria-label={title} focusable="false" overflow="visible">
      <defs>
        <clipPath id="rise-clip">
          <rect x="-20" y="-60" width="1600" height="470" />
        </clipPath>
      </defs>
      <g clipPath="url(#rise-clip)">
        <m.path
          fill="currentColor"
          fillRule="evenodd"
          d={w.ink}
          initial={{ y: 420 }}
          animate={{ y: 0 }}
          transition={{ duration: 0.9, ease, delay: 0.15 }}
        />
      </g>
      <m.path
        fill="var(--o-red)"
        fillRule="evenodd"
        d={w.red}
        style={{ transformBox: 'fill-box', transformOrigin: '50% 50%' }}
        initial={{ opacity: 0, scale: 1.6, rotate: -24 }}
        animate={{ opacity: 1, scale: 1, rotate: 0 }}
        transition={{ type: 'spring', stiffness: 260, damping: 16, delay: 0.75 }}
      />
    </svg>
  );
}
