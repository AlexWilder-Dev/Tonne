import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { m } from 'framer-motion';
import { Photo } from '../components/Photo';
import { Reveal } from '../components/Reveal';
import { STYLE_COLOURS, TAPS, VENUE, type PhotoKey } from '../data';

const SECTIONS = [
  { id: 'taps', label: 'Taps' },
  { id: 'cans', label: 'Cans & bottles' },
  { id: 'cocktails', label: 'Cocktails' },
  { id: 'wine', label: 'Wine' },
] as const;

type SectionId = (typeof SECTIONS)[number]['id'];

export function Drinks() {
  const [active, setActive] = useState<SectionId>('taps');
  const tabs = useRef<HTMLDivElement>(null);

  // Highlight whichever section is under the tabs
  useEffect(() => {
    const els = SECTIONS.map((s) => document.getElementById(`d-${s.id}`)).filter(Boolean) as HTMLElement[];
    const io = new IntersectionObserver(
      (entries) => {
        const hit = entries.filter((e) => e.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)[0];
        if (hit) setActive(hit.target.id.slice(2) as SectionId);
      },
      { rootMargin: '-30% 0px -60% 0px' },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  // Keep the active tab in view on the phone's sideways tab bar
  useEffect(() => {
    const el = tabs.current?.querySelector<HTMLElement>(`[data-tab="${active}"]`);
    if (el && tabs.current && tabs.current.scrollWidth > tabs.current.clientWidth) {
      tabs.current.scrollTo({ left: el.offsetLeft - 16, behavior: 'smooth' });
    }
  }, [active]);

  const go = (id: SectionId) => {
    document.getElementById(`d-${id}`)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <div className="page page-drinks">
      <header className="page-head wrap thirds">
        <div>
          <p className="kicker">The list</p>
          <h1 className="h1">Drinks</h1>
        </div>
        <p className="span-2 lede">
          Seven keg taps, a large range of cans and bottles, cocktails with akvavit in them, tequila and wine. When in
          doubt, ask at the bar.
        </p>
      </header>

      <div className="wrap drinks-layout">
        <nav className="drinks-tabs" aria-label="Drinks sections">
          <div className="drinks-tabs-track" ref={tabs}>
            {SECTIONS.map((s) => (
              <button
                key={s.id}
                type="button"
                data-tab={s.id}
                className={active === s.id ? 'is-active' : undefined}
                aria-current={active === s.id ? 'true' : undefined}
                onClick={() => go(s.id)}
              >
                {active === s.id && <m.span layoutId="tab-pill" className="tab-pill" transition={{ type: 'spring', stiffness: 500, damping: 40 }} />}
                <span className="tab-label">{s.label}</span>
              </button>
            ))}
          </div>
        </nav>

        <div className="drinks-body">
          <section id="d-taps" className="drinks-sec" aria-labelledby="dt-taps">
            <h2 id="dt-taps" className="h2">
              Taps
            </h2>
            <p className="drinks-sub">Poured in thirds, flights and trays. Seven lines, mostly unusual craft beer.</p>
            <ol className="tap-list">
              {TAPS.map((t, i) => (
                <li key={t.id} className={t.sample ? 'is-sample' : undefined}>
                  <span className="tap-no">{String(i + 1).padStart(2, '0')}</span>
                  <span className="tap-swatch" style={{ background: STYLE_COLOURS[t.style].beer }} aria-hidden="true" />
                  <span className="tap-name">{t.name}</span>
                  {t.sample ? <span className="tag-sample">Sample</span> : <span className="tap-note">{t.note}</span>}
                </li>
              ))}
            </ol>
            <Link className="btn btn-red" to="/" state={{ scrollTo: 'taps' }}>
              Pick your thirds
            </Link>
          </section>

          <AskAtTheBar
            id="cans"
            variant="wide"
            title="Cans & bottles"
            photo="night"
            position="20% 64%"
            caption="Through the window, after dark."
            line="A large range. The list lives behind the bar for now, so have a look in person or ask."
          />
          <AskAtTheBar
            id="cocktails"
            variant="split"
            title="Cocktails"
            photo="outfront"
            position="66% 55%"
            line="A cocktail list with akvavit on it, plus tequila for the braver end of the evening. Ask at the bar what’s on tonight."
          />
          <AskAtTheBar
            id="wine"
            variant="note"
            title="Wine"
            photo="building"
            position="50% 40%"
            caption={`Before it was Tønne: ${VENUE.formerly}.`}
            line={`This was ${VENUE.formerly}, a wine bar, before Tønne opened in ${VENUE.opened}. There’s still wine.`}
          />
        </div>
      </div>
    </div>
  );
}

type AskProps = {
  id: string;
  title: string;
  photo: PhotoKey;
  position: string;
  line: string;
  caption?: string;
  variant: 'wide' | 'split' | 'note';
};

/** No list for this yet, so: their photo and an honest answer. Three sections, three layouts. */
function AskAtTheBar({ id, title, photo, position, line, caption, variant }: AskProps) {
  return (
    <section id={`d-${id}`} className={`drinks-sec drinks-ask ask-${variant}`} aria-labelledby={`dt-${id}`}>
      <h2 id={`dt-${id}`} className="h2">
        {title}
      </h2>
      <Reveal className="ask-body">
        <figure className="ask-photo">
          <Photo k={photo} position={position} />
          {caption && <figcaption className="photo-cap">{caption}</figcaption>}
        </figure>
        <div className="ask-copy">
          <p className="ask-big">Ask at the bar.</p>
          <p>{line}</p>
          <a className="link-arrow" href={VENUE.phoneHref}>
            Or ring {VENUE.phone}
          </a>
        </div>
      </Reveal>
    </section>
  );
}
