import { Link, useLocation } from 'react-router-dom';
import { Button } from '../ui/button';
import { cn } from '../../lib/utils';
import { BookOpen } from 'lucide-react';

export default function Navbar() {
  const location = useLocation();
  const isDashboard = location.pathname.includes('/dashboard') || location.pathname.includes('/course');

  return (
    <div className="fixed top-4 left-0 right-0 z-50 px-4 md:px-8">
      <nav className="mx-auto max-w-5xl w-full h-14 md:h-16 rounded-full bg-white/80 border border-slate-200/60 backdrop-blur-md text-slate-800 flex items-center justify-between px-4 md:px-6 relative">
        <div className="flex items-center">
          <Link to="/" className="text-slate-800 font-bold text-base md:text-lg flex items-center gap-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center text-white shadow-sm shadow-primary/20">
              <BookOpen className="w-4 h-4" />
            </div>
            <span>AxiomMath</span>
          </Link>
        </div>
        
        {!isDashboard && (
          <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 gap-8 text-sm font-semibold">
            <Link to="/" className="relative group py-1 text-slate-600 hover:text-primary transition-colors duration-300">
              Home
              <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-[2px] bg-primary group-hover:w-full transition-all duration-300 ease-out rounded-full"></span>
            </Link>
            <a href="#materi" className="relative group py-1 text-slate-600 hover:text-primary transition-colors duration-300">
              Materi
              <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-[2px] bg-primary group-hover:w-full transition-all duration-300 ease-out rounded-full"></span>
            </a>
            <a href="#fitur" className="relative group py-1 text-slate-600 hover:text-primary transition-colors duration-300">
              Fitur
              <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-[2px] bg-primary group-hover:w-full transition-all duration-300 ease-out rounded-full"></span>
            </a>
          </div>
        )}

        <div className="flex items-center gap-4">
          {isDashboard ? (
            <Button variant="ghost" className="font-semibold text-slate-500 hover:text-slate-800 cursor-pointer">
              Keluar
            </Button>
          ) : (
            <Button className="px-5 bg-primary hover:bg-primary/90 text-white border-none font-bold rounded-full text-xs md:text-sm h-9 md:h-10 cursor-pointer shadow-md animate-in fade-in zoom-in duration-200" asChild>
              <Link to="/dashboard">Mulai Belajar</Link>
            </Button>
          )}
        </div>
      </nav>
    </div>
  );
}
