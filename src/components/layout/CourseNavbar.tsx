import { Link } from 'react-router-dom';
import { BookOpen, Menu } from 'lucide-react';
import { Button } from '../ui/button';

export default function CourseNavbar({ 
  onMenuClick,
  completedLessons = []
}: { 
  onMenuClick?: () => void;
  completedLessons?: string[];
}) {
  const totalLessons = 24; // 3 modules, each containing 8 lessons
  const completedCount = completedLessons.length;
  const progressPercent = Math.min(100, Math.round((completedCount / totalLessons) * 100));

  return (
    <div className="w-full shrink-0 border-b border-slate-200/60 bg-white/80 backdrop-blur-md text-slate-800">
      <nav className="mx-auto max-w-[1552px] w-full h-14 md:h-16 flex items-center justify-between px-4 md:px-8">
        <div className="flex items-center gap-4">
          <button className="lg:hidden p-2 -ml-2 text-slate-500 hover:text-slate-800 cursor-pointer" onClick={onMenuClick}>
            <Menu className="w-5 h-5" />
          </button>
          <Link to="/" className="text-slate-800 font-bold text-base md:text-lg flex items-center gap-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center text-white shadow-sm shadow-primary/20">
              <BookOpen className="w-4 h-4" />
            </div>
            <span className="hidden sm:inline">AxiomMath</span>
          </Link>
        </div>

        {/* Dynamic Progress Bar adapted for Light Capsule theme */}
        <div className="hidden md:flex items-center gap-3 bg-slate-50 border border-slate-100 rounded-full py-1.5 px-4 text-xs font-semibold">
           <span className="text-slate-500 w-36 text-center">{completedCount}/{totalLessons} materi selesai</span>
           <div className="w-40 h-1.5 bg-slate-200 rounded-full mx-1 relative overflow-hidden border border-slate-300/30">
              <div 
                className="bg-primary h-full rounded-full absolute left-0 top-0 transition-all duration-500 ease-out"
                style={{ width: `${progressPercent}%` }}
              ></div>
           </div>
        </div>

        <div className="flex items-center gap-3 sm:gap-4">
          <Button variant="ghost" className="font-semibold text-slate-500 hover:text-slate-800 cursor-pointer" asChild>
            <Link to="/">Keluar</Link>
          </Button>
          <div className="flex items-center gap-2 text-slate-500">
            <div className="w-8 h-8 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-700 font-bold text-sm cursor-pointer hover:bg-slate-200 transition-colors">
              M
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
}
