
import MainLayout from '../components/layouts/MainLayout';
import Hero from '../components/home/Hero';
import { featuredProducts } from '../data/mockProducts';
import Newsletter from '../components/home/Newsletter';
import JournalSection from '../components/home/JournalSection';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { ArrowRight, Calendar } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import TrendingSection from '../components/home/TrendingSection';
import ContentCalendar from '../components/blog/ContentCalendar';
import TrendReport from '../components/home/TrendReport';
import PopupLeadMagnet from '../components/marketing/PopupLeadMagnet';
import ContentToProductSection from '../components/products/ContentToProductSection';
import EmailMarketingSignup from '../components/marketing/EmailMarketingSignup';
import SEOMeta from '@/components/SEO/SEOMeta';
import { motion } from 'framer-motion';

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
  
  // Animation variants
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6 }
    }
  };

  return (
    <MainLayout>
      <SEOMeta 
        title="Yemalin | Fashion Journal and Editorial Experience"
        description="Explore our curated fashion journal with in-depth articles, trend analyses, interviews with designers, and thoughtful perspectives on style and sustainability."
        keywords={["fashion journal", "luxury editorial", "fashion blog", "style insights", "sustainable fashion", "fashion trends", "fashion stories", "designer interviews"]}
      />
      
      {/* Hero Section with Journal Focus */}
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
      
      {/* Trending Fashion Topics */}
      <TrendingSection />
      
      {/* Content Calendar Preview - Enhanced Upcoming Features Section */}
      <section className="py-16 bg-white">
        <div className="luxury-container">
          <motion.div 
            className="text-center mb-12"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
          >
            <h2 className="font-display text-3xl md:text-4xl mb-3">Editorial Calendar</h2>
            <p className="text-yemalin-grey-600 max-w-2xl mx-auto">
              A preview of our upcoming features, interviews, and in-depth analyses curated for the modern fashion enthusiast
            </p>
            <div className="mt-6 flex justify-center">
              <Link to="/blog" className="inline-block">
                <Button variant="outline" className="flex items-center gap-2 border-yemalin-black">
                  <Calendar size={16} /> View Complete Calendar
                </Button>
              </Link>
            </div>
            <Separator className="max-w-md mx-auto mt-8" />
          </motion.div>
          
          <ContentCalendar />
        </div>
      </section>
      
      {/* Free Fashion Trend Report Lead Magnet */}
      <TrendReport />
      
      {/* Minimal Product Content - Just one section to maintain commerce aspect */}
      <section className="py-12 bg-white">
        <div className="luxury-container">
          <ContentToProductSection 
            title="From Stories to Style"
            content={editorialContent}
            product={featuredProducts[0]}
            ctaText="Explore Our Collection"
            ctaLink="/shop"
            reversed={true}
            className="mt-6"
          />
        </div>
      </section>
      
      {/* Popup Lead Magnet - triggers after 5 seconds or exit intent */}
      <PopupLeadMagnet 
        delay={5000} 
        exitIntent={true} 
        offer="early-access" 
        title="Join Our Style Insider List"
        description="Get early access to our latest journal features and exclusive offers when you join our community."
        source="Homepage Popup"
      />
      
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
      
      {/* Email Signup - Newsletter */}
      <Newsletter />
    </MainLayout>
  );
};

export default Index;
