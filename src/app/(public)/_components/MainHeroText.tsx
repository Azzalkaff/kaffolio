'use client';

import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

const LETTERS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ!@#$%^&*()_+{}[]|;:?,./";

let hasRunGlitch = false;

export default function MainHeroText() {
  const [worldText, setWorldText] = useState("worlds");
  const [glitchText, setGlitchText] = useState("I Create");
  const [isGlitching, setIsGlitching] = useState(false);

  useEffect(() => {
    if (hasRunGlitch) return;
    hasRunGlitch = true;

    let initialTriggerTimeoutId: NodeJS.Timeout;

    const playBellSound = () => {
      try {
        const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
        if (!AudioContextClass) return;
        const audioCtx = new AudioContextClass();
        const now = audioCtx.currentTime;

        // Rich bell/chime chord: G5 (783.99 Hz), C6 (1046.50 Hz), E6 (1318.51 Hz)
        const freqs = [783.99, 1046.50, 1318.51];
        const gains = [0.3, 0.2, 0.1];

        freqs.forEach((freq, i) => {
          const osc = audioCtx.createOscillator();
          const gainNode = audioCtx.createGain();

          osc.type = 'sine';
          osc.frequency.setValueAtTime(freq, now);

          gainNode.gain.setValueAtTime(gains[i], now);
          gainNode.gain.exponentialRampToValueAtTime(0.0001, now + 2.0);

          osc.connect(gainNode);
          gainNode.connect(audioCtx.destination);

          osc.start(now);
          osc.stop(now + 2.0);
        });
      } catch (e) {
        console.warn("AudioContext block:", e);
      }
    };

    // 1. Automatic Glitch for "I Create"
    const triggerGlitch = () => {
      setIsGlitching(true);
      let count = 0;
      const targetWord = "I Create";
      const glitchChars = "I Cr3@t3!_[]X0//";
      
      const interval = setInterval(() => {
        setGlitchText(
          targetWord
            .split("")
            .map((char) => {
              if (char === " ") return " ";
              if (Math.random() > 0.6) {
                return glitchChars[Math.floor(Math.random() * glitchChars.length)];
              }
              return char;
            })
            .join("")
        );
        count++;
        if (count > 5) {
          clearInterval(interval);
          setGlitchText("I Create");
          setIsGlitching(false);
        }
      }, 70);
    };

    // 2. Automatic Scramble for "worlds"
    const triggerScramble = () => {
      let iteration = 0;
      const targetWord = "worlds";

      // Play bell sound
      playBellSound();
      
      const interval = setInterval(() => {
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
          clearInterval(interval);
        }
        iteration += 0.1; // 6 / 0.1 = 60 steps
      }, 80); // 60 steps * 80ms = 4800ms (~5 seconds)
    };

    // Trigger the sequence exactly once after 1.5 seconds
    initialTriggerTimeoutId = setTimeout(() => {
      triggerGlitch();
      triggerScramble();
    }, 1500);

    return () => {
      clearTimeout(initialTriggerTimeoutId);
    };
  }, []);

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
            className={`block text-5xl md:text-6xl lg:text-7xl font-light text-foreground ${isGlitching ? 'animate-text-glitch' : ''}`}
          >
            {glitchText}
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
            className="block text-6xl md:text-7xl lg:text-8xl font-black uppercase tracking-tighter text-foreground transition-colors hover:text-primary/80"
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
