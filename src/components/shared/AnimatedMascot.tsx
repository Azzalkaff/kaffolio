'use client';

import React, { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';

// Import Lottie dynamically to prevent SSR issues
const Lottie = dynamic(() => import('lottie-react'), { ssr: false });

interface AnimatedMascotProps {
  url?: string;
  className?: string;
}

export default function AnimatedMascot({ 
  // Default URL is a public Lottie animation of a developer working on a laptop
  url = '/matcha.json', 
  className = 'w-full h-full' 
}: AnimatedMascotProps) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [animationData, setAnimationData] = useState<any>(null);
  const [error, setError] = useState<boolean>(false);

  useEffect(() => {
    fetch(url)
      .then((res) => {
        if (!res.ok) throw new Error('Network response was not ok');
        return res.json();
      })
      .then((data) => setAnimationData(data))
      .catch((err) => {
        console.error("Failed to load Lottie animation:", err);
        setError(true);
      });
  }, [url]);

  if (error) {
    return (
      <div className={`flex flex-col items-center justify-center bg-muted rounded-2xl border-2 border-dashed border-border p-6 ${className}`}>
        <p className="text-muted-foreground text-center text-sm font-medium">
          Lottie failed to load.<br/>
          (Check URL or replace with a local JSON in /public)
        </p>
      </div>
    );
  }

  if (!animationData) {
    return (
      <div className={`flex items-center justify-center animate-pulse bg-muted rounded-2xl ${className}`}>
        <span className="text-muted-foreground text-sm">Loading Mascot...</span>
      </div>
    );
  }

  return (
    <div className={className}>
      <Lottie animationData={animationData} loop={true} />
    </div>
  );
}
