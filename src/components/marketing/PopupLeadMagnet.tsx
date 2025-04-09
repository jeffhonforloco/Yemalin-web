
import { useState, useEffect } from 'react';
import { LeadMagnet, LeadMagnetOffer } from './LeadMagnet';
import { Dialog, DialogContent } from '@/components/ui/dialog';

interface PopupLeadMagnetProps {
  delay?: number; // Delay in milliseconds
  scrollTrigger?: number; // Percentage of page scrolled
  exitIntent?: boolean; // Show on exit intent
  offer: LeadMagnetOffer;
  title?: string;
  description?: string;
  source?: string;
  cookieDuration?: number; // Days to remember dismiss
}

export default function PopupLeadMagnet({
  delay = 5000,
  scrollTrigger = 50,
  exitIntent = true,
  offer = 'trend-report',
  title,
  description,
  source = 'Popup Lead Magnet',
  cookieDuration = 7
}: PopupLeadMagnetProps) {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    // Check if the user has dismissed the popup before
    const hasSeenPopup = localStorage.getItem('yemalin-popup-seen');
    if (hasSeenPopup) return;

    // Set up time delay trigger
    let timeoutId: number | undefined;
    if (delay > 0) {
      timeoutId = window.setTimeout(() => {
        setIsOpen(true);
      }, delay);
    }

    // Set up scroll trigger
    const handleScroll = () => {
      if (scrollTrigger > 0) {
        const scrolled = (window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100;
        if (scrolled >= scrollTrigger) {
          setIsOpen(true);
          window.removeEventListener('scroll', handleScroll);
        }
      }
    };

    // Set up exit intent trigger
    const handleExitIntent = (e: MouseEvent) => {
      if (exitIntent && e.clientY <= 0) {
        setIsOpen(true);
        document.removeEventListener('mouseleave', handleExitIntent);
      }
    };

    window.addEventListener('scroll', handleScroll);
    document.addEventListener('mouseleave', handleExitIntent);

    // Cleanup
    return () => {
      if (timeoutId) clearTimeout(timeoutId);
      window.removeEventListener('scroll', handleScroll);
      document.removeEventListener('mouseleave', handleExitIntent);
    };
  }, [delay, scrollTrigger, exitIntent]);

  const handleClose = () => {
    setIsOpen(false);
    
    // Remember that the user has seen the popup
    const expiryDate = new Date();
    expiryDate.setDate(expiryDate.getDate() + cookieDuration);
    localStorage.setItem('yemalin-popup-seen', expiryDate.toISOString());
  };

  const handleSuccess = () => {
    // Close after a short delay to show success message
    setTimeout(() => {
      handleClose();
    }, 3000);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="p-0 border-0 max-w-md" onInteractOutside={(e) => e.preventDefault()}>
        <LeadMagnet
          type="popup"
          offer={offer}
          title={title}
          description={description}
          source={source}
          onSuccess={handleSuccess}
          onClose={handleClose}
        />
      </DialogContent>
    </Dialog>
  );
}
