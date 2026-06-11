import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'motion/react';
import { useEffect } from 'react';
import LandingPage from './pages/LandingPage';
import Dashboard from './pages/Dashboard';
import CourseView from './pages/CourseView';

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

export default function App() {
  const location = useLocation();
  const isCoursePath = location.pathname.startsWith('/course');
  const animationKey = isCoursePath ? 'course-layout' : location.pathname;

  return (
    <>
      {/* Preload dynamic cursor SVGs to prevent browser layout reflow lag on dynamic change */}
      <div className="hidden cursor-math-general cursor-math-boolean cursor-math-combinatorics cursor-math-euler cursor-math-logic" aria-hidden="true" />
      <ScrollToTop />
      <AnimatePresence mode="wait">
        <motion.div
          key={animationKey}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.25, ease: 'easeInOut' }}
          className="w-full min-h-screen flex flex-col"
        >
          <Routes location={location}>
            <Route path="/" element={<LandingPage />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/course/:moduleId/:lessonId?" element={<CourseView />} />
          </Routes>
        </motion.div>
      </AnimatePresence>
    </>
  );
}
