
import MainLayout from '../components/layouts/MainLayout';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Separator } from '@/components/ui/separator';
import { ChevronRight } from 'lucide-react';
import ProductShowcaseSection from '@/components/products/ProductShowcaseSection';
import { featuredProducts } from '@/data/mockProducts';

// Sample material data - in a real app, this would come from an API
const materials = [
  {
    id: "silk",
    name: "Mulberry Silk",
    origin: "China & Japan",
    image: "https://images.unsplash.com/photo-1589394915835-964da87c1303?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    description: "Prized for its natural sheen, softness, and temperature-regulating properties, Mulberry silk has been treasured for millennia.",
    sustainability: "Renewable resource cultivated using traditional methods that preserve biodiversity.",
    history: "For over 5,000 years, silk has symbolized luxury and status. The journey of silk begins with silkworms feeding on mulberry leaves, spinning cocoons that are carefully harvested and unwound to create the finest threads.",
    care: "Dry clean recommended. If hand washing, use cold water with gentle detergent and avoid wringing. Iron on low heat or steam to remove wrinkles."
  },
  {
    id: "linen",
    name: "Belgian Linen",
    origin: "Belgium",
    image: "https://images.unsplash.com/photo-1594761051656-73fefd47ad16?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    description: "Known for its exceptional durability and breathability, Belgian linen becomes more beautiful with age.",
    sustainability: "Flax requires minimal water and pesticides, making linen one of the most eco-friendly textile fibers.",
    history: "Belgium has been renowned for its exceptional linen production since the Middle Ages. The cool, damp climate of the region creates ideal conditions for growing flax and processing it into the world's finest linen.",
    care: "Machine washable on gentle cycle with mild detergent. Linen naturally wrinkles—embrace its character or steam to remove creases."
  },
  {
    id: "wool",
    name: "Merino Wool",
    origin: "Australia & New Zealand",
    image: "https://images.unsplash.com/photo-1599974202733-c2b17594b1e9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    description: "Ultra-fine fibers create a luxuriously soft hand feel while providing natural temperature regulation.",
    sustainability: "Our merino is sourced from certified ethical farms prioritizing animal welfare and environmental stewardship.",
    history: "Merino sheep originated in Spain but were later introduced to Australia and New Zealand, where breeding programs developed the world's finest wool fibers. Today, these regions produce the highest quality merino prized for its exceptional softness.",
    care: "Gentle hand wash with wool-specific detergent or dry clean. Lay flat to dry away from direct sunlight and heat."
  },
  {
    id: "cashmere",
    name: "Mongolian Cashmere",
    origin: "Mongolia",
    image: "https://images.unsplash.com/photo-1583342093276-efa17116469d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    description: "The epitome of luxury, genuine Mongolian cashmere offers unparalleled softness and insulation.",
    sustainability: "Sourced through partnerships with nomadic herders who practice traditional, sustainable animal husbandry.",
    history: "Mongolian goats have developed uniquely fine undercoats to survive the region's extreme climate. Once a year, herders carefully comb this precious fiber from their goats during the spring molting season.",
    care: "Hand wash in cold water using cashmere-specific detergent or dry clean. Store folded with cedar blocks to prevent moths."
  },
  {
    id: "organic-cotton",
    name: "Organic Pima Cotton",
    origin: "Peru",
    image: "https://images.unsplash.com/photo-1605450637370-a63a9f275ef6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    description: "Extra-long staple cotton fibers create incredibly soft fabric with exceptional durability.",
    sustainability: "Certified organic farming practices use no synthetic pesticides or fertilizers, conserving water and maintaining soil health.",
    history: "Pima cotton, named after the Pima Native Americans who first cultivated it, has been grown in Peru for centuries. The country's unique microclimate creates ideal growing conditions for this premium cotton variety.",
    care: "Machine washable on gentle cycle with mild detergent. Tumble dry on low heat or air dry for best results."
  },
  {
    id: "japanese-denim",
    name: "Japanese Selvedge Denim",
    origin: "Japan",
    image: "https://images.unsplash.com/photo-1565084888279-aca607ecce0c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    description: "Woven on vintage shuttle looms, this premium denim develops a unique character and patina over time.",
    sustainability: "Our partner mills prioritize water conservation and recycling in the production process.",
    history: "When American denim production shifted to high-efficiency methods in the 1950s, Japanese craftsmen acquired the original shuttle looms and preserved the traditional weaving techniques, creating what is now considered the world's finest denim.",
    care: "Wash sparingly in cold water, inside out. Air dry away from direct sunlight to preserve color and integrity of the fabric."
  }
];

const Materials = () => {
  return (
    <MainLayout>
      {/* Hero Section */}
      <section className="relative h-[60vh] min-h-[500px] overflow-hidden">
        <img 
          src="https://images.unsplash.com/photo-1605618826115-fb9e775cf935?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"
          alt="Luxury fabrics"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
          <div className="text-center text-white max-w-3xl px-4">
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl mb-4">Material Stories</h1>
            <p className="text-lg md:text-xl max-w-2xl mx-auto">
              Discover the exceptional materials that form the foundation of our collections and their journey from source to garment
            </p>
          </div>
        </div>
      </section>
      
      {/* Introduction */}
      <section className="py-16 bg-white">
        <div className="luxury-container text-center">
          <h2 className="font-display text-3xl md:text-4xl mb-6">The Yemalin Material Philosophy</h2>
          <p className="text-gray-700 max-w-3xl mx-auto mb-8">
            At Yemalin, we believe that truly exceptional fashion begins with extraordinary materials. 
            Our curated selection represents the pinnacle of quality—fabrics with rich histories, 
            distinctive properties, and sustainable origins.
          </p>
          <p className="text-gray-700 max-w-3xl mx-auto">
            Each material is carefully selected not only for its aesthetic qualities but also for its 
            performance, longevity, and the story it carries. We partner with mills and producers who 
            share our commitment to craftsmanship, ethical production, and environmental responsibility.
          </p>
        </div>
      </section>
      
      {/* Material Grid */}
      <section className="py-16 bg-gray-50">
        <div className="luxury-container">
          <h2 className="font-display text-3xl md:text-4xl mb-8 text-center">Our Premium Materials</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {materials.map((material) => (
              <div key={material.id} className="bg-white border border-gray-100 group hover:shadow-lg transition-all duration-300">
                <div className="aspect-[3/2] overflow-hidden">
                  <img 
                    src={material.image} 
                    alt={material.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-6">
                  <h3 className="font-display text-xl mb-1">{material.name}</h3>
                  <p className="text-yemalin-accent text-sm mb-4">Origin: {material.origin}</p>
                  <p className="text-gray-600 mb-6 line-clamp-3">
                    {material.description}
                  </p>
                  <Button asChild>
                    <Link to={`/materials/${material.id}`}>
                      Discover Story <ChevronRight size={16} className="ml-1" />
                    </Link>
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Featured Material Detailed */}
      <section className="py-20 bg-white">
        <div className="luxury-container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <span className="text-yemalin-accent uppercase text-sm tracking-widest">Featured Material</span>
              <h2 className="text-3xl md:text-4xl font-display mt-2 mb-6">{materials[0].name}</h2>
              
              <p className="text-gray-700 mb-6">
                {materials[0].description}
              </p>
              
              <Separator className="my-8" />
              
              <div className="space-y-6">
                <div>
                  <h4 className="font-medium mb-2">History & Heritage</h4>
                  <p className="text-gray-600">
                    {materials[0].history}
                  </p>
                </div>
                
                <div>
                  <h4 className="font-medium mb-2">Sustainability</h4>
                  <p className="text-gray-600">
                    {materials[0].sustainability}
                  </p>
                </div>
                
                <div>
                  <h4 className="font-medium mb-2">Care Instructions</h4>
                  <p className="text-gray-600">
                    {materials[0].care}
                  </p>
                </div>
              </div>
              
              <div className="mt-8">
                <Button asChild>
                  <Link to={`/materials/${materials[0].id}`}>
                    Explore Full Story
                  </Link>
                </Button>
              </div>
            </div>
            
            <div className="lg:h-[600px] overflow-hidden">
              <img 
                src={materials[0].image}
                alt={materials[0].name}
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>
      
      {/* Shop by Material */}
      <ProductShowcaseSection
        title="Shop Silk Collection"
        subtitle="Discover our curated selection of pieces crafted from the finest silk"
        products={featuredProducts.slice(0, 4)}
        viewAllLink="/shop?material=silk"
        viewAllText="View all silk pieces"
        background="cream"
      />
      
      {/* Educational Content */}
      <section className="py-16 bg-white">
        <div className="luxury-container">
          <h2 className="font-display text-3xl md:text-4xl mb-8 text-center">Understanding Quality Materials</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="aspect-square bg-gray-100 flex items-center justify-center mb-6">
                <span className="text-4xl">🔍</span>
              </div>
              <h3 className="text-xl font-medium mb-2">How to Identify Quality</h3>
              <p className="text-gray-600">
                Learn the key indicators of exceptional materials, from fiber length to weaving techniques.
              </p>
              <Button asChild variant="link" className="mt-4">
                <Link to="/blog/how-to-identify-quality-materials">
                  Read Guide <ChevronRight size={14} className="ml-1" />
                </Link>
              </Button>
            </div>
            
            <div className="text-center">
              <div className="aspect-square bg-gray-100 flex items-center justify-center mb-6">
                <span className="text-4xl">✨</span>
              </div>
              <h3 className="text-xl font-medium mb-2">Care & Maintenance</h3>
              <p className="text-gray-600">
                Essential tips for preserving the beauty and integrity of your luxury garments.
              </p>
              <Button asChild variant="link" className="mt-4">
                <Link to="/blog/luxury-garment-care-guide">
                  Read Guide <ChevronRight size={14} className="ml-1" />
                </Link>
              </Button>
            </div>
            
            <div className="text-center">
              <div className="aspect-square bg-gray-100 flex items-center justify-center mb-6">
                <span className="text-4xl">🌱</span>
              </div>
              <h3 className="text-xl font-medium mb-2">Sustainability Matters</h3>
              <p className="text-gray-600">
                Understanding the environmental impact of different materials and production methods.
              </p>
              <Button asChild variant="link" className="mt-4">
                <Link to="/blog/understanding-sustainable-fabrics">
                  Read Guide <ChevronRight size={14} className="ml-1" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </MainLayout>
  );
};

export default Materials;
