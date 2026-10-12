import { Link } from 'react-router-dom';
import { Octopus, Wordmark } from '../brand/Wordmark';
import { VENUE } from '../data';

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="wrap footer-grid">
        <div className="footer-brand">
          <Octopus className="footer-octo" />
          <Wordmark className="footer-mark" />
        </div>
        <address className="footer-address">
          {VENUE.fullName}
          <br />
          {VENUE.street}, {VENUE.square}
          <br />
          {VENUE.city} {VENUE.postcode}
          <br />
          <a href={VENUE.phoneHref}>{VENUE.phone}</a>
        </address>
        <nav className="footer-links" aria-label="Footer">
          <Link to="/drinks">Drinks</Link>
          <Link to="/whats-on">What’s on</Link>
          <a href={VENUE.instagram} target="_blank" rel="noopener noreferrer">
            Instagram
          </a>
          <a href={VENUE.facebook} target="_blank" rel="noopener noreferrer">
            Facebook
          </a>
        </nav>
      </div>
      <div className="wrap">
        <div className="footer-base">
          <span>Tønne is Norwegian for barrel.</span>
          <span>Site by AlexWilder-Dev</span>
        </div>
      </div>
    </footer>
  );
}
