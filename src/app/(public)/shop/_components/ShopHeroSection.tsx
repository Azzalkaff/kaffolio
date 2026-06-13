import FadeIn from '@/components/shared/FadeIn';

/**
 * Komponen utama Hero Section (The Hook).
 * Tipografi raksasa yang menyentuh pain point tanpa CTA agresif.
 */
export default function ShopHeroSection() {
  return (
    <div className="min-h-[80vh] flex flex-col justify-center items-center text-center px-4 md:px-8">
      <div className="max-w-5xl mx-auto space-y-12">
        <FadeIn direction="up">
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-black text-foreground leading-[1.1] tracking-tight">
            The digital world keeps us connected.
            <br />
            <span className="text-muted-foreground">Yet our minds have never been more cluttered.</span>
          </h1>
        </FadeIn>
        
        <FadeIn delay={0.4} direction="up" className="flex justify-center pt-16">
          <div className="w-1 h-32 bg-gradient-to-b from-primary to-transparent opacity-50"></div>
        </FadeIn>
      </div>
    </div>
  );
}
