import { Link, NavLink } from 'react-router-dom';
import { Wordmark } from '../brand/Wordmark';
import { VENUE } from '../data';

export function Header() {
  return (
    <header className="site-header">
      <div className="wrap header-row">
        <Link to="/" className="brand" aria-label="Tønne, home">
          <Wordmark className="brand-mark" title="Tønne" />
        </Link>
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
    </header>
  );
}
