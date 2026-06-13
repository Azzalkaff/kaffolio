'use client';

import { motion } from 'framer-motion';
import { PenTool, Layout, Box, Aperture } from 'lucide-react';

const SERVICES = [
  {
    title: 'Brand Identity',
    description: 'Logos, color palettes, typography, and brand guidelines that tell your story.',
    icon: <Aperture size={32} />,
    color: 'from-blue-500/20 to-purple-500/20',
  },
  {
    title: 'UI/UX Design',
    description: 'Intuitive and aesthetic interfaces for web and mobile applications.',
    icon: <Layout size={32} />,
    color: 'from-emerald-500/20 to-teal-500/20',
  },
  {
    title: 'Graphic Arts',
    description: 'Posters, social media kits, and marketing materials that grab attention.',
    icon: <PenTool size={32} />,
    color: 'from-orange-500/20 to-red-500/20',
  },
  {
    title: 'Motion & 3D',
    description: 'Micro-interactions, Lottie animations, and 3D visual assets.',
    icon: <Box size={32} />,
    color: 'from-pink-500/20 to-rose-500/20',
  },
];

export default function CreativeServices() {
  return (
    <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 py-24">
      <div className="text-center mb-16">
        <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">Capabilities</h2>
        <p className="text-xl text-muted-foreground">Everything you need to bring your vision to life.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {SERVICES.map((service, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: idx * 0.1 }}
            className="group relative overflow-hidden rounded-3xl bg-card border border-border p-8 hover:border-primary/50 transition-colors"
          >
            <div className={`absolute inset-0 bg-gradient-to-br ${service.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
            
            <div className="relative z-10">
              <div className="w-16 h-16 rounded-2xl bg-secondary flex items-center justify-center text-primary mb-6 group-hover:scale-110 transition-transform duration-300">
                {service.icon}
              </div>
              <h3 className="text-2xl font-bold text-card-foreground mb-3">{service.title}</h3>
              <p className="text-muted-foreground leading-relaxed">
                {service.description}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
