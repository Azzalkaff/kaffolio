import { Code2, PenTool, Store, BookOpen } from 'lucide-react';
import Navigation from '@/components/layout/Navigation';
import MainHeroText from './_components/MainHeroText';
import WheelMenu from './_components/WheelMenu';
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

      <div className="min-h-screen pt-4 pb-24 flex flex-col items-center w-full max-w-[1400px] mx-auto px-4 md:px-12 relative z-10">

        {/* Massive Hero Statement */}
        <div className="w-full grid grid-cols-1 lg:grid-cols-[1.5fr_1fr] gap-8 lg:gap-12 items-center mb-16 md:mb-24 mt-8 md:mt-16">
          <div className="flex flex-col justify-center">
            <MainHeroText />
          </div>

          {/* Interactive Wheel Menu */}
          <div className="flex justify-center lg:justify-end w-full mt-12 lg:mt-0">
            <FadeIn delay={0.4} className="w-full flex justify-center lg:justify-end">
              <WheelMenu />
            </FadeIn>
          </div>
        </div>

      </div>
    </>
  );
}
