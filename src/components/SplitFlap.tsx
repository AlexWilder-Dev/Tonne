import { m, useReducedMotion } from 'framer-motion';

type Props = { text: string; length?: number; className?: string };

/** Departure-board letters. Each tile flips in turn when the text changes. */
export function SplitFlap({ text, length = 12, className = '' }: Props) {
  const reduce = useReducedMotion();
  const chars = text.toUpperCase().padEnd(length, ' ').slice(0, length).split('');
  return (
    <span className={`flap ${className}`} aria-hidden="true">
      {chars.map((c, i) => (
        <span className="flap-tile" key={i}>
          <m.span
            key={`${text}-${i}`}
            className="flap-char"
            initial={reduce ? false : { rotateX: -90, opacity: 0 }}
            animate={{ rotateX: 0, opacity: 1 }}
            transition={{ duration: 0.32, delay: i * 0.035, ease: [0.3, 0.7, 0.2, 1] }}
          >
            {c === ' ' ? ' ' : c}
          </m.span>
        </span>
      ))}
    </span>
  );
}
