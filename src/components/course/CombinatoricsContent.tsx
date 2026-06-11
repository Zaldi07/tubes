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
    <div className="rounded-2xl border border-border-main bg-white p-6 sm:p-8 shadow-sm my-8 w-full font-sans">
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

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-4 font-sans">
        <div className="space-y-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between bg-slate-50 p-4 rounded-xl border border-border-main">
              <div>
                <span className="text-xs font-bold text-text-secondary block mb-0.5 font-sans">TOTAL ELEMEN</span>
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
                <span className="text-xs font-bold text-text-secondary block mb-0.5 font-sans">ELEMEN DIPILIH</span>
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
            <span className="font-bold text-primary block uppercase tracking-wider font-sans">Langkah Rumus:</span>
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
                        className="px-1.5 py-0.5 rounded text-[10px] font-bold border border-slate-200 bg-slate-50 text-text-main"
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
  const [quizState, setQuizState] = useState<'idle' | 'started' | 'finished'>('idle');

  useEffect(() => {
    setQuizState('idle');
  }, [lessonId]);

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
            <MediaPlayerBase videoId="OwcAWYJ7w6g" title="Video: Peluang Diskrit & Kombinatorial" />
            <LearningObjectives objectives={[
              "Mendefinisikan ruang sampel (S) dan titik sampel dari suatu kejadian secara matematis.",
              "Memahami pengertian nilai kemungkinan/peluang suatu eksperimen matematika.",
              "Menghitung peluang teoretis sederhana dalam kehidupan sehari-hari."
            ]} />
            <ContentSection title="Ruang Sampel & Peluang Diskrit">
              <p className="mb-4 text-text-secondary leading-relaxed">
                Peluang (probabilitas) adalah ukuran numerik yang menunjukkan seberapa besar kemungkinan suatu kejadian akan terjadi. Nilai peluang selalu berkisar antara 0 (kejadian yang mustahil terjadi) dan 1 (kejadian yang pasti terjadi).
              </p>
              <p className="mb-4 text-text-secondary leading-relaxed font-sans">
                Dalam eksperimen diskrit, <strong>Ruang Sampel (<i>S</i>)</strong> didefinisikan sebagai himpunan semua hasil yang mungkin terjadi dari suatu percobaan. Setiap elemen di dalam <i>S</i> disebut sebagai <strong>Titik Sampel</strong>. Suatu <strong>Kejadian (<i>A</i>)</strong> adalah subset dari ruang sampel. Peluang terjadinya kejadian <i>A</i> didefinisikan secara matematis sebagai:
                <br /><code className="mx-2 px-1 py-0.5 bg-slate-100 rounded">P(A) = n(A) / n(S)</code>, di mana <i>n</i>(<i>A</i>) adalah jumlah hasil yang diinginkan, dan <i>n</i>(<i>S</i>) adalah jumlah total titik sampel dalam ruang sampel <i>S</i>.
              </p>
              <ExampleBox>
                <p className="font-semibold text-text-main mb-2">Contoh Pelemparan Dua Uang Logam</p>
                <p className="text-text-secondary leading-relaxed mb-2">
                  Jika kita melemparkan dua uang logam setimbang secara bersamaan, setiap uang logam memiliki sisi Angka (A) dan Gambar (G).
                  <br />Ruang Sampel: <i>S</i> = {"{(A,A), (A,G), (G,A), (G,G)}"}, sehingga <i>n</i>(<i>S</i>) = 4.
                </p>
                <p className="text-text-secondary leading-relaxed">
                  Berapa peluang mendapatkan setidaknya satu sisi Gambar?
                  <br />Kejadian <i>A</i> = {"{(A,G), (G,A), (G,G)}"}, sehingga <i>n</i>(<i>A</i>) = 3.
                  <br />Peluang: <i>P</i>(<i>A</i>) = <i>n</i>(<i>A</i>) / <i>n</i>(<i>S</i>) = 3/4 = 0.75 atau 75%.
                </p>
              </ExampleBox>
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
              "Memahami perbedaan mendasar aturan penjumlahan dan aturan perkalian dalam pencacahan.",
              "Menyelesaikan masalah penyusunan angka atau kode menggunakan slot kosong (filling slots)."
            ]} />
            <ContentSection title="Kaidah Dasar Pencacahan">
              <p className="mb-4 text-text-secondary leading-relaxed">
                Kaidah pencacahan (counting rules) adalah fondasi combinatorial yang membantu kita menghitung banyaknya cara menyusun objek tanpa harus mendaftarnya satu per satu. Ada dua kaidah dasar:
              </p>
              <ul className="list-disc pl-6 space-y-3 text-text-secondary mb-6 leading-relaxed">
                <li>
                  <strong>Aturan Penjumlahan (Sum Rule):</strong> Digunakan jika kita harus memilih satu objek dari beberapa pilihan yang bersifat <strong>saling lepas (mutually exclusive)</strong>. Jika tugas A dapat dilakukan dalam <i>p</i> cara dan tugas B dalam <i>q</i> cara, dan hanya satu tugas yang boleh dipilih, maka total cara adalah: <i>p</i> + <i>q</i> cara.
                </li>
                <li>
                  <strong>Aturan Perkalian (Product Rule):</strong> Digunakan jika suatu tugas terdiri dari beberapa tahapan berurutan yang <strong>semuanya harus diselesaikan</strong>. Jika tahap pertama dapat diselesaikan dalam <i>p</i> cara, dan tahap kedua dalam <i>q</i> cara, maka seluruh tugas dapat diselesaikan dalam: <i>p</i> × <i>q</i> cara.
                </li>
              </ul>
              <ExampleBox>
                <p className="font-semibold text-text-main mb-2">Contoh Pembuatan PIN Angka Tanpa Repetisi</p>
                <p className="text-text-secondary leading-relaxed mb-2">
                  Berapa banyak PIN 3 digit yang dapat dibuat menggunakan angka 1, 2, 3, 4, dan 5 jika <strong>tidak boleh ada angka yang berulang</strong>?
                </p>
                <p className="text-text-secondary leading-relaxed">
                  Kita sediakan 3 slot kosong: <span className="font-mono bg-slate-50 px-2 py-0.5 rounded border">[Slot 1] [Slot 2] [Slot 3]</span>.
                  <br />- Slot 1 (Digit Pertama): Dapat diisi oleh salah satu dari 5 angka (5 pilihan).
                  <br />- Slot 2 (Digit Kedua): Karena tidak boleh berulang, tersisa 4 angka yang tersedia (4 pilihan).
                  <br />- Slot 3 (Digit Ketiga): Tersisa 3 angka yang tersedia (3 pilihan).
                  <br />Total PIN berbeda yang dapat dibentuk: 5 × 4 × 3 = 60 PIN unik.
                </p>
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
            <MediaPlayerBase videoId="A-IR8nmjwKg" title="Video: Kaidah Pencacahan & Permutasi" />
            <LearningObjectives objectives={[
              "Memahami konsep susunan berurutan di mana urutan sangat penting (AB ≠ BA).",
              "Menggunakan rumus permutasi n objek diambil r elemen.",
              "Menghitung nilai faktorial secara cepat."
            ]} />
            <ContentSection title="Konsep & Rumus Permutasi">
              <p className="mb-4 text-text-secondary leading-relaxed">
                Permutasi adalah susunan yang dibentuk oleh sebagian atau seluruh objek dari suatu himpunan dengan <strong>memperhatikan urutan</strong>. Dalam permutasi, susunan AB dianggap berbeda dengan susunan BA.
              </p>
              <p className="mb-4 text-text-secondary leading-relaxed">
                Sebelum mempelajari rumusnya, kita harus memahami konsep <strong>Faktorial (!)</strong>. Untuk setiap bilangan bulat positif <i>n</i>, nilai <i>n</i>! didefinisikan sebagai perkalian berurutan dari 1 hingga <i>n</i>:
                <br /><code className="mx-2 px-1 py-0.5 bg-slate-100 rounded">n! = n × (n-1) × (n-2) × ... × 1</code>, dengan konvensi khusus 0! = 1.
              </p>
              <FormulaBox 
                title="Permutasi Sebagian Elemen P(n, r)" 
                formula={
                  <div className="flex items-center gap-4">
                    <div className="font-bold text-primary">P(n,r) =</div>
                    <div className="flex flex-col items-center">
                      <span className="border-b-2 border-text-main pb-1 px-2">n!</span>
                      <span className="pt-1 px-2">(n - r)!</span>
                    </div>
                  </div>
                }
                desc="Banyaknya cara menyusun r objek dari total populasi n objek yang tersedia."
              />
              <ExampleBox>
                <p className="font-semibold text-text-main mb-2">Pemilihan Pengurus Kelas</p>
                <p className="text-text-secondary leading-relaxed mb-2">
                  Dari 8 siswa berprestasi, akan dipilih 3 orang untuk mengisi posisi sebagai Ketua, Sekretaris, dan Bendahara kelas. Berapa banyak susunan pengurus yang mungkin terbentuk?
                </p>
                <p className="text-text-secondary leading-relaxed">
                  Karena jabatan berbeda, urutan susunan sangat penting (Ketua A, Sekr B, Bend C berbeda dengan Ketua B, Sekr A, Bend C). Oleh karena itu kita gunakan permutasi <i>P</i>(8, 3).
                  <br /><i>P</i>(8, 3) = 8! / (8 - 3)! = 8! / 5! = (8 × 7 × 6 × 5!) / 5! = 8 × 7 × 6 = 336 cara susunan.
                </p>
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
              "Menyelesaikan masalah susunan posisi melingkar (siklis) pada meja bundar."
            ]} />
            <ContentSection title="Dua Kasus Permutasi Khusus">
              <p className="mb-4 text-text-secondary leading-relaxed">
                Dalam praktiknya, terdapat kondisi khusus di mana objek yang akan disusun tidak semuanya unik, atau objek harus disusun melingkar:
              </p>
              <ul className="list-disc pl-6 space-y-4 text-text-secondary mb-6 leading-relaxed">
                <li>
                  <strong>Permutasi dengan Elemen Identik (Pengulangan):</strong> Jika dari <i>n</i> objek terdapat <i>n</i><sub>1</sub> objek jenis pertama yang sama, <i>n</i><sub>2</sub> objek jenis kedua yang sama, dan seterusnya hingga <i>n</i><sub>k</sub>, maka jumlah susunan permutasi unik adalah:
                  <div className="font-mono text-primary font-bold my-2 text-center text-sm bg-slate-50 p-2.5 rounded-lg border border-slate-100 max-w-sm mx-auto">
                    P = n! / (n₁! · n₂! · ... · nₖ!)
                  </div>
                </li>
                <li>
                  <strong>Permutasi Melingkar (Siklis):</strong> Digunakan saat objek harus disusun melingkar (seperti orang mengelilingi meja makan bundar). Karena titik awal lingkaran tidak bersifat absolut, salah satu elemen harus dikunci sebagai acuan. Rumusnya adalah:
                  <div className="font-mono text-primary font-bold my-2 text-center text-sm bg-slate-50 p-2.5 rounded-lg border border-slate-100 max-w-sm mx-auto">
                    P_siklis = (n - 1)!
                  </div>
                </li>
              </ul>
              <ExampleBox>
                <p className="font-semibold text-text-main mb-2">Contoh Kasus</p>
                <p className="text-text-secondary leading-relaxed mb-3 font-sans">
                  <strong>1. Elemen Identik:</strong> Berapa banyak susunan kata unik dari kata "SASA"?
                  <br /><i>n</i> = 4 huruf. Huruf 'S' muncul 2 kali, 'A' muncul 2 kali.
                  <br /><i>P</i> = 4! / (2! × 2!) = 24 / 4 = 6 susunan kata (yaitu: SASA, SAAS, SSAA, ASSA, ASAS, AASS).
                </p>
                <p className="text-text-secondary leading-relaxed font-sans">
                  <strong>2. Siklis:</strong> Jika 5 orang duduk melingkar di meja rapat, berapa banyak susunannya?
                  <br /><i>P</i><sub>siklis</sub> = (5 - 1)! = 4! = 4 × 3 × 2 × 1 = 24 susunan cara duduk.
                </p>
              </ExampleBox>
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
              time="Estimasi: 20 menit"
            />
            <LearningObjectives objectives={[
              "Memahami perbedaan utama kombinasi (urutan tidak penting) dibanding permutasi.",
              "Menggunakan rumus matematika kombinasi secara benar.",
              "Menggunakan visualisator interaktif untuk memvalidasi cara memilih kelompok."
            ]} />
            <ContentSection title="Konsep & Rumus Kombinasi">
              <p className="mb-4 text-text-secondary leading-relaxed font-sans">
                Kombinasi adalah proses pemilihan sebagian atau seluruh objek dari suatu himpunan <strong>tanpa memperhatikan urutan</strong>. Dalam kombinasi, susunan kelompok {"\\{A, B\\}"} dianggap sama dengan susunan {"\\{B, A\\}"}.
              </p>
              <FormulaBox 
                title="Rumus Kombinasi C(n, r)" 
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
                desc="Banyaknya cara memilih r objek dari total populasi n objek tanpa mempermasalahkan urutan susunan."
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
              "Mengaplikasikan rumus bintang dan batang (stars and bars) dalam membagi barang identik."
            ]} />
            <ContentSection title="Kombinasi dengan Pengulangan (Combination with Repetition)">
              <p className="mb-4 text-text-secondary leading-relaxed">
                Kombinasi dengan pengulangan terjadi ketika kita memilih <i>r</i> buah objek dari <i>n</i> jenis objek yang tersedia, di mana setiap jenis objek boleh dipilih berulang kali (lebih dari sekali). Masalah ini setara dengan mendistribusikan <i>r</i> buah barang identik ke dalam <i>n</i> buah wadah yang berbeda.
              </p>
              <p className="mb-4 text-text-secondary leading-relaxed">
                Rumus matematika untuk menghitung kombinasi dengan pengulangan ini adalah:
              </p>
              <div className="bg-slate-50 p-4 rounded-lg font-mono text-center text-primary font-bold my-4 border border-border-main text-lg max-w-lg mx-auto">
                C'(n, r) = C(n + r - 1, r) = (n + r - 1)! / (r! · (n - 1)!)
              </div>
              <ExampleBox>
                <p className="font-semibold text-text-main mb-2">Contoh Membeli Kue di Toko</p>
                <p className="text-text-secondary leading-relaxed mb-2 font-sans">
                  Sebuah toko menjual 3 jenis kue: Cokelat, Keju, dan Vanilla. Ibu ingin membeli 4 buah kue saja. Berapa banyak kombinasi kue yang dapat dibeli oleh Ibu?
                </p>
                <p className="text-text-secondary leading-relaxed font-sans">
                  Di sini, <i>n</i> = 3 jenis kue, dan <i>r</i> = 4 kue yang ingin dibeli. Karena Ibu bebas membeli jenis yang sama berkali-kali (misal: 4 kue cokelat semua), kita gunakan kombinasi dengan pengulangan <i>C'</i>(3, 4).
                  <br /><i>C'</i>(3, 4) = <i>C</i>(3 + 4 - 1, 4) = <i>C</i>(6, 4)
                  <br /><i>C</i>(6, 4) = 6! / (4! × 2!) = (6 × 5) / (2 × 1) = 15 kemungkinan kombinasi kue.
                </p>
              </ExampleBox>
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
            <ContentSection title="Analisis Perbandingan Kasus Nyata font-sans">
              <p className="mb-4 text-text-secondary leading-relaxed">
                Banyak siswa melakukan kesalahan karena kesulitan membedakan kapan harus menggunakan rumus Permutasi dan kapan harus menggunakan Kombinasi. Perhatikan tabel perbandingan berikut untuk memperjelas batasannya:
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6 font-sans">
                <div className="p-4 border border-border-main rounded-lg bg-slate-50">
                  <p className="font-bold text-text-main mb-2">Kasus Permutasi (Urutan Penting):</p>
                  <p className="text-xs text-text-secondary mb-3">Membuat susunan kepengurusan kelas (Ketua, Sekretaris, Bendahara), menyusun angka plat nomor kendaraan, menentukan juara 1, 2, dan 3 lomba.</p>
                  <p className="text-xs font-semibold text-primary font-mono">
                    P(10,3) = 10! / (10-3)! = 720 cara.
                  </p>
                </div>
                
                <div className="p-4 border border-border-main rounded-lg bg-slate-50">
                  <p className="font-bold text-text-main mb-2">Kasus Kombinasi (Urutan Diabaikan):</p>
                  <p className="text-xs text-text-secondary mb-3">Memilih tim delegasi perwakilan sekolah, mengambil 3 bola secara acak dari dalam kotak, memilih menu makanan dari kartu prasmanan.</p>
                  <p className="text-xs font-semibold text-primary font-mono">
                    C(10,3) = 10! / (3! · 7!) = 120 cara.
                  </p>
                </div>
              </div>
            </ContentSection>
          </>
        );

      case 'p8': {
        const probabilityQuizQuestions = [
          {
            question: "Berapa banyak susunan kata sandi berbeda yang terdiri dari 5 huruf dapat dibuat secara berurutan dari kata 'BOSAN'?",
            options: ["24 susunan", "60 susunan", "120 susunan", "720 susunan"],
            correctAnswer: "C",
            explanation: "Kata 'BOSAN' terdiri dari 5 huruf unik (n=5). Banyak susunan permutasi penuh adalah 5! = 5 × 4 × 3 × 2 × 1 = 120 susunan."
          },
          {
            question: "Berapakah banyak cara memilih 3 orang delegasi dari 10 mahasiswa berprestasi untuk menghadiri sebuah konferensi?",
            options: ["120 cara", "240 cara", "720 cara", "1000 cara"],
            correctAnswer: "A",
            explanation: "Karena kedudukan delegasi setara, urutan pemilihan tidak penting. Kita gunakan kombinasi C(10, 3) = 10! / (3! · 7!) = (10 × 9 × 8) / (3 × 2 × 1) = 120 cara."
          },
          {
            question: "Sebuah komite memiliki 6 anggota yang harus duduk melingkar dalam rapat di meja bundar. Berapa banyak susunan posisi duduk mereka?",
            options: ["720 susunan", "360 susunan", "120 susunan", "24 susunan"],
            correctAnswer: "C",
            explanation: "Menggunakan rumus permutasi siklis: P_siklis = (n - 1)! = (6 - 1)! = 5! = 5 × 4 × 3 × 2 × 1 = 120 susunan."
          },
          {
            question: "Dalam pelemparan sebuah dadu standar bermata enam, berapakah peluang munculnya mata dadu bernilai bilangan prima?",
            options: ["1/6", "1/3", "1/2", "2/3"],
            correctAnswer: "C",
            explanation: "Ruang sampel dadu S = {1, 2, 3, 4, 5, 6}, n(S) = 6. Titik sampel mata dadu prima A = {2, 3, 5}, n(A) = 3. Maka Peluang P(A) = n(A)/n(S) = 3/6 = 1/2."
          },
          {
            question: "Ada 3 rute bus dari kota A ke kota B, dan 4 rute bus dari kota B ke kota C. Berapa banyak cara bepergian dari A ke C melalui kota B?",
            options: ["7 cara", "12 cara", "24 cara", "64 cara"],
            correctAnswer: "B",
            explanation: "Kaidah perkalian (tahap berurutan): Total cara = rute A-B × rute B-C = 3 × 4 = 12 cara."
          },
          {
            question: "Berapa banyak susunan huruf berbeda yang dapat dibentuk dari huruf-huruf pada kata 'KATAK'?",
            options: ["120 susunan", "60 susunan", "30 susunan", "15 susunan"],
            correctAnswer: "C",
            explanation: "Menggunakan rumus permutasi dengan elemen identik. Kata 'KATAK' memiliki n = 5 huruf, huruf 'K' muncul 2 kali, huruf 'A' muncul 2 kali, huruf 'T' muncul 1 kali. P = 5! / (2! · 2!) = 120 / 4 = 30 susunan."
          },
          {
            question: "Apakah perbedaan mendasar antara permutasi dan kombinasi?",
            options: [
              "Permutasi digunakan untuk angka, kombinasi untuk huruf",
              "Permutasi memperhatikan urutan susunan, kombinasi mengabaikan urutan",
              "Permutasi selalu menghasilkan nilai lebih kecil dari kombinasi",
              "Permutasi memperbolehkan pengulangan, kombinasi tidak"
            ],
            correctAnswer: "B",
            explanation: "Perbedaan utama adalah urutan: permutasi memperhatikan urutan (AB ≠ BA), sedangkan kombinasi tidak memperhatikan urutan (AB = BA)."
          },
          {
            question: "Rumus kombinasi dengan pengulangan (memilih r objek dari n jenis objek dengan pengulangan diperbolehkan) didefinisikan sebagai...",
            options: ["C(n + r, r)", "C(n + r - 1, r)", "P(n + r - 1, r)", "C(n - 1, r)"],
            correctAnswer: "B",
            explanation: "Rumus kombinasi dengan pengulangan adalah C'(n, r) = C(n + r - 1, r)."
          },
          {
            question: "Berapakah nilai dari 0! (nol faktorial) menurut definisi matematika?",
            options: ["0", "1", "Tak Terdefinisi", "-1"],
            correctAnswer: "B",
            explanation: "Berdasarkan definisi matematis dan konsistensi rumus permutasi/kombinasi, nilai dari 0! disepakati bernilai 1."
          },
          {
            question: "Sebuah kantong berisi 5 bola merah dan 3 bola biru. Jika satu bola diambil secara acak, berapakah peluang terambilnya bola biru?",
            options: ["3/5", "5/8", "3/8", "1/8"],
            correctAnswer: "C",
            explanation: "Total bola n(S) = 5 + 3 = 8 bola. Jumlah bola biru n(A) = 3 bola. Maka Peluang terambil bola biru P(A) = n(A)/n(S) = 3/8."
          }
        ];
        return (
          <>
            {quizState === 'idle' ? (
              <>
                <CourseHeader 
                  title="Latihan Peluang dan Kombinatorika"
                  subtitle="Uji pemahaman Anda tentang permutasi, kombinasi, dan kaidah perkalian."
                  level="Menengah"
                  time="Estimasi: 15 menit"
                />
                <ContentSection title="Kuis Akhir Modul 2">
                  <p className="mb-6 text-text-secondary leading-relaxed font-sans">
                    Jawablah kuis evaluasi 10 pertanyaan di bawah ini untuk menguji penguasaan Anda atas materi Peluang, Permutasi, dan Kombinasi.
                  </p>
                  
                  <MultiQuestionQuiz 
                    onComplete={() => onCompleteLesson('p8')}
                    onStateChange={setQuizState}
                    questions={probabilityQuizQuestions}
                  />
                </ContentSection>
              </>
            ) : (
              <div className="pt-2 animate-in fade-in duration-500">
                <MultiQuestionQuiz 
                  onComplete={() => onCompleteLesson('p8')}
                  onStateChange={setQuizState}
                  questions={probabilityQuizQuestions}
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
