
import { useState } from 'react';
import LandingPageLayout from '../components/marketing/LandingPageLayout';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { LeadMagnet } from '@/components/marketing/LeadMagnet';
import { Check, ArrowRight } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';

interface ConversionLandingPageProps {
  title?: string;
  subtitle?: string;
  backgroundImage?: string;
  offerType?: 'trend-report' | 'early-access' | 'style-guide' | 'newsletter';
  features?: {
    title: string;
    description: string;
  }[];
}

const ConversionLandingPage = ({
  title = "Elevate Your Style: Exclusive Fashion Insights",
  subtitle = "Join our community of fashion enthusiasts and get access to curated content, early product releases, and personalized style recommendations.",
  backgroundImage = "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
  offerType = 'newsletter',
  features = defaultFeatures,
}: ConversionLandingPageProps) => {
  const isMobile = useIsMobile();
  const [showThankYou, setShowThankYou] = useState(false);
  
  const handleSuccess = () => {
    setShowThankYou(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  
  return (
    <LandingPageLayout
      title={title}
      subtitle={subtitle}
      backgroundImage={backgroundImage}
      ctaText="Join Now"
      ctaLink="#lead-form"
    >
      {showThankYou ? (
        <ThankYouSection />
      ) : (
        <>
          <FeaturesSection features={features} />
          <TestimonialSection />
          <LeadFormSection offerType={offerType} onSuccess={handleSuccess} />
        </>
      )}
    </LandingPageLayout>
  );
};

// Default features for the landing page
const defaultFeatures = [
  {
    title: "Curated Collections",
    description: "Access to expertly curated collections featuring the best from established and emerging designers."
  },
  {
    title: "Early Access",
    description: "Be first to shop new arrivals and limited-edition drops before they're available to the general public."
  },
  {
    title: "Styling Advice",
    description: "Personalized styling recommendations from fashion experts based on your preferences."
  },
  {
    title: "Exclusive Content",
    description: "In-depth articles, designer interviews, and trend forecasts you won't find anywhere else."
  }
];

// Features section with responsive grid layout
const FeaturesSection = ({ features }: { features: { title: string; description: string }[] }) => {
  const isMobile = useIsMobile();
  
  return (
    <section className="py-12 md:py-16">
      <h2 className="text-2xl md:text-3xl font-display text-center mb-10">Why Join Our Community?</h2>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 md:gap-8">
        {features.map((feature, index) => (
          <div key={index} className="bg-white p-6 shadow-sm border border-gray-100 rounded-sm">
            <div className="flex items-start">
              <div className="mr-4 bg-yemalin-accent/10 p-2 rounded-full">
                <Check className="h-5 w-5 text-yemalin-accent" />
              </div>
              <div>
                <h3 className="font-medium text-lg mb-2">{feature.title}</h3>
                <p className="text-gray-600 text-sm">{feature.description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      <div className="mt-10 flex justify-center">
        <Button 
          asChild 
          size={isMobile ? "default" : "lg"} 
          className="bg-yemalin-black hover:bg-yemalin-grey-800"
        >
          <a href="#lead-form">
            Get Access Now <ArrowRight className="ml-2 h-4 w-4" />
          </a>
        </Button>
      </div>
    </section>
  );
};

// Testimonial section with responsive design
const TestimonialSection = () => {
  return (
    <section className="py-12 md:py-16 bg-yemalin-cream my-8 md:my-12 -mx-4 px-4">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-2xl md:text-3xl font-display mb-10">What Our Community Says</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          <div className="bg-white p-6 md:p-8 shadow-sm">
            <p className="italic text-gray-700 mb-4">
              "Joining Yemalin's community has completely transformed my approach to fashion. The curated collections and early access to new drops make me feel like an insider."
            </p>
            <Separator className="my-4" />
            <p className="font-medium">Sophie T.</p>
            <p className="text-sm text-gray-500">Fashion Enthusiast</p>
          </div>
          
          <div className="bg-white p-6 md:p-8 shadow-sm">
            <p className="italic text-gray-700 mb-4">
              "The styling advice I've received has been invaluable. I've discovered new designers and built a wardrobe that truly reflects my personal style."
            </p>
            <Separator className="my-4" />
            <p className="font-medium">Michael R.</p>
            <p className="text-sm text-gray-500">Art Director</p>
          </div>
        </div>
      </div>
    </section>
  );
};

// Lead form section with responsive design
const LeadFormSection = ({ 
  offerType, 
  onSuccess 
}: { 
  offerType: 'trend-report' | 'early-access' | 'style-guide' | 'newsletter',
  onSuccess: () => void
}) => {
  return (
    <section id="lead-form" className="py-12 md:py-16 scroll-mt-16">
      <div className="max-w-xl mx-auto">
        <LeadMagnet
          type="inline"
          offer={offerType}
          source="Conversion Landing Page"
          className="bg-white border border-gray-200 shadow-md p-6 md:p-8"
          onSuccess={onSuccess}
        />
      </div>
    </section>
  );
};

// Thank you section shown after form submission
const ThankYouSection = () => {
  return (
    <section className="py-16 md:py-24 text-center max-w-2xl mx-auto">
      <div className="bg-yemalin-cream p-8 md:p-12 border border-yemalin-accent/20 rounded-sm">
        <h2 className="text-2xl md:text-3xl font-display mb-4">Thank You for Joining!</h2>
        <p className="text-gray-700 mb-6 md:mb-8">
          We're thrilled to welcome you to our community. Check your email for a confirmation and your exclusive welcome gift.
        </p>
        <Button asChild className="bg-yemalin-accent hover:bg-yemalin-accent/90 text-white">
          <a href="/">
            Explore Yemalin <ArrowRight className="ml-2 h-4 w-4" />
          </a>
        </Button>
      </div>
    </section>
  );
};

export default ConversionLandingPage;
