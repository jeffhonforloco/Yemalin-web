
import { useParams, Link } from 'react-router-dom';
import MainLayout from '../components/layouts/MainLayout';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { ArrowLeft, ChevronRight, Share2, FileImage } from 'lucide-react';
import SEOMeta from '@/components/SEO/SEOMeta';
import ProductShowcaseSection from '@/components/products/ProductShowcaseSection';
import { featuredProducts } from '@/data/mockProducts';

// Sample material data - in a real app, this would come from an API or WordPress
const materials = [
  {
    id: "silk",
    name: "Mulberry Silk",
    origin: "China & Japan",
    image: "https://images.unsplash.com/photo-1589394915835-964da87c1303?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    heroImage: "https://images.unsplash.com/photo-1528697203043-733dafdaa316?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80",
    description: "Prized for its natural sheen, softness, and temperature-regulating properties, Mulberry silk has been treasured for millennia.",
    sustainability: "Renewable resource cultivated using traditional methods that preserve biodiversity.",
    history: "For over 5,000 years, silk has symbolized luxury and status. The journey of silk begins with silkworms feeding on mulberry leaves, spinning cocoons that are carefully harvested and unwound to create the finest threads.",
    care: "Dry clean recommended. If hand washing, use cold water with gentle detergent and avoid wringing. Iron on low heat or steam to remove wrinkles.",
    processSteps: [
      {
        title: "Silkworm Cultivation",
        description: "Silkworms are raised in controlled environments on a diet of mulberry leaves."
      },
      {
        title: "Cocoon Formation",
        description: "After about 35 days, the silkworms spin cocoons of raw silk threads."
      },
      {
        title: "Harvesting",
        description: "Cocoons are carefully collected and sorted for quality."
      },
      {
        title: "Reeling",
        description: "Cocoons are placed in hot water to loosen the sericin (silk gum) and the silk filament is unwound."
      },
      {
        title: "Weaving",
        description: "The silk threads are woven into fabric using traditional or modern looms."
      }
    ],
    gallery: [
      { 
        image: "https://images.unsplash.com/photo-1459501462159-97d5bded1416?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80", 
        caption: "Raw silk cocoons ready for processing" 
      },
      { 
        image: "https://images.unsplash.com/photo-1583766395091-2eb9994ed094?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80", 
        caption: "Traditional silk reeling process" 
      },
      { 
        image: "https://images.unsplash.com/photo-1582562124811-c09040d0a901?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80", 
        caption: "Finished silk fabric" 
      }
    ]
  },
  {
    id: "linen",
    name: "Belgian Linen",
    origin: "Belgium",
    image: "https://images.unsplash.com/photo-1594761051656-73fefd47ad16?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    heroImage: "https://images.unsplash.com/photo-1584450151850-3a0480eecab6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80",
    description: "Known for its exceptional durability and breathability, Belgian linen becomes more beautiful with age.",
    sustainability: "Flax requires minimal water and pesticides, making linen one of the most eco-friendly textile fibers.",
    history: "Belgium has been renowned for its exceptional linen production since the Middle Ages. The cool, damp climate of the region creates ideal conditions for growing flax and processing it into the world's finest linen.",
    care: "Machine washable on gentle cycle with mild detergent. Linen naturally wrinkles—embrace its character or steam to remove creases.",
    processSteps: [
      {
        title: "Flax Cultivation",
        description: "Flax plants are grown in Belgium's ideal cool, damp climate."
      },
      {
        title: "Harvesting",
        description: "Plants are pulled from the ground (not cut) to preserve fiber length."
      },
      {
        title: "Retting",
        description: "Flax is left in fields for dew retting, allowing natural decomposition to separate fibers."
      },
      {
        title: "Scutching",
        description: "Woody parts are removed and fibers are separated."
      },
      {
        title: "Spinning & Weaving",
        description: "Fibers are spun into yarn and woven using traditional techniques."
      }
    ],
    gallery: [
      { 
        image: "https://images.unsplash.com/photo-1499955085172-a104c9463ece?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80", 
        caption: "Flax fields in bloom" 
      },
      { 
        image: "https://images.unsplash.com/photo-1531002043926-6235bf9e2c3b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80", 
        caption: "Traditional linen processing" 
      },
      { 
        image: "https://images.unsplash.com/photo-1605618826115-fb9e775cf935?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80", 
        caption: "Finished linen fabric" 
      }
    ]
  },
  {
    id: "wool",
    name: "Merino Wool",
    origin: "Australia & New Zealand",
    image: "https://images.unsplash.com/photo-1599974202733-c2b17594b1e9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    heroImage: "https://images.unsplash.com/photo-1562025425-7d7ff2c3f110?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80",
    description: "Ultra-fine fibers create a luxuriously soft hand feel while providing natural temperature regulation.",
    sustainability: "Our merino is sourced from certified ethical farms prioritizing animal welfare and environmental stewardship.",
    history: "Merino sheep originated in Spain but were later introduced to Australia and New Zealand, where breeding programs developed the world's finest wool fibers. Today, these regions produce the highest quality merino prized for its exceptional softness.",
    care: "Gentle hand wash with wool-specific detergent or dry clean. Lay flat to dry away from direct sunlight and heat.",
    processSteps: [
      {
        title: "Ethical Shearing",
        description: "Skilled shearers carefully remove the wool without harming the sheep."
      },
      {
        title: "Grading & Sorting",
        description: "Raw wool is sorted by quality, fineness, and color."
      },
      {
        title: "Scouring",
        description: "Wool is washed to remove lanolin and impurities."
      },
      {
        title: "Carding",
        description: "Fibers are aligned and prepared for spinning."
      },
      {
        title: "Spinning & Weaving",
        description: "Fibers are spun into yarn and woven or knitted into fabric."
      }
    ],
    gallery: [
      { 
        image: "https://images.unsplash.com/photo-1539190299742-a1e6cca89af2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80", 
        caption: "Merino sheep in the Australian outback" 
      },
      { 
        image: "https://images.unsplash.com/photo-1558157870-000af36acd10?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80", 
        caption: "Wool processing facility" 
      },
      { 
        image: "https://images.unsplash.com/photo-1583342093276-efa17116469d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80", 
        caption: "Finished merino wool fabric" 
      }
    ]
  }
];

const MaterialStory = () => {
  // Get the material ID from the URL
  const { id } = useParams<{ id: string }>();
  
  // Find the material data
  const material = materials.find(m => m.id === id);
  
  // Handle case where material is not found
  if (!material) {
    return (
      <MainLayout>
        <div className="luxury-container py-20 text-center">
          <h1 className="text-3xl font-display mb-4">Material Not Found</h1>
          <p className="mb-6">The material you're looking for doesn't exist in our collection.</p>
          <Button asChild>
            <Link to="/materials">View All Materials</Link>
          </Button>
        </div>
      </MainLayout>
    );
  }
  
  return (
    <MainLayout>
      <SEOMeta 
        title={`${material.name} - Material Story | Yemalin`}
        description={`Discover the story behind ${material.name}: its origin, properties, sustainability impact, and how we transform it into luxury fashion.`}
        keywords={[material.name.toLowerCase(), "sustainable materials", "luxury textiles", "fashion materials", material.origin.toLowerCase(), "yemalin materials"]}
      />
      
      {/* Hero Section */}
      <div className="relative h-[70vh] min-h-[600px]">
        <img 
          src={material.heroImage} 
          alt={material.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/30 flex items-end">
          <div className="luxury-container py-16 text-white">
            <Link to="/materials" className="inline-flex items-center text-white/90 hover:text-white mb-4">
              <ArrowLeft size={16} className="mr-2" /> Back to Materials
            </Link>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-display mb-3">{material.name}</h1>
            <p className="text-xl max-w-2xl">{material.description}</p>
          </div>
        </div>
      </div>
      
      {/* Material Info Section */}
      <section className="py-16 bg-white">
        <div className="luxury-container">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2">
              <div className="mb-12">
                <h2 className="text-3xl font-display mb-6">Origin & History</h2>
                <p className="text-gray-700 mb-6">
                  <span className="font-semibold">Origin: </span>{material.origin}
                </p>
                <p className="text-gray-700">
                  {material.history}
                </p>
              </div>
              
              <Separator className="my-12" />
              
              <div className="mb-12">
                <h2 className="text-3xl font-display mb-6">From Source to Fabric</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {material.processSteps.map((step, index) => (
                    <div key={index} className="border border-gray-200 p-6 bg-gray-50 rounded-lg shadow-sm hover:shadow-md transition-shadow">
                      <div className="w-10 h-10 bg-yemalin-accent text-white rounded-full flex items-center justify-center mb-4">
                        {index + 1}
                      </div>
                      <h3 className="text-xl font-medium mb-2">{step.title}</h3>
                      <p className="text-gray-600">{step.description}</p>
                    </div>
                  ))}
                </div>
              </div>
              
              <Separator className="my-12" />
              
              <div className="mb-12">
                <h2 className="text-3xl font-display mb-6">Sustainability Impact</h2>
                <div className="bg-yemalin-cream p-8 rounded-lg shadow-sm">
                  <p className="text-gray-700">
                    {material.sustainability}
                  </p>
                </div>
              </div>
            </div>
            
            <div>
              <div className="sticky top-24">
                <div className="border border-gray-200 rounded-lg p-6 mb-8 shadow-sm">
                  <h3 className="text-xl font-medium mb-4 flex items-center">
                    <FileImage size={18} className="mr-2 text-yemalin-accent" />
                    Care Instructions
                  </h3>
                  <p className="text-gray-600">
                    {material.care}
                  </p>
                </div>
                
                <div className="border border-gray-200 rounded-lg p-6 mb-8 shadow-sm">
                  <h3 className="text-xl font-medium mb-4">Share This Story</h3>
                  <div className="flex gap-4">
                    <Button variant="outline" size="icon">
                      <Share2 size={18} />
                    </Button>
                    <Button variant="outline" className="flex-1">Copy Link</Button>
                  </div>
                </div>
                
                <div className="border border-gray-200 rounded-lg p-6 shadow-sm">
                  <h3 className="text-xl font-medium mb-4">Related Materials</h3>
                  <div className="space-y-3">
                    {materials.filter(m => m.id !== material.id).map(relatedMaterial => (
                      <Link 
                        key={relatedMaterial.id}
                        to={`/materials/${relatedMaterial.id}`} 
                        className="flex items-center gap-3 p-3 border border-gray-200 rounded-md hover:bg-gray-50 transition-colors"
                      >
                        <div className="w-12 h-12 flex-shrink-0 rounded-md overflow-hidden">
                          <img 
                            src={relatedMaterial.image} 
                            alt={relatedMaterial.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div>
                          <h4 className="font-medium">{relatedMaterial.name}</h4>
                          <p className="text-sm text-gray-500">{relatedMaterial.origin}</p>
                        </div>
                        <ChevronRight size={16} className="ml-auto" />
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Image Gallery Section */}
      <section className="py-16 bg-gray-50">
        <div className="luxury-container">
          <h2 className="text-3xl font-display mb-8 text-center">Material Gallery</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {material.gallery.map((item, index) => (
              <div key={index} className="overflow-hidden group rounded-lg shadow-md">
                <div className="aspect-[4/3] overflow-hidden">
                  <img 
                    src={item.image} 
                    alt={item.caption}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <p className="mt-3 mb-2 px-4 text-center text-gray-700 font-medium">{item.caption}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Shop Collection Section */}
      <ProductShowcaseSection
        title={`Shop Our ${material.name} Collection`}
        subtitle={`Discover our curated selection of pieces crafted from the finest ${material.name.toLowerCase()}`}
        products={featuredProducts.slice(0, 4)}
        viewAllLink={`/shop?material=${material.id}`}
        viewAllText={`View all ${material.name.toLowerCase()} pieces`}
        background="white"
      />
    </MainLayout>
  );
};

export default MaterialStory;
