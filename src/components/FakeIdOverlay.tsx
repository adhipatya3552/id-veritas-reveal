
import React, { useEffect, useRef } from 'react';
import { X, AlertTriangle } from 'lucide-react';

interface FakeIdOverlayProps {
  isActive: boolean;
}

const FakeIdOverlay = ({ isActive }: FakeIdOverlayProps) => {
  const overlayRef = useRef<HTMLDivElement>(null);
  const messageRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (isActive && overlayRef.current && messageRef.current) {
      // Show overlay
      overlayRef.current.classList.add('active');
      
      // Animate message
      setTimeout(() => {
        if (messageRef.current) {
          messageRef.current.classList.add('active');
        }
      }, 500);
      
      // Start closing animation
      setTimeout(() => {
        document.documentElement.classList.add('animate-close-window');
        
        // Actually close the window after animation
        setTimeout(() => {
          window.close();
          
          // Fallback if window.close() is blocked by browser
          document.body.innerHTML = '';
          document.body.style.backgroundColor = '#000';
        }, 2000);
      }, 3000);
    }
  }, [isActive]);
  
  return (
    <div 
      ref={overlayRef}
      className={`fake-id-overlay ${isActive ? 'active' : ''}`}
    >
      <div 
        ref={messageRef}
        className="bg-black/90 border border-destructive text-white max-w-md w-full p-6 rounded-lg transform scale-90 opacity-0 transition-all duration-500 shadow-xl"
        style={{ transitionDelay: '0.3s' }}
      >
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center">
            <AlertTriangle className="h-6 w-6 text-destructive mr-2 animate-pulse" />
            <h2 className="text-xl font-bold">Security Alert</h2>
          </div>
          <div className="bg-white/20 h-6 w-6 flex items-center justify-center rounded-full">
            <X className="h-4 w-4 text-white" />
          </div>
        </div>
        
        <div className="space-y-4">
          <p className="text-lg font-medium">The ID is fake.</p>
          <p className="text-white/80">Closing the website immediately...</p>
          <div className="h-1.5 bg-white/20 rounded-full mt-4 overflow-hidden">
            <div className="h-full bg-destructive animate-loading-bar"></div>
          </div>
        </div>
        
        <div className="absolute -inset-px border border-destructive rounded-lg animate-pulse opacity-70"></div>
        <div className="absolute -inset-1 border border-destructive rounded-lg animate-pulse opacity-30" style={{ animationDelay: '0.5s' }}></div>
      </div>
      
      {isActive && (
        <>
          <div className="fixed top-0 left-0 h-1 w-full bg-destructive animate-glitch"></div>
          <div className="fixed bottom-0 left-0 h-1 w-full bg-destructive animate-glitch"></div>
          <div className="fixed left-0 top-0 w-1 h-full bg-destructive animate-glitch"></div>
          <div className="fixed right-0 top-0 w-1 h-full bg-destructive animate-glitch"></div>
        </>
      )}
    </div>
  );
};

export default FakeIdOverlay;
