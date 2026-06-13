# Standard Operating Procedure (SOP) & Technical Restrictions (Kaffolio Stack)

Dokumen ini berisi aturan teknis yang **sangat spesifik, konkret, dan terukur (actionable)** untuk proyek **Kaffolio** (Next.js App Router, TypeScript, MongoDB, Cloudinary, Tailwind CSS). AI wajib mematuhi seluruh batasan teknis ini tanpa terkecuali untuk memastikan *Clean Code*, *Type Safety*, *Security*, dan *Low Cognitive Load*.

## 1. Batasan Teknis & Aturan Konkret (Technical Restrictions)
Untuk mewujudkan "Beban Kognitif Rendah", AI **WAJIB** menerapkan batasan berikut:
- **Maksimal *Nesting* 2 Tingkat:** Jangan pernah membuat indentasi logika `if/else` atau `for/while` lebih dari 2 level mendalam. Wajib gunakan pola **Guard Clauses (Early Returns)** untuk menangani kondisi error/edge case di awal fungsi.
- **Batas Panjang Fungsi:** Satu fungsi tidak boleh lebih dari **30-50 baris** kode. Jika lebih, wajib dipecah menjadi *helper functions* terpisah.
- **Batas Parameter Fungsi:** Maksimal **3 parameter** per fungsi. Jika lebih dari 3, kelompokkan parameter tersebut menjadi satu *object* (atau `interface` di TypeScript).
- **Larangan "Magic Numbers / Strings":** Angka atau string literal yang memiliki makna spesifik wajib diekstrak menjadi konstanta dengan huruf kapital (`UPPER_SNAKE_CASE`).
- **Strict TypeScript (No Implicit `any`):** DILARANG KERAS menggunakan tipe `any` atau membiarkan variabel tanpa tipe. Setiap fungsi, parameter, state, dan *props* wajib didefinisikan menggunakan `interface` atau `type`.

## 2. Keamanan & Arsitektur Sistem Kaffolio (CRITICAL)
Karena Kaffolio menggunakan integrasi multi-layanan (Next.js, MongoDB, Cloudinary), aturan keamanan berikut **HARGA MATI**:
- **Koneksi MongoDB Serverless:** Pada ekosistem Vercel/Serverless, koneksi ke Mongoose **WAJIB** di-cache di *global variable* Node.js. Dilarang memanggil `mongoose.connect()` secara naif di setiap *request* API, karena akan membuat *Cluster MongoDB Free Tier* Anda meledak (*Connection Limit Reached*).
- **Larangan Base64 untuk Gambar:** DILARANG KERAS menyimpan gambar dalam bentuk string Base64 ke dalam MongoDB. Semua unggahan gambar **wajib** dikirim ke **Cloudinary**. MongoDB HANYA boleh menyimpan URL (*string*) gambar dari Cloudinary.
- **Pengamanan Endpoint API (NextAuth):** Semua *Endpoint API* yang memodifikasi data (POST, PUT, DELETE) WAJIB diawali dengan pengecekan sesi admin menggunakan fungsi NextAuth (misal: `getServerSession()`). Jangan percaya pada perlindungan UI saja.
- **Kebocoran Environment Variables:** Rahasia database (`MONGODB_URI`) dan rahasia login (`NEXTAUTH_SECRET`) **dilarang keras** diberi awalan `NEXT_PUBLIC_` karena akan terekspos ke *browser* pengunjung.
- **Validasi Input Ekstrem:** Dilarang menyimpan payload `req.body` mentah-mentah ke *database* . Wajib lakukan validasi tipe data (menggunakan Mongoose Schema yang ketat atau Zod) untuk mencegah injeksi NoSQL atau data kotor.

## 3. SOP Eksekusi AI (Standard Operating Procedure)
Saat menerima instruksi dari user, AI **WAJIB** mengikuti langkah-langkah berikut:
1. **Analisis Pendekatan (Plan):** Tuliskan 1-2 kalimat secara spesifik tentang *file* apa saja yang akan diubah dan fungsi apa yang akan ditambahkan.
2. **Zero Placeholders Rule:** DILARANG KERAS merespons dengan `// ... sisa kode di sini ...`. Seluruh modifikasi *code block* harus diberikan secara spesifik dan presisi.
3. **Isolasi Perubahan (Surgical Edits):** Jangan pernah melakukan *formatting* ulang atau mengubah baris kode yang tidak ada hubungannya dengan fitur atau *bug* yang sedang dikerjakan.
- Format kode yang dibagikan atau ditampilkan harus menggunakan sintaks menyoroti (*syntax highlighting*) yang tepat.
- **Dilarang menggunakan Emoji di UI:** Hindari penggunaan emoji (seperti 🚀, 💻, dll) pada penamaan kategori, tombol, atau navigasi di antarmuka pengguna untuk menjaga estetika profesional korporat (B2B). Gunakan ikon SVG atau font ikon (Lucide/Devicon) sebagai gantinya.
4. **Verifikasi Asumsi:** Dilarang berhalusinasi mengimpor *library* tanpa memastikan ia sudah terinstal di proyek.

## 4. Aturan Khusus Next.js & React (App Router)
- **Server Components vs Client Components:** Secara *default*, semua komponen Next.js adalah *Server Components*. Gunakan `"use client";` di baris 1 HANYA jika komponen tersebut membutuhkan interaktivitas (`useState`, `useEffect`, `onClick`, atau manipulasi DOM).
- **Pemisahan Logika UI & Bisnis:** Komponen `.tsx` HANYA BOLEH berisi logika presentasional. Pengambilan data (*data fetching*) yang kompleks wajib dilakukan di *Server Component*, API Routes, atau melalui *Custom Hooks* jika di *Client*.
- **Optimasi Caching (ISR/SSG):** Manfaatkan fitur *Caching* bawaan Next.js. Karena *portfolio* jarang berubah setiap detik, gunakan `revalidate` untuk mengambil data, sehingga performa *load* menjadi instan dan menghemat kuota *read* MongoDB Atlas.
- **Routing Next.js:** Wajib menggunakan `<Link href="...">` dari `next/link` untuk navigasi antarmalaman.

## 5. Aturan Khusus Backend API & MongoDB
- **Standardisasi API Response:** Semua Endpoint (di dalam `app/api/.../route.ts`) WAJIB mengembalikan *response JSON* yang standar.
  ```typescript
  return NextResponse.json({ success: true, data: result }, { status: 200 });
  return NextResponse.json({ success: false, error: "Pesan error" }, { status: 400 });
  ```
- **Model Mongoose TS:** Semua *Schema* Mongoose wajib dipasangkan dengan `interface` TypeScript agar sinkron saat digunakan di Frontend maupun Backend.

## 6. SOP Penamaan (Naming Conventions) yang Kaku
- **Variabel Boolean:** WAJIB diawali dengan kata kerja kondisional: `is`, `has`, `should`, `can` (Contoh: `isModalOpen`).
- **Fungsi Event Handler:** WAJIB diawali dengan kata `handle` untuk fungsinya (contoh: `handleSubmit`), dan menggunakan awalan `on` untuk *props* fungsinya (contoh: `onSubmit`).
- **TypeScript Types & Interfaces:** 
  - `interface` wajib diawali kapital (PascalCase), contoh: `PortfolioProps`, `UserDocument`.
- **Format Penamaan Spesifik:**
  - Fungsi, Variabel lokal: `camelCase`
  - React Components: `PascalCase` (File berakhiran `.tsx`, misal: `AdminPanel.tsx`)
  - File *helper*, *hooks*, utilitas: `camelCase` (File berakhiran `.ts`, misal: `useAuth.ts`)
  - File *Routing* Next.js: Wajib menggunakan nama standar Next.js (huruf kecil): `page.tsx`, `layout.tsx`, `route.ts`.

## 7. SOP Penanganan Error (Error Handling)
- **Dilarang Blok Catch Kosong:** Setiap blok `catch (error)` WAJIB minimal memiliki `console.error(error)`. Tidak boleh menelan error dalam diam (*silent failure*).
- **Validasi Nilai Opsional:** Gunakan *Optional Chaining* (`?.`) dan memberikan nilai *fallback* (*Nullish Coalescing* `??`) untuk *property object* yang bisa kosong.
- **UI Error Feedback (Wajib UX):** Di *Client Component*, setiap *error* krusial WAJIB dipetakan menjadi interaksi UI yang terlihat (seperti pesan peringatan merah).

## 8. SOP Dokumentasi (JSDoc & File Headers)
AI **WAJIB** menyertakan "Kotak Komentar" (Docblocks / JSDoc) yang didukung tipe TypeScript pada:
- **Header Fungsi & Komponen:** Setiap deklarasi fungsi utama atau komponen kompleks WAJIB diawali dengan blok komentar JSDoc.

**Contoh Format yang Diwajibkan:**
```typescript
/**
 * Mengambil data portofolio dari MongoDB Atlas.
 * Di-cache menggunakan mekanisme Next.js untuk menghemat read capacity.
 * 
 * @param {string} userId - ID unik pengguna
 * @returns {Promise<PortfolioProps[]>} Array dari objek portofolio
 */
export async function getPortfolio(userId: string): Promise<PortfolioProps[]> {
  // Implementasi
}
```
