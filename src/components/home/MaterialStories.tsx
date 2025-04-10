
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ChevronRight } from 'lucide-react';
import { Separator } from '@/components/ui/separator';

// Sample material data - in a real app, this would come from an API
const featuredMaterials = [
  {
    id: "silk",
    name: "Mulberry Silk",
    origin: "China & Japan",
    image: "/placeholder.svg",
    description: "Prized for its natural sheen, softness, and temperature-regulating properties, Mulberry silk has been treasured for millennia.",
    sustainability: "Renewable resource cultivated using traditional methods that preserve biodiversity.",
    productImage: "/placeholder.svg"
  },
  {
    id: "linen",
    name: "Belgian Linen",
    origin: "Belgium",
    image: "/placeholder.svg",
    description: "Known for its exceptional durability and breathability, Belgian linen becomes more beautiful with age.",
    sustainability: "Flax requires minimal water and pesticides, making linen one of the most eco-friendly textile fibers.",
    productImage: "/placeholder.svg"
  },
  {
    id: "wool",
    name: "Merino Wool",
    origin: "Australia & New Zealand",
    image: "/placeholder.svg",
    description: "Ultra-fine fibers create a luxuriously soft hand feel while providing natural temperature regulation.",
    sustainability: "Our merino is sourced from certified ethical farms prioritizing animal welfare and environmental stewardship.",
    productImage: "/placeholder.svg"
  }
];

const MaterialStories = () => {
  const [selectedMaterial, setSelectedMaterial] = useState(featuredMaterials[0]);
  
  return (
    <section className="py-20 bg-yemalin-cream">
      <div className="luxury-container">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-display mb-3">Material Stories</h2>
          <p className="text-yemalin-grey-600 max-w-2xl mx-auto">
            Explore the exceptional materials that form the foundation of our collections and their journey from source to garment
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
          <div>
            <div className="aspect-video relative overflow-hidden">
              <img 
                src={selectedMaterial.image} 
                alt={selectedMaterial.name}
                className="w-full h-full object-cover"
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
                <div 
                  key={material.id}
                  className={`aspect-square overflow-hidden cursor-pointer transition-all ${
                    selectedMaterial.id === material.id ? 'ring-2 ring-yemalin-accent' : 'hover:ring-2 hover:ring-yemalin-accent/50'
                  }`}
                  onClick={() => setSelectedMaterial(material)}
                >
                  <img 
                    src={material.image} 
                    alt={material.name}
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>
          </div>
          
          <div>
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
                <div className="w-20 h-20 flex-shrink-0">
                  <img 
                    src={selectedMaterial.productImage}
                    alt="Product made with this material"
                    className="w-full h-full object-cover"
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
          </div>
        </div>
        
        <div className="mt-12 text-center">
          <Link to="/materials" className="text-yemalin-accent hover:underline inline-flex items-center">
            Discover All Material Stories
            <ChevronRight size={16} className="ml-1" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default MaterialStories;
