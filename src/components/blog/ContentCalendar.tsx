
import React from 'react';
import { Calendar, ChevronRight, BookOpen, Clock, Tag } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Link } from 'react-router-dom';
import { blogCategories } from '@/data/blogCategoriesData';
import sampleArticleContent from '@/data/sampleArticleContent';
import { motion } from 'framer-motion';
import { Badge } from '@/components/ui/badge';

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

// Map of categories and topics that exist in our sample content
const existingTopicSlugs = [
  'top-luxury-fashion-trends-2025',
  'future-of-luxury-technology-redefining-fashion',
  'designer-world-signature-styles',
  'emerging-luxury-labels-new-faces',
  'elevate-your-look-luxury-wardrobe-tips',
  'mixing-high-end-everyday-effortless-luxury',
  'guide-buying-authentic-luxury-fashion-online',
  'insider-secrets-designer-deals-quality',
  'editors-choice-luxury-trusted-sellers',
  'seasonal-spotlight-designer-pieces-spring-2025'
];

const ContentCalendar: React.FC = () => {
  // Get upcoming dates
  const upcomingDates = generateUpcomingDates();
  
  // Create array of topics that we have sample content for
  const availableTopics = blogCategories.flatMap(category => 
    category.topics.filter(topic => existingTopicSlugs.includes(topic.slug))
      .map(topic => ({
        slug: topic.slug,
        title: topic.title,
        category: category.name,
        categorySlug: category.slug
      }))
  );
  
  // Match topics with dates, ensuring we only use topics that have sample content
  const upcomingContent = upcomingDates.map((date, index) => {
    // Use modulo to cycle through available topics
    const topicIndex = index % availableTopics.length;
    const topic = availableTopics[topicIndex];
    
    // Add estimated reading time and tag
    return {
      id: index + 1,
      date: formatDate(date),
      title: topic.title,
      description: `Explore our insights on ${topic.category.toLowerCase()}`,
      category: topic.category,
      categorySlug: topic.categorySlug,
      slug: topic.slug,
      link: `/blog/${topic.slug}`,
      readTime: `${Math.floor(Math.random() * 10) + 5} min read`,
      tag: ['New', 'Featured', 'Exclusive', 'Trending'][index % 4]
    };
  });

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };
  
  const cardVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5
      }
    }
  };

  // Color mapping for different tags
  const tagColors: Record<string, string> = {
    'New': 'bg-emerald-500',
    'Featured': 'bg-purple-500',
    'Exclusive': 'bg-amber-500',
    'Trending': 'bg-rose-500'
  };

  return (
    <motion.div 
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
    >
      {upcomingContent.map((item) => (
        <motion.div key={item.id} variants={cardVariants}>
          <Card className="bg-white overflow-hidden group transition-all hover:shadow-md border-0 h-full">
            <CardContent className="p-0 flex flex-col h-full">
              <div className="bg-yemalin-black text-white p-4 flex items-center justify-between relative">
                <div className="flex items-center">
                  <Calendar size={18} className="mr-2 text-yemalin-accent" />
                  <span className="text-sm font-medium">{item.date}</span>
                </div>
                {item.tag && (
                  <Badge className={`${tagColors[item.tag]} text-white text-xs px-2 py-1 absolute -top-1 right-2 rotate-3 shadow-sm`}>
                    {item.tag}
                  </Badge>
                )}
              </div>
              <div className="p-5 flex flex-col flex-grow">
                <Link 
                  to={`/blog/category/${item.categorySlug}`} 
                  className="inline-block text-xs font-medium px-3 py-1 bg-yemalin-cream rounded-full mb-3 hover:bg-yemalin-accent hover:text-white transition-colors"
                >
                  {item.category}
                </Link>
                
                <h3 className="font-display text-lg mb-2 line-clamp-2 group-hover:text-yemalin-accent transition-colors">
                  <Link to={item.link}>{item.title}</Link>
                </h3>
                
                <p className="text-sm text-gray-600 mb-4 line-clamp-2 flex-grow">{item.description}</p>
                
                <div className="flex items-center text-xs text-yemalin-grey-600 mb-3">
                  <Clock size={14} className="mr-1.5" />
                  <span>{item.readTime}</span>
                </div>
                
                <Separator className="my-3" />
                
                <Link 
                  to={item.link} 
                  className="flex items-center text-sm font-medium text-yemalin-black hover:text-yemalin-accent transition-colors"
                >
                  <BookOpen size={16} className="mr-2" />
                  <span>Read Article</span>
                  <ChevronRight size={16} className="ml-1 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </motion.div>
  );
};

export default ContentCalendar;
