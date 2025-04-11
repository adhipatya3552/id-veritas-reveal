
import React, { useEffect } from 'react';
import { XCircle } from 'lucide-react';
import { motion } from './Motion';

interface FakeIdOverlayProps {
  isActive: boolean;
}

const FakeIdOverlay = ({ isActive }: FakeIdOverlayProps) => {
  useEffect(() => {
    if (isActive) {
      // Add closing animation to HTML element after a delay
      const timeout = setTimeout(() => {
        document.documentElement.classList.add('animate-close-window');
        
        // Close window after animation completes
        setTimeout(() => {
          window.close();
        }, 1500);
      }, 3000);
      
      return () => clearTimeout(timeout);
    }
  }, [isActive]);
  
  if (!isActive) return null;
  
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/90"
    >
      <div className="text-center p-8">
        <div className="mb-6 flex justify-center">
          <XCircle className="h-24 w-24 text-red-500 animate-pulse" />
        </div>
        <h2 className="text-3xl font-bold text-white mb-4">Fake ID Detected!</h2>
        <p className="text-xl text-red-300 mb-8">
          This ID does not exist in our database.
        </p>
        <div className="text-white text-2xl font-bold">
          Closing website immediately...
        </div>
      </div>
    </motion.div>
  );
};

export default FakeIdOverlay;
