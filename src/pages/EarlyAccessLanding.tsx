
import React from 'react';
import LandingPageLayout from '@/components/marketing/LandingPageLayout';
import { Card, CardContent } from '@/components/ui/card';
import { LeadMagnet } from '@/components/marketing/LeadMagnet';
import { Separator } from '@/components/ui/separator';
import { Check } from 'lucide-react';

const EarlyAccessLanding = () => {
  return (
    <LandingPageLayout 
      title="Get Exclusive Early Access to New Collections"
      subtitle="Join our Style Insider program and be the first to shop limited edition pieces before they're available to the public."
      ctaText="Join Style Insider"
      backgroundImage="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"
      secondaryCtaText="Learn More"
      secondaryCtaLink="#benefits"
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
        <div id="benefits">
          <h2 className="text-3xl font-display mb-6">Style Insider Benefits</h2>
          <Separator className="w-24 h-1 bg-yemalin-accent mb-8" />
          
          <div className="space-y-4">
            {[
              "48-hour early access to all new collection launches",
              "Exclusive member-only limited edition pieces",
              "Personal styling consultation with our fashion experts",
              "Invitation to private designer events and trunk shows",
              "Seasonal style guides curated by industry insiders",
              "Complimentary alterations on full-price items"
            ].map((benefit, i) => (
              <div key={i} className="flex items-start">
                <div className="mr-3 mt-1 bg-yemalin-accent rounded-full p-1">
                  <Check size={16} className="text-white" />
                </div>
                <p>{benefit}</p>
              </div>
            ))}
          </div>
          
          <div className="mt-10 space-y-6">
            <h3 className="text-xl font-semibold">What Our Style Insiders Say</h3>
            <Card>
              <CardContent className="pt-6">
                <p className="italic">"Being a Style Insider has completely transformed how I build my wardrobe. I love getting first access to new collections and the personal styling advice is invaluable."</p>
                <p className="mt-4 font-medium">— Emma L., Style Insider since 2023</p>
              </CardContent>
            </Card>
          </div>
        </div>
        
        <div id="lead-form" className="lg:sticky lg:top-8">
          <Card className="border-0 shadow-lg">
            <CardContent className="pt-6">
              <LeadMagnet
                type="inline"
                offer="early-access"
                title="Join Style Insider"
                description="Complete the form to get exclusive early access to our new collections and enjoy all Style Insider benefits."
                source="Early Access Landing Page"
                className="bg-transparent p-0"
              />
            </CardContent>
          </Card>
        </div>
      </div>
      
      <Separator className="my-16" />
      
      <div className="text-center">
        <h2 className="text-3xl font-display mb-6">Coming Next Season</h2>
        <p className="text-lg mb-8 max-w-2xl mx-auto">
          Our upcoming collection features exclusive collaborations with renowned designers and innovative sustainable materials.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          <div className="aspect-square relative overflow-hidden">
            <img 
              src="https://images.unsplash.com/photo-1525507119028-ed4c629a60a3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=880&q=80"
              alt="Preview of upcoming collection"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black bg-opacity-30 flex items-end p-4">
              <p className="text-white font-medium">Limited Edition Accessories</p>
            </div>
          </div>
          
          <div className="aspect-square relative overflow-hidden">
            <img 
              src="https://images.unsplash.com/photo-1539109136881-3be0616acf4b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80"
              alt="Preview of upcoming collection"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black bg-opacity-30 flex items-end p-4">
              <p className="text-white font-medium">Sustainable Luxury</p>
            </div>
          </div>
          
          <div className="aspect-square relative overflow-hidden">
            <img 
              src="https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=720&q=80"
              alt="Preview of upcoming collection"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black bg-opacity-30 flex items-end p-4">
              <p className="text-white font-medium">Artisan Craftsmanship</p>
            </div>
          </div>
        </div>
      </div>
    </LandingPageLayout>
  );
};

export default EarlyAccessLanding;
