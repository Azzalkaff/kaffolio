import { Variants } from 'framer-motion';

export type Direction = 'up' | 'down' | 'left' | 'right' | 'none';

/**
 * Helper internal untuk menentukan titik awal (offset) animasi
 */
const getDirectionOffset = (direction: Direction, distance: number = 40) => {
  switch (direction) {
    case 'up': return { y: distance, x: 0 };
    case 'down': return { y: -distance, x: 0 };
    case 'left': return { x: distance, y: 0 };
    case 'right': return { x: -distance, y: 0 };
    default: return { x: 0, y: 0 };
  }
};

/**
 * 1. FADE (Muncul Perlahan)
 */
export const fade = (duration: number = 0.5, delay: number = 0): Variants => ({
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration, delay, ease: 'easeOut' } }
});

/**
 * 2. SLIDE & FADE (Bergeser & Muncul)
 */
export const slideFade = (direction: Direction = 'up', distance: number = 40, duration: number = 0.5, delay: number = 0): Variants => ({
  hidden: { opacity: 0, ...getDirectionOffset(direction, distance) },
  visible: { opacity: 1, x: 0, y: 0, transition: { duration, delay, ease: 'easeOut' } }
});

/**
 * 3. ZOOM (Membesar / Mengecil)
 */
export const zoom = (type: 'in' | 'out' = 'in', duration: number = 0.5, delay: number = 0): Variants => ({
  hidden: { opacity: 0, scale: type === 'in' ? 0.8 : 1.2 },
  visible: { opacity: 1, scale: 1, transition: { duration, delay, ease: 'backOut' } }
});

/**
 * 4. FLIP (Rotasi 3D)
 * Efek seperti membalikkan kartu
 */
export const flip = (axis: 'x' | 'y' = 'y', duration: number = 0.6, delay: number = 0): Variants => ({
  hidden: { opacity: 0, rotateX: axis === 'x' ? -90 : 0, rotateY: axis === 'y' ? -90 : 0 },
  visible: { opacity: 1, rotateX: 0, rotateY: 0, transition: { duration, delay, ease: 'easeOut' } }
});

/**
 * 5. BOUNCE (Pegas / Pantulan)
 * Mirip Slide Fade, namun pergerakannya memantul (spring physics)
 */
export const bounce = (direction: Direction = 'up', distance: number = 50, delay: number = 0): Variants => ({
  hidden: { opacity: 0, ...getDirectionOffset(direction, distance) },
  visible: { 
    opacity: 1, x: 0, y: 0, 
    transition: { type: 'spring', stiffness: 100, damping: 10, delay } 
  }
});

/**
 * 6. PULSE (Detak Jantung)
 * Terus menerus membesar dan mengecil (Infinity).
 * Digunakan pada properti `animate`, bukan `variants` biasa.
 */
export const pulse = (duration: number = 1.5): Variants => ({
  animate: {
    scale: [1, 1.05, 1],
    transition: { duration, repeat: Infinity, ease: "easeInOut" }
  }
});

/**
 * 7. SHAKE / WOBBLE (Bergetar)
 * Biasanya untuk menandakan error atau mencari perhatian.
 */
export const shake = (duration: number = 0.5): Variants => ({
  animate: {
    x: [0, -10, 10, -10, 10, 0],
    transition: { duration }
  }
});

/**
 * 8. STAGGER CONTAINER (Orkestrasi Parent)
 * Memunculkan anak-anaknya (StaggerItem) satu per satu.
 */
export const staggerContainer = (staggerChildren: number = 0.15, delayChildren: number = 0.1): Variants => ({
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren,
      delayChildren,
    },
  },
});

/**
 * 9. HOVER EFFECTS (Bukan variants, ditaruh di `whileHover`)
 */
export const hoverScale = (scale: number = 1.05) => ({
  scale,
  transition: { duration: 0.2 },
});
