
import React from 'react';
import LandingPageLayout from '@/components/marketing/LandingPageLayout';
import { Card, CardContent } from '@/components/ui/card';
import { LeadMagnet } from '@/components/marketing/LeadMagnet';
import { Separator } from '@/components/ui/separator';
import { Check } from 'lucide-react';

const TrendReportLanding = () => {
  return (
    <LandingPageLayout 
      title="2025 Fashion Trends Report"
      subtitle="Get our comprehensive analysis of next year's most influential trends, emerging designers, and must-have pieces."
      ctaText="Download Free Report"
      backgroundImage="https://images.unsplash.com/photo-1483985988355-763728e1935b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
        <div>
          <h2 className="text-3xl font-display mb-6">What's Inside The Report</h2>
          <Separator className="w-24 h-1 bg-yemalin-accent mb-8" />
          
          <div className="space-y-6">
            <div className="flex items-start">
              <div className="mr-3 mt-1 bg-yemalin-accent rounded-full p-1">
                <Check size={16} className="text-white" />
              </div>
              <div>
                <h3 className="font-medium text-lg">Runway Analysis</h3>
                <p className="text-gray-600">Comprehensive breakdown of major fashion weeks and what they tell us about upcoming trends</p>
              </div>
            </div>
            
            <div className="flex items-start">
              <div className="mr-3 mt-1 bg-yemalin-accent rounded-full p-1">
                <Check size={16} className="text-white" />
              </div>
              <div>
                <h3 className="font-medium text-lg">Sustainable Fashion</h3>
                <p className="text-gray-600">In-depth look at eco-friendly innovations and the brands leading the sustainability movement</p>
              </div>
            </div>
            
            <div className="flex items-start">
              <div className="mr-3 mt-1 bg-yemalin-accent rounded-full p-1">
                <Check size={16} className="text-white" />
              </div>
              <div>
                <h3 className="font-medium text-lg">Emerging Designers</h3>
                <p className="text-gray-600">Spotlight on up-and-coming talent that will shape the future of fashion</p>
              </div>
            </div>
            
            <div className="flex items-start">
              <div className="mr-3 mt-1 bg-yemalin-accent rounded-full p-1">
                <Check size={16} className="text-white" />
              </div>
              <div>
                <h3 className="font-medium text-lg">Practical Styling Tips</h3>
                <p className="text-gray-600">Actionable advice on incorporating trends into your everyday wardrobe</p>
              </div>
            </div>
          </div>
          
          <div className="mt-12">
            <h3 className="text-xl font-semibold mb-4">Preview Pages</h3>
            <div className="grid grid-cols-3 gap-4">
              <img 
                src="https://images.unsplash.com/photo-1618436134908-e66d51080399?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=735&q=80" 
                alt="Report preview" 
                className="w-full h-32 object-cover object-center"
              />
              <img 
                src="https://images.unsplash.com/photo-1595341544972-1fdac373721b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80" 
                alt="Report preview" 
                className="w-full h-32 object-cover object-center"
              />
              <img 
                src="https://images.unsplash.com/photo-1558769132-cb1aea458c5e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1374&q=80" 
                alt="Report preview" 
                className="w-full h-32 object-cover object-center"
              />
            </div>
          </div>
        </div>
        
        <div id="lead-form" className="lg:sticky lg:top-8">
          <Card className="border-0 shadow-lg">
            <CardContent className="pt-6">
              <LeadMagnet
                type="inline"
                offer="trend-report"
                title="Download Free Trend Report"
                description="Get instant access to our comprehensive analysis of upcoming fashion trends, curated by our team of industry experts."
                source="Trend Report Landing Page"
                className="bg-transparent p-0"
              />
            </CardContent>
          </Card>
          
          <div className="mt-10 bg-yemalin-grey-100 p-6 rounded">
            <h3 className="font-medium mb-3">What Readers Say</h3>
            <div className="space-y-4">
              <div>
                <p className="italic">"This report has been invaluable for planning my seasonal purchases. The insights are spot-on and have helped me make smarter wardrobe investments."</p>
                <p className="text-sm mt-2">— Sarah T., Fashion Stylist</p>
              </div>
              <Separator />
              <div>
                <p className="italic">"As a boutique owner, the trend forecasting in this report helps me stock the right items that my customers will love."</p>
                <p className="text-sm mt-2">— Michael R., Retail Owner</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </LandingPageLayout>
  );
};

export default TrendReportLanding;
