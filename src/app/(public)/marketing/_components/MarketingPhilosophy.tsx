'use client';

import PhilosophyStandard from '@/components/shared/PhilosophyStandard';

export default function MarketingPhilosophy() {
  return (
    <PhilosophyStandard 
      title="Marketing Strategy"
      quote={
        <>
          "Good marketing makes the company look smart. <span className="italic font-serif text-primary">Great marketing</span> makes the customer feel smart."
        </>
      }
    />
  );
}
