
import { useState } from 'react';
import { subscribeToNewsletter } from '@/utils/subscriptionUtils';
import { useToast } from '@/components/ui/use-toast';
import EmailMarketingSignup from '../marketing/EmailMarketingSignup';

const Newsletter = () => {
  // Using our new reusable email marketing component
  return (
    <section className="py-16 bg-yemalin-black text-white">
      <div className="luxury-container text-center">
        <h2 className="text-2xl md:text-3xl font-display mb-3">Stay Updated</h2>
        <p className="max-w-xl mx-auto mb-8">
          Subscribe to our newsletter to receive updates on new arrivals, special offers, 
          and exclusive fashion insights
        </p>
        
        <div className="max-w-md mx-auto">
          <EmailMarketingSignup 
            title=""
            description=""
            buttonText="Subscribe"
            source="Homepage Footer"
            darkMode={true}
          />
        </div>
      </div>
    </section>
  );
};

export default Newsletter;
