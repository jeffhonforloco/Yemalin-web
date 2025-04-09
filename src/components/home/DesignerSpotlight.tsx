
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, ChevronLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';

// Sample featured designer data - in a real app, this would come from an API
const featuredDesigners = [
  {
    id: 1,
    name: "Elisa Monteiro",
    brand: "Atelier Monteiro",
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    quote: "Fashion is a language that tells a story about the person who wears it.",
    philosophy: "Creating timeless pieces that honor traditional craftsmanship while embracing modern aesthetics.",
    featured: [
      {
        id: "prod-1",
        name: "Structured Wool Blazer",
        image: "https://images.unsplash.com/photo-1591369822096-ffd140ec948f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
        price: 580
      },
      {
        id: "prod-2",
        name: "Pleated Silk Dress",
        image: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
        price: 450
      },
      {
        id: "prod-3",
        name: "Hand-Stitched Leather Belt",
        image: "https://images.unsplash.com/photo-1544816155-12df9643f363?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
        price: 180
      }
    ]
  },
  {
    id: 2,
    name: "Hiroshi Tanaka",
    brand: "Tanaka Studio",
    image: "https://images.unsplash.com/photo-1566492031773-4f4e44671857?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    quote: "Simplicity is the ultimate sophistication in fashion.",
    philosophy: "Merging traditional Japanese minimalism with contemporary urban functionality.",
    featured: [
      {
        id: "prod-4",
        name: "Minimalist Cotton Jacket",
        image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
        price: 420
      },
      {
        id: "prod-5",
        name: "Textured Linen Shirt",
        image: "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
        price: 240
      },
      {
        id: "prod-6",
        name: "Raw Denim Trousers",
        image: "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
        price: 320
      }
    ]
  },
  {
    id: 3,
    name: "Amara Okafor",
    brand: "Okafor Atelier",
    image: "https://images.unsplash.com/photo-1589156280159-27698a70f29e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    quote: "Fashion allows us to bring our cultural heritage into the modern world.",
    philosophy: "Celebrating African textiles and craftsmanship through contemporary silhouettes.",
    featured: [
      {
        id: "prod-7",
        name: "Hand-Woven Statement Coat",
        image: "https://images.unsplash.com/photo-1608234808654-2a8875faa7fd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
        price: 690
      },
      {
        id: "prod-8",
        name: "Printed Silk Scarf",
        image: "https://images.unsplash.com/photo-1584030373081-f37b7bb4fa8e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
        price: 190
      },
      {
        id: "prod-9",
        name: "Indigo-Dyed Cotton Dress",
        image: "https://images.unsplash.com/photo-1612336307429-8a898d10e223?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
        price: 380
      }
    ]
  }
];

const DesignerSpotlight = () => {
  const [currentDesigner, setCurrentDesigner] = useState(0);
  const designer = featuredDesigners[currentDesigner];

  const nextDesigner = () => {
    setCurrentDesigner((prev) => 
      prev === featuredDesigners.length - 1 ? 0 : prev + 1
    );
  };

  const prevDesigner = () => {
    setCurrentDesigner((prev) => 
      prev === 0 ? featuredDesigners.length - 1 : prev - 1
    );
  };

  return (
    <section className="py-20 bg-white">
      <div className="luxury-container">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-display mb-3">Designer Spotlight</h2>
          <p className="text-yemalin-grey-600 max-w-2xl mx-auto">
            Discover the visionaries behind our curated collections and their unique design philosophies
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
          {/* Designer Info */}
          <div className="text-center lg:text-left">
            <div className="flex flex-col lg:flex-row items-center lg:items-start mb-6 gap-6">
              <img 
                src={designer.image} 
                alt={designer.name}
                className="w-24 h-24 rounded-full object-cover"
              />
              <div>
                <h3 className="text-2xl font-display mb-1">{designer.name}</h3>
                <p className="text-yemalin-accent mb-4">{designer.brand}</p>
                <p className="italic text-gray-700 mb-4">"{designer.quote}"</p>
                <p className="text-gray-600">{designer.philosophy}</p>
              </div>
            </div>
            <div className="mt-8">
              <Button asChild>
                <Link to={`/designers/${designer.id}`}>
                  Meet {designer.name}
                </Link>
              </Button>
            </div>
          </div>
          
          {/* Designer Products */}
          <div>
            <div className="relative">
              <h4 className="text-lg font-medium mb-4 text-center lg:text-left">Featured Pieces</h4>
              <div className="grid grid-cols-3 gap-4">
                {designer.featured.map((product) => (
                  <Link 
                    to={`/shop/${product.id}`} 
                    key={product.id}
                    className="group"
                  >
                    <div className="aspect-square overflow-hidden mb-2">
                      <img 
                        src={product.image} 
                        alt={product.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                    <h5 className="text-sm font-medium">{product.name}</h5>
                    <p className="text-sm text-gray-600">
                      ${product.price}
                    </p>
                  </Link>
                ))}
              </div>
              
              {/* Designer Navigation */}
              <div className="flex justify-center mt-8">
                <button 
                  onClick={prevDesigner}
                  className="p-2 border border-gray-300 rounded-full mr-4 hover:bg-gray-100 transition-colors"
                  aria-label="Previous designer"
                >
                  <ChevronLeft size={20} />
                </button>
                <button 
                  onClick={nextDesigner}
                  className="p-2 border border-gray-300 rounded-full hover:bg-gray-100 transition-colors"
                  aria-label="Next designer"
                >
                  <ChevronRight size={20} />
                </button>
              </div>
            </div>
          </div>
        </div>
        
        <div className="mt-12 text-center">
          <Link to="/designers" className="text-yemalin-accent hover:underline inline-flex items-center">
            Explore All Designers
            <ChevronRight size={16} className="ml-1" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default DesignerSpotlight;
