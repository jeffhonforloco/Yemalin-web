
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import MainLayout from '@/components/layouts/MainLayout';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { featuredProducts, newArrivals } from '@/data/mockProducts';
import ProductFeature from '@/components/products/ProductFeature';
import ContentToProductSection from '@/components/products/ContentToProductSection';
import ProductShowcaseSection from '@/components/products/ProductShowcaseSection';

const Showcase = () => {
  const [selectedTab, setSelectedTab] = useState('content');
  
  // Sample editorial content for the content-to-product section
  const editorialContent = (
    <>
      <h3 className="text-2xl font-display mb-4">The Art of Sustainable Luxury</h3>
      <p className="mb-4">
        In an era where fashion's environmental footprint is under increasing scrutiny, sustainable luxury stands as
        a testament to innovation without compromise. The finest craftsmanship now meets ecological responsibility,
        creating pieces that are not just beautiful, but mindful.
      </p>
      <p>
        This season's collection embodies this philosophy, with each piece carefully crafted from responsibly sourced
        materials, designed to transcend fleeting trends and become an enduring part of your wardrobe.
      </p>
    </>
  );
  
  return (
    <MainLayout>
      {/* Hero Section - Transitions between content and product focus */}
      <section className="bg-gradient-to-b from-yemalin-cream to-white py-20">
        <div className="luxury-container text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-display mb-6">
            Where Content Meets Commerce
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto mb-10">
            Explore our ecosystem that seamlessly blends editorial content with curated products,
            creating a unified brand experience.
          </p>
          
          <Tabs 
            defaultValue="content" 
            value={selectedTab} 
            onValueChange={setSelectedTab}
            className="max-w-3xl mx-auto"
          >
            <TabsList className="grid w-full grid-cols-2 mb-10">
              <TabsTrigger value="content">Content Focus</TabsTrigger>
              <TabsTrigger value="commerce">Commerce Focus</TabsTrigger>
            </TabsList>
            
            <TabsContent value="content" className="mt-6">
              <div className="p-6 bg-white rounded-lg shadow-md">
                <h3 className="text-xl font-display mb-4">Editorial Experience</h3>
                <p className="mb-6">
                  Content-first approach that seamlessly integrates products into the narrative,
                  creating an immersive brand story that educates and inspires.
                </p>
                <div className="aspect-video bg-gray-100 mb-6">
                  <img 
                    src="https://images.unsplash.com/photo-1493723843671-1d655e66ac1c?ixlib=rb-4.0.3" 
                    alt="Editorial layout example"
                    className="w-full h-full object-cover"
                  />
                </div>
                <Button onClick={() => setSelectedTab('commerce')}>
                  See Commerce Experience <ArrowRight className="ml-2" size={16} />
                </Button>
              </div>
            </TabsContent>
            
            <TabsContent value="commerce" className="mt-6">
              <div className="p-6 bg-white rounded-lg shadow-md">
                <h3 className="text-xl font-display mb-4">Commerce Experience</h3>
                <p className="mb-6">
                  Shoppable interfaces that retain the brand's editorial voice,
                  enabling a frictionless transition from inspiration to purchase.
                </p>
                <ProductFeature 
                  product={featuredProducts[0]}
                  variant="product-focus"
                  showDescription={false}
                />
                <div className="mt-6 text-center">
                  <Button onClick={() => setSelectedTab('content')}>
                    See Editorial Experience <ArrowRight className="ml-2" size={16} />
                  </Button>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* Showcase Section 1: Content to Product Transition */}
      <ContentToProductSection 
        title="Editorial Meets Commerce"
        subtitle="A seamless transition from storytelling to shopping"
        content={editorialContent}
        product={featuredProducts[2]}
        ctaText="Explore the Collection"
        ctaLink="/shop"
      />
      
      {/* Showcase Section 2: Product Grid in Content */}
      <div className="bg-gray-50 py-16">
        <div className="luxury-container">
          <div className="max-w-3xl mx-auto mb-12">
            <h2 className="text-3xl md:text-4xl font-display mb-4 text-center">Curated Collections</h2>
            <p className="text-gray-600 text-center mb-8">
              Our seasonal selections are thoughtfully curated to complement our editorial features,
              ensuring a cohesive experience from inspiration to acquisition.
            </p>
            <div className="prose max-w-none">
              <p>
                Each piece in our collection is selected not just for its aesthetic appeal, but for its story,
                its craftsmanship, and its alignment with our values. We believe that true luxury lies in the
                narrative behind the product—the hands that crafted it, the materials that compose it, and the
                legacy it represents.
              </p>
              <p>
                When editorial content and commerce are aligned, the result is a more meaningful connection
                between brand and consumer. It's not just about selling products; it's about sharing a vision
                and inviting others to participate in it.
              </p>
            </div>
          </div>
          
          <ProductShowcaseSection 
            title="Featured Selection"
            products={featuredProducts.slice(0, 3)}
            viewAllLink="/shop"
            layout="featured"
            background="light-gray"
          />
        </div>
      </div>
      
      {/* Showcase Section 3: Content with Product Detail */}
      <section className="py-16">
        <div className="luxury-container">
          <div className="grid md:grid-cols-5 gap-8 items-center">
            <div className="md:col-span-3">
              <div className="prose max-w-none">
                <span className="text-yemalin-accent uppercase tracking-wider">Designer Spotlight</span>
                <h2 className="text-3xl font-display mb-4">Elise Laurent: Redefining Modern Elegance</h2>
                <p>
                  Elise Laurent's design philosophy centers on creating pieces that are both timeless and distinctly
                  contemporary. Her keen eye for detail and commitment to sustainable practices have established her
                  as one of the most innovative designers of her generation.
                </p>
                <p>
                  The Silk Wrap Dress exemplifies Laurent's signature approach—luxurious fabrics, clean lines, and
                  versatile silhouettes that transition seamlessly from day to evening wear. It's a testament to her
                  belief that true luxury lies not in excess, but in thoughtful design that enhances the wearer's life.
                </p>
                <blockquote>
                  "I design for the woman who appreciates beauty but demands functionality. Each piece should feel
                  like a natural extension of herself, never an imposition."
                </blockquote>
              </div>
              
              <div className="mt-6">
                <Button asChild>
                  <Link to="/designers">
                    Explore Designer Profiles <ArrowRight size={16} className="ml-2" />
                  </Link>
                </Button>
              </div>
            </div>
            
            <div className="md:col-span-2">
              <ProductFeature 
                product={featuredProducts.find(p => p.brand === "Elise Laurent") || featuredProducts[0]}
                variant="content-focus"
                showDescription={false}
                showSocialShare
              />
            </div>
          </div>
        </div>
      </section>
      
      {/* Showcase Section 4: New Arrivals Grid */}
      <ProductShowcaseSection 
        title="New Arrivals"
        subtitle="The latest additions to our curated collection"
        products={newArrivals}
        background="cream"
      />
    </MainLayout>
  );
};

export default Showcase;
