
import React from 'react';
import { Link } from 'react-router-dom';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';

// Mock data for featured designers
const designers = [
  {
    id: 1,
    name: 'Sophia Martinez',
    role: 'Fashion Designer',
    image: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?q=80&w=256&auto=format&fit=crop',
    collections: 3,
    link: '/designers/sophia-martinez'
  },
  {
    id: 2,
    name: 'Elijah Park',
    role: 'Accessories Designer',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=256&auto=format&fit=crop',
    collections: 2,
    link: '/designers/elijah-park'
  },
  {
    id: 3,
    name: 'Zoe Chen',
    role: 'Sustainable Fashion Designer',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=256&auto=format&fit=crop',
    collections: 4,
    link: '/designers/zoe-chen'
  }
];

const FeaturedAuthors: React.FC = () => {
  return (
    <div className="space-y-6">
      {designers.map((designer) => (
        <Link key={designer.id} to={designer.link} className="flex items-center group">
          <Avatar className="mr-3 h-14 w-14">
            <AvatarImage 
              src={designer.image} 
              alt={designer.name} 
              className="object-cover group-hover:scale-110 transition-transform duration-300"
            />
            <AvatarFallback>{designer.name.substring(0, 2)}</AvatarFallback>
          </Avatar>
          <div>
            <h4 className="font-medium group-hover:text-yemalin-accent transition-colors">
              {designer.name}
            </h4>
            <div className="text-xs text-gray-600">{designer.role}</div>
            <div className="text-xs text-gray-500">{designer.collections} collections</div>
          </div>
        </Link>
      ))}
      
      <Link 
        to="/designers" 
        className="text-sm text-yemalin-accent hover:text-yemalin-accent/80 font-medium block text-center pt-3"
      >
        View All Designers
      </Link>
    </div>
  );
};

export default FeaturedAuthors;
