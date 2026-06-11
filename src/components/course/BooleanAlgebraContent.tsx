import { useState } from 'react';
import { 
  Breadcrumb, 
  ContentSection, 
  CourseHeader, 
  ExampleBox, 
  FormulaBox, 
  LearningObjectives, 
  LessonNavigation, 
  QuizCard,
  MediaPlayerBase
} from './CourseComponents';

function LogicGateSimulator() {
  const [selectedGate, setSelectedGate] = useState<'AND' | 'OR' | 'NOT' | 'XOR' | 'NAND' | 'NOR'>('AND');
  const [inputA, setInputA] = useState(false);
  const [inputB, setInputB] = useState(false);

  let outputY = false;
  switch (selectedGate) {
    case 'AND':
      outputY = inputA && inputB;
      break;
    case 'OR':
      outputY = inputA || inputB;
      break;
    case 'NOT':
      outputY = !inputA;
      break;
    case 'XOR':
      outputY = inputA !== inputB;
      break;
    case 'NAND':
      outputY = !(inputA && inputB);
      break;
    case 'NOR':
      outputY = !(inputA || inputB);
      break;
    default:
      outputY = false;
  }

  return (
    <div className="rounded-2xl border border-border-main bg-white p-6 sm:p-8 shadow-sm my-8 w-full">
      <div className="flex justify-between items-center mb-6 border-b border-border-main pb-4">
        <div>
          <h4 className="font-bold text-text-main text-base">Simulator Gerbang Logika Interaktif</h4>
          <p className="text-xs text-text-secondary">Pilih gerbang logika, ubah input, dan amati nilai output secara langsung.</p>
        </div>
      </div>

      <div className="flex flex-wrap gap-2 mb-6">
        {(['AND', 'OR', 'NOT', 'XOR', 'NAND', 'NOR'] as const).map((gate) => (
          <button
            key={gate}
            onClick={() => setSelectedGate(gate)}
            className={`px-3 py-1.5 rounded-lg text-xs sm:text-sm font-bold border transition-all cursor-pointer ${
              selectedGate === gate
                ? 'bg-primary text-white border-primary shadow-sm'
                : 'bg-white border-border-main text-text-secondary hover:bg-slate-50'
            }`}
          >
            {gate}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center bg-slate-50 p-6 rounded-xl border border-border-main relative overflow-hidden">
        <div className="flex flex-col gap-4">
          <div className="flex items-center justify-between bg-white border border-border-main p-3 rounded-xl shadow-xs">
            <span className="text-sm font-bold text-text-main flex items-center gap-2">
              <span className={`w-2.5 h-2.5 rounded-full ${inputA ? 'bg-primary animate-pulse' : 'bg-slate-300'}`}></span>
              Input A
            </span>
            <button
              onClick={() => setInputA(!inputA)}
              className={`w-12 h-6 rounded-full p-1 transition-colors duration-200 cursor-pointer ${
                inputA ? 'bg-primary' : 'bg-slate-300'
              }`}
            >
              <div
                className={`w-4 h-4 rounded-full bg-white shadow-md transform transition-transform duration-200 ${
                  inputA ? 'translate-x-6' : 'translate-x-0'
                }`}
              ></div>
            </button>
          </div>

          {selectedGate !== 'NOT' && (
            <div className="flex items-center justify-between bg-white border border-border-main p-3 rounded-xl shadow-xs">
              <span className="text-sm font-bold text-text-main flex items-center gap-2">
                <span className={`w-2.5 h-2.5 rounded-full ${inputB ? 'bg-primary animate-pulse' : 'bg-slate-300'}`}></span>
                Input B
              </span>
              <button
                onClick={() => setInputB(!inputB)}
                className={`w-12 h-6 rounded-full p-1 transition-colors duration-200 cursor-pointer ${
                  inputB ? 'bg-primary' : 'bg-slate-300'
                }`}
              >
                <div
                  className={`w-4 h-4 rounded-full bg-white shadow-md transform transition-transform duration-200 ${
                    inputB ? 'translate-x-6' : 'translate-x-0'
                  }`}
                ></div>
              </button>
            </div>
          )}
        </div>

        <div className="flex flex-col items-center justify-center p-4 border-y md:border-y-0 md:border-x border-border-main h-full min-h-[120px]">
          <div className="w-20 h-20 bg-white border-2 border-primary rounded-2xl shadow-sm flex flex-col items-center justify-center gap-1">
            <span className="text-lg font-black text-primary tracking-wide">{selectedGate}</span>
            <span className="text-[9px] text-text-secondary uppercase font-semibold">Gerbang</span>
          </div>
        </div>

        <div className="flex flex-col items-center justify-center">
          <div className={`w-20 h-20 rounded-full flex flex-col items-center justify-center transition-all duration-500 shadow-md border ${
            outputY 
              ? 'bg-success/10 border-success text-success shadow-success/20 scale-105' 
              : 'bg-slate-100 border-border-main text-text-secondary scale-100'
          }`}>
            <span className="text-2xl font-black">{outputY ? '1' : '0'}</span>
            <span className="text-[9px] font-bold uppercase tracking-wider">{outputY ? 'TRUE' : 'FALSE'}</span>
          </div>
        </div>
      </div>

      <div className="mt-6">
        <h5 className="text-xs font-bold text-text-secondary uppercase mb-3 tracking-wider">Tabel Validasi Real-time</h5>
        <div className="overflow-x-auto rounded-xl border border-border-main">
          <table className="w-full text-xs text-left">
            <thead>
              <tr className="bg-slate-50 border-b border-border-main text-text-secondary font-bold">
                <th className="p-3 text-center">Input A</th>
                {selectedGate !== 'NOT' && <th className="p-3 text-center">Input B</th>}
                <th className="p-3 text-center text-primary">Output Y</th>
                <th className="p-3 text-center">Status</th>
              </tr>
            </thead>
            <tbody>
              <tr className="bg-white font-medium text-text-main">
                <td className="p-3 text-center">{inputA ? '1' : '0'}</td>
                {selectedGate !== 'NOT' && <td className="p-3 text-center">{inputB ? '1' : '0'}</td>}
                <td className={`p-3 text-center font-bold ${outputY ? 'text-success' : 'text-text-main'}`}>{outputY ? '1' : '0'}</td>
                <td className="p-3 text-center">
                  <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                    outputY ? 'bg-success/15 text-success' : 'bg-slate-100 text-text-secondary'
                  }`}>
                    {outputY ? 'Menyala' : 'Redup'}
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
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

export default function BooleanAlgebraContent({ lessonId, completedLessons, onCompleteLesson }: ContentProps) {
  const renderLesson = () => {
    switch (lessonId) {
      case 'b1':
        return (
          <>
            <CourseHeader 
              title="Pengantar Aljabar Boolean"
              subtitle="Pelajari sejarah singkat dan latar belakang aljabar Boolean sebagai fondasi sistem komputer modern."
              level="Dasar"
              time="Estimasi: 10 menit"
            />
            <MediaPlayerBase />
            <LearningObjectives objectives={[
              "Mengetahui sejarah singkat penciptaan aljabar Boolean oleh George Boole pada abad ke-19.",
              "Memahami mengapa aljabar Boolean sangat penting bagi arsitektur komputer modern.",
              "Mengenal representasi biner (0 dan 1) sebagai dasar logika digital."
            ]} />
            <ContentSection title="Sejarah Singkat">
              <p className="mb-4 text-text-secondary leading-relaxed">
                Aljabar Boolean pertama kali diperkenalkan oleh seorang matematikawan asal Inggris bernama <strong>George Boole</strong> pada tahun 1854 dalam bukunya yang terkenal, <em>"An Investigation of the Laws of Thought"</em>. Boole merumuskan sistem matematika baru untuk memodelkan proses berpikir dan logika manusia.
              </p>
              <p className="mb-4 text-text-secondary leading-relaxed">
                Hampir seabad kemudian, pada tahun 1937, <strong>Claude Shannon</strong> menyadari bahwa aljabar Boolean dapat diaplikasikan langsung pada sirkuit sakelar elektrik (switching circuits). Penemuan Shannon inilah yang menjadi landasan rancangan sirkuit digital pada semua komputer modern saat ini.
              </p>
            </ContentSection>
          </>
        );

      case 'b2':
        return (
          <>
            <CourseHeader 
              title="Definisi Aljabar Boolean"
              subtitle="Definisi formal dan struktur matematika aljabar Boolean beserta postulat Huntington."
              level="Dasar"
              time="Estimasi: 12 menit"
            />
            <LearningObjectives objectives={[
              "Mendefinisikan aljabar Boolean sebagai sebuah struktur aljabar formal.",
              "Memahami postulat Huntington yang mendasari struktur aljabar Boolean.",
              "Mengenal elemen identitas dan sifat komplemen."
            ]} />
            <ContentSection title="Definisi Aljabar formal">
              <p className="mb-4 text-text-secondary leading-relaxed">
                Secara formal, Aljabar Boolean adalah sebuah sistem aljabar yang dibentuk oleh sebuah himpunan $B$ dengan dua operasi biner (AND $\cdot$ dan OR $+$), sebuah operasi uner (NOT $'$), dan dua elemen unik $0$ dan $1$ (di mana $0 \neq 1$) yang memenuhi postulat Huntington:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-text-secondary mb-6">
                <li><strong>Closure:</strong> Untuk setiap $a, b \in B$, berlaku $a+b \in B$ dan $a \cdot b \in B$.</li>
                <li><strong>Identitas:</strong> Ada elemen $0, 1 \in B$ sedemikian sehingga $a + 0 = a$ dan $a \cdot 1 = a$.</li>
                <li><strong>Komutatif:</strong> $a + b = b + a$ dan $a \cdot b = b \cdot a$.</li>
                <li><strong>Distributif:</strong> $a \cdot (b + c) = (a \cdot b) + (a \cdot c)$ dan $a + (b \cdot c) = (a + b) \cdot (a + c)$.</li>
                <li><strong>Komplemen:</strong> Untuk setiap $a \in B$, terdapat $a' \in B$ sedemikian sehingga $a + a' = 1$ dan $a \cdot a' = 0$.</li>
              </ul>
            </ContentSection>
          </>
        );

      case 'b3':
        return (
          <>
            <CourseHeader 
              title="Aljabar Boolean 2-Nilai"
              subtitle="Model aljabar Boolean yang paling populer dan banyak digunakan dalam dunia informatika."
              level="Dasar"
              time="Estimasi: 15 menit"
            />
            <LearningObjectives objectives={[
              "Mengenal Aljabar Boolean dengan himpunan dua nilai B = {0, 1}.",
              "Memahami relasi operator biner dengan nilai kebenaran logika."
            ]} />
            <ContentSection title="Definisi Dua Nilai">
              <p className="mb-4 text-text-secondary leading-relaxed">
                Aljabar Boolean yang paling penting dalam teknologi informasi adalah aljabar Boolean dua-nilai. Di sini, himpunan $B$ didefinisikan hanya memiliki dua elemen:
                <code className="mx-2 px-1 py-0.5 bg-slate-100 rounded">B = {"{0, 1}"}</code>.
              </p>
              <p className="mb-4 text-text-secondary leading-relaxed">
                Elemen $1$ merepresentasikan nilai <strong>True (Benar)</strong> atau tegangan tinggi (High), sedangkan elemen $0$ merepresentasikan nilai <strong>False (Salah)</strong> atau tegangan rendah (Low). Model inilah yang membentuk sistem bilangan biner pada mikroprosesor komputer.
              </p>
            </ContentSection>
          </>
        );

      case 'b4':
        return (
          <>
            <CourseHeader 
              title="Ekspresi Boolean & Hukum-Hukum"
              subtitle="Cara menulis ekspresi logika serta aturan penyederhanaan hukum-hukum Boolean."
              level="Dasar"
              time="Estimasi: 15 menit"
            />
            <LearningObjectives objectives={[
              "Menulis ekspresi matematika Boolean secara runtut.",
              "Menggunakan Hukum De Morgan untuk mengomplemenkan ekspresi.",
              "Menerapkan hukum asosiatif, distributif, dan absorbsi."
            ]} />
            <ContentSection title="Hukum De Morgan">
              <p className="mb-4 text-text-secondary leading-relaxed">
                Hukum De Morgan sangat krusial untuk mempermudah perhitungan komplemen dari kombinasi operasi logika. Hukum ini memiliki dua bentuk utama:
              </p>
              <FormulaBox 
                title="Hukum De Morgan" 
                formula={
                  <div className="space-y-2">
                    <div>(A + B)' <span className="font-normal text-text-secondary mx-2">=</span> A' · B'</div>
                    <div>(A · B)' <span className="font-normal text-text-secondary mx-2">=</span> A' + B'</div>
                  </div>
                }
                desc="Komplemen dari penjumlahan adalah perkalian dari komplemen masing-masing variabel, dan sebaliknya."
              />
            </ContentSection>
          </>
        );

      case 'b5':
        return (
          <>
            <CourseHeader 
              title="Fungsi Boolean & Bentuk Kanonik"
              subtitle="Menyusun fungsi Boolean dan menuliskannya dalam format standar SOP dan POS."
              level="Dasar"
              time="Estimasi: 18 menit"
            />
            <LearningObjectives objectives={[
              "Membuat fungsi Boolean dari tabel kebenaran.",
              "Membedakan bentuk kanonik SOP (Sum of Products) dan POS (Product of Sums).",
              "Mengenal istilah minterm dan maxterm."
            ]} />
            <ContentSection title="Bentuk Kanonik">
              <p className="mb-4 text-text-secondary leading-relaxed">
                Fungsi Boolean dapat dinyatakan dalam bentuk kanonik standar, yaitu:
              </p>
              <ul className="list-disc pl-6 space-y-4 text-text-secondary mb-6">
                <li>
                  <strong>SOP (Sum of Products / Jumlah dari Hasil Kali):</strong> Setiap suku dalam ekspresi dihubungkan dengan operator OR (+), dan suku tersebut merupakan perkalian AND dari literal (misal: $f = A'B + AB'$). Representasi suku ini disebut <em>minterm</em>.
                </li>
                <li>
                  <strong>POS (Product of Sums / Kali dari Hasil Jumlah):</strong> Suku-suku logika dijumlahkan dengan OR terlebih dahulu, lalu dikalikan dengan AND (misal: $f = (A+B) \cdot (A'+B')$). Representasi suku ini disebut <em>maxterm</em>.
                </li>
              </ul>
            </ContentSection>
          </>
        );

      case 'b6':
        return (
          <>
            <CourseHeader 
              title="Rangkaian Logika (Gates)"
              subtitle="Representasi fisik operator logika Boolean ke dalam komponen sirkuit gerbang logika dasar."
              level="Dasar"
              time="Estimasi: 15 menit"
            />
            <LearningObjectives objectives={[
              "Mengenal 3 gerbang logika dasar: AND, OR, NOT.",
              "Membaca tabel kebenaran dari masing-masing gerbang."
            ]} />
            <ContentSection title="Operator Dasar Boolean & Gerbang Logika">
              <p className="mb-4 text-text-secondary leading-relaxed">
                Di dalam elektronika digital, hukum logika Boolean direalisasikan menggunakan sirkuit fisik yang disebut <strong>Gerbang Logika (Logic Gates)</strong>. Berikut tabel kebenaran dari ketiga gerbang logika fundamental:
              </p>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6 border-y border-border-main py-8 my-8">
                {/* AND */}
                <div className="text-center md:text-left">
                  <h4 className="font-bold text-text-main mb-2">AND Gate (·)</h4>
                  <table className="w-full text-sm border border-border-main max-w-xs mx-auto md:mx-0">
                    <thead>
                      <tr className="bg-slate-50 border-b border-border-main">
                        <th className="p-2 border-r border-border-main w-1/3">A</th>
                        <th className="p-2 border-r border-border-main w-1/3">B</th>
                        <th className="p-2 w-1/3 text-primary">Y</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-border-main"><td className="p-2 border-r border-border-main">0</td><td className="p-2 border-r border-border-main">0</td><td className="p-2">0</td></tr>
                      <tr className="bg-slate-50 border-b border-border-main"><td className="p-2 border-r border-border-main">0</td><td className="p-2 border-r border-border-main">1</td><td className="p-2">0</td></tr>
                      <tr className="border-b border-border-main"><td className="p-2 border-r border-border-main">1</td><td className="p-2 border-r border-border-main">0</td><td className="p-2">0</td></tr>
                      <tr className="bg-slate-50"><td className="p-2 border-r border-border-main">1</td><td className="p-2 border-r border-border-main">1</td><td className="p-2 font-bold text-primary">1</td></tr>
                    </tbody>
                  </table>
                </div>

                {/* OR */}
                <div className="text-center md:text-left">
                  <h4 className="font-bold text-text-main mb-2">OR Gate (+)</h4>
                  <table className="w-full text-sm border border-border-main max-w-xs mx-auto md:mx-0">
                    <thead>
                      <tr className="bg-slate-50 border-b border-border-main">
                        <th className="p-2 border-r border-border-main w-1/3">A</th>
                        <th className="p-2 border-r border-border-main w-1/3">B</th>
                        <th className="p-2 w-1/3 text-primary">Y</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-border-main"><td className="p-2 border-r border-border-main">0</td><td className="p-2 border-r border-border-main">0</td><td className="p-2">0</td></tr>
                      <tr className="bg-slate-50 border-b border-border-main"><td className="p-2 border-r border-border-main">0</td><td className="p-2 border-r border-border-main">1</td><td className="p-2 font-bold text-primary">1</td></tr>
                      <tr className="border-b border-border-main"><td className="p-2 border-r border-border-main">1</td><td className="p-2 border-r border-border-main">0</td><td className="p-2 font-bold text-primary">1</td></tr>
                      <tr className="bg-slate-50"><td className="p-2 border-r border-border-main">1</td><td className="p-2 border-r border-border-main">1</td><td className="p-2 font-bold text-primary">1</td></tr>
                    </tbody>
                  </table>
                </div>

                {/* NOT */}
                <div className="text-center md:text-left">
                  <h4 className="font-bold text-text-main mb-2">NOT Gate (')</h4>
                  <table className="w-full text-sm border border-border-main max-w-xs mx-auto md:mx-0">
                    <thead>
                      <tr className="bg-slate-50 border-b border-border-main">
                        <th className="p-2 border-r border-border-main w-1/2">A</th>
                        <th className="p-2 w-1/2 text-primary">Y</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-border-main"><td className="p-2 border-r border-border-main">0</td><td className="p-2 font-bold text-primary">1</td></tr>
                      <tr className="bg-slate-50"><td className="p-2 border-r border-border-main">1</td><td className="p-2">0</td></tr>
                    </tbody>
                  </table>
                </div>
              </div>

              <LogicGateSimulator />
            </ContentSection>
          </>
        );

      case 'b7':
        return (
          <>
            <CourseHeader 
              title="Penyederhanaan & Peta Karnaugh"
              subtitle="Teknik memangkas kompleksitas fungsi logika agar sirkuit sirkuit menjadi efisien."
              level="Dasar"
              time="Estimasi: 20 menit"
            />
            <LearningObjectives objectives={[
              "Menyederhanakan fungsi logika Boolean secara aljabar menggunakan hukum dasar.",
              "Mengenal representasi grafis penyederhanaan menggunakan K-Map (Karnaugh Map)."
            ]} />
            <ContentSection title="Penyederhanaan Aljabar">
              <p className="mb-4 text-text-secondary leading-relaxed">
                Menyederhanakan ekspresi secara aljabar dilakukan dengan memfaktorkan variabel menggunakan hukum distributif dan menguranginya dengan hukum komplemen serta identitas.
              </p>
              
              <ExampleBox>
                <p className="mb-2 font-medium border-b border-warning/20 pb-2 text-text-main">Contoh Sederhanakan: <code>f = A·B + A·B'</code></p>
                <ol className="list-decimal pl-5 space-y-2 mt-3 text-sm text-text-secondary">
                  <li><strong>f = A·(B + B')</strong> &mdash; <em>Gunakan Hukum Distributif untuk mengeluarkan faktor A</em></li>
                  <li><strong>f = A·(1)</strong> &mdash; <em>B + B' selalu sama dengan 1 (Hukum Komplemen)</em></li>
                  <li><strong>f = A</strong> &mdash; <em>A·1 selalu sama dengan A (Hukum Identitas)</em></li>
                </ol>
              </ExampleBox>
            </ContentSection>
          </>
        );

      case 'b8':
        return (
          <>
            <CourseHeader 
              title="Latihan Aljabar Boolean"
              subtitle="Uji pemahaman Anda mengenai postulat dasar dan hukum-hukum Aljabar Boolean."
              level="Dasar"
              time="Estimasi: 10 menit"
            />
            <ContentSection title="Latihan Cepat Mandiri">
              <p className="mb-6 text-text-secondary leading-relaxed">
                Jawablah kuis di bawah ini untuk melihat pemahaman Anda. Jika Anda berhasil menjawab kuis dengan benar, klik tombol "Tandai Selesai" untuk mengklaim progress belajar Anda pada modul ini.
              </p>
              
              <QuizCard 
                question="Hukum De Morgan untuk komplemen dari disjungsi (A + B)' ekuivalen dengan ekspresi logika yang mana?"
                options={["A' + B'", "A' · B'", "A · B", "A + B"]}
                correctAnswer="B"
                explanation="Sesuai Hukum De Morgan, komplemen dari operasi OR (A + B)' adalah operasi AND dari masing-masing komplemennya, yaitu A' · B'."
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
