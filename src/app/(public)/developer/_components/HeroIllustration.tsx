import FadeIn from '@/components/shared/FadeIn';

/**
 * Komponen untuk menampilkan ilustrasi SVG dari pihak ketiga.
 * Memisahkan logika rendering visual untuk menjaga prinsip SRP.
 * 
 * @returns {JSX.Element} Ilustrasi Hero
 */
export default function HeroIllustration() {
  return (
    <FadeIn delay={0.3} direction="up" className="relative w-full h-[400px] lg:h-[600px] flex items-center justify-center">
      {/* Latar Belakang Dekoratif Abstrak */}
      <div className="absolute inset-0 bg-primary/5 rounded-full blur-3xl transform scale-150 -z-10" />

      {/* Container Gambar */}
      <div className="relative w-full max-w-lg aspect-square flex flex-col items-center justify-center p-8 group">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="https://api.dicebear.com/9.x/notionists/svg?seed=Syahid&size=400"
          alt="Developer Illustration"
          className="w-full h-full drop-shadow-xl transition-transform duration-700 group-hover:scale-105"
        />

      </div>
    </FadeIn>
  );
}
