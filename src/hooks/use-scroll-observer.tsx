
import { useEffect, useRef } from 'react';

interface UseScrollObserverProps {
  threshold?: number;
  rootMargin?: string;
}

export const useScrollObserver = ({ 
  threshold = 0.1, 
  rootMargin = '0px 0px -10% 0px' 
}: UseScrollObserverProps = {}) => {
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    // Set up the observer
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            // Add the 'visible' class when element comes into view
            entry.target.classList.add('visible');
            
            // Stop observing once animation is triggered
            observerRef.current?.unobserve(entry.target);
          }
        });
      },
      {
        threshold,
        rootMargin
      }
    );

    // Find all elements with the 'animate-on-scroll' class
    const animatedElements = document.querySelectorAll('.animate-on-scroll');
    
    // Start observing each element
    animatedElements.forEach(element => {
      observerRef.current?.observe(element);
    });

    return () => {
      // Clean up the observer when the component unmounts
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [threshold, rootMargin]);

  return null;
};
