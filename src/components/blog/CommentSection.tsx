
import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { MessageSquare, ThumbsUp, Flag, Clock } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import useAnalytics from '@/hooks/useAnalytics';
import { toast } from '@/hooks/use-toast';

interface Comment {
  id: string;
  author: string;
  authorImage?: string;
  content: string;
  timestamp: string;
  likes: number;
  liked?: boolean;
  replies?: Comment[];
}

interface CommentSectionProps {
  postId: string;
  postTitle: string;
}

const CommentSection = ({ postId, postTitle }: CommentSectionProps) => {
  const { user } = useAuth();
  const { trackEvent } = useAnalytics();
  const [comments, setComments] = useState<Comment[]>([]);
  const [commentText, setCommentText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  // Mock comments - in a real app, these would come from a database
  useEffect(() => {
    // Simulate loading comments
    const mockComments: Comment[] = [
      {
        id: '1',
        author: 'Emma Thompson',
        authorImage: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-4.0.3',
        content: 'I absolutely love the sustainable fabric choices mentioned in this article. Would love to see more coverage on eco-friendly fashion brands!',
        timestamp: '2 days ago',
        likes: 12,
        liked: false,
      },
      {
        id: '2',
        author: 'Michael Chen',
        authorImage: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3',
        content: 'Great insights on the upcoming trends. I\'m particularly interested in the revival of 90s fashion elements with a modern twist.',
        timestamp: '1 day ago',
        likes: 7,
        liked: true,
      }
    ];
    
    setComments(mockComments);
  }, [postId]);
  
  const handleSubmitComment = () => {
    if (!commentText.trim()) return;
    
    if (!user) {
      toast({
        title: "Sign in required",
        description: "Please sign in to leave a comment",
        variant: "default"
      });
      return;
    }
    
    setIsLoading(true);
    
    // Track the comment event
    trackEvent('submit_comment', {
      post_id: postId,
      post_title: postTitle
    });
    
    // Create new comment object
    const newComment: Comment = {
      id: Date.now().toString(),
      author: user.email?.split('@')[0] || 'Anonymous',
      authorImage: user.user_metadata?.avatar_url,
      content: commentText,
      timestamp: 'Just now',
      likes: 0,
      liked: false
    };
    
    // Add to the list
    setComments([newComment, ...comments]);
    setCommentText('');
    setIsLoading(false);
    
    toast({
      title: "Comment posted",
      description: "Your comment has been added successfully",
    });
  };
  
  const handleLikeComment = (commentId: string) => {
    if (!user) {
      toast({
        title: "Sign in required",
        description: "Please sign in to like comments",
        variant: "default"
      });
      return;
    }
    
    // Track like event
    trackEvent('like_comment', {
      post_id: postId,
      comment_id: commentId
    });
    
    // Update the likes count
    const updatedComments = comments.map(comment => {
      if (comment.id === commentId) {
        return {
          ...comment,
          likes: comment.liked ? comment.likes - 1 : comment.likes + 1,
          liked: !comment.liked
        };
      }
      return comment;
    });
    
    setComments(updatedComments);
  };
  
  return (
    <section className="py-8">
      <div className="flex items-center gap-2 mb-6">
        <MessageSquare className="h-5 w-5" />
        <h3 className="text-xl font-medium">Discussion ({comments.length})</h3>
      </div>
      
      {/* Comment form */}
      <div className="mb-8">
        <Textarea
          placeholder="Join the conversation..."
          value={commentText}
          onChange={(e) => setCommentText(e.target.value)}
          className="min-h-[100px] mb-3"
          data-track="comment_input"
        />
        <div className="flex justify-between items-center">
          <p className="text-sm text-gray-500">
            {user ? 'Posting as ' + (user.email?.split('@')[0] || 'Anonymous') : 'Sign in to comment'}
          </p>
          <Button 
            onClick={handleSubmitComment} 
            disabled={!commentText.trim() || isLoading}
            data-track="submit_comment_button"
          >
            Post Comment
          </Button>
        </div>
      </div>
      
      {/* Comments list */}
      <div className="space-y-6">
        {comments.length === 0 ? (
          <div className="text-center py-8">
            <MessageSquare className="h-10 w-10 mx-auto text-gray-300 mb-3" />
            <p className="text-gray-500">Be the first to comment!</p>
          </div>
        ) : (
          comments.map(comment => (
            <div key={comment.id} className="bg-gray-50 p-4 rounded-md">
              <div className="flex justify-between">
                <div className="flex items-center gap-3 mb-3">
                  <Avatar>
                    <AvatarImage src={comment.authorImage} />
                    <AvatarFallback>{comment.author.charAt(0).toUpperCase()}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium">{comment.author}</p>
                    <div className="flex items-center text-gray-500 text-xs">
                      <Clock size={12} className="mr-1" />
                      <span>{comment.timestamp}</span>
                    </div>
                  </div>
                </div>
                <Button variant="ghost" size="sm">
                  <Flag size={16} className="text-gray-500" />
                </Button>
              </div>
              
              <p className="text-gray-700 mb-3">{comment.content}</p>
              
              <div className="flex items-center gap-4">
                <Button
                  variant="ghost" 
                  size="sm" 
                  onClick={() => handleLikeComment(comment.id)}
                  className={comment.liked ? 'text-blue-600' : ''}
                  data-track="like_comment"
                >
                  <ThumbsUp size={16} className="mr-2" />
                  {comment.likes}
                </Button>
              </div>
            </div>
          ))
        )}
      </div>
    </section>
  );
};

export default CommentSection;
