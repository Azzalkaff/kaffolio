'use client';

import HeroTypewriter from '@/components/shared/HeroTypewriter';

export default function CreativeHero() {
  return (
    <HeroTypewriter 
      words={['design', 'art', 'creation', 'visual', 'digital']}
      prefixText={
        <>
          "I'm not <span className="font-semibold bg-primary/20 text-primary px-2 py-1 rounded-md">created</span> design,
          <br />
          but
        </>
      }
      suffixText={
        <>
          create <span className="italic font-serif text-primary">mine</span>."
        </>
      }
      description={
        <p>
          Every pixel has a story. I don't just craft beautiful visuals, but I weave narratives that bring your identity and vision to life in the digital world.
        </p>
      }
    />
  );
}
