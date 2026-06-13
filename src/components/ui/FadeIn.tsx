'use client';

import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface FadeInProps {
  children: ReactNode;
  delay?: number;
}

/**
 * Komponen pembungkus (wrapper) untuk memberikan efek animasi scroll-reveal.
 * Menggunakan Framer Motion "whileInView" agar elemen muncul perlahan saat di-scroll.
 * Ditandai dengan "use client" agar mendukung interaktivitas, namun tetap bisa
 * membungkus Server Components.
 *
 * @param {FadeInProps} props - Menerima children dan opsi delay animasi
 * @returns {JSX.Element} Elemen div yang teranimasi
 */
export default function FadeIn({ children, delay = 0 }: FadeInProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.6, delay, ease: 'easeOut' }}
    >
      {children}
    </motion.div>
  );
}
