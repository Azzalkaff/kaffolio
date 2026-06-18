import { Metadata } from 'next';
import SectionWrapper from '@/components/shared/SectionWrapper';
import HeroSection from './_components/HeroSection';
import AboutSection from './_components/AboutSection';
import ServicesSection from './_components/ServicesSection';
import ExperienceSection from './_components/ExperienceSection';
import ProjectsSection from './_components/ProjectsSection';
import CertificateSection from './_components/CertificateSection';
import ConnectSection from '@/components/shared/ConnectSection';

export const metadata: Metadata = {
  title: 'Developer Portfolio | Syahid Alkaff',
  description: 'Explore my projects, experience, and professional journey as a developer.',
};

export default function DeveloperPortfolio() {
  return (
    <main className="flex flex-col gap-24 pb-16 divide-y divide-border/50">
      <section id="hero">
        <HeroSection />
      </section>
      
      <SectionWrapper id="about">
        <AboutSection />
      </SectionWrapper>
      
      <SectionWrapper id="services">
        <ServicesSection />
      </SectionWrapper>
      
      <SectionWrapper id="experience">
        <ExperienceSection />
      </SectionWrapper>
      
      <SectionWrapper id="projects">
        <ProjectsSection />
      </SectionWrapper>
      
      <SectionWrapper id="certificate">
        <CertificateSection />
      </SectionWrapper>
      
      <SectionWrapper id="connect">
        <ConnectSection />
      </SectionWrapper>
    </main>
  );
}
