'use client';

import HeroTypewriter from '@/components/shared/HeroTypewriter';

export default function MarketingHero() {
  return (
    <HeroTypewriter 
      words={['growth', 'audiences', 'conversion', 'revenue', 'engagement']}
      prefixText={
        <>
          I don't just <span className="font-semibold bg-primary/20 text-primary px-2 py-1 rounded-md">build</span> products,
          <br />
          I scale
        </>
      }
      suffixText={
        <>
          and drive <span className="italic font-serif text-primary">results</span>.
        </>
      }
      description={
        <p>
          Data-driven strategies meet creative execution. As a Growth Engineer, I combine technical expertise with marketing psychology to turn traffic into loyal customers.
        </p>
      }
    />
  );
}
