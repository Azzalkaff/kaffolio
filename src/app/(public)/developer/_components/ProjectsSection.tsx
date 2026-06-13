import Link from 'next/link';
import { ArrowRight, ExternalLink, Search } from 'lucide-react';
import { getAllPortfolios } from '@/lib/mdx';
import FadeIn, { StaggerContainer, StaggerItem } from '@/components/shared/FadeIn';
import { TypewriterText } from '@/components/shared/Typewriter';
import PortfolioCard from './PortfolioCard';

/**
 * Komponen untuk menampilkan daftar proyek atau portofolio.
 * Menggunakan MDX files untuk sumber data.
 * 
 * @returns {JSX.Element} Bagian proyek dengan grid layout
 */
export default function ProjectsSection() {
  const portfolios = getAllPortfolios();

  return (
    <div className="space-y-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h2 className="text-4xl md:text-5xl font-bold text-foreground">
          <TypewriterText text="Projects" />
        </h2>
        <p className="text-lg text-muted-foreground">Explore my latest case studies and works</p>
      </div>

      {/* Search Bar Placeholder */}
      <FadeIn delay={0.2} direction="up" className="relative max-w-md mx-auto">
        <input
          type="text"
          placeholder="Search projects..."
          className="w-full px-6 py-3 border border-border/50 rounded-lg focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary text-base bg-background"
          disabled
        />
        <Search
          className="absolute right-4 top-1/2 transform -translate-y-1/2 text-muted-foreground"
          size={20}
        />
      </FadeIn>

      {/* Portfolio Grid */}
      <FadeIn delay={0.3} direction="up">
        <p className="text-center text-muted-foreground mb-6">
          Showing {portfolios.length} project{portfolios.length !== 1 ? 's' : ''}
        </p>
      </FadeIn>
      <StaggerContainer staggerChildren={0.15} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {portfolios.map((project) => (
          <StaggerItem key={project.id}>
            <PortfolioCard {...project} isAdmin={false} />
          </StaggerItem>
        ))}
      </StaggerContainer>
    </div>
  );
}
