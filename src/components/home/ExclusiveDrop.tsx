
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';

const ExclusiveDrop = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      toast.success('You\'re on the list! Watch for exclusive early access.');
      setEmail('');
      setIsSubmitting(false);
      setIsOpen(false);
    }, 1000);
  };

  return (
    <section className="py-16 bg-black text-white">
      <div className="luxury-container">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-7 order-2 lg:order-1">
            <h2 className="font-display text-3xl md:text-4xl mb-4">
              Coming Soon: The Heritage Collection
            </h2>
            <p className="text-gray-300 mb-6 text-lg">
              Our debut capsule collection launches this summer. A modern reinterpretation of timeless designs, 
              crafted with exceptional materials and attention to detail.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button 
                onClick={() => setIsOpen(true)}
                className="bg-white text-black hover:bg-yemalin-accent hover:text-white transition-colors"
              >
                Get Early Access
              </Button>
              <Button 
                variant="outline" 
                className="text-white border-white hover:bg-white hover:text-black"
              >
                Learn More
              </Button>
            </div>
            
            <div className="mt-8 flex items-center">
              <div className="flex -space-x-3">
                <div className="w-8 h-8 rounded-full bg-yemalin-accent flex items-center justify-center text-xs font-medium">JM</div>
                <div className="w-8 h-8 rounded-full bg-yemalin-grey-800 flex items-center justify-center text-xs font-medium">KL</div>
                <div className="w-8 h-8 rounded-full bg-yemalin-accent flex items-center justify-center text-xs font-medium">TH</div>
                <div className="w-8 h-8 rounded-full bg-yemalin-grey-800 flex items-center justify-center text-xs font-medium">+5</div>
              </div>
              <span className="ml-3 text-sm text-gray-300">8 designers collaborated on this collection</span>
            </div>
          </div>
          
          <div className="lg:col-span-5 order-1 lg:order-2">
            <img 
              src="https://images.unsplash.com/photo-1512436991641-6745cdb1723f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80" 
              alt="Exclusive Collection Preview" 
              className="w-full h-[400px] object-cover object-center"
            />
          </div>
        </div>
      </div>
      
      {/* Early Access Dialog */}
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-center text-2xl font-display">
              Get Early Access
            </DialogTitle>
            <DialogDescription className="text-center">
              Join our VIP list for exclusive early access to The Heritage Collection before it launches.
            </DialogDescription>
          </DialogHeader>
          
          <form onSubmit={handleSubmit} className="space-y-4 pt-4">
            <div className="space-y-2">
              <Input
                type="email"
                placeholder="Your email address"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <p className="text-xs text-gray-500">
                By signing up, you agree to receive marketing emails. You can unsubscribe anytime.
              </p>
            </div>
            
            <Button type="submit" className="w-full" disabled={isSubmitting}>
              {isSubmitting ? 'Submitting...' : 'Join the VIP List'}
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </section>
  );
};

export default ExclusiveDrop;
