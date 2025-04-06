
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from '@/hooks/use-toast';
import { Pencil, Eye, Trash2, Plus, FileText } from 'lucide-react';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

interface BlogPost {
  id: string;
  title: string;
  status: string | null;
  created_at: string | null;
  published_at: string | null;
  category: string | null;
}

const BlogManagement = () => {
  const navigate = useNavigate();
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [newPostTitle, setNewPostTitle] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [filteredPosts, setFilteredPosts] = useState<BlogPost[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string | null>(null);

  useEffect(() => {
    fetchPosts();
  }, []);

  useEffect(() => {
    // Apply filters
    let results = posts;
    
    if (searchTerm) {
      results = results.filter(post => 
        post.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    if (statusFilter) {
      results = results.filter(post => post.status === statusFilter);
    }
    
    setFilteredPosts(results);
  }, [posts, searchTerm, statusFilter]);

  const fetchPosts = async () => {
    setIsLoading(true);
    try {
      const { data, error } = await supabase
        .from('blog_posts')
        .select('id, title, status, created_at, published_at, category')
        .order('created_at', { ascending: false });

      if (error) throw error;
      if (data) {
        setPosts(data);
        setFilteredPosts(data);
      }
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Failed to fetch posts",
        description: error.message
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleCreatePost = async () => {
    if (!newPostTitle.trim()) {
      toast({
        variant: "destructive",
        title: "Validation Error",
        description: "Title cannot be empty."
      });
      return;
    }

    try {
      const { error, data } = await supabase
        .from('blog_posts')
        .insert([{ title: newPostTitle, status: 'draft' }])
        .select();

      if (error) throw error;

      toast({
        title: "Post created",
        description: "New blog post created successfully"
      });

      setNewPostTitle('');
      
      // Navigate to the editor with the new post ID
      if (data && data.length > 0) {
        navigate(`/dashboard/blog/edit/${data[0].id}`);
      } else {
        fetchPosts();
      }
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Failed to create post",
        description: error.message
      });
    }
  };

  const handlePublish = async (post: BlogPost) => {
    try {
      const { error } = await supabase
        .from('blog_posts')
        .update({ 
          status: 'published',
          published_at: new Date().toISOString() 
        })
        .eq('id', post.id);
      
      if (error) throw error;
      
      toast({
        title: "Post published",
        description: "Your post is now live on the blog"
      });
      
      fetchPosts();
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Failed to publish",
        description: error.message
      });
    }
  };

  const handleUnpublish = async (post: BlogPost) => {
    try {
      const { error } = await supabase
        .from('blog_posts')
        .update({ status: 'draft', published_at: null })
        .eq('id', post.id);

      if (error) throw error;

      toast({
        title: "Post unpublished",
        description: "Post has been moved back to draft"
      });

      fetchPosts();
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Failed to unpublish",
        description: error.message
      });
    }
  };

  const handleDelete = async (post: BlogPost) => {
    try {
      const { error } = await supabase
        .from('blog_posts')
        .delete()
        .eq('id', post.id);

      if (error) throw error;

      toast({
        title: "Post deleted",
        description: "Post deleted successfully"
      });

      fetchPosts();
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Failed to delete post",
        description: error.message
      });
    }
  };

  const formatDate = (dateString: string | null) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: 'numeric',
      minute: '2-digit'
    });
  };

  return (
    <div className="container mx-auto py-10">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold">Blog Management</h1>
        <Button onClick={() => navigate('/dashboard/blog/new')} className="flex items-center gap-2">
          <Plus size={16} /> New Post
        </Button>
      </div>

      {/* Filters */}
      <div className="flex flex-col md:flex-row gap-4 mb-8">
        <div className="flex-1">
          <Input
            type="text"
            placeholder="Search posts..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="w-full md:w-48">
          <select
            className="w-full p-2 border rounded-md"
            value={statusFilter || ''}
            onChange={(e) => setStatusFilter(e.target.value || null)}
          >
            <option value="">All Status</option>
            <option value="draft">Draft</option>
            <option value="published">Published</option>
          </select>
        </div>
        <Button 
          variant="outline" 
          onClick={() => {
            setSearchTerm('');
            setStatusFilter(null);
          }}
        >
          Clear Filters
        </Button>
      </div>

      {/* Quick Create */}
      <div className="mb-8 bg-gray-50 p-4 rounded-lg border">
        <h2 className="text-xl font-semibold mb-3">Quick Create</h2>
        <div className="flex flex-col md:flex-row gap-3">
          <Input
            type="text"
            placeholder="Enter post title"
            value={newPostTitle}
            onChange={(e) => setNewPostTitle(e.target.value)}
            className="flex-1"
          />
          <Button onClick={handleCreatePost}>Create & Edit</Button>
        </div>
      </div>

      {/* List of Blog Posts */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-3">Your Posts</h2>
        {isLoading ? (
          <div className="text-center py-10">
            <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-primary mx-auto"></div>
            <p className="mt-2">Loading posts...</p>
          </div>
        ) : filteredPosts.length === 0 ? (
          <div className="text-center py-10 bg-gray-50 rounded-lg">
            <FileText className="mx-auto text-gray-400 mb-2" size={40} />
            <h3 className="text-xl font-medium mb-1">No posts found</h3>
            <p className="text-gray-500 mb-4">
              {posts.length === 0 
                ? "Start creating your first blog post" 
                : "No posts match your current filters"}
            </p>
            {posts.length === 0 && (
              <Button onClick={() => navigate('/dashboard/blog/new')}>
                Create Your First Post
              </Button>
            )}
          </div>
        ) : (
          <div className="rounded-md border overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[250px]">Title</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Created</TableHead>
                  <TableHead>Published</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredPosts.map((post) => (
                  <TableRow key={post.id}>
                    <TableCell className="font-medium">
                      {post.title || 'Untitled Post'}
                    </TableCell>
                    <TableCell>{post.category || 'Uncategorized'}</TableCell>
                    <TableCell>
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        post.status === 'published' 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-gray-100 text-gray-800'
                      }`}>
                        {post.status}
                      </span>
                    </TableCell>
                    <TableCell>{formatDate(post.created_at)}</TableCell>
                    <TableCell>{formatDate(post.published_at)}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button 
                          variant="outline" 
                          size="icon" 
                          onClick={() => navigate(`/dashboard/blog/edit/${post.id}`)}
                        >
                          <Pencil size={16} />
                        </Button>
                        
                        {post.status === 'published' && (
                          <Button 
                            variant="outline" 
                            size="icon" 
                            onClick={() => {
                              // Open the blog post in a new tab
                              const slug = post.title.toLowerCase()
                                .replace(/[^\w\s-]/g, '')
                                .replace(/\s+/g, '-');
                              window.open(`/blog/${slug}`, '_blank');
                            }}
                          >
                            <Eye size={16} />
                          </Button>
                        )}
                        
                        {post.status === 'draft' ? (
                          <Button
                            size="sm"
                            onClick={() => handlePublish(post)}
                          >
                            Publish
                          </Button>
                        ) : (
                          <Button
                            size="sm"
                            variant="secondary"
                            onClick={() => handleUnpublish(post)}
                          >
                            Unpublish
                          </Button>
                        )}
                        
                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <Button size="icon" variant="destructive">
                              <Trash2 size={16} />
                            </Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>Delete Post</AlertDialogTitle>
                              <AlertDialogDescription>
                                Are you sure you want to delete "{post.title}"? This action cannot be undone.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Cancel</AlertDialogCancel>
                              <AlertDialogAction onClick={() => handleDelete(post)}>
                                Delete
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}
      </div>
      
      {/* SEO Tips Section */}
      <div className="bg-gray-50 p-6 rounded-lg border">
        <h3 className="text-lg font-medium mb-3">SEO Best Practices</h3>
        <ul className="list-disc pl-5 space-y-2">
          <li>Use descriptive, keyword-rich titles (50-60 characters)</li>
          <li>Write compelling meta descriptions (150-160 characters)</li>
          <li>Structure content with proper heading tags (H1, H2, H3)</li>
          <li>Include relevant keywords naturally throughout your content</li>
          <li>Add alt text to all images for better accessibility</li>
          <li>Create internal links to other relevant blog posts</li>
          <li>Optimize your content for readability (shorter paragraphs, bullet points)</li>
        </ul>
      </div>
    </div>
  );
};

export default BlogManagement;
