
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { allBlogPosts } from '@/data/mockBlogPostsData';

interface BlogPostData {
  id?: string;
  title: string;
  excerpt: string;
  content: string;
  image?: string;
  image_url?: string;
  category?: string;
  author?: string;
  authorImage?: string;
  author_image?: string;
  read_time?: string;
  link?: string;
}

const useBlogPost = (slug: string | undefined) => {
  const [post, setPost] = useState<BlogPostData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPost = async () => {
      setLoading(true);
      
      // First check if we have a real blog post from the database
      if (slug !== 'preview') {
        try {
          // Generate likely slug format for database comparison
          if (typeof slug === 'string') {
            const formattedSlug = slug.replace(/-/g, ' ');
            
            const { data, error } = await supabase
              .from('blog_posts')
              .select('*')
              .or(`title.ilike.%${formattedSlug}%`)
              .eq('status', 'published')
              .limit(1);
              
            if (error) throw error;
            
            if (data && data.length > 0) {
              // Format the post data
              setPost({
                title: data[0].title,
                excerpt: data[0].excerpt || "",
                content: data[0].content || "",
                image_url: data[0].image_url,
                category: data[0].category,
                author: data[0].author,
                author_image: data[0].author_image,
                read_time: data[0].read_time
              });
              setLoading(false);
              return;
            }
          }
        } catch (error) {
          console.error("Error fetching from Supabase:", error);
          // Continue to mock data as fallback
        }
      }
  
      // If we're here, try mock data or preview data
      if (slug === 'preview') {
        // Use preview data from localStorage
        const previewData = localStorage.getItem('preview_post');
        if (previewData) {
          try {
            setPost(JSON.parse(previewData));
          } catch (error) {
            console.error('Failed to parse preview data:', error);
          }
        }
      } else {
        // Use mock data as fallback
        const foundPost = allBlogPosts.find(p => {
          const postSlug = p.link.substring(1);
          return postSlug === slug || postSlug === `blog/${slug}`;
        });
        
        if (foundPost) {
          setPost({
            ...foundPost,
            content: foundPost.excerpt || "" // Ensure content is present
          });
        }
      }
      
      setLoading(false);
    };
    
    fetchPost();
  }, [slug]);

  return { post, loading };
};

export default useBlogPost;
