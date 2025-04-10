
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { allBlogPosts } from '@/data/mockBlogPostsData';
import sampleArticleContent from '@/data/sampleArticleContent';
import { fetchWpPostBySlug } from '@/utils/wordpressIntegration';

interface BlogPostData {
  id?: string;
  title: string;
  excerpt: string;
  content: string;
  image?: string;
  image_url?: string;
  category?: string;
  read_time?: string;
  link?: string;
  date?: string;
  modified?: string;
  author?: string;
  seoData?: any;
}

const useBlogPost = (slug: string | undefined) => {
  const [post, setPost] = useState<BlogPostData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [source, setSource] = useState<'wordpress' | 'supabase' | 'sample' | 'mock' | 'preview'>('wordpress');

  useEffect(() => {
    const fetchPost = async () => {
      setLoading(true);
      
      // Preview mode - use data from localStorage
      if (slug === 'preview') {
        setSource('preview');
        try {
          const previewData = localStorage.getItem('preview_post');
          if (previewData) {
            setPost(JSON.parse(previewData));
          }
          setLoading(false);
          return;
        } catch (error) {
          console.error('Failed to parse preview data:', error);
          // Fall through to other data sources
        }
      }
      
      // Try WordPress first
      try {
        if (slug) {
          const wpPost = await fetchWpPostBySlug(slug);
          
          if (wpPost) {
            setPost(wpPost);
            setSource('wordpress');
            setLoading(false);
            return;
          }
        }
      } catch (wpError) {
        console.error("Error fetching from WordPress:", wpError);
        // Continue to other fallbacks
      }
      
      // Check if we have sample article content for this slug
      if (slug && sampleArticleContent[slug]) {
        setSource('sample');
        const samplePost = sampleArticleContent[slug];
        setPost({
          title: samplePost.title,
          excerpt: samplePost.excerpt,
          content: samplePost.content,
          image_url: samplePost.image_url,
          category: samplePost.category,
          read_time: samplePost.read_time,
          date: samplePost.date,
          author: samplePost.author || 'Yemalin',
        });
        setLoading(false);
        return;
      }
      
      // Try to get content from Supabase
      try {
        if (typeof slug === 'string') {
          const formattedSlug = slug.replace(/-/g, ' ');
          
          const { data, error: supabaseError } = await supabase
            .from('blog_posts')
            .select('*')
            .or(`title.ilike.%${formattedSlug}%`)
            .eq('status', 'published')
            .limit(1);
            
          if (supabaseError) throw supabaseError;
          
          if (data && data.length > 0) {
            setSource('supabase');
            // Format the post data
            setPost({
              title: data[0].title,
              excerpt: data[0].excerpt || "",
              content: data[0].content || "",
              image_url: data[0].image_url,
              category: data[0].category,
              read_time: data[0].read_time,
              date: new Date(data[0].created_at).toLocaleDateString(),
              author: data[0].author || 'Yemalin Team'
            });
            setLoading(false);
            return;
          }
        }
      } catch (supabaseError) {
        console.error("Error fetching from Supabase:", supabaseError);
        // Continue to mock data as final fallback
      }
      
      // Use mock data as fallback
      const foundPost = allBlogPosts.find(p => {
        const postSlug = p.link.substring(1);
        return postSlug === slug || postSlug === `blog/${slug}`;
      });
      
      if (foundPost) {
        setSource('mock');
        setPost({
          title: foundPost.title,
          excerpt: foundPost.excerpt || "",
          content: foundPost.excerpt || "",
          image: foundPost.image,
          category: foundPost.category,
          read_time: foundPost.readTime,
          link: foundPost.link,
          date: new Date().toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' }),
          author: 'Yemalin Editorial Team'
        });
      } else {
        setError(new Error('Post not found'));
      }
      
      setLoading(false);
    };
    
    fetchPost();
  }, [slug]);

  return { post, loading, error, source };
};

export default useBlogPost;
