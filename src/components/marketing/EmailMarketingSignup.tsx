
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { subscribeToNewsletter } from '@/utils/subscriptionUtils';
import { useToast } from '@/components/ui/use-toast';

interface EmailMarketingSignupProps {
  title?: string;
  description?: string;
  buttonText?: string;
  source?: string;
  compact?: boolean;
  className?: string;
  darkMode?: boolean;
}

const EmailMarketingSignup = ({
  title = "Join Our Community",
  description = "Sign up to receive updates on new releases, collaborations, and exclusive content",
  buttonText = "Subscribe",
  source = "Generic Form",
  compact = false,
  className = "",
  darkMode = false
}: EmailMarketingSignupProps) => {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const success = await subscribeToNewsletter({ 
        email, 
        source 
      });
      
      if (success) {
        toast({
          title: "Subscription successful!",
          description: "Thank you for subscribing to our newsletter.",
          variant: "default",
        });
        setEmail('');
      }
    } catch (error) {
      console.error('Error:', error);
      toast({
        title: "Subscription failed",
        description: "Please try again later.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  
  const textColorClass = darkMode ? "text-white" : "text-gray-800";
  const descriptionColorClass = darkMode ? "text-gray-300" : "text-gray-600";
  
  return (
    <div className={className}>
      {!compact && (
        <>
          <h3 className={`text-xl font-medium mb-2 ${textColorClass}`}>{title}</h3>
          <p className={`text-sm mb-4 ${descriptionColorClass}`}>{description}</p>
        </>
      )}
      
      <form onSubmit={handleSubmit} className={`flex ${compact ? 'flex-row' : 'flex-col sm:flex-row'} gap-3`}>
        <Input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Your email address"
          required
          className={`flex-grow ${darkMode ? 'bg-transparent border-white/30 text-white placeholder:text-white/50' : ''}`}
        />
        <Button 
          type="submit" 
          disabled={isSubmitting}
          className={compact ? 'px-4' : ''}
          variant={darkMode ? "outline" : "default"}
        >
          {isSubmitting ? 'Subscribing...' : buttonText}
        </Button>
      </form>
    </div>
  );
};

export default EmailMarketingSignup;
