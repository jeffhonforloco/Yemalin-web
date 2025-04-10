
import React from 'react';
import { Calendar, ChevronRight, BookOpen } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Link } from 'react-router-dom';
import { blogCategories } from '@/data/blogCategoriesData';

// Generate upcoming dates for the content calendar
const generateUpcomingDates = () => {
  const dates = [];
  const currentDate = new Date();
  
  for (let i = 0; i < 4; i++) {
    const futureDate = new Date(currentDate);
    futureDate.setDate(currentDate.getDate() + 7 + (i * 7)); // Weekly content, starting next week
    dates.push(futureDate);
  }
  
  return dates;
};

// Format date as "Month Day, Year"
const formatDate = (date: Date) => {
  return date.toLocaleDateString('en-US', { 
    month: 'long',
    day: 'numeric',
    year: 'numeric'
  });
};

const ContentCalendar: React.FC = () => {
  // Get upcoming dates
  const upcomingDates = generateUpcomingDates();
  
  // Match topics with dates
  const upcomingContent = upcomingDates.map((date, index) => {
    // Cycle through categories and topics
    const categoryIndex = index % blogCategories.length;
    const topicIndex = Math.floor(index / blogCategories.length) % 2; // Alternate between first and second topic
    
    const category = blogCategories[categoryIndex];
    const topic = category.topics[topicIndex];
    
    return {
      id: index + 1,
      date: formatDate(date),
      title: topic.title,
      description: `Explore our insights on ${category.name.toLowerCase()}`,
      category: category.name,
      link: `/blog/${topic.slug}`
    };
  });

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
