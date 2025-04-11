
import React, { useState, useRef, useEffect } from 'react';
import HeroSection from '@/components/HeroSection';
import VerificationSection from '@/components/VerificationSection';
import FakeIdOverlay from '@/components/FakeIdOverlay';
import { useScrollObserver } from '@/hooks/use-scroll-observer';
import { Toaster } from 'sonner';

const Index = () => {
  const [fakeIdDetected, setFakeIdDetected] = useState(false);
  const [verificationVisible, setVerificationVisible] = useState(false);
  const verificationRef = useRef<HTMLDivElement>(null);
  
  // Initialize scroll observer for animations
  useScrollObserver();
  
  // Scroll to verification section
  const scrollToVerification = () => {
    verificationRef.current?.scrollIntoView({ behavior: 'smooth' });
    
    // Set verification section as visible after scrolling
    setTimeout(() => {
      setVerificationVisible(true);
    }, 500);
  };
  
  // Handle fake ID detection
  const handleFakeIdDetected = () => {
    setFakeIdDetected(true);
  };
  
  // Apply closing animation class to HTML when fake ID is detected
  useEffect(() => {
    if (fakeIdDetected) {
      document.documentElement.classList.add('overflow-hidden');
    }
    
    return () => {
      document.documentElement.classList.remove('overflow-hidden');
    };
  }, [fakeIdDetected]);

  return (
    <div className="relative">
      {/* Toast notifications */}
      <Toaster position="top-center" />
      
      {/* Hero Section */}
      <HeroSection onScrollToVerify={scrollToVerification} />
      
      {/* Verification Section */}
      <div ref={verificationRef}>
        <VerificationSection 
          onFakeIdDetected={handleFakeIdDetected}
          isVisible={verificationVisible}
        />
      </div>
      
      {/* Fake ID Overlay with closing animation */}
      <FakeIdOverlay isActive={fakeIdDetected} />
    </div>
  );
};

export default Index;
