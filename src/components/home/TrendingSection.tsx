
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Link } from 'react-router-dom';
import { ArrowRight, TrendingUp, Calendar } from 'lucide-react';
import { motion } from 'framer-motion';
import { Button } from "@/components/ui/button";

const trendingTopics = [
  {
    id: 1,
    title: "The Sustainable Narrative",
    description: "Exploring how conscious choices in our wardrobes become chapters in a larger story of environmental stewardship",
    image: "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    link: "/blog/category/sustainable-fashion"
  },
  {
    id: 2,
    title: "Cultural Conversations",
    description: "How today's visionary designers are engaging in dialogue with heritage, tradition, and contemporary culture",
    image: "https://images.unsplash.com/photo-1504051771394-dd2e66b2e08f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80",
    link: "/blog/category/runway-analysis"
  },
  {
    id: 3,
    title: "The Artisan's Journey",
    description: "Intimate portraits of the hands and hearts behind pieces that transcend fashion to become personal heirlooms",
    image: "https://images.unsplash.com/photo-1456327102063-fb5054efe647?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    link: "/blog/category/artisan-craftsmanship"
  },
  {
    id: 4,
    title: "Living Intentionally",
    description: "Exploring how thoughtful choices in our personal style become expressions of our values and aspirations",
    image: "https://images.unsplash.com/photo-1487222477894-8943e31ef7b2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1495&q=80",
    link: "/blog/category/fashion-tech"
  },
  {
    id: 5,
    title: "Fashion & Technology",
    description: "Exploring the intersection of innovation and style in the digital age",
    image: "https://images.unsplash.com/photo-1550009158-9ebf69173e03?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1701&q=80",
    link: "/blog/category/fashion-tech"
  },
  {
    id: 6,
    title: "Seasonal Transitions",
    description: "Navigating style through changing seasons with thoughtful wardrobe adaptations",
    image: "https://images.unsplash.com/photo-1487222477894-8943e31ef7b2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1495&q=80",
    link: "/blog/category/seasonal-style"
  }
];

const TrendingSection = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };
  
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5
      }
    }
  };

  return (
    <section className="py-20 bg-yemalin-cream">
      <div className="luxury-container">
        <div className="mb-12 flex flex-col md:flex-row justify-between items-center">
          <div className="text-center md:text-left mb-6 md:mb-0">
            <div className="flex items-center gap-2 mb-3 justify-center md:justify-start">
              <TrendingUp size={24} className="text-yemalin-accent" />
              <h2 className="font-display text-3xl md:text-4xl">Trending Narratives</h2>
            </div>
            <p className="text-yemalin-grey-600 max-w-2xl">
              Immerse yourself in the evolving conversations shaping a more intentional approach to style and living
            </p>
          </div>
          <Button asChild variant="outline" className="border-yemalin-black hover:bg-yemalin-black hover:text-white">
            <Link to="/blog" className="flex items-center gap-2">
              <Calendar size={16} /> View Editorial Calendar
            </Link>
          </Button>
        </div>
        
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {trendingTopics.map((topic) => (
            <motion.div key={topic.id} variants={itemVariants}>
              <Card className="overflow-hidden border-0 group h-full shadow-sm hover:shadow-md transition-all">
                <Link to={topic.link} className="block h-full">
                  <div className="relative h-[220px] overflow-hidden">
                    <img 
                      src={topic.image}
                      alt={topic.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/30 to-black/70"></div>
                    <div className="absolute bottom-0 left-0 p-6 right-0 text-white">
                      <h3 className="text-xl font-medium font-display">{topic.title}</h3>
                    </div>
                  </div>
                  <CardContent className="pt-4 flex flex-col h-[calc(100%-220px)]">
                    <p className="text-sm text-yemalin-grey-600 mb-3 flex-grow">{topic.description}</p>
                    <div className="flex items-center text-yemalin-accent text-sm font-medium mt-2 group-hover:translate-x-1 transition-transform">
                      <span className="mr-1">Continue Reading</span>
                      <ArrowRight size={14} />
                    </div>
                  </CardContent>
                </Link>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default TrendingSection;
