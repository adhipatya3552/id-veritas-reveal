
import React, { useEffect, useRef, ReactNode } from 'react';

interface MotionProps {
  children: ReactNode;
  initial?: {
    opacity?: number;
    y?: number;
    x?: number;
    scale?: number;
  };
  animate?: {
    opacity?: number;
    y?: number;
    x?: number;
    scale?: number;
  };
  transition?: {
    duration?: number;
    delay?: number;
    ease?: string;
  };
  className?: string;
}

export const motion = {
  div: ({ children, initial, animate, transition, className = '' }: MotionProps) => {
    const ref = useRef<HTMLDivElement>(null);
    
    useEffect(() => {
      const el = ref.current;
      if (!el) return;
      
      // Set initial styles
      if (initial) {
        if (initial.opacity !== undefined) el.style.opacity = String(initial.opacity);
        if (initial.y !== undefined) el.style.transform = `translateY(${initial.y}px)`;
        if (initial.x !== undefined) el.style.transform = `translateX(${initial.x}px)`;
        if (initial.scale !== undefined) el.style.transform = `scale(${initial.scale})`;
      }
      
      // Set transition
      const duration = transition?.duration || 0.3;
      const delay = transition?.delay || 0;
      const ease = transition?.ease || 'ease';
      el.style.transition = `opacity ${duration}s ${ease} ${delay}s, transform ${duration}s ${ease} ${delay}s`;
      
      // Animate
      setTimeout(() => {
        if (animate) {
          if (animate.opacity !== undefined) el.style.opacity = String(animate.opacity);
          if (animate.y !== undefined) el.style.transform = `translateY(${animate.y}px)`;
          if (animate.x !== undefined) el.style.transform = `translateX(${animate.x}px)`;
          if (animate.scale !== undefined) el.style.transform = `scale(${animate.scale})`;
        }
      }, 10);
    }, []);
    
    return (
      <div ref={ref} className={className}>
        {children}
      </div>
    );
  }
};
