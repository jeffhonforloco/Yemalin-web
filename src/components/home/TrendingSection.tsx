
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const trendingTopics = [
  {
    id: 1,
    title: "Sustainable Fashion",
    description: "Exploring the rise of eco-conscious design and ethical production practices",
    image: "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    link: "/blog/category/sustainable-fashion"
  },
  {
    id: 2,
    title: "Runway Analysis",
    description: "Breaking down the latest runway trends and how they translate to everyday style",
    image: "https://images.unsplash.com/photo-1504051771394-dd2e66b2e08f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80",
    link: "/blog/category/runway-analysis"
  },
  {
    id: 3,
    title: "Artisan Craftsmanship",
    description: "Celebrating the skilled artisans behind luxury fashion's most coveted pieces",
    image: "https://images.unsplash.com/photo-1456327102063-fb5054efe647?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    link: "/blog/category/artisan-craftsmanship"
  },
  {
    id: 4,
    title: "Fashion Tech",
    description: "How technology is revolutionizing the fashion industry from design to retail",
    image: "https://images.unsplash.com/photo-1487222477894-8943e31ef7b2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1495&q=80",
    link: "/blog/category/fashion-tech"
  }
];

const TrendingSection = () => {
  return (
    <section className="py-20">
      <div className="luxury-container">
        <div className="mb-12 text-center">
          <h2 className="font-display text-3xl md:text-4xl mb-3">Trending Topics</h2>
          <p className="text-yemalin-grey-600 max-w-2xl mx-auto">
            Explore the conversations and ideas shaping the future of fashion
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {trendingTopics.map((topic) => (
            <Card key={topic.id} className="overflow-hidden border-0 group">
              <Link to={topic.link} className="block">
                <div className="relative h-[200px] overflow-hidden">
                  <img 
                    src={topic.image}
                    alt={topic.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/70"></div>
                  <div className="absolute bottom-0 left-0 p-4 right-0 text-white">
                    <h3 className="text-lg font-medium font-display">{topic.title}</h3>
                  </div>
                </div>
                <CardContent className="pt-4">
                  <p className="text-sm text-yemalin-grey-600 mb-3">{topic.description}</p>
                  <div className="flex items-center text-yemalin-accent text-sm">
                    <span className="mr-1">Read More</span>
                    <ArrowRight size={14} />
                  </div>
                </CardContent>
              </Link>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrendingSection;
