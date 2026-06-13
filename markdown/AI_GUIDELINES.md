# Panduan AI (AI Guidelines) untuk Proyek Kaffolio

File ini berfungsi sebagai pedoman utama bagi *AI Coding Assistants* yang berkontribusi dalam repositori ini. Setiap tindakan, pembuatan komponen, atau perbaikan *bug* yang dilakukan AI harus mematuhi aturan berikut agar integritas aplikasi tetap terjaga.

## 1. Identitas & Tech Stack
Proyek ini adalah web portofolio canggih yang dibangun dengan teknologi berikut:
- **Framework**: Next.js 16+ (Hanya menggunakan **App Router**).
- **Bahasa**: TypeScript (Wajib menerapkan *strong typing*).
- **Styling**: Tailwind CSS.
- **Database**: MongoDB (via Mongoose).
- **Ikonografi**: `simple-icons` (untuk logo *brand*) & `lucide-react` (untuk *UI icons* standar).

## 2. Aturan Next.js App Router (Sangat Penting)
- **Routing Module**: JANGAN PERNAH mengimpor dari `next/router`. Selalu gunakan `next/navigation` untuk komponen klien (seperti `useRouter`, `usePathname`).
- **Server vs Client Components**: 
  - Seluruh komponen secara default adalah **Server Components**.
  - Hanya gunakan direktif `'use client'` pada komponen *leaf* (ujung) yang benar-benar membutuhkan interaktivitas pengguna (seperti state `useState`, `useEffect`, form handling, atau event `onClick`).
- **Data Fetching**: Lakukan pemanggilan data langsung di dalam Server Component jika memungkinkan.

## 3. Struktur Direktori & Komponen
Struktur aplikasi dipetakan menggunakan pola *Top-Down Modular*:
- **Page Sections**: Komponen besar spesifik untuk satu halaman diletakkan di dalam folder `_components` berdekatan dengan halamannya. (Contoh: `src/app/(public)/developer/_components/AboutSection.tsx`).
- **Shared Components**: Komponen *reusable* secara global diletakkan di `src/components/`.
- **Backend**: API *routes* diletakkan di `src/app/api/...` dan definisi *schema* database diletakkan di `src/models/`.

## 4. Aturan Styling & UI
- Maksimalkan penggunaan kelas *utility* Tailwind CSS murni. Hindari penulisan kode CSS kustom tambahan di file `globals.css` kecuali untuk inisialisasi variabel tema global (seperti palet warna).
- Saat menggunakan gambar, lebih disarankan memakai `<Image />` dari `next/image` untuk *lazy-loading* dan optimasi ketimbang tag `<img>` standar.

## 5. Keamanan & Akses Data
- **Environment Variables**: Jangan pernah menulis (*hardcode*) kredensial rahasia seperti *MongoDB URI* atau *Secret Keys* ke dalam file proyek. Selalu baca dari `process.env`.
- Semua *Route API* yang berhubungan dengan MongoDB harus memastikan bahwa utilitas koneksi database (seperti `src/lib/mongodb.ts`) sudah dipanggil terlebih dahulu sebelum menjalankan *query*.
