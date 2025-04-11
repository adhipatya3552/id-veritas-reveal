
import React, { useState, useRef, useEffect } from 'react';
import { Search, AlertTriangle, Check, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';
import { motion } from '@/components/Motion';

// Mock database of valid IDs
const VALID_IDS = ['ID12345', 'ID67890', 'USER123', 'ADMIN456', 'VALID789'];

interface VerificationSectionProps {
  onFakeIdDetected: () => void;
  isVisible: boolean;
}

const VerificationSection = ({ onFakeIdDetected, isVisible }: VerificationSectionProps) => {
  const [userId, setUserId] = useState('');
  const [isVerifying, setIsVerifying] = useState(false);
  const [isVerified, setIsVerified] = useState<boolean | null>(null);
  const [progressValue, setProgressValue] = useState(0);
  
  const containerRef = useRef<HTMLDivElement>(null);
  const progressInterval = useRef<number | null>(null);

  useEffect(() => {
    if (isVisible && containerRef.current) {
      setTimeout(() => {
        containerRef.current?.classList.add('opacity-100', 'translate-y-0');
      }, 300);
    }
  }, [isVisible]);

  const handleVerify = () => {
    if (!userId.trim()) {
      toast.error('Please enter a user ID');
      return;
    }
    
    setIsVerifying(true);
    setIsVerified(null);
    setProgressValue(0);
    
    // Start progress animation
    let progress = 0;
    progressInterval.current = window.setInterval(() => {
      progress += Math.random() * 15;
      if (progress > 100) progress = 100;
      setProgressValue(progress);
      
      if (progress === 100) {
        if (progressInterval.current) clearInterval(progressInterval.current);
      }
    }, 200);
    
    // Simulate verification process
    setTimeout(() => {
      if (progressInterval.current) clearInterval(progressInterval.current);
      setProgressValue(100);
      
      const isValid = VALID_IDS.includes(userId.trim());
      setIsVerified(isValid);
      setIsVerifying(false);
      
      if (isValid) {
        toast.success('ID successfully verified!');
      } else {
        toast.error('Fake ID detected!');
        setTimeout(() => {
          onFakeIdDetected();
        }, 1500);
      }
    }, 3000);
  };

  return (
    <section id="verify" className="section-container">
      <div className="absolute inset-0 bg-gradient-to-b from-secondary/30 to-background"></div>
      <div className="absolute w-96 h-96 rounded-full bg-primary/5 blur-3xl -top-20 -left-20"></div>
      <div className="absolute w-80 h-80 rounded-full bg-accent/5 blur-3xl -bottom-20 -right-20"></div>
      
      <div 
        ref={containerRef}
        className="container max-w-2xl z-10 opacity-0 translate-y-8 transition-all duration-700"
      >
        <div className="glass-effect rounded-xl p-8 md:p-10">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold mb-2 gradient-text">Identity Verification</h2>
            <p className="text-muted-foreground">Enter a user ID to verify its authenticity</p>
          </div>
          
          <div className="space-y-6">
            <div className="relative">
              <Input
                type="text"
                placeholder="Enter User ID (e.g., ID12345)"
                className="input-primary pl-10"
                value={userId}
                onChange={(e) => setUserId(e.target.value)}
                disabled={isVerifying}
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            </div>
            
            {isVerifying && (
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Verifying ID...</span>
                  <span>{Math.round(progressValue)}%</span>
                </div>
                <div className="h-2 bg-secondary rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-primary to-accent transition-all duration-300"
                    style={{ width: `${progressValue}%` }}
                  ></div>
                </div>
                <div className="flex items-center justify-center space-x-2 text-sm text-muted-foreground mt-2">
                  <Loader2 className="h-4 w-4 animate-spin" />
                  <span>Scanning database records...</span>
                </div>
              </div>
            )}
            
            {isVerified === true && (
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-green-50 border border-green-200 text-green-800 rounded-lg p-4 flex items-start"
              >
                <Check className="h-5 w-5 mr-3 text-green-500 mt-0.5" />
                <div>
                  <p className="font-medium">Valid ID Confirmed</p>
                  <p className="text-sm text-green-700 mt-1">The ID has been successfully verified in our system.</p>
                </div>
              </motion.div>
            )}
            
            {isVerified === false && (
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-red-50 border border-red-200 text-red-800 rounded-lg p-4 flex items-start"
              >
                <AlertTriangle className="h-5 w-5 mr-3 text-red-500 mt-0.5" />
                <div>
                  <p className="font-medium">Fake ID Detected</p>
                  <p className="text-sm text-red-700 mt-1">This ID doesn't exist in our database.</p>
                </div>
              </motion.div>
            )}
            
            <Button
              onClick={handleVerify}
              disabled={isVerifying}
              className="w-full btn-primary"
            >
              {isVerifying ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" /> 
                  Verifying...
                </>
              ) : (
                'Verify ID'
              )}
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default VerificationSection;
