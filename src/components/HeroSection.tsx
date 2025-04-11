
import React, { useEffect, useRef } from 'react';
import { ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface HeroSectionProps {
  onScrollToVerify: () => void;
}

const HeroSection = ({ onScrollToVerify }: HeroSectionProps) => {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const buttonRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const titleEl = titleRef.current;
    const subtitleEl = subtitleRef.current;
    const buttonEl = buttonRef.current;

    if (titleEl && subtitleEl && buttonEl) {
      setTimeout(() => {
        titleEl.classList.add('opacity-100', 'translate-y-0');
      }, 300);

      setTimeout(() => {
        subtitleEl.classList.add('opacity-100', 'translate-y-0');
      }, 600);

      setTimeout(() => {
        buttonEl.classList.add('opacity-100', 'translate-y-0');
      }, 900);
    }
  }, []);

  return (
    <section id="hero" className="section-container bg-gradient-to-b from-background to-secondary/30">
      <div className="absolute inset-0 bg-[url('/background-pattern.svg')] opacity-5"></div>
      <div className="absolute w-64 h-64 rounded-full bg-primary/10 blur-3xl top-20 right-20"></div>
      <div className="absolute w-72 h-72 rounded-full bg-accent/10 blur-3xl bottom-20 left-20"></div>
      
      <div className="container max-w-4xl z-10 text-center">
        <h1 
          ref={titleRef} 
          className="text-4xl md:text-6xl font-bold mb-6 opacity-0 translate-y-8 transition-all duration-700 gradient-text"
        >
          ID Veritas Reveal
        </h1>
        
        <p 
          ref={subtitleRef} 
          className="text-lg md:text-xl text-muted-foreground mb-10 opacity-0 translate-y-8 transition-all duration-700 delay-300"
        >
          Advanced identity verification system that instantly determines authenticity with precision and security
        </p>
        
        <div 
          ref={buttonRef} 
          className="flex justify-center opacity-0 translate-y-8 transition-all duration-700 delay-500"
        >
          <Button 
            onClick={onScrollToVerify} 
            size="lg" 
            className="btn-primary group"
          >
            Verify ID Now
            <ChevronDown className="ml-2 h-5 w-5 transition-transform group-hover:translate-y-1" />
          </Button>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce cursor-pointer" onClick={onScrollToVerify}>
        <ChevronDown className="h-8 w-8 text-primary/70" />
      </div>
    </section>
  );
};

export default HeroSection;
