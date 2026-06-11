import { useState, useEffect } from 'react';
import { useParams, useLocation, Link } from 'react-router-dom';
import CourseNavbar from '../components/layout/CourseNavbar';
import CourseSidebar from '../components/layout/CourseSidebar';
import BooleanAlgebraContent from '../components/course/BooleanAlgebraContent';
import CombinatoricsContent from '../components/course/CombinatoricsContent';
import GraphTheoryContent from '../components/course/GraphTheoryContent';
import { courseModules } from '../data/courseData';
import { Lock, ArrowRight } from 'lucide-react';

export default function CourseView() {
  const { moduleId, lessonId } = useParams();
  const location = useLocation();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  
  // Load completed lessons from localStorage
  const [completedLessons, setCompletedLessons] = useState<string[]>(() => {
    const saved = localStorage.getItem('completed_lessons');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) {
          return parsed;
        }
      } catch (e) {
        console.error(e);
      }
    }
    return []; // Start empty so progress matches 0/24 at first
  });

  // Save to localStorage when changed
  useEffect(() => {
    localStorage.setItem('completed_lessons', JSON.stringify(completedLessons));
  }, [completedLessons]);

  // Close sidebar and reset scroll position on navigation
  useEffect(() => {
    setIsSidebarOpen(false);
    const mainEl = document.querySelector('main');
    if (mainEl) {
      mainEl.scrollTop = 0;
    }
  }, [location]);

  const handleCompleteLesson = (id: string) => {
    if (!completedLessons.includes(id)) {
      setCompletedLessons(prev => [...prev, id]);
    }
  };

  // Flatten all lessons across modules for sequential indexing
  const allLessons = courseModules.flatMap(m => 
    m.lessons.map(l => ({ ...l, moduleId: m.id }))
  );

  const activeLessonId = lessonId || (
    moduleId === 'boolean' ? 'b1' :
    moduleId === 'probability' ? 'p1' :
    moduleId === 'graph' ? 'g1' : 'b1'
  );

  // Helper to check if a lesson is unlocked
  const isLessonUnlocked = (id: string) => {
    const idx = allLessons.findIndex(l => l.id === id);
    if (idx <= 0) return true; // First lesson of the course is always unlocked
    return completedLessons.includes(allLessons[idx - 1].id);
  };

  const renderContent = () => {
    if (!isLessonUnlocked(activeLessonId)) {
      // Find the first lesson that is NOT completed
      const nextActiveLesson = allLessons.find(l => !completedLessons.includes(l.id)) || allLessons[0];
      
      return (
        <div className="flex flex-col items-center justify-center text-center p-8 border border-border-main rounded-2xl bg-slate-50/50 my-12 max-w-xl mx-auto shadow-sm">
          <div className="w-16 h-16 bg-blue-50 text-primary rounded-full flex items-center justify-center mb-6 shadow-sm border border-blue-100">
            <Lock className="w-8 h-8" />
          </div>
          <h3 className="text-2xl font-bold text-text-main mb-2">Materi Terkunci</h3>
          <p className="text-text-secondary text-sm max-w-sm mb-8 leading-relaxed">
            Materi ini masih terkunci. Anda harus menyelesaikan materi-materi sebelumnya terlebih dahulu untuk dapat mengakses materi ini.
          </p>
          <Link 
            to={`/course/${nextActiveLesson.moduleId}/${nextActiveLesson.id}`}
            className="inline-flex items-center gap-2 bg-primary hover:bg-[#004BB5] text-white font-semibold py-3 px-6 rounded-lg transition-colors shadow-sm cursor-pointer"
          >
            Mulai Pelajari Materi Aktif <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      );
    }

    const props = {
      lessonId: activeLessonId,
      completedLessons,
      onCompleteLesson: handleCompleteLesson
    };

    switch (moduleId) {
      case 'boolean':
        return <BooleanAlgebraContent {...props} />;
      case 'probability':
        return <CombinatoricsContent {...props} />;
      case 'graph':
        return <GraphTheoryContent {...props} />;
      default:
        return <BooleanAlgebraContent {...props} />;
    }
  };

  const cursorClasses = [
    'cursor-math-general',
    'cursor-math-boolean',
    'cursor-math-combinatorics',
    'cursor-math-euler',
    'cursor-math-logic'
  ];
  const [cursorIdx, setCursorIdx] = useState(0);

  useEffect(() => {
    const cursorTimer = setInterval(() => {
      setCursorIdx((prev) => (prev + 1) % cursorClasses.length);
    }, 5000);
    return () => clearInterval(cursorTimer);
  }, []);

  const activeCursorClass = cursorClasses[cursorIdx];

  return (
    <div className={`flex h-screen flex-col bg-ambient overflow-hidden font-sans relative ${activeCursorClass}`}>
      {/* Background Grid Pattern */}
      <div className="absolute inset-0 bg-grid-pattern opacity-60 pointer-events-none -z-10"></div>
      
      <CourseNavbar onMenuClick={() => setIsSidebarOpen(true)} completedLessons={completedLessons} />
      
      <div className="flex flex-1 overflow-hidden p-0 sm:p-4 lg:gap-6 max-w-full px-0 sm:px-6 mx-auto w-full relative z-10">
        <CourseSidebar 
          isOpen={isSidebarOpen} 
          onClose={() => setIsSidebarOpen(false)} 
          completedLessons={completedLessons}
        />
        
        <main className="flex-1 bg-white rounded-none sm:rounded-xl border-0 sm:border border-border-main overflow-y-auto relative flex flex-col w-full h-full shadow-none sm:shadow-xs">
          <div className="mx-auto w-full max-w-6xl p-4 sm:p-6 md:p-12">
             {renderContent()}
          </div>
        </main>
      </div>
    </div>
  );
}
