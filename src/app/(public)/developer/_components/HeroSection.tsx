import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import FadeIn from '@/components/shared/FadeIn';
import HeroIllustration from './HeroIllustration';

/**
 * Komponen utama Hero Section.
 * Menggunakan layout grid 2 kolom (asimetris) untuk estetika Brave Minimalism.
 * 
 * @returns {JSX.Element} Bagian Hero
 */
export default function HeroSection() {
  return (
    <section id="hero" className="min-h-[calc(100vh-4rem)] flex items-center px-4 md:px-8 lg:px-16 pt-16 md:pt-0">
      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 items-center">

        {/* Kolom Kiri: Tipografi Raksasa */}
        <div className="space-y-8 z-10">
          <FadeIn direction="up">
            <h1 className="text-4xl md:text-7xl lg:text-7xl font-black text-foreground leading-[1.1] tracking-tight">
              Hi, I&apos;m Kaffa.<br />
              A full-stack<br />
              developer.
            </h1>
          </FadeIn>

          <FadeIn delay={0.2} direction="up">
            <p className="text-xl md:text-2xl text-muted-foreground leading-relaxed max-w-xl">
              I work across <strong>visual communication</strong>, <strong>backend architecture</strong>, and <strong>customer insight</strong> to build meaningful web experiences, specializing in <strong>React</strong> and <strong>Next.js</strong>.
            </p>
          </FadeIn>

          <FadeIn delay={0.4} direction="up" className="flex flex-col sm:flex-row gap-4 pt-4">
            <Link
              href="#projects"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-primary text-primary-foreground rounded-full hover:bg-primary/90 transition-colors font-bold text-lg"
            >
              View Work
              <ArrowRight size={20} />
            </Link>
            <Link
              href="#about"
              className="inline-flex items-center justify-center px-8 py-4 border-2 border-border/50 text-foreground rounded-full hover:border-foreground/50 transition-colors font-bold text-lg"
            >
              About Me
            </Link>
          </FadeIn>
        </div>

        {/* Kolom Kanan: Ilustrasi */}
        <div className="w-full flex justify-center lg:justify-end">
          <HeroIllustration />
        </div>

      </div>
    </section>
  );
}
