import { useEffect } from 'react';
import { HashRouter, Navigate, Route, Routes, useLocation } from 'react-router-dom';
import { AnimatePresence, LazyMotion, MotionConfig, domMax, m } from 'framer-motion';
import { OMark } from './brand/Wordmark';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { BottomBar } from './components/BottomBar';
import { Home } from './pages/Home';
import { Drinks } from './pages/Drinks';
import { WhatsOn } from './pages/WhatsOn';

const TITLES: Record<string, string> = {
  '/': 'Tønne · Craft beer & cocktails, Leicester',
  '/drinks': 'Drinks · Tønne, Leicester',
  '/whats-on': 'What’s on · Comedy at Tønne, Leicester',
};

/** Page titles. */
function Titles() {
  const { pathname } = useLocation();
  useEffect(() => {
    document.title = TITLES[pathname] ?? TITLES['/'];
  }, [pathname]);
  return null;
}

const EASE = [0.7, 0, 0.2, 1] as const;

/** Pages swap behind a red shutter with the Ø on it, like the frontage coming down and up. */
function Pages() {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait" initial={false} onExitComplete={() => window.scrollTo(0, 0)}>
      <m.div key={location.pathname} className="page-wrap">
        <Routes location={location}>
          <Route path="/" element={<Home />} />
          <Route path="/drinks" element={<Drinks />} />
          <Route path="/whats-on" element={<WhatsOn />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
        <m.div
          className="shutter"
          aria-hidden="true"
          initial={{ scaleY: 1, originY: 0 }}
          animate={{ scaleY: 0, originY: 0, transition: { duration: 0.5, ease: EASE, delay: 0.05 } }}
          exit={{ scaleY: 1, originY: 1, transition: { duration: 0.42, ease: EASE } }}
        >
          <OMark className="shutter-o" fill="var(--cream)" />
        </m.div>
      </m.div>
    </AnimatePresence>
  );
}

export default function App() {
  return (
    <HashRouter>
      <LazyMotion features={domMax} strict>
        <MotionConfig reducedMotion="user">
          <Titles />
          <a className="skip" href="#main" onClick={(e) => { e.preventDefault(); document.getElementById('main')?.focus(); }}>
            Skip to content
          </a>
          <Header />
          <main id="main" tabIndex={-1}>
            <Pages />
          </main>
          <Footer />
          <BottomBar />
        </MotionConfig>
      </LazyMotion>
    </HashRouter>
  );
}
