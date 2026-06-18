'use client';

import { motion } from 'framer-motion';
import { useState, useRef } from 'react';

const LETTERS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ!@#$%^&*()_+{}[]|;:?,./";

export default function MainHeroText() {
  const [worldText, setWorldText] = useState("worlds");
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const handleScramble = () => {
    let iteration = 0;
    const targetWord = "worlds";
    
    if (intervalRef.current) clearInterval(intervalRef.current);

    intervalRef.current = setInterval(() => {
      setWorldText(
        targetWord
          .split("")
          .map((letter, index) => {
            if (index < iteration) {
              return targetWord[index];
            }
            return LETTERS[Math.floor(Math.random() * LETTERS.length)];
          })
          .join("")
      );

      if (iteration >= targetWord.length) {
        clearInterval(intervalRef.current!);
      }
      iteration += 1 / 3;
    }, 30);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: "100%", opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.8, ease: [0.21, 0.47, 0.32, 0.98] as const }, // Custom easeOutCubic
    },
  };

  return (
    <div className="flex flex-col items-start cursor-default">
      <motion.h1
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="flex flex-col leading-[1.05] tracking-tighter"
      >
        {/* Line 1: I Create */}
        <div className="overflow-hidden pb-2">
          <motion.span
            variants={itemVariants}
            className="block text-5xl md:text-6xl lg:text-7xl font-light text-foreground"
          >
            I Create
          </motion.span>
        </div>

        {/* Line 2: My Own */}
        <div className="overflow-hidden pb-2">
          <motion.span
            variants={itemVariants}
            className="block text-6xl md:text-7xl lg:text-8xl font-serif italic text-primary pr-4"
          >
            My Own
          </motion.span>
        </div>

        {/* Line 3: worlds. */}
        <div className="overflow-hidden pt-2 pb-4">
          <motion.span
            variants={itemVariants}
            onMouseEnter={handleScramble}
            className="block text-6xl md:text-7xl lg:text-8xl font-black uppercase tracking-tighter text-foreground cursor-pointer transition-colors hover:text-primary/80"
          >
            {worldText}<span className="text-primary">.</span>
          </motion.span>
        </div>
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.8, ease: "easeOut" }}
        className="text-lg md:text-xl text-muted-foreground mt-8 max-w-2xl font-medium leading-relaxed"
      >
        Hi, saya Syahid Alkaff. Saya menggabungkan keahlian <span className="font-bold text-foreground">Software Development</span>, <span className="font-bold text-foreground">Product Design</span>, dan <span className="font-bold text-foreground">Digital Marketing</span> untuk membangun produk yang tidak hanya berfungsi dengan baik, tapi juga memiliki dampak bisnis.
      </motion.p>
    </div>
  );
}
