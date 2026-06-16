'use client';

import React, { useState, useRef, useEffect } from 'react';
import { motion, useAnimationFrame } from 'framer-motion';
import { PenTool, Code2, Store, BookOpen, TrendingUp } from 'lucide-react';
import { useRouter } from 'next/navigation';

const items = [
  // Top slice: -36 to 36
  { id: 'design', label: 'Design', icon: PenTool, href: '/creative', startAngle: -36, endAngle: 36, color: 'hover:fill-pink-500/20' },
  // Right slice: 36 to 108
  { id: 'dev', label: 'Developer', icon: Code2, href: '/developer', startAngle: 36, endAngle: 108, color: 'hover:fill-blue-500/20' },
  // Bottom Right slice: 108 to 180
  { id: 'shop', label: 'Shop', icon: Store, href: '/shop', startAngle: 108, endAngle: 180, color: 'hover:fill-purple-500/20' },
  // Bottom Left slice: 180 to 252
  { id: 'blog', label: 'Blog', icon: BookOpen, href: '/blog', startAngle: 180, endAngle: 252, color: 'hover:fill-orange-500/20' },
  // Left slice: 252 to 324 (-108 to -36)
  { id: 'marketing', label: 'Marketing', icon: TrendingUp, href: '/marketing', startAngle: 252, endAngle: 324, color: 'hover:fill-green-500/20' }
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
  const outerRadius = 240; // Increased from 180
  const innerRadius = 90;  // Increased from 70
  // Remove manual gap, let SVG stroke handle separation
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

    // Calculate total highlight jumps (e.g. 4 full rounds + target index)
    const totalSteps = (5 * items.length) + targetIndex;
    let currentStep = 0;

    const runCycle = () => {
      // Highlight the current item in the cycle
      setHoveredSlice(items[currentStep % items.length].id);
      currentStep++;

      if (currentStep <= totalSteps) {
        // Speed curve: starts fast (50ms), slows down dramatically at the end (up to ~350ms)
        const progress = currentStep / totalSteps;
        const nextDelay = 50 + (Math.pow(progress, 3) * 350); 
        
        spinIntervalRef.current = setTimeout(runCycle, nextDelay);
      } else {
        // Stopped perfectly on the target item
        if (audioControlRef.current) {
          audioControlRef.current.stop();
          audioControlRef.current = null;
        }
        
        setTimeout(() => {
          setIsSpinning(false);
          handleNavigation(selectedItem.href, selectedItem.id);
        }, 800); // Dramatic pause before navigating
      }
    };

    runCycle();
  };

  useAnimationFrame((t, delta) => {
    if (!isNavigating) {
      // Continue idle spin even during the lottery cycle, stop only if manually hovering
      if (isSpinning || !isHovered) {
        rotationRef.current += 10 * (delta / 1000);
        setRotation(rotationRef.current);
      }
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

      {/* SVG Donut Wheel with Drop Shadow for Depth */}
      <motion.div 
        className="absolute w-full h-full flex items-center justify-center drop-shadow-xl"
        style={{ rotate: rotation }}
        animate={{ opacity: isNavigating ? 0 : 1, scale: isNavigating ? 0.8 : 1 }}
        transition={{ duration: 0.4 }}
      >
        <svg 
          width={outerRadius * 2} 
          height={outerRadius * 2} 
          viewBox={`-${outerRadius} -${outerRadius} ${outerRadius * 2} ${outerRadius * 2}`}
          className="overflow-visible"
        >
          {items.map((item) => {
            const path = getSlicePath(item.startAngle + gap, item.endAngle - gap, innerRadius, outerRadius);
            const isThisHovered = hoveredSlice === item.id;
            
            return (
              <path
                key={item.id}
                d={path}
                // If spinning, ignore hover effects. If selected via spin, highlight it.
                className={`transition-all duration-300 cursor-pointer border stroke-border stroke-[3px] ${
                  isThisHovered ? 'fill-foreground' : 'fill-card/80 hover:fill-foreground'
                }`}
                onClick={() => !isSpinning && handleNavigation(item.href, item.id)}
                onMouseEnter={() => !isSpinning && setHoveredSlice(item.id)}
                onMouseLeave={() => !isSpinning && setHoveredSlice(null)}
                style={{ strokeLinejoin: 'round' }}
              />
            );
          })}
          
          {/* Inner Circle Border */}
          <circle cx="0" cy="0" r={innerRadius} className="fill-background stroke-border stroke-[3px]" />
        </svg>
      </motion.div>

      {/* Orbiting Icons and Texts */}
      {items.map((item) => {
        const midAngle = (item.startAngle + item.endAngle) / 2;
        const currentAngle = rotation + midAngle;
        const angleRad = (currentAngle - 90) * (Math.PI / 180);
        
        const midRadius = (innerRadius + outerRadius) / 2;
        const x = Math.cos(angleRad) * midRadius;
        const y = Math.sin(angleRad) * midRadius;

        const isThisHovered = hoveredSlice === item.id;
        const iconColorClass = isThisHovered ? 'text-background' : 'text-foreground';

        return (
          <motion.div
            key={`content-${item.id}`}
            className="absolute z-30 pointer-events-none flex flex-col items-center justify-center gap-2"
            animate={{ x, y, opacity: isNavigating ? 0 : 1, scale: isNavigating ? 0.8 : 1 }}
            transition={{ type: "tween", duration: 0.3 }}
          >
            <div className={`transition-colors duration-300 ${iconColorClass}`}>
              <item.icon size={36} strokeWidth={1.5} />
            </div>
            <span className={`text-base font-bold tracking-wide transition-colors duration-300 ${isThisHovered ? 'text-background opacity-100' : 'text-foreground opacity-80'}`}>
              {item.label}
            </span>
          </motion.div>
        );
      })}
      
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
