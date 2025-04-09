
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
import { ArrowRight, Calendar } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import TrendingSection from '../components/home/TrendingSection';
import ExclusiveDrop from '../components/home/ExclusiveDrop';
import ContentCalendar from '../components/blog/ContentCalendar';
import TrendReport from '../components/home/TrendReport';
import PopupLeadMagnet from '../components/marketing/PopupLeadMagnet';
import SocialFeed from '@/components/social/SocialFeed';
import ContentToProductSection from '../components/products/ContentToProductSection';
import CollaborationTeaser from '../components/home/CollaborationTeaser';
import EmailMarketingSignup from '../components/marketing/EmailMarketingSignup';
import DesignerSpotlight from '../components/home/DesignerSpotlight';
import MaterialStories from '../components/home/MaterialStories';

const Index = () => {
  // Sample editorial content for the content-to-product section
  const editorialContent = (
    <>
      <h3 className="text-2xl font-display mb-4">The Future of Fashion</h3>
      <p className="mb-4">
        As we look to the future, Yemalin is pioneering a new approach to luxury fashion—one 
        that seamlessly blends editorial content with curated products.
      </p>
      <p>
        Our vision is to create a unified brand experience where inspiration and acquisition
        are part of the same journey, not separate destinations.
      </p>
    </>
  );

  return (
    <MainLayout>
      {/* Dynamic Hero Section with brand vision */}
      <Hero />
      
      {/* Exclusive Product Drop Teaser */}
      <ExclusiveDrop />
      
      {/* Popup Lead Magnet - triggers after 5 seconds or exit intent */}
      <PopupLeadMagnet 
        delay={5000} 
        exitIntent={true} 
        offer="early-access" 
        title="Join Our Style Insider List"
        description="Get early access to new collections and exclusive offers when you join our community."
        source="Homepage Popup"
      />
      
      {/* New Section: Designer Spotlight */}
      <DesignerSpotlight />
      
      {/* New Section: Material Stories */}
      <MaterialStories />
      
      {/* New Section: Collaboration Teaser - Influencer & Guest Designer Drops */}
      <CollaborationTeaser />
      
      {/* Content to Product Showcase */}
      <section className="py-16 bg-white">
        <div className="luxury-container text-center mb-10">
          <h2 className="font-display text-3xl md:text-4xl mb-3">Content Meets Commerce</h2>
          <p className="text-yemalin-grey-600 max-w-2xl mx-auto mb-6">
            Experience our innovative approach to blending editorial content with curated products
          </p>
          <Button asChild variant="outline" className="border-yemalin-black hover:bg-yemalin-black hover:text-white">
            <Link to="/showcase">
              Explore Our Showcase <ArrowRight size={16} className="ml-2" />
            </Link>
          </Button>
        </div>
        
        <ContentToProductSection 
          title="Featured Story"
          content={editorialContent}
          product={featuredProducts[0]}
          ctaText="See More Examples"
          ctaLink="/showcase"
          reversed={true}
          className="mt-10"
        />
      </section>
      
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
      
      {/* Social Media Feed */}
      <section className="py-20 bg-white">
        <div className="luxury-container">
          <SocialFeed 
            title="Join Our Community" 
            description="See what fashion enthusiasts are sharing about Yemalin on social media"
            hashtag="YemalinStyle"
          />
        </div>
      </section>
      
      {/* Enhanced Email Marketing Integration */}
      <section className="py-16 bg-yemalin-accent text-white">
        <div className="luxury-container">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-display mb-4">Be The First To Know</h2>
              <p className="mb-6">
                Join our exclusive list to receive early access to upcoming collections, 
                collaborations with designers and influencers, and special events.
              </p>
              <div className="flex flex-wrap gap-3 mb-6">
                <span className="bg-white/20 px-3 py-1 text-sm rounded">Early Access</span>
                <span className="bg-white/20 px-3 py-1 text-sm rounded">Limited Editions</span>
                <span className="bg-white/20 px-3 py-1 text-sm rounded">Exclusive Content</span>
              </div>
              
              <EmailMarketingSignup 
                title="Subscribe to Our Newsletter"
                description="Never miss a drop or collaboration announcement"
                buttonText="Join Now"
                source="Homepage Feature Section"
                darkMode={true}
              />
            </div>
            <div className="hidden md:block">
              <img 
                src="https://images.unsplash.com/photo-1588117260148-b47818741c74?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=700&q=80"
                alt="Fashion Newsletter"
                className="w-full h-[400px] object-cover"
              />
            </div>
          </div>
        </div>
      </section>
      
      {/* Free Fashion Trend Report Lead Magnet */}
      <TrendReport />
      
      {/* Content Calendar Preview */}
      <section className="py-16 bg-white">
        <div className="luxury-container">
          <div className="flex flex-col md:flex-row items-center justify-between mb-10">
            <div>
              <h2 className="font-display text-2xl md:text-3xl mb-2">Upcoming Features</h2>
              <p className="text-yemalin-grey-600">Stay ahead with our editorial calendar</p>
            </div>
            <Link to="/blog" className="mt-4 md:mt-0">
              <Button variant="outline" className="flex items-center gap-2 border-yemalin-black">
                <Calendar size={16} /> View Full Calendar
              </Button>
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <ContentCalendar />
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
