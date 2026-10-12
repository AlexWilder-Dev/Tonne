import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { AnimatePresence, m, useAnimationControls, useReducedMotion } from 'framer-motion';
import { STYLE_COLOURS, TAPS, type Tap } from '../data';
import { Glass } from './Glass';
import { ShowTheBar } from './ShowTheBar';

const MAX = 3;

export function PickYourThirds() {
  const [picks, setPicks] = useState<string[]>([]);
  const [showing, setShowing] = useState(false);
  const [notice, setNotice] = useState('');
  const paddle = useAnimationControls();
  const reduce = useReducedMotion();
  const noticeTimer = useRef<number>();

  useEffect(() => () => window.clearTimeout(noticeTimer.current), []);

  const say = (text: string) => {
    setNotice(text);
    window.clearTimeout(noticeTimer.current);
    noticeTimer.current = window.setTimeout(() => setNotice(''), 2600);
  };

  const toggle = (tap: Tap) => {
    if (picks.includes(tap.id)) {
      setPicks((p) => p.filter((id) => id !== tap.id));
      say(`${tap.name} off the paddle.`);
      return;
    }
    if (picks.length >= MAX) {
      say('Paddle’s full. Take one off, or ask for a tray.');
      if (!reduce) paddle.start({ x: [0, -7, 7, -4, 4, 0], transition: { duration: 0.4 } });
      return;
    }
    setPicks((p) => [...p, tap.id]);
    say(`${tap.name}${tap.sample ? ' (sample)' : ''} in glass ${picks.length + 1}.`);
  };

  const chosen = picks.map((id) => TAPS.find((t) => t.id === id)!);
  const slots = [0, 1, 2].map((i) => chosen[i]);

  return (
    <div className="pyt">
      <div className="pyt-sticky">
        <m.div className="paddle" animate={paddle} aria-hidden="true">
          <div className="paddle-glasses">
            {slots.map((tap, i) => {
              const c = tap ? STYLE_COLOURS[tap.style] : undefined;
              return (
                <div className="paddle-slot" key={i}>
                  <Glass className="paddle-glass" filled={Boolean(tap)} beer={c?.beer} head={c?.head} />
                </div>
              );
            })}
          </div>
          <div className="paddle-board" />
          <div className="paddle-labels">
            {slots.map((tap, i) => (
              <span key={i} className={`paddle-label${tap ? ' is-on' : ''}`}>
                {tap ? tap.name : `Glass ${i + 1}`}
              </span>
            ))}
          </div>
        </m.div>
        <div className="pyt-actions">
          <button type="button" className="btn btn-red pyt-show" disabled={!picks.length} onClick={() => setShowing(true)}>
            Show the bar
          </button>
          <p className="pyt-tray">Want more? Ask for a tray.</p>
        </div>
        <p className="pyt-notice" role="status" aria-live="polite">
          {notice}
        </p>
      </div>

      <div className="pyt-board-col">
        <div className="board" role="group" aria-label="On tap. Pick up to three.">
          <div className="board-head" aria-hidden="true">
            <span className="board-title">ØN TAP</span>
            <span className="board-head-pour">{picks.length}/3 on the paddle</span>
          </div>
          <ol className="board-rows">
            {TAPS.map((tap, i) => {
              const at = picks.indexOf(tap.id);
              const picked = at > -1;
              const c = STYLE_COLOURS[tap.style];
              return (
                <li key={tap.id}>
                  <button
                    type="button"
                    className={`tap-row${tap.sample ? ' is-sample' : ''}`}
                    aria-pressed={picked}
                    onClick={() => toggle(tap)}
                  >
                    <span className="tap-no" aria-hidden="true">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <span className="tap-swatch" style={{ background: c.beer }} aria-hidden="true" />
                    <span className="tap-name">
                      {tap.name}
                      {tap.sample ? <span className="tag-sample">Sample</span> : <span className="tap-note">{tap.note}</span>}
                    </span>
                    <span className="tap-pour" aria-hidden="true">
                      <AnimatePresence mode="wait" initial={false}>
                        {picked ? (
                          <m.span key="in" className="tap-in" initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }}>
                            Glass {at + 1}
                          </m.span>
                        ) : (
                          <m.span key="add" className="tap-add" initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }}>
                            Add<span className="hide-sm"> a third</span>
                          </m.span>
                        )}
                      </AnimatePresence>
                    </span>
                  </button>
                </li>
              );
            })}
          </ol>
          <p className="board-foot">
            Delirium Red and Jubel are the ones reviewers mention. Rows marked <span className="tag-sample">Sample</span> hold
            a style until the bar sends the real list.
          </p>
        </div>
      </div>

      {createPortal(
        <AnimatePresence>{showing && <ShowTheBar taps={chosen} onClose={() => setShowing(false)} />}</AnimatePresence>,
        document.body,
      )}
    </div>
  );
}
