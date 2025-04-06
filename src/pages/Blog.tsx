import MainLayout from '@/components/layouts/MainLayout';
import { Link } from 'react-router-dom';
import { useState } from 'react';
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
import { Clock, User } from 'lucide-react';
import BlogNewsletter from '@/components/blog/BlogNewsletter';
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

// Mock data for blog posts
const blogPosts = [
  {
    id: 'post1',
    title: 'The Art of Slow Fashion: Why Quality Matters',
    excerpt: 'In a world of fast fashion and constant consumption, we explore the benefits of investing in fewer, better pieces that stand the test of time.',
    image: 'https://images.unsplash.com/photo-1551488831-00ddcb6c6bd3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
    author: 'Elena Martin',
    authorImage: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80',
    date: 'April 2, 2025',
    readTime: '7 min read',
    category: 'Sustainability',
    link: '/blog/the-art-of-slow-fashion'
  },
  {
    id: 'post2',
    title: 'Designer Spotlight: The Vision Behind Elise Laurent',
    excerpt: 'An exclusive interview with the founder of Elise Laurent, exploring her creative process, inspiration, and journey in luxury fashion.',
    image: 'https://images.unsplash.com/photo-1507146153580-69a1fe6d8aa1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
    author: 'Thomas Reed',
    authorImage: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80',
    date: 'March 29, 2025',
    readTime: '10 min read',
    category: 'Designer Spotlight',
    link: '/blog/designer-spotlight-elise-laurent'
  },
  {
    id: 'post3',
    title: 'The History of Luxury Textiles: From Silk Road to Sustainable Fabrics',
    excerpt: 'Tracing the evolution of luxury fabrics through centuries, from ancient trade routes to modern innovations in sustainable materials.',
    image: 'https://images.unsplash.com/photo-1549989476-69a92fa57c36?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
    author: 'Maya Patel',
    authorImage: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=761&q=80',
    date: 'March 24, 2025',
    readTime: '12 min read',
    category: 'Fashion History',
    link: '/blog/history-of-luxury-textiles'
  },
  {
    id: 'post4',
    title: 'Seasonal Style Guide: Transitioning Your Wardrobe for Spring',
    excerpt: 'Expert tips on refreshing your wardrobe for the new season, with styling advice from our fashion directors.',
    image: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
    author: 'David Kim',
    authorImage: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
    date: 'March 18, 2025',
    readTime: '8 min read',
    category: 'Style Guide',
    link: '/blog/spring-style-guide'
  },
  {
    id: 'post5',
    title: 'The Rise of Artisanal Jewelry: Craftsmanship in the Digital Age',
    excerpt: 'How traditional jewelry-making techniques are being preserved and reimagined by a new generation of designers.',
    image: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
    author: 'Sophie Lambert',
    authorImage: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=688&q=80',
    date: 'March 10, 2025',
    readTime: '9 min read',
    category: 'Craftsmanship',
    link: '/blog/artisanal-jewelry'
  },
  {
    id: 'post6',
    title: 'Sustainable Luxury: Inside Our Environmental Commitment',
    excerpt: 'An in-depth look at how Yemalin is working to reduce environmental impact while maintaining the highest standards of luxury.',
    image: 'https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
    author: 'Elena Martin',
    authorImage: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80',
    date: 'March 3, 2025',
    readTime: '11 min read',
    category: 'Sustainability',
    link: '/blog/sustainable-luxury'
  }
];

// Add more mock blog posts to demonstrate pagination
const additionalPosts = [
  {
    id: 'post7',
    title: 'Fashion Week Highlights: Emerging Trends for Next Season',
    excerpt: 'Our fashion directors report from the front rows of the most influential runway shows, spotlighting the trends that will define the coming season.',
    image: 'https://images.unsplash.com/photo-1529139574466-a303027c1d8b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1374&q=80',
    author: 'Thomas Reed',
    authorImage: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80',
    date: 'February 28, 2025',
    readTime: '9 min read',
    category: 'Style Guide',
    link: '/blog/fashion-week-highlights'
  },
  {
    id: 'post8',
    title: 'The Ethics of Luxury: Transparency in the Supply Chain',
    excerpt: 'An investigation into how luxury brands are addressing the demand for ethical production and transparency throughout their supply chains.',
    image: 'https://images.unsplash.com/photo-1622227922682-56c92e523e58?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
    author: 'Maya Patel',
    authorImage: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=761&q=80',
    date: 'February 20, 2025',
    readTime: '12 min read',
    category: 'Sustainability',
    link: '/blog/ethics-luxury-supply-chain'
  },
  {
    id: 'post9',
    title: 'The Art of Accessorizing: Less is More',
    excerpt: 'Our style experts share their secrets for curating the perfect accessories to elevate any outfit without overwhelming your look.',
    image: 'https://images.unsplash.com/photo-1523779105320-d1cd346ff52b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1374&q=80',
    author: 'Sophie Lambert',
    authorImage: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=688&q=80',
    date: 'February 15, 2025',
    readTime: '7 min read',
    category: 'Style Guide',
    link: '/blog/art-of-accessorizing'
  },
  {
    id: 'post10',
    title: 'Behind the Scenes: The Making of a Handcrafted Leather Bag',
    excerpt: 'Follow the journey of a luxury leather bag from initial sketches to the final product, highlighting the craftsmanship involved at each step.',
    image: 'https://images.unsplash.com/photo-1527236438218-d82077ae1f85?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80',
    author: 'David Kim',
    authorImage: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
    date: 'February 8, 2025',
    readTime: '10 min read',
    category: 'Craftsmanship',
    link: '/blog/making-leather-bag'
  },
  {
    id: 'post11',
    title: 'Iconic Fashion Moments: Looking Back at Style-Defining Eras',
    excerpt: 'A retrospective exploration of the most influential fashion moments from the past century and their continuing impact on current trends.',
    image: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1376&q=80',
    author: 'Elena Martin',
    authorImage: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80',
    date: 'January 30, 2025',
    readTime: '14 min read',
    category: 'Fashion History',
    link: '/blog/iconic-fashion-moments'
  },
  {
    id: 'post12',
    title: 'Interview: Rising Star Designer on Innovation in Traditional Techniques',
    excerpt: 'An exclusive conversation with an emerging designer about merging heritage craft with modern innovation in the luxury design space.',
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1376&q=80',
    author: 'Thomas Reed',
    authorImage: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80',
    date: 'January 25, 2025',
    readTime: '11 min read',
    category: 'Designer Spotlight',
    link: '/blog/interview-rising-designer'
  }
];

// Combine the original posts with the additional posts
const allBlogPosts = [...blogPosts, ...additionalPosts];

// Categories for filtering
const categories = [
  'All',
  'Sustainability',
  'Designer Spotlight',
  'Fashion History',
  'Style Guide',
  'Craftsmanship'
];

const Blog = () => {
  // Featured post is the first post in our list
  const featuredPost = allBlogPosts[0];
  
  // State for pagination
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 6;
  
  // Calculate pagination values
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = allBlogPosts.slice(1).slice(indexOfFirstPost, indexOfLastPost);
  const totalPages = Math.ceil((allBlogPosts.length - 1) / postsPerPage);
  
  // Function to handle page changes
  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
    // Scroll to top when changing page
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  
  // Generate page numbers for pagination
  const pageNumbers = [];
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }
  
  return (
    <MainLayout>
      {/* Hero Section with Featured Post */}
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
      
      {/* Blog Posts Section */}
      <div className="luxury-container py-16">
        <h2 className="text-2xl font-display mb-10 text-center">Journal</h2>
        
        {/* Category Tabs */}
        <Tabs defaultValue="All" className="w-full mb-12">
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
          
          {/* Tab Content - All Posts */}
          <TabsContent value="All" className="mt-0">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
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
            
            {/* Pagination */}
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
          </TabsContent>
          
          {/* Tab Content - Category Specific Posts */}
          {categories.slice(1).map(category => (
            <TabsContent key={category} value={category} className="mt-0">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {allBlogPosts
                  .filter(post => post.category === category)
                  .slice(indexOfFirstPost, indexOfLastPost)
                  .map(post => (
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
              
              {allBlogPosts.filter(post => post.category === category).length === 0 && (
                <div className="text-center py-12">
                  <p className="text-gray-500">No articles in this category yet.</p>
                </div>
              )}
              
              {allBlogPosts.filter(post => post.category === category).length > postsPerPage && (
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
        
        {/* Newsletter Section */}
        <BlogNewsletter />
      </div>
    </MainLayout>
  );
};

export default Blog;
