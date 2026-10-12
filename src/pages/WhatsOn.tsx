import { Reveal } from '../components/Reveal';
import { REVIEWS, SHOWS, VENUE } from '../data';
import { Octopus } from '../brand/Wordmark';

export function WhatsOn() {
  const nights = groupByNight();
  const festivalReview = REVIEWS[2];
  return (
    <div className="page page-whats-on">
      <header className="page-head wrap thirds">
        <div>
          <p className="kicker">What’s on</p>
          <h1 className="h1">Comedy, mostly.</h1>
        </div>
        <div className="span-2 lede">
          <p>
            In February 2026 Tønne put on {SHOWS.length} shows for the Leicester Comedy Festival. That run is below. Nothing
            new is announced yet; when it is, it goes here first.
          </p>
        </div>
      </header>

      <div className="wrap thirds next-up">
        <Reveal className="next-card span-2">
          <p className="kicker">Next up</p>
          <p className="next-big">Nothing announced yet.</p>
          <p>
            Follow{' '}
            <a href={VENUE.instagram} target="_blank" rel="noopener noreferrer">
              {VENUE.instagramHandle}
            </a>{' '}
            or{' '}
            <a href={VENUE.facebook} target="_blank" rel="noopener noreferrer">
              Facebook
            </a>{' '}
            for the next one, or bookmark this page and come back.
          </p>
        </Reveal>
        <Reveal className="next-octo" delay={0.08}>
          <Octopus className="octo-sm" />
        </Reveal>
      </div>

      <section className="wrap played" aria-labelledby="played-title">
        <div className="thirds played-head">
          <div>
            <p className="kicker">Leicester Comedy Festival 2026</p>
            <h2 id="played-title" className="h2">
              Who’s played Tønne
            </h2>
          </div>
          <p className="span-2 played-sum">
            {SHOWS.length} shows across {nights.length} nights, 8 to 21 February.
          </p>
        </div>

        <ol className="nights">
          {nights.map((n) => (
            <Reveal as="li" key={n.label} className="night">
              <p className="night-date">
                <span className="night-day">{n.weekday}</span>
                <span className="night-num">{n.num}</span>
                <span className="night-month">Feb 2026</span>
              </p>
              <ul className="night-shows">
                {n.shows.map((s) => (
                  <li key={s.title + (s.act ?? '')} className="played-show">
                    <span className="played-act">{s.act ?? s.title}</span>
                    {s.act && <span className="played-title">{s.title}</span>}
                    <span className="played-meta">
                      {s.date.includes('&') ? `${s.date} · ` : ''}
                      {s.price}
                    </span>
                  </li>
                ))}
              </ul>
            </Reveal>
          ))}
        </ol>

        <Reveal className="played-quote">
          <blockquote>
            <p>“{festivalReview.text}”</p>
          </blockquote>
          <p className="quote-src">{festivalReview.source}</p>
        </Reveal>
      </section>
    </div>
  );
}

function groupByNight() {
  const map = new Map<number, { label: string; weekday: string; num: string; shows: typeof SHOWS }>();
  for (const s of SHOWS) {
    const [weekday, num] = s.date.split(' ');
    if (!map.has(s.day)) map.set(s.day, { label: `${weekday} ${num}`, weekday, num, shows: [] });
    map.get(s.day)!.shows.push(s);
  }
  return [...map.values()];
}
