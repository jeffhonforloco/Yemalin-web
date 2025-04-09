
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { toast } from 'sonner';
import { 
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form';
import { subscribeToNewsletter } from '@/utils/subscriptionUtils';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

export type LeadMagnetType = 'inline' | 'popup' | 'sidebar';
export type LeadMagnetOffer = 'trend-report' | 'early-access' | 'style-guide' | 'newsletter';

interface LeadMagnetProps {
  type: LeadMagnetType;
  offer: LeadMagnetOffer;
  title?: string;
  description?: string;
  source?: string;
  className?: string;
  onSuccess?: () => void;
  onClose?: () => void;
}

// Define form schema
const formSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address" }),
  name: z.string().optional(),
});

type FormValues = z.infer<typeof formSchema>;

export function LeadMagnet({
  type = 'inline',
  offer = 'trend-report',
  title,
  description,
  source = 'Lead Magnet',
  className = '',
  onSuccess,
  onClose
}: LeadMagnetProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  // Set default content based on offer type
  const getDefaultTitle = () => {
    switch (offer) {
      case 'trend-report':
        return 'Get Our Exclusive Fashion Trends Report';
      case 'early-access':
        return 'Early Access to New Collections';
      case 'style-guide':
        return 'Download Our Seasonal Style Guide';
      case 'newsletter':
        return 'Join Our Style Insider List';
      default:
        return 'Get Exclusive Fashion Insights';
    }
  };

  const getDefaultDescription = () => {
    switch (offer) {
      case 'trend-report':
        return 'Stay ahead of the curve with our curated insights on upcoming fashion trends and designer innovations.';
      case 'early-access':
        return "Be the first to shop new arrivals and limited edition pieces before they're available to the public.";
      case 'style-guide':
        return 'Learn how to build a timeless wardrobe with our expert styling tips and seasonal recommendations.';
      case 'newsletter':
        return 'Get weekly updates on fashion trends, styling tips, and exclusive offers delivered to your inbox.';
      default:
        return 'Join our community of fashion enthusiasts for exclusive content and special offers.';
    }
  };

  const finalTitle = title || getDefaultTitle();
  const finalDescription = description || getDefaultDescription();

  // Define form with validation
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      name: '',
    },
  });

  const onSubmit = async (data: FormValues) => {
    setIsSubmitting(true);
    try {
      const success = await subscribeToNewsletter({
        email: data.email,
        source: `${source} - ${offer}`
      });

      if (success) {
        setIsSuccess(true);
        toast.success("Thank you for subscribing!");
        if (onSuccess) onSuccess();
      }
    } catch (error) {
      console.error('Submission error:', error);
      toast.error("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Styling based on type
  const getContainerStyles = () => {
    switch (type) {
      case 'popup':
        return 'bg-white p-8 shadow-xl max-w-md mx-auto rounded-sm';
      case 'sidebar':
        return 'bg-yemalin-cream p-6';
      case 'inline':
      default:
        return 'bg-yemalin-grey-100 p-8 my-8';
    }
  };

  // Download link based on offer type
  const getDownloadInfo = () => {
    switch (offer) {
      case 'trend-report':
        return {
          text: 'Download Trend Report',
          link: '#trends-report-2025'
        };
      case 'style-guide':
        return {
          text: 'Download Style Guide',
          link: '#seasonal-style-guide'
        };
      case 'early-access':
        return {
          text: 'Get Early Access',
          link: '#early-access'
        };
      default:
        return {
          text: 'Join Now',
          link: '#join'
        };
    }
  };

  const downloadInfo = getDownloadInfo();

  return (
    <div className={`${getContainerStyles()} ${className}`}>
      {type === 'popup' && onClose && (
        <button 
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-400 hover:text-black"
          aria-label="Close"
        >
          ✕
        </button>
      )}
      
      <h3 className="text-xl md:text-2xl font-display mb-2">{finalTitle}</h3>
      <p className="text-sm text-gray-600 mb-4">{finalDescription}</p>
      
      {isSuccess ? (
        <div className="text-center py-4">
          <p className="text-yemalin-accent font-medium mb-4">Thank you for subscribing!</p>
          {(offer === 'trend-report' || offer === 'style-guide') && (
            <Button className="w-full bg-yemalin-black hover:bg-yemalin-grey-800">
              <a href={downloadInfo.link} download>
                {downloadInfo.text}
              </a>
            </Button>
          )}
        </div>
      ) : (
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm">Email</FormLabel>
                  <FormControl>
                    <Input 
                      placeholder="Your email address" 
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <Button 
              type="submit" 
              className="w-full bg-yemalin-black hover:bg-yemalin-grey-800"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Submitting...' : 'Subscribe'}
            </Button>
            
            <p className="text-xs text-gray-500 text-center mt-2">
              By subscribing, you agree to our Privacy Policy and consent to receive updates.
            </p>
          </form>
        </Form>
      )}
    </div>
  );
}
