
import { useToast } from '@/components/ui/use-toast';
import EmailMarketingSignup from '../marketing/EmailMarketingSignup';
import { Separator } from '@/components/ui/separator';

const Newsletter = () => {
  return (
    <section className="py-16 bg-yemalin-black text-white">
      <div className="luxury-container">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="text-left">
            <h2 className="text-2xl md:text-3xl font-display mb-3">Join Our Style Journey</h2>
            <p className="mb-4">
              Become part of a curated community that celebrates the art of personal expression through thoughtful fashion choices.
            </p>
            
            <Separator className="my-6 bg-yemalin-grey-600" />
            
            <p className="text-gray-300 text-sm mb-8">
              Subscribe to receive exclusive designer insights, behind-the-scenes content, and priority access to limited collections before they're available to the public.
            </p>
            
            <div className="max-w-md">
              <EmailMarketingSignup 
                title=""
                description=""
                buttonText="Begin Your Journey"
                source="Homepage Footer"
                darkMode={true}
              />
            </div>
          </div>
          
          <div className="hidden md:block">
            <div className="relative">
              <div className="absolute -top-4 -left-4 w-24 h-24 border border-yemalin-accent"></div>
              <img 
                src="https://images.unsplash.com/photo-1529139574466-a303027c1d8b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80"
                alt="Yemalin Style Community"
                className="w-full h-[400px] object-cover object-center"
              />
              <div className="absolute -bottom-4 -right-4 w-24 h-24 border border-yemalin-accent"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Newsletter;
