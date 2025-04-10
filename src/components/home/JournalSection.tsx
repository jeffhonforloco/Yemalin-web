
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { blogPosts } from '@/data/mockBlogPostsData';

const JournalSection = () => {
  // Display only the latest 3 blog posts
  const recentPosts = blogPosts.slice(0, 3);
  
  return (
    <section className="py-16 bg-white">
      <div className="luxury-container">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl md:text-3xl font-display">Journal</h2>
          <Link to="/blog">
            <Button variant="link" className="text-black flex items-center gap-1">
              View all <ArrowRight size={16} />
            </Button>
          </Link>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {recentPosts.map(post => (
            <Card key={post.id} className="overflow-hidden border-none shadow-sm group">
              <Link to={post.link} className="block">
                <div className="h-60 overflow-hidden">
                  <img 
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-medium bg-yemalin-grey-100 px-2 py-1">
                      {post.category}
                    </span>
                    <span className="flex items-center text-xs text-gray-500">
                      <Clock size={14} className="mr-1" />
                      {post.readTime}
                    </span>
                  </div>
                  <CardTitle className="line-clamp-2 mb-2">{post.title}</CardTitle>
                  <CardDescription className="line-clamp-3 mb-4">
                    {post.excerpt}
                  </CardDescription>
                </CardContent>
              </Link>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default JournalSection;
