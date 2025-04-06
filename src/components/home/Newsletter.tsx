
import { useState } from 'react';
import { subscribeToNewsletter } from '@/utils/subscriptionUtils';

const Newsletter = () => {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const success = await subscribeToNewsletter({ 
        email, 
        source: 'Homepage Footer' 
      });
      
      if (success) {
        setMessage('Thank you for subscribing to our newsletter!');
        setEmail('');
      }
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="py-16 bg-yemalin-black text-white">
      <div className="luxury-container text-center">
        <h2 className="text-2xl md:text-3xl font-display mb-3">Stay Updated</h2>
        <p className="max-w-xl mx-auto mb-8">Subscribe to our newsletter to receive updates on new arrivals, special offers, and exclusive fashion insights</p>
        
        {message ? (
          <div className="max-w-md mx-auto bg-white/10 p-4 rounded-sm">
            <p>{message}</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="max-w-md mx-auto">
            <div className="flex flex-col sm:flex-row gap-3">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Your email address"
                required
                className="flex-grow px-4 py-3 text-sm bg-transparent border border-white/30 text-white focus:outline-none focus:border-white placeholder:text-white/50"
              />
              <button 
                type="submit" 
                disabled={isSubmitting}
                className="px-6 py-3 bg-white text-black text-sm font-medium hover:bg-yemalin-accent hover:text-white transition-colors disabled:opacity-70"
              >
                {isSubmitting ? 'Subscribing...' : 'Subscribe'}
              </button>
            </div>
          </form>
        )}
      </div>
    </section>
  );
};

export default Newsletter;
