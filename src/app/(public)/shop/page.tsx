import { Metadata } from 'next';
import SectionWrapper from '@/components/shared/SectionWrapper';
import ShopHeroSection from './_components/ShopHeroSection';
import ShopStoryNarrative from './_components/ShopStoryNarrative';
import ProductGridSection from './_components/ProductGridSection';
import ShopExternalPlatforms from './_components/ShopExternalPlatforms';
import ShopBenefitsSection from './_components/ShopBenefitsSection';
import ShopFAQSection from './_components/ShopFAQSection';
import ConnectSection from '@/components/shared/ConnectSection';

export const metadata: Metadata = {
  title: 'Digital Products Shop | Syahid Alkaff',
  description: 'Premium digital assets, UI kits, and templates for designers and developers.',
};

export default function DigitalShop() {
  return (
    <main className="flex flex-col gap-12 pb-16">
      <SectionWrapper id="shop-hero" className="!pt-0 border-t-0 pb-0">
        <ShopHeroSection />
      </SectionWrapper>


      
      <SectionWrapper id="products" className="pt-12">
        <ProductGridSection />
      </SectionWrapper>

      <SectionWrapper id="external-platforms" className="!pt-0 pb-0 border-t-0">
        <ShopExternalPlatforms />
      </SectionWrapper>
      
      <SectionWrapper id="benefits" className="pt-12">
        <ShopBenefitsSection />
      </SectionWrapper>
      
      <SectionWrapper id="faq">
        <ShopFAQSection />
      </SectionWrapper>

      <SectionWrapper id="connect">
        <ConnectSection />
      </SectionWrapper>
    </main>
  );
}
