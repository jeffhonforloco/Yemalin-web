
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { subscribeToNewsletter } from '@/utils/subscriptionUtils';

const BlogNewsletter = () => {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const success = await subscribeToNewsletter({ 
        email, 
        source: 'Blog Page' 
      });
      
      if (success) {
        setIsSuccess(true);
        setEmail('');
      }
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="mt-16 p-12 bg-yemalin-grey-100 text-center">
      <h3 className="text-2xl font-display mb-4">Subscribe to Our Journal</h3>
      <p className="text-gray-600 max-w-2xl mx-auto mb-6">
        Stay updated with our latest articles, designer interviews, style guides, and exclusive content.
      </p>
      
      {isSuccess ? (
        <div className="max-w-md mx-auto p-4 bg-white/50 rounded-sm">
          <p>Thank you for subscribing to our journal!</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="flex max-w-md mx-auto">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Your email address"
            required
            className="flex-grow px-4 py-3 text-sm border border-gray-300 focus:outline-none focus:border-black"
          />
          <Button 
            className="bg-black text-white hover:bg-gray-800"
            disabled={isSubmitting}
            type="submit"
          >
            {isSubmitting ? 'Subscribing...' : 'Subscribe'}
          </Button>
        </form>
      )}
    </div>
  );
};

export default BlogNewsletter;
