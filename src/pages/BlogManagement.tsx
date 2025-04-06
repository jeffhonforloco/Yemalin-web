import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from '@/hooks/use-toast';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

interface BlogPost {
  id: string;
  title: string;
  status: string | null;
  created_at: string | null;
  published_at: string | null;
}

const BlogManagement = () => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [newPostTitle, setNewPostTitle] = useState('');

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const { data, error } = await supabase
        .from('blog_posts')
        .select('id, title, status, created_at, published_at')
        .order('created_at', { ascending: false });

      if (error) throw error;
      if (data) {
        setPosts(data);
      }
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Failed to fetch posts",
        description: error.message
      });
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
      const { error } = await supabase
        .from('blog_posts')
        .insert([{ title: newPostTitle, status: 'draft' }]);

      if (error) throw error;

      toast({
        title: "Post created",
        description: "New blog post created successfully"
      });

      setNewPostTitle('');
      fetchPosts();
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
        description: "Your post is now live on the blog",
        variant: "default", // Changed from "success" to "default"
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

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold mb-5">Blog Management</h1>

      {/* Create New Post */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-3">Create New Post</h2>
        <div className="flex space-x-3">
          <Input
            type="text"
            placeholder="Enter post title"
            value={newPostTitle}
            onChange={(e) => setNewPostTitle(e.target.value)}
          />
          <Button onClick={handleCreatePost}>Create Post</Button>
        </div>
      </div>

      {/* List of Blog Posts */}
      <div>
        <h2 className="text-xl font-semibold mb-3">List of Blog Posts</h2>
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[200px]">Title</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Created At</TableHead>
                <TableHead>Published At</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {posts.map((post) => (
                <TableRow key={post.id}>
                  <TableCell className="font-medium">{post.title}</TableCell>
                  <TableCell>{post.status}</TableCell>
                  <TableCell>{post.created_at}</TableCell>
                  <TableCell>{post.published_at}</TableCell>
                  <TableCell className="text-right">
                    {post.status === 'draft' ? (
                      <Button size="sm" onClick={() => handlePublish(post)}>Publish</Button>
                    ) : (
                      <Button size="sm" variant="secondary" onClick={() => handleUnpublish(post)}>Unpublish</Button>
                    )}
                    <Button size="sm" variant="destructive" onClick={() => handleDelete(post)}>Delete</Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
};

export default BlogManagement;
