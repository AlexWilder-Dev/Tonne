import { useEffect, useRef } from 'react';
import { m } from 'framer-motion';
import { STYLE_COLOURS, type Tap } from '../data';
import { Glass } from './Glass';
import { Wordmark } from '../brand/Wordmark';

type Props = { taps: Tap[]; onClose: () => void };

/** The order, big enough to hold up across the bar. */
export function ShowTheBar({ taps, onClose }: Props) {
  const close = useRef<HTMLButtonElement>(null);
  const onCloseRef = useRef(onClose);
  onCloseRef.current = onClose;

  useEffect(() => {
    const previous = document.activeElement as HTMLElement | null;
    close.current?.focus();
    document.documentElement.classList.add('is-locked');

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onCloseRef.current();
      if (e.key === 'Tab') {
        e.preventDefault();
        close.current?.focus();
      }
    };
    window.addEventListener('keydown', onKey);

    // Keep the phone screen on while it's held up, where supported
    let lock: { release: () => Promise<void> } | undefined;
    const nav = navigator as Navigator & { wakeLock?: { request: (t: 'screen') => Promise<{ release: () => Promise<void> }> } };
    nav.wakeLock?.request('screen').then((l) => (lock = l)).catch(() => {});

    // Phones: go properly full-screen
    const coarse = window.matchMedia('(pointer: coarse)').matches;
    if (coarse && document.fullscreenEnabled && !document.fullscreenElement) {
      document.documentElement.requestFullscreen?.().catch(() => {});
    }

    return () => {
      window.removeEventListener('keydown', onKey);
      document.documentElement.classList.remove('is-locked');
      lock?.release().catch(() => {});
      if (document.fullscreenElement) document.exitFullscreen().catch(() => {});
      previous?.focus?.();
    };
  }, []);

  const ask = taps.length === 1 ? 'A third of this, please' : 'A third of each, please';

  return (
    <m.div
      className="stb"
      role="dialog"
      aria-modal="true"
      aria-label="Your order"
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 24 }}
      transition={{ duration: 0.28, ease: [0.2, 0.7, 0.2, 1] }}
    >
      <div className="stb-top">
        <Wordmark className="stb-mark" ink="var(--ink)" mark="var(--red)" />
        <button ref={close} type="button" className="stb-close" onClick={onClose}>
          Done
        </button>
      </div>
      <p className="stb-ask">{ask}</p>
      <ol className="stb-list">
        {taps.map((t, i) => {
          const c = STYLE_COLOURS[t.style];
          return (
            <li key={t.id} className="stb-item">
              <Glass className="stb-glass" filled pourOnMount beer={c.beer} head={c.head} delay={0.25 + i * 0.25} />
              <span className="stb-name">{t.name}</span>
              <span className="stb-note">{t.sample ? 'sample tap' : t.note}</span>
            </li>
          );
        })}
      </ol>
      <p className="stb-foot">Want more? Ask for a tray.</p>
    </m.div>
  );
}
