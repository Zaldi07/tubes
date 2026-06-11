import { useState, useEffect } from 'react';
import { 
  Breadcrumb, 
  ContentSection, 
  CourseHeader, 
  ExampleBox, 
  FormulaBox, 
  LearningObjectives, 
  LessonNavigation, 
  QuizCard,
  MediaPlayerBase,
  MultiQuestionQuiz
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
    <div className="rounded-2xl border border-border-main bg-white p-6 sm:p-8 shadow-sm my-8 w-full font-sans">
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

      <div className="mt-6 font-sans">
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
  const [quizState, setQuizState] = useState<'idle' | 'started' | 'finished'>('idle');

  useEffect(() => {
    setQuizState('idle');
  }, [lessonId]);

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
            <MediaPlayerBase videoId="YkGfBZ0Q-mA" title="Video: Pengantar Aljabar Boolean & Definisi" />
            <LearningObjectives objectives={[
              "Mengetahui sejarah singkat penciptaan aljabar Boolean oleh George Boole pada abad ke-19.",
              "Memahami relevansi aljabar Boolean bagi arsitektur komputer modern.",
              "Mengenal representasi biner (0 dan 1) sebagai dasar logika digital."
            ]} />
            <ContentSection title="Sejarah Singkat & Latar Belakang">
              <p className="mb-4 text-text-secondary leading-relaxed">
                Aljabar Boolean pertama kali diperkenalkan oleh seorang matematikawan asal Inggris bernama <strong>George Boole</strong> pada tahun 1854 dalam bukunya yang terkenal, <em>"An Investigation of the Laws of Thought"</em>. Boole berambisi untuk merumuskan sistem matematika formal yang dapat memodelkan hukum-hukum logika berpikir manusia. Berbeda dengan aljabar biasa yang berurusan dengan bilangan riil, aljabar Boole hanya berurusan dengan nilai kebenaran (benar atau salah).
              </p>
              <p className="mb-4 text-text-secondary leading-relaxed">
                Hampir satu abad kemudian, tepatnya pada tahun 1937, seorang mahasiswa pascasarjana di MIT bernama <strong>Claude Shannon</strong> menulis tesis legendarisnya. Shannon menyadari bahwa aljabar Boolean dua-nilai dapat diaplikasikan langsung pada sirkuit sakelar elektrik (switching circuits) berbasis relay. Penemuan Shannon inilah yang menjadi landasan teoritis dalam perancangan sirkuit digital, gerbang logika, mikroprosesor, dan arsitektur seluruh komputer modern saat ini.
              </p>
              <ExampleBox>
                <p className="font-semibold text-text-main mb-2">Aplikasi Logis dalam Sakelar Listrik</p>
                <p className="text-text-secondary leading-relaxed mb-2">
                  Bayangkan dua sakelar lampu <i>A</i> dan <i>B</i> terhubung secara <strong>seri</strong> dengan sebuah lampu. Lampu hanya akan menyala jika sakelar <i>A</i> <strong>dan</strong> sakelar <i>B</i> ditutup. Ini secara matematis dimodelkan sebagai operasi perkalian biner: <i>Y</i> = <i>A</i> · <i>B</i>.
                </p>
                <p className="text-text-secondary leading-relaxed">
                  Jika sakelar terhubung secara <strong>paralel</strong>, lampu akan menyala jika sakelar <i>A</i> <strong>atau</strong> sakelar <i>B</i> ditutup. Ini dimodelkan sebagai operasi penjumlahan biner: <i>Y</i> = <i>A</i> + <i>B</i>.
                </p>
              </ExampleBox>
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
            <ContentSection title="Definisi Aljabar Formal">
              <p className="mb-4 text-text-secondary leading-relaxed">
                Secara formal, Aljabar Boolean adalah suatu struktur aljabar yang didefinisikan pada sebuah himpunan elemen <i>B</i> dengan dua operasi biner, yaitu penjumlahan (+) dan perkalian (·), serta sebuah operasi uner (') yang disebut komplemen. Untuk dapat disebut sebagai aljabar Boolean, struktur tersebut harus memenuhi **Postulat Huntington** berikut (untuk setiap <i>a</i>, <i>b</i>, <i>c</i> ∈ <i>B</i>):
              </p>
              <ul className="list-disc pl-6 space-y-3 text-text-secondary mb-6 leading-relaxed">
                <li>
                  <strong>Closure (Keterutupan):</strong> 
                  <br /><i>a</i> + <i>b</i> ∈ <i>B</i> dan <i>a</i> · <i>b</i> ∈ <i>B</i>. Operasi penjumlahan dan perkalian dari dua elemen di <i>B</i> akan selalu menghasilkan elemen yang juga berada di dalam himpunan <i>B</i>.
                </li>
                <li>
                  <strong>Identitas (Identity):</strong> 
                  <br />Ada elemen unik 0, 1 ∈ <i>B</i> sedemikian sehingga:
                  <br /><i>a</i> + 0 = <i>a</i> (0 adalah elemen identitas penjumlahan)
                  <br /><i>a</i> · 1 = <i>a</i> (1 adalah elemen identitas perkalian)
                </li>
                <li>
                  <strong>Komutatif (Commutative):</strong> 
                  <br /><i>a</i> + <i>b</i> = <i>b</i> + <i>a</i> dan <i>a</i> · <i>b</i> = <i>b</i> · <i>a</i>. Urutan operan tidak memengaruhi hasil.
                </li>
                <li>
                  <strong>Distributif (Distributive):</strong> 
                  <br />· distributif terhadap + : <i>a</i> · (<i>b</i> + <i>c</i>) = (<i>a</i> · <i>b</i>) + (<i>a</i> · <i>c</i>)
                  <br />+ distributif terhadap · : <i>a</i> + (<i>b</i> · <i>c</i>) = (<i>a</i> + <i>b</i>) · (<i>a</i> + <i>c</i>) *(Catatan: Sifat kedua ini tidak berlaku pada aljabar aritmatika biasa!)*
                </li>
                <li>
                  <strong>Komplemen (Complement):</strong> 
                  <br />Untuk setiap <i>a</i> ∈ <i>B</i>, terdapat elemen unik komplemen <i>a'</i> ∈ <i>B</i> (ditulis juga <i>a̅</i>) sedemikian sehingga:
                  <br /><i>a</i> + <i>a'</i> = 1 dan <i>a</i> · <i>a'</i> = 0.
                </li>
              </ul>
              <ExampleBox>
                <p className="font-semibold text-text-main mb-2">Contoh Sifat Distributif Unik</p>
                <p className="text-text-secondary leading-relaxed mb-2">
                  Dalam aljabar biasa, ekspresi <i>x</i> + (<i>y</i> · <i>z</i>) tidak dapat dijabarkan menjadi (<i>x</i> + <i>y</i>) · (<i>x</i> + <i>z</i>). Namun, dalam Aljabar Boolean, hukum ini sepenuhnya valid karena postulat distributif bersifat simetris untuk kedua operator.
                </p>
                <p className="text-text-secondary font-mono bg-slate-50 p-2.5 rounded-lg border border-slate-100">
                  A + (B · C) = (A + B) · (A + C)
                </p>
              </ExampleBox>
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
              "Memahami relasi operator biner dengan nilai kebenaran logika.",
              "Membaca tabel kebenaran operasi dasar aljabar 2-nilai."
            ]} />
            <ContentSection title="Definisi Dua Nilai (Two-Valued Boolean Algebra)">
              <p className="mb-4 text-text-secondary leading-relaxed">
                Aljabar Boolean yang paling krusial dalam bidang ilmu komputer dan elektronika digital adalah aljabar Boolean yang didefinisikan pada himpunan biner <i>B</i> = {"{0, 1}"}. Di sini, kita mendefinisikan operator logika biner penjumlahan sebagai operator **OR**, perkalian sebagai **AND**, dan komplemen sebagai operator uner **NOT**.
              </p>
              <p className="mb-4 text-text-secondary leading-relaxed">
                Nilai 1 merepresentasikan kondisi **Benar (True)**, Tegangan Tinggi (High Voltage), atau Sakelar Tertutup. Nilai 0 merepresentasikan kondisi **Salah (False)**, Tegangan Rendah (Low Voltage), atau Sakelar Terbuka.
              </p>
              <ExampleBox>
                <p className="font-semibold text-text-main mb-3">Tabel Kebenaran Operasi Dua Nilai</p>
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div className="bg-slate-50 p-3 rounded-lg border border-border-main text-xs">
                    <p className="font-bold text-primary mb-1">Perkalian (AND / ·)</p>
                    <p className="font-mono text-text-secondary">0 · 0 = 0</p>
                    <p className="font-mono text-text-secondary">0 · 1 = 0</p>
                    <p className="font-mono text-text-secondary">1 · 0 = 0</p>
                    <p className="font-mono text-primary font-bold">1 · 1 = 1</p>
                  </div>
                  <div className="bg-slate-50 p-3 rounded-lg border border-border-main text-xs">
                    <p className="font-bold text-primary mb-1">Penjumlahan (OR / +)</p>
                    <p className="font-mono text-text-secondary">0 + 0 = 0</p>
                    <p className="font-mono text-primary font-bold">0 + 1 = 1</p>
                    <p className="font-mono text-primary font-bold">1 + 0 = 1</p>
                    <p className="font-mono text-primary font-bold">1 + 1 = 1</p>
                  </div>
                  <div className="bg-slate-50 p-3 rounded-lg border border-border-main text-xs">
                    <p className="font-bold text-primary mb-1">Komplemen (NOT / ')</p>
                    <p className="font-mono text-text-secondary">0' = 1</p>
                    <p className="font-mono text-text-secondary">1' = 0</p>
                  </div>
                </div>
              </ExampleBox>
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
              "Menulis ekspresi matematika Boolean secara benar.",
              "Menggunakan Hukum De Morgan untuk mengomplemenkan ekspresi logika.",
              "Memahami hukum-hukum penting seperti penyerapan, asosiatif, dan idempoten."
            ]} />
            <ContentSection title="Hukum-Hukum Aljabar Boolean">
              <p className="mb-4 text-text-secondary leading-relaxed">
                Untuk menyederhanakan ekspresi logika yang kompleks, kita menggunakan hukum-hukum aljabar Boolean. Berikut adalah tabel hukum dasar yang sering digunakan:
              </p>
              <div className="overflow-x-auto rounded-xl border border-border-main mb-6">
                <table className="w-full text-xs text-left">
                  <thead>
                    <tr className="bg-slate-50 border-b border-border-main font-bold">
                      <th className="p-3">Nama Hukum</th>
                      <th className="p-3">Hukum Penjumlahan (+)</th>
                      <th className="p-3">Hukum Perkalian (·)</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-border-main hover:bg-slate-50/50 transition-colors">
                      <td className="p-3 font-bold">1. Identitas</td>
                      <td className="p-3">A + 0 = A</td>
                      <td className="p-3">A · 1 = A</td>
                    </tr>
                    <tr className="border-b border-border-main bg-slate-50/50 hover:bg-slate-100/50 transition-colors">
                      <td className="p-3 font-bold">2. Idempoten</td>
                      <td className="p-3">A + A = A</td>
                      <td className="p-3">A · A = A</td>
                    </tr>
                    <tr className="border-b border-border-main hover:bg-slate-50/50 transition-colors">
                      <td className="p-3 font-bold">3. Komplemen</td>
                      <td className="p-3">A + A' = 1</td>
                      <td className="p-3">A · A' = 0</td>
                    </tr>
                    <tr className="border-b border-border-main bg-slate-50/50 hover:bg-slate-100/50 transition-colors">
                      <td className="p-3 font-bold">4. Komutatif</td>
                      <td className="p-3">A + B = B + A</td>
                      <td className="p-3">A · B = B · A</td>
                    </tr>
                    <tr className="border-b border-border-main hover:bg-slate-50/50 transition-colors">
                      <td className="p-3 font-bold">5. Asosiatif</td>
                      <td className="p-3">(A + B) + C = A + (B + C)</td>
                      <td className="p-3">(A · B) · C = A · (B · C)</td>
                    </tr>
                    <tr className="border-b border-border-main bg-slate-50/50 hover:bg-slate-100/50 transition-colors">
                      <td className="p-3 font-bold">6. Distributif</td>
                      <td className="p-3">A + (B · C) = (A + B) · (A + C)</td>
                      <td className="p-3">A · (B + C) = (A · B) + (A · C)</td>
                    </tr>
                    <tr className="border-b border-border-main hover:bg-slate-50/50 transition-colors">
                      <td className="p-3 font-bold">7. Dominasi / Null</td>
                      <td className="p-3">A + 1 = 1</td>
                      <td className="p-3">A · 0 = 0</td>
                    </tr>
                    <tr className="border-b border-border-main bg-slate-50/50 hover:bg-slate-100/50 transition-colors">
                      <td className="p-3 font-bold">8. Involusi / Negasi Ganda</td>
                      <td className="p-3" colSpan={2}>(A')' = A</td>
                    </tr>
                    <tr className="border-b border-border-main hover:bg-slate-50/50 transition-colors">
                      <td className="p-3 font-bold">9. Penyerapan / Absorpsi</td>
                      <td className="p-3">A + (A · B) = A</td>
                      <td className="p-3">A · (A + B) = A</td>
                    </tr>
                    <tr className="border-b border-border-main bg-slate-50/50 hover:bg-slate-100/50 transition-colors">
                      <td className="p-3 font-bold">10. De Morgan</td>
                      <td className="p-3">(A + B)' = A' · B'</td>
                      <td className="p-3">(A · B)' = A' + B'</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <ExampleBox>
                <p className="font-semibold text-text-main mb-2">Contoh Penyederhanaan Ekspresi</p>
                <p className="text-text-secondary mb-2">Sederhanakan ekspresi berikut: <i>f</i> = (<i>A</i> + <i>B</i>) · (<i>A</i> + <i>B'</i>)</p>
                <ol className="list-decimal pl-5 space-y-1.5 text-xs text-text-secondary">
                  <li><i>f</i> = <i>A</i> + (<i>B</i> · <i>B'</i>) &mdash; *Menggunakan Hukum Distributif (mengeluarkan A)*</li>
                  <li><i>f</i> = <i>A</i> + 0 &mdash; *Menggunakan Hukum Komplemen (B · B' = 0)*</li>
                  <li><i>f</i> = <i>A</i> &mdash; *Menggunakan Hukum Identitas (A + 0 = A)*</li>
                </ol>
                <p className="mt-3 font-bold text-xs text-primary">Hasil Akhir: f = A</p>
              </ExampleBox>
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
              "Membuat fungsi Boolean dari sebuah tabel kebenaran.",
              "Membedakan bentuk kanonik SOP (Sum of Products) dan POS (Product of Sums).",
              "Mengenal istilah minterm dan maxterm beserta notasinya."
            ]} />
            <ContentSection title="Fungsi Boolean & Bentuk Kanonik">
              <p className="mb-4 text-text-secondary leading-relaxed">
                Sebuah fungsi Boolean adalah ekspresi logika yang dibentuk oleh variabel-variabel biner dan operator biner. Ketika sebuah fungsi didefinisikan oleh tabel kebenaran, fungsi tersebut dapat dinyatakan secara unik dalam salah satu bentuk kanonik standar:
              </p>
              <ul className="list-disc pl-6 space-y-4 text-text-secondary mb-6 leading-relaxed">
                <li>
                  <strong>SOP (Sum of Products / Jumlah dari Hasil Kali):</strong> Fungsi dibentuk dengan melakukan operasi **OR** (+) terhadap suku-suku **AND** (perkalian). Setiap suku perkalian disebut sebagai **minterm**. Minterm dibentuk dari baris tabel kebenaran yang menghasilkan nilai fungsi **1**. 
                  <br /><span className="text-xs italic bg-slate-50 px-1 py-0.5 rounded">Notasi: f = ∑(m₀, m₁, ...)</span>
                </li>
                <li>
                  <strong>POS (Product of Sums / Kali dari Hasil Jumlah):</strong> Fungsi dibentuk dengan melakukan operasi **AND** (·) terhadap suku-suku **OR** (penjumlahan). Setiap suku penjumlahan disebut sebagai **maxterm**. Maxterm dibentuk dari baris tabel kebenaran yang menghasilkan nilai fungsi **0**.
                  <br /><span className="text-xs italic bg-slate-50 px-1 py-0.5 rounded">Notasi: f = ∏(M₀, M₁, ...)</span>
                </li>
              </ul>
              <ExampleBox>
                <p className="font-semibold text-text-main mb-2">Studi Kasus 2 Variabel</p>
                <p className="text-text-secondary mb-3">Diberikan tabel kebenaran untuk fungsi <i>f</i>(<i>x</i>, <i>y</i>):</p>
                <div className="overflow-x-auto rounded-lg border border-border-main max-w-xs mb-4">
                  <table className="w-full text-center text-xs">
                    <thead>
                      <tr className="bg-slate-50 border-b border-border-main font-bold">
                        <th className="p-2 border-r border-border-main">x</th>
                        <th className="p-2 border-r border-border-main">y</th>
                        <th className="p-2 text-primary">f(x, y)</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-border-main"><td className="p-2 border-r border-border-main">0</td><td className="p-2 border-r border-border-main">0</td><td className="p-2 font-bold">1</td></tr>
                      <tr className="border-b border-border-main bg-slate-50/20"><td className="p-2 border-r border-border-main">0</td><td className="p-2 border-r border-border-main">1</td><td className="p-2 font-bold">0</td></tr>
                      <tr className="border-b border-border-main"><td className="p-2 border-r border-border-main">1</td><td className="p-2 border-r border-border-main">0</td><td className="p-2 font-bold">1</td></tr>
                      <tr className="bg-slate-50/20"><td className="p-2 border-r border-border-main">1</td><td className="p-2 border-r border-border-main">1</td><td className="p-2 font-bold">0</td></tr>
                    </tbody>
                  </table>
                </div>
                <div className="text-text-secondary text-xs leading-relaxed space-y-2">
                  <p>
                    <strong>Bentuk SOP:</strong> Kita ambil baris yang bernilai 1 (baris 1 dan baris 3).
                    <br />Baris 1 (<i>x</i> = 0, <i>y</i> = 0) → <i>x'y'</i>
                    <br />Baris 3 (<i>x</i> = 1, <i>y</i> = 0) → <i>xy'</i>
                    <br /><span className="font-bold text-primary">f(x, y) = x'y' + xy' = ∑(0, 2)</span>
                  </p>
                  <p>
                    <strong>Bentuk POS:</strong> Kita ambil baris yang bernilai 0 (baris 2 dan baris 4).
                    <br />Baris 2 (<i>x</i> = 0, <i>y</i> = 1) → <i>x</i> + <i>y'</i>
                    <br />Baris 4 (<i>x</i> = 1, <i>y</i> = 1) → <i>x'</i> + <i>y'</i>
                    <br /><span className="font-bold text-primary">f(x, y) = (x + y') · (x' + y') = ∏(1, 3)</span>
                  </p>
                </div>
              </ExampleBox>
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
              "Mengenal gerbang logika dasar AND, OR, NOT.",
              "Memahami gerbang logika turunan seperti XOR, NAND, dan NOR.",
              "Mengamati visualisasi sirkuit kombinasional melalui simulator logika interaktif."
            ]} />
            <ContentSection title="Representasi Fisik Gerbang Logika">
              <p className="mb-4 text-text-secondary leading-relaxed">
                Di dalam elektronika digital, hukum logika Boolean direalisasikan menggunakan sirkuit fisik terkecil yang disebut <strong>Gerbang Logika (Logic Gates)</strong>. Transistor-transistor di dalam silikon CPU dikonfigurasikan sedemikian rupa untuk berfungsi sebagai sakelar elektronik yang melakukan operasi Boolean ini pada kecepatan miliaran kali per detik.
              </p>
              <p className="mb-4 text-text-secondary leading-relaxed">
                Selain AND, OR, dan NOT, terdapat gerbang sekunder yang sangat populer seperti **NAND** (Not AND), **NOR** (Not OR), dan **XOR** (Exclusive OR). Gerbang NAND dan NOR sering disebut sebagai *universal gates* karena kombinasi gerbang tersebut dapat menggantikan gerbang apa pun di dunia digital.
              </p>

              <LogicGateSimulator />

              <ExampleBox>
                <p className="font-semibold text-text-main mb-2">Gerbang XOR (Exclusive OR)</p>
                <p className="text-text-secondary leading-relaxed">
                  Gerbang XOR menghasilkan output bernilai 1 jika dan hanya jika kedua inputnya memiliki nilai logika yang berbeda (satu bernilai 1, satu bernilai 0). Secara Boolean, fungsi XOR untuk input A dan B didefinisikan sebagai:
                  <br /><code className="block mt-2 p-2 bg-slate-50 border border-slate-100 font-mono text-primary text-center">Y = A ⊕ B = A'B + AB'</code>
                </p>
              </ExampleBox>
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
            <MediaPlayerBase videoId="WnYthgQYzsU" title="Video: Penyederhanaan Aljabar Boolean & Peta Karnaugh" />
            <LearningObjectives objectives={[
              "Menyederhanakan fungsi logika Boolean secara aljabar menggunakan hukum dasar.",
              "Mengenal representasi grafis penyederhanaan menggunakan K-Map (Karnaugh Map).",
              "Melakukan pengelompokan (grouping) sel K-map secara berdekatan."
            ]} />
            <ContentSection title="Penyederhanaan Peta Karnaugh (K-Map)">
              <p className="mb-4 text-text-secondary leading-relaxed">
                Menyederhanakan ekspresi secara aljabar membutuhkan ketelitian dan hafalan hukum yang kuat. Untuk mempermudahnya, Maurice Karnaugh memperkenalkan **Karnaugh Map (K-Map)** pada tahun 1953. K-Map adalah representasi grafis tabel kebenaran berupa kisi-kisi dua dimensi.
              </p>
              <p className="mb-4 text-text-secondary leading-relaxed">
                Prinsip kerja K-Map didasarkan pada pengurutan kode **Gray (Gray Code)** di mana sel-sel yang bersebelahan hanya berbeda satu variabel literal. Dengan mengelompokkan sel-sel bernilai 1 yang bersebelahan (dalam kelipatan pangkat dua seperti 2, 4, 8 sel), kita dapat mengeliminasi variabel yang berubah nilai (karena hukum komplemen <i>A</i> + <i>A'</i> = 1).
              </p>
              
              <ExampleBox>
                <p className="font-semibold text-text-main mb-2">Contoh Sederhanakan: <i>f</i> = <i>A'B'C</i> + <i>A'BC</i> + <i>ABC</i> + <i>AB'C</i></p>
                <p className="text-text-secondary leading-relaxed mb-2">Kita dapat menyederhanakan ekspresi di atas menggunakan hukum aljabar:</p>
                <ol className="list-decimal pl-5 space-y-1.5 text-xs text-text-secondary">
                  <li><i>f</i> = <i>A'C</i>(<i>B'</i> + <i>B</i>) + <i>AC</i>(<i>B</i> + <i>B'</i>) &mdash; *Kumpulkan suku-suku menggunakan hukum distributif*</li>
                  <li><i>f</i> = <i>A'C</i>(1) + <i>AC</i>(1) &mdash; *Terapkan Hukum Komplemen (B' + B = 1)*</li>
                  <li><i>f</i> = <i>A'C</i> + <i>AC</i> &mdash; *Terapkan Hukum Identitas*</li>
                  <li><i>f</i> = <i>C</i>(<i>A'</i> + <i>A</i>) &mdash; *Faktorkan kembali variabel C*</li>
                  <li><i>f</i> = <i>C</i>(1) = <i>C</i> &mdash; *Hasil akhir yang sangat sederhana!*</li>
                </ol>
                <p className="mt-3 text-text-secondary leading-relaxed text-xs">
                  *Dalam K-Map 3-variabel, keempat suku tersebut akan membentuk baris penuh bernilai 1 yang mencakup seluruh variabel A dan B, sehingga menyisakan variabel C saja secara instan.*
                </p>
              </ExampleBox>
            </ContentSection>
          </>
        );

      case 'b8': {
        const booleanQuizQuestions = [
          {
            question: "Siapakah matematikawan yang pertama kali memformulasikan konsep logika biner ke dalam aljabar matematika pada tahun 1854?",
            options: ["Claude Shannon", "George Boole", "Maurice Karnaugh", "Leonhard Euler"],
            correctAnswer: "B",
            explanation: "George Boole merancang struktur matematika logika ini pada tahun 1854 dalam karyanya 'The Laws of Thought'."
          },
          {
            question: "Manakah di antara pilihan berikut yang mendeskripsikan postulat Huntington untuk sifat Komplemen?",
            options: [
              "A + 0 = A dan A · 1 = A",
              "A + A' = 1 dan A · A' = 0",
              "A + B = B + A dan A · B = B · A",
              "A + (B · C) = (A + B) · (A + C)"
            ],
            correctAnswer: "B",
            explanation: "Postulat komplemen Huntington menyatakan bahwa setiap elemen A memiliki komplemen A' sedemikian rupa sehingga jumlahnya adalah 1 dan hasil kalinya adalah 0."
          },
          {
            question: "Dalam Aljabar Boolean 2-Nilai, himpunan B didefinisikan secara matematis sebagai...",
            options: ["B = {0, 1}", "B = {-1, 1}", "B = R (Bilangan Riil)", "B = {True, False, Null}"],
            correctAnswer: "A",
            explanation: "Aljabar Boolean dua-nilai didasarkan pada himpunan biner B = {0, 1}."
          },
          {
            question: "Hukum De Morgan menyatakan bahwa komplemen dari perkalian (A · B)' ekuivalen dengan...",
            options: ["A' · B'", "A' + B'", "A + B", "(A + B)'"],
            correctAnswer: "B",
            explanation: "Menurut De Morgan, komplemen dari hasil kali (A · B)' sama dengan jumlah dari komplemen masing-masing literal, yaitu A' + B'."
          },
          {
            question: "Hasil dari penyederhanaan ekspresi logika A + A'·B adalah...",
            options: ["A", "B", "A + B", "A · B"],
            correctAnswer: "C",
            explanation: "A + A'B = (A + A') · (A + B) berdasarkan hukum distributif. Karena A + A' = 1, maka 1 · (A + B) = A + B berdasarkan hukum identitas."
          },
          {
            question: "Berapakah jumlah sel (kotak) pada Peta Karnaugh (K-Map) yang digunakan untuk menyederhanakan fungsi dengan 3 variabel?",
            options: ["4 sel", "6 sel", "8 sel", "16 sel"],
            correctAnswer: "C",
            explanation: "Jumlah sel K-Map mengikuti rumus 2^n, di mana n adalah jumlah variabel. Untuk 3 variabel, jumlah sel adalah 2^3 = 8 sel."
          },
          {
            question: "Pada bentuk kanonik SOP (Sum of Products), setiap suku perkalian literal disebut...",
            options: ["Minterm", "Maxterm", "Sumterm", "Literal term"],
            correctAnswer: "A",
            explanation: "Suku-suku perkalian AND pada bentuk SOP dinamakan minterm, sedangkan suku penjumlahan OR pada bentuk POS dinamakan maxterm."
          },
          {
            question: "Gerbang logika yang memberikan output bernilai 0 hanya ketika semua inputnya bernilai 1 adalah...",
            options: ["Gerbang OR", "Gerbang NOR", "Gerbang NAND", "Gerbang XOR"],
            correctAnswer: "C",
            explanation: "Gerbang NAND (Not AND) akan menghasilkan output 0 (False) jika semua inputnya 1 (True)."
          },
          {
            question: "Ekspresi logika A + A ekuivalen dengan A. Ini didasarkan pada hukum...",
            options: ["Identitas", "Idempoten", "Komplemen", "Dominasi"],
            correctAnswer: "B",
            explanation: "Hukum Idempoten menyatakan bahwa operasi OR atau AND terhadap variabel yang sama akan menghasilkan variabel itu sendiri (A + A = A, A · A = A)."
          },
          {
            question: "Hasil penyederhanaan ekspresi logika A · (A + B) berdasarkan hukum absorpsi (penyerapan) adalah...",
            options: ["A", "B", "A · B", "A + B"],
            correctAnswer: "A",
            explanation: "Hukum Absorpsi (penyerapan) secara langsung menyatakan bahwa A · (A + B) = A."
          }
        ];
        return (
          <>
            {quizState === 'idle' ? (
              <>
                <CourseHeader 
                  title="Latihan Aljabar Boolean"
                  subtitle="Uji pemahaman Anda mengenai postulat dasar dan hukum-hukum Aljabar Boolean."
                  level="Dasar"
                  time="Estimasi: 15 menit"
                />
                <ContentSection title="Kuis Akhir Modul 1">
                  <p className="mb-6 text-text-secondary leading-relaxed">
                    Selesaikan kuis evaluasi 10 pertanyaan di bawah ini untuk memvalidasi pengetahuan Anda tentang Aljabar Boolean. Skor minimal 70% direkomendasikan sebelum melanjutkan ke bab berikutnya.
                  </p>
                  
                  <MultiQuestionQuiz 
                    onComplete={() => onCompleteLesson('b8')}
                    onStateChange={setQuizState}
                    questions={booleanQuizQuestions}
                  />
                </ContentSection>
              </>
            ) : (
              <div className="pt-2 animate-in fade-in duration-500">
                <MultiQuestionQuiz 
                  onComplete={() => onCompleteLesson('b8')}
                  onStateChange={setQuizState}
                  questions={booleanQuizQuestions}
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
