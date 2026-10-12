import { useRef, type ReactNode } from 'react';
import { m, useReducedMotion, useScroll, useTransform, type MotionValue } from 'framer-motion';

/** Moves its child a little slower than the page. `amount` is the drift in % of its own height. */
export function Parallax({
  children,
  className,
  amount = 12,
}: {
  children: ReactNode;
  className?: string;
  amount?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });
  const y = useTransform(scrollYProgress, [0, 1], [`-${amount}%`, `${amount}%`]);
  return (
    <div ref={ref} className={`parallax ${className ?? ''}`}>
      <m.div className="parallax-inner" style={reduce ? undefined : { y, scale: 1 + (amount * 2.2) / 100 }}>
        {children}
      </m.div>
    </div>
  );
}

/** Letters that pop up one after another when they come into view. */
export function PopText({ text, className }: { text: string; className?: string }) {
  const words = text.split(' ');
  let n = 0;
  return (
    <span className={className} aria-label={text} role="text">
      {words.map((word, wi) => (
        <span key={wi}>
          <span className="pop-word" aria-hidden="true">
            {word.split('').map((ch) => {
              const i = n++;
              return (
                <m.span
                  key={i}
                  className="pop-char"
                  initial={{ y: '0.6em', scale: 0.4, opacity: 0 }}
                  whileInView={{ y: 0, scale: 1, opacity: 1 }}
                  viewport={{ once: true, amount: 0.6 }}
                  transition={{
                    type: 'spring',
                    stiffness: 520,
                    damping: 14,
                    delay: 0.1 + i * 0.045,
                  }}
                >
                  {ch}
                </m.span>
              );
            })}
          </span>
          {wi < words.length - 1 ? ' ' : ''}
        </span>
      ))}
    </span>
  );
}

function LitWord({
  word,
  progress,
  from,
  to,
}: {
  word: string;
  progress: MotionValue<number>;
  from: number;
  to: number;
}) {
  const opacity = useTransform(progress, [from, to], [0.18, 1]);
  return (
    <>
      <m.span style={{ opacity }}>{word}</m.span>{' '}
    </>
  );
}

/** Words light up in turn as the passage scrolls through the middle of the screen. */
export function LitText({ text, className }: { text: string; className?: string }) {
  const ref = useRef<HTMLParagraphElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start 0.9', 'end 0.55'],
  });
  const words = text.split(' ');
  if (reduce) return <p className={className}>{text}</p>;
  return (
    <p ref={ref} className={className}>
      {words.map((w, i) => (
        <LitWord key={i} word={w} progress={scrollYProgress} from={i / words.length} to={(i + 1) / words.length} />
      ))}
    </p>
  );
}
