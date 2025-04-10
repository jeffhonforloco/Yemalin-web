
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
              At Yemalin, our name embodies the essence of the unexpected—a reflection of our commitment to delivering unparalleled luxury content that surprises and delights. Founded by Jeff Yemalin Bienvenu Honforloco, whose passion for high-class fashion fuels our vision, Yemalin is more than just a blog; it's a curated platform where the worlds of luxury fashion, art, and culture converge.
            </p>
            <p className="mb-4">
              Our journey begins with a dedication to exploring and showcasing the finest in luxury, offering our readers insightful content that spans emerging trends, timeless elegance, and the stories behind iconic designs. As we evolve, our ambition extends beyond content curation. In the future, we plan to introduce our own brand, seamlessly blending our deep appreciation for luxury with innovative designs that embody the sophistication our audience cherishes.
            </p>
            <p>
              Welcome to Yemalin—a sanctuary for connoisseurs of luxury, where every article is crafted with the same attention to detail and passion that we envision for our future creations. Join us as we embark on this journey, celebrating the art of luxury and anticipating the unveiling of our own signature brand.
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
