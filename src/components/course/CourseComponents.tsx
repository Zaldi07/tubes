import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { CheckCircle2, ChevronRight, Calculator, AlertCircle, Play, Info, X, Volume2, Settings, Type, Check } from 'lucide-react';
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
    <div className="mb-10 text-center md:text-left pt-4">
      <h1 className="text-4xl font-normal text-text-main mb-6 tracking-tight">{title}</h1>
    </div>
  );
}

export function MediaPlayerBase() {
  return (
    <div className="mb-10 w-full mx-auto md:mx-0">
      <div className="flex items-center px-6 py-3 rounded-full border-2 border-primary text-primary transition-all shadow-sm bg-white">
        <Play className="w-5 h-5 shrink-0 fill-primary mr-4 cursor-pointer" />
        <span className="text-xs font-semibold shrink-0 cursor-default">0:01 / 4:11</span>
        <div className="flex-1 mx-4 relative flex items-center group cursor-pointer h-4">
          <div className="w-full h-1 bg-slate-200 rounded-full overflow-hidden">
            <div className="w-[5%] h-full bg-primary rounded-full"></div>
          </div>
          <div className="absolute left-[5%] w-3 h-3 bg-text-main rounded-full transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity"></div>
        </div>
        <span className="text-xs font-bold shrink-0 mx-3 cursor-pointer">1x</span>
        <Volume2 className="w-5 h-5 shrink-0 mx-2 cursor-pointer" />
        <Settings className="w-5 h-5 shrink-0 ml-2 cursor-pointer" />
      </div>
    </div>
  );
}

export function LearningObjectives({ objectives }: { objectives: string[] }) {
  // We can skip this or render as normal list to match clean look
  return (
    <div className="mb-8">
      <ul className="space-y-4 text-[15px] text-text-main leading-relaxed">
        {objectives.map((obj, i) => (
          <li key={i} className="flex gap-3">
            <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-slate-800" />
            <span>{obj}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function FormulaBox({ title, formula, desc }: { title?: string, formula: string | React.ReactNode, desc?: string }) {
  return (
    <div className="bg-brand-background p-6 rounded-lg border-l-4 border-l-primary mb-6 flex items-center justify-between">
      <div>
        {title && <p className="text-xs font-bold text-text-secondary uppercase mb-1">{title}</p>}
        <div className="text-xl font-mono text-text-main">
          {formula}
        </div>
        {desc && <p className="text-sm text-text-secondary mt-2 pt-2">{desc}</p>}
      </div>
      <div className="text-border-main hidden md:block opacity-50">
        <Calculator className="h-12 w-12" />
      </div>
    </div>
  );
}

export function ExampleBox({ children }: { children: React.ReactNode }) {
  return (
    <div className="my-6 rounded-lg border border-warning/30 bg-warning/5 p-5">
      <h4 className="text-sm font-bold text-warning mb-3 flex items-center gap-2">
        <AlertCircle className="h-4 w-4" /> Contoh
      </h4>
      <div className="text-text-main text-sm">
        {children}
      </div>
    </div>
  );
}

export function ContentSection({ title, children }: { title: string, children: React.ReactNode }) {
  return (
    <div className="mb-10">
      <h3 className="text-xl font-bold text-text-main mb-4">{title}</h3>
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
    <div className="bg-white rounded-2xl border border-border-main p-6 sm:p-8 shadow-sm transition-all duration-300 hover:shadow-md mb-10 w-full">
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
              let dotIndicator = <div className="w-4 h-4 rounded-full border border-slate-300 mr-3 shrink-0 transition-all"></div>;

              if (isSelected && !isSubmitted) {
                containerClass = "border-primary bg-blue-50/50 text-text-main ring-1 ring-primary";
                badgeClass = "bg-primary text-white border-primary shadow-sm";
                dotIndicator = (
                  <div className="w-4 h-4 rounded-full border-4 border-primary mr-3 shrink-0 flex items-center justify-center">
                  </div>
                );
              }

              if (isSubmitted) {
                if (isSelected) {
                  if (isCorrect) {
                    containerClass = "border-success bg-success/5 text-success ring-1 ring-success";
                    badgeClass = "bg-success text-white border-success";
                    dotIndicator = (
                      <div className="w-4 h-4 rounded-full bg-success mr-3 shrink-0 flex items-center justify-center text-white">
                        <Check className="w-2.5 h-2.5 stroke-[3]" />
                      </div>
                    );
                  } else {
                    containerClass = "border-error bg-error/5 text-error ring-1 ring-error";
                    badgeClass = "bg-error text-white border-error";
                    dotIndicator = (
                      <div className="w-4 h-4 bg-error rounded-full mr-3 shrink-0 flex items-center justify-center text-white text-[8px] font-bold">
                        ✕
                      </div>
                    );
                  }
                } else if (letter === correctAnswer) {
                  containerClass = "border-success bg-success/5 text-success border-dashed";
                  badgeClass = "bg-success text-white border-success";
                  dotIndicator = (
                    <div className="w-4 h-4 rounded-full border-2 border-success mr-3 shrink-0"></div>
                  );
                } else {
                  containerClass = "bg-slate-50/50 border-slate-100 text-slate-400 opacity-60";
                  badgeClass = "bg-slate-100/50 text-slate-400 border-slate-100";
                }
              }

              return (
                <button
                  key={i}
                  onClick={() => !isSubmitted && setSelected(letter)}
                  disabled={isSubmitted}
                  className={cn(
                    "w-full text-left p-4 rounded-xl border text-sm font-medium transition-all duration-200 flex items-center shadow-sm cursor-pointer select-none",
                    containerClass
                  )}
                >
                  {dotIndicator}
                  <span className={cn(
                    "w-6 h-6 rounded-full border flex items-center justify-center text-xs font-bold mr-3 shrink-0 transition-colors",
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

  // Sync completed state when lessonId or completedLessons list changes
  React.useEffect(() => {
    setIsCompleted(lessonId ? completedLessons.includes(lessonId) : false);
  }, [lessonId, completedLessons]);

  // Compute next lesson URL
  let nextUrl = '/dashboard';
  let hasNext = false;
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

  const handleComplete = () => {
    if (isCompleted) {
      navigate(nextUrl);
      return;
    }

    setIsCompleted(true);
    if (lessonId && onCompleteLesson) {
      onCompleteLesson(lessonId);
    }

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
  };

  return (
    <div className=" sticky bottom-0 left-0 right-0 -mx-6 md:-mx-12 -mb-6 md:-mb-12 mt-16 p-4 md:px-12 md:py-6 bg-white sm:border-t lg:border
     border-border-main flex justify-end z-20 shadow-[0_-4px_20px_rgb(0,0,0,0.05)]">
      <Button
        onClick={handleComplete}
        size="lg"
        className={cn("px-6 rounded-md font-semibold md:text-base gap-2 cursor-pointer", isCompleted ? "bg-success hover:bg-success/90" : "bg-primary hover:bg-[#004BB5]")}
      >
        {isCompleted ? (
          <><CheckCircle2 className="h-5 w-5" /> {hasNext ? "Materi Selanjutnya ➔" : "Selesai Belajar ➔"}</>
        ) : (
          <>Tandai Selesai & Lanjut</>
        )}
      </Button>
    </div>
  );
}
