'use client';

import { motion } from 'framer-motion';

interface DeveloperMarqueeProps {
  reverse?: boolean;
}

export default function DeveloperMarquee({ reverse = false }: DeveloperMarqueeProps) {
  return (
    <div className="w-[110%] -ml-[5%] relative z-30 overflow-hidden">
      <div className={`bg-foreground text-background py-4 flex whitespace-nowrap border-y-2 border-primary/20 shadow-2xl origin-center ${reverse ? 'rotate-2' : '-rotate-2'} scale-[1.01]`}>
        <motion.div
          animate={{ x: reverse ? ["-50%", "0%"] : ["0%", "-50%"] }}
          transition={{ repeat: Infinity, ease: "linear", duration: 30 }}
          className="flex items-center"
        >
          {Array(8).fill(0).map((_, i) => (
            <div key={i} className="flex items-center gap-6 md:gap-12 flex-shrink-0 px-3 md:px-6">
              <span className={`text-3xl md:text-5xl font-black uppercase tracking-tighter ${reverse ? 'text-transparent [-webkit-text-stroke:1px_currentColor]' : ''}`}>
                mbg - my bikinan gweh
              </span>
              <span className="text-primary text-2xl md:text-4xl">✦</span>
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
