
import React from 'react';
import { LeadMagnet } from '@/components/marketing/LeadMagnet';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const TrendReport = () => {
  return (
    <section className="py-16 bg-white">
      <div className="luxury-container">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          <div>
            <h2 className="font-display text-3xl mb-4">2025 Fashion Trends Report</h2>
            <Separator className="w-20 bg-yemalin-accent h-0.5 mb-6" />
            
            <p className="text-gray-600 mb-6">
              Our expert fashion editors and industry insiders have compiled the definitive guide to next 
              year's most influential trends, emerging designers, and must-have pieces.
            </p>
            
            <ul className="space-y-3 mb-8">
              <li className="flex items-start">
                <span className="text-yemalin-accent mr-2">✓</span> 
                <span>Comprehensive analysis of runway collections</span>
              </li>
              <li className="flex items-start">
                <span className="text-yemalin-accent mr-2">✓</span> 
                <span>Sustainable fashion forecast and brands to watch</span>
              </li>
              <li className="flex items-start">
                <span className="text-yemalin-accent mr-2">✓</span> 
                <span>Exclusive interviews with leading designers</span>
              </li>
              <li className="flex items-start">
                <span className="text-yemalin-accent mr-2">✓</span> 
                <span>Practical styling tips for incorporating trends</span>
              </li>
            </ul>
            
            <Button 
              className="bg-yemalin-black hover:bg-yemalin-grey-800"
              asChild
            >
              <Link to="/trend-report">
                Learn More & Download
              </Link>
            </Button>
          </div>
          
          <div className="bg-yemalin-grey-100 p-8">
            <LeadMagnet 
              type="inline"
              offer="trend-report"
              title="Download Free Fashion Trends Report"
              description="Get instant access to our comprehensive analysis of upcoming fashion trends, curated by our team of industry experts."
              source="Homepage Trend Report Section"
              className="bg-transparent p-0"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

export default TrendReport;
