import FadeIn from '@/components/shared/FadeIn';

export default function ShopStoryNarrative() {
  return (
    <div className="py-24 max-w-4xl mx-auto px-4 text-center space-y-32">
      {/* The Problem Narrative */}
      <FadeIn direction="up" className="space-y-8">
        <p className="text-2xl md:text-4xl text-muted-foreground leading-relaxed font-medium">
          Every day, you're bombarded with endless notifications. Trying to be productive, yet trapped in the illusion of "being busy." Money slips away untracked, and time feels shorter than ever.
        </p>
      </FadeIn>

      {/* The Reveal Narrative */}
      <FadeIn direction="up" delay={0.2} className="space-y-12">
        <div className="flex flex-col items-center justify-center gap-6">
          <div className="w-16 h-1 bg-primary rounded-full"></div>
          <h2 className="text-3xl md:text-5xl font-black text-foreground leading-tight">
            It's Time to Take Back<br className="hidden md:block" /> Control of Your Life.
          </h2>
          <p className="text-xl md:text-2xl text-muted-foreground leading-relaxed max-w-2xl">
            A system that actually works is one that doesn't add to your mental load. Discover the premium tools designed specifically to free you from digital chaos.
          </p>
        </div>
      </FadeIn>
    </div>
  );
}
