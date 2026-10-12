import { Link } from 'react-router-dom';
import { Wordmark } from '../brand/Wordmark';
import { HoursTable } from '../components/HoursTable';
import { OpenStrip } from '../components/OpenStrip';
import { Photo } from '../components/Photo';
import { PickYourThirds } from '../components/PickYourThirds';
import { Reveal } from '../components/Reveal';
import { Stars } from '../components/Stars';
import { REVIEWS, SHOWS, TAPS, VENUE } from '../data';

export function Home() {
  return (
    <>
      <Hero />
      <Taps />
      <Cocktails />
      <Square />
      <Upstairs />
      <Comedy />
      <Reviews />
      <FindUs />
    </>
  );
}

function Hero() {
  const named = TAPS.filter((t) => !t.sample).map((t) => t.name);
  return (
    <section className="hero" aria-label="Tønne">
      <div className="hero-grid wrap">
        <div className="hero-photo">
          <Photo k="night" eager position="28% 50%" />
        </div>
        <div className="hero-copy">
          <p className="kicker hero-kicker">
            <span className="hide-sm">{VENUE.street} · </span>
            {VENUE.square} · {VENUE.city}
          </p>
          <h1 className="hero-title">
            <Wordmark className="hero-mark" title="Tønne" />
          </h1>
          <p className="hero-line">Craft beer by the third. Cocktails, akvavit and late nights in the square.</p>
          <OpenStrip className="hero-strip" />
          <Link to="/" state={{ scrollTo: 'taps' }} className="btn btn-cream hero-cta">
            <span>What’s pouring</span>
            <small>
              {named.join(', ')} + {TAPS.length - named.length} more
            </small>
          </Link>
        </div>
      </div>
    </section>
  );
}

function Taps() {
  return (
    <section id="taps" className="sec sec-taps" aria-labelledby="taps-title">
      <div className="wrap">
        <div className="sec-head thirds">
          <Reveal>
            <p className="kicker">Seven keg taps</p>
            <h2 id="taps-title" className="h2">
              Pick your thirds
            </h2>
          </Reveal>
          <Reveal className="span-2 lede" delay={0.08}>
            <p>
              Mostly the unusual stuff, and all of it poured in thirds, so a wrong guess costs you a third, not a pint. Tap
              three to fill the paddle, then hold your phone up at the bar.
            </p>
          </Reveal>
        </div>

        <PickYourThirds />

        <div className="taps-notes thirds">
          <Reveal className="note note-third">
            <p className="note-big">
              <span className="frac">
                <sup>1</sup>
                <span>/</span>
                <sub>3</sub>
              </span>
              <span className="note-big-unit">pint</span>
            </p>
            <p>Everything on tap comes as a third. Get round more of the board before last orders.</p>
          </Reveal>
          <Reveal className="note note-tray" delay={0.08}>
            <h3 className="h4">Flights &amp; trays</h3>
            <p>Three on a paddle is a flight. More than that, ask for a tray and work along it.</p>
            <p className="note-aside">There are cans and bottles too, a large range of them.</p>
            <Link className="link-arrow" to="/drinks">
              The drinks list
            </Link>
          </Reveal>
          <Reveal className="note note-sour" delay={0.16}>
            <h3 className="h4">Not a beer person?</h3>
            <p>
              Start with a third of the sour. It’s how a lot of people find out they are one. Belgian on the taps too, for
              the ones who already know.
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function Cocktails() {
  return (
    <section className="sec sec-red" aria-labelledby="cocktails-title">
      <div className="wrap thirds">
        <Reveal className="cocktails-intro">
          <p className="kicker">Not a beer night</p>
          <h2 id="cocktails-title" className="h2">
            Cocktails, akvavit &amp; wine
          </h2>
          <p>Same bar, different glass. Ask what’s being shaken tonight.</p>
          <Link className="link-arrow" to="/drinks" state={{ scrollTo: 'cocktails' }}>
            Cocktails &amp; wine
          </Link>
        </Reveal>
        <ol className="span-2 spirits">
          <Reveal as="li" className="spirit">
            <span className="spirit-name">Akvavit</span>
            <span className="spirit-line">
              The Norwegian one, as you might have guessed from the name over the door. Caraway, dill, and it turns up in the
              cocktails.
            </span>
          </Reveal>
          <Reveal as="li" className="spirit" delay={0.06}>
            <span className="spirit-name">Tequila</span>
            <span className="spirit-line">For when the evening changes its mind.</span>
          </Reveal>
          <Reveal as="li" className="spirit" delay={0.12}>
            <span className="spirit-name">Wine</span>
            <span className="spirit-line">
              This was {VENUE.formerly}, a wine bar, until {VENUE.opened}. Some habits stuck.
            </span>
          </Reveal>
        </ol>
      </div>
    </section>
  );
}

function Square() {
  return (
    <section className="sec sec-cream sec-square" aria-labelledby="square-title">
      <div className="wrap square-grid">
        <Reveal className="square-photo">
          <Photo k="frontage" position="50% 60%" />
          <span className="photo-cap">Out front, 2022</span>
        </Reveal>
        <div className="square-copy">
          <Reveal>
            <p className="kicker">Tables outside</p>
            <h2 id="square-title" className="h2">
              Out in the square
            </h2>
            <p className="lede">
              Plenty of seats out on the paving under the birches. Grab one early on a warm evening; everyone else has the
              same idea.
            </p>
          </Reveal>
          <div className="square-pair">
            <Reveal className="square-dogs">
              <h3 className="h3">Dogs welcome.</h3>
              <p>There’s water down for them. Owners, see the taps above.</p>
            </Reveal>
            <Reveal className="square-popcorn" delay={0.08}>
              <h3 className="h3">
                Popcorn,
                <br />
                on tap.
              </h3>
              <p>Fresh, and exactly what it sounds like.</p>
            </Reveal>
          </div>
        </div>
      </div>

      <div className="barrier" aria-hidden="true">
        <div className="barrier-track">
          {Array.from({ length: 9 }, (_, i) => (
            <span key={i}>TØNNE</span>
          ))}
        </div>
      </div>

      <div className="wrap late-grid">
        <Reveal className="late-copy">
          <p className="late-big">
            Till 2.
            <br />
            Till 3 on Fridays &amp; Saturdays.
          </p>
          <p className="lede">Late every night of the week, and the music leans classic rock.</p>
        </Reveal>
        <Reveal className="late-photo" delay={0.08}>
          <Photo k="outfront" position="50% 70%" />
          <span className="photo-cap">October 2020. Jumping optional.</span>
        </Reveal>
      </div>
    </section>
  );
}

function Upstairs() {
  return (
    <section className="sec sec-upstairs" aria-labelledby="upstairs-title">
      <div className="wrap">
        <ol className="stairs">
          <Reveal as="li" className="step step-1">
            <p className="kicker">Ground floor</p>
            <p className="step-title">The bar</p>
            <p>Seven taps, the popcorn, the classic rock, the door to the square.</p>
          </Reveal>
          <Reveal as="li" className="step step-2" delay={0.08}>
            <p className="kicker">First floor</p>
            <h2 id="upstairs-title" className="h2">
              Upstairs
            </h2>
            <p>A quieter room above the bar, for when you’d like to hear each other.</p>
          </Reveal>
          <Reveal as="li" className="step step-3" delay={0.16}>
            <h3 className="h3">Bringing a group?</h3>
            <p>Give the bar a ring first and talk it through.</p>
            <a className="btn btn-red group-call" href={VENUE.phoneHref}>
              Call {VENUE.phone}
            </a>
          </Reveal>
        </ol>
      </div>
    </section>
  );
}

function Comedy() {
  const names = SHOWS.map((s) => s.act ?? 'Opinion War');
  return (
    <section className="sec sec-comedy" aria-labelledby="comedy-title">
      <div className="wrap thirds">
        <Reveal className="comedy-head">
          <p className="kicker">Leicester Comedy Festival · Feb 2026</p>
          <h2 id="comedy-title" className="h2">
            Comedy at Tønne
          </h2>
          <p className="comedy-count">
            <span>{SHOWS.length}</span> shows in a fortnight
          </p>
          <Link className="btn btn-cream" to="/whats-on">
            Who’s played Tønne
          </Link>
        </Reveal>
        <Reveal className="span-2 bill" delay={0.08}>
          <p className="bill-names">
            {names.map((n, i) => (
              <span key={n} className={`bill-name bill-${i % 3}`}>
                {n}
              </span>
            ))}
          </p>
          <p className="bill-foot">Works in progress, Crisps and a Lie Down, and one Opinion War. The festival comes round every February.</p>
        </Reveal>
      </div>
    </section>
  );
}

function Reviews() {
  const [big, ...rest] = REVIEWS;
  return (
    <section className="sec sec-pine" aria-labelledby="reviews-title">
      <div className="wrap thirds">
        <Reveal className="rating">
          <h2 id="reviews-title" className="kicker">
            What people say
          </h2>
          <p className="rating-num">{VENUE.rating}</p>
          <Stars rating={VENUE.rating} className="rating-stars" />
          <p className="rating-count">from {VENUE.reviewCount} Google reviews</p>
        </Reveal>
        <div className="span-2 quotes">
          <Reveal as="div" className="quote quote-big" delay={0.06}>
            <blockquote>
              <p>“{big.text}”</p>
            </blockquote>
            <p className="quote-src">{big.source}</p>
          </Reveal>
          {rest.map((r, i) => (
            <Reveal key={r.text} className={`quote quote-small quote-${i}`} delay={0.12 + i * 0.06}>
              <blockquote>
                <p>“{r.text}”</p>
              </blockquote>
              <p className="quote-src">{r.source}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function FindUs() {
  return (
    <section id="find-us" className="sec sec-find" aria-labelledby="find-title">
      <div className="wrap">
        <div className="sec-head thirds">
          <Reveal>
            <p className="kicker">{VENUE.square}</p>
            <h2 id="find-title" className="h2">
              Find us
            </h2>
          </Reveal>
          <Reveal className="span-2">
            <OpenStrip className="find-strip" />
          </Reveal>
        </div>
        <div className="thirds find-grid">
          <Reveal className="find-hours">
            <div className="door">
              <h3 className="door-head">Opening hours</h3>
              <HoursTable />
            </div>
          </Reveal>
          <Reveal className="find-where" delay={0.06}>
            <div className="plate">
              <p className="plate-big">{VENUE.street}</p>
              <p className="plate-small">
                {VENUE.square} · {VENUE.city} {VENUE.postcode}
              </p>
            </div>
            <p className="find-note">In the lanes of St Martin’s Square, off Silver Street. Look for the TØNNE sign and the tables outside.</p>
            <a className="btn btn-cream" href={VENUE.directions} target="_blank" rel="noopener noreferrer">
              Directions
            </a>
          </Reveal>
          <Reveal className="find-contact" delay={0.12}>
            <h3 className="h4">Ring the bar</h3>
            <a className="find-phone" href={VENUE.phoneHref}>
              {VENUE.phone}
            </a>
            <h3 className="h4 find-follow">Follow</h3>
            <ul className="socials">
              <li>
                <a href={VENUE.instagram} target="_blank" rel="noopener noreferrer">
                  Instagram <span>{VENUE.instagramHandle}</span>
                </a>
              </li>
              <li>
                <a href={VENUE.facebook} target="_blank" rel="noopener noreferrer">
                  Facebook <span>/tonnebar</span>
                </a>
              </li>
            </ul>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
