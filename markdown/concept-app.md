# Product Requirements Document (PRD)
## Kaffolio (Portfolio & Gallery Preview Application)

**Versi:** 2.0 (Kaffolio Stack)  
**Status:** Approved Draft  
**Tanggal:** June 2026  

---

## 1. Executive Summary

Aplikasi **Kaffolio** telah berevolusi menjadi sebuah **Multi-Persona Hybrid Portfolio & Digital Empire**. Aplikasi ini bukan lagi sekadar halaman tunggal, melainkan sebuah hub sentral yang menaungi portofolio spesifik untuk *Developer*, *Designer/Creative*, *Content Marketing (Blog)*, dan *Katalog Produk Digital* (Shop). Sistem ini ditunjang oleh serverless API, basis data NoSQL (MongoDB) murni untuk pengkatalogan, dan *redirect* eksternal untuk pemrosesan pembayaran.

---

## 2. Objectives & Goals

### Primary Objectives
- Menyediakan platform untuk menampilkan portfolio dan gallery proyek secara profesional.
- Memastikan **Cloud Data Persistence** sehingga pembaruan dari perangkat manapun akan langsung sinkron secara global.
- Memberikan kontrol penuh dan aman (via *Authentication*) kepada developer untuk mengelola data portfolio.
- Menciptakan desain yang minimalis, modern, dan sangat dioptimasi untuk SEO (Search Engine Optimization).

### Success Metrics
- Performa kilat dengan First Contentful Paint (FCP) < 1.5 detik (Berkat *Server-Side Rendering/Caching* Next.js).
- Keamanan panel admin yang tangguh dari eksploitasi *client-side*.
- Manajemen gambar yang efisien tanpa membebani *bandwidth* database.

---

## 3. User Stories & Use Cases

### User Stories
**US-001: Developer dapat mengelola portfolio data**
`Sebagai developer, saya ingin dapat login secara aman untuk menambah, mengedit, dan menghapus portfolio items beserta unggahan gambarnya, sehingga saya dapat memperbarui gallery kapan saja.`

**US-002: User dapat melihat gallery portfolio**
`Sebagai pengunjung, saya ingin melihat semua proyek di gallery dengan pemuatan gambar (loading) yang cepat dan optimal.`

**US-003: Data persistance global (Cross-Device)**
`Sebagai admin, saya ingin data portofolio yang saya ubah melalui ponsel cerdas saya langsung tercermin ketika pengunjung membukanya di browser laptop mereka.`

---

## 4. Product Features

### 4.1 Core Features (Multi-Persona Routes)

#### 1. The Main Hub (`/`)
- **Deskripsi:** Halaman Lobi/Gerbang utama. Menampilkan Wheel Menu interaktif sebagai navigasi sentral ke 4 pilar bisnis (Developer, Creative, Shop, Blog).
- **Fitur Khusus:** Navigasi antarmuka dilengkapi dengan animasi transisi "Expanding Portal" (Ripple Effect membesar menutupi layar) yang ringan dan berjalan tanpa memerlukan Wrapper Global (KISS Principle).

#### 2. Developer Portfolio (`/developer`)
- **Deskripsi:** Portofolio teknis murni untuk HRD/Tech Recruiter. Berisi Tech Stack, GitHub projects, dan studi kasus arsitektur.
- **Komponen:** Hero, About, Services, Experience, Projects, Certificate, dan Connect.
- **Data Persistence:** Disimpan secara permanen di MongoDB.

#### 3. Creative & General Design Portfolio (`/creative` & `/creative/gallery`)
- **Deskripsi:** Portofolio visual komprehensif (*General Design*) untuk klien kreatif. Menggunakan *Native CSS Masonry Layout* dengan algoritma *Auto-Height* (`width: 100%, height: auto`) sehingga grid mengalir otomatis dan presisi mengikuti aspek rasio gambar asli tanpa sedikit pun terpotong.
- **Fokus Area:** Poster, Food Design, Branding, Digital Art, dll.
- **Komponen & Arsitektur Utama:** 
  - **Visual Hero:** Latar belakang hero section dinamis yang sekarang dilayani penuh melalui file lokal (*Next.js Local Assets*) untuk performa optimal.
  - **Dynamic Masonry Gallery (`/creative`):** Galeri awal yang dilengkapi fitur *Lightbox Modal* (layar penuh) dan filter kategori yang diekstraksi secara dinamis via *Javascript Set()* dari sumber data tunggal (DRY Principle).
  - **Pinterest Vibe Extended Gallery (`/creative/gallery`):** Halaman ekspansi mandiri khusus untuk menampilkan katalog visual tak terbatas dengan *vibe* ala Pinterest.
  - **Centralized Data Storage:** Seluruh data desain disimpan terpusat dalam `src/lib/creativeData.ts` sebagai *Single Source of Truth* (*Solid Principle*).

#### 4. Digital Products Shop (`/shop`)
- **Deskripsi:** Etalase produk digital (Katalog NoSQL).
- **Strategi Pembayaran:** Pemrosesan pembayaran dan *checkout* **didelegasikan** ke platform pihak ketiga (Etsy, Gumroad, Shopify). MongoDB murni hanya digunakan sebagai etalase visual (mencegah *technical debt*).

#### 5. Sistem Blog SEO (`/blog`)
- **Deskripsi:** Mesin *content marketing* untuk mendatangkan trafik organik dari pencarian Google melalui artikel dan tutorial.

#### 6. Link in Bio (`/links`)
- **Deskripsi:** Halaman super ringan berisi tautan afiliasi (TikTok/Shopee) dan kontak cepat, dirancang khusus untuk klik dari bio Instagram/TikTok.

#### 7. Full Gallery (`/gallery`)
- **Deskripsi:** Menampilkan semua portfolio items dan proyek dalam format grid komprehensif.
- **Komponen:** Portfolio items (Cloudinary Image Thumbnail, Project name, Date, Tech stack, Description).
- **Data Persistence:** 
  - Teks dan konfigurasi tersimpan di **MongoDB Atlas**.
  - File Gambar diunggah dan di-host di **Cloudinary**.
  - Admin (Developer) dapat melakukan CRUD melalui antarmuka yang diproteksi sesi otentikasi.

#### 8. Connect / Contact Section
- **Deskripsi:** Section contact/social media links yang diintegrasikan ke berbagai halaman (seperti `/developer`).
- **Data Persistence:** Pesan dari pengunjung (*Contact Form*) akan langsung disimpan ke dalam MongoDB dan dapat dilihat oleh Admin di *dashboard*.

### 4.2 Design System (Tailwind CSS v4)
- **Warna Pokok:** Hitam (#000000) dan Putih (#FFFFFF).
- **Tipografi:** Inter atau barisan font *sans-serif* modern.
- **Styling Framework:** Tailwind CSS secara penuh menggantikan metodologi CSS konvensional untuk mempercepat proses *styling*.

---

## 5. Data Model & Persistence

### 5.1 Data Structure (MongoDB Schema)

#### Portfolio Item
```typescript
{
  "_id": "ObjectId('...')",
  "slug": "proyek-e-commerce-nextjs", 
  "title": "E-Commerce App",
  "shortDescription": "Aplikasi e-commerce serba guna...",
  "longDescription": "<p>Teks panjang berisi markdown...</p>", 
  "startDate": "2024-01-01", 
  "completedDate": "2024-06-15",
  "isOngoing": false,
  "isFeatured": true,
  "role": "Fullstack Developer",
  "techStack": ["Next.js", "MongoDB", "Tailwind"], 
  "cloudinaryUrl": "https://res.cloudinary.com/.../image.jpg",
  "galleryUrls": [],
  "githubUrl": "https://github.com/...",
  "liveDemoUrl": "https://...",
  "figmaUrl": "",
  "youtubeUrl": "https://www.youtube.com/watch?v=..."
}
```

### 5.2 Data Persistence Strategy
- **Primary Storage:** MongoDB Atlas (M0 Free Cluster) dengan batasan 512MB (Cukup untuk jutaan karakter teks).
- **Media Storage:** Cloudinary CDN dengan batasan 25GB/Bulan.
- **Synchronization:** Terpusat (*Server-Side*). Semua pengunjung di seluruh dunia melihat satu sumber data yang sama.
- **Caching:** Dioptimalkan dengan fitur *Next.js Revalidation* agar kueri ke MongoDB ditekan ke angka terendah (menghemat kuota).

---

## 6. Technical Requirements

### 6.1 Technology Stack (Kaffolio Stack)
- **Frontend & Backend Framework:** Next.js (App Router) + React + TypeScript.
- **Styling & UI:** Tailwind CSS v4, Framer Motion (Animasi), Lucide React (Icons).
- **Database:** MongoDB Atlas (melalui Mongoose).
- **Media CDN:** Cloudinary.
- **Authentication:** NextAuth.js (Auth.js).
- **Deployment:** Vercel (mendukung Serverless Functions bawaan Next.js).

---

## 7. Admin/Developer Interface

### 7.1 Features untuk Developer
- **Media Upload:** Admin tidak lagi menempelkan *link* eksternal secara manual. Panel admin menyediakan tombol unggah file yang otomatis mendorong gambar ke Cloudinary dan menautkannya ke proyek.
- **Management:** Form lengkap untuk mengelola teks (Portofolio, Kontak, About).

### 7.2 Access Control (NextAuth)
- Endpoint API dan Panel Admin diamankan menggunakan pengecekan *Server Session*. Akses nakal via *Postman* atau manipulasi parameter URL (seperti `?admin=true`) tidak akan menembus lapis keamanan.

---

## 8. Acceptance Criteria

### Must Have (MVP)
- [ ] Implementasi Next.js App Router dengan 4 halaman utama (SSR/SSG).
- [ ] Koneksi MongoDB yang stabil (dengan *Caching Global Node.js*).
- [ ] Integrasi Cloudinary untuk form unggah gambar di Panel Admin.
- [ ] Pengecekan otentikasi login Admin menggunakan NextAuth.
- [ ] Validasi *Form Contact* dari *spam* dan menyimpan pesan ke database.

---

## 9. Constraints & Assumptions

### Constraints
- Mengandalkan konektivitas Cloud (Memerlukan internet bahkan saat pengembangan lokal).
- Beban Database bergantung pada batas *Free Tier* (512MB MongoDB dan 25GB Cloudinary), yang mana sangat lebih dari cukup untuk satu portofolio individu.

### Assumptions
- Seluruh infrastruktur web berjalan dalam batasan gratis selamanya ($0/month).
- SEO pada website akan meroket secara alami berkat *Server-Side Rendering* (SSR) dari Next.js.