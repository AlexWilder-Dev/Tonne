import { useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { m, useMotionValueEvent, useScroll } from 'framer-motion';
import { Wordmark } from '../brand/Wordmark';
import { VENUE } from '../data';
import { useBarClock } from '../lib/useBarClock';
import { headline } from '../lib/hours';

/** Floats over the hero, turns solid once you scroll, tucks away on the way down. */
export function Header() {
  const { pathname } = useLocation();
  const { scrollY } = useScroll();
  const { status } = useBarClock();
  const [solid, setSolid] = useState(false);
  const [hidden, setHidden] = useState(false);

  useMotionValueEvent(scrollY, 'change', (y) => {
    const prev = scrollY.getPrevious() ?? 0;
    setSolid(y > 24);
    setHidden(y > 240 && y > prev + 2);
    if (y < prev - 2) setHidden(false);
  });

  const overHero = pathname === '/' && !solid;

  return (
    <m.header
      className={`site-header${overHero ? ' is-clear' : ''}`}
      initial={false}
      animate={{ y: hidden ? '-100%' : '0%' }}
      transition={{ duration: 0.3, ease: [0.2, 0.7, 0.2, 1] }}
    >
      <div className="wrap header-row">
        <Link to="/" className="brand" aria-label="Tønne, home">
          <Wordmark className="brand-mark" title="Tønne" />
        </Link>
        <span className={`header-status${status.open ? ' is-open' : ''}`} aria-hidden="true">
          <span className="header-dot" />
          {headline(status)}
        </span>
        <nav className="main-nav" aria-label="Main">
          <NavLink to="/drinks">Drinks</NavLink>
          <NavLink to="/whats-on">What’s on</NavLink>
          <Link to="/" state={{ scrollTo: 'find-us' }} className="hide-sm">
            Find us
          </Link>
        </nav>
        <a className="header-phone" href={VENUE.phoneHref}>
          {VENUE.phone}
        </a>
      </div>
    </m.header>
  );
}
