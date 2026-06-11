import React, { useState, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { CheckCircle2, ChevronRight, Calculator, AlertCircle, Play, Info, X, Volume2, Settings, Type, Check, RotateCcw, HelpCircle } from 'lucide-react';
import { cn } from '../../lib/utils';
import { Button } from '../ui/button';
import { courseModules } from '../../data/courseData';
import confetti from 'canvas-confetti';

export function Breadcrumb({ items }: { items: string[] }) {
  // Skipping breadcrumb to match the large title directly, but keep component just in case
  return null;
}

export function CourseHeader({
  title,
  subtitle,
  level,
  time
}: {
  title: string;
  subtitle: string;
  level: string;
  time: string;
}) {
  return (
    <div className="mb-10 pt-4 flex flex-col gap-3 animate-in fade-in duration-700">
      <div className="flex flex-wrap gap-2 items-center justify-start text-[10px] font-bold tracking-wider uppercase font-sans">
        <span className={cn(
          "px-2.5 py-0.5 rounded-full border",
          level === "Dasar" ? "bg-blue-50 text-primary border-blue-100" :
          level === "Menengah" ? "bg-amber-50 text-warning border-amber-200" :
          "bg-purple-50 text-purple-700 border-purple-200"
        )}>
          {level}
        </span>
        <span className="px-2.5 py-0.5 rounded-full border bg-slate-50 text-text-secondary border-slate-200 flex items-center gap-1">
          <svg className="w-3 h-3 text-text-secondary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <circle cx="12" cy="12" r="10" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3" />
          </svg>
          {time}
        </span>
      </div>
      <h1 className="text-3xl sm:text-4xl font-extrabold text-text-main tracking-tight mt-1 bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 bg-clip-text text-transparent">
        {title}
      </h1>
      {subtitle && (
        <p className="text-[15px] text-text-secondary leading-relaxed max-w-3xl mt-1">
          {subtitle}
        </p>
      )}
      <div className="w-16 h-1 bg-primary rounded-full mt-3"></div>
    </div>
  );
}

export function MediaPlayerBase({ videoId, title }: { videoId?: string; title?: string }) {
  const [hasPlayed, setHasPlayed] = useState(false);
  
  const id = videoId || "n-N9M1iV0u4";
  const displayTitle = title || "Video Pembelajaran Materi";

  return (
    <div className="mb-10 w-full max-w-3xl mx-auto overflow-hidden rounded-2xl border border-border-main bg-white shadow-xs transition-all duration-300 hover:shadow-md hover:border-slate-300 animate-in fade-in duration-500">
      <div className="p-4 border-b border-border-main flex items-center justify-between bg-slate-50/50">
        <div className="flex items-center gap-2.5">
          <div className={`w-2 h-2 rounded-full ${hasPlayed ? 'bg-success animate-pulse' : 'bg-red-500 animate-pulse'}`}></div>
          <span className="text-sm font-bold text-text-main tracking-tight">{displayTitle}</span>
        </div>
        <span className="text-[9px] bg-primary/10 text-primary border border-primary/20 px-2.5 py-0.5 rounded-full font-bold uppercase tracking-wider flex items-center gap-1 font-sans">
          <span className="inline-block w-1 h-1 rounded-full bg-primary animate-pulse"></span>
          YouTube
        </span>
      </div>
      
      <div className="relative aspect-video w-full bg-slate-950">
        {hasPlayed ? (
          <iframe
            className="w-full h-full border-0 animate-in zoom-in-95 duration-500"
            src={`https://www.youtube.com/embed/${id}?autoplay=1&rel=0`}
            title={displayTitle}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share; fullscreen"
            allowFullScreen
          ></iframe>
        ) : (
          /* Custom Preview Overlay (Thumbnail + Play button) */
          <div 
            className="absolute inset-0 flex flex-col items-center justify-center cursor-pointer group overflow-hidden transition-all duration-500 bg-slate-950"
            onClick={() => setHasPlayed(true)}
          >
            <img 
              src={`https://img.youtube.com/vi/${id}/maxresdefault.jpg`} 
              alt={displayTitle}
              className="absolute inset-0 w-full h-full object-cover opacity-70 group-hover:scale-105 transition-transform duration-700 ease-out"
              onError={(e) => {
                (e.target as HTMLImageElement).src = `https://img.youtube.com/vi/${id}/hqdefault.jpg`;
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-slate-950/20 opacity-90 transition-opacity duration-300 group-hover:opacity-85"></div>
            
            <button className="relative w-16 h-16 rounded-full bg-primary text-white flex items-center justify-center shadow-lg transform transition-all duration-500 group-hover:scale-110 group-hover:bg-[#004BB5] z-10 cursor-pointer border-0 shadow-primary/25">
              <Play className="w-7 h-7 fill-white ml-1 transition-transform duration-300 group-hover:scale-105" />
            </button>
            <span className="relative text-white font-bold text-[10px] mt-4 tracking-widest z-10 bg-slate-900/80 px-4 py-2 rounded-full border border-white/20 backdrop-blur-xs select-none uppercase transition-all duration-300 group-hover:border-white/40 group-hover:bg-slate-950/90 shadow-md">
              Klik untuk memutar video
            </span>
          </div>
        )}
      </div>
    </div>
  );
}

export function LearningObjectives({ objectives }: { objectives: string[] }) {
  return (
    <div className="mb-8 p-6 bg-slate-50/50 rounded-2xl border border-slate-100/80">
      <h4 className="text-xs font-bold text-text-secondary uppercase tracking-wider mb-4 font-mono">Tujuan Pembelajaran</h4>
      <ul className="space-y-3.5 text-[15px] text-text-main leading-relaxed">
        {objectives.map((obj, i) => (
          <li key={i} className="flex gap-3 items-start">
            <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-primary" />
            <span>{obj}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function FormulaBox({ title, formula, desc }: { title?: string, formula: string | React.ReactNode, desc?: string }) {
  return (
    <div className="relative overflow-hidden bg-gradient-to-br from-slate-50 to-slate-100/60 p-6 sm:p-8 rounded-2xl border border-slate-200/80 border-l-4 border-l-primary mb-8 flex items-center justify-between gap-6 transition-all duration-300 hover:shadow-xs hover:border-slate-300">
      <div className="flex-1">
        {title && <p className="text-[10px] font-bold text-primary uppercase tracking-wider mb-2.5 font-mono">{title}</p>}
        <div className="text-lg sm:text-xl font-mono font-bold text-text-main leading-relaxed bg-white border border-slate-100 px-4 py-3 rounded-xl inline-block shadow-xs">
          {formula}
        </div>
        {desc && <p className="text-xs sm:text-sm text-text-secondary mt-4 leading-relaxed border-t border-slate-200/60 pt-3">{desc}</p>}
      </div>
      <div className="text-slate-300 hidden md:block opacity-40 shrink-0 p-3 bg-white rounded-2xl border border-slate-100 shadow-xs">
        <Calculator className="h-10 w-10 text-primary" />
      </div>
    </div>
  );
}

export function ExampleBox({ children }: { children: React.ReactNode }) {
  return (
    <div className="my-6 border-l-4 border-amber-500 bg-amber-50/20 p-5 sm:p-6 rounded-r-xl transition-all duration-300">
      <h4 className="text-xs font-bold text-amber-800 mb-2.5 flex items-center gap-1.5 font-mono uppercase tracking-wider">
        <AlertCircle className="h-4 w-4 text-amber-500 shrink-0" /> Contoh Studi Kasus
      </h4>
      <div className="text-text-main text-[14.5px] leading-relaxed space-y-3 font-medium">
        {children}
      </div>
    </div>
  );
}

export function ContentSection({ title, children }: { title: string, children: React.ReactNode }) {
  return (
    <div className="mb-12 border-t border-slate-100 pt-10 first-of-type:border-t-0 first-of-type:pt-0">
      <h3 className="text-xl sm:text-2xl font-bold text-text-main mb-6 tracking-tight flex items-center gap-3">
        <span className="w-1.5 h-6 bg-primary rounded-full"></span>
        {title}
      </h3>
      <div className="space-y-4 text-[15px] text-text-main leading-relaxed">
        {children}
      </div>
    </div>
  );
}

export function QuizCard({
  question,
  options,
  correctAnswer,
  explanation
}: {
  question: string;
  options?: string[];
  correctAnswer: string;
  explanation?: string;
}) {
  const [selected, setSelected] = useState<string | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [inputText, setInputText] = useState("");

  const isTextQuestion = !options;
  const isCorrect = isTextQuestion
    ? inputText.toLowerCase().trim() === correctAnswer.toLowerCase().trim()
    : selected === correctAnswer;

  return (
    <div className="bg-white rounded-2xl border border-border-main p-4 sm:p-8 shadow-sm transition-all duration-300 hover:shadow-md mb-8 w-full">
      <div className="flex items-center gap-3 mb-5 border-b border-border-main pb-4">
        <div className="flex items-center justify-center bg-blue-50 text-primary h-8 w-8 rounded-lg text-sm font-bold border border-blue-100 shadow-sm">
          ?
        </div>
        <div>
          <h4 className="font-bold text-text-main text-base">Latihan Cepat Mandiri</h4>
          <p className="text-xs text-text-secondary">Uji pemahaman Anda terhadap topik ini</p>
        </div>
      </div>

      <div className="space-y-6">
        <p className="text-sm sm:text-base font-semibold text-text-main leading-relaxed">
          {question}
        </p>

        {isTextQuestion ? (
          <div className="space-y-4">
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              disabled={isSubmitted}
              placeholder="Ketik jawabanmu di sini..."
              className="w-full rounded-xl border border-border-main p-4 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary disabled:bg-slate-50 disabled:text-text-secondary transition-all"
            />
          </div>
        ) : (
          <div className="flex flex-col gap-3">
            {options.map((opt, i) => {
              const letter = String.fromCharCode(65 + i);
              const isSelected = selected === letter;

              let containerClass = "bg-white border-border-main hover:border-primary hover:bg-slate-50 text-text-main";
              let badgeClass = "bg-slate-100 text-text-secondary border-slate-200";
              let dotIndicator = <div className="w-4 h-4 rounded-full border border-slate-300 mr-3 shrink-0 transition-all mt-0.5"></div>;

              if (isSelected && !isSubmitted) {
                containerClass = "border-primary bg-blue-50/50 text-text-main ring-1 ring-primary";
                badgeClass = "bg-primary text-white border-primary shadow-sm";
                dotIndicator = (
                  <div className="w-4 h-4 rounded-full border-4 border-primary mr-3 shrink-0 flex items-center justify-center mt-0.5">
                  </div>
                );
              }

              if (isSubmitted) {
                if (isSelected) {
                  if (isCorrect) {
                    containerClass = "border-success bg-success/5 text-success ring-1 ring-success";
                    badgeClass = "bg-success text-white border-success";
                    dotIndicator = (
                      <div className="w-4 h-4 rounded-full bg-success mr-3 shrink-0 flex items-center justify-center text-white mt-0.5">
                        <Check className="w-2.5 h-2.5 stroke-[3]" />
                      </div>
                    );
                  } else {
                    containerClass = "border-error bg-error/5 text-error ring-1 ring-error";
                    badgeClass = "bg-error text-white border-error";
                    dotIndicator = (
                      <div className="w-4 h-4 bg-error rounded-full mr-3 shrink-0 flex items-center justify-center text-white text-[8px] font-bold mt-0.5">
                        ✕
                      </div>
                    );
                  }
                } else if (letter === correctAnswer) {
                  containerClass = "border-success bg-success/5 text-success border-dashed";
                  badgeClass = "bg-success text-white border-success";
                  dotIndicator = (
                    <div className="w-4 h-4 rounded-full border-2 border-success mr-3 shrink-0 mt-0.5"></div>
                  );
                } else {
                  containerClass = "bg-slate-50/50 border-slate-100 text-slate-400 opacity-60";
                  badgeClass = "bg-slate-100/50 text-slate-400 border-slate-100";
                  dotIndicator = <div className="w-4 h-4 rounded-full border border-slate-300 mr-3 shrink-0 transition-all mt-0.5"></div>;
                }
              }

              return (
                <button
                  key={i}
                  onClick={() => !isSubmitted && setSelected(letter)}
                  disabled={isSubmitted}
                  className={cn(
                    "w-full text-left p-4 rounded-xl border text-sm font-medium transition-all duration-200 flex items-start shadow-sm cursor-pointer select-none",
                    containerClass
                  )}
                >
                  {dotIndicator}
                  <span className={cn(
                    "w-6 h-6 rounded-full border flex items-center justify-center text-xs font-bold mr-3 shrink-0 transition-colors mt-0.5",
                    badgeClass
                  )}>
                    {letter}
                  </span>
                  <span className="flex-1">{opt}</span>
                </button>
              );
            })}
          </div>
        )}

        {!isSubmitted ? (
          <Button
            onClick={() => setIsSubmitted(true)}
            disabled={isTextQuestion ? !inputText : !selected}
            size="lg"
            className="w-full bg-primary hover:bg-[#004BB5] text-white font-bold h-12 rounded-xl transition-all duration-200 hover:scale-[1.01] hover:shadow-md cursor-pointer disabled:opacity-50 disabled:scale-100 disabled:pointer-events-none"
          >
            Cek Jawaban
          </Button>
        ) : (
          <div className={cn(
            "rounded-xl p-5 border flex gap-4 transition-all duration-500 animate-in fade-in slide-in-from-top-4",
            isCorrect ? "bg-success/5 border-success/30 text-success" : "bg-error/5 border-error/30 text-error"
          )}>
            <div className="shrink-0 mt-0.5">
              {isCorrect ? (
                <CheckCircle2 className="h-6 w-6 text-success animate-bounce" />
              ) : (
                <AlertCircle className="h-6 w-6 text-error" />
              )}
            </div>
            <div>
              <p className={cn("font-bold text-base mb-1.5", isCorrect ? "text-success" : "text-error")}>
                {isCorrect ? "Jawaban Benar!" : "Jawaban Kurang Tepat"}
              </p>
              {explanation && (
                <p className="text-sm text-text-secondary leading-relaxed">{explanation}</p>
              )}
              {isTextQuestion && !isCorrect && (
                <p className="text-sm text-text-main mt-2 font-semibold">Jawaban yang benar: {correctAnswer}</p>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export function LessonNavigation({
  lessonId,
  onCompleteLesson,
  completedLessons = []
}: {
  lessonId?: string;
  onCompleteLesson?: (id: string) => void;
  completedLessons?: string[];
}) {
  const { moduleId } = useParams();
  const navigate = useNavigate();
  const [isCompleted, setIsCompleted] = useState(lessonId ? completedLessons.includes(lessonId) : false);
  const [scrollProgress, setScrollProgress] = useState(isCompleted ? 100 : 0);

  // Sync completed state when lessonId or completedLessons list changes
  React.useEffect(() => {
    const completed = lessonId ? completedLessons.includes(lessonId) : false;
    setIsCompleted(completed);
    if (completed) {
      setScrollProgress(100);
    } else {
      setScrollProgress(0);
    }
  }, [lessonId, completedLessons]);

  // Compute next lesson URL
  let nextUrl = '/dashboard';
  let hasNext = false;
  let isLastLessonOfModule = false;
  if (moduleId) {
    const currentModule = courseModules.find(m => m.id === moduleId);
    if (currentModule) {
      const activeLessonId = lessonId || currentModule.lessons[0].id;
      const currentLessonIdx = currentModule.lessons.findIndex(l => l.id === activeLessonId);

      if (currentLessonIdx !== -1 && currentLessonIdx < currentModule.lessons.length - 1) {
        nextUrl = `/course/${moduleId}/${currentModule.lessons[currentLessonIdx + 1].id}`;
        hasNext = true;
      } else {
        // Go to next module's first lesson
        isLastLessonOfModule = true;
        const currentModuleIdx = courseModules.findIndex(m => m.id === moduleId);
        if (currentModuleIdx !== -1 && currentModuleIdx < courseModules.length - 1) {
          const nextModule = courseModules[currentModuleIdx + 1];
          nextUrl = `/course/${nextModule.id}/${nextModule.lessons[0].id}`;
          hasNext = true;
        } else {
          // Last lesson of last module
          nextUrl = '/';
          hasNext = false;
        }
      }
    }
  }

  // Scroll to bottom detection
  React.useEffect(() => {
    if (isCompleted) {
      setScrollProgress(100);
      return;
    }

    setScrollProgress(0);

    const container = document.querySelector('main');
    if (!container) return;

    const handleScroll = () => {
      setScrollProgress(prev => {
        if (prev === 100) return 100;

        const scrollHeight = container.scrollHeight;
        const scrollTop = container.scrollTop;
        const clientHeight = container.clientHeight;
        const maxScroll = scrollHeight - clientHeight;

        if (maxScroll <= 10) {
          return 100;
        } else {
          const rawPct = (scrollTop / maxScroll) * 100;
          if (rawPct >= 92) {
            return 100;
          } else {
            return Math.max(0, Math.min(100, Math.round(rawPct)));
          }
        }
      });
    };

    // Delay checking slightly to allow DOM layout to calculate heights correctly
    const initCheck = setTimeout(() => {
      const scrollHeight = container.scrollHeight;
      const clientHeight = container.clientHeight;
      if (scrollHeight <= clientHeight + 10) {
        setScrollProgress(100);
      } else {
        handleScroll(); // Check immediately in case scroll position is already at bottom
      }
    }, 250);

    container.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', handleScroll);

    return () => {
      container.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
      clearTimeout(initCheck);
    };
  }, [lessonId, isCompleted]);

  const isUnlocked = isCompleted || scrollProgress === 100;

  const handleComplete = () => {
    if (!isUnlocked) return;

    if (!isCompleted && lessonId && onCompleteLesson) {
      onCompleteLesson(lessonId);
    }

    if (!isCompleted && isLastLessonOfModule) {
      const duration = 1500;
      const end = Date.now() + duration;

      const frame = () => {
        confetti({
          particleCount: 5,
          angle: 60,
          spread: 55,
          origin: { x: 0 },
          colors: ['#0056D2', '#1FA15F', '#F5AF02'],
          zIndex: 100
        });
        confetti({
          particleCount: 5,
          angle: 120,
          spread: 55,
          origin: { x: 1 },
          colors: ['#0056D2', '#1FA15F', '#F5AF02'],
          zIndex: 100
        });

        if (Date.now() < end) {
          requestAnimationFrame(frame);
        }
      };
      frame();
    }

    navigate(nextUrl);
  };

  // Dynamic style for background progress loading
  const buttonStyle = !isUnlocked ? {
    backgroundImage: `linear-gradient(to right, rgba(0, 86, 210, 0.08) ${scrollProgress}%, transparent ${scrollProgress}%)`,
    backgroundSize: '100% 100%',
    backgroundRepeat: 'no-repeat',
  } : {};

  return (
    <div className="sticky bottom-0 left-0 right-0 -mx-4 sm:-mx-6 md:-mx-12 -mb-4 sm:-mb-6 md:-mb-12 mt-16 p-4 md:px-12 md:py-6 bg-white border-t border-border-main flex justify-end z-20 shadow-[0_-4px_20px_rgb(0,0,0,0.05)]">
      <Button
        onClick={handleComplete}
        disabled={!isUnlocked}
        size="lg"
        style={buttonStyle}
        className={cn(
          "relative overflow-hidden px-6 rounded-md font-semibold md:text-base gap-2 transition-all duration-300 border active:scale-98", 
          isUnlocked 
            ? "bg-primary hover:bg-[#004BB5] text-white border-primary cursor-pointer shadow-sm hover:shadow-md" 
            : "bg-slate-50 text-slate-500 border-slate-200 cursor-not-allowed opacity-90"
        )}
      >
        {isUnlocked ? (
          <>{hasNext ? "Materi Selanjutnya ➔" : "Selesai Belajar ➔"}</>
        ) : (
          <span className="flex items-center gap-1.5 text-xs sm:text-sm">
            <span>{hasNext ? `Materi Selanjutnya (Baca ${scrollProgress}%)` : `Selesai Belajar (Baca ${scrollProgress}%)`}</span>
          </span>
        )}
      </Button>
    </div>
  );
}

export interface QuizQuestion {
  question: string;
  options: string[];
  correctAnswer: string;
  explanation?: string;
}

export function MultiQuestionQuiz({
  questions,
  onComplete,
  onStateChange
}: {
  questions: QuizQuestion[];
  onComplete: () => void;
  onStateChange?: (state: 'idle' | 'started' | 'finished') => void;
}) {
  const [started, setStarted] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isAnswerChecked, setIsAnswerChecked] = useState(false);
  const [answers, setAnswers] = useState<{ [key: number]: string }>({});
  const [isFinished, setIsFinished] = useState(false);

  const totalQuestions = questions.length;
  const currentQuestion = questions[currentIndex];

  const handleStart = () => {
    setStarted(true);
    setCurrentIndex(0);
    setSelectedOption(null);
    setIsAnswerChecked(false);
    setAnswers({});
    setIsFinished(false);
    if (onStateChange) onStateChange('started');
  };

  const handleSelect = (option: string) => {
    if (isAnswerChecked) return;
    setSelectedOption(option);
  };

  const handleCheck = () => {
    if (!selectedOption) return;
    setIsAnswerChecked(true);
    setAnswers(prev => ({ ...prev, [currentIndex]: selectedOption }));
  };

  const handleNext = () => {
    if (currentIndex < totalQuestions - 1) {
      setCurrentIndex(prev => prev + 1);
      setSelectedOption(null);
      setIsAnswerChecked(false);
    } else {
      setIsFinished(true);
      if (onStateChange) onStateChange('finished');
      triggerConfetti();
    }
  };

  const triggerConfetti = () => {
    const duration = 2000;
    const end = Date.now() + duration;

    const frame = () => {
      confetti({
        particleCount: 6,
        angle: 60,
        spread: 55,
        origin: { x: 0, y: 0.8 },
        colors: ['#0056D2', '#1FA15F', '#F5AF02'],
        zIndex: 100
      });
      confetti({
        particleCount: 6,
        angle: 120,
        spread: 55,
        origin: { x: 1, y: 0.8 },
        colors: ['#0056D2', '#1FA15F', '#F5AF02'],
        zIndex: 100
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    };
    frame();
  };

  const calculateScore = () => {
    let score = 0;
    questions.forEach((q, idx) => {
      if (answers[idx] === q.correctAnswer) {
        score++;
      }
    });
    return score;
  };

  const score = calculateScore();
  const percentage = Math.round((score / totalQuestions) * 100);

  let badge = "Ayo Belajar Lagi!";
  let badgeColor = "from-amber-500 to-orange-600";
  if (percentage >= 90) {
    badge = "Sempurna! Sang Ahli Logika";
    badgeColor = "from-emerald-500 to-teal-600";
  } else if (percentage >= 70) {
    badge = "Luar Biasa! Pemahaman Sangat Baik";
    badgeColor = "from-blue-500 to-indigo-600";
  } else if (percentage >= 50) {
    badge = "Kerja Bagus! Cukup Memahami";
    badgeColor = "from-sky-400 to-blue-500";
  }

  if (!started) {
    return (
      <div className="bg-gradient-to-br from-slate-50 to-white rounded-2xl border border-border-main p-5 sm:p-8 shadow-sm text-center max-w-xl mx-auto my-3 animate-in fade-in duration-500">
        <div className="w-12 h-12 bg-blue-50 text-primary border border-blue-100 rounded-full flex items-center justify-center mx-auto mb-4 shadow-sm">
          <HelpCircle className="w-6 h-6" />
        </div>
        <h3 className="text-xl font-black text-text-main mb-2">Uji Kompetensi Kuis Akhir</h3>
        <p className="text-text-secondary text-xs max-w-md mx-auto mb-5 leading-relaxed">
          Kuis ini berisi <strong>{totalQuestions} pertanyaan</strong> pilihan ganda untuk menguji pemahaman menyeluruh Anda mengenai bab ini. 
          Anda dapat menyelesaikan modul setelah menyelesaikan kuis ini.
        </p>
        <Button
          onClick={handleStart}
          size="default"
          className="w-full sm:w-auto bg-primary hover:bg-[#004BB5] text-white font-bold px-6 h-10 rounded-xl transition-all shadow-md cursor-pointer"
        >
          Mulai Kuis Sekarang
        </Button>
      </div>
    );
  }

  if (isFinished) {
    return (
      <div className="bg-white rounded-2xl border border-border-main p-4 sm:p-6 shadow-sm max-w-2xl mx-auto my-3 animate-in fade-in duration-500">
        <div className="text-center mb-4 pb-3 border-b border-border-main">
          <div className={cn("inline-flex items-center justify-center px-3 py-1 rounded-full text-[10px] font-bold text-white bg-gradient-to-r shadow-xs mb-3", badgeColor)}>
            {badge}
          </div>
          <h3 className="text-xl font-black text-text-main mb-1">Hasil Evaluasi Kuis</h3>
          <p className="text-text-secondary text-[11px]">Rangkuman hasil jawaban kuis evaluasi materi</p>
          
          <div className="flex justify-center items-center gap-6 my-4">
            <div className="relative w-20 h-20 flex flex-col items-center justify-center rounded-full bg-slate-50 border-4 border-slate-100 shadow-inner">
              <span className="text-xl font-black text-text-main">{score} / {totalQuestions}</span>
              <span className="text-[8px] text-text-secondary font-bold uppercase tracking-wider mt-0.5">Skor Benar</span>
            </div>
            <div className="text-left">
              <div className="text-2xl font-extrabold text-primary">{percentage}%</div>
              <div className="text-[10px] text-text-secondary font-bold mt-0.5">Tingkat Ketepatan</div>
              <div className="text-[11px] font-semibold text-text-main mt-1">
                {score >= 7 ? "🎉 Selamat! Anda telah menguasai bab ini." : "💪 Terus semangat belajar dan coba lagi."}
              </div>
            </div>
          </div>
        </div>

        {/* Question Review List - set shorter height to prevent page scrolling */}
        <div className="space-y-3.5 mb-4 max-h-[180px] overflow-y-auto pr-1">
          <h4 className="font-bold text-[10px] text-text-secondary uppercase tracking-wider mb-2 font-sans">Tinjauan Pertanyaan</h4>
          {questions.map((q, idx) => {
            const userAnswer = answers[idx];
            const isCorrect = userAnswer === q.correctAnswer;
            return (
              <div key={idx} className={cn("p-3 rounded-xl border text-xs transition-all", isCorrect ? "bg-success/5 border-success/20" : "bg-error/5 border-error/20")}>
                <div className="flex justify-between items-start gap-3 mb-1.5">
                  <span className="font-bold text-text-main">Pertanyaan {idx + 1}</span>
                  <span className={cn("text-[9px] font-bold px-2 py-0.5 rounded-full", isCorrect ? "bg-success/15 text-success" : "bg-error/15 text-error")}>
                    {isCorrect ? "Benar" : "Salah"}
                  </span>
                </div>
                <p className="text-text-main font-medium mb-2 leading-relaxed">{q.question}</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-1 text-[10px] text-text-secondary mb-2 font-mono">
                  <div>Jawaban Anda: <span className={cn("font-bold", isCorrect ? "text-success" : "text-error")}>{userAnswer}</span></div>
                  <div>Jawaban Benar: <span className="font-bold text-success">{q.correctAnswer}</span></div>
                </div>
                {q.explanation && (
                  <p className="text-[10px] text-text-secondary bg-white border border-slate-100 p-2 rounded-lg leading-relaxed mt-1.5">
                    <span className="font-bold text-primary mr-1">Penjelasan:</span> {q.explanation}
                  </p>
                )}
              </div>
            );
          })}
        </div>

        <div className="flex flex-col sm:flex-row gap-2.5 justify-end border-t border-border-main pt-4">
          <Button
            onClick={handleStart}
            variant="outline"
            className="border-border-main text-text-main hover:bg-slate-50 font-bold px-4 h-10 rounded-xl text-xs transition-all cursor-pointer flex items-center justify-center gap-1.5"
          >
            <RotateCcw className="w-3.5 h-3.5" /> Ulangi Kuis
          </Button>
          <Button
            onClick={onComplete}
            className="bg-primary hover:bg-[#004BB5] text-white font-bold px-6 h-10 rounded-xl text-xs transition-all shadow-md cursor-pointer flex items-center justify-center gap-1.5 animate-pulse"
          >
            Selesaikan Modul Belajar <CheckCircle2 className="w-3.5 h-3.5" />
          </Button>
        </div>
      </div>
    );
  }

  const isCorrect = selectedOption === currentQuestion.correctAnswer;

  return (
    <div className="bg-white rounded-2xl border border-border-main p-3 sm:p-5 shadow-sm transition-all duration-300 hover:shadow-md max-w-2xl mx-auto my-1.5 sm:my-3 animate-in fade-in-50 duration-500">
      {/* Header */}
      <div className="flex items-center justify-between mb-3 border-b border-border-main pb-2">
        <div className="flex items-center gap-3">
          <div className="flex items-center justify-center bg-blue-50 text-primary h-7 w-7 rounded-lg text-xs font-bold border border-blue-100 shadow-xs">
            {currentIndex + 1}
          </div>
          <div>
            <h4 className="font-bold text-text-main text-sm sm:text-base">Evaluasi Pemahaman</h4>
            <p className="text-[10px] text-text-secondary">Pertanyaan {currentIndex + 1} dari {totalQuestions}</p>
          </div>
        </div>
        <span className="text-[10px] bg-slate-100 text-text-secondary font-bold px-2 py-0.5 rounded-md select-none font-sans">
          Kuis Bab
        </span>
      </div>

      {/* Progress Bar */}
      <div className="w-full h-1 bg-slate-100 rounded-full mb-3 overflow-hidden">
        <div 
          className="h-full bg-primary transition-all duration-300"
          style={{ width: `${((currentIndex + 1) / totalQuestions) * 100}%` }}
        />
      </div>

      <div className="space-y-3">
        <p className="text-xs sm:text-sm font-bold text-text-main leading-relaxed min-h-[36px]">
          {currentQuestion.question}
        </p>

        {/* 2x2 grid for option buttons on desktop to save vertical space */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {currentQuestion.options.map((opt, i) => {
            const letter = String.fromCharCode(65 + i);
            const isSelected = selectedOption === letter;

            let containerClass = "bg-white border-border-main hover:border-primary hover:bg-slate-50 text-text-main";
            let badgeClass = "bg-slate-100 text-text-secondary border-slate-200";
            let dotIndicator = <div className="w-3.5 h-3.5 rounded-full border border-slate-300 mr-2 shrink-0 transition-all mt-0.5"></div>;

            if (isSelected && !isAnswerChecked) {
              containerClass = "border-primary bg-blue-50/50 text-text-main ring-1 ring-primary";
              badgeClass = "bg-primary text-white border-primary shadow-sm";
              dotIndicator = (
                <div className="w-3.5 h-3.5 rounded-full border-[3.5px] border-primary mr-2 shrink-0 flex items-center justify-center mt-0.5" />
              );
            }

            if (isAnswerChecked) {
              if (isSelected) {
                if (isCorrect) {
                  containerClass = "border-success bg-success/5 text-success ring-1 ring-success";
                  badgeClass = "bg-success text-white border-success";
                  dotIndicator = (
                    <div className="w-3.5 h-3.5 rounded-full bg-success mr-2 shrink-0 flex items-center justify-center text-white animate-scale-up mt-0.5">
                      <Check className="w-2.5 h-2.5 stroke-[3]" />
                    </div>
                  );
                } else {
                  containerClass = "border-error bg-error/5 text-error ring-1 ring-error";
                  badgeClass = "bg-error text-white border-error";
                  dotIndicator = (
                    <div className="w-3.5 h-3.5 bg-error rounded-full mr-2 shrink-0 flex items-center justify-center text-white text-[7px] font-bold animate-scale-up mt-0.5">
                      ✕
                    </div>
                  );
                }
              } else if (letter === currentQuestion.correctAnswer) {
                containerClass = "border-success bg-success/5 text-success border-dashed";
                badgeClass = "bg-success text-white border-success";
                dotIndicator = (
                  <div className="w-3.5 h-3.5 rounded-full border-2 border-success mr-2 shrink-0 mt-0.5" />
                );
              } else {
                containerClass = "bg-slate-50/50 border-slate-100 text-slate-400 opacity-60";
                badgeClass = "bg-slate-100/50 text-slate-400 border-slate-100";
                dotIndicator = <div className="w-3.5 h-3.5 rounded-full border border-slate-200 mr-2 shrink-0 transition-all mt-0.5"></div>;
              }
            }

            return (
              <button
                key={i}
                onClick={() => handleSelect(letter)}
                disabled={isAnswerChecked}
                className={cn(
                  "w-full text-left py-2 px-3 rounded-xl border text-xs font-semibold transition-all duration-200 flex items-start shadow-xs cursor-pointer select-none min-h-[40px]",
                  containerClass
                )}
              >
                {dotIndicator}
                <span className={cn(
                  "w-5 h-5 rounded-full border flex items-center justify-center text-[10px] font-bold mr-2 shrink-0 transition-colors mt-0.5",
                  badgeClass
                )}>
                  {letter}
                </span>
                <span className="flex-1 leading-snug">{opt}</span>
              </button>
            );
          })}
        </div>

        {!isAnswerChecked ? (
          <Button
            onClick={handleCheck}
            disabled={!selectedOption}
            size="default"
            className="w-full bg-primary hover:bg-[#004BB5] text-white font-bold h-10 rounded-xl text-xs transition-all duration-200 hover:scale-[1.01] hover:shadow-md cursor-pointer disabled:opacity-50 disabled:scale-100 disabled:pointer-events-none"
          >
            Cek Jawaban
          </Button>
        ) : (
          <div className="space-y-2">
            <div className={cn(
              "rounded-xl p-2.5 border flex gap-3 transition-all duration-500 animate-in fade-in slide-in-from-top-4",
              isCorrect ? "bg-success/5 border-success/30 text-success" : "bg-error/5 border-error/30 text-error"
            )}>
              <div className="shrink-0 mt-0.5">
                {isCorrect ? (
                  <CheckCircle2 className="h-4 w-4 text-success animate-bounce" />
                ) : (
                  <AlertCircle className="h-4 w-4 text-error" />
                )}
              </div>
              <div className="flex-1 min-w-0">
                <p className={cn("font-bold text-xs mb-0.5", isCorrect ? "text-success" : "text-error")}>
                  {isCorrect ? "Jawaban Benar!" : "Jawaban Kurang Tepat"}
                </p>
                {currentQuestion.explanation && (
                  <p className="text-[10.5px] text-text-secondary leading-normal max-h-[50px] overflow-y-auto pr-1">
                    {currentQuestion.explanation}
                  </p>
                )}
              </div>
            </div>
            
            <Button
              onClick={handleNext}
              size="default"
              className="w-full bg-primary hover:bg-[#004BB5] text-white font-bold h-10 rounded-xl text-xs transition-all duration-200 hover:scale-[1.01] hover:shadow-md cursor-pointer"
            >
              {currentIndex < totalQuestions - 1 ? "Pertanyaan Selanjutnya" : "Lihat Hasil Kuis"}
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
