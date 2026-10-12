import { Link } from 'react-router-dom';
import { VENUE } from '../data';

/** Phones only: the three things people actually need from a bar's website. */
export function BottomBar() {
  return (
    <nav className="bottom-bar" aria-label="Quick actions">
      <Link to="/" state={{ scrollTo: 'taps' }}>
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M6 3h12l-1.6 17.2a1 1 0 0 1-1 .8H8.6a1 1 0 0 1-1-.8z" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
          <path d="M6.9 10h10.2l-1 10.2H7.9z" fill="currentColor" opacity=".9" />
        </svg>
        Taps
      </Link>
      <a href={VENUE.directions} target="_blank" rel="noopener noreferrer">
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M12 2.5 20 21l-8-4-8 4z" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
        </svg>
        Directions
      </a>
      <a href={VENUE.phoneHref}>
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path
            d="M5 3.5h3.6l1.7 4.6-2.2 1.6a12 12 0 0 0 6.2 6.2l1.6-2.2 4.6 1.7V19a1.9 1.9 0 0 1-2 1.9C10.3 20.4 3.6 13.7 3.1 5.5A1.9 1.9 0 0 1 5 3.5z"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinejoin="round"
          />
        </svg>
        Call
      </a>
    </nav>
  );
}
