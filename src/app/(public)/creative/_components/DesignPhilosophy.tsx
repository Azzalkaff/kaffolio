'use client';

import PhilosophyStandard from '@/components/shared/PhilosophyStandard';

export default function DesignPhilosophy() {
  return (
    <PhilosophyStandard 
      title="Design Philosophy"
      quote={
        <>
          "Design is not just what it looks like. Design is how it <span className="italic font-serif text-muted-foreground">communicates</span>."
        </>
      }
    />
  );
}
