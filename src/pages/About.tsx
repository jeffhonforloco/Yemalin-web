
import MainLayout from '@/components/layouts/MainLayout';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { 
  Heart, 
  Globe, 
  Award, 
  CheckCircle,
  Users,
  ShoppingBag 
} from 'lucide-react';

// Mock data for value propositions
const valueProps = [
  {
    icon: <Heart size={24} />,
    title: 'Curated Excellence',
    description: 'We meticulously select each designer and product, ensuring exceptional quality and design integrity.'
  },
  {
    icon: <Globe size={24} />,
    title: 'Global Perspective',
    description: 'Our marketplace features designers from around the world, offering diverse cultural influences and aesthetics.'
  },
  {
    icon: <Award size={24} />,
    title: 'Artisan Craftsmanship',
    description: 'We celebrate traditional techniques and handmade processes that result in pieces of lasting value.'
  },
  {
    icon: <CheckCircle size={24} />,
    title: 'Ethical Standards',
    description: 'We partner with designers who share our commitment to responsible production and fair labor practices.'
  }
];

const About = () => {
  return (
    <MainLayout>
      {/* Hero Section */}
      <div className="relative h-[70vh] overflow-hidden">
        <img 
          src="https://images.unsplash.com/photo-1551232864-3f0890e580d9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"
          alt="Yemalin atelier"
          className="w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
          <div className="text-center p-6">
            <h1 className="text-white text-3xl md:text-5xl font-display mb-4">Our Story</h1>
            <p className="text-white text-lg max-w-2xl mx-auto">
              Founded in 2020, Yemalin is more than a marketplace—it's a celebration of extraordinary design and craftsmanship.
            </p>
          </div>
        </div>
      </div>
      
      {/* Mission Statement */}
      <div className="luxury-container py-20">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-2xl md:text-3xl font-display mb-6">Our Mission</h2>
          <p className="text-xl leading-relaxed mb-10">
            Yemalin exists to connect discerning customers with exceptional independent designers, 
            creating a platform where creativity thrives and craftsmanship is celebrated.
          </p>
          <Separator className="max-w-xs mx-auto" />
        </div>
      </div>
      
      {/* Our Values */}
      <div className="bg-yemalin-grey-100 py-20">
        <div className="luxury-container">
          <h2 className="text-2xl md:text-3xl font-display mb-12 text-center">Our Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {valueProps.map((value, index) => (
              <div key={index} className="bg-white p-8 text-center">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-yemalin-grey-100 mb-4">
                  {value.icon}
                </div>
                <h3 className="text-lg font-medium mb-3">{value.title}</h3>
                <p className="text-gray-600">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      {/* Our Story */}
      <div className="luxury-container py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-2xl md:text-3xl font-display mb-6">The Yemalin Journey</h2>
            <p className="mb-4">
              At Yemalin, our name embodies the essence of the unexpected—a reflection of our commitment to delivering unparalleled luxury content that surprises and delights. Founded by Jeff Yemalin Bienvenu Honforloco, whose passion for high-class fashion fuels our vision, Yemalin is more than just a blog; it's a curated platform where the worlds of luxury fashion, art, and culture converge.
            </p>
            <p className="mb-4">
              Our journey begins with a dedication to exploring and showcasing the finest in luxury, offering our readers insightful content that spans emerging trends, timeless elegance, and the stories behind iconic designs. As we evolve, our ambition extends beyond content curation. In the future, we plan to introduce our own brand, seamlessly blending our deep appreciation for luxury with innovative designs that embody the sophistication our audience cherishes.
            </p>
            <p>
              Welcome to Yemalin—a sanctuary for connoisseurs of luxury, where every article is crafted with the same attention to detail and passion that we envision for our future creations. Join us as we embark on this journey, celebrating the art of luxury and anticipating the unveiling of our own signature brand.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <img 
              src="https://images.unsplash.com/photo-1558769132-cb1aea458c5e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1374&q=80"
              alt="Yemalin atelier"
              className="w-full h-auto object-cover object-center"
            />
            <img 
              src="https://images.unsplash.com/photo-1551488831-00ddcb6c6bd3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"
              alt="Fabric samples"
              className="w-full h-auto object-cover object-center"
            />
            <img 
              src="https://images.unsplash.com/photo-1605289982774-9a6fef564df8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=764&q=80"
              alt="Fashion design"
              className="w-full h-auto object-cover object-center"
            />
            <img 
              src="https://images.unsplash.com/photo-1488716820095-cbe80883c496?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=686&q=80"
              alt="Craftsmanship"
              className="w-full h-auto object-cover object-center"
            />
          </div>
        </div>
      </div>
      
      {/* Careers & Contact CTA */}
      <div className="luxury-container py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div className="bg-yemalin-grey-100 p-12 text-center">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-white mb-4">
              <Users size={24} />
            </div>
            <h3 className="text-xl font-display mb-4">Join Our Team</h3>
            <p className="mb-6">
              We're always looking for passionate individuals to join our growing team. 
              Explore current opportunities and become part of our journey.
            </p>
            <Link to="/careers">
              <Button className="bg-black text-white hover:bg-gray-800">
                View Careers
              </Button>
            </Link>
          </div>
          
          <div className="bg-yemalin-grey-100 p-12 text-center">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-white mb-4">
              <ShoppingBag size={24} />
            </div>
            <h3 className="text-xl font-display mb-4">Become a Designer</h3>
            <p className="mb-6">
              Are you a designer interested in joining our marketplace? 
              Learn about our application process and partnership benefits.
            </p>
            <Link to="/designers/apply">
              <Button className="bg-black text-white hover:bg-gray-800">
                Apply to Sell
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default About;
