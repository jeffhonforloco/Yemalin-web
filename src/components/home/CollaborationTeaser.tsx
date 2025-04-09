
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Calendar, ArrowRight, Bell } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useIsMobile } from '@/hooks/use-mobile';

// Mock data for upcoming collaborations
const upcomingCollaborations = [
  {
    id: 1,
    name: "Sofia Rodriguez",
    type: "Influencer",
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=256&auto=format&fit=crop",
    collectionName: "Summer Essentials",
    dropDate: "June 15, 2025",
    description: "A curated collection of sustainable summer pieces inspired by Mediterranean travels.",
    link: "/landing/product-launch",
  },
  {
    id: 2,
    name: "Marcus Chen",
    type: "Guest Designer",
    image: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=256&auto=format&fit=crop",
    collectionName: "Urban Explorer",
    dropDate: "July 24, 2025",
    description: "Innovative streetwear designed for the modern city dweller with sustainability at its core.",
    link: "/landing/product-launch",
  },
];

const CollaborationTeaser = () => {
  const isMobile = useIsMobile();
  
  return (
    <section className="py-16 bg-yemalin-cream">
      <div className="luxury-container">
        <div className="mb-12 text-center">
          <h2 className="font-display text-3xl md:text-4xl mb-3">Upcoming Collaborations</h2>
          <p className="text-yemalin-grey-600 max-w-2xl mx-auto">
            Exclusive drops created in partnership with leading fashion influencers and guest designers
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {upcomingCollaborations.map((collab) => (
            <div 
              key={collab.id}
              className="bg-white p-6 md:p-8 shadow-sm group hover:shadow-md transition-shadow"
            >
              <div className="flex items-center mb-6">
                <Avatar className="h-16 w-16 mr-4 border-2 border-yemalin-accent/10">
                  <AvatarImage src={collab.image} alt={collab.name} className="object-cover" />
                  <AvatarFallback>{collab.name.substring(0, 2)}</AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="font-medium text-lg md:text-xl">{collab.name}</h3>
                  <p className="text-yemalin-accent text-sm">{collab.type} Collaboration</p>
                </div>
              </div>
              
              <Separator className="mb-6" />
              
              <h4 className="text-xl md:text-2xl font-display mb-2">
                The {collab.collectionName} Collection
              </h4>
              <p className="text-sm text-gray-600 mb-4">{collab.description}</p>
              
              <div className="flex items-center text-sm mb-6">
                <Calendar size={16} className="mr-2 text-yemalin-accent" />
                <span>Dropping {collab.dropDate}</span>
              </div>
              
              <div className="flex flex-col sm:flex-row items-center gap-3">
                <Button asChild className="w-full sm:w-auto">
                  <Link to={collab.link} className="flex items-center justify-center">
                    Get Early Access <ArrowRight size={16} className="ml-2" />
                  </Link>
                </Button>
                
                <Button 
                  variant="outline" 
                  className="w-full sm:w-auto border-yemalin-black hover:bg-yemalin-black hover:text-white"
                >
                  <Bell size={16} className="mr-2" /> Notify Me
                </Button>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-10 text-center">
          <Button asChild variant="outline" size={isMobile ? "default" : "lg"} className="border-yemalin-black hover:bg-yemalin-black hover:text-white">
            <Link to="/collaborations">
              View All Upcoming Collaborations <ArrowRight size={16} className="ml-2" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default CollaborationTeaser;
