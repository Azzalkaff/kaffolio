import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { getAllPortfolios } from '@/lib/mdx';
import FadeIn, { StaggerContainer, StaggerItem } from '@/components/shared/FadeIn';
import PortfolioCard from './PortfolioCard';
import DeveloperMarquee from './DeveloperMarquee';
import ProjectsGallery from './ProjectsGallery';

/**
 * Komponen untuk menampilkan daftar proyek atau portofolio.
 * Menggunakan pola "Minimalist Agency Grid" (2-Column Offset) dan Marquee Text.
 */
export default function ProjectsSection() {
  const portfolios = getAllPortfolios();
  const displayedPortfolios = portfolios.slice(0, 8); // Sebaiknya genap untuk grid 2-kolom

  return (
    <div className="w-full space-y-24 md:space-y-40">

      {/* Top Marquee */}
      <DeveloperMarquee />

      <div className="max-w-7xl mx-auto w-full px-4 md:px-8 lg:px-12 space-y-16 md:space-y-32">
        {/* Description */}
        <div className="flex flex-col gap-6 max-w-4xl">
          <p className="text-2xl md:text-4xl text-foreground font-serif italic leading-relaxed max-w-3xl">
            Selected works
          </p>
        </div>

        {/* The Interactive Filtered Grid Gallery */}
        <ProjectsGallery portfolios={displayedPortfolios} />

        {/* View All Projects Button */}
        {portfolios.length > 8 && (
          <FadeIn delay={0.4} direction="up" className="flex justify-center mt-32">
            <Link
              href="/gallery"
              className="group relative px-10 py-5 bg-foreground text-background rounded-full font-bold text-xl uppercase tracking-widest overflow-hidden transition-all hover:scale-105 active:scale-95"
            >
              <div className="absolute inset-0 bg-primary opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <span className="relative z-10 flex items-center gap-4 text-background">
                Explore The Archive
                <ArrowRight size={24} className="transition-transform duration-300 group-hover:translate-x-2" />
              </span>
            </Link>
          </FadeIn>
        )}
      </div>

      {/* Bottom Marquee */}
      <DeveloperMarquee reverse={true} />

    </div>
  );
}
