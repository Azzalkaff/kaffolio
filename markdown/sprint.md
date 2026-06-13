# Kaffolio Development Sprints

**Penting:** Selama pengeksekusian setiap Sprint di bawah ini, seluruh kode dan arsitektur wajib mengacu pada dua dokumen sakral berikut:
1. **[Coding Standard (SOP)](file:///c:/Pemrograman/Web/Portofolio/kaffolio/markdown/coding_standard.md)** - Panduan teknis penulisan kode, keamanan, dan *best practices*.
2. **[Concept App (PRD)](file:///c:/Pemrograman/Web/Portofolio/kaffolio/markdown/concept-app.md)** - Dokumen persyaratan produk dan arsitektur data.

Dokumen ini memecah pengembangan aplikasi **Kaffolio** menjadi *Sprints* (siklus kerja) yang terukur dan berurutan. Setiap *Sprint* difokuskan pada satu area spesifik arsitektur. Jangan melompat ke Sprint berikutnya sebelum Sprint saat ini selesai sepenuhnya.

---

## 🏃 Sprint 1: Fondasi Proyek & Konfigurasi (Project Setup)
**Tujuan:** Membangun kerangka aplikasi, mengamankan variabel lingkungan, dan memastikan koneksi dasar berjalan.
- [ ] Inisiasi proyek Next.js dengan App Router dan TypeScript.
- [ ] Instalasi dependensi (`lucide-react`, `mongoose`, `next-auth`).
- [ ] Setup struktur folder (`app/api`, `components`, `models`).
- [ ] Pembuatan `.env.local` untuk MONGODB_URI dan NEXTAUTH_SECRET.
- [ ] Membuat *helper file* koneksi MongoDB (`src/lib/mongodb.ts`) dengan *global caching* untuk mencegah *memory leak*.

---

## 🏃 Sprint 2: Pemodelan Data & Tipe (Data Modeling)
**Tujuan:** Menerjemahkan kebutuhan data Kaffolio ke dalam format yang dipahami MongoDB dan TypeScript.
- [ ] Membuat Mongoose Schema & TypeScript Interface untuk **Portfolio Item**.
- [ ] Membuat Mongoose Schema & TypeScript Interface untuk **Contact Messages**.
- [ ] Membuat Mongoose Schema & TypeScript Interface untuk **Profile & Social Links**.
- [ ] Mengekspor *Interface* tersebut agar bisa digunakan oleh *Frontend* (UI).

---

## 🏃 Sprint 3: Migrasi Antarmuka Pengguna (UI Migration)
**Tujuan:** Memindahkan desain Visual dari proyek lama (Vite) ke Next.js dengan tipe data yang ketat.
- [ ] Memindahkan komponen presentasional statis (Card, SocialLinks) dan mengubahnya menjadi `.tsx` **dengan menggunakan Interface dari Sprint 2**.
- [ ] Memperbarui `Navigation.tsx` untuk menggunakan `<Link href>` dari Next.js.
- [ ] Membangun layout utama (`app/layout.tsx`) dan menyisipkan navigasi agar persisten.
- [ ] Memindahkan halaman (Introduction, About, Gallery, Connect) ke dalam App Router Next.js (`page.tsx` di masing-masing folder).
- [ ] Memastikan `npm run dev` berjalan mulus dan menampilkan *dummy data* (berstatus *Client/Static UI* sementara).

---

## 🏃 Sprint 4: Lapisan Keamanan & Autentikasi (Backend Auth)
**Tujuan:** Mengamankan pintu masuk khusus untuk Anda (Admin) agar bisa mengelola portofolio.
- [ ] Menyiapkan konfigurasi NextAuth (`app/api/auth/[...nextauth]/route.ts`).
- [ ] Menentukan metode login (Sangat disarankan menggunakan *Credentials Provider* dengan *password* kuat di `.env` atau *Google Provider* eksklusif).
- [ ] Melindungi halaman UI `/admin` agar hanya bisa diakses setelah sesi login NextAuth divalidasi.
- [ ] Melindungi *API Endpoint* agar aksi CRUD di-*reject* jika bukan admin yang meminta.

---

## 🏃 Sprint 5: Backend API & Operasi CRUD (Data Handling)
**Tujuan:** Membangun *Router API* untuk membaca dan menyimpan data ke MongoDB.
- [ ] Membuat API Endpoint `GET /api/portfolio` (Untuk menampilkan data ke pengunjung dengan *caching* Next.js).
- [ ] Membuat API Endpoint `POST, PUT, DELETE /api/portfolio` (Untuk admin mengelola data).
- [ ] Membuat API Endpoint `POST /api/contact` (Untuk menyimpan pesan masuk dari halaman Connect).
- [ ] Menghubungkan halaman Gallery di *frontend* agar mengambil data asli dari API Route tersebut.

---

## 🏃 Sprint 6: Integrasi Awan Media (Cloudinary)
**Tujuan:** Mengganti input manual URL gambar dengan sistem unggah otomatis (Upload File).
- [ ] Membuat akun Cloudinary dan mengonfigurasi *Upload Preset* yang aman.
- [ ] Memodifikasi komponen `PortfolioForm.tsx` (di Panel Admin) untuk menerima input file gambar sesungguhnya.
- [ ] Menulis logika klien untuk mengirim gambar ke Cloudinary, menerima URL balasan, dan menyimpan URL tersebut ke database.

---

## 🏃 Sprint 7: Poles Akhir & Deployment (Finalization)
**Tujuan:** Mengoptimalkan aplikasi untuk diluncurkan ke dunia maya.
- [ ] Menyempurnakan Metadata SEO (*Title*, *Description*, *OpenGraph*) di `app/layout.tsx` dan `page.tsx`.
- [ ] Menerapkan *Error Handling* UI (Toast Notifications/Peringatan Merah) jika API gagal.
- [ ] Memastikan tidak ada peringatan TypeScript atau aturan *coding standard* yang dilanggar.
- [ ] Menguji coba performa (Lighthouse).
- [ ] Mendorong (*Push*) kode ke GitHub dan melakukan *Deploy* ke **Vercel** secara gratis.
