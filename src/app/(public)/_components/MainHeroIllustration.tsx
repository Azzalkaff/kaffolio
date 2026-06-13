import FadeIn from '@/components/shared/FadeIn';

/**
 * Komponen untuk menampilkan ilustrasi SVG pihak ketiga di Hero Section Utama.
 * Menggunakan gaya abstrak/geometris untuk mencerminkan "Digital Worlds"
 * dan selaras dengan tema Brave Minimalism.
 */
export default function MainHeroIllustration() {
  return (
    <FadeIn delay={0.4} direction="up" className="relative w-full h-[300px] lg:h-[400px] flex items-center justify-center">
      {/* Latar Belakang Dekoratif Abstrak */}
      <div className="absolute inset-0 bg-primary/10 rounded-full blur-3xl transform scale-125 -z-10" />
      
      {/* Container Gambar */}
      <div className="relative w-full max-w-sm aspect-square flex flex-col items-center justify-center p-4 group">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img 
          src="https://api.dicebear.com/9.x/notionists/svg?seed=Felix&size=400" 
          alt="Abstract Digital World Illustration"
          className="w-full h-full drop-shadow-2xl transition-transform duration-700 group-hover:scale-110 group-hover:rotate-3"
        />
      </div>
    </FadeIn>
  );
}
