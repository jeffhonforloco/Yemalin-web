
import { useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import MainLayout from '@/components/layouts/MainLayout';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { ArrowLeft, Clock, Calendar, User, Tag } from 'lucide-react';
import BlogNewsletter from '@/components/blog/BlogNewsletter';
import { allBlogPosts } from '@/data/mockBlogPostsData';

const BlogPost = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Find the post based on the URL slug without prepending /blog/
    const foundPost = allBlogPosts.find(p => {
      // Extract slug from link (remove leading slash)
      const postSlug = p.link.substring(1);
      return postSlug === slug || postSlug === `blog/${slug}`; 
    });
    
    if (foundPost) {
      setPost(foundPost);
    } else {
      console.error(`Blog post not found with slug: ${slug}`);
    }
    setLoading(false);
  }, [slug]);

  if (loading) {
    return (
      <MainLayout>
        <div className="luxury-container py-16">
          <div className="flex items-center justify-center h-96">
            <div className="animate-pulse text-2xl">Loading article...</div>
          </div>
        </div>
      </MainLayout>
    );
  }

  if (!post) {
    return (
      <MainLayout>
        <div className="luxury-container py-16">
          <div className="text-center py-16">
            <h1 className="text-3xl font-display mb-4">Article Not Found</h1>
            <p className="mb-8">We couldn't find the article you're looking for.</p>
            <Button onClick={() => navigate('/blog')}>
              Return to Journal
            </Button>
          </div>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      {/* Hero Section */}
      <div className="w-full">
        <div className="relative h-[60vh] overflow-hidden">
          <img 
            src={post.image}
            alt={post.title}
            className="w-full h-full object-cover object-center"
          />
        </div>
      </div>
      
      {/* Article Content */}
      <div className="luxury-container py-16">
        <Button 
          variant="ghost" 
          className="mb-8 inline-flex items-center"
          onClick={() => navigate('/blog')}
        >
          <ArrowLeft size={16} className="mr-2" /> Back to Journal
        </Button>
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Main Content */}
          <div className="lg:col-span-8">
            <div className="mb-6">
              <span className="inline-block bg-yemalin-grey-100 px-3 py-1 text-xs font-medium mb-4">
                {post.category}
              </span>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-display mb-6">{post.title}</h1>
              
              <div className="flex items-center gap-6 text-sm text-gray-600 mb-8">
                <div className="flex items-center">
                  <Calendar size={16} className="mr-2" />
                  <span>{post.date}</span>
                </div>
                <div className="flex items-center">
                  <Clock size={16} className="mr-2" />
                  <span>{post.readTime}</span>
                </div>
              </div>
            </div>
            
            <div className="prose prose-lg max-w-none">
              <p className="text-lg font-medium mb-6">{post.excerpt}</p>
              
              <p>In the fast-paced world of fashion, it's increasingly rare to find designers who dedicate themselves to the artistry and craftsmanship that defined luxury in previous generations. Elise Laurent stands as a testament to this disappearing tradition, creating pieces that combine timeless elegance with contemporary innovation.</p>
              
              <p>Our exclusive interview with the visionary behind the eponymous brand explores her creative process, sources of inspiration, and the journey that led her to establish one of the most respected new luxury fashion houses of the decade.</p>
              
              <h2>The Beginning of a Vision</h2>
              
              <p>"I never set out to create a brand," Laurent explains from her sunlit atelier in Paris. "I wanted to create pieces that would last, that would tell stories and hold memories. The brand grew organically from that philosophy."</p>
              
              <p>With a background in textile conservation at the Louvre and apprenticeships with master craftspeople across Europe, Laurent's approach to design is deeply rooted in historical techniques while embracing modern innovations.</p>
              
              <blockquote>
                <p>"Luxury isn't about logos or trends. It's about intention, materials, and the human touch. Every stitch should have purpose."</p>
              </blockquote>
              
              <h2>The Creative Process</h2>
              
              <p>Unlike many contemporary designers who release multiple collections per year, Laurent dedicates months to developing each piece in her collection. Her process begins with extensive research, often drawing inspiration from architectural forms, historical textiles, and the natural world.</p>
              
              <p>"I spend weeks just working with the materials, understanding how they move, how they age, how they respond to light. Before I sketch a single design, I need to know the soul of what I'm working with."</p>
              
              <p>This deep connection to materials is evident in the finished pieces, which often showcase techniques rarely seen in modern fashion—hand-pleating that takes days to complete, naturally dyed fabrics that shift subtly with exposure to sunlight, or hand-embroidery that tells intricate stories upon closer inspection.</p>
              
              <h2>Sustainability as Luxury</h2>
              
              <p>For Laurent, sustainability isn't a marketing angle but a fundamental aspect of true luxury. The designer has pioneered the use of recovered heritage textiles, working with specialists to restore vintage fabrics for new creations.</p>
              
              <p>"There's something magical about working with a silk that might be older than your grandmother. It carries history, and when we incorporate it into a new piece, that history continues. That's the most sustainable approach I can imagine—keeping beautiful things in circulation."</p>
              
              <p>Her studio also works exclusively with ethical suppliers, many of whom are small family businesses that have been perfecting their craft for generations.</p>
              
              <h2>Looking Forward</h2>
              
              <p>As our conversation draws to a close, we ask about her vision for the future of Elise Laurent, the brand.</p>
              
              <p>"I'd like to grow slowly, intentionally. I'm interested in deepening our relationships with our clients, creating more bespoke pieces, and continuing to support the artisans we work with. Success for me isn't about scale—it's about meaning."</p>
              
              <p>In an industry often driven by rapid expansion and maximum profit, Laurent's measured approach feels both revolutionary and deeply traditional—much like her extraordinary designs.</p>
            </div>
          </div>
          
          {/* Sidebar */}
          <div className="lg:col-span-4">
            <div className="sticky top-24">
              <div className="bg-yemalin-grey-100 p-6 mb-8">
                <div className="flex items-center mb-4">
                  <img 
                    src={post.authorImage}
                    alt={post.author}
                    className="w-16 h-16 rounded-full mr-4 object-cover"
                  />
                  <div>
                    <h3 className="font-medium text-lg">{post.author}</h3>
                    <p className="text-sm text-gray-600">Fashion Editor</p>
                  </div>
                </div>
                <p className="text-sm">
                  With over a decade of experience in luxury fashion journalism, {post.author} specializes in spotlighting emerging designers and sustainable practices in the industry.
                </p>
              </div>
              
              <div className="mb-8">
                <h3 className="font-display text-xl mb-4">Related Categories</h3>
                <div className="flex flex-wrap gap-2">
                  <span className="bg-yemalin-grey-100 px-3 py-1 text-xs font-medium">
                    {post.category}
                  </span>
                  <span className="bg-yemalin-grey-100 px-3 py-1 text-xs font-medium">
                    Interviews
                  </span>
                  <span className="bg-yemalin-grey-100 px-3 py-1 text-xs font-medium">
                    Fashion
                  </span>
                </div>
              </div>
              
              <div>
                <h3 className="font-display text-xl mb-4">Share This Article</h3>
                <div className="flex gap-4">
                  <Button variant="outline" size="icon">
                    <span className="sr-only">Share on Twitter</span>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-twitter"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path></svg>
                  </Button>
                  <Button variant="outline" size="icon">
                    <span className="sr-only">Share on Facebook</span>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-facebook"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
                  </Button>
                  <Button variant="outline" size="icon">
                    <span className="sr-only">Share on LinkedIn</span>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-linkedin"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect width="4" height="12" x="2" y="9"></rect><circle cx="4" cy="4" r="2"></circle></svg>
                  </Button>
                  <Button variant="outline" size="icon">
                    <span className="sr-only">Share via Email</span>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-mail"><rect width="20" height="16" x="2" y="4" rx="2"></rect><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path></svg>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <Separator className="my-16" />
        
        {/* Newsletter Section */}
        <BlogNewsletter />
      </div>
    </MainLayout>
  );
};

export default BlogPost;
