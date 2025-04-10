
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Clock, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { useWordPressPosts } from '@/hooks/useWordPress';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { blogCategories } from '@/data/blogCategoriesData';

const JournalSection = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const { posts, loading, error } = useWordPressPosts(1, 6); // Fetch 6 posts from first page
  
  return (
    <section className="py-16 bg-white">
      <div className="luxury-container">
        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center gap-4">
            <h2 className="text-2xl md:text-3xl font-display">Journal</h2>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="flex items-center gap-2">
                  {selectedCategory} <ChevronDown size={15} />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56 bg-white border border-gray-100 shadow-lg">
                <DropdownMenuLabel>Categories</DropdownMenuLabel>
                <DropdownMenuSeparator />
                
                <DropdownMenuItem 
                  className="cursor-pointer"
                  onClick={() => setSelectedCategory('All')}
                >
                  All Categories
                </DropdownMenuItem>
                
                {blogCategories.map(category => (
                  <DropdownMenuItem 
                    key={category.slug}
                    className="cursor-pointer"
                    onClick={() => setSelectedCategory(category.name)}
                  >
                    {category.name}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          <Link to="/blog">
            <Button variant="link" className="text-black flex items-center gap-1">
              View all <ArrowRight size={16} />
            </Button>
          </Link>
        </div>
        
        {loading && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(6)].map((_, index) => (
              <Card key={index} className="overflow-hidden border-none shadow-sm">
                <div className="h-60 bg-gray-200 animate-pulse"></div>
                <CardContent className="p-6">
                  <div className="w-1/3 h-4 bg-gray-200 animate-pulse mb-2"></div>
                  <div className="w-full h-6 bg-gray-200 animate-pulse mb-2"></div>
                  <div className="w-full h-4 bg-gray-200 animate-pulse mb-2"></div>
                  <div className="w-2/3 h-4 bg-gray-200 animate-pulse"></div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
        
        {error && (
          <div className="py-10 text-center">
            <p className="text-red-500">Failed to load journal entries. Please try again later.</p>
          </div>
        )}
        
        {!loading && !error && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts
              .filter(post => selectedCategory === 'All' || post.category === selectedCategory)
              .map(post => (
                <Card key={post.id} className="overflow-hidden border-none shadow-sm group">
                  <Link to={`/blog/${post.slug}`} className="block">
                    <div className="h-60 overflow-hidden">
                      <img 
                        src={post.image_url || 'https://via.placeholder.com/800x600?text=Yemalin+Journal'}
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
                          {post.read_time}
                        </span>
                      </div>
                      <CardTitle className="line-clamp-2 mb-2">{post.title}</CardTitle>
                      <CardDescription 
                        className="line-clamp-3 mb-4"
                        dangerouslySetInnerHTML={{ __html: post.excerpt }}
                      />
                    </CardContent>
                  </Link>
                </Card>
              ))}
          </div>
        )}
        
        {!loading && !error && posts.filter(post => selectedCategory === 'All' || post.category === selectedCategory).length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500">No articles in this category yet.</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default JournalSection;
