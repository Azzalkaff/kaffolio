import { Code2, PenTool, Store, BookOpen } from 'lucide-react';
import Navigation from '@/components/layout/Navigation';
import BentoCard from './_components/BentoCard';
import MainHeroIllustration from './_components/MainHeroIllustration';
import FadeIn from '@/components/shared/FadeIn';

/**
 * Komponen halaman utama (Landing Page).
 * Direfaktor dari grid simetris 4 kolom menjadi Bento Grid Layout asimetris
 * dengan tipografi Hero yang masif untuk mencapai estetika Brave Minimalism.
 */
export default function MainHub() {
  const mainLinks = [
    { label: 'Developer', href: '/developer' },
    { label: 'Designer', href: '/creative' },
    { label: 'Shop', href: '/shop' },
    { label: 'Blog', href: '/blog' },
  ];

  return (
    <>
      <Navigation links={mainLinks} />

      <div className="min-h-screen pt-4 pb-24 flex flex-col items-center w-full relative z-10">

        {/* Massive Hero Statement */}
        <div className="w-full grid grid-cols-1 lg:grid-cols-[1.5fr_1fr] gap-8 lg:gap-12 items-center mb-16 md:mb-24 mt-8 md:mt-16">
          <div>
            <FadeIn direction="up">
              <h1 className="text-5xl md:text-6xl lg:text-8xl font-black text-foreground leading-[1] tracking-tighter">
                Building<br />
                digital<br />
                worlds<span className="text-primary">.</span>
              </h1>
            </FadeIn>
            <FadeIn delay={0.2} direction="up">
              <p className="text-xl md:text-2xl text-muted-foreground mt-8 max-w-2xl font-medium leading-relaxed">
                Kaffa Elghifari. Full-stack developer & creative thinker crafting premium web experiences pixel by pixel.
              </p>
            </FadeIn>
          </div>
          
          {/* Third-Party Abstract SVG Illustration */}
          <div className="hidden lg:flex justify-end w-full">
            <MainHeroIllustration />
          </div>
        </div>

        {/* Bento Grid Layout */}
        <div className="w-full grid grid-cols-1 md:grid-cols-3 md:grid-rows-[minmax(280px,auto)_minmax(280px,auto)] gap-6 md:gap-8">

          {/* Card 1: Developer (Wide) */}
          <BentoCard
            href="/developer"
            title="Software Engineering"
            icon={<Code2 size={100} strokeWidth={1} />}
            className="md:col-span-2"
            delay={0.3}
          >
            {/* Visual Decoration */}
            <div className="w-full h-full flex items-center justify-end pr-8 pt-12 select-none">
              <div className="text-foreground/5 dark:text-foreground/10 font-mono text-8xl md:text-[10rem] font-black tracking-tighter -rotate-6">
                {'</>'}
              </div>
            </div>
          </BentoCard>

          {/* Card 2: Creative (Tall) */}
          <BentoCard
            href="/creative"
            title="UI/UX Design"
            icon={<PenTool size={100} strokeWidth={1} />}
            className="md:col-span-1 md:row-span-2"
            delay={0.4}
          >
            <div className="w-full h-full flex items-end justify-center pb-8 opacity-30 select-none">
              <div className="w-32 h-32 md:w-48 md:h-48 rounded-full bg-gradient-to-tr from-primary to-transparent blur-3xl" />
            </div>
          </BentoCard>

          {/* Card 3: Shop */}
          <BentoCard
            href="/shop"
            title="Digital Shop"
            icon={<Store size={100} strokeWidth={1} />}
            className="md:col-span-1"
            delay={0.5}
          />

          {/* Card 4: Blog */}
          <BentoCard
            href="/blog"
            title="Writings"
            icon={<BookOpen size={100} strokeWidth={1} />}
            className="md:col-span-1"
            delay={0.6}
          />

        </div>
      </div>
    </>
  );
}
