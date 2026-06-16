import { Metadata } from 'next';
import { getAllPortfolios } from '@/lib/mdx';
import PortfolioCard from '../developer/_components/PortfolioCard';
import { TypewriterText } from '@/components/shared/Typewriter';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import ProjectsGallery from '../developer/_components/ProjectsGallery';

export const metadata: Metadata = {
  title: 'Gallery | Kaffolio',
  description: 'Eksplorasi kumpulan proyek, eksperimen, dan karya terbaik dari Kaffolio.',
};

export default function GalleryPage() {
  const DUMMY_PORTFOLIOS = getAllPortfolios();
  return (
    <div className="max-w-6xl mx-auto space-y-12 py-16 px-4 xl:px-0">
      <div className="relative text-center space-y-4 pt-16 md:pt-0">
        {/* Back Button */}
        <Link 
          href="/developer" 
          className="absolute left-0 top-0 md:top-3 group flex items-center gap-3 text-lg md:text-xl font-medium text-muted-foreground hover:text-primary transition-colors w-fit"
        >
          <ArrowLeft size={28} className="transition-transform group-hover:-translate-x-1" />
          Back to Profile
        </Link>

        <h1 className="text-5xl md:text-6xl font-bold text-foreground">
          <TypewriterText text="Complete Gallery" />
        </h1>
        <p className="text-xl text-muted-foreground">Explore all my projects, case studies, and experiments.</p>
      </div>

      <div className="mt-8">
        <ProjectsGallery portfolios={DUMMY_PORTFOLIOS} layoutType="standard" />
      </div>
    </div>
  );
}
