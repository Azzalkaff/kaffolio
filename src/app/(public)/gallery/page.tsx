import { Metadata } from 'next';
import { getAllPortfolios } from '@/lib/mdx';
import PortfolioCard from '../developer/_components/PortfolioCard';
import { TypewriterText } from '@/components/shared/Typewriter';

export const metadata: Metadata = {
  title: 'Gallery | Kaffolio',
  description: 'Eksplorasi kumpulan proyek, eksperimen, dan karya terbaik dari Kaffolio.',
};

export default function GalleryPage() {
  const DUMMY_PORTFOLIOS = getAllPortfolios();
  return (
    <div className="max-w-6xl mx-auto space-y-12 py-16">
      <div className="text-center space-y-4">
        <h1 className="text-5xl md:text-6xl font-bold text-foreground">
          <TypewriterText text="Complete Gallery" />
        </h1>
        <p className="text-xl text-muted-foreground">Explore all my projects, case studies, and experiments.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {DUMMY_PORTFOLIOS.map((project) => (
          <PortfolioCard key={project.id} {...project} isAdmin={false} />
        ))}
      </div>
    </div>
  );
}
