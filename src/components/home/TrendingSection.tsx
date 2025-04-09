
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

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
  }
];

const TrendingSection = () => {
  return (
    <section className="py-20">
      <div className="luxury-container">
        <div className="mb-12 text-center">
          <h2 className="font-display text-3xl md:text-4xl mb-3">Narratives We're Exploring</h2>
          <p className="text-yemalin-grey-600 max-w-2xl mx-auto">
            Immerse yourself in the evolving conversations shaping a more intentional approach to style and living
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
                  <div className="flex items-center text-yemalin-accent text-sm font-medium">
                    <span className="mr-1">Continue Reading</span>
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
