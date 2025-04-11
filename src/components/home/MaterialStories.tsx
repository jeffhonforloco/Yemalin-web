
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ChevronRight } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { motion } from 'framer-motion';

// Sample material data - in a real app, this would come from an API
const featuredMaterials = [
  {
    id: "silk",
    name: "Mulberry Silk",
    origin: "China & Japan",
    image: "https://images.unsplash.com/photo-1589394915835-964da87c1303?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    description: "Prized for its natural sheen, softness, and temperature-regulating properties, Mulberry silk has been treasured for millennia.",
    sustainability: "Renewable resource cultivated using traditional methods that preserve biodiversity.",
    productImage: "https://images.unsplash.com/photo-1582562124811-c09040d0a901?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "linen",
    name: "Belgian Linen",
    origin: "Belgium",
    image: "https://images.unsplash.com/photo-1594761051656-73fefd47ad16?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    description: "Known for its exceptional durability and breathability, Belgian linen becomes more beautiful with age.",
    sustainability: "Flax requires minimal water and pesticides, making linen one of the most eco-friendly textile fibers.",
    productImage: "https://images.unsplash.com/photo-1605618826115-fb9e775cf935?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "wool",
    name: "Merino Wool",
    origin: "Australia & New Zealand",
    image: "https://images.unsplash.com/photo-1599974202733-c2b17594b1e9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    description: "Ultra-fine fibers create a luxuriously soft hand feel while providing natural temperature regulation.",
    sustainability: "Our merino is sourced from certified ethical farms prioritizing animal welfare and environmental stewardship.",
    productImage: "https://images.unsplash.com/photo-1583342093276-efa17116469d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80"
  }
];

// Animation variants
const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.6 }
  }
};

const MaterialStories = () => {
  const [selectedMaterial, setSelectedMaterial] = useState(featuredMaterials[0]);
  
  return (
    <section className="py-20 bg-yemalin-cream" id="material-stories">
      <div className="luxury-container">
        <motion.div 
          className="text-center mb-12"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeIn}
        >
          <h2 className="text-3xl md:text-4xl font-display mb-3">Material Stories</h2>
          <p className="text-yemalin-grey-600 max-w-2xl mx-auto">
            Explore the exceptional materials that form the foundation of our collections and their journey from source to garment
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
          >
            <div className="aspect-video relative overflow-hidden rounded-lg shadow-lg">
              <img 
                src={selectedMaterial.image} 
                alt={selectedMaterial.name}
                className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-6">
                <div className="text-white">
                  <h3 className="text-2xl font-display">{selectedMaterial.name}</h3>
                  <p className="opacity-90 text-sm">Origin: {selectedMaterial.origin}</p>
                </div>
              </div>
            </div>
            
            <div className="mt-6 grid grid-cols-3 gap-4">
              {featuredMaterials.map((material) => (
                <button 
                  key={material.id}
                  className={`aspect-square overflow-hidden rounded-md cursor-pointer transition-all ${
                    selectedMaterial.id === material.id ? 'ring-2 ring-yemalin-accent' : 'hover:ring-2 hover:ring-yemalin-accent/50'
                  }`}
                  onClick={() => setSelectedMaterial(material)}
                  aria-label={`Select ${material.name}`}
                  aria-pressed={selectedMaterial.id === material.id}
                >
                  <img 
                    src={material.image} 
                    alt={material.name}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </button>
              ))}
            </div>
          </motion.div>
          
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
          >
            <span className="text-yemalin-accent uppercase text-xs tracking-wider">Featured Material</span>
            <h3 className="text-2xl md:text-3xl font-display mt-2 mb-4">{selectedMaterial.name}</h3>
            <p className="text-gray-700 mb-6">
              {selectedMaterial.description}
            </p>
            
            <Separator className="my-6" />
            
            <div className="mb-6">
              <h4 className="font-medium mb-2">Sustainability</h4>
              <p className="text-gray-600 text-sm">
                {selectedMaterial.sustainability}
              </p>
            </div>
            
            <div className="mb-8">
              <h4 className="font-medium mb-4">Crafted into Excellence</h4>
              <div className="flex gap-4 items-center">
                <div className="w-20 h-20 flex-shrink-0 rounded-md overflow-hidden">
                  <img 
                    src={selectedMaterial.productImage}
                    alt="Product made with this material"
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </div>
                <div>
                  <p className="text-sm text-gray-700">
                    From raw material to finished piece, our skilled artisans transform {selectedMaterial.name.toLowerCase()} into timeless garments that honor its natural properties.
                  </p>
                </div>
              </div>
            </div>
            
            <div className="flex flex-wrap gap-4">
              <Button asChild>
                <Link to={`/materials/${selectedMaterial.id}`}>
                  Explore Material Story
                </Link>
              </Button>
              <Button asChild variant="outline">
                <Link to={`/shop?material=${selectedMaterial.id}`}>
                  Shop {selectedMaterial.name}
                </Link>
              </Button>
            </div>
          </motion.div>
        </div>
        
        <div className="mt-12 text-center">
          <Link to="/materials" className="text-yemalin-accent hover:underline inline-flex items-center group">
            Discover All Material Stories
            <ChevronRight size={16} className="ml-1 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default MaterialStories;
