
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
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
} from "@/components/ui/alert-dialog"
import { MoreVertical, Edit, Trash2, ImagePlus, UserPlus, CheckCircle, XCircle } from 'lucide-react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { cn } from "@/lib/utils"
import { format } from "date-fns"
import { CalendarIcon } from "lucide-react"
import { DateRange } from "react-day-picker"
import { useToast } from "@/hooks/use-toast"

interface BlogPost {
  id: string;
  created_at: string;
  title: string;
  content: string;
  image_url: string;
  author_id: string;
  author_name: string;
  author_image_url: string;
  published_at: string | null;
  is_published: boolean;
}

const BlogManagement = () => {
  const navigate = useNavigate();
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [newPost, setNewPost] = useState({
    title: '',
    content: '',
    image_url: '',
    author_name: '',
    author_image_url: '',
    published_at: null,
  });
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [date, setDate] = useState<DateRange | undefined>({
    from: new Date(),
    to: new Date(),
  })
  const { toast } = useToast()

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('blog_posts')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        throw error;
      }
      
      // Check if data is not null before setting the state
      if (data) {
        setPosts(data as BlogPost[]);
      } else {
        setPosts([]); // Set to an empty array if data is null
      }
      
    } catch (err: any) {
      setError(err.message);
      toast({
        variant: "destructive",
        title: "Loading failed",
        description: err.message || "Failed to load blog posts"
      });
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setNewPost({ ...newPost, [e.target.name]: e.target.value });
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setLoading(true);
    try {
      const { data, error } = await supabase.storage
        .from('blog-images')
        .upload(`public/${file.name}`, file, {
          cacheControl: '3600',
          upsert: false,
        });

      if (error) {
        throw error;
      }

      const imageUrl = `${supabase.storageUrl}/blog-images/${data.path}`;
      setNewPost({ ...newPost, image_url: imageUrl });
      toast({
        title: "Upload successful",
        description: "Image uploaded successfully"
      });
    } catch (err: any) {
      setError(err.message);
      toast({
        variant: "destructive",
        title: "Upload failed",
        description: err.message || "Failed to upload image"
      });
    } finally {
      setLoading(false);
    }
  };

  const handleAuthorImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setLoading(true);
    try {
      const { data, error } = await supabase.storage
        .from('author-images')
        .upload(`public/${file.name}`, file, {
          cacheControl: '3600',
          upsert: false,
        });

      if (error) {
        throw error;
      }

      const imageUrl = `${supabase.storageUrl}/author-images/${data.path}`;
      setNewPost({ ...newPost, author_image_url: imageUrl });
      toast({
        title: "Upload successful",
        description: "Author image uploaded successfully"
      });
    } catch (err: any) {
      setError(err.message);
      toast({
        variant: "destructive",
        title: "Upload failed",
        description: err.message || "Failed to upload author image"
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { error } = await supabase
        .from('blog_posts')
        .insert([
          {
            title: newPost.title,
            content: newPost.content,
            image_url: newPost.image_url,
            author_name: newPost.author_name,
            author_image_url: newPost.author_image_url,
            published_at: newPost.published_at,
          },
        ]);

      if (error) {
        throw error;
      }

      fetchPosts();
      setNewPost({
        title: '',
        content: '',
        image_url: '',
        author_name: '',
        author_image_url: '',
        published_at: null,
      });
      toast({
        title: "Post created",
        description: "Blog post created successfully"
      });
    } catch (err: any) {
      setError(err.message);
      toast({
        variant: "destructive",
        title: "Creation failed",
        description: err.message || "Failed to create blog post"
      });
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (postId: string) => {
    setLoading(true);
    try {
      const { error } = await supabase.from('blog_posts').delete().match({ id: postId });

      if (error) {
        throw error;
      }

      fetchPosts();
      setIsDialogOpen(false);
      toast({
        title: "Post deleted",
        description: "Blog post deleted successfully"
      });
    } catch (err: any) {
      setError(err.message);
      toast({
        variant: "destructive",
        title: "Deletion failed",
        description: err.message || "Failed to delete blog post"
      });
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (post: BlogPost) => {
    setSelectedPost(post);
    setIsEditing(true);
    setNewPost({
      title: post.title,
      content: post.content,
      image_url: post.image_url,
      author_name: post.author_name,
      author_image_url: post.author_image_url,
      published_at: post.published_at,
    });
  };

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedPost) return;

    setLoading(true);
    try {
      const { error } = await supabase
        .from('blog_posts')
        .update({
          title: newPost.title,
          content: newPost.content,
          image_url: newPost.image_url,
          author_name: newPost.author_name,
          author_image_url: newPost.author_image_url,
          published_at: newPost.published_at,
        })
        .match({ id: selectedPost.id });

      if (error) {
        throw error;
      }

      fetchPosts();
      setNewPost({
        title: '',
        content: '',
        image_url: '',
        author_name: '',
        author_image_url: '',
        published_at: null,
      });
      setIsEditing(false);
      setSelectedPost(null);
      toast({
        title: "Post updated",
        description: "Blog post updated successfully"
      });
    } catch (err: any) {
      setError(err.message);
      toast({
        variant: "destructive",
        title: "Update failed",
        description: err.message || "Failed to update blog post"
      });
    } finally {
      setLoading(false);
    }
  };

  const handlePublish = async (postId: string, isPublished: boolean) => {
    setLoading(true);
    try {
      const { error } = await supabase
        .from('blog_posts')
        .update({ is_published: !isPublished })
        .match({ id: postId });

      if (error) {
        throw error;
      }

      fetchPosts();
      toast({
        title: "Post updated",
        description: `Blog post ${isPublished ? 'unpublished' : 'published'} successfully`
      });
    } catch (err: any) {
      setError(err.message);
      toast({
        variant: "destructive",
        title: "Update failed",
        description: err.message || "Failed to update blog post"
      });
    } finally {
      setLoading(false);
    }
  };

  // Replace the function with document.createElement approach for file upload buttons
  const handleImageUploadClick = () => {
    const fileInput = document.getElementById('image-upload');
    if (fileInput) {
      (fileInput as HTMLElement).click();
    }
  };

  const handleAuthorImageUploadClick = () => {
    const fileInput = document.getElementById('author-image-upload');
    if (fileInput) {
      (fileInput as HTMLElement).click();
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-semibold mb-6">Blog Management</h1>

      {/* Create New Post Form */}
      <form onSubmit={isEditing ? handleUpdate : handleSubmit} className="mb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <Label htmlFor="title">Title</Label>
            <Input
              type="text"
              id="title"
              name="title"
              value={newPost.title}
              onChange={handleInputChange}
              required
            />
          </div>
          <div>
            <Label htmlFor="author_name">Author Name</Label>
            <Input
              type="text"
              id="author_name"
              name="author_name"
              value={newPost.author_name}
              onChange={handleInputChange}
              required
            />
          </div>
        </div>

        <div className="mt-4">
          <Label htmlFor="content">Content</Label>
          <Textarea
            id="content"
            name="content"
            value={newPost.content}
            onChange={handleInputChange}
            rows={6}
            required
          />
        </div>

        <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <Label htmlFor="image_url">Image URL</Label>
            <div className="flex items-center space-x-2">
              <Input
                type="text"
                id="image_url"
                name="image_url"
                value={newPost.image_url}
                onChange={handleInputChange}
                placeholder="Or upload below"
              />
              <Button type="button" variant="secondary" size="sm" onClick={handleImageUploadClick}>
                <ImagePlus className="h-4 w-4 mr-2" /> Upload
              </Button>
              <input
                type="file"
                id="image-upload"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
              />
            </div>
            {newPost.image_url && (
              <img src={newPost.image_url} alt="Blog Post" className="mt-2 max-h-32" />
            )}
          </div>
          <div>
            <Label htmlFor="author_image_url">Author Image URL</Label>
            <div className="flex items-center space-x-2">
              <Input
                type="text"
                id="author_image_url"
                name="author_image_url"
                value={newPost.author_image_url}
                onChange={handleInputChange}
                placeholder="Or upload below"
              />
              <Button type="button" variant="secondary" size="sm" onClick={handleAuthorImageUploadClick}>
                <UserPlus className="h-4 w-4 mr-2" /> Upload
              </Button>
              <input
                type="file"
                id="author-image-upload"
                accept="image/*"
                onChange={handleAuthorImageUpload}
                className="hidden"
              />
            </div>
            {newPost.author_image_url && (
              <img src={newPost.author_image_url} alt="Author" className="mt-2 max-h-32" />
            )}
          </div>
        </div>

        <div className="mt-4">
          <Label>Publish Date</Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant={"outline"}
                className={cn(
                  "w-[240px] justify-start text-left font-normal",
                  !date?.from ? "text-muted-foreground" : ""
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {date?.from ? (
                  date?.to ? (
                    <>
                      {format(date.from, "PPP")} - {format(date.to, "PPP")}
                    </>
                  ) : (
                    format(date.from, "PPP")
                  )
                ) : (
                  <span>Pick a date</span>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="center" side="bottom">
              <Calendar
                mode="range"
                defaultMonth={date?.from}
                selected={date}
                onSelect={(value) => {
                  setDate(value);
                  if (value?.from) {
                    const isoDate = value.from.toISOString();
                    setNewPost({ ...newPost, published_at: isoDate });
                  }
                }}
                disabled={(date) =>
                  date > new Date()
                }
                className="border-0 rounded-md"
              />
            </PopoverContent>
          </Popover>
        </div>

        <div className="mt-6">
          <Button type="submit" disabled={loading}>
            {loading ? 'Submitting...' : isEditing ? 'Update Post' : 'Create Post'}
          </Button>
          {isEditing && (
            <Button
              type="button"
              variant="ghost"
              onClick={() => {
                setIsEditing(false);
                setSelectedPost(null);
                setNewPost({
                  title: '',
                  content: '',
                  image_url: '',
                  author_name: '',
                  author_image_url: '',
                  published_at: null,
                });
              }}
              className="ml-2"
            >
              Cancel Edit
            </Button>
          )}
        </div>
      </form>

      <Separator className="my-8" />

      {/* Blog Posts Table */}
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <Table>
          <TableCaption>A list of your recent blog posts.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="px-6 py-3">Title</TableHead>
              <TableHead className="px-6 py-3">Author</TableHead>
              <TableHead className="px-6 py-3">Publish Date</TableHead>
              <TableHead className="px-6 py-3">Status</TableHead>
              <TableHead className="px-6 py-3">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {posts.map((post) => (
              <TableRow key={post.id} className="bg-white border-b hover:bg-gray-50">
                <TableCell className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                  {post.title}
                </TableCell>
                <TableCell className="px-6 py-4">{post.author_name}</TableCell>
                <TableCell className="px-6 py-4">
                  {post.published_at ? format(new Date(post.published_at), "PPP") : 'Not set'}
                </TableCell>
                <TableCell className="px-6 py-4">
                  {post.is_published ? (
                    <Badge variant="success">Published</Badge>
                  ) : (
                    <Badge variant="secondary">Draft</Badge>
                  )}
                </TableCell>
                <TableCell className="px-6 py-4 text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="h-8 w-8 p-0">
                        <span className="sr-only">Open menu</span>
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>Actions</DropdownMenuLabel>
                      <DropdownMenuItem onClick={() => handleEdit(post)}>
                        <Edit className="h-4 w-4 mr-2" /> Edit
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handlePublish(post.id, post.is_published)}>
                        {post.is_published ? (
                          <>
                            <XCircle className="h-4 w-4 mr-2 text-red-500" /> Unpublish
                          </>
                        ) : (
                          <>
                            <CheckCircle className="h-4 w-4 mr-2 text-green-500" /> Publish
                          </>
                        )}
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <DropdownMenuItem>
                            <Trash2 className="h-4 w-4 mr-2 text-red-500" /> Delete
                          </DropdownMenuItem>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                            <AlertDialogDescription>
                              This action cannot be undone. This will permanently delete your post from our servers.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction onClick={() => {
                              setSelectedPost(post);
                              setIsDialogOpen(true);
                            }}>Continue</AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Confirm Deletion</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete this blog post? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setIsDialogOpen(false)}>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => {
                if (selectedPost) {
                  handleDelete(selectedPost.id);
                }
              }}
              disabled={loading}
            >
              {loading ? 'Deleting...' : 'Delete'}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default BlogManagement;
