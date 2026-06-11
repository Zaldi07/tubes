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

interface ContentProps {
  lessonId: string;
  completedLessons: string[];
  onCompleteLesson: (id: string) => void;
}

function factorial(n: number): number {
  if (n < 0) return 0;
  if (n === 0 || n === 1) return 1;
  let result = 1;
  for (let i = 2; i <= n; i++) result *= i;
  return result;
}

function CombinatoricsVisualizer() {
  const [n, setN] = useState<number>(5);
  const [r, setR] = useState<number>(3);
  const [mode, setMode] = useState<'P' | 'C'>('C');

  const adjustN = (amount: number) => {
    const newVal = Math.max(1, Math.min(8, n + amount));
    setN(newVal);
    if (r > newVal) {
      setR(newVal);
    }
  };

  const adjustR = (amount: number) => {
    setR(Math.max(1, Math.min(n, r + amount)));
  };

  const pVal = factorial(n) / factorial(Math.max(0, n - r));
  const cVal = factorial(n) / (factorial(r) * factorial(Math.max(0, n - r)));

  const items = Array.from({ length: n }, (_, i) => String.fromCharCode(65 + i));

  const getSubsets = () => {
    const list: string[][] = [];
    
    if (mode === 'C') {
      const combine = (temp: string[], start: number) => {
        if (temp.length === r) {
          list.push([...temp]);
          return;
        }
        for (let i = start; i < items.length; i++) {
          temp.push(items[i]);
          combine(temp, i + 1);
          temp.pop();
        }
      };
      combine([], 0);
    } else {
      const permute = (temp: string[], used: boolean[]) => {
        if (temp.length === r) {
          list.push([...temp]);
          return;
        }
        for (let i = 0; i < items.length; i++) {
          if (used[i]) continue;
          used[i] = true;
          temp.push(items[i]);
          permute(temp, used);
          temp.pop();
          used[i] = false;
        }
      };
      permute([], Array(items.length).fill(false));
    }
    return list;
  };

  const subsets = getSubsets();
  const displayLimit = 15;

  const colors = [
    'bg-[#E7F0FF] border-[#0056D2] text-[#0056D2]',
    'bg-[#FFF2E7] border-[#F5AF02] text-[#F5AF02]',
    'bg-[#E7FBF3] border-[#1FA15F] text-[#1FA15F]',
    'bg-[#F5F3FF] border-[#8B5CF6] text-[#8B5CF6]',
    'bg-[#FDF2F8] border-[#EC4899] text-[#EC4899]',
    'bg-[#ECFDF5] border-[#10B981] text-[#10B981]',
    'bg-[#FFFBEB] border-[#D97706] text-[#D97706]',
    'bg-[#EFF6FF] border-[#2563EB] text-[#2563EB]',
  ];

  return (
    <div className="rounded-2xl border border-border-main bg-white p-6 sm:p-8 shadow-sm my-8 w-full">
      <div className="flex justify-between items-center mb-6 border-b border-border-main pb-4">
        <div>
          <h4 className="font-bold text-text-main text-base">Visualisator Permutasi & Kombinasi</h4>
          <p className="text-xs text-text-secondary">Ubah nilai n dan r untuk melihat visualisasi kelompok objek dan rumus matematika.</p>
        </div>
      </div>

      <div className="flex gap-4 mb-6 border-b border-border-main pb-4">
        <button
          onClick={() => setMode('C')}
          className={`flex-1 py-2 px-4 rounded-xl text-sm font-bold border transition-all cursor-pointer ${
            mode === 'C'
              ? 'bg-primary text-white border-primary shadow-sm'
              : 'bg-white border-border-main text-text-secondary hover:bg-slate-50'
          }`}
        >
          Kombinasi (Urutan Acak)
        </button>
        <button
          onClick={() => setMode('P')}
          className={`flex-1 py-2 px-4 rounded-xl text-sm font-bold border transition-all cursor-pointer ${
            mode === 'P'
              ? 'bg-primary text-white border-primary shadow-sm'
              : 'bg-white border-border-main text-text-secondary hover:bg-slate-50'
          }`}
        >
          Permutasi (Urutan Spesifik)
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-4">
        <div className="space-y-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between bg-slate-50 p-4 rounded-xl border border-border-main">
              <div>
                <span className="text-xs font-bold text-text-secondary block mb-0.5">TOTAL ELEMEN</span>
                <span className="text-sm font-black text-text-main">n = {n}</span>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => adjustN(-1)}
                  disabled={n <= 1}
                  className="w-8 h-8 rounded-lg bg-white border border-border-main flex items-center justify-center font-bold text-text-main hover:bg-slate-100 disabled:opacity-50 cursor-pointer"
                >
                  -
                </button>
                <button
                  onClick={() => adjustN(1)}
                  disabled={n >= 8}
                  className="w-8 h-8 rounded-lg bg-white border border-border-main flex items-center justify-center font-bold text-text-main hover:bg-slate-100 disabled:opacity-50 cursor-pointer"
                >
                  +
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between bg-slate-50 p-4 rounded-xl border border-border-main">
              <div>
                <span className="text-xs font-bold text-text-secondary block mb-0.5">ELEMEN DIPILIH</span>
                <span className="text-sm font-black text-text-main">r = {r}</span>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => adjustR(-1)}
                  disabled={r <= 1}
                  className="w-8 h-8 rounded-lg bg-white border border-border-main flex items-center justify-center font-bold text-text-main hover:bg-slate-100 disabled:opacity-50 cursor-pointer"
                >
                  -
                </button>
                <button
                  onClick={() => adjustR(1)}
                  disabled={r >= n}
                  className="w-8 h-8 rounded-lg bg-white border border-border-main flex items-center justify-center font-bold text-text-main hover:bg-slate-100 disabled:opacity-50 cursor-pointer"
                >
                  +
                </button>
              </div>
            </div>
          </div>

          <div className="bg-blue-50/50 p-4 rounded-xl border border-blue-100 text-xs space-y-2">
            <span className="font-bold text-primary block uppercase tracking-wider">Langkah Rumus:</span>
            {mode === 'C' ? (
              <div className="font-mono space-y-1">
                <div>C({n}, {r}) = {n}! / ({r}! * ({n} - {r})!)</div>
                <div>= {factorial(n)} / ({factorial(r)} * {factorial(n - r)})</div>
                <div>= {factorial(n)} / ({factorial(r) * factorial(n - r)})</div>
                <div className="text-sm font-black text-primary">= {cVal} cara</div>
              </div>
            ) : (
              <div className="font-mono space-y-1">
                <div>P({n}, {r}) = {n}! / ({n} - {r})!</div>
                <div>= {factorial(n)} / {factorial(n - r)}</div>
                <div className="text-sm font-black text-primary">= {pVal} cara</div>
              </div>
            )}
          </div>
        </div>

        <div className="flex flex-col border border-border-main p-6 rounded-2xl bg-slate-50/30">
          <span className="text-xs font-bold text-text-secondary uppercase mb-4 tracking-wider">Objek Tersedia</span>
          <div className="flex flex-wrap gap-2 mb-6 justify-center">
            {items.map((item, idx) => (
              <div
                key={item}
                className={`w-9 h-9 rounded-full border-2 flex items-center justify-center font-bold text-xs shadow-sm transition-all duration-300 ${colors[idx % colors.length]}`}
              >
                {item}
              </div>
            ))}
          </div>

          <span className="text-xs font-bold text-text-secondary uppercase mb-3 tracking-wider">
            Hasil Pemilihan ({subsets.length} total)
          </span>
          <div className="flex-1 bg-white border border-border-main rounded-xl p-3 max-h-[140px] overflow-y-auto font-mono text-xs">
            <div className="flex flex-col gap-1.5">
              {subsets.slice(0, displayLimit).map((subset, sIdx) => (
                <div key={sIdx} className="flex items-center gap-2 text-text-main border-b border-slate-50 pb-1">
                  <span className="text-[10px] text-text-secondary font-bold w-6">{sIdx + 1}.</span>
                  <div className="flex gap-1">
                    {subset.map((char) => (
                      <span 
                        key={char} 
                        className={`px-1.5 py-0.5 rounded text-[10px] font-bold border border-slate-200 bg-slate-50 text-text-main`}
                      >
                        {char}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
              {subsets.length > displayLimit && (
                <div className="text-text-secondary text-[10px] text-center pt-2 italic">
                  ... dan {subsets.length - displayLimit} cara lainnya
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function CombinatoricsContent({ lessonId, completedLessons, onCompleteLesson }: ContentProps) {
  const renderLesson = () => {
    switch (lessonId) {
      case 'p1':
        return (
          <>
            <CourseHeader 
              title="Teori Kemungkinan & Nilai Tempat"
              subtitle="Memahami ruang sampel, titik sampel, dan konsep dasar teori peluang matematika."
              level="Menengah"
              time="Estimasi: 12 menit"
            />
            <MediaPlayerBase />
            <LearningObjectives objectives={[
              "Mendefinisikan ruang sampel (S) dan titik sampel dari suatu kejadian.",
              "Memahami pengertian nilai kemungkinan/peluang suatu eksperimen matematika.",
              "Menghitung peluang teoretis sederhana."
            ]} />
            <ContentSection title="Ruang Sampel & Peluang">
              <p className="mb-4 text-text-secondary leading-relaxed">
                Peluang atau probabilitas adalah nilai antara $0$ dan $1$ yang menggambarkan seberapa besar kemungkinan terjadinya suatu peristiwa. Ruang sampel ($S$) adalah himpunan semua hasil yang mungkin dari suatu percobaan, sedangkan titik sampel adalah anggota-anggota dari ruang sampel.
              </p>
              <p className="mb-4 text-text-secondary leading-relaxed">
                Rumus dasar peluang untuk suatu kejadian $A$ adalah: 
                <code className="mx-2 px-1 py-0.5 bg-slate-100 rounded">P(A) = n(A) / n(S)</code>, di mana $n(A)$ adalah jumlah hasil yang diinginkan, dan $n(S)$ adalah jumlah seluruh titik sampel.
              </p>
            </ContentSection>
          </>
        );

      case 'p2':
        return (
          <>
            <CourseHeader 
              title="Aturan Pengisian Tempat (Filling Slots)"
              subtitle="Belajar kaidah pencacahan dasar menggunakan aturan perkalian dan penjumlahan."
              level="Menengah"
              time="Estimasi: 15 menit"
            />
            <LearningObjectives objectives={[
              "Memahami konsep dasar aturan pengisian tempat (multiplication rule).",
              "Menyelesaikan masalah logistik rute jalan atau susunan bilangan menggunakan slot kosong."
            ]} />
            <ContentSection title="Aturan Perkalian">
              <p className="mb-4 text-text-secondary leading-relaxed">
                Kaidah perkalian menyatakan bahwa jika suatu tugas dapat dibagi menjadi k tahapan berurutan, di mana tahap 1 dapat diselesaikan dalam $n_1$ cara, tahap 2 dalam $n_2$ cara, ..., maka seluruh tugas dapat diselesaikan dalam:
              </p>
              <div className="bg-slate-50 p-4 rounded-lg font-mono text-center text-primary font-bold my-4 border border-border-main">
                Total Cara = n₁ × n₂ × ... × nₖ
              </div>
              <ExampleBox>
                <p className="font-semibold text-text-main mb-2">Contoh Sederhana Lintas Kota</p>
                <p className="text-text-secondary">Jika dari kota A ke B ada 3 pilihan jalan, dan dari B ke C ada 4 pilihan jalan, berapa banyak cara bepergian dari A ke C melalui kota B?</p>
                <p className="mt-2 text-primary font-bold">Jawab: 3 × 4 = 12 cara perjalanan yang berbeda.</p>
              </ExampleBox>
            </ContentSection>
          </>
        );

      case 'p3':
        return (
          <>
            <CourseHeader 
              title="Permutasi Semua & Sebagian Elemen"
              subtitle="Menyusun elemen dengan memperhatikan urutan sebagai pembeda hasil."
              level="Menengah"
              time="Estimasi: 18 menit"
            />
            <LearningObjectives objectives={[
              "Memahami konsep susunan berurutan (AB ≠ BA).",
              "Menggunakan rumus permutasi n objek diambil r elemen.",
              "Menghitung nilai faktorial secara cepat."
            ]} />
            <ContentSection title="Rumus Permutasi">
              <p className="mb-4 text-text-secondary leading-relaxed">
                Permutasi adalah penyusunan kembali suatu kumpulan objek dalam urutan yang berbeda dari semula. Pada permutasi, <strong>urutan sangat diperhatikan</strong>.
              </p>
              <FormulaBox 
                title="Permutasi Sebagian Elemen" 
                formula={
                  <div className="flex items-center gap-4">
                    <div className="font-bold text-primary">P(n,r) =</div>
                    <div className="flex flex-col items-center">
                      <span className="border-b-2 border-text-main pb-1 px-2">n!</span>
                      <span className="pt-1 px-2">(n - r)!</span>
                    </div>
                  </div>
                }
                desc="Banyaknya susunan r objek yang dipilih secara teratur dari populasi sebanyak n objek."
              />
              <ExampleBox>
                <p className="font-semibold text-text-main mb-2">Berapa banyak susunan huruf dari kata BOSAN?</p>
                <p className="mt-2 text-text-secondary">Kata BOSAN memiliki 5 huruf berbeda (n = 5), dan kita menyusun kelimanya (r = 5).</p>
                <p className="mt-2 text-text-secondary">P(5,5) = 5! / (5-5)! = 5! / 0! = 5 × 4 × 3 × 2 × 1 = 120 susunan.</p>
                <p className="mt-2 font-bold text-lg text-primary">Hasil = 120 susunan unik</p>
              </ExampleBox>
            </ContentSection>
          </>
        );

      case 'p4':
        return (
          <>
            <CourseHeader 
              title="Permutasi dengan Pengulangan & Melingkar"
              subtitle="Mempelajari permutasi pada objek yang sama dan posisi melingkar (siklis)."
              level="Menengah"
              time="Estimasi: 15 menit"
            />
            <LearningObjectives objectives={[
              "Menghitung permutasi dari sekumpulan objek yang memiliki elemen berulang.",
              "Menyelesaikan masalah susunan posisi melingkar pada meja makan bundar."
            ]} />
            <ContentSection title="Dua Aturan Permutasi Khusus">
              <ul className="list-disc pl-6 space-y-4 text-text-secondary mb-6">
                <li>
                  <strong>Permutasi dengan Pengulangan:</strong> Jika terdapat $n$ elemen, di mana $n_1$ adalah elemen jenis pertama yang sama, $n_2$ jenis kedua yang sama, ..., maka banyaknya susunan adalah:
                  <div className="font-mono text-primary font-bold my-2 text-center text-sm">P = n! / (n₁! · n₂! · ... · nₖ!)</div>
                </li>
                <li>
                  <strong>Permutasi Melingkar (Siklis):</strong> Banyaknya cara menyusun $n$ objek berbeda secara melingkar didefinisikan sebagai:
                  <div className="font-mono text-primary font-bold my-2 text-center text-sm">P_siklis = (n - 1)!</div>
                </li>
              </ul>
            </ContentSection>
          </>
        );

      case 'p5':
        return (
          <>
            <CourseHeader 
              title="Kombinasi & Sifat-Sifatnya"
              subtitle="Menyusun kelompok objek tanpa memperhatikan urutan susunan anggota."
              level="Menengah"
              time="Estimasi: 200 menit"
            />
            <LearningObjectives objectives={[
              "Memahami perbedaan utama kombinasi (urutan tidak penting) dibanding permutasi.",
              "Menggunakan rumus matematika kombinasi secara benar.",
              "Menggunakan kalkulator interaktif untuk mengecek jawaban kuis Anda."
            ]} />
            <ContentSection title="Rumus Kombinasi">
              <p className="mb-4 text-text-secondary leading-relaxed">
                Kombinasi adalah cara memilih anggota dari himpunan sehingga <strong>urutan tidak diperhatikan</strong> (Himpunan {"{A, B}"} sama dengan {"{B, A}"}).
              </p>
              <FormulaBox 
                title="Rumus Kombinasi" 
                formula={
                  <div className="flex items-center gap-4">
                    <div className="font-bold text-primary">C(n,r) =</div>
                    <div className="flex flex-col items-center border-l border-slate-300 pl-4">
                      <span className="text-xl">n</span>
                      <span className="text-xl">r</span>
                    </div>
                    <div className="font-normal text-text-secondary mx-2">=</div>
                    <div className="flex flex-col items-center">
                      <span className="border-b-2 border-text-main pb-1 px-2">n!</span>
                      <span className="pt-1 px-2">r! (n - r)!</span>
                    </div>
                  </div>
                }
              />
              <CombinatoricsVisualizer />
            </ContentSection>
          </>
        );

      case 'p6':
        return (
          <>
            <CourseHeader 
              title="Kombinasi dengan Pengulangan"
              subtitle="Menyeleksi objek ketika pengambilan boleh dilakukan berkali-kali pada item yang sama."
              level="Menengah"
              time="Estimasi: 15 menit"
            />
            <LearningObjectives objectives={[
              "Memahami masalah pemilihan kantong barang (kombinasi dengan pengulangan).",
              "Mengaplikasikan rumus bintang dan batang (stars and bars)."
            ]} />
            <ContentSection title="Kombinasi dengan Pengulangan">
              <p className="mb-4 text-text-secondary leading-relaxed">
                Kombinasi dengan pengulangan terjadi jika objek yang sama diperbolehkan dipilih lebih dari sekali. Rumus matematika untuk menyeleksi $r$ elemen dari total jenis $n$ dengan pengulangan adalah:
              </p>
              <div className="bg-slate-50 p-4 rounded-lg font-mono text-center text-primary font-bold my-4 border border-border-main text-lg">
                C'(n, r) = C(n + r - 1, r) = (n + r - 1)! / (r! · (n - 1)!)
              </div>
            </ContentSection>
          </>
        );

      case 'p7':
        return (
          <>
            <CourseHeader 
              title="Contoh Soal dan Pembahasan"
              subtitle="Bedah tuntas contoh studi kasus perbedaan permutasi dan kombinasi."
              level="Menengah"
              time="Estimasi: 15 menit"
            />
            <ContentSection title="Contoh Soal">
              <div className="space-y-4">
                <div className="p-4 border border-border-main rounded-lg bg-slate-50">
                  <p className="font-bold text-text-main mb-1">Soal 1 (Permutasi):</p>
                  <p className="text-sm text-text-secondary mb-2">Dari 10 mahasiswa berprestasi, akan dipilih 3 orang untuk menjadi Ketua, Sekretaris, dan Bendahara kelas. Berapa banyak susunan pengurus?</p>
                  <p className="text-sm font-semibold text-primary">Jawab: Karena jabatan berbeda, urutan penting. P(10,3) = 10! / 7! = 10 × 9 × 8 = 720 susunan.</p>
                </div>
                
                <div className="p-4 border border-border-main rounded-lg bg-slate-50">
                  <p className="font-bold text-text-main mb-1">Soal 2 (Kombinasi):</p>
                  <p className="text-sm text-text-secondary mb-2">Dari 10 mahasiswa berprestasi, akan didelegasikan 3 orang sebagai perwakilan seminar. Berapa banyak kelompok delegasi?</p>
                  <p className="text-sm font-semibold text-primary">Jawab: Karena kedudukan setara, urutan tidak penting. C(10,3) = 10! / (3! · 7!) = (10 × 9 × 8) / (3 × 2 × 1) = 120 kelompok.</p>
                </div>
              </div>
            </ContentSection>
          </>
        );

      case 'p8':
        return (
          <>
            <CourseHeader 
              title="Latihan Peluang dan Kombinatorika"
              subtitle="Uji pemahaman Anda tentang permutasi, kombinasi, dan kaidah perkalian."
              level="Menengah"
              time="Estimasi: 12 menit"
            />
            <ContentSection title="Latihan Cepat Mandiri">
              <p className="mb-6 text-text-secondary leading-relaxed">
                Jawablah kuis di bawah ini berdasarkan konsep faktorial dan permutasi yang telah dipelajari sebelumnya.
              </p>
              
              <QuizCard 
                question="Berapa banyak susunan huruf berbeda yang dapat dihasilkan jika Anda menyusun ulang seluruh huruf pada kata 'BOSAN'?"
                correctAnswer="120"
                explanation="Kata 'BOSAN' memiliki 5 huruf unik (n=5). Penyusunan secara utuh tanpa pengulangan mengikuti kaidah n!, yakni 5 faktorial = 5 × 4 × 3 × 2 × 1 = 120 susunan."
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
