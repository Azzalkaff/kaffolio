import { Metadata } from 'next';
import SectionWrapper from '@/components/shared/SectionWrapper';
import ConnectSection from '@/components/shared/ConnectSection';
import CreativeHero from './_components/CreativeHero';
import DesignPhilosophy from './_components/DesignPhilosophy';
import BentoGallery from './_components/BentoGallery';
import CreativeServices from './_components/CreativeServices';

export const metadata: Metadata = {
  title: 'Creative Portfolio | Kaffa Elghifari',
  description: 'A visual exploration of brand identity, graphic arts, motion design, and UI/UX.',
};

export default function CreativePortfolio() {
  return (
    <main className="flex flex-col gap-16 pb-16">
      <section id="hero-creative" className="px-4 sm:px-6">
        <CreativeHero />
      </section>

      <SectionWrapper id="philosophy">
        <DesignPhilosophy />
      </SectionWrapper>

      <SectionWrapper id="gallery">
        <BentoGallery />
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
