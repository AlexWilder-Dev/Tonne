import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/** Scrolls to the section a link asked for (`state.scrollTo`), once the page is on screen. */
export function useScrollTarget() {
  const { state, key } = useLocation();
  const target = (state as { scrollTo?: string } | null)?.scrollTo;

  useEffect(() => {
    if (!target) return;
    const frame = requestAnimationFrame(() => {
      const el = document.getElementById(target) ?? document.getElementById(`d-${target}`);
      const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      el?.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'start' });
    });
    return () => cancelAnimationFrame(frame);
  }, [target, key]);
}
