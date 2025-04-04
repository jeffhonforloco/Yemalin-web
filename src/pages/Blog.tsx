import MainLayout from '@/components/layouts/MainLayout';
import { Link } from 'react-router-dom';
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
  const featuredPost = blogPosts[0];
  // Rest of the posts
  const restOfPosts = blogPosts.slice(1);
  
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
              {restOfPosts.map(post => (
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
          </TabsContent>
          
          {/* Tab Content - Category Specific Posts */}
          {categories.slice(1).map(category => (
            <TabsContent key={category} value={category} className="mt-0">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {blogPosts
                  .filter(post => post.category === category)
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
              {blogPosts.filter(post => post.category === category).length === 0 && (
                <div className="text-center py-12">
                  <p className="text-gray-500">No articles in this category yet.</p>
                </div>
              )}
            </TabsContent>
          ))}
        </Tabs>
        
        {/* Newsletter Section */}
        <div className="mt-16 p-12 bg-yemalin-grey-100 text-center">
          <h3 className="text-2xl font-display mb-4">Subscribe to Our Journal</h3>
          <p className="text-gray-600 max-w-2xl mx-auto mb-6">
            Stay updated with our latest articles, designer interviews, style guides, and exclusive content.
          </p>
          <div className="flex max-w-md mx-auto">
            <input
              type="email"
              placeholder="Your email address"
              className="flex-grow px-4 py-3 text-sm border border-gray-300 focus:outline-none focus:border-black"
            />
            <Button className="bg-black text-white hover:bg-gray-800">
              Subscribe
            </Button>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default Blog;
