
import MainLayout from '@/components/layouts/MainLayout';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { 
  CheckCircle,
  Heart, 
  Globe, 
  Award, 
  Users,
  ShoppingBag 
} from 'lucide-react';

// Mock data for team members
const teamMembers = [
  {
    name: 'Isabella Chen',
    role: 'Founder & Creative Director',
    image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=761&q=80',
    bio: 'With over 15 years of experience in luxury fashion, Isabella founded Yemalin with a vision to create a platform that celebrates exceptional design and craftsmanship.'
  },
  {
    name: 'Marcus Reid',
    role: 'Chief Operating Officer',
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80',
    bio: 'Marcus oversees all business operations at Yemalin, bringing his expertise from previous leadership roles at global luxury retailers.'
  },
  {
    name: 'Sophia Nguyen',
    role: 'Head of Designer Relations',
    image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=764&q=80',
    bio: 'Sophia works closely with our designers, helping them grow their brands while maintaining Yemalin's curatorial standards.'
  },
  {
    name: 'Alexander Palmer',
    role: 'Technology Director',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80',
    bio: 'Alexander leads our technology team, ensuring that both customers and designers have the best possible digital experience on our platform.'
  }
];

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
              Yemalin was born from founder Isabella Chen's vision to create a digital destination that rivals the experience of the world's finest boutiques, while providing independent designers with a platform to reach a global audience.
            </p>
            <p className="mb-4">
              After years working in luxury fashion, Isabella saw a gap in the market for a truly curated online space that could connect discerning customers with extraordinary independent designers whose work might otherwise remain undiscovered.
            </p>
            <p className="mb-4">
              The name "Yemalin" combines elements from multiple languages, reflecting our global perspective and the diverse influences that shape contemporary luxury.
            </p>
            <p>
              Today, we're proud to feature designers from over 20 countries, each bringing their unique cultural heritage and creative vision to our carefully curated collections.
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
      
      {/* Team Section */}
      <div className="bg-yemalin-grey-100 py-20">
        <div className="luxury-container">
          <h2 className="text-2xl md:text-3xl font-display mb-12 text-center">Meet Our Team</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamMembers.map((member, index) => (
              <div key={index} className="bg-white overflow-hidden group">
                <div className="h-80 overflow-hidden">
                  <img 
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-lg font-medium mb-1">{member.name}</h3>
                  <p className="text-gray-600 text-sm mb-3">{member.role}</p>
                  <p className="text-sm">{member.bio}</p>
                </div>
              </div>
            ))}
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
