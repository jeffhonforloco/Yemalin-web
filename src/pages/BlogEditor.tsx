
import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from '@/hooks/use-toast';
import MainLayout from '@/components/layouts/MainLayout';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import SEO from '@/components/SEO';

interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  seo_title?: string;
  seo_description?: string;
  image_url?: string;
  category?: string;
  status?: string;
  author?: string;
  author_image?: string;
  read_time?: string;
  published_at?: string;
  created_at?: string;
}

// Extended interface for database posts that might not have SEO fields
interface DatabasePost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  image_url?: string;
  category?: string;
  status?: string;
  author?: string;
  author_image?: string;
  read_time?: string;
  published_at?: string;
  created_at?: string;
  updated_at?: string;
  user_id?: string;
  seo_title?: string;
  seo_description?: string;
}

const DEFAULT_CONTENT = `<h2>Introduction</h2>
<p>Start your article with a compelling introduction...</p>

<h2>Main Point 1</h2>
<p>Develop your first main point here...</p>

<h3>Supporting Detail</h3>
<p>Add supporting details with proper heading hierarchy...</p>

<h2>Main Point 2</h2>
<p>Continue with your second main point...</p>

<h2>Conclusion</h2>
<p>Wrap up with a strong conclusion...</p>`;

const categories = [
  'Sustainability',
  'Designer Spotlight',
  'Fashion History',
  'Style Guide',
  'Craftsmanship'
];

const BlogEditor = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [post, setPost] = useState<BlogPost>({
    id: '',
    title: '',
    excerpt: '',
    content: DEFAULT_CONTENT,
    seo_title: '',
    seo_description: '',
    image_url: '',
    category: categories[0],
    read_time: '5 min read',
    author: '',
    author_image: ''
  });

  useEffect(() => {
    if (id) {
      loadPost();
    } else {
      setIsLoading(false);
    }
  }, [id]);

  const loadPost = async () => {
    try {
      const { data, error } = await supabase
        .from('blog_posts')
        .select('*')
        .eq('id', id)
        .single();

      if (error) throw error;
      
      if (data) {
        const dbPost = data as DatabasePost;
        setPost({
          ...dbPost,
          seo_title: dbPost.seo_title || dbPost.title,
          seo_description: dbPost.seo_description || dbPost.excerpt
        });
      }
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Error loading post",
        description: error.message
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setPost(prev => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setPost(prev => ({ ...prev, [name]: value }));
  };

  const calculateReadTime = (content: string) => {
    const words = content.split(/\s+/).length;
    const minutes = Math.round(words / 200); // Average reading speed
    return `${Math.max(1, minutes)} min read`;
  };

  const handleSave = async (status: string = 'draft') => {
    try {
      const read_time = calculateReadTime(post.content);
      const isPublishing = status === 'published';
      
      const postData = {
        title: post.title,
        excerpt: post.excerpt,
        content: post.content,
        seo_title: post.seo_title || post.title,
        seo_description: post.seo_description || post.excerpt,
        image_url: post.image_url,
        category: post.category,
        status,
        read_time,
        author: post.author || 'Editorial Team',
        author_image: post.author_image || '/placeholder.svg',
        published_at: isPublishing ? new Date().toISOString() : post.published_at
      };

      let operation;
      if (id) {
        operation = supabase
          .from('blog_posts')
          .update(postData)
          .eq('id', id);
      } else {
        operation = supabase
          .from('blog_posts')
          .insert([postData]);
      }

      const { error, data } = await operation;
      if (error) throw error;

      toast({
        title: status === 'published' ? "Post published" : "Draft saved",
        description: status === 'published' 
          ? "Your post has been published and is now live"
          : "Your changes have been saved"
      });

      if (!id && data) {
        // If we created a new post, navigate to edit it
        navigate(`/dashboard/blog/edit/${data[0].id}`);
      }
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Error saving post",
        description: error.message
      });
    }
  };

  const handlePreview = () => {
    // Generate a slug from the title
    const slug = post.title.toLowerCase()
      .replace(/[^\w\s-]/g, '')
      .replace(/\s+/g, '-');

    // Store the post data in localStorage for preview
    localStorage.setItem('preview_post', JSON.stringify({
      ...post,
      link: `/blog/${slug}`,
      date: new Date().toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      })
    }));

    // Open preview in new tab
    window.open(`/blog/preview`, '_blank');
  };

  if (isLoading) {
    return (
      <MainLayout>
        <SEO title="Loading Editor" />
        <div className="luxury-container py-16">
          <div className="flex items-center justify-center h-96">
            <div className="animate-pulse text-2xl">Loading editor...</div>
          </div>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <SEO 
        title={id ? `Edit: ${post.title}` : "Create New Blog Post"}
        description="Content management system for Yemalin Journal"
        robots="noindex, nofollow" // Don't index admin pages
      />
      <div className="luxury-container py-10">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-display">
            {id ? 'Edit Blog Post' : 'Create New Blog Post'}
          </h1>
          <div className="flex gap-2">
            <Button variant="outline" onClick={() => navigate('/dashboard/blog')}>
              Cancel
            </Button>
            <Button variant="outline" onClick={handlePreview}>
              Preview
            </Button>
            <Button variant="outline" onClick={() => handleSave('draft')}>
              Save Draft
            </Button>
            <Button onClick={() => handleSave('published')}>
              Publish
            </Button>
          </div>
        </div>

        <Tabs defaultValue="content">
          <TabsList className="mb-6">
            <TabsTrigger value="content">Content</TabsTrigger>
            <TabsTrigger value="seo">SEO & Meta</TabsTrigger>
            <TabsTrigger value="media">Media</TabsTrigger>
          </TabsList>

          <TabsContent value="content" className="space-y-6">
            <div>
              <Label htmlFor="title">Post Title</Label>
              <Input
                id="title"
                name="title"
                value={post.title}
                onChange={handleInputChange}
                placeholder="Enter your post title"
                className="mb-4"
              />
              
              <Label htmlFor="category">Category</Label>
              <Select 
                value={post.category} 
                onValueChange={(value) => handleSelectChange('category', value)}
              >
                <SelectTrigger className="w-full mb-4">
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map(category => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Label htmlFor="excerpt">Excerpt</Label>
              <Textarea
                id="excerpt"
                name="excerpt"
                value={post.excerpt}
                onChange={handleInputChange}
                placeholder="Write a brief summary of your post"
                className="mb-4 h-24"
              />
              
              <Label htmlFor="content">Content</Label>
              <div className="border rounded-md p-4 mb-4 bg-white">
                <p className="text-sm text-gray-500 mb-2">
                  Use HTML tags for formatting. Examples:
                </p>
                <div className="flex gap-2 mb-4 flex-wrap">
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => {
                      const textarea = document.getElementById('content') as HTMLTextAreaElement;
                      const start = textarea.selectionStart;
                      const end = textarea.selectionEnd;
                      const selectedText = textarea.value.substring(start, end);
                      const replacement = `<h2>${selectedText}</h2>`;
                      textarea.value = textarea.value.substring(0, start) + replacement + textarea.value.substring(end);
                      setPost(prev => ({ ...prev, content: textarea.value }));
                      textarea.focus();
                      textarea.selectionStart = start + 4;
                      textarea.selectionEnd = start + 4 + selectedText.length;
                    }}
                  >
                    H2
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => {
                      const textarea = document.getElementById('content') as HTMLTextAreaElement;
                      const start = textarea.selectionStart;
                      const end = textarea.selectionEnd;
                      const selectedText = textarea.value.substring(start, end);
                      const replacement = `<h3>${selectedText}</h3>`;
                      textarea.value = textarea.value.substring(0, start) + replacement + textarea.value.substring(end);
                      setPost(prev => ({ ...prev, content: textarea.value }));
                    }}
                  >
                    H3
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => {
                      const textarea = document.getElementById('content') as HTMLTextAreaElement;
                      const start = textarea.selectionStart;
                      const end = textarea.selectionEnd;
                      const selectedText = textarea.value.substring(start, end);
                      const replacement = `<p>${selectedText}</p>`;
                      textarea.value = textarea.value.substring(0, start) + replacement + textarea.value.substring(end);
                      setPost(prev => ({ ...prev, content: textarea.value }));
                    }}
                  >
                    Paragraph
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => {
                      const textarea = document.getElementById('content') as HTMLTextAreaElement;
                      const start = textarea.selectionStart;
                      const end = textarea.selectionEnd;
                      const selectedText = textarea.value.substring(start, end);
                      const replacement = `<blockquote>${selectedText}</blockquote>`;
                      textarea.value = textarea.value.substring(0, start) + replacement + textarea.value.substring(end);
                      setPost(prev => ({ ...prev, content: textarea.value }));
                    }}
                  >
                    Quote
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => {
                      const textarea = document.getElementById('content') as HTMLTextAreaElement;
                      const start = textarea.selectionStart;
                      const end = textarea.selectionEnd;
                      const selectedText = textarea.value.substring(start, end);
                      const replacement = `<img src="${selectedText || 'URL'}" alt="Description" class="w-full my-4" />`;
                      textarea.value = textarea.value.substring(0, start) + replacement + textarea.value.substring(end);
                      setPost(prev => ({ ...prev, content: textarea.value }));
                    }}
                  >
                    Image
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => {
                      const textarea = document.getElementById('content') as HTMLTextAreaElement;
                      const start = textarea.selectionStart;
                      const end = textarea.selectionEnd;
                      const selectedText = textarea.value.substring(start, end);
                      const replacement = `<iframe width="560" height="315" src="${selectedText || 'YouTube URL'}" frameborder="0" allowfullscreen class="w-full aspect-video my-4"></iframe>`;
                      textarea.value = textarea.value.substring(0, start) + replacement + textarea.value.substring(end);
                      setPost(prev => ({ ...prev, content: textarea.value }));
                    }}
                  >
                    Video
                  </Button>
                </div>
              </div>
              <Textarea
                id="content"
                name="content"
                value={post.content}
                onChange={handleInputChange}
                placeholder="Write your post content using HTML formatting"
                className="h-96 font-mono text-sm"
              />
            </div>
          </TabsContent>

          <TabsContent value="seo" className="space-y-6">
            <div>
              <Label htmlFor="seo_title">SEO Title</Label>
              <Input
                id="seo_title"
                name="seo_title"
                value={post.seo_title}
                onChange={handleInputChange}
                placeholder="Title that appears in search engine results"
                className="mb-4"
              />
              
              <div className="text-xs text-gray-500 mb-4">
                Recommended length: 50-60 characters. Current: {post.seo_title?.length || 0} characters
              </div>
              
              <Label htmlFor="seo_description">Meta Description</Label>
              <Textarea
                id="seo_description"
                name="seo_description"
                value={post.seo_description}
                onChange={handleInputChange}
                placeholder="Brief description that appears in search results"
                className="mb-4 h-24"
              />
              
              <div className="text-xs text-gray-500 mb-4">
                Recommended length: 150-160 characters. Current: {post.seo_description?.length || 0} characters
              </div>

              <Label htmlFor="author">Author</Label>
              <Input
                id="author"
                name="author"
                value={post.author}
                onChange={handleInputChange}
                placeholder="Post author"
                className="mb-4"
              />
            </div>

            <div className="bg-gray-50 p-4 rounded-md border mb-6">
              <h3 className="font-medium mb-2">SEO Preview</h3>
              <div className="bg-white p-3 rounded border">
                <div className="text-blue-600 text-lg font-medium truncate">
                  {post.seo_title || post.title || 'Post Title'}
                </div>
                <div className="text-green-700 text-sm truncate">
                  www.example.com/blog/{post.title ? post.title.toLowerCase().replace(/[^\w\s-]/g, '').replace(/\s+/g, '-') : 'post-url'}
                </div>
                <div className="text-gray-600 text-sm line-clamp-2 mt-1">
                  {post.seo_description || post.excerpt || 'Post description will appear here...'}
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="media" className="space-y-6">
            <div>
              <Label htmlFor="image_url">Featured Image URL</Label>
              <Input
                id="image_url"
                name="image_url"
                value={post.image_url}
                onChange={handleInputChange}
                placeholder="https://example.com/image.jpg"
                className="mb-4"
              />
              
              {post.image_url && (
                <div className="w-full mb-6">
                  <p className="text-sm font-medium mb-2">Preview:</p>
                  <img 
                    src={post.image_url} 
                    alt="Featured" 
                    className="w-full max-h-64 object-cover rounded-md"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = '/placeholder.svg';
                    }}
                  />
                </div>
              )}

              <div className="bg-gray-50 p-4 rounded-md border mb-6">
                <h3 className="font-medium mb-2">Adsense Code Placement</h3>
                <p className="text-sm text-gray-600 mb-3">
                  To add Google Adsense to your blog post, you can insert the ad code in specific locations:
                </p>
                <ol className="list-decimal pl-5 text-sm space-y-2">
                  <li>Top of post: Add <code>{`<div class="ad-container my-4">YOUR_ADSENSE_CODE</div>`}</code> after your introduction</li>
                  <li>Middle of post: Add between content sections</li>
                  <li>Bottom of post: Add before the conclusion</li>
                  <li>Sidebar (automatically added in the template)</li>
                </ol>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  );
};

export default BlogEditor;
