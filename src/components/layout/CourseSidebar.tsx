import { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { 
  ChevronDown, 
  ChevronRight, 
  Menu,
  X,
  BookOpen,
  Check,
  Lock
} from 'lucide-react';
import { cn } from '../../lib/utils';
import { courseModules } from '../../data/courseData';

export default function CourseSidebar({ 
  isOpen, 
  onClose,
  completedLessons 
}: { 
  isOpen: boolean; 
  onClose: () => void;
  completedLessons: string[];
}) {
  const { moduleId, lessonId } = useParams();
  const [expandedModules, setExpandedModules] = useState<string[]>(moduleId ? [moduleId] : ['boolean']);

  // Keep expanded modules in sync when moduleId changes
  useEffect(() => {
    if (moduleId && !expandedModules.includes(moduleId)) {
      setExpandedModules(prev => [...prev, moduleId]);
    }
  }, [moduleId]);

  const toggleModule = (id: string) => {
    setExpandedModules(prev => 
      prev.includes(id) ? prev.filter(m => m !== id) : [...prev, id]
    );
  };

  // Flatten all lessons across modules for sequential indexing
  const allLessons = courseModules.flatMap(m => m.lessons);

  const isLessonUnlocked = (id: string) => {
    const idx = allLessons.findIndex(l => l.id === id);
    if (idx <= 0) return true; // First lesson is always unlocked
    return completedLessons.includes(allLessons[idx - 1].id);
  };

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 z-40 bg-black/50 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside className={cn(
        "fixed lg:static inset-y-0 left-0 z-50 w-[290px] sm:w-[340px] shrink-0 bg-white lg:rounded-xl lg:border border-r border-border-main lg:shadow-sm transition-transform duration-300 h-full overflow-hidden flex flex-col",
        isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
      )}>
        <div className="p-5 flex items-center justify-between border-b border-border-main shrink-0">
          <h2 className="font-bold text-lg text-text-main pr-4">Matematika Diskrit</h2>
          <button onClick={onClose} className="p-1 lg:hidden text-text-secondary hover:bg-slate-100 rounded-lg">
             <X className="w-5 h-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-3 py-4 pb-8">
          {courseModules.map((module, mIdx) => {
            const isExpanded = expandedModules.includes(module.id);
            const isActiveModule = moduleId === module.id;
            
            return (
              <div key={module.id} className="mb-2">
                <button
                  onClick={() => toggleModule(module.id)}
                  className="w-full flex items-center justify-between p-3 rounded-lg hover:bg-slate-50 text-left group transition-colors cursor-pointer"
                >
                  <div>
                    <span className="text-xs font-medium text-text-secondary block mb-0.5">
                      Modul {mIdx + 1}
                    </span>
                    <span className="text-sm font-bold text-text-main line-clamp-2">
                       {module.title.replace(`Modul ${mIdx + 1}: `, '')}
                    </span>
                  </div>
                  <div className="shrink-0 ml-2">
                    {isExpanded ? (
                      <ChevronDown className="h-5 w-5 text-text-secondary" />
                    ) : (
                      <ChevronRight className="h-5 w-5 text-text-secondary" />
                    )}
                  </div>
                </button>
                
                {isExpanded && (
                  <div className="mt-1 flex flex-col">
                    <div className="text-[11px] font-bold text-text-secondary uppercase tracking-wider px-3 py-2">
                      Materi Pembelajaran
                    </div>
                    {module.lessons.map((lesson, lIdx) => {
                      const isCompleted = completedLessons.includes(lesson.id);
                      // Set active lesson based on URL parameter (fallback to first lesson if not set)
                      const isActive = isActiveModule && (lessonId ? lesson.id === lessonId : lIdx === 0);
                      
                      const type = lesson.type;
                      const duration = lesson.duration;

                      const isUnlocked = isLessonUnlocked(lesson.id);

                      if (!isUnlocked) {
                        return (
                          <div
                            key={lesson.id}
                            className="flex items-start gap-4 p-3 rounded-lg text-sm mx-1 opacity-50 cursor-not-allowed select-none"
                          >
                            <div className="shrink-0 mt-0.5">
                              <div className="w-[18px] h-[18px] flex items-center justify-center text-slate-400">
                                <Lock className="w-3.5 h-3.5" />
                              </div>
                            </div>
                            <div className="flex-1">
                              <h4 className="text-sm mb-1 leading-snug font-medium text-slate-400">
                                {lesson.title}
                              </h4>
                              <div className="text-xs text-slate-400 flex items-center gap-1">
                                {type} • {duration} • Terkunci
                              </div>
                            </div>
                          </div>
                        );
                      }

                      return (
                        <Link
                          key={lesson.id}
                          to={`/course/${module.id}/${lesson.id}`}
                          onClick={() => { if (window.innerWidth < 1024) onClose() }}
                          className={cn(
                            "flex items-start gap-4 p-3 rounded-lg text-sm transition-colors mx-1",
                            isActive 
                              ? "bg-[#E7F0FF] hover:bg-[#E7F0FF]" 
                              : "hover:bg-slate-50"
                          )}
                        >
                          <div className="shrink-0 mt-0.5">
                             {isCompleted ? (
                               <div className="w-[18px] h-[18px] rounded-full bg-[#1FA15F] flex items-center justify-center text-white">
                                 <Check className="w-3 h-3 stroke-[3]" />
                                </div>
                             ) : (
                               <div className="w-[18px] h-[18px] rounded-full bg-slate-200"></div>
                             )}
                          </div>
                          <div className="flex-1">
                            <h4 className={cn("text-sm mb-1 leading-snug", isActive ? "font-bold text-text-main" : "font-medium text-text-main")}>
                              {lesson.title}
                            </h4>
                            <div className="text-xs text-text-secondary flex items-center gap-1">
                              {type} • {duration}
                            </div>
                          </div>
                        </Link>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </aside>
    </>
  );
}
