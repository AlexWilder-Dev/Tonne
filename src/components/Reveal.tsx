import type { ReactNode } from 'react';
import { m } from 'framer-motion';

type Props = { children: ReactNode; className?: string; delay?: number; as?: 'div' | 'li' | 'section' };

/** Lifts content in once as it scrolls into view. Reduced motion skips the movement. */
export function Reveal({ children, className, delay = 0, as = 'div' }: Props) {
  const Tag = m[as];
  return (
    <Tag
      className={className}
      initial={{ opacity: 0, y: 22 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.6, ease: [0.2, 0.7, 0.2, 1], delay }}
    >
      {children}
    </Tag>
  );
}
