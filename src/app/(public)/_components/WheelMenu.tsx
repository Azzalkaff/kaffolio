'use client';

import React, { useState, useRef, useEffect } from 'react';
import { motion, useAnimationFrame } from 'framer-motion';
import { PenTool, Code2, Store, BookOpen, TrendingUp } from 'lucide-react';
import { useRouter } from 'next/navigation';

const items = [
  // Top slice: -36 to 36
  { id: 'design', label: 'Design', icon: PenTool, href: '/creative', startAngle: -36, endAngle: 36, fillClass: 'fill-zinc-100 dark:fill-zinc-900' },
  // Right slice: 36 to 108
  { id: 'dev', label: 'Developer', icon: Code2, href: '/developer', startAngle: 36, endAngle: 108, fillClass: 'fill-zinc-200 dark:fill-zinc-800' },
  // Bottom Right slice: 108 to 180
  { id: 'shop', label: 'Shop', icon: Store, href: '/shop', startAngle: 108, endAngle: 180, fillClass: 'fill-zinc-300 dark:fill-zinc-700' },
  // Bottom Left slice: 180 to 252
  { id: 'blog', label: 'Blog', icon: BookOpen, href: '/blog', startAngle: 180, endAngle: 252, fillClass: 'fill-zinc-200 dark:fill-zinc-800' },
  // Left slice: 252 to 324 (-108 to -36)
  { id: 'marketing', label: 'Marketing', icon: TrendingUp, href: '/marketing', startAngle: 252, endAngle: 324, fillClass: 'fill-zinc-100 dark:fill-zinc-900' }
];

function getSlicePath(startAngle: number, endAngle: number, innerRadius: number, outerRadius: number) {
  // -90 so that 0 degrees is Top
  const startRad = (startAngle - 90) * (Math.PI / 180);
  const endRad = (endAngle - 90) * (Math.PI / 180);

  const x1 = Math.cos(startRad) * outerRadius;
  const y1 = Math.sin(startRad) * outerRadius;
  const x2 = Math.cos(endRad) * outerRadius;
  const y2 = Math.sin(endRad) * outerRadius;
  
  const x3 = Math.cos(endRad) * innerRadius;
  const y3 = Math.sin(endRad) * innerRadius;
  const x4 = Math.cos(startRad) * innerRadius;
  const y4 = Math.sin(startRad) * innerRadius;

  const largeArcFlag = endAngle - startAngle <= 180 ? 0 : 1;

  return [
    `M ${x1} ${y1}`,
    `A ${outerRadius} ${outerRadius} 0 ${largeArcFlag} 1 ${x2} ${y2}`,
    `L ${x3} ${y3}`,
    `A ${innerRadius} ${innerRadius} 0 ${largeArcFlag} 0 ${x4} ${y4}`,
    'Z'
  ].join(' ');
}

function playCarCrashSequence() {
  if (typeof window === 'undefined') return { stop: () => {} };
  const AudioContext = window.AudioContext || (window as any).webkitAudioContext;
  if (!AudioContext) return { stop: () => {} };

  const audioCtx = new AudioContext();

  // --- 1. TIRE SCREECH (Loops while spinning) ---
  const screechBuffer = audioCtx.createBuffer(1, audioCtx.sampleRate * 0.5, audioCtx.sampleRate);
  const screechData = screechBuffer.getChannelData(0);
  for (let i = 0; i < screechBuffer.length; i++) {
    // High-pitched screech base
    screechData[i] = (Math.random() * 2 - 1) * 0.5;
  }
  
  const screechSource = audioCtx.createBufferSource();
  screechSource.buffer = screechBuffer;
  screechSource.loop = true;

  const screechFilter = audioCtx.createBiquadFilter();
  screechFilter.type = 'bandpass';
  screechFilter.frequency.value = 1200; // Tire squeal freq
  screechFilter.Q.value = 5;

  const screechGain = audioCtx.createGain();
  screechGain.gain.setValueAtTime(0, audioCtx.currentTime);
  screechGain.gain.linearRampToValueAtTime(1.5, audioCtx.currentTime + 0.2); // Fade in screech

  screechSource.connect(screechFilter);
  screechFilter.connect(screechGain);
  screechGain.connect(audioCtx.destination);
  screechSource.start();

  return {
    stop: () => {
      // Stop screech abruptly
      screechGain.gain.setValueAtTime(0, audioCtx.currentTime);
      try { screechSource.stop(); } catch(e) {}

      // --- 2. THE CRASH EXPLOSION ---
      const crashBuffer = audioCtx.createBuffer(1, audioCtx.sampleRate * 2, audioCtx.sampleRate);
      const crashData = crashBuffer.getChannelData(0);
      for (let i = 0; i < crashBuffer.length; i++) {
        // Metallic crunch noise
        crashData[i] = (Math.random() * 2 - 1);
      }

      const crashSource = audioCtx.createBufferSource();
      crashSource.buffer = crashBuffer;

      const crashFilter = audioCtx.createBiquadFilter();
      crashFilter.type = 'lowpass';
      // Crunch starts bright, drops to muddy low end quickly
      crashFilter.frequency.setValueAtTime(2000, audioCtx.currentTime);
      crashFilter.frequency.exponentialRampToValueAtTime(100, audioCtx.currentTime + 1);

      const crashGain = audioCtx.createGain();
      crashGain.gain.setValueAtTime(3, audioCtx.currentTime); // LOUD impact
      crashGain.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 1.5);

      crashSource.connect(crashFilter);
      crashFilter.connect(crashGain);
      crashGain.connect(audioCtx.destination);
      crashSource.start();

      setTimeout(() => {
        try {
          if (audioCtx.state !== 'closed') audioCtx.close();
        } catch(e) {}
      }, 2000);
    }
  };
}

export default function WheelMenu() {
  const [isHovered, setIsHovered] = useState(false);
  const rotationRef = useRef(0);
  const [rotation, setRotation] = useState(0);
  const router = useRouter();
  const [hoveredSlice, setHoveredSlice] = useState<string | null>(null);
  
  // Transition states
  const [isNavigating, setIsNavigating] = useState(false);
  const [navigatingTo, setNavigatingTo] = useState<string | null>(null);
  
  // Dimensions
  const outerRadius = 240;
  const innerRadius = 0; // Full pie
  const gap = 0; 

  const handleNavigation = (href: string, id: string) => {
    if (isNavigating) return;
    setIsNavigating(true);
    setNavigatingTo(id);
    
    // Wait for the portal expand animation to finish before routing
    setTimeout(() => {
      router.push(href);
    }, 600);
  };

  const [isSpinning, setIsSpinning] = useState(false);
  const spinIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const audioControlRef = useRef<{ stop: () => void } | null>(null);

  useEffect(() => {
    return () => {
      if (audioControlRef.current) {
        audioControlRef.current.stop();
      }
    };
  }, []);

  const handleSpin = () => {
    if (isSpinning || isNavigating) return;
    setIsSpinning(true);
    setHoveredSlice(null);
    
    // Start procedural car crash sequence (screech first)
    audioControlRef.current = playCarCrashSequence();

    // Choose the target
    const targetIndex = Math.floor(Math.random() * items.length);
    const selectedItem = items[targetIndex];

    const midAngle = (selectedItem.startAngle + selectedItem.endAngle) / 2;
    
    // Calculate physically accurate spin rotation
    const currentRotMod = rotationRef.current % 360;
    const spins = 360 * 5; // 5 full spins
    const nextRotation = rotationRef.current - currentRotMod + spins + (360 - midAngle);
    
    setRotation(nextRotation);

    setTimeout(() => {
      if (audioControlRef.current) {
        audioControlRef.current.stop();
        audioControlRef.current = null;
      }
      
      rotationRef.current = nextRotation;
      setHoveredSlice(selectedItem.id);
      
      setTimeout(() => {
        setIsSpinning(false);
        handleNavigation(selectedItem.href, selectedItem.id);
      }, 800); 
    }, 4000); // Wait for 4 seconds spin animation
  };

  useAnimationFrame((t, delta) => {
    if (!isNavigating && !isSpinning && !isHovered) {
      rotationRef.current += 10 * (delta / 1000);
      setRotation(rotationRef.current);
    }
  });

  return (
    <div 
      className="relative w-full max-w-[500px] sm:max-w-[600px] aspect-square flex items-center justify-center mx-auto"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Hardware Accelerated Ripple Transition */}
      <motion.div 
        className="absolute z-50 w-24 h-24 rounded-full pointer-events-none bg-primary"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ 
          scale: isNavigating ? 50 : 0, 
          opacity: isNavigating ? 1 : 0 
        }}
        transition={{ duration: 0.6, ease: [0.43, 0.13, 0.23, 0.96] }}
      />

      {/* Pointer Ticker */}
      <div className="absolute -top-6 z-50 drop-shadow-xl">
        <div className="w-8 h-10 bg-primary" style={{ clipPath: 'polygon(50% 100%, 0 0, 100% 0)' }}></div>
      </div>

      {/* SVG Donut Wheel with Drop Shadow for Depth */}
      <motion.div 
        className="absolute w-full h-full flex items-center justify-center drop-shadow-xl"
        animate={{ opacity: isNavigating ? 0 : 1, scale: isNavigating ? 0.8 : 1, rotate: rotation }}
        transition={{ 
          rotate: isSpinning ? { duration: 4, ease: [0.1, 0.9, 0.2, 1] } : { duration: 0 },
          opacity: { duration: 0.4 },
          scale: { duration: 0.4 }
        }}
      >
        <svg 
          width={outerRadius * 2} 
          height={outerRadius * 2} 
          viewBox={`-${outerRadius} -${outerRadius} ${outerRadius * 2} ${outerRadius * 2}`}
          className="overflow-visible rounded-full"
        >
          {items.map((item) => {
            const path = getSlicePath(item.startAngle + gap, item.endAngle - gap, innerRadius, outerRadius);
            const isThisHovered = hoveredSlice === item.id;
            
            return (
              <path
                key={item.id}
                d={path}
                className={`transition-all duration-300 cursor-pointer border stroke-background stroke-[2px] ${
                  isThisHovered ? 'fill-primary' : item.fillClass
                } hover:fill-primary`}
                onClick={() => !isSpinning && handleNavigation(item.href, item.id)}
                onMouseEnter={() => !isSpinning && setHoveredSlice(item.id)}
                onMouseLeave={() => !isSpinning && setHoveredSlice(null)}
                style={{ strokeLinejoin: 'round' }}
              />
            );
          })}
        </svg>

        {/* Orbiting Icons and Texts */}
        {items.map((item) => {
          const midAngle = (item.startAngle + item.endAngle) / 2;
          const angleRad = (midAngle - 90) * (Math.PI / 180);
          
          const midRadius = outerRadius * 0.65;
          const x = Math.cos(angleRad) * midRadius;
          const y = Math.sin(angleRad) * midRadius;

          const isThisHovered = hoveredSlice === item.id;
          const iconColorClass = isThisHovered ? 'text-primary-foreground' : 'text-foreground';

          return (
            <div
              key={`content-${item.id}`}
              className="absolute z-30 pointer-events-none flex flex-col items-center justify-center gap-1"
              style={{ transform: `translate(${x}px, ${y}px) rotate(${midAngle}deg)` }}
            >
              <div className={`transition-colors duration-300 ${iconColorClass}`}>
                <item.icon size={28} strokeWidth={2} />
              </div>
              <span className={`text-sm font-bold tracking-wide transition-colors duration-300 ${isThisHovered ? 'text-primary-foreground' : 'text-foreground opacity-80'}`}>
                {item.label}
              </span>
            </div>
          );
        })}
      </motion.div>
      
      {/* Center piece element with elevation */}
      <button 
        onClick={handleSpin}
        disabled={isSpinning || isNavigating}
        className="absolute z-40 w-28 h-28 rounded-full bg-background border border-border shadow-2xl flex flex-col items-center justify-center cursor-pointer hover:scale-105 active:scale-95 transition-transform"
      >
        <div className="w-full h-full rounded-full bg-gradient-to-tr from-primary/5 to-transparent flex items-center justify-center">
          <span className={`font-black tracking-widest text-foreground uppercase ${isSpinning ? 'text-xs animate-pulse' : 'text-sm'}`}>
            {isSpinning ? 'Spinning' : 'Spin'}
          </span>
        </div>
      </button>
    </div>
  );
}
