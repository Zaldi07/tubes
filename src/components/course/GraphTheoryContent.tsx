import React, { useState, useEffect, useRef } from 'react';
import { 
  Breadcrumb, 
  ContentSection, 
  CourseHeader, 
  FormulaBox, 
  LearningObjectives, 
  LessonNavigation, 
  QuizCard,
  MediaPlayerBase,
  MultiQuestionQuiz,
  ExampleBox
} from './CourseComponents';

function AdjacencyMatrixVisualizer() {
  const [matrix, setMatrix] = useState<number[][]>([
    [0, 1, 0, 1],
    [1, 0, 1, 0],
    [0, 1, 0, 1],
    [1, 0, 1, 0]
  ]);

  const toggleEdge = (row: number, col: number) => {
    if (row === col) return;
    const newMatrix = matrix.map((r, rIdx) => 
      r.map((val, cIdx) => {
        if ((rIdx === row && cIdx === col) || (rIdx === col && cIdx === row)) {
          return val === 1 ? 0 : 1;
        }
        return val;
      })
    );
    setMatrix(newMatrix);
  };

  const nodes = [
    { id: 1, label: '1', x: 25, y: 25 },
    { id: 2, label: '2', x: 75, y: 25 },
    { id: 3, label: '3', x: 75, y: 75 },
    { id: 4, label: '4', x: 25, y: 75 }
  ];

  return (
    <div className="rounded-2xl border border-border-main bg-white p-6 sm:p-8 shadow-sm my-8 w-full">
      <div className="flex justify-between items-center mb-6 border-b border-border-main pb-4">
        <div>
          <h4 className="font-bold text-text-main text-base">Simulator Matriks Ketetanggaan Interaktif</h4>
          <p className="text-xs text-text-secondary">Ubah nilai 0/1 di tabel matriks ketetanggaan dan amati pembentukan garis sisi graf secara langsung.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        <div className="flex flex-col">
          <span className="text-xs font-bold text-text-secondary uppercase mb-4 tracking-wider text-center md:text-left">
            Tabel Adjacency Matrix (4x4)
          </span>
          <div className="overflow-hidden rounded-xl border border-border-main max-w-xs mx-auto md:mx-0 bg-slate-50 p-3 shadow-xs">
            <div className="grid grid-cols-5 gap-1.5 text-center font-mono text-xs">
              <div className="font-bold text-text-secondary h-8 flex items-center justify-center">V</div>
              <div className="font-bold text-text-secondary h-8 flex items-center justify-center">1</div>
              <div className="font-bold text-text-secondary h-8 flex items-center justify-center">2</div>
              <div className="font-bold text-text-secondary h-8 flex items-center justify-center">3</div>
              <div className="font-bold text-text-secondary h-8 flex items-center justify-center">4</div>

              {matrix.map((rowArr, rIdx) => (
                <React.Fragment key={rIdx}>
                  <div className="font-bold text-text-secondary h-8 flex items-center justify-center">
                    {rIdx + 1}
                  </div>
                  {rowArr.map((val, cIdx) => {
                    const isSelf = rIdx === cIdx;
                    return (
                      <button
                        key={cIdx}
                        onClick={() => toggleEdge(rIdx, cIdx)}
                        disabled={isSelf}
                        className={`h-8 rounded-lg font-bold border transition-all cursor-pointer ${
                          isSelf
                            ? 'bg-slate-100 border-slate-200 text-slate-400 cursor-not-allowed'
                            : val === 1
                            ? 'bg-primary text-white border-primary shadow-xs'
                            : 'bg-white border-border-main text-text-secondary hover:bg-slate-100'
                        }`}
                      >
                        {val}
                      </button>
                    );
                  })}
                </React.Fragment>
              ))}
            </div>
          </div>
          <p className="text-[10px] text-text-secondary mt-3 italic text-center md:text-left">
            * Klik sel (misal baris 1, kolom 2) untuk menyambung/memutus hubungan simpul 1 & 2. Sel diagonal (1-1, 2-2, dst) dinonaktifkan untuk menghindari loop mandiri.
          </p>
        </div>

        <div className="flex flex-col items-center">
          <span className="text-xs font-bold text-text-secondary uppercase mb-4 tracking-wider">
            Visualisasi Graf Terbentuk
          </span>
          <div className="relative h-[220px] w-full max-w-[280px] bg-slate-50 rounded-2xl border border-border-main overflow-hidden shadow-xs">
            <svg className="absolute inset-0 w-full h-full">
              {matrix.map((rowArr, rIdx) =>
                rowArr.map((val, cIdx) => {
                  if (val === 1 && rIdx < cIdx) {
                    const n1 = nodes[rIdx];
                    const n2 = nodes[cIdx];
                    return (
                      <line
                        key={`${rIdx}-${cIdx}`}
                        x1={`${n1.x}%`}
                        y1={`${n1.y}%`}
                        x2={`${n2.x}%`}
                        y2={`${n2.y}%`}
                        stroke="#0056D2"
                        strokeWidth="3"
                        className="stroke-primary/70"
                      />
                    );
                  }
                  return null;
                })
              )}
            </svg>

            {nodes.map((node) => (
              <div
                key={node.id}
                className="absolute h-9 w-9 -ml-4.5 -mt-4.5 bg-white border-2 border-primary rounded-full shadow-md flex items-center justify-center font-bold text-sm text-primary z-10 transition-all duration-300"
                style={{ left: `${node.x}%`, top: `${node.y}%` }}
              >
                {node.label}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

interface ContentProps {
  lessonId: string;
  completedLessons: string[];
  onCompleteLesson: (id: string) => void;
}

interface GraphNode {
  id: number;
  x: number;
  y: number;
}

interface GraphEdge {
  from: number;
  to: number;
}

function InteractiveGraph() {
  const [nodes, setNodes] = useState<GraphNode[]>([
    { id: 1, x: 30, y: 30 },
    { id: 2, x: 70, y: 30 },
    { id: 3, x: 50, y: 70 },
  ]);

  const [edges, setEdges] = useState<GraphEdge[]>([
    { from: 1, to: 2 },
    { from: 2, to: 3 },
    { from: 3, to: 1 },
  ]);

  const [selectedNodeId, setSelectedNodeId] = useState<number | null>(null);
  const [draggingNodeId, setDraggingNodeId] = useState<number | null>(null);

  const containerRef = useRef<HTMLDivElement>(null);
  const dragStartPos = useRef({ x: 0, y: 0 });
  const hasDragged = useRef(false);

  // Apply Preset
  const applyPreset = (presetName: string) => {
    setSelectedNodeId(null);
    switch (presetName) {
      case 'triangle':
        setNodes([
          { id: 1, x: 30, y: 30 },
          { id: 2, x: 70, y: 30 },
          { id: 3, x: 50, y: 70 },
        ]);
        setEdges([
          { from: 1, to: 2 },
          { from: 2, to: 3 },
          { from: 3, to: 1 },
        ]);
        break;
      case 'cycle':
        setNodes([
          { id: 1, x: 50, y: 15 },
          { id: 2, x: 82, y: 38 },
          { id: 3, x: 70, y: 76 },
          { id: 4, x: 30, y: 76 },
          { id: 5, x: 18, y: 38 },
        ]);
        setEdges([
          { from: 1, to: 2 },
          { from: 2, to: 3 },
          { from: 3, to: 4 },
          { from: 4, to: 5 },
          { from: 5, to: 1 },
        ]);
        break;
      case 'complete':
        setNodes([
          { id: 1, x: 50, y: 15 },
          { id: 2, x: 82, y: 38 },
          { id: 3, x: 70, y: 76 },
          { id: 4, x: 30, y: 76 },
          { id: 5, x: 18, y: 38 },
        ]);
        setEdges([
          { from: 1, to: 2 }, { from: 1, to: 3 }, { from: 1, to: 4 }, { from: 1, to: 5 },
          { from: 2, to: 3 }, { from: 2, to: 4 }, { from: 2, to: 5 },
          { from: 3, to: 4 }, { from: 3, to: 5 },
          { from: 4, to: 5 },
        ]);
        break;
      case 'star':
        setNodes([
          { id: 1, x: 50, y: 50 }, // center
          { id: 2, x: 50, y: 15 },
          { id: 3, x: 82, y: 35 },
          { id: 4, x: 70, y: 78 },
          { id: 5, x: 30, y: 78 },
          { id: 6, x: 18, y: 35 },
        ]);
        setEdges([
          { from: 1, to: 2 },
          { from: 1, to: 3 },
          { from: 1, to: 4 },
          { from: 1, to: 5 },
          { from: 1, to: 6 },
        ]);
        break;
      case 'tree':
        setNodes([
          { id: 1, x: 50, y: 15 }, // root
          { id: 2, x: 30, y: 45 }, // left
          { id: 3, x: 70, y: 45 }, // right
          { id: 4, x: 15, y: 75 }, // left-left
          { id: 5, x: 45, y: 75 }, // left-right
          { id: 6, x: 55, y: 75 }, // right-left
          { id: 7, x: 85, y: 75 }, // right-right
        ]);
        setEdges([
          { from: 1, to: 2 },
          { from: 1, to: 3 },
          { from: 2, to: 4 },
          { from: 2, to: 5 },
          { from: 3, to: 6 },
          { from: 3, to: 7 },
        ]);
        break;
      case 'empty':
        setNodes([
          { id: 1, x: 30, y: 30 },
          { id: 2, x: 70, y: 30 },
          { id: 3, x: 50, y: 70 },
        ]);
        setEdges([]);
        break;
      default:
        break;
    }
  };

  // Drag-and-Drop Handlers
  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (draggingNodeId === null || !containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    
    let newX = ((e.clientX - rect.left) / rect.width) * 100;
    let newY = ((e.clientY - rect.top) / rect.height) * 100;
    
    newX = Math.max(5, Math.min(95, newX));
    newY = Math.max(5, Math.min(95, newY));
    
    setNodes(prev => prev.map(n => n.id === draggingNodeId ? { ...n, x: newX, y: newY } : n));
    
    const dist = Math.hypot(e.clientX - dragStartPos.current.x, e.clientY - dragStartPos.current.y);
    if (dist > 5) {
      hasDragged.current = true;
    }
  };

  const handlePointerUp = () => {
    setDraggingNodeId(null);
  };

  const handleNodePointerDown = (e: React.PointerEvent, id: number) => {
    e.stopPropagation();
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
    setDraggingNodeId(id);
    dragStartPos.current = { x: e.clientX, y: e.clientY };
    hasDragged.current = false;
  };

  const handleNodePointerUp = (e: React.PointerEvent, id: number) => {
    e.stopPropagation();
    (e.target as HTMLElement).releasePointerCapture(e.pointerId);
    setDraggingNodeId(null);
    
    if (!hasDragged.current) {
      handleNodeClick(id);
    }
  };

  const handleNodeClick = (id: number) => {
    if (selectedNodeId === null) {
      setSelectedNodeId(id);
    } else if (selectedNodeId === id) {
      setSelectedNodeId(null);
    } else {
      toggleEdge(selectedNodeId, id);
      setSelectedNodeId(null);
    }
  };

  const toggleEdge = (n1: number, n2: number) => {
    const from = Math.min(n1, n2);
    const to = Math.max(n1, n2);
    
    const edgeExists = edges.some(e => e.from === from && e.to === to);
    if (edgeExists) {
      setEdges(prev => prev.filter(e => !(e.from === from && e.to === to)));
    } else {
      setEdges(prev => [...prev, { from, to }]);
    }
  };

  const addNode = () => {
    if (nodes.length >= 8) return;
    const newId = nodes.length + 1;
    const newX = 20 + Math.random() * 60;
    const newY = 20 + Math.random() * 60;
    setNodes(prev => [...prev, { id: newId, x: newX, y: newY }]);
  };

  const deleteSelectedNode = () => {
    if (selectedNodeId === null || nodes.length <= 1) return;
    const id = selectedNodeId;
    
    const updatedNodes = nodes.filter(n => n.id !== id);
    const idMap: { [key: number]: number } = {};
    const reindexedNodes = updatedNodes.map((node, index) => {
      const newId = index + 1;
      idMap[node.id] = newId;
      return { ...node, id: newId };
    });

    const updatedEdges: GraphEdge[] = [];
    edges.forEach(edge => {
      if (edge.from !== id && edge.to !== id) {
        updatedEdges.push({
          from: idMap[edge.from],
          to: idMap[edge.to]
        });
      }
    });

    setNodes(reindexedNodes);
    setEdges(updatedEdges);
    setSelectedNodeId(null);
  };

  const clearEdges = () => {
    setEdges([]);
    setSelectedNodeId(null);
  };

  // Connectivity test (BFS)
  const getConnectivityStatus = () => {
    if (nodes.length === 0) return true;
    const adj: { [key: number]: number[] } = {};
    nodes.forEach(n => { adj[n.id] = []; });
    
    edges.forEach(edge => {
      if (adj[edge.from] && adj[edge.to]) {
        adj[edge.from].push(edge.to);
        adj[edge.to].push(edge.from);
      }
    });

    const visited = new Set<number>();
    const startNode = nodes[0].id;
    const queue = [startNode];
    visited.add(startNode);

    while (queue.length > 0) {
      const curr = queue.shift()!;
      const neighbors = adj[curr] || [];
      for (const neighbor of neighbors) {
        if (!visited.has(neighbor)) {
          visited.add(neighbor);
          queue.push(neighbor);
        }
      }
    }

    return visited.size === nodes.length;
  };

  const isGraphConnected = getConnectivityStatus();

  // Degree details
  const getDegreeOfNode = (id: number) => {
    return edges.filter(e => e.from === id || e.to === id).length;
  };

  const totalDegrees = edges.length * 2;
  const degreeSequenceStr = nodes.map(n => `d(${n.id})=${getDegreeOfNode(n.id)}`).join(', ');

  return (
    <div className="rounded-2xl border border-border-main bg-white p-5 sm:p-7 shadow-sm my-8 w-full max-w-full overflow-hidden">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-5 border-b border-border-main pb-4 gap-3">
        <div>
          <h4 className="font-bold text-text-main text-base">Simulasi Graf Dinamis Interaktif</h4>
          <p className="text-xs text-text-secondary mt-1">Buat graf secara dinamis. Seret simpul, klik simpul untuk menghubungkan sisi, dan amati propertinya.</p>
        </div>
        <button
          onClick={() => applyPreset('triangle')}
          className="text-xs bg-slate-100 hover:bg-slate-200 text-text-main px-3 py-1.5 rounded-lg font-semibold transition-colors self-start sm:self-center cursor-pointer"
        >
          Reset Graf
        </button>
      </div>

      {/* Info Banner & Instruction */}
      <div className="mb-4 text-xs font-medium px-4 py-2.5 rounded-xl bg-blue-50 border border-blue-100 text-primary flex items-center justify-between min-h-[38px]">
        <span>
          {selectedNodeId === null 
            ? "💡 Petunjuk: Seret simpul untuk memindahkan posisi. Klik simpul untuk mulai menyambungkan sisi."
            : `🔗 Mode Penghubung: Pilih simpul lain untuk membuat/memutus sisi dari simpul ${selectedNodeId}. Klik simpul ${selectedNodeId} untuk membatalkan.`}
        </span>
        {selectedNodeId !== null && (
          <button 
            onClick={() => setSelectedNodeId(null)}
            className="text-[10px] bg-white border border-blue-200 px-2 py-0.5 rounded text-primary hover:bg-blue-100 cursor-pointer font-bold"
          >
            Batal
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        {/* Interactive Canvas */}
        <div className="lg:col-span-8 flex flex-col">
          <div 
            ref={containerRef}
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerUp}
            onPointerLeave={handlePointerUp}
            className="relative h-[280px] sm:h-[350px] w-full bg-slate-50 rounded-2xl border border-border-main overflow-hidden shadow-xs cursor-crosshair select-none touch-none"
          >
            <svg className="absolute inset-0 w-full h-full">
              {/* Draw Edges */}
              {edges.map((edge, i) => {
                const n1 = nodes.find(n => n.id === edge.from);
                const n2 = nodes.find(n => n.id === edge.to);
                if (!n1 || !n2) return null;
                const isHighlighted = selectedNodeId === edge.from || selectedNodeId === edge.to;
                return (
                  <line 
                    key={`e-${edge.from}-${edge.to}-${i}`}
                    x1={`${n1.x}%`} y1={`${n1.y}%`}
                    x2={`${n2.x}%`} y2={`${n2.y}%`}
                    stroke="#0056D2"
                    strokeWidth={isHighlighted ? "3" : "2"}
                    className={`transition-all ${isHighlighted ? "stroke-primary opacity-90 animate-pulse" : "stroke-primary/45"}`}
                  />
                );
              })}
            </svg>

            {/* Draw Nodes */}
            {nodes.map(node => {
              const isSelected = selectedNodeId === node.id;
              const isDragging = draggingNodeId === node.id;
              return (
                <div 
                  key={node.id}
                  onPointerDown={(e) => handleNodePointerDown(e, node.id)}
                  onPointerUp={(e) => handleNodePointerUp(e, node.id)}
                  className={`absolute h-9 w-9 -ml-4.5 -mt-4.5 bg-white border-2 rounded-full shadow-md flex items-center justify-center font-bold text-xs select-none cursor-grab active:cursor-grabbing transition-shadow z-10 ${
                    isSelected 
                      ? 'border-primary ring-4 ring-primary/20 bg-blue-50 text-primary scale-110 shadow-lg' 
                      : 'border-primary text-primary hover:scale-105'
                  } ${isDragging ? 'shadow-lg scale-115' : ''}`}
                  style={{ left: `${node.x}%`, top: `${node.y}%` }}
                >
                  {node.id}
                </div>
              );
            })}
          </div>
        </div>

        {/* Toolbar & Stats Panel */}
        <div className="lg:col-span-4 flex flex-col gap-5 justify-between">
          {/* Controls */}
          <div className="flex flex-col gap-4">
            <div>
              <span className="text-[10px] font-bold text-text-secondary uppercase tracking-wider block mb-2">Preset Graf</span>
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => applyPreset('cycle')}
                  className="px-2.5 py-2 text-xs bg-slate-50 hover:bg-slate-100 text-text-main border border-border-main rounded-lg font-medium transition-colors cursor-pointer text-left flex items-center gap-1.5"
                >
                  ⭕ Siklus (C₅)
                </button>
                <button
                  onClick={() => applyPreset('complete')}
                  className="px-2.5 py-2 text-xs bg-slate-50 hover:bg-slate-100 text-text-main border border-border-main rounded-lg font-medium transition-colors cursor-pointer text-left flex items-center gap-1.5"
                >
                  🕸️ Lengkap (K₅)
                </button>
                <button
                  onClick={() => applyPreset('star')}
                  className="px-2.5 py-2 text-xs bg-slate-50 hover:bg-slate-100 text-text-main border border-border-main rounded-lg font-medium transition-colors cursor-pointer text-left flex items-center gap-1.5"
                >
                  ⭐ Bintang (S₆)
                </button>
                <button
                  onClick={() => applyPreset('tree')}
                  className="px-2.5 py-2 text-xs bg-slate-50 hover:bg-slate-100 text-text-main border border-border-main rounded-lg font-medium transition-colors cursor-pointer text-left flex items-center gap-1.5"
                >
                  🌳 Pohon Biner
                </button>
              </div>
            </div>

            <div>
              <span className="text-[10px] font-bold text-text-secondary uppercase tracking-wider block mb-2">Manipulasi Graf</span>
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={addNode}
                  disabled={nodes.length >= 8}
                  className={`flex-1 min-w-[110px] px-3 py-2 text-xs rounded-lg font-bold transition-all border cursor-pointer ${
                    nodes.length >= 8
                      ? 'bg-slate-50 border-slate-200 text-slate-400 cursor-not-allowed'
                      : 'bg-primary text-white border-primary hover:bg-blue-700 hover:shadow-xs'
                  }`}
                >
                  ➕ Tambah Simpul ({nodes.length}/8)
                </button>
                <button
                  onClick={deleteSelectedNode}
                  disabled={selectedNodeId === null || nodes.length <= 1}
                  className={`flex-1 min-w-[110px] px-3 py-2 text-xs rounded-lg font-bold transition-all border cursor-pointer ${
                    (selectedNodeId === null || nodes.length <= 1)
                      ? 'bg-slate-50 border-slate-200 text-slate-400 cursor-not-allowed'
                      : 'bg-red-50 border-red-200 text-red-600 hover:bg-red-100'
                  }`}
                >
                  🗑️ Hapus Simpul
                </button>
                <button
                  onClick={clearEdges}
                  disabled={edges.length === 0}
                  className={`w-full px-3 py-2 text-xs rounded-lg font-bold transition-all border cursor-pointer ${
                    edges.length === 0
                      ? 'bg-slate-50 border-slate-200 text-slate-400 cursor-not-allowed'
                      : 'bg-white border-border-main text-text-secondary hover:bg-slate-50'
                  }`}
                >
                  🧹 Bersihkan Semua Sisi
                </button>
              </div>
            </div>
          </div>

          {/* Stats Card */}
          <div className="border border-border-main bg-slate-50 rounded-2xl p-4.5 flex flex-col gap-3.5">
            <span className="text-[10px] font-bold text-text-secondary uppercase tracking-wider block border-b border-border-main/50 pb-1.5">Statistik Graf</span>
            
            <div className="grid grid-cols-2 gap-3.5">
              <div className="bg-white border border-border-main rounded-xl p-2.5 shadow-2xs">
                <div className="text-[10px] font-bold text-text-secondary">Simpul (V)</div>
                <div className="text-xl font-extrabold text-primary mt-0.5">{nodes.length}</div>
              </div>
              <div className="bg-white border border-border-main rounded-xl p-2.5 shadow-2xs">
                <div className="text-[10px] font-bold text-text-secondary">Sisi (E)</div>
                <div className="text-xl font-extrabold text-primary mt-0.5">{edges.length}</div>
              </div>
            </div>

            <div className="flex items-center justify-between text-xs bg-white border border-border-main rounded-xl p-3 shadow-2xs">
              <span className="font-bold text-text-secondary">Status:</span>
              <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                isGraphConnected 
                  ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' 
                  : 'bg-amber-50 text-amber-700 border border-amber-200'
              }`}>
                {isGraphConnected ? 'Terhubung' : 'Terputus'}
              </span>
            </div>

            {/* Handshaking Lemma Info */}
            <div className="bg-white border border-border-main rounded-xl p-3 shadow-2xs text-xs flex flex-col gap-1.5">
              <div className="font-bold text-text-main flex items-center justify-between">
                <span>Handshaking Lemma</span>
                <span className="font-mono text-primary bg-slate-50 border border-slate-100 px-1.5 py-0.5 rounded text-[10px]">
                  ∑ d(v) = 2|E|
                </span>
              </div>
              <div className="text-text-secondary text-[11px] leading-relaxed">
                Jumlah derajat: <span className="font-bold text-primary font-mono">{totalDegrees}</span>
              </div>
              {nodes.length > 0 && (
                <div className="text-[10px] text-text-secondary italic border-t border-slate-100 pt-1.5 break-words max-h-[44px] overflow-y-auto font-mono leading-tight">
                  {degreeSequenceStr}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function GraphTheoryContent({ lessonId, completedLessons, onCompleteLesson }: ContentProps) {
  const [quizState, setQuizState] = useState<'idle' | 'started' | 'finished'>('idle');

  useEffect(() => {
    setQuizState('idle');
  }, [lessonId]);

  const renderLesson = () => {
    switch (lessonId) {
      case 'g1':
        return (
          <>
            <CourseHeader 
              title="Pengantar Teori Graf"
              subtitle="Mengenal konsep dasar simpul (vertex) dan sisi (edge) yang mendasari pemodelan jaringan."
              level="Lanjut"
              time="Estimasi: 12 menit"
            />
            <MediaPlayerBase videoId="7x6dc4G-mkY" title="Video: Pengantar Teori Graf (Definisi & Konsep)" />
            <LearningObjectives objectives={[
              "Mendefinisikan graf G = (V, E) secara matematis.",
              "Memahami perbedaan simpul (Vertex) dan sisi (Edge) serta derajat simpul.",
              "Menggunakan simulator graf dinamis untuk memvisualisasikan node terhubung."
            ]} />
            <ContentSection title="Dekomposisi Graf">
              <p className="mb-4 text-text-secondary leading-relaxed">
                Secara matematis, Graf (<i>G</i>) didefinisikan sebagai pasangan himpunan (<i>V</i>, <i>E</i>), ditulis sebagai <i>G</i> = (<i>V</i>, <i>E</i>), di mana <i>V</i> adalah himpunan tidak kosong dari **simpul-simpul (vertices / nodes)** dan <i>E</i> adalah himpunan **sisi-sisi (edges / arcs)** yang menghubungkan sepasang simpul di <i>V</i>.
              </p>
              <p className="mb-4 text-text-secondary leading-relaxed">
                Derajat suatu simpul <i>v</i>, ditulis <i>d</i>(<i>v</i>), adalah jumlah sisi yang bersisian dengan simpul tersebut. Menurut **Lemma Jabat Tangan (Handshaking Lemma)**, jumlah total derajat dari seluruh simpul pada suatu graf selalu bernilai genap, yaitu dua kali jumlah sisi:
                <br /><code className="block mt-2 p-2 bg-slate-50 border border-slate-100 font-mono text-primary text-center">∑ d(v) = 2 |E|</code>
              </p>
              <InteractiveGraph />
              <ExampleBox>
                <p className="font-semibold text-text-main mb-2">Contoh Sederhana Graf Bertetangga</p>
                <p className="text-text-secondary leading-relaxed">
                  Jika kita memiliki graf <i>G</i> dengan <i>V</i> = {"{1, 2, 3}"} dan <i>E</i> = {"{(1,2), (2,3), (3,1)}"}, maka graf ini berbentuk segitiga. Setiap simpul terhubung dengan 2 simpul lainnya, sehingga derajat masing-masing simpul adalah 2. 
                  <br />Jumlah total derajat simpul: 2 + 2 + 2 = 6. 
                  <br />Jumlah total sisi: |<i>E</i>| = 3. 
                  <br />Sesuai dengan Handshaking Lemma: 6 = 2 × 3.
                </p>
              </ExampleBox>
            </ContentSection>
          </>
        );

      case 'g2':
        return (
          <>
            <CourseHeader 
              title="Graf Isomorfik & Syaratnya"
              subtitle="Mengidentifikasi graf dengan struktur logika identik namun digambar berbeda."
              level="Lanjut"
              time="Estimasi: 15 menit"
            />
            <LearningObjectives objectives={[
              "Mendefinisikan graf isomorfik secara visual dan matematis.",
              "Mengidentifikasi syarat-syarat dua buah graf dikatakan isomorfik (jumlah V, E, dan derajat)."
            ]} />
            <ContentSection title="Definisi Isomorfik">
              <p className="mb-4 text-text-secondary leading-relaxed">
                Dua buah graf <i>G</i>₁ dan <i>G</i>₂ dikatakan <strong>isomorfik</strong> jika terdapat korespondensi satu-satu antara simpul-simpul keduanya dan antara sisi-sisi keduanya sedemikian rupa sehingga hubungan kebersisian tetap dipertahankan. Secara visual, bentuk gambarnya bisa tampak sangat berbeda (misal yang satu digambar sebagai persegi dengan diagonal bersilang, dan yang lain digambar sebagai pentagram), namun secara struktural/topologi kedua graf tersebut identik.
              </p>
              <p className="mb-4 text-text-secondary leading-relaxed">
                **Syarat Perlu (Necessary Conditions) Graf Isomorfik:**
              </p>
              <ul className="list-disc pl-6 space-y-2 text-text-secondary mb-6 leading-relaxed">
                <li>Mempunyai jumlah simpul yang sama (|<i>V</i>₁| = |<i>V</i>₂|).</li>
                <li>Mempunyai jumlah sisi yang sama (|<i>E</i>₁| = |<i>E</i>₂|).</li>
                <li>Mempunyai barisan derajat simpul yang sama (degree sequence).</li>
              </ul>
              <p className="mb-4 text-text-secondary leading-relaxed">
                *Catatan: Memenuhi ketiga syarat di atas belum menjamin kedua graf tersebut pasti isomorfik (syarat perlu, bukan syarat cukup). Kita tetap harus mengonfirmasi adanya fungsi bijektif yang memetakan tetangga simpul secara konsisten.*
              </p>
              <ExampleBox>
                <p className="font-semibold text-text-main mb-2">Contoh Visualisasi Isomorfik</p>
                <p className="text-text-secondary leading-relaxed">
                  Graf <i>G</i>₁ adalah siklus 4 simpul {"{A, B, C, D}"} dengan sisi {"{(A,B), (B,C), (C,D), (D,A)}"}. 
                  <br />Graf <i>G</i>₂ adalah siklus 4 simpul {"{1, 2, 3, 4}"} dengan sisi {"{(1,3), (3,2), (2,4), (4,1)}"}. 
                  <br />Meskipun urutan penggambaran sisinya melompat, terdapat fungsi pemetaan bijektif <i>f</i>(<i>A</i>) = 1, <i>f</i>(<i>B</i>) = 3, <i>f</i>(<i>C</i>) = 2, <i>f</i>(<i>D</i>) = 4 yang mempertahankan ketetanggaan, sehingga <i>G</i>₁ dan <i>G</i>₂ isomorfik.
                </p>
              </ExampleBox>
            </ContentSection>
          </>
        );

      case 'g3':
        return (
          <>
            <CourseHeader 
              title="Matriks Ketetanggaan"
              subtitle="Representasi graf ke dalam bentuk matriks dua dimensi untuk pemrosesan komputer."
              level="Lanjut"
              time="Estimasi: 15 menit"
            />
            <MediaPlayerBase videoId="i9YyvT21z5g" title="Video: Representasi Graf & Matriks Adjacency" />
            <LearningObjectives objectives={[
              "Membuat matriks ketetanggaan (adjacency matrix) dari suatu graf.",
              "Membaca hubungan ketetanggaan simpul melalui baris dan kolom matriks.",
              "Memahami simulator matriks ketetanggaan interaktif."
            ]} />
            <ContentSection title="Adjacency Matrix">
              <p className="mb-4 text-text-secondary leading-relaxed">
                Komputer tidak menyimpan gambar graf berupa lingkaran dan garis. Oleh karena itu, kita mempresentasikan graf menggunakan matriks biner dua dimensi yang disebut **Matriks Ketetanggaan (Adjacency Matrix)**.
              </p>
              <p className="mb-4 text-text-secondary leading-relaxed">
                Jika suatu graf memiliki simpul sebanyak <i>n</i>, matriks ketetanggaan <i>A</i> akan berukuran <i>n</i> × <i>n</i>. Nilai elemen matriks pada koordinat baris <i>i</i> dan kolom <i>j</i>, yaitu <i>A</i>[<i>i</i>, <i>j</i>], didefinisikan bernilai:
                <br />- **1**: jika ada sisi yang menghubungkan simpul <i>i</i> dan simpul <i>j</i>.
                <br />- **0**: jika tidak ada sisi yang menghubungkan kedua simpul tersebut.
                <br />Pada graf tidak berarah (undirected graph), matriks ini bersifat simetris terhadap diagonal utama (<i>A</i>[<i>i</i>, <i>j</i>] = <i>A</i>[<i>j</i>, <i>i</i>]).
              </p>
              <AdjacencyMatrixVisualizer />
            </ContentSection>
          </>
        );

      case 'g4':
        return (
          <>
            <CourseHeader 
              title="Graf Planar & Teorema Kuratowski"
              subtitle="Memetakan lintasan agar tidak ada sisi yang saling bersilangan."
              level="Lanjut"
              time="Estimasi: 18 menit"
            />
            <LearningObjectives objectives={[
              "Mengenal definisi graf planar dan graf bidang.",
              "Memahami Teorema Kuratowski yang membatasi ketidakplanaran suatu graf menggunakan graf lengkap K_5 dan K_3,3."
            ]} />
            <ContentSection title="Graf Planar & Teorema Kuratowski">
              <p className="mb-4 text-text-secondary leading-relaxed">
                Sebuah graf disebut **Graf Planar** jika graf tersebut dapat digambar pada bidang datar sedemikian rupa sehingga tidak ada sisi-sisinya yang saling berpotongan (bersilangan) selain pada simpul ujungnya. Graf planar yang telah digambar tanpa ada sisi yang saling berpotongan disebut sebagai **Graf Bidang (Plane Graph)**.
              </p>
              <p className="mb-4 text-text-secondary leading-relaxed">
                Bagaimana kita mendeteksi sebuah graf tidak planar? Matematikawan asal Polandia, Kazimierz Kuratowski, merumuskan teorema penting pada tahun 1930:
              </p>
              <FormulaBox 
                title="Teorema Kuratowski" 
                formula="G tidak planar ⇔ G mengandung upagraf yang isomorfik dengan K₅ atau K₃,₃"
                desc="K₅ adalah graf lengkap dengan 5 simpul (semua simpul saling terhubung), sedangkan K₃,₃ adalah graf bipartit lengkap dengan dua kelompok simpul yang masing-masing memiliki 3 anggota."
              />
              <ExampleBox>
                <p className="font-semibold text-text-main mb-2">Aplikasi Desain Papan Sirkuit (PCB)</p>
                <p className="text-text-secondary leading-relaxed">
                  Teori graf planar sangat krusial dalam desain sirkuit elektronik cetak (PCB - Printed Circuit Board) dan mikrokontroler. Jalur tembaga pembawa arus listrik pada PCB tidak boleh bersilangan satu sama lain karena akan menyebabkan hubungan pendek (korsleting). Oleh karena itu, skema rangkaian listrik pada PCB harus dirancang membentuk graf planar pada bidang tunggal, atau didistribusikan ke beberapa lapisan (layer) PCB jika grafnya non-planar.
                </p>
              </ExampleBox>
            </ContentSection>
          </>
        );

      case 'g5':
        return (
          <>
            <CourseHeader 
              title="Graf Bidang & Rumus Euler"
              subtitle="Validasi jumlah simpul, sisi, dan wilayah pembagi ruang (faces)."
              level="Lanjut"
              time="Estimasi: 15 menit"
            />
            <MediaPlayerBase videoId="JC8rT9MCEKo" title="Video: Lintasan/Sirkuit Euler & Graf Bidang" />
            <LearningObjectives objectives={[
              "Mempelajari hubungan Vertex, Edge, dan Face pada graf bidang.",
              "Mengaplikasikan Rumus Euler untuk memvalidasi planaritas graf."
            ]} />
            <ContentSection title="Rumus Euler">
              <p className="mb-4 text-text-secondary leading-relaxed">
                Ketika sebuah graf planar digambar pada bidang datar tanpa ada sisi yang saling bersilangan (membentuk graf bidang), sisi-sisi tersebut membagi bidang datar menjadi beberapa wilayah tertutup dan satu wilayah luar terbuka yang tak terbatas. Wilayah-wilayah ini disebut sebagai **daerah atau muka (face / region)**.
              </p>
              <p className="mb-4 text-text-secondary leading-relaxed">
                Matematikawan ternama asal Swiss, **Leonhard Euler**, menemukan hubungan fundamental antara jumlah simpul (<i>V</i>), jumlah sisi (<i>E</i>), dan jumlah wilayah (<i>F</i>) pada graf bidang terhubung:
              </p>
              <FormulaBox 
                title="Formulasi Euler" 
                formula="V - E + F = 2"
                desc="Dimana V = jumlah Vertex, E = jumlah Edge, dan F = jumlah Face (termasuk wilayah luar)."
              />
              <ExampleBox>
                <p className="font-semibold text-text-main mb-2">Contoh Penggunaan Rumus Euler</p>
                <p className="text-text-secondary leading-relaxed">
                  Sebuah graf bidang planar terhubung memiliki 8 simpul (<i>V</i> = 8) dan 12 sisi (<i>E</i> = 12). Berapakah jumlah wilayah/muka (<i>F</i>) pada graf tersebut?
                  <br />Menggunakan Rumus Euler: 
                  <br /><i>V</i> - <i>E</i> + <i>F</i> = 2
                  <br />8 - 12 + <i>F</i> = 2
                  <br />-4 + <i>F</i> = 2 ⇒ <i>F</i> = 6 daerah.
                </p>
              </ExampleBox>
            </ContentSection>
          </>
        );

      case 'g6':
        return (
          <>
            <CourseHeader 
              title="Graf Dual & Cara Membentuknya"
              subtitle="Membentuk graf baru dari wilayah yang dibatasi oleh graf bidang asal."
              level="Lanjut"
              time="Estimasi: 15 menit"
            />
            <LearningObjectives objectives={[
              "Memahami konsep graf dual.",
              "Mengikuti langkah-langkah menggambar graf dual dari graf planar asal."
            ]} />
            <ContentSection title="Graf Dual">
              <p className="mb-4 text-text-secondary leading-relaxed">
                Dari suatu graf bidang <i>G</i> kita dapat membentuk graf baru yang disebut **graf dual (<i>G</i>\*)**. Konsep dualitas ini berguna dalam pemrosesan graf geometri komputer dan teori jaringan.
              </p>
              <p className="mb-4 text-text-secondary leading-relaxed">
                **Langkah-langkah menggambar graf dual <i>G</i>\* dari graf bidang <i>G</i>:**
              </p>
              <ol className="list-decimal pl-6 space-y-3 text-text-secondary mb-6 leading-relaxed">
                <li>Letakkan tepat satu simpul baru di setiap wilayah (face) pada graf bidang <i>G</i>, termasuk wilayah luar terbuka. Simpul-simpul baru ini akan menjadi himpunan simpul <i>V</i>\* pada graf dual.</li>
                <li>Hubungkan dua buah simpul baru tersebut dengan sebuah garis (sisi <i>E</i>\*) jika wilayah tempat simpul baru tersebut diletakkan saling berbatasan sisi secara langsung pada graf asal <i>G</i>. Sisi <i>E</i>\* akan memotong tepat satu sisi <i>E</i> dari graf asal.</li>
              </ol>
            </ContentSection>
          </>
        );

      case 'g7':
        return (
          <>
            <CourseHeader 
              title="Penerapan Graf dalam Teknologi"
              subtitle="Pemanfaatan graf dalam struktur data sosial media, GPS perutean jalan, dan database graf."
              level="Lanjut"
              time="Estimasi: 15 menit"
            />
            <LearningObjectives objectives={[
              "Mengetahui penerapan algoritma Dijkstra pada pencarian rute terpendek Google Maps.",
              "Memahami pemodelan hubungan pertemanan media sosial dalam bentuk graf.",
              "Mengenal konsep basis data graf (Graph Database) modern."
            ]} />
            <ContentSection title="Teori Graf dalam Rekayasa Perangkat Lunak Modern">
              <p className="mb-4 text-text-secondary leading-relaxed">
                Hampir seluruh arsitektur data sistem informasi modern di internet direpresentasikan secara langsung menggunakan struktur graf:
              </p>
              <ul className="list-disc pl-6 space-y-4 text-text-secondary mb-6 leading-relaxed">
                <li>
                  <strong>Google Maps / Navigasi GPS:</strong> merepresentasikan persimpangan jalan sebagai simpul dan jalan raya sebagai sisi berarah dengan bobot berupa jarak/waktu tempuh. Pencarian rute terpendek dihitung secara dinamis menggunakan modifikasi <strong>Algoritma Dijkstra</strong> atau algoritma <i>A</i>\*.
                </li>
                <li>
                  <strong>Social Graph (LinkedIn / Facebook):</strong> Pengguna direpresentasikan sebagai simpul, dan hubungan pertemanan/koneksi profesional sebagai sisi. Analisis graf digunakan untuk merekomendasikan teman ("People You May Know") atau menghitung derajat pemisah (Degrees of Separation).
                </li>
                <li>
                  <strong>Graph Database (Neo4j / Amazon Neptune):</strong> Berbeda dengan database relasional (SQL) yang lambat untuk kueri relasi mendalam, database graf menyimpan simpul dan hubungan relasi secara langsung sebagai objek kelas pertama, sehingga kueri pencarian jaringan jutaan node dapat selesai dalam milidetik.
                </li>
              </ul>
            </ContentSection>
          </>
        );

      case 'g8': {
        const graphQuizQuestions = [
          {
            question: "Dalam graf bidang planar terhubung, bagaimanakah persamaan Euler yang menghubungkan jumlah simpul (V), sisi (E), dan wilayah/muka (F)?",
            options: ["V + E - F = 2", "V - E + F = 2", "E - V + F = 2", "V - E - F = 2"],
            correctAnswer: "B",
            explanation: "Formula Euler menyatakan bahwa untuk graf planar bidang terhubung, V - E + F = 2."
          },
          {
            question: "Berapakah jumlah simpul (vertices) dan sisi (edges) pada graf lengkap (complete graph) K_5?",
            options: ["5 simpul dan 5 sisi", "5 simpul dan 10 sisi", "5 simpul dan 15 sisi", "5 simpul dan 20 sisi"],
            correctAnswer: "B",
            explanation: "K_5 memiliki n = 5 simpul. Jumlah sisi graf lengkap didefinisikan sebagai n(n - 1)/2. Untuk K_5, jumlah sisi = 5(4)/2 = 10 sisi."
          },
          {
            question: "Simpul pada graf yang tidak memiliki sisi yang bersisian dengannya (derajat simpul = 0) disebut sebagai...",
            options: ["Simpul anting (pendant vertex)", "Simpul terpencil (isolated vertex)", "Simpul loop (self loop)", "Simpul paralel"],
            correctAnswer: "B",
            explanation: "Simpul dengan derajat nol dinamakan simpul terpencil (isolated vertex) karena letaknya terisolasi dari simpul lainnya."
          },
          {
            question: "Teorema Kuratowski menyatakan bahwa suatu graf tidak planar jika dan hanya jika ia mengandung upagraf (subgraph) yang isomorfik dengan...",
            options: ["K_5 atau K_3,3", "K_4 atau K_3,2", "K_5 atau K_4,4", "K_6 atau K_4,3"],
            correctAnswer: "A",
            explanation: "Sesuai Teorema Kuratowski, graf tidak planar jika mengandung upagraf yang isomorfik dengan graf lengkap K_5 atau graf bipartit lengkap K_3,3."
          },
          {
            question: "Sebuah graf bidang planar terhubung memiliki 6 simpul (V) dan 10 sisi (E). Berapakah jumlah wilayah atau muka (F) yang terbentuk saat digambar pada bidang datar?",
            options: ["4 wilayah", "5 wilayah", "6 wilayah", "8 wilayah"],
            correctAnswer: "C",
            explanation: "Menggunakan Rumus Euler V - E + F = 2: 6 - 10 + F = 2 => -4 + F = 2 => F = 6 wilayah."
          },
          {
            question: "Dua buah graf dikatakan isomorfik jika memenuhi pernyataan berikut, KECUALI...",
            options: [
              "Memiliki jumlah simpul yang sama",
              "Memiliki jumlah sisi yang sama",
              "Memiliki bentuk visual penggambaran yang harus persis sama",
              "Memiliki barisan derajat simpul yang sama"
            ],
            correctAnswer: "C",
            explanation: "Dua graf isomorfik secara visual bisa digambar sangat berbeda dan letak geometrisnya tidak harus sama, asalkan struktur logis hubungan kebersisiannya identik."
          },
          {
            question: "Untuk graf sederhana dengan n simpul, berapakah dimensi matriks ketetanggaan (adjacency matrix) yang merepresentasikannya?",
            options: ["n x 1", "n x n", "n x (n-1)", "(n-1) x (n-1)"],
            correctAnswer: "B",
            explanation: "Matriks ketetanggaan (adjacency matrix) memetakan hubungan ketetanggaan simpul ke simpul, sehingga ukurannya selalu persegi n x n."
          },
          {
            question: "Algoritma pencarian graf manakah yang sangat populer digunakan oleh Google Maps untuk menentukan rute/lintasan terpendek?",
            options: ["Algoritma Kruskal", "Algoritma Prim", "Algoritma Dijkstra", "Algoritma Huffman"],
            correctAnswer: "C",
            explanation: "Algoritma Dijkstra digunakan secara luas untuk memecahkan masalah pencarian lintasan terpendek (shortest path problem) dari satu simpul ke simpul lain."
          },
          {
            question: "Bagaimanakah cara membentuk graf dual G* dari graf planar G yang digambar pada bidang datar?",
            options: [
              "Letakkan simpul baru di tengah setiap sisi G",
              "Letakkan simpul baru di setiap wilayah/muka G, lalu hubungkan simpul baru tersebut jika wilayahnya berbatasan sisi langsung",
              "Salin simpul G, lalu balikkan arah semua sisi",
              "Hubungkan semua simpul yang memiliki derajat genap"
            ],
            correctAnswer: "B",
            explanation: "Graf dual dibentuk dengan menaruh simpul baru pada daerah/face graf bidang awal, dan menarik garis memotong sisi pembatas daerah-daerah tersebut."
          },
          {
            question: "Derajat suatu simpul (degree of a vertex) didefinisikan sebagai...",
            options: [
              "Jumlah total simpul pada graf",
              "Jumlah sisi yang bersisian/terhubung langsung dengan simpul tersebut",
              "Jumlah sirkuit yang melalui simpul tersebut",
              "Nilai bobot sisi yang terhubung ke simpul tersebut"
            ],
            correctAnswer: "B",
            explanation: "Derajat simpul adalah banyaknya sisi yang terhubung/bersisian langsung dengan simpul tersebut (pada simpul loop dihitung 2 derajat)."
          }
        ];
        return (
          <>
            {quizState === 'idle' ? (
              <>
                <CourseHeader 
                  title="Latihan Teori Graf"
                  subtitle="Uji pemahaman Anda mengenai postulat Euler dan komponen struktur graf planar."
                  level="Lanjut"
                  time="Estimasi: 15 menit"
                />
                <ContentSection title="Kuis Akhir Modul 3">
                  <p className="mb-6 text-text-secondary leading-relaxed">
                    Selesaikan 10 pertanyaan kuis evaluasi Teori Graf di bawah ini untuk menyelesaikan seluruh modul pembelajaran Matematika Diskrit.
                  </p>
                  
                  <MultiQuestionQuiz 
                    onComplete={() => onCompleteLesson('g8')}
                    onStateChange={setQuizState}
                    questions={graphQuizQuestions}
                  />
                </ContentSection>
              </>
            ) : (
              <div className="pt-2 animate-in fade-in duration-500">
                <MultiQuestionQuiz 
                  onComplete={() => onCompleteLesson('g8')}
                  onStateChange={setQuizState}
                  questions={graphQuizQuestions}
                />
              </div>
            )}
          </>
        );
      }

      default:
        return null;
    }
  };

  return (
    <div className={`animate-in fade-in slide-in-from-bottom-4 duration-700 ${quizState !== 'started' ? "pb-16" : "pb-2"}`}>
      {renderLesson()}
      {quizState !== 'started' && (
        <LessonNavigation 
          lessonId={lessonId} 
          onCompleteLesson={onCompleteLesson} 
          completedLessons={completedLessons} 
        />
      )}
    </div>
  );
}
