import { useBarClock } from '../lib/useBarClock';
import { formatMoment, headline, subline } from '../lib/hours';

/** The fascia: are they open, and until when. Driven by London time, or ?at=sat-23:30 for demos. */
export function OpenStrip({ className = '' }: { className?: string }) {
  const { at, status, demo } = useBarClock();
  return (
    <div className={`open-strip ${className}`} data-open={status.open}>
      <span className="open-dot" aria-hidden="true" />
      <p className="open-text">
        <strong>{headline(status)}</strong>
        <span>{subline(status, at)}</span>
      </p>
      {demo && (
        <a className="demo-chip" href={import.meta.env.BASE_URL} title="Back to the real clock">
          Demo clock · {formatMoment(at)}
        </a>
      )}
    </div>
  );
}
