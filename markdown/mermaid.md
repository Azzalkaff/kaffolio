# Percabangan Import (Import Tree) di Next.js App Router

Di Next.js (terutama menggunakan App Router), arsitektur percabangan file atau *import tree* dirancang secara hierarkis (dari yang paling luas ke yang paling spesifik). 

Sistem ini mengikuti prinsip **Top-Down** dan **Modular**, di mana file di tingkat atas (seperti layout) membungkus file di bawahnya (seperti page), yang pada akhirnya akan merakit dan mengimpor komponen-komponen kecil serta data model dari folder lain.

Berikut adalah gambaran struktur *import* aktual dan lengkap dari proyek **Kaffolio** Anda, memetakan seluruh ekosistem App Router, API, Models, dan Komponen secara mendetail menggunakan visualisasi **Mermaid**:

```mermaid
graph LR
    %% Styling Classes
    classDef layout fill:#e1f5fe,stroke:#03a9f4,stroke-width:2px,color:#000;
    classDef page fill:#fff3e0,stroke:#ff9800,stroke-width:2px,color:#000;
    classDef component fill:#f3e5f5,stroke:#9c27b0,stroke-width:2px,color:#000;
    classDef section fill:#e8f5e9,stroke:#4caf50,stroke-width:2px,color:#000;
    classDef api fill:#ffebee,stroke:#f44336,stroke-width:2px,color:#000;
    classDef model fill:#fff9c4,stroke:#fbc02d,stroke-width:2px,color:#000;
    
    subgraph "App Router (Pages & Layouts)"
        RootLayout["📂 src/app/layout.tsx"]:::layout
        PageHome["📄 app/(public)/page.tsx"]:::page
        PageDev["📄 app/(public)/developer/page.tsx"]:::page
        PageBlog["📄 app/(public)/blog/page.tsx"]:::page
        PageBlogSlug["📄 app/(public)/blog/[slug]/page.tsx"]:::page
        PageCreative["📄 app/(public)/creative/page.tsx"]:::page
        PageGallery["📄 app/(public)/gallery/[slug]/page.tsx"]:::page
        PageLinks["📄 app/(public)/links/page.tsx"]:::page
        PageShop["📄 app/(public)/shop/page.tsx"]:::page
        PageAdmin["📄 app/admin/page.tsx"]:::page
    end

    subgraph "Components (UI & Sections)"
        Nav["🧩 layout/Navigation.tsx"]:::component
        FadeIn["🧩 ui/FadeIn.tsx"]:::component
        Card["🧩 ui/Card.tsx"]:::component
        
        DevHero["🧱 developer/_components/HeroSection.tsx"]:::section
        DevAbout["🧱 developer/_components/AboutSection.tsx"]:::section
        DevGallery["🧱 developer/_components/GallerySection.tsx"]:::section
        DevPortCard["🧩 developer/_components/PortfolioCard.tsx"]:::component
        
        ConnSec["🧱 shared/ConnectSection.tsx"]:::section
        Social["🧩 shared/SocialLinks.tsx"]:::component
        
        ExpList["🧩 profile/ExperienceList.tsx"]:::component
        Skills["🧩 profile/SkillsSection.tsx"]:::component
        
        BlogCard["🧩 blog/_components/BlogCard.tsx"]:::component
        AdminPanel["🧱 admin/_components/AdminPanel.tsx"]:::section
        
        FormContact["📝 forms/ContactForm.tsx"]:::component
        FormPort["📝 forms/PortfolioForm.tsx"]:::component
    end

    subgraph "Data & API (Lib/Models)"
        ApiPort["⚡ api/portfolio/route.ts"]:::api
        LibMongo["⚙️ lib/mongodb.ts"]:::api
        DummyData["💾 lib/dummyData.ts"]:::api
        ModelAbout["📋 models/About.ts"]:::model
        ModelContact["📋 models/Contact.ts"]:::model
        ModelPortfolio["📋 models/Portfolio.ts"]:::model
        ModelProfile["📋 models/Profile.ts"]:::model
    end

    %% Routing Flow (Layout to Pages)
    RootLayout --> Nav
    RootLayout --> PageHome
    RootLayout --> PageDev
    RootLayout --> PageBlog
    RootLayout --> PageBlogSlug
    RootLayout --> PageCreative
    RootLayout --> PageGallery
    RootLayout --> PageLinks
    RootLayout --> PageShop
    RootLayout --> PageAdmin

    %% Developer Page Flow
    PageDev --> DevHero
    PageDev --> DevAbout
    PageDev --> DevGallery
    PageDev --> ConnSec
    PageDev --> FadeIn

    %% Section to Component Flow
    DevAbout --> ExpList
    DevAbout --> Skills
    
    DevGallery --> DevPortCard
    DevGallery --> DummyData

    ConnSec --> Social
    
    %% Other flows based on App Router structure
    PageBlog --> BlogCard
    PageAdmin --> AdminPanel
    AdminPanel --> FormContact
    AdminPanel --> FormPort
    
    %% API & Database Flow
    ApiPort --> LibMongo
    ApiPort --> ModelPortfolio
```

---

### Penjelasan Setiap Lapisan (Layers) Aktual Proyek

1. **App Router Layer (Biru & Oranye)**
   *   `src/app/layout.tsx`: Bertindak sebagai *Master Wrapper* yang dipanggil pertama kali. Ini merender `<Navigation />` secara global.
   *   *Route Pages*: Meliputi semua entri URL seperti `/developer`, `/blog`, hingga `/admin`. Ini bertindak sebagai titik perakitan utama untuk setiap halaman.

2. **Section/Layout Component Layer (Hijau)**
   *   Berada dalam folder `_components` atau `shared` seperti `HeroSection`, `AboutSection`, `GallerySection`, dan `AdminPanel`. 
   *   Komponen-komponen ini berfungsi sebagai blok besar penopang tata letak spesifik halaman. Misalnya, `developer/page.tsx` menyusun *Sections* tersebut menjadi satu kesatuan.

3. **Specific Component Layer (Ungu)**
   *   Komponen UI murni dan lebih kecil (contoh: `SocialLinks`, `ExperienceList`, `BlogCard`, `FadeIn`). Komponen ini diimpor oleh *Section Component* dan seringkali dapat digunakan ulang di tempat lain.

4. **API & Data/Model Layer (Merah & Kuning)**
   *   `api/portfolio/route.ts` mengatur rute *backend*. Ini terhubung langsung dengan `lib/mongodb.ts` untuk koneksi basis data.
   *   Folder `models/` menyimpan definisi *schema* database MongoDB, yang akan digunakan oleh *API Routes* atau Server Actions.

### Kesimpulan
Pemetaan secara detail ini (dengan struktur *Left-to-Right*) secara presisi mewakili *file-system routing* aktual yang ada di dalam `src/`. Anda bisa melihat bagaimana kode dipecah (di-*split*) dalam grup rute spesifik, komponen spesifik rute (dalam folder `_components`), dan komponen modular *shared/global*.
