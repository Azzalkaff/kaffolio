export interface Portfolio {
  id: string;
  slug: string;
  title: string;
  shortDescription: string;
  completedDate?: string;
  isOngoing: boolean;
  isFeatured: boolean;
  techStack: string[];
  cloudinaryUrl: string;
  githubUrl?: string;
  liveDemoUrl?: string;
  youtubeUrl?: string;
  background?: string;
  challenges?: string;
  solutions?: string;
  results?: string;
}

export const DUMMY_PORTFOLIOS: Portfolio[] = [
  {
    id: '1',
    slug: 'aplikasi-web-hris',
    title: 'Aplikasi Web HRIS (Human Resource)',
    shortDescription: 'Aplikasi berbasis web untuk mengelola absensi, penggajian, dan cuti karyawan secara terpusat dengan antarmuka yang responsif.',
    completedDate: '2025-10-20',
    isOngoing: false,
    isFeatured: true,
    techStack: ['Next.js', 'TypeScript', 'PostgreSQL', 'Prisma'],
    cloudinaryUrl: 'https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=1000&auto=format&fit=crop', // Office meeting / team
    githubUrl: 'https://github.com/example/web-hris',
    liveDemoUrl: 'https://hris-demo.com',
  },
  {
    id: '2',
    slug: 'aplikasi-web-ecommerce',
    title: 'Aplikasi Web E-Commerce B2B',
    shortDescription: 'Platform e-commerce berbasis web modern dengan sistem keranjang belanja interaktif dan integrasi payment gateway.',
    completedDate: '2025-06-15',
    isOngoing: false,
    isFeatured: true,
    techStack: ['React', 'Node.js', 'MongoDB', 'Tailwind CSS'],
    cloudinaryUrl: 'https://images.unsplash.com/photo-1472851294608-062f824d29cc?q=80&w=1000&auto=format&fit=crop', // E-commerce / Shopping
    githubUrl: 'https://github.com/example/web-ecommerce',
    liveDemoUrl: 'https://ecommerce-demo.com',
  },
  {
    id: '3',
    slug: 'aplikasi-web-akademik',
    title: 'Aplikasi Web Sistem Akademik (SIAKAD)',
    shortDescription: 'Portal web untuk mahasiswa dan dosen mengelola jadwal kuliah, nilai, dan KRS dengan keamanan data tingkat tinggi.',
    isOngoing: true,
    isFeatured: false,
    techStack: ['Vue.js', 'Express', 'MySQL'],
    cloudinaryUrl: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?q=80&w=1000&auto=format&fit=crop', // University / Students
  },
  {
    id: '4',
    slug: 'aplikasi-web-reservasi',
    title: 'Aplikasi Web Reservasi Hotel',
    shortDescription: 'Sistem booking hotel berbasis web dengan fitur pencarian ketersediaan kamar secara real-time dan dashboard admin.',
    completedDate: '2026-02-10',
    isOngoing: false,
    isFeatured: true,
    techStack: ['Next.js', 'PostgreSQL', 'Stripe'],
    cloudinaryUrl: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=1000&auto=format&fit=crop', // Hotel / Resort
  },
  {
    id: '5',
    slug: 'aplikasi-web-dashboard',
    title: 'Aplikasi Web Dashboard Analitik',
    shortDescription: 'Aplikasi web internal untuk memvisualisasikan data penjualan perusahaan menggunakan grafik interaktif dan report otomatis.',
    completedDate: '2024-11-05',
    isOngoing: false,
    isFeatured: false,
    techStack: ['React', 'Chart.js', 'Firebase'],
    cloudinaryUrl: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1000&auto=format&fit=crop', // Dashboard / Analytics
  },
  {
    id: '6',
    slug: 'aplikasi-web-manajemen-tugas',
    title: 'Aplikasi Web Manajemen Tugas',
    shortDescription: 'Web app produktivitas dengan fitur Kanban board, notifikasi real-time, dan kolaborasi tim secara live.',
    isOngoing: true,
    isFeatured: false,
    techStack: ['React', 'Socket.io', 'Node.js'],
    cloudinaryUrl: 'https://images.unsplash.com/photo-1507925922873-b4e1e147900f?q=80&w=1000&auto=format&fit=crop', // Task management / Planner
  },
];

export interface Article {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  date: string;
  readTime: string;
}

export const DUMMY_ARTICLES: Article[] = [
  {
    id: '1',
    slug: 'mengatasi-hydration-error-nextjs',
    title: 'Cara Mengatasi Hydration Error di Next.js App Router',
    excerpt:
      'Hydration error sering menjadi momok bagi developer Next.js pemula. Pelajari cara mengidentifikasi dan memperbaikinya dalam hitungan menit.',
    content:
      'Ini adalah konten lengkap untuk artikel mengenai Hydration Error. Biasanya terjadi ketika ada perbedaan struktur HTML antara hasil render di Server (SSR) dan apa yang di-render ulang oleh React di Client (Browser). Salah satu penyebab tersering adalah menempatkan tag <p> di dalam tag <p>, atau perbedaan format zona waktu.',
    date: '12 Okt 2025',
    readTime: '4 min read',
  },
  {
    id: '2',
    slug: 'panduan-ui-ux-b2b',
    title: 'Panduan Praktis Desain UI/UX untuk Aplikasi B2B (Corporate)',
    excerpt:
      'Mendesain untuk korporat (B2B) sangat berbeda dengan B2C. Hindari animasi berlebihan dan fokus pada kejelasan data.',
    content:
      'Mendesain aplikasi untuk pengguna bisnis menuntut kejelasan informasi, bukan sekadar estetika. Di aplikasi B2C seperti e-commerce, Anda bisa bebas menggunakan animasi yang heboh. Namun di B2B, seperti sistem ERP, pengguna membutuhkan kepadatan data. Jika Anda memaksakan desain B2C ke B2B, pengguna akan kelelahan saat menggunakannya setiap hari.',
    date: '05 Okt 2025',
    readTime: '6 min read',
  },
];
