
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useToast } from '@/hooks/use-toast';
import MainLayout from '@/components/layouts/MainLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { ArrowLeft, CheckCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

// Define form schema
const designerApplicationSchema = z.object({
  brandName: z.string().min(2, 'Brand name must be at least 2 characters'),
  designerName: z.string().min(2, 'Designer name must be at least 2 characters'),
  location: z.string().min(2, 'Location must be at least 2 characters'),
  established: z.string().min(4, 'Please provide a valid year'),
  email: z.string().email('Please provide a valid email'),
  website: z.string().url('Please provide a valid website URL'),
  bio: z.string().min(50, 'Bio must be at least 50 characters'),
  designPhilosophy: z.string().min(50, 'Design philosophy must be at least 50 characters'),
  socialMedia: z.string().optional(),
  portfolio: z.string().url('Please provide a valid portfolio URL'),
});

type DesignerApplicationValues = z.infer<typeof designerApplicationSchema>;

export default function DesignerApplication() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const form = useForm<DesignerApplicationValues>({
    resolver: zodResolver(designerApplicationSchema),
    defaultValues: {
      brandName: '',
      designerName: '',
      location: '',
      established: '',
      email: user?.email || '',
      website: '',
      bio: '',
      designPhilosophy: '',
      socialMedia: '',
      portfolio: '',
    },
  });

  async function onSubmit(data: DesignerApplicationValues) {
    setIsSubmitting(true);
    
    try {
      // Insert application into Supabase
      const { error } = await supabase
        .from('designer_applications')
        .insert([
          {
            user_id: user?.id,
            ...data,
            status: 'pending',
          },
        ]);

      if (error) throw error;
      
      setIsSubmitted(true);
      toast({
        title: "Application Submitted",
        description: "Your application has been received. We'll review it and get back to you soon.",
      });
    } catch (error) {
      console.error('Error submitting application:', error);
      toast({
        title: "Submission Failed",
        description: "There was a problem submitting your application. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  if (isSubmitted) {
    return (
      <MainLayout>
        <div className="luxury-container py-16">
          <div className="max-w-2xl mx-auto text-center bg-yemalin-grey-100 p-10">
            <CheckCircle className="mx-auto h-16 w-16 text-green-600 mb-6" />
            <h1 className="text-3xl font-display mb-4">Application Received</h1>
            <p className="mb-6 text-gray-600">
              Thank you for your interest in becoming a Yemalin designer. Our team will review your application and get back to you within 5-7 business days.
            </p>
            <Link to="/designers">
              <Button className="bg-black text-white hover:bg-gray-800">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Return to Designers
              </Button>
            </Link>
          </div>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="bg-yemalin-grey-100 py-16">
        <div className="luxury-container text-center">
          <h1 className="text-3xl md:text-4xl font-display mb-4">Apply to Sell with Us</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            We're always looking for talented designers to join our curated marketplace.
            Please complete the form below to apply.
          </p>
        </div>
      </div>

      <div className="luxury-container py-16">
        <div className="max-w-3xl mx-auto">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="brandName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Brand Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Your brand name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="designerName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Designer Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Your full name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="location"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Location</FormLabel>
                      <FormControl>
                        <Input placeholder="City, Country" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="established"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Year Established</FormLabel>
                      <FormControl>
                        <Input placeholder="YYYY" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Contact Email</FormLabel>
                      <FormControl>
                        <Input placeholder="email@example.com" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="website"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Website</FormLabel>
                      <FormControl>
                        <Input placeholder="https://yourwebsite.com" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="bio"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Designer/Brand Bio</FormLabel>
                    <FormControl>
                      <Textarea 
                        placeholder="Tell us about yourself and your brand (minimum 50 characters)"
                        rows={5}
                        {...field} 
                      />
                    </FormControl>
                    <FormDescription>
                      Share your background, education, and career highlights.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="designPhilosophy"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Design Philosophy</FormLabel>
                    <FormControl>
                      <Textarea 
                        placeholder="Describe your approach to design and what inspires your work (minimum 50 characters)"
                        rows={5}
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="socialMedia"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Social Media Links</FormLabel>
                    <FormControl>
                      <Textarea 
                        placeholder="Instagram, Pinterest, etc. (one link per line)"
                        rows={3}
                        {...field} 
                      />
                    </FormControl>
                    <FormDescription>
                      Optional: Share your social media handles where we can see your work.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="portfolio"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Portfolio Link</FormLabel>
                    <FormControl>
                      <Input placeholder="https://yourportfolio.com" {...field} />
                    </FormControl>
                    <FormDescription>
                      Link to your portfolio, lookbook, or collection images.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="flex justify-between">
                <Link to="/designers">
                  <Button type="button" variant="outline">
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Back
                  </Button>
                </Link>
                <Button 
                  type="submit" 
                  className="bg-black text-white hover:bg-gray-800"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Submitting...' : 'Submit Application'}
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </div>
    </MainLayout>
  );
}
