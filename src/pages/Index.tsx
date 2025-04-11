
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
import SEOMeta from '@/components/SEO/SEOMeta';

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
      <SEOMeta 
        title="Yemalin | Fashion Journal and Luxury Marketplace"
        description="Explore fashion insights, trends, and curated luxury pieces. Yemalin brings you thoughtful editorial content alongside exclusive designer collections."
        keywords={["fashion journal", "luxury editorial", "designer clothing", "sustainable fashion", "boutique designers", "high-end fashion", "fashion marketplace"]}
      />
      
      {/* Dynamic Hero Section with brand vision */}
      <Hero />
      
      {/* Main Journal Section - Primary Content */}
      <div className="py-16 bg-white">
        <div className="luxury-container text-center mb-8">
          <h2 className="font-display text-3xl md:text-5xl mb-3">Our Journal</h2>
          <p className="text-yemalin-grey-600 max-w-2xl mx-auto">
            Thoughtful perspectives on style, sustainability, and the cultural narratives shaping fashion today
          </p>
        </div>
      </div>
      
      {/* Enhanced Journal Section */}
      <JournalSection />
      
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
      
      {/* Popup Lead Magnet - triggers after 5 seconds or exit intent */}
      <PopupLeadMagnet 
        delay={5000} 
        exitIntent={true} 
        offer="early-access" 
        title="Join Our Style Insider List"
        description="Get early access to our latest journal features and exclusive offers when you join our community."
        source="Homepage Popup"
      />

      {/* Free Fashion Trend Report Lead Magnet */}
      <TrendReport />
      
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

      {/* Exclusive Product Drop Teaser */}
      <ExclusiveDrop />
      
      {/* New Arrivals - Now a smaller section */}
      <div className="py-16 bg-white">
        <div className="luxury-container">
          <div className="mb-8 text-center">
            <h2 className="font-display text-2xl md:text-3xl mb-3">New Arrivals</h2>
            <p className="text-yemalin-grey-600 max-w-2xl mx-auto">
              The latest additions to our curated collection
            </p>
          </div>
          
          <ProductGrid 
            products={newArrivals.slice(0, 4)}
            columns={4}
          />
          
          <div className="mt-8 text-center">
            <Link to="/shop">
              <Button className="bg-yemalin-black hover:bg-yemalin-grey-800">
                Shop New Arrivals
              </Button>
            </Link>
          </div>
        </div>
      </div>
      
      {/* Enhanced Email Marketing Integration */}
      <section className="py-16 bg-yemalin-accent text-white">
        <div className="luxury-container">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-display mb-4">Join Our Journal Subscribers</h2>
              <p className="mb-6">
                Subscribe to receive our latest articles, exclusive interviews with designers, 
                and early access to upcoming editorial features.
              </p>
              <div className="flex flex-wrap gap-3 mb-6">
                <span className="bg-white/20 px-3 py-1 text-sm rounded">Weekly Digest</span>
                <span className="bg-white/20 px-3 py-1 text-sm rounded">Exclusive Content</span>
                <span className="bg-white/20 px-3 py-1 text-sm rounded">Style Insights</span>
              </div>
              
              <EmailMarketingSignup 
                title="Subscribe to Our Newsletter"
                description="Never miss an article or feature"
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
      
      {/* Social Media Feed */}
      <section className="py-20 bg-white">
        <div className="luxury-container">
          <SocialFeed 
            title="Join Our Community" 
            description="See what fashion enthusiasts are sharing about Yemalin's journal on social media"
            hashtag="YemalinJournal"
          />
        </div>
      </section>
      
      {/* Featured Designer Section - Now smaller section */}
      <FeaturedDesigners />
      
      {/* Material Stories */}
      <MaterialStories />
      
      {/* Email Signup - Newsletter */}
      <Newsletter />
    </MainLayout>
  );
};

export default Index;
