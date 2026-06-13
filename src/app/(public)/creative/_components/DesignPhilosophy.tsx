'use client';

import { motion } from 'framer-motion';

export default function DesignPhilosophy() {
  return (
    <div className="py-24 px-4 sm:px-6 flex items-center justify-center">
      <div className="max-w-4xl mx-auto text-center">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="text-sm font-bold text-muted-foreground uppercase tracking-widest mb-8"
        >
          Design Philosophy
        </motion.h2>

        <motion.p 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1, delay: 0.2 }}
          className="text-3xl md:text-5xl lg:text-6xl font-medium leading-tight text-foreground"
        >
          "Design is not just what it looks like and feels like. Design is how it <span className="italic text-primary">communicates</span>."
        </motion.p>

        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.6 }}
          className="mt-12 flex justify-center"
        >
          <div className="h-24 w-px bg-gradient-to-b from-primary/50 to-transparent rounded-full" />
        </motion.div>
      </div>
    </div>
  );
}
