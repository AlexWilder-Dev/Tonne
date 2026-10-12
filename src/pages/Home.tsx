import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { m, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import { WordmarkRise } from '../brand/Wordmark';
import { Glassware } from '../components/Glassware';
import { HoursTable } from '../components/HoursTable';
import { LitText, Parallax, PopText } from '../components/Motion';
import { OpenStrip } from '../components/OpenStrip';
import { Photo } from '../components/Photo';
import { PickYourThirds } from '../components/PickYourThirds';
import { Reveal } from '../components/Reveal';
import { SplitFlap } from '../components/SplitFlap';
import { Stars } from '../components/Stars';
import { REVIEWS, SHOWS, TAPS, VENUE } from '../data';
import { useScrollTarget } from '../lib/useScrollTarget';

export function Home() {
  useScrollTarget();
  return (
    <>
      <Hero />
      <Taps />
      <Cocktails />
      <Square />
      <Upstairs />
      <Comedy />
      <Reviews />
      <SignBand />
      <FindUs />
    </>
  );
}

/* ---------- Hero ---------- */

function Hero() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const photoY = useTransform(scrollYProgress, [0, 1], ['0%', '16%']);
  const copyY = useTransform(scrollYProgress, [0, 1], ['0%', '-22%']);

  return (
    <section ref={ref} className="hero" aria-label="Tønne">
      <div className="hero-media">
        <m.div className="hero-media-inner" style={reduce ? undefined : { y: photoY }}>
          <m.div
            className="hero-zoom"
            initial={reduce ? false : { scale: 1.12 }}
            animate={{ scale: 1.02 }}
            transition={{ duration: 2.4, ease: [0.2, 0.7, 0.2, 1] }}
          >
            <Photo k="frontage" eager sizes="(min-width: 900px) 66vw, 100vw" position="50% 58%" />
          </m.div>
        </m.div>
      </div>

      <m.div className="wrap hero-grid" style={reduce ? undefined : { y: copyY }}>
        <div className="hero-copy">
          <m.p
            className="kicker hero-kicker"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.6 }}
          >
            <span className="hide-sm">{VENUE.street} · </span>
            {VENUE.square} · {VENUE.city}
          </m.p>
          <h1 className="hero-title">
            <WordmarkRise className="hero-mark" />
          </h1>
          <m.p
            className="hero-line"
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.0, duration: 0.7 }}
          >
            Craft beer by the third. Cocktails, akvavit and late nights in the square.
          </m.p>
        </div>
      </m.div>

      <m.div
        className="fascia"
        initial={{ y: '100%' }}
        animate={{ y: '0%' }}
        transition={{ delay: 0.45, duration: 0.8, ease: [0.2, 0.7, 0.2, 1] }}
      >
        <div className="wrap fascia-grid">
          <OpenStrip className="fascia-cell fascia-status" />
          <PouringTicker />
          <a className="fascia-cell fascia-where" href={VENUE.directions} target="_blank" rel="noopener noreferrer">
            <span className="fascia-label">Find us</span>
            <span className="fascia-big">1-3 St Martins</span>
            <span className="fascia-small">Directions ↗</span>
          </a>
        </div>
      </m.div>
    </section>
  );
}

/** What's pouring, on a flip board: one line at a time, links to the taps. */
function PouringTicker() {
  const reduce = useReducedMotion();
  const [i, setI] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (reduce || paused) return;
    const id = window.setInterval(() => setI((n) => (n + 1) % TAPS.length), 2600);
    return () => window.clearInterval(id);
  }, [reduce, paused]);

  const tap = TAPS[i];
  const named = TAPS.filter((t) => !t.sample).map((t) => t.name);
  return (
    <Link
      to="/"
      state={{ scrollTo: 'taps' }}
      className="fascia-cell fascia-pouring"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      aria-label={`What’s pouring: ${named.join(', ')} and ${TAPS.length - named.length} more. See the taps.`}
    >
      <span className="fascia-label">
        What’s pouring · line {String(i + 1).padStart(2, '0')}/{String(TAPS.length).padStart(2, '0')}
        {tap.sample && <span className="tag-sample">Sample</span>}
      </span>
      <SplitFlap text={tap.name} className="fascia-flap" />
      <span className="fascia-small">See all seven →</span>
    </Link>
  );
}

/* ---------- Pick your thirds ---------- */

function Taps() {
  return (
    <section id="taps" className="sec sec-taps" aria-labelledby="taps-title">
      <div className="wrap">
        <div className="sec-head thirds taps-head">
          <Reveal>
            <p className="kicker">Seven keg taps</p>
            <h2 id="taps-title" className="h2">
              Pick your thirds
            </h2>
          </Reveal>
          <Reveal className="lede" delay={0.08}>
            <p>
              Mostly the unusual stuff, and all of it poured in thirds, so a wrong guess costs you a third, not a pint. Tap
              three to fill the paddle, then hold your phone up at the bar.
            </p>
          </Reveal>
          <Reveal className="board-photo" delay={0.16}>
            <figure>
              <Photo k="board" sizes="(min-width: 900px) 30vw, 100vw" />
              <figcaption className="photo-cap">The board, 2019. Their Ø, not ours.</figcaption>
            </figure>
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

/* ---------- Cocktails ---------- */

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
            <Glassware kind="akvavit" className="spirit-glass" />
            <span className="spirit-name">Akvavit</span>
            <span className="spirit-line">
              The Norwegian one, as you might have guessed from the name over the door. Caraway, dill, and it turns up in the
              cocktails.
            </span>
          </Reveal>
          <Reveal as="li" className="spirit" delay={0.06}>
            <Glassware kind="tequila" className="spirit-glass" />
            <span className="spirit-name">Tequila</span>
            <span className="spirit-line">For when the evening changes its mind.</span>
          </Reveal>
          <Reveal as="li" className="spirit" delay={0.12}>
            <Glassware kind="wine" className="spirit-glass" />
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

/* ---------- Out in the square ---------- */

function Square() {
  return (
    <section className="sec sec-cream sec-square" aria-labelledby="square-title">
      <div className="wrap square-grid">
        <div className="square-collage">
          <Reveal className="collage-main">
            <Parallax amount={7} className="collage-frame">
              <Photo k="outside" sizes="(min-width: 900px) 60vw, 100vw" position="50% 60%" />
            </Parallax>
            <span className="photo-cap">A sunny one, 2019</span>
          </Reveal>
          <m.figure
            className="polaroid"
            initial={{ opacity: 0, rotate: 9, y: 40 }}
            whileInView={{ opacity: 1, rotate: 3.5, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ type: 'spring', stiffness: 120, damping: 14, delay: 0.25 }}
          >
            <Photo k="outfront" sizes="260px" position="50% 70%" />
            <figcaption>Oct 2020. Jumping optional.</figcaption>
          </m.figure>
        </div>
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
          <Reveal className="square-dogs">
            <h3 className="h3">Dogs welcome.</h3>
            <p>There’s water down for them. Owners, see the taps above.</p>
          </Reveal>
          <div className="square-popcorn">
            <h3 className="h3 popcorn-head">
              <PopText text="Popcorn, on tap." />
            </h3>
            <p>Fresh, and exactly what it sounds like.</p>
          </div>
        </div>
      </div>

      <Barrier />

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
          <figure>
            <Photo k="night" sizes="(min-width: 900px) 400px, 100vw" position="30% 50%" />
            <figcaption className="photo-cap">After dark on St Martin’s Walk.</figcaption>
          </figure>
        </Reveal>
      </div>
    </section>
  );
}

/** The barriers out front. Drifts as you scroll. */
function Barrier() {
  const reduce = useReducedMotion();
  const { scrollY } = useScroll();
  const x = useTransform(scrollY, (v) => `${-((v * 0.12) % 1000)}px`);
  return (
    <div className="barrier" aria-hidden="true">
      <m.div className="barrier-track" style={reduce ? undefined : { x }}>
        {Array.from({ length: 12 }, (_, i) => (
          <span key={i}>TØNNE</span>
        ))}
      </m.div>
    </div>
  );
}

/* ---------- Upstairs ---------- */

function Upstairs() {
  const step = (i: number) => ({
    initial: { y: 90, opacity: 0 },
    whileInView: { y: 0, opacity: 1 },
    viewport: { once: true, amount: 0.3 },
    transition: { type: 'spring' as const, stiffness: 90, damping: 16, delay: i * 0.18 },
  });
  return (
    <section className="sec sec-upstairs" aria-labelledby="upstairs-title">
      <div className="wrap">
        <ol className="stairs">
          <m.li className="step step-1" {...step(0)}>
            <p className="kicker">Ground floor</p>
            <p className="step-title">The bar</p>
            <p>Seven taps, the popcorn, the classic rock, the door to the square.</p>
          </m.li>
          <m.li className="step step-2" {...step(1)}>
            <p className="kicker">First floor</p>
            <h2 id="upstairs-title" className="h2">
              Upstairs
            </h2>
            <p>A quieter room above the bar, for when you’d like to hear each other.</p>
          </m.li>
          <m.li className="step step-3" {...step(2)}>
            <h3 className="h3">Bringing a group?</h3>
            <p>Give the bar a ring first and talk it through.</p>
            <a className="btn btn-red group-call" href={VENUE.phoneHref}>
              Call {VENUE.phone}
            </a>
          </m.li>
        </ol>
      </div>
    </section>
  );
}

/* ---------- Comedy ---------- */

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
        <Reveal className="span-2 marquee" delay={0.08}>
          <div className="marquee-bulbs" aria-hidden="true" />
          <p className="marquee-top">Recently on</p>
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

/* ---------- Reviews ---------- */

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
          <div className="quote quote-big">
            <blockquote>
              <LitText text={`“${big.text}”`} />
            </blockquote>
            <p className="quote-src">{big.source}</p>
          </div>
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

/* ---------- The sign ---------- */

function SignBand() {
  return (
    <section className="sign-band" aria-label="The name over the door">
      <Parallax amount={5} className="sign-photo">
        <Photo k="sign" sizes="100vw" position="50% 28%" alt="The TØNNE letters on the fascia, brick above." />
      </Parallax>
      <div className="wrap sign-copy">
        <Reveal>
          <p className="kicker">Tønne, noun</p>
          <p className="sign-big">Norwegian for barrel.</p>
          <p className="sign-small">Over the door in St Martin’s since {VENUE.opened}.</p>
        </Reveal>
      </div>
    </section>
  );
}

/* ---------- Find us ---------- */

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
            <p className="find-note">
              On St Martin’s Walk, between Silver Street and the Corn Exchange. Look for the red front and the tables outside.
            </p>
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
