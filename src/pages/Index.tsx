
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

const Index = () => {
  return (
    <MainLayout>
      <Hero />
      
      <div className="luxury-container">
        <ProductGrid 
          title="New Arrivals" 
          subtitle="The latest additions to our curated collection"
          products={newArrivals}
          columns={4}
        />
      </div>
      
      <FeaturedCategories />
      
      <div className="luxury-container">
        <ProductGrid 
          title="Featured Products" 
          subtitle="Handpicked selections from our luxury collections"
          products={featuredProducts}
          columns={4}
        />
      </div>
      
      <OurJourney />
      <FeaturedDesigners />
      <FeaturedCollections />
      <JournalSection />
      <Testimonials />
      <Newsletter />
    </MainLayout>
  );
};

export default Index;
