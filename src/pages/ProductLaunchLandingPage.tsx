
import { useState } from 'react';
import LandingPageLayout from '../components/marketing/LandingPageLayout';
import { Button } from '@/components/ui/button';
import { LeadMagnet } from '@/components/marketing/LeadMagnet';
import { ArrowRight, Calendar, Clock, Star } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { useIsMobile } from '@/hooks/use-mobile';

interface ProductLaunchLandingPageProps {
  productName?: string;
  designerName?: string;
  launchDate?: string;
  backgroundImage?: string;
  productDescription?: string;
  productImages?: string[];
}

const ProductLaunchLandingPage = ({
  productName = "The Artisan Collection",
  designerName = "Elise Laurent",
  launchDate = "April 15, 2025",
  backgroundImage = "https://images.unsplash.com/photo-1445205170230-053b83016050?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1471&q=80",
  productDescription = "A limited edition collection featuring handcrafted pieces that blend timeless elegance with contemporary design. Each item is meticulously created using sustainable materials and traditional techniques.",
  productImages = defaultProductImages,
}: ProductLaunchLandingPageProps) => {
  const isMobile = useIsMobile();
  const [showThankYou, setShowThankYou] = useState(false);
  
  return (
    <LandingPageLayout
      title={`Exclusive Pre-Launch: ${productName}`}
      subtitle={`By ${designerName} - Launching ${launchDate}`}
      backgroundImage={backgroundImage}
      ctaText="Get Early Access"
      ctaLink="#early-access"
    >
      {showThankYou ? (
        <ThankYouSection productName={productName} launchDate={launchDate} />
      ) : (
        <>
          <ProductIntroSection 
            productName={productName} 
            designerName={designerName}
            productDescription={productDescription}
            launchDate={launchDate}
          />
          <ProductGallerySection images={productImages} />
          <DesignerSection name={designerName} />
          <EarlyAccessSection onSuccess={() => setShowThankYou(true)} />
        </>
      )}
    </LandingPageLayout>
  );
};

// Default product images
const defaultProductImages = [
  "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80",
  "https://images.unsplash.com/photo-1509631179647-0177331693ae?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80",
  "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80"
];

// Product introduction section
const ProductIntroSection = ({ 
  productName, 
  designerName, 
  productDescription,
  launchDate
}: { 
  productName: string, 
  designerName: string,
  productDescription: string,
  launchDate: string
}) => {
  const isMobile = useIsMobile();
  
  return (
    <section className="py-12 md:py-16">
      <div className="max-w-3xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
          <h2 className="text-2xl md:text-3xl font-display">{productName}</h2>
          <p className="text-yemalin-accent font-medium mt-2 md:mt-0 flex items-center">
            <Calendar className="inline mr-2 h-4 w-4" /> Launches {launchDate}
          </p>
        </div>
        
        <Separator className="mb-6" />
        
        <p className="text-gray-700 mb-8">{productDescription}</p>
        
        <div className="bg-yemalin-cream p-6 border-l-4 border-yemalin-accent">
          <p className="font-medium mb-2">Early Access Benefits:</p>
          <ul className="space-y-2">
            <li className="flex items-start">
              <Star className="h-5 w-5 text-yemalin-accent mr-2 mt-0.5" />
              <span>Shop the collection before public release</span>
            </li>
            <li className="flex items-start">
              <Star className="h-5 w-5 text-yemalin-accent mr-2 mt-0.5" />
              <span>Exclusive styling consultation with the designer</span>
            </li>
            <li className="flex items-start">
              <Star className="h-5 w-5 text-yemalin-accent mr-2 mt-0.5" />
              <span>Complimentary gift with your first purchase</span>
            </li>
          </ul>
        </div>
        
        <div className="mt-8 flex justify-center">
          <Button 
            asChild 
            size={isMobile ? "default" : "lg"} 
            className="bg-yemalin-accent hover:bg-yemalin-accent/90 text-white"
          >
            <a href="#early-access">
              Reserve Your Spot <ArrowRight className="ml-2 h-4 w-4" />
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
};

// Product gallery section with responsive grid
const ProductGallerySection = ({ images }: { images: string[] }) => {
  return (
    <section className="py-12 md:py-16">
      <h2 className="text-2xl md:text-3xl font-display text-center mb-8">Preview the Collection</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {images.map((image, index) => (
          <div key={index} className="aspect-w-3 aspect-h-4 overflow-hidden">
            <img 
              src={image} 
              alt={`Collection preview ${index + 1}`} 
              className="w-full h-full object-cover transition-transform hover:scale-105 duration-500"
            />
          </div>
        ))}
      </div>
    </section>
  );
};

// Designer section
const DesignerSection = ({ name }: { name: string }) => {
  return (
    <section className="py-12 md:py-16 bg-yemalin-grey-100 -mx-4 px-4">
      <div className="max-w-3xl mx-auto flex flex-col md:flex-row items-center gap-8">
        <div className="w-full md:w-1/3">
          <div className="aspect-w-1 aspect-h-1 rounded-full overflow-hidden">
            <img 
              src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=300&q=80" 
              alt={name}
              className="w-full h-full object-cover"
            />
          </div>
        </div>
        <div className="w-full md:w-2/3 text-center md:text-left">
          <h2 className="text-2xl md:text-3xl font-display mb-4">Meet {name}</h2>
          <p className="text-gray-700 mb-4">
            A visionary designer with a passion for sustainable fashion and artisanal craftsmanship.
            With over a decade of experience in the fashion industry, {name.split(' ')[0]} brings a
            unique perspective to every collection, blending traditional techniques with modern aesthetics.
          </p>
          <Button variant="outline" className="mt-2 border-yemalin-grey-800 hover:bg-yemalin-grey-100">
            Learn More About the Designer
          </Button>
        </div>
      </div>
    </section>
  );
};

// Early access sign up section
const EarlyAccessSection = ({ onSuccess }: { onSuccess: () => void }) => {
  return (
    <section id="early-access" className="py-12 md:py-16 scroll-mt-16">
      <div className="max-w-xl mx-auto">
        <h2 className="text-2xl md:text-3xl font-display text-center mb-6">Secure Your Early Access</h2>
        <p className="text-center text-gray-700 mb-8">
          Limited spots available. Sign up today to be among the first to shop this exclusive collection.
        </p>
        
        <div className="bg-white border border-gray-200 shadow-md p-6 md:p-8">
          <div className="flex items-center justify-center mb-6">
            <Clock className="h-5 w-5 text-yemalin-accent mr-2" />
            <span className="text-sm font-medium">Early access opens 48 hours before public launch</span>
          </div>
          
          <LeadMagnet
            type="inline"
            offer="early-access"
            source="Product Launch Landing Page"
            onSuccess={onSuccess}
          />
        </div>
      </div>
    </section>
  );
};

// Thank you section after sign up
const ThankYouSection = ({ 
  productName, 
  launchDate 
}: { 
  productName: string, 
  launchDate: string 
}) => {
  return (
    <section className="py-16 md:py-24 text-center max-w-2xl mx-auto">
      <div className="bg-yemalin-cream p-8 md:p-12 border border-yemalin-accent/20 rounded-sm">
        <h2 className="text-2xl md:text-3xl font-display mb-4">You're on the List!</h2>
        <p className="text-gray-700 mb-6">
          Thank you for your interest in {productName}. You've successfully secured early access to the collection launching on {launchDate}.
        </p>
        <p className="text-gray-700 mb-6">
          We'll send you an email with exclusive access details 48 hours before the public launch.
        </p>
        <Button asChild className="bg-yemalin-accent hover:bg-yemalin-accent/90 text-white">
          <a href="/">
            Explore More Collections <ArrowRight className="ml-2 h-4 w-4" />
          </a>
        </Button>
      </div>
    </section>
  );
};

export default ProductLaunchLandingPage;
