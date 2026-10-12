import { useId } from 'react';
import { m, type Variants } from 'framer-motion';

type Kind = 'akvavit' | 'tequila' | 'wine';

const SHAPES: Record<Kind, { bowl: string; extra?: string[]; liquid: string; top: number; garnish?: { d: string; fill: string } }> = {
  // Stemmed tulip, the way akvavit is poured in Norway
  akvavit: {
    bowl: 'M24 12 H56 C56 36 53 50 40 55 C27 50 24 36 24 12 Z',
    extra: ['M40 55 V98', 'M25 102 C31 97 49 97 55 102 C49 105.5 31 105.5 25 102 Z'],
    liquid: '#f3e4ad',
    top: 22,
  },
  // Caballito with a wedge of lime on the rim
  tequila: {
    bowl: 'M27 22 H53 L49.5 102 Q49 106 45 106 H35 Q31 106 30.5 102 Z',
    liquid: '#e7a63c',
    top: 36,
    garnish: { d: 'M47 22 A11 11 0 0 1 69 22 Z', fill: '#a9c95b' },
  },
  wine: {
    bowl: 'M21 10 H59 C61 38 54 53 40 55 C26 53 19 38 21 10 Z',
    extra: ['M40 55 V98', 'M23 102 C30 97 50 97 57 102 C50 105.5 30 105.5 23 102 Z'],
    liquid: '#52070f',
    top: 30,
  },
};

const draw: Variants = {
  hidden: { pathLength: 0, opacity: 0 },
  shown: (i: number) => ({ pathLength: 1, opacity: 1, transition: { duration: 1.1, delay: i * 0.15, ease: [0.3, 0.6, 0.2, 1] } }),
};

const pour: Variants = {
  hidden: { y: 70 },
  shown: { y: 0, transition: { duration: 1, delay: 0.9, ease: [0.2, 0.7, 0.2, 1] } },
};

const pop: Variants = {
  hidden: { scale: 0, opacity: 0 },
  shown: { scale: 1, opacity: 1, transition: { type: 'spring', stiffness: 400, damping: 14, delay: 1.6 } },
};

/** A drink drawn in one line, then poured. */
export function Glassware({ kind, className }: { kind: Kind; className?: string }) {
  const s = SHAPES[kind];
  const clip = `gw-${useId().replace(/:/g, '')}`;
  return (
    <m.svg
      className={className}
      viewBox="0 0 80 110"
      aria-hidden="true"
      initial="hidden"
      whileInView="shown"
      viewport={{ once: true, amount: 0.6 }}
    >
      <defs>
        <clipPath id={clip}>
          <path d={s.bowl} />
        </clipPath>
      </defs>
      <g clipPath={`url(#${clip})`}>
        <m.rect x="0" y={s.top} width="80" height="110" fill={s.liquid} variants={pour} />
      </g>
      {s.garnish && <m.path d={s.garnish.d} fill={s.garnish.fill} variants={pop} style={{ transformOrigin: '58px 22px' }} />}
      <m.path d={s.bowl} fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinejoin="round" variants={draw} custom={0} />
      {s.extra?.map((d, i) => (
        <m.path key={d} d={d} fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" variants={draw} custom={i + 1} />
      ))}
      <m.path d="M30 18 C30 30 31 40 34 46" fill="none" stroke="rgba(255,255,255,0.5)" strokeWidth="2" strokeLinecap="round" variants={draw} custom={2} />
    </m.svg>
  );
}
