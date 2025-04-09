
import { useToast } from '@/components/ui/use-toast';
import EmailMarketingSignup from '../marketing/EmailMarketingSignup';

const Newsletter = () => {
  return (
    <section className="py-16 bg-yemalin-black text-white">
      <div className="luxury-container text-center">
        <h2 className="text-2xl md:text-3xl font-display mb-3">Join Our Style Journey</h2>
        <p className="max-w-xl mx-auto mb-4">
          Become part of a community that celebrates the art of personal expression through fashion
        </p>
        <p className="max-w-xl mx-auto mb-8 text-gray-300 text-sm">
          Subscribe to receive curated stories, exclusive designer insights, and invitations to our members-only events
        </p>
        
        <div className="max-w-md mx-auto">
          <EmailMarketingSignup 
            title=""
            description=""
            buttonText="Begin Your Journey"
            source="Homepage Footer"
            darkMode={true}
          />
        </div>
      </div>
    </section>
  );
};

export default Newsletter;
