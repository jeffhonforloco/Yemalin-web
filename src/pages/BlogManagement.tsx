
import { useState } from 'react';
import MainLayout from '@/components/layouts/MainLayout';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { AlertCircle, CheckCircle, Edit, Loader2, Plus, Trash } from 'lucide-react';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { useEffect } from 'react';

const blogPostSchema = z.object({
  title: z.string().min(5, { message: 'Title must be at least 5 characters' }),
  excerpt: z.string().min(10, { message: 'Excerpt must be at least 10 characters' }),
  content: z.string().min(50, { message: 'Content must be at least 50 characters' }),
  image_url: z.string().url({ message: 'Please enter a valid URL' }).optional().or(z.literal('')),
  category: z.string().min(1, { message: 'Please select a category' }),
  author: z.string().min(2, { message: 'Author name must be at least 2 characters' }),
  author_image: z.string().url({ message: 'Please enter a valid URL' }).optional().or(z.literal('')),
  read_time: z.string().optional(),
});

type BlogPostFormValues = z.infer<typeof blogPostSchema>;

const BlogManagement = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [blogs, setBlogs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [generating, setGenerating] = useState(false);
  const [generationTopic, setGenerationTopic] = useState('');
  const [generationKeywords, setGenerationKeywords] = useState('');
  const [generationTone, setGenerationTone] = useState('professional');
  const [generationType, setGenerationType] = useState('blog');
  const [generatedContent, setGeneratedContent] = useState<{title?: string, content?: string}>({});
  const [currentBlogId, setCurrentBlogId] = useState<string | null>(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const form = useForm<BlogPostFormValues>({
    resolver: zodResolver(blogPostSchema),
    defaultValues: {
      title: '',
      excerpt: '',
      content: '',
      image_url: '',
      category: '',
      author: '',
      author_image: '',
      read_time: '',
    },
  });

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('blog_posts')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      setBlogs(data || []);
    } catch (error) {
      console.error('Error fetching blogs:', error);
      toast({
        title: 'Failed to fetch blog posts',
        description: 'There was an error retrieving your blog posts.',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = (data: BlogPostFormValues) => {
    createOrUpdateBlog(data);
  };

  const createOrUpdateBlog = async (data: BlogPostFormValues) => {
    if (!user) {
      toast({
        title: 'Authentication Required',
        description: 'You must be logged in to manage blogs.',
        variant: 'destructive',
      });
      return;
    }

    setSaving(true);
    try {
      const blogData = {
        ...data,
        user_id: user.id,
        status: 'draft',
        read_time: data.read_time || `${Math.ceil(data.content.length / 1500)} min read`,
      };

      if (currentBlogId) {
        // Update existing blog
        const { error } = await supabase
          .from('blog_posts')
          .update(blogData)
          .eq('id', currentBlogId);

        if (error) throw error;

        toast({
          title: 'Blog Updated',
          description: 'Your blog post has been updated successfully.',
        });
      } else {
        // Create new blog
        const { error } = await supabase
          .from('blog_posts')
          .insert([blogData]);

        if (error) throw error;

        toast({
          title: 'Blog Created',
          description: 'Your blog post has been created successfully.',
        });
      }

      // Reset form and state
      form.reset();
      setCurrentBlogId(null);
      fetchBlogs();
    } catch (error) {
      console.error('Error saving blog:', error);
      toast({
        title: 'Failed to Save',
        description: 'There was an error saving your blog post.',
        variant: 'destructive',
      });
    } finally {
      setSaving(false);
    }
  };

  const handleEdit = (blog: any) => {
    setCurrentBlogId(blog.id);
    form.reset({
      title: blog.title || '',
      excerpt: blog.excerpt || '',
      content: blog.content || '',
      image_url: blog.image_url || '',
      category: blog.category || '',
      author: blog.author || '',
      author_image: blog.author_image || '',
      read_time: blog.read_time || '',
    });
  };

  const handleDelete = async (id: string) => {
    try {
      const { error } = await supabase
        .from('blog_posts')
        .delete()
        .eq('id', id);

      if (error) throw error;

      toast({
        title: 'Blog Deleted',
        description: 'Your blog post has been deleted.',
      });

      fetchBlogs();
    } catch (error) {
      console.error('Error deleting blog:', error);
      toast({
        title: 'Failed to Delete',
        description: 'There was an error deleting your blog post.',
        variant: 'destructive',
      });
    } finally {
      setDeletingId(null);
      setOpenDialog(false);
    }
  };

  const handlePublish = async (id: string, currentStatus: string) => {
    const newStatus = currentStatus === 'published' ? 'draft' : 'published';
    try {
      const { error } = await supabase
        .from('blog_posts')
        .update({ 
          status: newStatus,
          published_at: newStatus === 'published' ? new Date().toISOString() : null 
        })
        .eq('id', id);

      if (error) throw error;

      toast({
        title: newStatus === 'published' ? 'Blog Published' : 'Blog Unpublished',
        description: newStatus === 'published' 
          ? 'Your blog post is now live on the site.'
          : 'Your blog post has been unpublished.',
      });

      fetchBlogs();
    } catch (error) {
      console.error('Error updating publication status:', error);
      toast({
        title: 'Failed to Update Status',
        description: 'There was an error updating your blog post status.',
        variant: 'destructive',
      });
    }
  };

  const generateContent = async () => {
    if (!generationTopic) {
      toast({
        title: 'Topic Required',
        description: 'Please enter a topic for content generation.',
        variant: 'destructive',
      });
      return;
    }

    setGenerating(true);
    setGeneratedContent({});

    try {
      const { data, error } = await supabase.functions.invoke('generate-blog-content', {
        body: {
          topic: generationTopic,
          keywords: generationKeywords,
          tone: generationTone,
          type: generationType
        },
      });

      if (error) throw error;

      setGeneratedContent({
        title: data.title,
        content: data.content,
      });

      // Update form with generated content
      form.setValue('title', data.title);
      form.setValue('content', data.content);
      form.setValue('excerpt', data.excerpt || data.content.substring(0, 150) + '...');

      toast({
        title: 'Content Generated',
        description: 'Successfully generated content with AI.',
      });
    } catch (error) {
      console.error('Error generating content:', error);
      toast({
        title: 'Generation Failed',
        description: 'Failed to generate content. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setGenerating(false);
    }
  };

  return (
    <MainLayout>
      <div className="luxury-container py-12">
        <h1 className="text-3xl font-display mb-8">Blog Management</h1>

        <Tabs defaultValue="editor" className="w-full">
          <TabsList className="mb-8">
            <TabsTrigger value="editor">Editor</TabsTrigger>
            <TabsTrigger value="posts">My Posts</TabsTrigger>
            <TabsTrigger value="generator">AI Generator</TabsTrigger>
          </TabsList>

          <TabsContent value="editor" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>{currentBlogId ? 'Edit Blog Post' : 'Create New Blog Post'}</CardTitle>
                <CardDescription>
                  {currentBlogId 
                    ? 'Update your existing blog post'
                    : 'Fill in the details to create a new blog post'}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(handleCreate)} className="space-y-6">
                    <FormField
                      control={form.control}
                      name="title"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Title</FormLabel>
                          <FormControl>
                            <Input placeholder="Enter your blog post title" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="excerpt"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Excerpt</FormLabel>
                          <FormControl>
                            <Textarea 
                              placeholder="A brief summary of your post"
                              className="resize-none"
                              rows={2}
                              {...field} 
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <FormField
                        control={form.control}
                        name="category"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Category</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select a category" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="Sustainability">Sustainability</SelectItem>
                                <SelectItem value="Designer Spotlight">Designer Spotlight</SelectItem>
                                <SelectItem value="Fashion History">Fashion History</SelectItem>
                                <SelectItem value="Style Guide">Style Guide</SelectItem>
                                <SelectItem value="Craftsmanship">Craftsmanship</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="read_time"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Read Time</FormLabel>
                            <FormControl>
                              <Input placeholder="e.g., 5 min read" {...field} />
                            </FormControl>
                            <FormDescription>
                              Leave blank to calculate automatically
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <FormField
                        control={form.control}
                        name="author"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Author Name</FormLabel>
                            <FormControl>
                              <Input placeholder="Author name" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="author_image"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Author Image URL</FormLabel>
                            <FormControl>
                              <Input placeholder="https://example.com/author.jpg" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <FormField
                      control={form.control}
                      name="image_url"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Featured Image URL</FormLabel>
                          <FormControl>
                            <Input placeholder="https://example.com/image.jpg" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="content"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Content</FormLabel>
                          <FormControl>
                            <Textarea 
                              placeholder="Write your blog post content here"
                              className="min-h-[300px]"
                              {...field} 
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <div className="flex justify-end space-x-4">
                      {currentBlogId && (
                        <Button
                          type="button"
                          variant="outline"
                          onClick={() => {
                            setCurrentBlogId(null);
                            form.reset();
                          }}
                        >
                          Cancel
                        </Button>
                      )}
                      <Button type="submit" disabled={saving}>
                        {saving ? (
                          <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Saving...
                          </>
                        ) : (
                          <>{currentBlogId ? 'Update' : 'Create'} Post</>
                        )}
                      </Button>
                    </div>
                  </form>
                </Form>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="posts">
            {loading ? (
              <div className="flex justify-center items-center py-12">
                <Loader2 className="h-8 w-8 animate-spin" />
              </div>
            ) : blogs.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-gray-500 mb-4">You haven't created any blog posts yet.</p>
                <Button onClick={() => document.querySelector('[data-value="editor"]')?.click()}>
                  <Plus className="mr-2 h-4 w-4" /> Create Your First Post
                </Button>
              </div>
            ) : (
              <div className="space-y-6">
                {blogs.map((blog) => (
                  <Card key={blog.id} className="overflow-hidden">
                    <div className="flex flex-col md:flex-row">
                      {blog.image_url && (
                        <div className="w-full md:w-1/4">
                          <img
                            src={blog.image_url}
                            alt={blog.title}
                            className="h-full w-full object-cover"
                            style={{ maxHeight: '200px' }}
                          />
                        </div>
                      )}
                      <div className={`flex flex-col p-6 ${blog.image_url ? 'w-full md:w-3/4' : 'w-full'}`}>
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <span className={`inline-flex items-center px-2 py-1 text-xs rounded-full ${
                              blog.status === 'published' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                            } mr-2`}>
                              {blog.status === 'published' ? (
                                <>
                                  <CheckCircle className="mr-1 h-3 w-3" /> Published
                                </>
                              ) : (
                                <>
                                  <Edit className="mr-1 h-3 w-3" /> Draft
                                </>
                              )}
                            </span>
                            <span className="text-xs text-gray-500">{blog.category}</span>
                          </div>
                          <div className="flex space-x-2">
                            <Button 
                              variant="outline" 
                              size="sm" 
                              onClick={() => handleEdit(blog)}
                            >
                              <Edit className="h-4 w-4" />
                            </Button>
                            
                            <Button 
                              variant={blog.status === 'published' ? 'destructive' : 'default'}
                              size="sm" 
                              onClick={() => handlePublish(blog.id, blog.status)}
                            >
                              {blog.status === 'published' ? 'Unpublish' : 'Publish'}
                            </Button>
                            
                            <Dialog open={openDialog && deletingId === blog.id} onOpenChange={(open) => {
                              setOpenDialog(open);
                              if (!open) setDeletingId(null);
                            }}>
                              <DialogTrigger asChild>
                                <Button 
                                  variant="destructive" 
                                  size="sm" 
                                  onClick={() => setDeletingId(blog.id)}
                                >
                                  <Trash className="h-4 w-4" />
                                </Button>
                              </DialogTrigger>
                              <DialogContent>
                                <DialogHeader>
                                  <DialogTitle>Are you sure?</DialogTitle>
                                  <DialogDescription>
                                    This action cannot be undone. This will permanently delete your blog post.
                                  </DialogDescription>
                                </DialogHeader>
                                <DialogFooter>
                                  <Button
                                    variant="outline"
                                    onClick={() => {
                                      setOpenDialog(false);
                                      setDeletingId(null);
                                    }}
                                  >
                                    Cancel
                                  </Button>
                                  <Button 
                                    variant="destructive" 
                                    onClick={() => blog.id && handleDelete(blog.id)}
                                  >
                                    Delete
                                  </Button>
                                </DialogFooter>
                              </DialogContent>
                            </Dialog>
                          </div>
                        </div>
                        
                        <h3 className="text-xl font-bold mb-2">{blog.title}</h3>
                        <p className="text-gray-600 mb-4 line-clamp-2">{blog.excerpt}</p>
                        
                        <div className="flex items-center justify-between mt-auto text-xs text-gray-500">
                          <div className="flex items-center">
                            {blog.author_image ? (
                              <img 
                                src={blog.author_image} 
                                alt={blog.author} 
                                className="w-6 h-6 rounded-full mr-2 object-cover"
                              />
                            ) : (
                              <span className="w-6 h-6 bg-gray-200 rounded-full mr-2" />
                            )}
                            <span>{blog.author || 'Anonymous'}</span>
                          </div>
                          <div>
                            {blog.read_time && <span className="ml-2">{blog.read_time}</span>}
                            {blog.date && <span className="ml-2">· {new Date(blog.date).toLocaleDateString()}</span>}
                          </div>
                        </div>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>

          <TabsContent value="generator" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>AI Content Generator</CardTitle>
                <CardDescription>
                  Use seowriting.ai to automatically generate high-quality blog content
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">Topic</label>
                    <Input
                      placeholder="Enter your main topic (e.g., Sustainable Luxury Fashion)"
                      value={generationTopic}
                      onChange={(e) => setGenerationTopic(e.target.value)}
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-1">Keywords (comma-separated)</label>
                    <Input
                      placeholder="e.g., sustainable, luxury, ethical fashion, eco-friendly"
                      value={generationKeywords}
                      onChange={(e) => setGenerationKeywords(e.target.value)}
                    />
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-1">Content Type</label>
                      <Select value={generationType} onValueChange={setGenerationType}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select content type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="blog">Blog Post</SelectItem>
                          <SelectItem value="article">Article</SelectItem>
                          <SelectItem value="product">Product Description</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium mb-1">Tone</label>
                      <Select value={generationTone} onValueChange={setGenerationTone}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select tone" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="professional">Professional</SelectItem>
                          <SelectItem value="conversational">Conversational</SelectItem>
                          <SelectItem value="formal">Formal</SelectItem>
                          <SelectItem value="friendly">Friendly</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  
                  <Button 
                    onClick={generateContent} 
                    disabled={generating || !generationTopic}
                    className="w-full"
                  >
                    {generating ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Generating content...
                      </>
                    ) : (
                      'Generate Content'
                    )}
                  </Button>

                  {Object.keys(generatedContent).length > 0 && (
                    <div className="mt-6 border rounded-md p-4">
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="text-lg font-medium">Generated Content</h3>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => document.querySelector('[data-value="editor"]')?.click()}
                        >
                          Edit in Full Editor
                        </Button>
                      </div>
                      
                      {generatedContent.title && (
                        <div className="mb-4">
                          <h4 className="font-medium mb-1">Title</h4>
                          <div className="bg-muted p-2 rounded">{generatedContent.title}</div>
                        </div>
                      )}
                      
                      {generatedContent.content && (
                        <div>
                          <h4 className="font-medium mb-1">Content</h4>
                          <div className="bg-muted p-2 rounded max-h-[300px] overflow-y-auto">
                            {generatedContent.content.split('\n').map((paragraph, index) => (
                              <p key={index} className={index > 0 ? 'mt-2' : undefined}>
                                {paragraph}
                              </p>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  );
};

export default BlogManagement;
