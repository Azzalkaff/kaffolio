import { Metadata } from 'next';
import SectionWrapper from '@/components/shared/SectionWrapper';
import ConnectSection from '@/components/shared/ConnectSection';
import CreativeHero from './_components/CreativeHero';
import CreativeMarquee from './_components/CreativeMarquee';
import DesignPhilosophy from './_components/DesignPhilosophy';
import BentoGallery from './_components/BentoGallery';
import CreativeServices from './_components/CreativeServices';
import { getAllCreativeProjects } from '@/lib/mdx';

export const metadata: Metadata = {
  title: 'Creative Portfolio | Kaffa Elghifari',
  description: 'A visual exploration of brand identity, graphic arts, motion design, and UI/UX.',
};

export default function CreativePortfolio() {
  const creativeProjects = getAllCreativeProjects();

  return (
    <main className="flex flex-col gap-16 pb-16 overflow-hidden">
      <section id="hero-creative" className="w-full">
        <CreativeHero />
      </section>

      {/* Intersection Separator */}
      <CreativeMarquee />

      <SectionWrapper id="philosophy">
        <DesignPhilosophy />
      </SectionWrapper>

      <SectionWrapper id="gallery">
        <BentoGallery initialProjects={creativeProjects} />
      </SectionWrapper>

      <SectionWrapper id="services">
        <CreativeServices />
      </SectionWrapper>

      <SectionWrapper id="connect-creative">
        <ConnectSection />
      </SectionWrapper>
    </main>
  );
}
