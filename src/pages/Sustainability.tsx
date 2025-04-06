
import React from 'react';
import MainLayout from '../components/layouts/MainLayout';
import { Leaf, Recycle, Wind, Earth, TreeDeciduous } from 'lucide-react';

const Sustainability = () => {
  return (
    <MainLayout>
      {/* Hero Section */}
      <div className="relative h-[60vh] overflow-hidden">
        <img 
          src="https://images.unsplash.com/photo-1523712999610-f77fbcfc3843" 
          alt="Sustainability Hero" 
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/40 flex items-center">
          <div className="luxury-container">
            <div className="max-w-2xl text-white">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-light mb-4">Our Commitment to Sustainability</h1>
              <p className="text-lg md:text-xl opacity-90">Mindful fashion that respects our planet and its people.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Introduction */}
      <section className="py-16 bg-white">
        <div className="luxury-container">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-display mb-6">Fashion with Purpose</h2>
            <p className="text-lg text-gray-700 mb-8">
              At Yemalin, sustainability isn't just a buzzword—it's woven into the very fabric of our business. 
              We believe that beautiful fashion and environmental responsibility can and should coexist.
              Our commitment extends beyond our collections to every aspect of our operations.
            </p>
            <div className="flex justify-center">
              <Earth className="h-16 w-16 text-emerald-600" />
            </div>
          </div>
        </div>
      </section>

      {/* Our Pillars */}
      <section className="py-16 bg-gray-50">
        <div className="luxury-container">
          <h2 className="text-3xl md:text-4xl font-display mb-12 text-center">Our Sustainability Pillars</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 shadow-sm flex flex-col items-center text-center">
              <Leaf className="h-12 w-12 text-emerald-600 mb-4" />
              <h3 className="text-xl font-medium mb-3">Eco-Conscious Materials</h3>
              <p className="text-gray-600">
                We prioritize organic, recycled, and responsibly sourced materials that minimize environmental impact 
                while maintaining the highest quality and craftsmanship.
              </p>
            </div>

            <div className="bg-white p-8 shadow-sm flex flex-col items-center text-center">
              <Recycle className="h-12 w-12 text-emerald-600 mb-4" />
              <h3 className="text-xl font-medium mb-3">Circular Fashion</h3>
              <p className="text-gray-600">
                We design with longevity in mind and encourage repair, reuse, and responsible disposal 
                to extend the lifecycle of our garments and reduce waste.
              </p>
            </div>

            <div className="bg-white p-8 shadow-sm flex flex-col items-center text-center">
              <TreeDeciduous className="h-12 w-12 text-emerald-600 mb-4" />
              <h3 className="text-xl font-medium mb-3">Ethical Production</h3>
              <p className="text-gray-600">
                We partner with manufacturers who provide fair wages, safe working conditions, 
                and uphold human rights throughout our supply chain.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Our Initiatives */}
      <section className="py-16 bg-white">
        <div className="luxury-container">
          <h2 className="text-3xl md:text-4xl font-display mb-12 text-center">Our Initiatives</h2>
          
          <div className="space-y-16">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div>
                <div className="flex items-center mb-4">
                  <Leaf className="h-7 w-7 text-emerald-600 mr-3" />
                  <h3 className="text-2xl font-medium">Renewable Energy</h3>
                </div>
                <p className="text-gray-700 mb-6">
                  Our headquarters and partner facilities are transitioning to 100% renewable energy by 2025. 
                  We've already achieved a 60% reduction in our carbon footprint through solar installations 
                  and energy efficiency measures.
                </p>
                <ul className="list-disc pl-5 text-gray-700 space-y-2">
                  <li>Solar-powered offices and warehouses</li>
                  <li>Carbon-neutral shipping options</li>
                  <li>Energy-efficient lighting and equipment</li>
                </ul>
              </div>
              <div className="rounded-lg overflow-hidden shadow-lg">
                <img 
                  src="https://images.unsplash.com/photo-1615729947596-a598e5de0ab3" 
                  alt="Renewable Energy" 
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center md:flex-row-reverse">
              <div className="md:order-2">
                <div className="flex items-center mb-4">
                  <Wind className="h-7 w-7 text-emerald-600 mr-3" />
                  <h3 className="text-2xl font-medium">Water Conservation</h3>
                </div>
                <p className="text-gray-700 mb-6">
                  Fashion is one of the most water-intensive industries. We're partnering with designers who use innovative 
                  water-saving techniques and treatments, reducing water usage by up to 80% compared to conventional methods.
                </p>
                <ul className="list-disc pl-5 text-gray-700 space-y-2">
                  <li>Low-water dyeing processes</li>
                  <li>Rainwater collection systems</li>
                  <li>Water recycling in production facilities</li>
                </ul>
              </div>
              <div className="rounded-lg overflow-hidden shadow-lg md:order-1">
                <img 
                  src="https://images.unsplash.com/photo-1482938289607-e9573fc25ebb" 
                  alt="Water Conservation" 
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Progress */}
      <section className="py-16 bg-gray-50">
        <div className="luxury-container">
          <h2 className="text-3xl md:text-4xl font-display mb-12 text-center">Our Progress</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-white p-6 shadow-sm text-center">
              <div className="text-4xl font-bold text-emerald-600 mb-2">85%</div>
              <p className="text-gray-700">of our materials are sustainably sourced or recycled</p>
            </div>
            
            <div className="bg-white p-6 shadow-sm text-center">
              <div className="text-4xl font-bold text-emerald-600 mb-2">60%</div>
              <p className="text-gray-700">reduction in carbon emissions since 2020</p>
            </div>
            
            <div className="bg-white p-6 shadow-sm text-center">
              <div className="text-4xl font-bold text-emerald-600 mb-2">100%</div>
              <p className="text-gray-700">of packaging is recyclable or biodegradable</p>
            </div>
            
            <div className="bg-white p-6 shadow-sm text-center">
              <div className="text-4xl font-bold text-emerald-600 mb-2">250K</div>
              <p className="text-gray-700">trees planted through our reforestation program</p>
            </div>
          </div>
        </div>
      </section>

      {/* Join Our Journey */}
      <section className="py-16 bg-emerald-600 text-white">
        <div className="luxury-container">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-display mb-6">Join Our Sustainability Journey</h2>
            <p className="text-lg mb-8 opacity-90">
              Sustainability is a continuous journey, not a destination. We're committed to transparency 
              and constantly improving our practices. We invite you to be part of this journey.
            </p>
            <button className="bg-white text-emerald-600 px-8 py-3 font-medium hover:bg-gray-100 transition-colors">
              Subscribe to Our Sustainable Newsletter
            </button>
          </div>
        </div>
      </section>
    </MainLayout>
  );
};

export default Sustainability;
