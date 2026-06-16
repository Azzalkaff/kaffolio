'use client';

import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

interface HeroTypewriterProps {
  words: string[];
  prefixText: React.ReactNode;
  suffixText: React.ReactNode;
  description: React.ReactNode;
}

export default function HeroTypewriter({
  words,
  prefixText,
  suffixText,
  description,
}: HeroTypewriterProps) {
  const [wordIndex, setWordIndex] = useState(0);
  const [text, setText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  // Typewriter Effect Logic
  useEffect(() => {
    if (words.length === 0) return;
    const currentWord = words[wordIndex];
    let typingSpeed = isDeleting ? 50 : 150;

    if (!isDeleting && text === currentWord) {
      typingSpeed = 1500; // Pause before deleting
      const timeout = setTimeout(() => setIsDeleting(true), typingSpeed);
      return () => clearTimeout(timeout);
    }

    if (isDeleting && text === '') {
      setIsDeleting(false);
      setWordIndex((prev) => (prev + 1) % words.length);
      return;
    }

    const timeout = setTimeout(() => {
      setText(currentWord.substring(0, text.length + (isDeleting ? -1 : 1)));
    }, typingSpeed);

    return () => clearTimeout(timeout);
  }, [text, isDeleting, wordIndex, words]);

  return (
    <div className="relative min-h-[80vh] w-full flex flex-col justify-center bg-background pt-24 pb-32 overflow-hidden">
      {/* Foreground Content */}
      <div className="relative z-20 px-4 md:px-12 w-full mx-auto flex flex-col items-start">
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: 'easeOut' }}
          className="text-5xl md:text-6xl lg:text-[5.5rem] font-light leading-[1.1] tracking-tight text-foreground"
        >
          {prefixText}{' '}
          <span className="font-black uppercase tracking-tighter text-foreground inline-flex items-center">
            {text}
            <motion.span 
              animate={{ opacity: [1, 0] }} 
              transition={{ repeat: Infinity, duration: 0.8 }}
              className="w-1.5 md:w-2 h-[1em] bg-foreground ml-1 inline-block"
            />
          </span>{' '}
          {suffixText}
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.4, ease: 'easeOut' }}
          className="mt-8 md:mt-12 border-l-4 border-foreground pl-6"
        >
          <div className="text-xl md:text-2xl text-foreground font-medium max-w-2xl leading-relaxed">
            {description}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
