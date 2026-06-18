import { Metadata } from 'next';
import SectionWrapper from '@/components/shared/SectionWrapper';
import ConnectSection from '@/components/shared/ConnectSection';
import MarketingHero from './_components/MarketingHero';
import MarketingMarquee from './_components/MarketingMarquee';
import MarketingPhilosophy from './_components/MarketingPhilosophy';
import MarketingReviews from './_components/MarketingReviews';
import MarketingStats from './_components/MarketingStats';
import MarketingGallery from './_components/MarketingGallery';
import { getAllMarketingCampaigns } from '@/lib/mdx';

export const metadata: Metadata = {
  title: 'Digital Marketing | Syahid Alkaff',
  description: 'Data-driven marketing strategies, SEO, SEM, and growth campaigns.',
};

export default function MarketingPage() {
  const campaigns = getAllMarketingCampaigns();

  return (
    <main className="flex flex-col gap-16 pb-16 overflow-hidden">
      <section id="hero-marketing" className="w-full">
        <MarketingHero />
      </section>

      {/* Intersection Separator */}
      <MarketingMarquee />

      <MarketingStats />

      <SectionWrapper id="strategy">
        <MarketingPhilosophy />
      </SectionWrapper>

      <SectionWrapper id="campaigns">
        <MarketingGallery campaigns={campaigns} />
      </SectionWrapper>

      <SectionWrapper id="reviews">
        <MarketingReviews />
      </SectionWrapper>

      <SectionWrapper id="connect-marketing">
        <ConnectSection />
      </SectionWrapper>
    </main>
  );
}
