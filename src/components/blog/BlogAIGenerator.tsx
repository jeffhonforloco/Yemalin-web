
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Loader2 } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';

interface BlogAIGeneratorProps {
  onContentGenerated: (content: string) => void;
}

const BlogAIGenerator = ({ onContentGenerated }: BlogAIGeneratorProps) => {
  const [topic, setTopic] = useState('');
  const [keywords, setKeywords] = useState('');
  const [type, setType] = useState('blog');
  const [tone, setTone] = useState('professional');
  const [isLoading, setIsLoading] = useState(false);

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!topic.trim()) {
      toast({
        variant: "destructive",
        title: "Topic required",
        description: "Please enter a topic for your blog post"
      });
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch('https://irjfjeaxizvtvzbykzky.supabase.co/functions/v1/generate-blog-content', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ topic, keywords, type, tone })
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to generate content');
      }

      const data = await response.json();
      
      if (data.content) {
        onContentGenerated(data.content);
        toast({
          title: "Content generated",
          description: "Your AI-generated content is ready to use"
        });
      } else {
        throw new Error('No content returned from the API');
      }
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Generation failed",
        description: error.message || 'Something went wrong. Please try again.'
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle>AI Content Generator</CardTitle>
        <CardDescription>
          Generate blog content quickly using AI. Enter a topic and keywords to get started.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleGenerate} className="space-y-4">
          <div>
            <Label htmlFor="topic">Blog Topic</Label>
            <Input
              id="topic"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              placeholder="e.g., Sustainable Fashion Trends for 2025"
              disabled={isLoading}
            />
          </div>
          
          <div>
            <Label htmlFor="keywords">Keywords (comma separated)</Label>
            <Input
              id="keywords"
              value={keywords}
              onChange={(e) => setKeywords(e.target.value)}
              placeholder="e.g., sustainable, eco-friendly, luxury, fashion"
              disabled={isLoading}
            />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="type">Content Type</Label>
              <Select 
                value={type} 
                onValueChange={setType}
                disabled={isLoading}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select content type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="blog">Blog Post</SelectItem>
                  <SelectItem value="article">Article</SelectItem>
                  <SelectItem value="product">Product Description</SelectItem>
                  <SelectItem value="social">Social Media Post</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <Label htmlFor="tone">Tone</Label>
              <Select 
                value={tone} 
                onValueChange={setTone}
                disabled={isLoading}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select tone" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="professional">Professional</SelectItem>
                  <SelectItem value="casual">Casual</SelectItem>
                  <SelectItem value="enthusiastic">Enthusiastic</SelectItem>
                  <SelectItem value="luxury">Luxury & Sophisticated</SelectItem>
                  <SelectItem value="authoritative">Authoritative</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </form>
      </CardContent>
      <CardFooter>
        <Button 
          onClick={handleGenerate}
          disabled={isLoading}
          className="w-full"
        >
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Generating...
            </>
          ) : (
            'Generate Content'
          )}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default BlogAIGenerator;
