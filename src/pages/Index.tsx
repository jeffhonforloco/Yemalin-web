
import MainLayout from '../components/layouts/MainLayout';
import Hero from '../components/home/Hero';
import FeaturedCategories from '../components/home/FeaturedCategories';
import ProductGrid from '../components/products/ProductGrid';
import { featuredProducts, newArrivals } from '../data/mockProducts';
import FeaturedDesigners from '../components/home/FeaturedDesigners';
import FeaturedCollections from '../components/home/FeaturedCollections';
import Testimonials from '../components/home/Testimonials';
import Newsletter from '../components/home/Newsletter';
import OurJourney from '../components/home/OurJourney';
import JournalSection from '../components/home/JournalSection';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import TrendingSection from '../components/home/TrendingSection';
import ExclusiveDrop from '../components/home/ExclusiveDrop';

const Index = () => {
  return (
    <MainLayout>
      {/* Dynamic Hero Section with brand vision */}
      <Hero />
      
      {/* Exclusive Product Drop Teaser */}
      <ExclusiveDrop />
      
      {/* Featured Editorial Content */}
      <section className="py-20 bg-yemalin-cream">
        <div className="luxury-container">
          <div className="mb-12 text-center">
            <h2 className="font-display text-3xl md:text-4xl mb-3">Curated Content</h2>
            <p className="text-yemalin-grey-600 max-w-2xl mx-auto">
              Explore our collection of fashion insights, trends, and exclusive interviews with industry leaders
            </p>
          </div>
          
          <JournalSection />
          
          <div className="mt-12 text-center">
            <Link to="/blog">
              <Button variant="outline" size="lg" className="border-yemalin-black hover:bg-yemalin-black hover:text-white">
                Explore Our Journal
              </Button>
            </Link>
          </div>
        </div>
      </section>
      
      {/* Trending Fashion Topics */}
      <TrendingSection />
      
      {/* New Arrivals */}
      <div className="py-20">
        <div className="luxury-container">
          <div className="mb-12 text-center">
            <h2 className="font-display text-3xl md:text-4xl mb-3">New Arrivals</h2>
            <p className="text-yemalin-grey-600 max-w-2xl mx-auto">
              The latest additions to our curated collection, showcasing this season's most coveted pieces
            </p>
          </div>
          
          <ProductGrid 
            products={newArrivals.slice(0, 4)}
            columns={4}
          />
          
          <div className="mt-12 text-center">
            <Link to="/shop">
              <Button className="bg-yemalin-black hover:bg-yemalin-grey-800">
                Shop New Arrivals
              </Button>
            </Link>
          </div>
        </div>
      </div>
      
      {/* Our Brand Story - Visual Storytelling Section */}
      <OurJourney />
      
      {/* Featured Categories with visual appeal */}
      <FeaturedCategories />
      
      {/* Content-focused section: Style Insights */}
      <section className="py-20 bg-yemalin-cream">
        <div className="luxury-container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="order-2 lg:order-1">
              <span className="text-yemalin-accent text-sm uppercase tracking-wider">Style Insights</span>
              <h2 className="text-2xl md:text-4xl font-display mt-2 mb-4">Curated Fashion for the Modern Individual</h2>
              <p className="text-gray-600 mb-6">
                Our editorial team brings you carefully selected pieces that combine timeless elegance with contemporary design. 
                Each featured item represents our commitment to quality craftsmanship and sustainable fashion practices.
              </p>
              <Separator className="my-6" />
              <div className="flex flex-wrap gap-4 mt-4">
                <Link to="/blog/category/sustainable-fashion">
                  <Button variant="outline" className="border-yemalin-black hover:bg-yemalin-black hover:text-white">
                    Sustainability
                  </Button>
                </Link>
                <Link to="/blog/category/design-process">
                  <Button variant="outline" className="border-yemalin-black hover:bg-yemalin-black hover:text-white">
                    Design Process
                  </Button>
                </Link>
                <Link to="/blog/category/style-guides">
                  <Button variant="outline" className="border-yemalin-black hover:bg-yemalin-black hover:text-white">
                    Style Guides
                  </Button>
                </Link>
              </div>
            </div>
            <div className="order-1 lg:order-2">
              <img 
                src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"
                alt="Fashion Editorial"
                className="w-full h-[500px] object-cover object-center"
              />
            </div>
          </div>
        </div>
      </section>
      
      {/* Featured Designer Section */}
      <FeaturedDesigners />
      
      {/* Featured Collections */}
      <FeaturedCollections />
      
      {/* Email Signup - Newsletter */}
      <Newsletter />
      
      {/* Social Proof - Testimonials */}
      <Testimonials />
    </MainLayout>
  );
};

export default Index;
