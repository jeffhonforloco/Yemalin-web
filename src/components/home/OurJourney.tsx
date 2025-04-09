
import React from 'react';

const OurJourney = () => {
  return (
    <section className="py-16">
      <div className="luxury-container">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <p className="text-yemalin-accent font-medium mb-2">Our Story</p>
            <h2 className="text-2xl md:text-3xl font-display mb-6">The Yemalin Journey</h2>
            <p className="mb-4">
              Yemalin began as a whispered idea in founder Isabella Chen's mind—a vision of creating not just another fashion platform, but a living narrative where exceptional design and authentic storytelling intertwine.
            </p>
            <p className="mb-4">
              After years immersed in luxury fashion houses from Paris to Tokyo, Isabella recognized a void in the digital landscape. She envisioned a space that could capture the intimate experience of discovering a hidden boutique while wandering cobblestone streets—that moment when you find something extraordinarily personal amidst the ordinary.
            </p>
            <p className="mb-4">
              The name "Yemalin" draws from ancient words for "artful living" and "enduring beauty," embodying our belief that true style transcends seasons and trends to become part of your evolving personal story.
            </p>
            <p>
              Today, we curate not just garments but the stories behind them—connecting discerning individuals with independent visionaries across five continents whose creations become chapters in your own unfolding narrative.
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
