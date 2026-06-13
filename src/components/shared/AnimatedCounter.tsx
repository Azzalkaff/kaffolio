'use client';

import { animate, useInView } from 'framer-motion';
import { useEffect, useRef } from 'react';

export function AnimatedCounter({
  from = 0,
  to,
  duration = 2,
  className = '',
  suffix = '',
  prefix = '',
}: {
  from?: number;
  to: number;
  duration?: number;
  className?: string;
  suffix?: string;
  prefix?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });

  useEffect(() => {
    if (!isInView || !ref.current) return;

    // Framer motion 'animate' function to animate values
    const controls = animate(from, to, {
      duration: duration,
      ease: 'easeOut',
      onUpdate(value) {
        if (ref.current) {
          ref.current.textContent = `${prefix}${Math.round(value)}${suffix}`;
        }
      },
    });

    return () => controls.stop();
  }, [from, to, duration, isInView, prefix, suffix]);

  return (
    <span ref={ref} className={className}>
      {prefix}
      {from}
      {suffix}
    </span>
  );
}
