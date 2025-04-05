
import React from 'react';

const OurJourney = () => {
  return (
    <section className="py-16">
      <div className="luxury-container">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-2xl md:text-3xl font-display mb-6">The Yemalin Journey</h2>
            <p className="mb-4">
              Yemalin was born from founder Isabella Chen's vision to create a digital destination that rivals the experience of the world's finest boutiques, while providing independent designers with a platform to reach a global audience.
            </p>
            <p className="mb-4">
              After years working in luxury fashion, Isabella saw a gap in the market for a truly curated online space that could connect discerning customers with extraordinary independent designers whose work might otherwise remain undiscovered.
            </p>
            <p className="mb-4">
              The name "Yemalin" combines elements from multiple languages, reflecting our global perspective and the diverse influences that shape contemporary luxury.
            </p>
            <p>
              Today, we're proud to feature designers from over 20 countries, each bringing their unique cultural heritage and creative vision to our carefully curated collections.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <img 
              src="https://images.unsplash.com/photo-1558769132-cb1aea458c5e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1374&q=80"
              alt="Yemalin atelier"
              className="w-full h-auto object-cover object-center"
            />
            <img 
              src="https://images.unsplash.com/photo-1551488831-00ddcb6c6bd3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"
              alt="Fabric samples"
              className="w-full h-auto object-cover object-center"
            />
            <img 
              src="https://images.unsplash.com/photo-1605289982774-9a6fef564df8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=764&q=80"
              alt="Fashion design"
              className="w-full h-auto object-cover object-center"
            />
            <img 
              src="https://images.unsplash.com/photo-1488716820095-cbe80883c496?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=686&q=80"
              alt="Craftsmanship"
              className="w-full h-auto object-cover object-center"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default OurJourney;
