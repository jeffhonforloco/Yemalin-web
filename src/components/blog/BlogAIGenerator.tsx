
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Loader2, Sparkles } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { blogCategories } from '@/data/blogCategoriesData';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface BlogAIGeneratorProps {
  onContentGenerated: (content: string) => void;
}

const BlogAIGenerator = ({ onContentGenerated }: BlogAIGeneratorProps) => {
  const [topic, setTopic] = useState('');
  const [keywords, setKeywords] = useState('');
  const [type, setType] = useState('blog');
  const [tone, setTone] = useState('professional');
  const [isLoading, setIsLoading] = useState(false);
  const [inputMethod, setInputMethod] = useState<'manual' | 'template'>('manual');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedTopic, setSelectedTopic] = useState('');

  // Get topics for selected category
  const getCategoryTopics = () => {
    const category = blogCategories.find(cat => cat.slug === selectedCategory);
    return category ? category.topics : [];
  };

  // Handle topic selection from templates
  const handleTopicSelection = (topicSlug: string) => {
    const category = blogCategories.find(cat => cat.slug === selectedCategory);
    if (category) {
      const topic = category.topics.find(t => t.slug === topicSlug);
      if (topic) {
        setSelectedTopic(topicSlug);
        setTopic(topic.title);
        
        // Set default keywords based on category
        switch (category.name) {
          case 'Luxury Trends':
            setKeywords('luxury, trends, fashion, high-end, innovation');
            break;
          case 'Designer Spotlights':
            setKeywords('designer, craftsmanship, collection, atelier, vision');
            break;
          case 'Styling Guides':
            setKeywords('styling, luxury wardrobe, fashion advice, personal style');
            break;
          case 'Shopping Tips':
            setKeywords('shopping, luxury retail, investment pieces, quality');
            break;
          case 'Curated Collections':
            setKeywords('curation, seasonal, luxury pieces, designer selection');
            break;
          default:
            setKeywords('luxury, fashion, style, quality, design');
        }
      }
    }
  };

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
        <CardTitle className="flex items-center gap-2">
          <Sparkles className="h-5 w-5 text-blue-500" />
          AI Content Generator
        </CardTitle>
        <CardDescription>
          Generate blog content quickly using AI. Select a template or enter your own topic to get started.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs value={inputMethod} onValueChange={(v) => setInputMethod(v as 'manual' | 'template')} className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="manual">Custom Topic</TabsTrigger>
            <TabsTrigger value="template">Use Templates</TabsTrigger>
          </TabsList>
          
          <TabsContent value="manual" className="mt-4">
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
          </TabsContent>
          
          <TabsContent value="template" className="mt-4">
            <div className="space-y-4">
              <div>
                <Label htmlFor="category">Category</Label>
                <Select 
                  value={selectedCategory}
                  onValueChange={(value) => {
                    setSelectedCategory(value);
                    setSelectedTopic('');
                  }}
                  disabled={isLoading}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                  <SelectContent>
                    {blogCategories.map((category) => (
                      <SelectItem key={category.slug} value={category.slug}>
                        {category.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              {selectedCategory && (
                <div>
                  <Label htmlFor="topic-template">Topic Template</Label>
                  <Select 
                    value={selectedTopic}
                    onValueChange={handleTopicSelection}
                    disabled={isLoading || getCategoryTopics().length === 0}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select a topic template" />
                    </SelectTrigger>
                    <SelectContent>
                      {getCategoryTopics().map((topic) => (
                        <SelectItem key={topic.slug} value={topic.slug}>
                          {topic.title}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              )}
              
              {selectedTopic && (
                <>
                  <div>
                    <Label htmlFor="keywords-template">Keywords</Label>
                    <Input
                      id="keywords-template"
                      value={keywords}
                      onChange={(e) => setKeywords(e.target.value)}
                      placeholder="e.g., sustainable, eco-friendly, luxury, fashion"
                      disabled={isLoading}
                    />
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="type-template">Content Type</Label>
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
                      <Label htmlFor="tone-template">Tone</Label>
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
                </>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
      <CardFooter>
        <Button 
          onClick={handleGenerate}
          disabled={isLoading || !topic}
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
