
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import MainLayout from '@/components/layouts/MainLayout';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { sendSupportEmail } from '@/utils/contactHelpers';
import { Mail, Phone, MapPin } from 'lucide-react';

// Define form schema
const formSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  subject: z.string().min(5, {
    message: "Subject must be at least 5 characters.",
  }),
  message: z.string().min(10, {
    message: "Message must be at least 10 characters.",
  }),
});

type FormValues = z.infer<typeof formSchema>;

const ContactUs = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      subject: "",
      message: "",
    },
  });

  const onSubmit = async (data: FormValues) => {
    setIsSubmitting(true);
    try {
      await sendSupportEmail(
        data.subject,
        data.message,
        data.name,
        data.email
      );
      form.reset();
      toast.success("Your message has been sent successfully!");
    } catch (error) {
      console.error("Error sending contact form:", error);
      toast.error("Failed to send your message. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <MainLayout>
      <div className="luxury-container py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-medium mb-4">Contact Us</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            We're here to help and answer any questions you might have. We look forward to hearing from you.
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
          {/* Contact Information Cards */}
          <Card className="shadow-sm hover:shadow-md transition-shadow">
            <CardHeader className="flex flex-col items-center">
              <div className="bg-primary/10 p-3 rounded-full mb-4">
                <Mail className="h-6 w-6 text-primary" />
              </div>
              <CardTitle>Email Us</CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <p className="text-gray-600">For any inquiries, please email us at:</p>
              <p className="font-medium mt-2">
                <a href="mailto:Admin@yemalin.com" className="text-primary hover:underline">
                  Admin@yemalin.com
                </a>
              </p>
              <p className="text-sm text-gray-500 mt-4">We aim to respond to all emails within 24 hours.</p>
            </CardContent>
          </Card>
          
          <Card className="shadow-sm hover:shadow-md transition-shadow">
            <CardHeader className="flex flex-col items-center">
              <div className="bg-primary/10 p-3 rounded-full mb-4">
                <Phone className="h-6 w-6 text-primary" />
              </div>
              <CardTitle>Call Us</CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <p className="text-gray-600">For immediate assistance:</p>
              <p className="font-medium mt-2">+1 (555) 123-4567</p>
              <p className="text-sm text-gray-500 mt-4">Monday to Friday, 9am to 6pm EST</p>
            </CardContent>
          </Card>
          
          <Card className="shadow-sm hover:shadow-md transition-shadow">
            <CardHeader className="flex flex-col items-center">
              <div className="bg-primary/10 p-3 rounded-full mb-4">
                <MapPin className="h-6 w-6 text-primary" />
              </div>
              <CardTitle>Visit Us</CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <p className="text-gray-600">Our headquarters:</p>
              <p className="font-medium mt-2">123 Fashion Avenue, Suite 500</p>
              <p className="font-medium">New York, NY 10001</p>
              <p className="text-sm text-gray-500 mt-4">By appointment only</p>
            </CardContent>
          </Card>
        </div>
        
        {/* Contact Form */}
        <div className="max-w-2xl mx-auto">
          <Card className="shadow-md">
            <CardHeader>
              <CardTitle>Send Us a Message</CardTitle>
              <CardDescription>
                Fill out the form below and we'll get back to you as soon as possible.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Name</FormLabel>
                          <FormControl>
                            <Input placeholder="Your name" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email</FormLabel>
                          <FormControl>
                            <Input placeholder="Your email address" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  
                  <FormField
                    control={form.control}
                    name="subject"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Subject</FormLabel>
                        <FormControl>
                          <Input placeholder="What is this regarding?" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="message"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Message</FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder="Please provide details about your inquiry..." 
                            className="min-h-[150px]" 
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <Button type="submit" className="w-full" disabled={isSubmitting}>
                    {isSubmitting ? "Sending..." : "Send Message"}
                  </Button>
                </form>
              </Form>
            </CardContent>
          </Card>
        </div>
      </div>
    </MainLayout>
  );
};

export default ContactUs;
