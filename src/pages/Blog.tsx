import MainLayout from '@/components/layouts/MainLayout';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { 
  Card, 
  CardContent, 
  CardDescription, 
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
import { useWordPressPosts, useWordPressCategories } from '@/hooks/useWordPress';
import SEOMeta from '@/components/SEO/SEOMeta';
import { blogCategories } from '@/data/blogCategoriesData';

const Blog = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [selectedCategoryId, setSelectedCategoryId] = useState<number | undefined>(undefined);
  const [selectedCategoryName, setSelectedCategoryName] = useState('All');
  const { categories, loading: loadingCategories } = useWordPressCategories();
  
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 6;
  
  const { posts, pagination, loading: loadingPosts, error: postsError } = 
    useWordPressPosts(currentPage, postsPerPage, selectedCategoryId);
  
  const featuredPost = posts.length > 0 && !selectedCategoryId ? posts[0] : null;
  const currentPosts = posts.length > 0 && !selectedCategoryId ? posts.slice(1) : posts;
  
  useEffect(() => {
    const urlParts = location.pathname.split('/');
    if (urlParts[1] === 'blog' && urlParts[2] === 'category' && urlParts[3]) {
      const categoryFromUrl = decodeURIComponent(urlParts[3]);
      if (categories && categories.length > 0) {
        const category = categories.find(cat => cat.slug === categoryFromUrl);
        if (category) {
          setSelectedCategoryId(category.id);
          setSelectedCategoryName(category.name);
        } else {
          navigate('/blog');
        }
      }
    }
  }, [location, navigate, categories]);
  
  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  
  const handleCategoryChange = (categoryName: string) => {
    if (categoryName === 'All') {
      setSelectedCategoryId(undefined);
      setSelectedCategoryName('All');
      navigate('/blog');
    } else {
      const category = categories.find(cat => cat.name === categoryName);
      if (category) {
        setSelectedCategoryId(category.id);
        setSelectedCategoryName(category.name);
        navigate(`/blog/category/${category.slug}`);
      } else {
        const customCategory = blogCategories.find(cat => cat.name === categoryName);
        if (customCategory) {
          setSelectedCategoryId(undefined);
          setSelectedCategoryName(customCategory.name);
          navigate(`/blog/category/${customCategory.slug}`);
        }
      }
    }
    setCurrentPage(1);
  };
  
  const combinedCategories = [
    { name: 'All', id: 0, slug: '' }, 
    ...(categories || []),
    ...blogCategories.map(cat => ({ name: cat.name, id: -1, slug: cat.slug }))
  ];

  const uniqueCategories = Array.from(
    new Map(combinedCategories.map(item => [item.name, item])).values()
  );

  return (
    <MainLayout>
      <SEOMeta 
        title="The Yemalin Edit - Luxury Fashion Editorial"
        description="Explore The Yemalin Edit for insights on sustainable fashion, designer spotlights, and style guides."
        keywords={['luxury fashion', 'sustainable fashion', 'designer spotlight', 'style guide', 'the yemalin edit']}
      />
      
      {featuredPost && (
        <div className="w-full">
          <div className="relative h-[70vh] overflow-hidden">
            <img 
              src={featuredPost.image_url || 'https://via.placeholder.com/1200x800?text=Yemalin+Journal'}
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
                  <div 
                    className="text-white text-lg mb-4 max-w-2xl"
                    dangerouslySetInnerHTML={{ __html: featuredPost.excerpt }}
                  />
                  
                  <Link to={`/blog/${featuredPost.slug}`}>
                    <Button className="bg-white text-black hover:bg-black hover:text-white">
                      Read Article
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      
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
            <h2 className="text-2xl font-display mb-10">The Yemalin Edit</h2>
            
            {loadingCategories ? (
              <div className="w-full h-12 bg-gray-200 animate-pulse rounded-md mb-8"></div>
            ) : (
              <Tabs 
                value={selectedCategoryName} 
                onValueChange={handleCategoryChange}
                className="w-full mb-12"
              >
                <TabsList className="w-full justify-start overflow-x-auto flex-nowrap pb-2 mb-8">
                  {uniqueCategories.map((category, index) => (
                    <TabsTrigger 
                      key={`${category.id}-${index}`} 
                      value={category.name}
                      className="px-4 py-2 whitespace-nowrap"
                    >
                      {category.name}
                    </TabsTrigger>
                  ))}
                </TabsList>
                
                {uniqueCategories.map((category, index) => (
                  <TabsContent key={`${category.id}-${index}`} value={category.name} className="mt-0">
                    {loadingPosts ? (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {[...Array(6)].map((_, index) => (
                          <Card key={index} className="overflow-hidden border-none shadow-sm">
                            <div className="h-60 bg-gray-200 animate-pulse"></div>
                            <CardHeader>
                              <div className="w-1/3 h-4 bg-gray-200 animate-pulse mb-2"></div>
                              <div className="w-full h-6 bg-gray-200 animate-pulse mb-2"></div>
                              <div className="w-full h-4 bg-gray-200 animate-pulse"></div>
                            </CardHeader>
                          </Card>
                        ))}
                      </div>
                    ) : postsError ? (
                      <div className="text-center py-12">
                        <p className="text-red-500">Failed to load posts. Please try again later.</p>
                      </div>
                    ) : (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {currentPosts.map(post => (
                          <Card key={post.id} className="overflow-hidden border-none shadow-sm group">
                            <Link to={`/blog/${post.slug}`} className="block">
                              <div className="h-60 overflow-hidden">
                                <img 
                                  src={post.image_url || 'https://via.placeholder.com/800x600?text=Yemalin+Journal'}
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
                                    {post.read_time}
                                  </span>
                                </div>
                                <CardTitle className="line-clamp-2">{post.title}</CardTitle>
                                <CardDescription 
                                  className="line-clamp-3 mt-2"
                                  dangerouslySetInnerHTML={{ __html: post.excerpt }}
                                />
                              </CardHeader>
                            </Link>
                          </Card>
                        ))}
                      </div>
                    )}
                    
                    {!loadingPosts && currentPosts.length === 0 && (
                      <div>
                        {category.name !== 'All' && category.name !== selectedCategoryName && (
                          <div className="text-center py-12">
                            <p className="text-gray-500">No articles in this category yet.</p>
                          </div>
                        )}
                        
                        {blogCategories.find(cat => cat.name === category.name) && (
                          <div className="mt-8">
                            <h3 className="font-medium text-lg mb-4">Popular Topics in {category.name}</h3>
                            <div className="grid gap-4">
                              {blogCategories
                                .find(cat => cat.name === category.name)?.topics
                                .map(topic => (
                                  <Link 
                                    key={topic.slug} 
                                    to={`/blog/${topic.slug}`}
                                    className="p-4 border border-gray-100 hover:border-gray-300 rounded-lg transition-colors"
                                  >
                                    <h4 className="font-medium">{topic.title}</h4>
                                  </Link>
                                ))}
                            </div>
                          </div>
                        )}
                      </div>
                    )}
                    
                    {!loadingPosts && pagination && pagination.totalPages > 1 && (
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
                          
                          {[...Array(pagination.totalPages)].map((_, i) => {
                            const pageNumber = i + 1;
                            return (
                              <PaginationItem key={pageNumber}>
                                <PaginationLink 
                                  href="#" 
                                  isActive={pageNumber === currentPage}
                                  onClick={(e) => {
                                    e.preventDefault();
                                    handlePageChange(pageNumber);
                                  }}
                                >
                                  {pageNumber}
                                </PaginationLink>
                              </PaginationItem>
                            );
                          })}
                          
                          {currentPage < pagination.totalPages && (
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
            )}
          </div>
          
          <div className="w-full md:w-1/4">
            <div className="sticky top-24">
              <div className="mb-8 bg-white p-6 shadow-sm">
                <h3 className="text-lg font-medium mb-4">The Yemalin Edit</h3>
                <div className="space-y-4">
                  {blogCategories.slice(0, 3).map(category => (
                    <div key={category.slug} className="mb-4">
                      <Link
                        to={`/blog/category/${category.slug}`}
                        className="font-medium text-yemalin-black hover:text-yemalin-accent transition-colors"
                      >
                        {category.name}
                      </Link>
                      <ul className="mt-2 space-y-2">
                        {category.topics.map(topic => (
                          <li key={topic.slug}>
                            <Link
                              to={`/blog/${topic.slug}`}
                              className="text-sm text-gray-600 hover:text-yemalin-accent transition-colors"
                            >
                              {topic.title}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
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
