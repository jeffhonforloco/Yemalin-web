
import MainLayout from '@/components/layouts/MainLayout';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import { Clock, BookOpen, Calendar } from 'lucide-react';
import BlogNewsletter from '@/components/blog/BlogNewsletter';
import ContentCalendar from '@/components/blog/ContentCalendar';
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { allBlogPosts } from '@/data/mockBlogPostsData';

const categories = [
  'All',
  'Sustainability',
  'Designer Spotlight',
  'Fashion History',
  'Style Guide',
  'Craftsmanship'
];

const Blog = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState('All');
  const featuredPost = allBlogPosts[0];
  
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 6;
  
  // Parse category from URL if available
  useEffect(() => {
    // Check if we're on a category page
    const urlParts = location.pathname.split('/');
    if (urlParts[1] === 'blog' && urlParts[2] === 'category' && urlParts[3]) {
      const categoryFromUrl = decodeURIComponent(urlParts[3]);
      // Make sure the category exists in our list
      if (categories.includes(categoryFromUrl)) {
        setSelectedCategory(categoryFromUrl);
      } else {
        // Redirect to main blog page if category doesn't exist
        navigate('/blog');
      }
    }
  }, [location, navigate]);
  
  // Filter posts based on selected category
  const filteredPosts = selectedCategory === 'All' 
    ? allBlogPosts.slice(1) 
    : allBlogPosts.filter(post => post.category === selectedCategory);
  
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = filteredPosts.slice(indexOfFirstPost, indexOfLastPost);
  const totalPages = Math.ceil(filteredPosts.length / postsPerPage);
  
  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  
  const pageNumbers = [];
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }
  
  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    setCurrentPage(1); // Reset to first page when changing category
    
    // Update URL based on category
    if (category === 'All') {
      navigate('/blog');
    } else {
      navigate(`/blog/category/${encodeURIComponent(category)}`);
    }
  };
  
  return (
    <MainLayout>
      <div className="w-full">
        <div className="relative h-[70vh] overflow-hidden">
          <img 
            src={featuredPost.image}
            alt={featuredPost.title}
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent">
            <div className="absolute bottom-0 left-0 right-0 p-8 md:p-16">
              <div className="luxury-container">
                <span className="inline-block bg-white px-3 py-1 text-xs font-medium mb-4">
                  {featuredPost.category}
                </span>
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-display text-white mb-4 max-w-4xl">
                  {featuredPost.title}
                </h1>
                <p className="text-white text-lg mb-4 max-w-2xl">
                  {featuredPost.excerpt}
                </p>
                <div className="flex items-center mb-6">
                  <img 
                    src={featuredPost.authorImage}
                    alt={featuredPost.author}
                    className="w-10 h-10 rounded-full mr-3 object-cover"
                  />
                  <div>
                    <p className="text-white text-sm font-medium">{featuredPost.author}</p>
                    <div className="flex items-center text-white text-xs opacity-80">
                      <span>{featuredPost.date}</span>
                      <span className="mx-2">•</span>
                      <span>{featuredPost.readTime}</span>
                    </div>
                  </div>
                </div>
                <Link to={featuredPost.link}>
                  <Button className="bg-white text-black hover:bg-black hover:text-white">
                    Read Article
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <section className="bg-yemalin-cream py-12">
        <div className="luxury-container">
          <div className="flex flex-col md:flex-row items-center justify-between mb-8">
            <div>
              <h2 className="text-2xl md:text-3xl font-display mb-2">Upcoming Content</h2>
              <p className="text-yemalin-grey-600">Stay ahead with our editorial calendar</p>
            </div>
            <div className="mt-4 md:mt-0">
              <Button variant="outline" className="flex items-center gap-2 border-yemalin-black">
                <Calendar size={16} /> View All Events
              </Button>
            </div>
          </div>
          
          <ContentCalendar />
        </div>
      </section>
      
      <div className="luxury-container py-16">
        <div className="flex flex-col md:flex-row gap-8">
          <div className="w-full md:w-3/4">
            <h2 className="text-2xl font-display mb-10">Journal</h2>
            
            <Tabs 
              value={selectedCategory} 
              onValueChange={handleCategoryChange}
              className="w-full mb-12"
            >
              <TabsList className="w-full justify-start overflow-x-auto flex-nowrap pb-2 mb-8">
                {categories.map(category => (
                  <TabsTrigger 
                    key={category} 
                    value={category}
                    className="px-4 py-2 whitespace-nowrap"
                  >
                    {category}
                  </TabsTrigger>
                ))}
              </TabsList>
              
              {categories.map(category => (
                <TabsContent key={category} value={category} className="mt-0">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {currentPosts.map(post => (
                      <Card key={post.id} className="overflow-hidden border-none shadow-sm group">
                        <Link to={post.link} className="block">
                          <div className="h-60 overflow-hidden">
                            <img 
                              src={post.image}
                              alt={post.title}
                              className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
                            />
                          </div>
                          <CardHeader>
                            <div className="flex items-center justify-between mb-2">
                              <span className="text-xs font-medium bg-yemalin-grey-100 px-2 py-1">
                                {post.category}
                              </span>
                              <span className="flex items-center text-xs text-gray-500">
                                <Clock size={14} className="mr-1" />
                                {post.readTime}
                              </span>
                            </div>
                            <CardTitle className="line-clamp-2">{post.title}</CardTitle>
                            <CardDescription className="line-clamp-3 mt-2">
                              {post.excerpt}
                            </CardDescription>
                          </CardHeader>
                          <CardContent>
                            <Separator className="mb-4" />
                            <div className="flex items-center">
                              <img 
                                src={post.authorImage}
                                alt={post.author}
                                className="w-8 h-8 rounded-full mr-2 object-cover"
                              />
                              <div>
                                <p className="text-sm font-medium">{post.author}</p>
                                <p className="text-xs text-gray-500">{post.date}</p>
                              </div>
                            </div>
                          </CardContent>
                        </Link>
                      </Card>
                    ))}
                  </div>
                  
                  {currentPosts.length === 0 && (
                    <div className="text-center py-12">
                      <p className="text-gray-500">No articles in this category yet.</p>
                    </div>
                  )}
                  
                  {totalPages > 1 && (
                    <Pagination className="mt-12">
                      <PaginationContent>
                        {currentPage > 1 && (
                          <PaginationItem>
                            <PaginationPrevious 
                              href="#" 
                              onClick={(e) => {
                                e.preventDefault();
                                handlePageChange(currentPage - 1);
                              }} 
                            />
                          </PaginationItem>
                        )}
                        
                        {pageNumbers.map((number) => (
                          <PaginationItem key={number}>
                            <PaginationLink 
                              href="#" 
                              isActive={number === currentPage}
                              onClick={(e) => {
                                e.preventDefault();
                                handlePageChange(number);
                              }}
                            >
                              {number}
                            </PaginationLink>
                          </PaginationItem>
                        ))}
                        
                        {currentPage < totalPages && (
                          <PaginationItem>
                            <PaginationNext 
                              href="#" 
                              onClick={(e) => {
                                e.preventDefault();
                                handlePageChange(currentPage + 1);
                              }} 
                            />
                          </PaginationItem>
                        )}
                      </PaginationContent>
                    </Pagination>
                  )}
                </TabsContent>
              ))}
            </Tabs>
          </div>
          
          <div className="w-full md:w-1/4">
            <div className="sticky top-24">
              <div className="mb-8 bg-white p-6 shadow-sm">
                <h3 className="text-lg font-medium mb-4 flex items-center">
                  <BookOpen size={18} className="mr-2" /> Reading Lists
                </h3>
                <div className="space-y-4">
                  <Link to="/blog/category/Sustainability" className="block group">
                    <div className="font-medium group-hover:text-yemalin-accent transition-colors">
                      Sustainable Fashion Guide
                    </div>
                    <p className="text-sm text-gray-500">5 articles</p>
                  </Link>
                  <Link to="/blog/category/Fashion-History" className="block group">
                    <div className="font-medium group-hover:text-yemalin-accent transition-colors">
                      History of Fashion Houses
                    </div>
                    <p className="text-sm text-gray-500">3 articles</p>
                  </Link>
                  <Link to="/blog/category/Style-Guide" className="block group">
                    <div className="font-medium group-hover:text-yemalin-accent transition-colors">
                      Spring/Summer Trends
                    </div>
                    <p className="text-sm text-gray-500">7 articles</p>
                  </Link>
                </div>
              </div>
              
              <div className="bg-yemalin-grey-100 p-6">
                <h3 className="text-lg font-medium mb-3">Subscribe</h3>
                <p className="text-sm text-gray-600 mb-4">Get our weekly fashion digest straight to your inbox</p>
                <form className="space-y-3">
                  <input 
                    type="email" 
                    placeholder="Your email address" 
                    className="w-full px-3 py-2 border border-gray-300 rounded"
                  />
                  <Button className="w-full bg-yemalin-black hover:bg-yemalin-grey-800">
                    Subscribe
                  </Button>
                </form>
              </div>
            </div>
          </div>
        </div>
        
        <BlogNewsletter />
      </div>
    </MainLayout>
  );
};

export default Blog;
