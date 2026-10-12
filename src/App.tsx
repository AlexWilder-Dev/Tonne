import { useEffect } from 'react';
import { HashRouter, Navigate, Route, Routes, useLocation } from 'react-router-dom';
import { LazyMotion, MotionConfig, domAnimation } from 'framer-motion';
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

/** Page titles, scroll to top on a new page, or to a section when a link asks for one. */
function ScrollManager() {
  const { pathname, state, key } = useLocation();
  const target = (state as { scrollTo?: string } | null)?.scrollTo;

  useEffect(() => {
    document.title = TITLES[pathname] ?? TITLES['/'];
  }, [pathname]);

  useEffect(() => {
    if (!target) {
      window.scrollTo(0, 0);
      return;
    }
    const frame = requestAnimationFrame(() => {
      const el = document.getElementById(target) ?? document.getElementById(`d-${target}`);
      const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      el?.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'start' });
    });
    return () => cancelAnimationFrame(frame);
  }, [pathname, target, key]);

  return null;
}

export default function App() {
  return (
    <HashRouter>
      <LazyMotion features={domAnimation} strict>
        <MotionConfig reducedMotion="user">
          <ScrollManager />
          <a className="skip" href="#main" onClick={(e) => { e.preventDefault(); document.getElementById('main')?.focus(); }}>
            Skip to content
          </a>
          <Header />
          <main id="main" tabIndex={-1}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/drinks" element={<Drinks />} />
              <Route path="/whats-on" element={<WhatsOn />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </main>
          <Footer />
          <BottomBar />
        </MotionConfig>
      </LazyMotion>
    </HashRouter>
  );
}
