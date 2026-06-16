'use client';

import { motion } from 'framer-motion';

interface PhilosophyStandardProps {
  title: string;
  quote: React.ReactNode;
}

export default function PhilosophyStandard({ title, quote }: PhilosophyStandardProps) {
  return (
    <div className="py-8 md:py-12 px-4 md:px-12 w-full border-t border-border/30">
      <div className="max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 items-start">
        
        {/* Left Column: Huge Pull Quote */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1 }}
          className="lg:col-span-8"
        >
          <h2 className="text-xs md:text-sm font-bold text-muted-foreground uppercase tracking-[0.3em] mb-6">
            {title}
          </h2>
          <div className="text-3xl md:text-5xl lg:text-6xl font-light leading-[1.2] text-foreground tracking-tight">
            {quote}
          </div>
        </motion.div>

      </div>
    </div>
  );
}
