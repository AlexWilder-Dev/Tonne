import { useId } from 'react';
import { m } from 'framer-motion';

type Props = {
  beer?: string;
  head?: string;
  filled: boolean;
  className?: string;
  delay?: number;
  /** Pour on first render instead of appearing full. */
  pourOnMount?: boolean;
};

const EMPTY = 76;
const BUBBLES = [
  { x: 21, r: 1.4, d: 0 },
  { x: 29, r: 1.1, d: 0.7 },
  { x: 37, r: 1.6, d: 1.3 },
  { x: 44, r: 1.2, d: 0.35 },
];

/** A third-pint glass. Pours, with a stream from the tap, when `filled` flips on. */
export function Glass({ beer = '#efc25c', head = '#fbf4e2', filled, className, delay = 0, pourOnMount = false }: Props) {
  const clip = `glass-${useId().replace(/:/g, '')}`;
  return (
    <svg className={className} viewBox="0 -26 64 122" aria-hidden="true" focusable="false">
      <defs>
        <clipPath id={clip}>
          <path d="M10.6 9 H53.4 L48.3 84.6 Q47.9 88 44.6 88 H19.4 Q16.1 88 15.7 84.6 Z" />
        </clipPath>
      </defs>
      {/* the stream from the tap */}
      <m.rect
        x="30.5"
        y="-26"
        width="3"
        height="114"
        rx="1.5"
        fill={beer}
        style={{ originY: 0 }}
        initial={pourOnMount ? { scaleY: 0, opacity: 0 } : false}
        animate={filled ? { scaleY: [0, 1, 1, 1], opacity: [1, 1, 1, 0] } : { scaleY: 0, opacity: 0 }}
        transition={filled ? { duration: 1.15, times: [0, 0.18, 0.8, 1], delay } : { duration: 0.2 }}
      />
      <g clipPath={`url(#${clip})`}>
        <rect x="0" y="0" width="64" height="96" fill="rgba(255,255,255,0.05)" />
        <m.g
          initial={pourOnMount ? { y: EMPTY } : false}
          animate={{ y: filled ? 0 : EMPTY }}
          transition={{ duration: filled ? 0.95 : 0.35, ease: filled ? [0.2, 0.7, 0.2, 1] : 'easeIn', delay: filled ? delay + 0.12 : 0 }}
        >
          <m.rect x="0" y="24" width="64" height="72" animate={{ fill: beer }} transition={{ duration: 0.3 }} />
          <m.rect x="0" y="14" width="64" height="11" rx="2" animate={{ fill: head }} transition={{ duration: 0.3 }} />
        </m.g>
        {filled &&
          BUBBLES.map((b) => (
            <circle
              key={b.x}
              className="bubble"
              cx={b.x}
              cy="84"
              r={b.r}
              style={{ animationDelay: `${1.1 + delay + b.d}s` }}
            />
          ))}
      </g>
      <path
        d="M8 6 H56 L50.6 85 Q50.1 91 44.8 91 H19.2 Q13.9 91 13.4 85 Z"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.6"
        strokeLinejoin="round"
      />
      <path d="M15 14 L18.6 78" stroke="rgba(255,255,255,0.45)" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}
