import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { londonNow, parseAt, statusAt, type Moment, type Status } from './hours';

/** `?at=sat-23:30` before the hash, or `#/?at=sat-23:30` inside it. */
function readOverride(hashSearch: string): Moment | null {
  const fromPage = new URLSearchParams(window.location.search).get('at');
  const fromHash = new URLSearchParams(hashSearch).get('at');
  return parseAt(fromHash ?? fromPage);
}

export function useBarClock(): { at: Moment; status: Status; demo: boolean } {
  const { search } = useLocation();
  const override = readOverride(search);
  const demo = Boolean(override);
  const [now, setNow] = useState(() => londonNow());

  useEffect(() => {
    if (demo) return;
    const id = window.setInterval(() => setNow(londonNow()), 30_000);
    return () => window.clearInterval(id);
  }, [demo]);

  const at = override ?? now;
  return { at, status: statusAt(at), demo };
}
