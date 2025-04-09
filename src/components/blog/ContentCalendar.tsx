
import React from 'react';
import { Calendar, ChevronRight, BookOpen } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Link } from 'react-router-dom';

// Mock data for upcoming content
const upcomingContent = [
  {
    id: 1,
    date: 'April 15, 2025',
    title: 'Spring/Summer Collection Reviews',
    description: 'Exclusive coverage of the latest runway trends from major fashion houses',
    category: 'Trend Report',
    link: '/blog/spring-summer-collection-reviews'
  },
  {
    id: 2,
    date: 'April 22, 2025',
    title: 'Designer Spotlight: Emma Chen',
    description: 'An exclusive interview with the rising star of sustainable luxury',
    category: 'Designer Spotlight',
    link: '/blog/designer-spotlight-emma-chen'
  },
  {
    id: 3,
    date: 'May 1, 2025',
    title: 'The Evolution of Fashion Tech',
    description: 'How technology is transforming the future of fashion',
    category: 'Fashion Tech',
    link: '/blog/evolution-fashion-tech'
  },
  {
    id: 4,
    date: 'May 10, 2025',
    title: 'Sustainable Fabrics Guide',
    description: 'A comprehensive look at eco-friendly materials shaping the industry',
    category: 'Sustainability',
    link: '/blog/sustainable-fabrics-guide'
  }
];

const ContentCalendar: React.FC = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {upcomingContent.map((item) => (
        <Card key={item.id} className="bg-white overflow-hidden group transition-all hover:shadow-md">
          <CardContent className="p-0">
            <div className="bg-yemalin-black text-white p-3 flex items-center justify-between">
              <div className="flex items-center">
                <Calendar size={16} className="mr-2" />
                <span className="text-sm font-medium">{item.date}</span>
              </div>
              <span className="text-xs px-2 py-1 bg-white/20 rounded-full">{item.category}</span>
            </div>
            <div className="p-5">
              <h3 className="font-medium text-lg mb-2 line-clamp-2">{item.title}</h3>
              <p className="text-sm text-gray-600 mb-4 line-clamp-2">{item.description}</p>
              <Separator className="my-3" />
              <Link to={item.link} className="flex items-center text-sm font-medium text-yemalin-black hover:text-yemalin-grey-600 transition-colors">
                <BookOpen size={16} className="mr-2" />
                <span>See Preview</span>
                <ChevronRight size={16} className="ml-1 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default ContentCalendar;
