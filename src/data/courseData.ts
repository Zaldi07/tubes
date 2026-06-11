export interface Lesson {
  id: string;
  title: string;
  type: 'Video' | 'Bacaan';
  duration: string;
}

export interface CourseModule {
  id: string;
  title: string;
  lessons: Lesson[];
}

export const courseModules: CourseModule[] = [
  {
    id: 'boolean',
    title: 'Modul 1: Aljabar Boolean',
    lessons: [
      { id: 'b1', title: 'Pengantar Aljabar Boolean', type: 'Video', duration: '10 mnt' },
      { id: 'b2', title: 'Definisi Aljabar Boolean', type: 'Bacaan', duration: '12 mnt' },
      { id: 'b3', title: 'Aljabar Boolean 2-Nilai', type: 'Bacaan', duration: '15 mnt' },
      { id: 'b4', title: 'Ekspresi Boolean & Hukum-Hukum', type: 'Bacaan', duration: '15 mnt' },
      { id: 'b5', title: 'Fungsi Boolean & Bentuk Kanonik', type: 'Bacaan', duration: '18 mnt' },
      { id: 'b6', title: 'Rangkaian Logika (Gates)', type: 'Bacaan', duration: '15 mnt' },
      { id: 'b7', title: 'Penyederhanaan & Peta Karnaugh', type: 'Video', duration: '20 mnt' },
      { id: 'b8', title: 'Latihan Aljabar Boolean', type: 'Bacaan', duration: '15 mnt' },
    ]
  },
  {
    id: 'probability',
    title: 'Modul 2: Peluang & Kombinatorika',
    lessons: [
      { id: 'p1', title: 'Teori Kemungkinan & Nilai Tempat', type: 'Video', duration: '12 mnt' },
      { id: 'p2', title: 'Aturan Pengisian Tempat', type: 'Bacaan', duration: '15 mnt' },
      { id: 'p3', title: 'Permutasi Semua & Sebagian Elemen', type: 'Video', duration: '18 mnt' },
      { id: 'p4', title: 'Permutasi dengan Pengulangan & Melingkar', type: 'Bacaan', duration: '15 mnt' },
      { id: 'p5', title: 'Kombinasi & Sifat-Sifatnya', type: 'Bacaan', duration: '20 mnt' },
      { id: 'p6', title: 'Kombinasi dengan Pengulangan', type: 'Bacaan', duration: '15 mnt' },
      { id: 'p7', title: 'Contoh Soal dan Pembahasan', type: 'Bacaan', duration: '15 mnt' },
      { id: 'p8', title: 'Latihan Peluang dan Kombinatorika', type: 'Bacaan', duration: '15 mnt' },
    ]
  },
  {
    id: 'graph',
    title: 'Modul 3: Graf',
    lessons: [
      { id: 'g1', title: 'Pengantar Teori Graf', type: 'Video', duration: '12 mnt' },
      { id: 'g2', title: 'Graf Isomorfik & Syaratnya', type: 'Bacaan', duration: '15 mnt' },
      { id: 'g3', title: 'Matriks Ketetanggaan', type: 'Video', duration: '15 mnt' },
      { id: 'g4', title: 'Graf Planar & Teorema Kuratowski', type: 'Bacaan', duration: '18 mnt' },
      { id: 'g5', title: 'Graf Bidang & Rumus Euler', type: 'Video', duration: '15 mnt' },
      { id: 'g6', title: 'Graf Dual & Cara Membentuknya', type: 'Bacaan', duration: '15 mnt' },
      { id: 'g7', title: 'Penerapan Graf dalam Teknologi', type: 'Bacaan', duration: '15 mnt' },
      { id: 'g8', title: 'Latihan Teori Graf', type: 'Bacaan', duration: '15 mnt' },
    ]
  }
];
