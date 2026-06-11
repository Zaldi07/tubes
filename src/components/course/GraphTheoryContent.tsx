import React, { useState } from 'react';
import { 
  Breadcrumb, 
  ContentSection, 
  CourseHeader, 
  FormulaBox, 
  LearningObjectives, 
  LessonNavigation, 
  QuizCard,
  MediaPlayerBase
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

function InteractiveGraph() {
  const [nodes, setNodes] = useState([
    { id: 1, x: 30, y: 30 },
    { id: 2, x: 70, y: 30 },
    { id: 3, x: 50, y: 70 },
  ]);

  const edges = [
    { from: 1, to: 2 },
    { from: 2, to: 3 },
    { from: 3, to: 1 },
  ];

  const addNode = () => {
    if (nodes.length >= 6) return;
    const newNode = {
      id: nodes.length + 1,
      x: Math.random() * 60 + 20,
      y: Math.random() * 60 + 20,
    };
    setNodes([...nodes, newNode]);
  };

  return (
    <div className="rounded-xl border border-border-main bg-white p-6 shadow-sm mb-10">
      <div className="flex justify-between items-center mb-4 border-b border-border-main pb-4">
         <h4 className="font-bold text-text-main">Simulasi Graf Dinamis</h4>
         <button 
           onClick={addNode}
           className="text-sm bg-blue-50 text-primary px-3 py-1.5 rounded-lg font-medium transition-colors hover:bg-primary-hover hover:text-white cursor-pointer"
         >
           Tambah Simpul (V)
         </button>
      </div>
      
      <div className="relative h-[250px] w-full bg-brand-background rounded-lg border border-border-main overflow-hidden">
        <svg className="absolute inset-0 w-full h-full">
          {/* Draw Edges */}
          {edges.map((edge, i) => {
            const n1 = nodes.find(n => n.id === edge.from);
            const n2 = nodes.find(n => n.id === edge.to);
            if (!n1 || !n2) return null;
            return (
              <line 
                key={`e-${i}`}
                x1={`${n1.x}%`} y1={`${n1.y}%`}
                x2={`${n2.x}%`} y2={`${n2.y}%`}
                stroke="#0056D2"
                strokeWidth="2"
                className="opacity-40"
              />
            );
          })}
          
          {/* Draw additional edges for new nodes just to make it connected */}
          {nodes.length > 3 && nodes.slice(3).map((node, i) => (
             <line 
               key={`en-${i}`}
               x1={`${node.x}%`} y1={`${node.y}%`}
               x2={`${nodes[0].x}%`} y2={`${nodes[0].y}%`}
               stroke="#0056D2"
               strokeWidth="2"
               className="opacity-40"
             />
          ))}
        </svg>

        {/* Draw Nodes */}
        {nodes.map(node => (
          <div 
            key={node.id}
            className="absolute h-8 w-8 -ml-4 -mt-4 bg-white border-2 border-primary rounded-full shadow-sm flex items-center justify-center font-bold text-xs text-primary z-10 transition-all duration-300 pointer-events-none"
            style={{ left: `${node.x}%`, top: `${node.y}%` }}
          >
            {node.id}
          </div>
        ))}
      </div>
      
      <div className="mt-6 flex gap-8 text-sm text-text-secondary bg-slate-50 p-3 rounded-lg border border-border-main justify-center max-w-sm mx-auto">
        <div className="flex gap-2">
           <span className="font-bold text-primary">Total Simpul (V):</span> {nodes.length}
        </div>
        <div className="flex gap-2">
           <span className="font-bold text-primary">Sisi (E) Terhubung:</span> {edges.length + Math.max(0, nodes.length - 3)}
        </div>
      </div>
    </div>
  );
}

export default function GraphTheoryContent({ lessonId, completedLessons, onCompleteLesson }: ContentProps) {
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
            <MediaPlayerBase />
            <LearningObjectives objectives={[
              "Mendefinisikan graf G = (V, E) secara matematis.",
              "Memahami perbedaan simpul (Vertex) dan sisi (Edge).",
              "Menggunakan simulasi graf dinamis untuk memvisualisasikan node terhubung."
            ]} />
            <ContentSection title="Dekomposisi Graf">
              <p className="mb-4 text-text-secondary leading-relaxed">
                Graf merupakan sistem komputasi kolektif $G = (V, E)$ yang merangkul unit-unit simpul/vertex ($V$) yang terhubung oleh sebuah jalur sisi/edge ($E$). Konsep ini menyokong pembangunan infrastruktur digital seperti peta navigasi jaringan dan perutean protokol DNS.
              </p>
              <InteractiveGraph />
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
                Dua buah graf $G_1$ dan $G_2$ dikatakan <strong>isomorfik</strong> jika terdapat korespondensi satu-satu antara simpul-simpul keduanya dan antara sisi-sisi keduanya sedemikian rupa sehingga hubungan kebersisian tetap dipertahankan. Dengan kata lain, strukturnya sama, hanya penamaan simpul dan estetika gambarnya saja yang berbeda.
              </p>
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
            <LearningObjectives objectives={[
              "Membuat matriks ketetanggaan (adjacency matrix) dari suatu graf.",
              "Membaca hubungan ketetanggaan simpul melalui baris dan kolom matriks."
            ]} />
            <ContentSection title="Adjacency Matrix">
              <p className="mb-4 text-text-secondary leading-relaxed">
                Komputer tidak memahami gambar lingkaran dan garis secara langsung. Oleh karena itu, kita merepresentasikan graf menggunakan matriks ketetanggaan. Matriks ini berukuran $V \times V$, di mana nilai matriks pada koordinat $(i,j)$ bernilai $1$ jika simpul $i$ terhubung dengan simpul $j$, dan $0$ jika tidak terhubung.
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
              "Mengenal definisi graf planar.",
              "Memahami Teorema Kuratowski yang membatasi ketidakplanaran suatu graf."
            ]} />
            <ContentSection title="Graf Planar">
              <p className="mb-4 text-text-secondary leading-relaxed">
                Suatu graf disebut <strong>planar</strong> jika dapat digambar pada bidang datar sedemikian rupa sehingga tidak ada sisi-sisinya yang saling berpotongan (bersilangan). Teorema Kuratowski menyatakan bahwa graf tidak planar jika dan hanya jika mengandung upagraf (subgraph) yang isomorfik dengan graf lengkap $K_5$ atau graf bipartit lengkap $K_{"{3,3}"}$.
              </p>
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
            <LearningObjectives objectives={[
              "Mempelajari hubungan Vertex, Edge, dan Face pada graf bidang.",
              "Mengaplikasikan Rumus Euler untuk memvalidasi planaritas graf."
            ]} />
            <ContentSection title="Rumus Euler">
              <p className="mb-4 text-text-secondary leading-relaxed">
                Graf planar yang digambar pada bidang tanpa ada sisi bersilangan membagi bidang datar tersebut menjadi beberapa wilayah (disebut daerah/face). Matematikawan Leonhard Euler merumuskan hubungan matematis penting berikut:
              </p>
              <FormulaBox 
                title="Formulasi Euler (Graf Bidang)" 
                formula="V - E + F = 2"
                desc="Berlaku jika V = jumlah simpul (Vertex), E = sisi (Edge), dan F = area peraga (Face), termasuk wilayah luar tak terbatas."
              />
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
                Dari suatu graf bidang $G$ kita dapat membentuk graf dual $G^*$. Langkah pembentukannya adalah dengan meletakkan satu titik di setiap wilayah (face) pada graf $G$, lalu menghubungkan titik-titik tersebut dengan garis jika wilayah yang bersangkutan saling berbatasan sisi secara langsung.
              </p>
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
              "Memahami pemodelan hubungan pertemanan media sosial dalam bentuk graf."
            ]} />
            <ContentSection title="Penerapan Nyata">
              <p className="mb-4 text-text-secondary leading-relaxed">
                Teori Graf merupakan fondasi struktur data yang sangat kaya. Hampir seluruh aplikasi modern mengandalkan graf:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-text-secondary mb-6">
                <li><strong>Google Maps / GPS:</strong> Menggunakan pencarian lintasan terpendek pada graf jalan raya.</li>
                <li><strong>Sosial Media (Facebook/LinkedIn):</strong> Menganalisis jaringan hubungan pertemanan (graf sosial).</li>
                <li><strong>Rekomendasi Produk E-commerce:</strong> Rekomendasi barang berbasis graf bipartite konsumen-produk.</li>
              </ul>
            </ContentSection>
          </>
        );

      case 'g8':
        return (
          <>
            <CourseHeader 
              title="Latihan Teori Graf"
              subtitle="Uji pemahaman Anda mengenai postulat Euler dan komponen struktur graf planar."
              level="Lanjut"
              time="Estimasi: 10 menit"
            />
            <ContentSection title="Latihan Cepat Mandiri">
              <p className="mb-6 text-text-secondary leading-relaxed">
                Jawablah kuis di bawah ini berdasarkan hukum relasi planar Euler yang telah kita verifikasi bersama.
              </p>
              
              <QuizCard 
                question="Menurut Teori Euler, rumusan matematis pengunci dari komponen graf bidang terhubung dinotasikan sebagai apa?"
                options={["V + E - F = 0", "V - E + F = 2", "E - V + F = 2", "V - E - F = 2"]}
                correctAnswer="B"
                explanation="Formulasi Euler memastikan relasi wilayah dapat divalidasi apabila Jumlah Vertex (V) dikurangi Jumlah Edge (E) dan ditambah Jumlah Area Muka (F) menghasilkan ekuivalen 2."
              />
            </ContentSection>
          </>
        );

      default:
        return null;
    }
  };

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-700 pb-16">
      {renderLesson()}
      <LessonNavigation 
        lessonId={lessonId} 
        onCompleteLesson={onCompleteLesson} 
        completedLessons={completedLessons} 
      />
    </div>
  );
}
