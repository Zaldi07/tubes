import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import { Button } from '../components/ui/button';
import {
  ArrowRight,
  BarChart,
  BookOpen,
  CheckCircle,
  Network,
  Binary
} from 'lucide-react';
import { motion, AnimatePresence, useInView, useScroll, useTransform } from 'motion/react';

function AnimatedCounter({ from = 0, to, duration = 1.5, suffix = "" }: { from?: number; to: number; duration?: number; suffix?: string }) {
  const [count, setCount] = useState(from);
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (!isInView) return;

    let start = from;
    const end = to;
    if (start === end) return;

    const totalMiliseconds = duration * 1000;
    const startTime = performance.now();

    let animationFrameId: number;

    const updateCount = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / totalMiliseconds, 1);

      // Ease out quad
      const easeProgress = progress * (2 - progress);

      setCount(Math.floor(easeProgress * (end - start) + start));

      if (progress < 1) {
        animationFrameId = requestAnimationFrame(updateCount);
      }
    };

    animationFrameId = requestAnimationFrame(updateCount);
    return () => cancelAnimationFrame(animationFrameId);
  }, [isInView, from, to, duration]);

  return <span ref={ref}>{count}{suffix}</span>;
}

export default function LandingPage() {
  const topics = [
    "Matematika Diskrit",
    "Aljabar Boolean",
    "Teori Graf",
    "Kombinatorika",
    "Peluang Diskrit"
  ];
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % topics.length);
    }, 2500);
    return () => clearInterval(timer);
  }, []);

  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 1500], [0, -120]);
  const y2 = useTransform(scrollY, [0, 2000], [0, 180]);
  const y3 = useTransform(scrollY, [0, 2500], [0, -200]);
  const y4 = useTransform(scrollY, [0, 3000], [0, 140]);

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

  const activeCursor = cursorClasses[cursorIdx];


  const [graphType, setGraphType] = useState<'triangle' | 'square'>('triangle');
  const [selectedNode, setSelectedNode] = useState<number | null>(null);

  const nodes = graphType === 'triangle'
    ? [
      { id: 1, x: 50, y: 15, deg: 2 },
      { id: 2, x: 20, y: 85, deg: 2 },
      { id: 3, x: 80, y: 85, deg: 2 }
    ]
    : [
      { id: 1, x: 20, y: 20, deg: 3 },
      { id: 2, x: 80, y: 20, deg: 2 },
      { id: 3, x: 80, y: 80, deg: 3 },
      { id: 4, x: 20, y: 80, deg: 2 }
    ];

  const edges = graphType === 'triangle'
    ? [
      { from: 1, to: 2 },
      { from: 1, to: 3 },
      { from: 2, to: 3 }
    ]
    : [
      { from: 1, to: 2 },
      { from: 2, to: 3 },
      { from: 3, to: 4 },
      { from: 4, to: 1 },
      { from: 1, to: 3 }
    ];

  return (
    <div className={`flex min-h-screen flex-col bg-ambient font-sans antialiased overflow-x-hidden relative ${activeCursor}`}>
      {/* Premium Background Grid Pattern */}
      <div className="absolute inset-0 bg-grid-pattern opacity-70 pointer-events-none -z-10"></div>

      {/* Floating Parallax Math Symbols */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none -z-5">
        <motion.div style={{ y: y1 }} className="absolute top-[18%] left-[6%] text-primary/10 text-8xl font-serif select-none will-change-transform transform-gpu">
          ∑
        </motion.div>
        <motion.div style={{ y: y2 }} className="absolute top-[32%] right-[8%] text-indigo-500/10 text-9xl font-serif select-none will-change-transform transform-gpu">
          ∫
        </motion.div>
        <motion.div style={{ y: y3 }} className="absolute top-[58%] left-[10%] text-violet-500/10 text-7xl font-sans font-bold select-none will-change-transform transform-gpu">
          A ∧ B
        </motion.div>
        <motion.div style={{ y: y4 }} className="absolute top-[72%] right-[6%] text-cyan-500/10 text-8xl font-mono select-none will-change-transform transform-gpu">
          G=(V,E)
        </motion.div>
        <motion.div style={{ y: y1 }} className="absolute top-[88%] left-[12%] text-primary/5 text-9xl font-serif select-none will-change-transform transform-gpu">
          π
        </motion.div>
      </div>

      <Navbar />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative pt-32 pb-24 lg:pt-40 lg:pb-32 overflow-hidden">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex flex-col items-center">
            {/* Centered Top: Heading and CTA */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="max-w-3xl flex flex-col items-center text-center mb-16 relative w-full"
            >
              {/* LaTeX-typeset Math Formulas Around Hero Section Text (Visible on both Desktop & Mobile, positioned to prevent text collision) */}
              <motion.div
                initial={{ opacity: 0, rotate: -3 }}
                animate={{ opacity: 0.65, rotate: -3 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="absolute left-2 sm:left-6 lg:-left-12 xl:-left-24 top-[1%] lg:top-[6%] text-slate-500 font-serif text-[10px] sm:text-sm lg:text-base select-none origin-center z-0 pointer-events-none"
              >
                <span className="italic">p</span> <span className="mx-0.5 text-slate-400">∨</span> ¬<span className="italic">p</span> <span className="mx-1 text-slate-400">≡</span> <span className="font-semibold text-slate-600">T</span>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, rotate: 2 }}
                animate={{ opacity: 0.65, rotate: 2 }}
                transition={{ duration: 0.6, delay: 0.25 }}
                className="absolute right-2 sm:right-6 lg:-right-12 xl:-right-24 top-[8%] lg:top-[3%] text-slate-500 font-serif text-[10px] sm:text-sm lg:text-base select-none origin-center z-0 pointer-events-none"
              >
                <span className="italic font-medium">A</span> <span className="mx-0.5 text-slate-400">∩</span> (<span className="italic font-medium">B</span> <span className="mx-0.5 text-slate-400">∪</span> <span className="italic font-medium">C</span>) <span className="mx-1 text-slate-400">=</span> (<span className="italic font-medium">A</span> <span className="mx-0.5 text-slate-400">∩</span> <span className="italic font-medium">B</span>) <span className="mx-0.5 text-slate-400">∪</span> (<span className="italic font-medium">A</span> <span className="mx-0.5 text-slate-400">∩</span> <span className="italic font-medium">C</span>)
              </motion.div>

              <motion.div
                initial={{ opacity: 0, rotate: -1.5 }}
                animate={{ opacity: 0.65, rotate: -1.5 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="absolute left-1 sm:left-4 lg:-left-16 xl:-left-28 top-[85%] lg:top-[53%] text-slate-500 font-serif text-[10px] sm:text-sm lg:text-base select-none origin-center z-0 pointer-events-none"
              >
                <span className="italic font-medium">V</span> <span className="mx-0.5 text-slate-400">−</span> <span className="italic font-medium">E</span> <span className="mx-0.5 text-slate-400">+</span> <span className="italic font-medium">F</span> <span className="mx-1 text-slate-400">=</span> <span className="text-slate-600">2</span>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, rotate: 2.5 }}
                animate={{ opacity: 0.65, rotate: 2.5 }}
                transition={{ duration: 0.6, delay: 0.35 }}
                className="absolute right-1 sm:right-4 lg:-right-16 xl:-right-28 top-[80%] lg:top-[48%] flex items-center text-slate-500 font-serif text-[10px] sm:text-sm lg:text-base select-none origin-center z-0 pointer-events-none"
              >
                <span className="italic font-medium">C</span>(<span className="italic">n</span>, <span className="italic">r</span>) <span className="mx-1 text-slate-400">=</span>
                <div className="inline-flex flex-col items-center justify-center align-middle mx-1 text-center leading-none text-xs">
                  <span className="border-b border-slate-300 pb-0.5 px-1 font-serif"><span className="italic font-medium">n</span>!</span>
                  <span className="pt-0.5 px-1 font-serif"><span className="italic font-medium">r</span>!(<span className="italic font-medium">n</span> − <span className="italic font-medium">r</span>)!</span>
                </div>
              </motion.div>

              {/* Raw Math Symbols Floating Tightly */}
              <motion.div
                initial={{ opacity: 0, rotate: -4 }}
                animate={{ opacity: 0.35, rotate: -4 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="absolute left-3 sm:left-10 lg:-left-8 xl:-left-20 top-[94%] lg:top-[76%] text-slate-400 font-serif text-[9px] sm:text-xs select-none origin-center z-0 pointer-events-none"
              >
                <span className="italic font-medium">x</span> <span className="mx-0.5 text-slate-400">≡</span> <span className="italic font-medium">y</span> <span className="ml-1.5 text-[10px] text-slate-400/80 font-sans">(mod <span className="italic font-serif">m</span>)</span>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, rotate: 3.5 }}
                animate={{ opacity: 0.35, rotate: 3.5 }}
                transition={{ duration: 0.6, delay: 0.45 }}
                className="absolute right-3 sm:right-10 lg:-right-8 xl:-right-20 top-[90%] lg:top-[70%] text-slate-400 font-serif text-[9px] sm:text-xs select-none origin-center z-0 pointer-events-none"
              >
                <span className="italic font-medium">f</span> <span className="mx-0.5 text-slate-400">:</span> <span className="italic font-medium">A</span> <span className="mx-1 text-slate-400">→</span> <span className="italic font-medium">B</span>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, rotate: -1 }}
                animate={{ opacity: 0.3, rotate: -1 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                className="absolute left-[35%] -top-8 lg:-top-10 text-slate-400 font-serif text-[9px] sm:text-xs select-none origin-center z-0 pointer-events-none"
              >
                <span className="italic font-medium">p</span> <span className="mx-0.5 text-slate-400">∧</span> <span className="italic font-medium">q</span> <span className="mx-1 text-slate-400">→</span> <span className="italic font-medium">r</span>
              </motion.div>
              <div className="inline-flex items-center gap-2 rounded-full border border-indigo-100 bg-indigo-50/50 px-4 py-1.5 text-xs sm:text-sm font-semibold text-primary mb-6 shadow-xs backdrop-blur-xs">
                <span className="flex h-2 w-2 rounded-full bg-primary animate-ping"></span>
                Visualisasi & Eksplorasi Matematika Diskrit
              </div>
              <h1 className="text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl lg:text-6xl mb-6 leading-tight">
                Belajar{' '}
                <span className="inline-block relative text-primary min-w-[250px] sm:min-w-[380px] lg:min-w-[450px] h-[1.15em] overflow-hidden align-bottom">
                  <AnimatePresence mode="wait">
                    <motion.span
                      key={topics[index]}
                      initial={{ y: '100%', opacity: 0 }}
                      animate={{ y: '0%', opacity: 1 }}
                      exit={{ y: '-100%', opacity: 0 }}
                      transition={{ duration: 0.35, ease: 'easeInOut' }}
                      className="absolute left-1/2 -translate-x-1/2 bottom-0 w-full text-center"
                    >
                      {topics[index]}
                    </motion.span>
                  </AnimatePresence>
                </span>{' '}
                <br className="sm:hidden" />
                Lebih <span className="bg-gradient-to-r from-primary via-indigo-600 to-indigo-700 bg-clip-text text-transparent">Terstruktur</span> & Interaktif
              </h1>
              <p className="text-base sm:text-lg text-slate-500 mb-8 leading-relaxed max-w-2xl">
                Pelajari Aljabar Boolean, Peluang, Permutasi, Kombinasi, dan Graf melalui materi terpandu, visualisator sirkuit & graf interaktif, serta evaluasi mandiri.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto">
                <Button size="lg" asChild className="w-full sm:w-auto gap-2 bg-primary hover:bg-[#004BB5] text-white font-bold px-6 py-3.5 sm:py-0 sm:h-12 rounded-xl transition-all duration-200 hover:scale-[1.02] hover:shadow-lg hover:shadow-primary/10 cursor-pointer">
                  <Link to="/dashboard" className="flex items-center justify-center gap-2 whitespace-nowrap w-full h-full">
                    Mulai Belajar Sekarang <ArrowRight className="h-4 w-4 shrink-0" />
                  </Link>
                </Button>
                <Button size="lg" variant="outline" asChild className="px-6 py-3.5 w-full sm:w-auto sm:min-w-[220px] h-12 rounded-xl border-slate-200 hover:bg-slate-100 font-bold cursor-pointer">
                  <a href="#materi" className="w-full h-full flex items-center justify-center px-6">Lihat Materi</a>
                </Button>
              </div>
            </motion.div>

            {/* Centered Bottom: Workspace macOS App Mockup */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="w-full max-w-7xl relative"
            >
              <div className="absolute -inset-1 rounded-2xl bg-gradient-to-tr from-primary/25 to-indigo-500/10 blur-3xl opacity-75 -z-10 animate-pulse duration-4000"></div>
              <div className="relative rounded-2xl border border-slate-200 bg-white p-4 sm:p-6 md:p-8 backdrop-blur-md">
                {/* macOS Window Controls */}
                <div className="flex items-center justify-between mb-5 border-b border-slate-100 pb-3">
                  <div className="flex items-center gap-1.5">
                    <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-[#FF5F56]"></div>
                    <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-[#FFBD2E]"></div>
                    <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-[#27C93F]"></div>
                    <span className="text-[10px] text-slate-400 font-mono ml-2 sm:ml-4 hidden sm:inline-block">workspace-graf-planar.tsx</span>
                  </div>
                  <span className="text-[9px] sm:text-[10px] bg-indigo-50 text-primary px-2 sm:px-2.5 py-0.5 rounded-full font-bold shrink-0">Simulator Interaktif</span>
                </div>

                {/* Simulator Box Demo */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                  {/* Left Column: Graf Visualizer */}
                  <div className="space-y-3 sm:space-y-4 flex flex-col justify-between">
                    <div className="rounded-xl border border-slate-100 bg-slate-50 p-3 sm:p-4 flex-1 flex flex-col justify-between">
                      <div className="flex items-center justify-between mb-3.5 border-b border-slate-200/50 pb-2">
                        <div className="flex items-center gap-2">
                          <Network className="h-4 w-4 text-primary animate-pulse" />
                          <span className="text-xs font-bold text-slate-700">
                            {graphType === 'triangle' ? 'Graf Segitiga (K3)' : 'Graf Planar (K4-)'}
                          </span>
                        </div>
                        <button
                          onClick={() => {
                            setGraphType(prev => prev === 'triangle' ? 'square' : 'triangle');
                            setSelectedNode(null);
                          }}
                          className="text-[9px] sm:text-[10px] bg-primary/10 text-primary hover:bg-primary hover:text-white px-2 sm:px-2.5 py-0.5 rounded font-bold transition-all duration-200 cursor-pointer"
                        >
                          Ubah Graf
                        </button>
                      </div>

                      <div className="flex items-center justify-center h-48 sm:h-60 relative bg-slate-50/50 rounded-lg p-2 border border-slate-100/55">
                        <div className="relative h-36 w-36 sm:h-44 sm:w-44">
                          <svg className="absolute inset-0 h-full w-full" viewBox="0 0 100 100">
                            {edges.map((edge, i) => {
                              const fromNode = nodes.find(n => n.id === edge.from)!;
                              const toNode = nodes.find(n => n.id === edge.to)!;
                              const isActive = (selectedNode === edge.from || selectedNode === edge.to);
                              return (
                                <line
                                  key={i}
                                  x1={fromNode.x}
                                  y1={fromNode.y}
                                  x2={toNode.x}
                                  y2={toNode.y}
                                  stroke={isActive ? "#0056D2" : "#E2E8F0"}
                                  strokeWidth={isActive ? "2.5" : "1.5"}
                                  className="transition-all duration-300 opacity-90"
                                />
                              );
                            })}
                          </svg>

                          {nodes.map(node => {
                            const isSelected = selectedNode === node.id;
                            return (
                              <button
                                key={node.id}
                                onClick={() => setSelectedNode(selectedNode === node.id ? null : node.id)}
                                style={{ left: `${node.x}%`, top: `${node.y}%` }}
                                className={`absolute h-5 w-5 sm:h-6 sm:w-6 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 transition-all duration-300 flex items-center justify-center text-[9px] sm:text-[10px] font-bold cursor-pointer ${isSelected
                                  ? "border-primary bg-primary text-white scale-110 shadow-md shadow-primary/25"
                                  : "border-slate-300 bg-white text-slate-700 hover:border-primary hover:text-primary"
                                  }`}
                              >
                                {isSelected && (
                                  <span className="absolute -inset-1 rounded-full border border-primary/30 animate-ping opacity-75"></span>
                                )}
                                {node.id}
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    </div>

                    <div className="rounded-xl border border-slate-100 bg-slate-50 p-3 sm:p-4 flex items-center justify-between transition-colors duration-300">
                      <div>
                        <span className="text-[9px] sm:text-[10px] text-slate-400 uppercase font-black block tracking-wider mb-1">
                          {selectedNode !== null ? 'Info Simpul' : 'Materi Saat Ini'}
                        </span>
                        <span className="text-xs font-bold text-slate-700">
                          {selectedNode !== null
                            ? `Simpul ${selectedNode} Terpilih`
                            : 'Definisi Teori Graf'}
                        </span>
                      </div>
                      <div className="text-right">
                        <span className="text-[9px] sm:text-[10px] text-slate-400 uppercase font-black block tracking-wider mb-1">
                          {selectedNode !== null ? 'Derajat (Degree)' : 'Status Kunci'}
                        </span>
                        <span className={`text-xs font-bold ${selectedNode !== null ? 'text-primary' : 'text-success'}`}>
                          {selectedNode !== null
                            ? `${nodes.find(n => n.id === selectedNode)?.deg ?? 2} Sisi`
                            : 'Terbuka'}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Right Column: Live Adjacency Matrix */}
                  <div className="rounded-xl border border-slate-100 bg-slate-50 p-3 sm:p-4 flex flex-col justify-between">
                    <div>
                      <div className="border-b border-slate-200/50 pb-2 mb-3 flex items-center justify-between">
                        <span className="text-xs font-bold text-slate-700">Matriks Ketetanggaan (Adjacency Matrix)</span>
                      </div>
                      <div className="font-mono text-[11px] sm:text-xs bg-slate-900 text-slate-300 p-2.5 sm:p-4 rounded-lg border border-slate-800">
                        <div className={`grid ${graphType === 'square' ? 'grid-cols-5' : 'grid-cols-4'} gap-1 sm:gap-2 text-center font-bold text-primary mb-1 border-b border-slate-800 pb-1`}>
                          <div></div>
                          <div>V1</div>
                          <div>V2</div>
                          <div>V3</div>
                          {graphType === 'square' && <div>V4</div>}
                        </div>
                        {nodes.map(rowNode => {
                          const isRowSelected = selectedNode === rowNode.id;
                          return (
                            <div key={rowNode.id} className={`grid ${graphType === 'square' ? 'grid-cols-5' : 'grid-cols-4'} gap-1 sm:gap-2 text-center items-center py-0.5 sm:py-1 rounded transition-colors duration-200 ${isRowSelected ? 'bg-primary/20 text-white font-bold' : ''}`}>
                              <div className="font-bold text-primary">V{rowNode.id}</div>
                              {nodes.map(colNode => {
                                const isConnected = edges.some(e =>
                                  (e.from === rowNode.id && e.to === colNode.id) ||
                                  (e.from === colNode.id && e.to === rowNode.id)
                                );
                                const value = isConnected ? 1 : 0;
                                const isCellSelected = selectedNode === rowNode.id || selectedNode === colNode.id;
                                return (
                                  <div key={colNode.id} className={`transition-colors duration-200 ${value === 1 ? 'text-success' : 'text-slate-500'} ${isCellSelected && isConnected && selectedNode !== null ? 'bg-primary/30 text-white font-bold rounded' : ''}`}>
                                    {value}
                                  </div>
                                );
                              })}
                            </div>
                          );
                        })}
                      </div>
                    </div>
                    <div className="mt-4 text-[10px] text-slate-400 font-medium leading-relaxed">
                      *Matriks diperbarui secara real-time berdasarkan struktur graf aktif dan simpul yang terpilih.
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

          </div>
        </section>

        {/* Stats Overlay Card */}
        <section className="relative">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="bg-white rounded-3xl border border-slate-100 p-6 sm:p-8 shadow-xl shadow-slate-100/50 grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 text-center backdrop-blur-md">
              <div className="pb-2 md:pb-0">
                <div className="text-3xl sm:text-4xl font-extrabold text-primary mb-1">
                  <AnimatedCounter to={3} />
                </div>
                <div className="text-[10px] sm:text-xs font-bold text-slate-400 uppercase tracking-widest">Topik Utama</div>
              </div>
              <div className="border-l border-slate-100 pb-2 md:pb-0">
                <div className="text-3xl sm:text-4xl font-extrabold text-primary mb-1">
                  <AnimatedCounter to={24} />
                </div>
                <div className="text-[10px] sm:text-xs font-bold text-slate-400 uppercase tracking-widest">Sub-Bab Pembelajaran</div>
              </div>
              <div className="border-t md:border-t-0 md:border-l border-slate-100 pt-4 md:pt-0">
                <div className="text-3xl sm:text-4xl font-extrabold text-primary mb-1">
                  <AnimatedCounter to={15} suffix="+" />
                </div>
                <div className="text-[10px] sm:text-xs font-bold text-slate-400 uppercase tracking-widest">Quiz Interaktif</div>
              </div>
              <div className="border-l border-t md:border-t-0 border-slate-100 pt-4 md:pt-0">
                <div className="text-3xl sm:text-4xl font-extrabold text-primary mb-1">
                  <AnimatedCounter to={100} suffix="%" />
                </div>
                <div className="text-[10px] sm:text-xs font-bold text-slate-400 uppercase tracking-widest">Simulasi Real-time</div>
              </div>
            </div>
          </div>
        </section>

        {/* Courses Section */}
        <section id="materi" className="py-24 bg-slate-50/50">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="text-3xl font-extrabold text-slate-900 mb-4 sm:text-4xl">Modul Pembelajaran</h2>
              <p className="text-base sm:text-lg text-slate-500">Materi disusun secara berurutan dan terstruktur agar logika matematika terbentuk dengan matang.</p>
            </div>

            <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
              {/* Course Card 1 */}
              <motion.div
                initial={{ opacity: 0, y: 40, scale: 0.97 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: false, amount: 0.12 }}
                transition={{ type: "spring", stiffness: 60, damping: 14, mass: 1, delay: 0 }}
                className="group flex flex-col rounded-2xl border border-slate-200/60 bg-white overflow-hidden shadow-xs hover:shadow-xl hover:shadow-primary/5 hover:border-primary/20 hover:-translate-y-1 transition-all duration-300 will-change-transform"
              >
                <div className="h-40 bg-slate-50 flex items-center justify-center border-b border-slate-100 p-6">
                  <Binary className="h-16 w-16 text-primary/80 group-hover:scale-110 transition-transform duration-300" />
                </div>
                <div className="flex flex-1 flex-col p-6">
                  <div className="mb-4 flex items-center justify-between">
                    <span className="px-2.5 py-0.5 bg-blue-50 text-primary text-[10px] font-bold rounded-full uppercase tracking-wide">Boolean Algebra</span>
                    <span className="px-2.5 py-0.5 bg-slate-100 text-slate-500 text-[10px] font-bold rounded-full uppercase tracking-wide">Modul 1</span>
                  </div>
                  <h3 className="text-lg font-bold text-slate-800 mb-2">Aljabar Boolean</h3>
                  <p className="text-sm text-slate-500 mb-6 flex-1 leading-relaxed">
                    Pelajari dasar-dasar logika digital, operator biner, hukum aljabar, minterm & maxterm, gerbang logika, serta penyederhanaan K-Map.
                  </p>
                  <div className="mb-4 flex items-center gap-2 text-xs text-slate-400 font-semibold">
                    <BookOpen className="h-4 w-4" /> 8 Sub-Bab • Interaktif
                  </div>
                  <div className="mb-6">
                    <div className="flex items-center justify-between text-xs mb-1.5 font-bold">
                      <span className="text-slate-400">Progress</span>
                      <span className="text-success">Terkunci (Kecuali Bab 1)</span>
                    </div>
                    <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                      <div className="h-full bg-primary w-[4%]"></div>
                    </div>
                  </div>
                  <Button asChild className="w-full bg-primary hover:bg-[#004BB5] text-white font-bold h-11 rounded-xl transition-all cursor-pointer">
                    <Link to="/dashboard">Pelajari Modul</Link>
                  </Button>
                </div>
              </motion.div>

              {/* Course Card 2 */}
              <motion.div
                initial={{ opacity: 0, y: 40, scale: 0.97 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: false, amount: 0.12 }}
                transition={{ type: "spring", stiffness: 60, damping: 14, mass: 1, delay: 0.08 }}
                className="group flex flex-col rounded-2xl border border-slate-200/60 bg-white overflow-hidden shadow-xs hover:shadow-xl hover:shadow-primary/5 hover:border-primary/20 hover:-translate-y-1 transition-all duration-300 will-change-transform"
              >
                <div className="h-40 bg-slate-50 flex items-center justify-center border-b border-slate-100 p-6">
                  <BarChart className="h-16 w-16 text-primary/80 group-hover:scale-110 transition-transform duration-300" />
                </div>
                <div className="flex flex-1 flex-col p-6">
                  <div className="mb-4 flex items-center justify-between">
                    <span className="px-2.5 py-0.5 bg-blue-50 text-primary text-[10px] font-bold rounded-full uppercase tracking-wide">Combinatorics</span>
                    <span className="px-2.5 py-0.5 bg-slate-100 text-slate-500 text-[10px] font-bold rounded-full uppercase tracking-wide">Modul 2</span>
                  </div>
                  <h3 className="text-lg font-bold text-slate-800 mb-2">Peluang & Kombinatorika</h3>
                  <p className="text-sm text-slate-500 mb-6 flex-1 leading-relaxed">
                    Memahami aturan pengisian tempat, kaidah pencacahan, permutasi siklis & pengulangan, kombinasi, dan visualisator matematis.
                  </p>
                  <div className="mb-4 flex items-center gap-2 text-xs text-slate-400 font-semibold">
                    <BookOpen className="h-4 w-4" /> 8 Sub-Bab • Interaktif
                  </div>
                  <div className="mb-6">
                    <div className="flex items-center justify-between text-xs mb-1.5 font-bold">
                      <span className="text-slate-400">Progress</span>
                      <span className="text-slate-400">Terkunci</span>
                    </div>
                    <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                      <div className="h-full bg-slate-200 w-0"></div>
                    </div>
                  </div>
                  <Button asChild className="w-full bg-slate-200 hover:bg-slate-300 text-slate-500 font-bold h-11 rounded-xl transition-all cursor-pointer">
                    <Link to="/dashboard">Pelajari Modul</Link>
                  </Button>
                </div>
              </motion.div>

              {/* Course Card 3 */}
              <motion.div
                initial={{ opacity: 0, y: 40, scale: 0.97 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: false, amount: 0.12 }}
                transition={{ type: "spring", stiffness: 60, damping: 14, mass: 1, delay: 0.16 }}
                className="group flex flex-col rounded-2xl border border-slate-200/60 bg-white overflow-hidden shadow-xs hover:shadow-xl hover:shadow-primary/5 hover:border-primary/20 hover:-translate-y-1 transition-all duration-300 will-change-transform"
              >
                <div className="h-40 bg-slate-50 flex items-center justify-center border-b border-slate-100 p-6">
                  <Network className="h-16 w-16 text-primary/80 group-hover:scale-110 transition-transform duration-300" />
                </div>
                <div className="flex flex-1 flex-col p-6">
                  <div className="mb-4 flex items-center justify-between">
                    <span className="px-2.5 py-0.5 bg-blue-50 text-primary text-[10px] font-bold rounded-full uppercase tracking-wide">Graph Theory</span>
                    <span className="px-2.5 py-0.5 bg-slate-100 text-slate-500 text-[10px] font-bold rounded-full uppercase tracking-wide">Modul 3</span>
                  </div>
                  <h3 className="text-lg font-bold text-slate-800 mb-2">Teori Graf</h3>
                  <p className="text-sm text-slate-500 mb-6 flex-1 leading-relaxed">
                    Eksplorasi representasi simpul & sisi, matriks ketetanggaan, graf planar, euler formula, graf dual, hingga pencarian jalur terpendek.
                  </p>
                  <div className="mb-4 flex items-center gap-2 text-xs text-slate-400 font-semibold">
                    <BookOpen className="h-4 w-4" /> 8 Sub-Bab • Interaktif
                  </div>
                  <div className="mb-6">
                    <div className="flex items-center justify-between text-xs mb-1.5 font-bold">
                      <span className="text-slate-400">Progress</span>
                      <span className="text-slate-400">Terkunci</span>
                    </div>
                    <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                      <div className="h-full bg-slate-200 w-0"></div>
                    </div>
                  </div>
                  <Button asChild className="w-full bg-slate-200 hover:bg-slate-300 text-slate-500 font-bold h-11 rounded-xl transition-all cursor-pointer">
                    <Link to="/dashboard">Pelajari Modul</Link>
                  </Button>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Features & Steps */}
        <section id="fitur" className="py-24 bg-white border-t border-slate-100">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <motion.div
                initial={{ opacity: 0, x: -40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: false, amount: 0.12 }}
                transition={{ type: "spring", stiffness: 50, damping: 15 }}
                className="will-change-transform"
              >
                <h2 className="text-3xl font-extrabold text-slate-900 mb-6 sm:text-4xl text-center lg:text-left">Mengapa Memilih AxiomMath?</h2>
                <p className="text-slate-500 mb-8 leading-relaxed text-center lg:text-left mx-auto lg:mx-0 max-w-xl">Platform kami dirancang khusus agar Anda tidak sekadar membaca teori, melainkan berinteraksi secara visual untuk melatih pemahaman logika secara riil.</p>
                <div className="space-y-6">
                  {[
                    { title: "Kunci Materi Berurutan", desc: "Sistem lock-unlock otomatis memastikan Anda menguasai topik dasar sebelum masuk ke topik lanjutan." },
                    { title: "Simulasi Alat Peraga Visual", desc: "Interaksi dinamis pada gerbang logika dan pembuatan sisi graf langsung dari adjacency matrix." },
                    { title: "Quiz Mini Cepat", desc: "Latihan soal terintegrasi per sub-bab dengan umpan balik benar/salah yang instan." },
                    { title: "Modern & Bersih", desc: "Antarmuka tanpa distraksi dengan skema warna yang memanjakan mata." }
                  ].map((feature, i) => (
                    <div key={i} className="flex gap-4">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-50 border border-blue-100 text-primary">
                        <CheckCircle className="h-5 w-5" />
                      </div>
                      <div>
                        <h4 className="font-bold text-slate-800 text-base mb-1">{feature.title}</h4>
                        <p className="text-sm text-slate-500 leading-relaxed">{feature.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: false, amount: 0.12 }}
                transition={{ type: "spring", stiffness: 50, damping: 15 }}
                className="rounded-3xl border border-slate-100 bg-slate-50 p-8 lg:p-12 shadow-xs will-change-transform"
              >
                <h3 className="text-2xl font-bold text-slate-800 mb-8">Alur Belajar 4 Langkah</h3>
                <div className="relative border-l-2 border-slate-200 ml-4 space-y-8 pb-4">
                  {[
                    { step: 1, title: "Pilih Materi yang Terbuka", desc: "Mulai dari materi pembuka Aljabar Boolean." },
                    { step: 2, title: "Interaksi & Simulasi", desc: "Pelajari materi melalui visualisator dinamis di halaman." },
                    { step: 3, title: "Evaluasi dengan Quiz", desc: "Uji pemahaman Anda melalui kuis kustom instan." },
                    { step: 4, title: "Materi Baru Terbuka", desc: "Sub-bab selanjutnya akan ter-unlock otomatis di sidebar." }
                  ].map((item, i) => (
                    <div key={i} className="relative pl-8">
                      <div className="absolute -left-[17px] top-0 flex h-8 w-8 items-center justify-center rounded-full bg-white border-2 border-primary text-xs font-bold text-primary shadow-xs">
                        {item.step}
                      </div>
                      <h4 className="text-base font-bold text-slate-800 mb-1">{item.title}</h4>
                      <p className="text-sm text-slate-500 leading-relaxed">{item.desc}</p>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </section>

      </main>

      <Footer />
    </div>
  );
}
