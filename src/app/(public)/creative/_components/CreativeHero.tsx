'use client';

import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';
import Image from 'next/image';

const MOCK_IMAGES = [
  'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1000&auto=format&fit=crop', // Abstract liquid
  'https://images.unsplash.com/photo-1604871000636-074fa5117945?q=80&w=1000&auto=format&fit=crop', // Abstract art
  'https://images.unsplash.com/photo-1557672172-298e090bd0f1?q=80&w=1000&auto=format&fit=crop', // Gradient mesh
  'https://images.unsplash.com/photo-1550684848-fac1c5b4e853?q=80&w=1000&auto=format&fit=crop', // Dark geometric
];

export default function CreativeHero() {
  return (
    <div className="relative min-h-[90vh] w-full overflow-hidden flex items-center justify-center bg-background rounded-3xl mt-6 border border-border/50">
      {/* Background Masonry/Grid (Blurred slightly for depth) */}
      <div className="absolute inset-0 z-0 grid grid-cols-2 md:grid-cols-4 gap-4 p-4 opacity-30 blur-[2px] scale-105 pointer-events-none">
        {MOCK_IMAGES.map((src, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: i * 0.2 }}
            className={`relative rounded-2xl overflow-hidden ${
              i % 2 === 0 ? 'h-[40vh] md:h-[60vh]' : 'h-[30vh] md:h-[50vh] mt-10'
            }`}
          >
            <Image src={src} alt="Creative Background" fill className="object-cover" />
          </motion.div>
        ))}
      </div>

      {/* Overlay to ensure text readability */}
      <div className="absolute inset-0 z-10 bg-gradient-to-b from-background/50 via-background/80 to-background" />

      {/* Foreground Content */}
      <div className="relative z-20 text-center px-4 max-w-4xl mx-auto flex flex-col items-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="mb-6 inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/30 bg-primary/10 text-primary backdrop-blur-sm"
        >
          <Sparkles size={16} />
          <span className="text-sm font-medium tracking-wide uppercase">General Design Portfolio</span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: 'easeOut' }}
          className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tight text-foreground"
        >
          Crafting <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-purple-500">Visual</span> Identities
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4, ease: 'easeOut' }}
          className="mt-6 text-xl md:text-2xl text-muted-foreground max-w-2xl"
        >
          Where art direction meets digital innovation. I design experiences that communicate, captivate, and convert.
        </motion.p>
      </div>
    </div>
  );
}
