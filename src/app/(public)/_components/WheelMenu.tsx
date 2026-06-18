'use client';

import React, { useState, useRef, useEffect } from 'react';
import { motion, useAnimationFrame } from 'framer-motion';
import { PenTool, Code2, Store, BookOpen, TrendingUp } from 'lucide-react';
import { useRouter } from 'next/navigation';

const items = [
  // Top slice: -36 to 36
  { id: 'design', label: 'Design', icon: PenTool, href: '/creative', startAngle: -36, endAngle: 36, fillClass: 'fill-primary/60', audio: '/audio/wheel/antek2-aseng.mp3' },
  // Right slice: 36 to 108
  { id: 'dev', label: 'Developer', icon: Code2, href: '/developer', startAngle: 36, endAngle: 108, fillClass: 'fill-primary/40', audio: '/audio/wheel/saya-akan-lawan.mp3' },
  // Bottom Right slice: 108 to 180
  { id: 'shop', label: 'Shop', icon: Store, href: '/shop', startAngle: 108, endAngle: 180, fillClass: 'fill-primary/10', audio: '/audio/wheel/wi-wo-de-tok.mp3' },
  // Bottom Left slice: 180 to 252
  { id: 'blog', label: 'Blog', icon: BookOpen, href: '/blog', startAngle: 180, endAngle: 252, fillClass: 'fill-primary/30', audio: '/audio/wheel/sori-ye.mp3' },
  // Left slice: 252 to 324 (-108 to -36)
  { id: 'marketing', label: 'Marketing', icon: TrendingUp, href: '/marketing', startAngle: 252, endAngle: 324, fillClass: 'fill-primary/50', audio: '/audio/wheel/mas-bahlil-ganteng.mp3' }
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

function playClickSound() {
  try {
    const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
    if (!AudioContextClass) return;
    const ctx = new AudioContextClass();
    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gainNode = ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(1000, now);
    osc.frequency.exponentialRampToValueAtTime(150, now + 0.1);

    gainNode.gain.setValueAtTime(0.7, now);
    gainNode.gain.exponentialRampToValueAtTime(0.0001, now + 0.1);

    osc.connect(gainNode);
    gainNode.connect(ctx.destination);

    osc.start(now);
    osc.stop(now + 0.1);
  } catch(e) {}
}

function playSpinAudio() {
  if (typeof window === 'undefined') return { stop: () => {} };
  
  const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
  if (!AudioContextClass) return { stop: () => {} };
  
  const ctx = new AudioContextClass();
  let isActive = true;
  
  const playTick = () => {
    if (!isActive) return;
    try {
      const now = ctx.currentTime;
      const osc = ctx.createOscillator();
      const gainNode = ctx.createGain();
      
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(1800, now);
      osc.frequency.exponentialRampToValueAtTime(150, now + 0.02);
      
      gainNode.gain.setValueAtTime(0.4, now);
      gainNode.gain.exponentialRampToValueAtTime(0.0001, now + 0.02);
      
      osc.connect(gainNode);
      gainNode.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 0.02);
    } catch (e) {}
  };

  let tickInterval = 80; // start fast (spinning speed)
  const runTicks = () => {
    if (!isActive) return;
    playTick();
    // Decelerating effect (ticks slow down over time)
    tickInterval = Math.min(600, tickInterval + 18);
    setTimeout(runTicks, tickInterval);
  };

  runTicks();

  return {
    stop: () => {
      isActive = false;
      setTimeout(() => {
        try {
          if (ctx.state !== 'closed') ctx.close();
        } catch(e) {}
      }, 100);
    }
  };
}


export default function WheelMenu() {
  const [isHovered, setIsHovered] = useState(false);
  const rotationRef = useRef(0);
  const [rotation, setRotation] = useState(0);
  const router = useRouter();
  const [hoveredSlice, setHoveredSlice] = useState<string | null>(null);
  const [blinkingSliceId, setBlinkingSliceId] = useState<string | null>(null);
  
  // Dimensions
  const outerRadius = 240;
  const innerRadius = 0; // Full pie
  const gap = 0; 
  
  const handleNavigation = (href: string, id: string) => {
    router.push(href);
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
    if (isSpinning) return;
    setIsSpinning(true);
    setHoveredSlice(null);
    setBlinkingSliceId(null);
    
    // Play quick physical click sound on button press
    playClickSound();
    
    // Start spin audio sequence
    audioControlRef.current = playSpinAudio();

    // Choose the target with weighted probabilities
    const r = Math.random();
    let targetIndex = 0;

    // Probabilities: design (25%), dev (25%), others (16.6666% each)
    if (r < 0.25) {
      targetIndex = items.findIndex(i => i.id === 'design');
    } else if (r < 0.50) {
      targetIndex = items.findIndex(i => i.id === 'dev');
    } else if (r < 0.666666) {
      targetIndex = items.findIndex(i => i.id === 'shop');
    } else if (r < 0.833333) {
      targetIndex = items.findIndex(i => i.id === 'blog');
    } else {
      targetIndex = items.findIndex(i => i.id === 'marketing');
    }

    // Fallback if not found (shouldn't happen)
    if (targetIndex === -1) targetIndex = 0;

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
      setBlinkingSliceId(selectedItem.id); // Start blinking target slice!

      // Play the specific landed slice audio voice line
      const landAudio = new Audio(selectedItem.audio);
      landAudio.volume = 0.95;

      landAudio.addEventListener('ended', () => {
        setIsSpinning(false);
        setBlinkingSliceId(null); // Stop blinking!
        handleNavigation(selectedItem.href, selectedItem.id);
      });

      landAudio.play().catch(e => {
        console.warn("Landed audio blocked:", e);
        // Fallback if audio fails to play
        setIsSpinning(false);
        setBlinkingSliceId(null);
        handleNavigation(selectedItem.href, selectedItem.id);
      });
    }, 4000); // Wait for 4 seconds spin animation
  };

  useAnimationFrame((t, delta) => {
    if (!isSpinning && !isHovered) {
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
      {/* Pointer Ticker */}
      <div className="absolute -top-6 z-50 drop-shadow-xl">
        <div className="w-8 h-10 bg-primary" style={{ clipPath: 'polygon(50% 100%, 0 0, 100% 0)' }}></div>
      </div>

      {/* SVG Donut Wheel with Drop Shadow for Depth */}
      <motion.div 
        className="absolute w-full h-full flex items-center justify-center drop-shadow-xl"
        animate={{ rotate: rotation }}
        transition={{ 
          rotate: isSpinning ? { duration: 4, ease: [0.1, 0.9, 0.2, 1] } : { duration: 0 },
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
            const isThisBlinking = blinkingSliceId === item.id;
            
            return (
              <path
                key={item.id}
                d={path}
                className={`transition-all duration-300 cursor-pointer stroke-white stroke-[2px] ${
                  isThisBlinking ? 'animate-slice-blink' : isThisHovered ? 'fill-primary' : item.fillClass
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
          const iconColorClass = isThisHovered ? 'text-primary-foreground' : 'text-black';

          return (
            <div
              key={`content-${item.id}`}
              className="absolute z-30 pointer-events-none flex flex-col items-center justify-center gap-1"
              style={{ transform: `translate(${x}px, ${y}px) rotate(${midAngle}deg)` }}
            >
              <div className={`transition-colors duration-300 ${iconColorClass}`}>
                <item.icon size={28} strokeWidth={2} />
              </div>
              <span className={`text-sm font-bold tracking-wide transition-colors duration-300 ${isThisHovered ? 'text-primary-foreground' : 'text-black opacity-80'}`}>
                {item.label}
              </span>
            </div>
          );
        })}
      </motion.div>
      
      {/* Center piece element with elevation */}
      <button 
        onClick={handleSpin}
        disabled={isSpinning}
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
