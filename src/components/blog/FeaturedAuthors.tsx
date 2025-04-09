
import React from 'react';
import { Link } from 'react-router-dom';

// Mock data for featured authors
const authors = [
  {
    id: 1,
    name: 'Sophia Martinez',
    role: 'Fashion Editor',
    image: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?q=80&w=256&auto=format&fit=crop',
    articles: 12,
    link: '/authors/sophia-martinez'
  },
  {
    id: 2,
    name: 'Elijah Park',
    role: 'Style Director',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=256&auto=format&fit=crop',
    articles: 8,
    link: '/authors/elijah-park'
  },
  {
    id: 3,
    name: 'Zoe Chen',
    role: 'Sustainability Expert',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=256&auto=format&fit=crop',
    articles: 15,
    link: '/authors/zoe-chen'
  }
];

const FeaturedAuthors: React.FC = () => {
  return (
    <div className="space-y-6">
      {authors.map((author) => (
        <Link key={author.id} to={author.link} className="flex items-center group">
          <div className="relative mr-3 overflow-hidden rounded-full w-14 h-14">
            <img 
              src={author.image} 
              alt={author.name} 
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
            />
          </div>
          <div>
            <h4 className="font-medium group-hover:text-yemalin-accent transition-colors">
              {author.name}
            </h4>
            <div className="text-xs text-gray-600">{author.role}</div>
            <div className="text-xs text-gray-500">{author.articles} articles</div>
          </div>
        </Link>
      ))}
      
      <Link 
        to="/authors" 
        className="text-sm text-yemalin-accent hover:text-yemalin-accent/80 font-medium block text-center pt-3"
      >
        View All Contributors
      </Link>
    </div>
  );
};

export default FeaturedAuthors;
