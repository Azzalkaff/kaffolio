'use client';

import { motion } from 'framer-motion';

const SERVICES = [
  {
    title: 'Brand Identity',
    description: 'Logos, color palettes, typography, and brand guidelines that tell your story.',
  },
  {
    title: 'UI/UX Design',
    description: 'Intuitive and aesthetic interfaces for web and mobile applications.',
  },
  {
    title: 'Graphic Arts',
    description: 'Posters, social media kits, and marketing materials that grab attention.',
  },
  {
    title: 'Motion & 3D',
    description: 'Micro-interactions, Lottie animations, and 3D visual assets.',
  },
];

export default function CreativeServices() {
  return (
    <div className="w-full py-32 px-4 md:px-12 border-t border-border/30">
      <div className="max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24">
        
        <div className="lg:col-span-4">
          <h2 className="text-xs font-bold text-muted-foreground uppercase tracking-[0.2em] mb-6">
            Capabilities
          </h2>
          <p className="text-2xl md:text-4xl font-light text-foreground leading-tight tracking-tight">
            Everything you need to bring your vision to <span className="italic font-serif text-muted-foreground">life</span>.
          </p>
        </div>

        <div className="lg:col-span-8">
          <div className="flex flex-col">
            {SERVICES.map((service, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.8, delay: idx * 0.1 }}
                className="group border-b border-border/30 py-10 md:py-16 first:border-t flex flex-col md:flex-row md:items-baseline justify-between gap-6 hover:bg-muted/10 transition-colors px-4 -mx-4 rounded-xl cursor-default"
              >
                <div className="flex items-baseline gap-4 md:gap-8">
                  <span className="text-sm font-mono text-muted-foreground/40">0{idx + 1}</span>
                  <h3 className="text-2xl md:text-4xl lg:text-5xl font-black text-foreground tracking-tighter uppercase group-hover:text-primary transition-colors">
                    {service.title}
                  </h3>
                </div>
                <p className="text-lg text-muted-foreground md:max-w-xs leading-relaxed md:text-right">
                  {service.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
