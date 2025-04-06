import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/hooks/use-toast';
import YemalinLogo from '@/components/YemalinLogo';

const DesignerApplication = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  
  const [formData, setFormData] = useState({
    designerName: '',
    brandName: '',
    email: '',
    location: '',
    established: '',
    website: '',
    bio: '',
    designPhilosophy: '',
    socialMedia: '',
    portfolio: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (!user) {
      toast({
        variant: "destructive",
        title: "Authentication required",
        description: "Please sign in before submitting your application"
      });
      navigate('/designers/login');
      return;
    }
    
    setLoading(true);
    
    try {
      const applicationData = {
        user_id: user.id,
        email: user.email,
        designer_name: formData.designerName,
        brand_name: formData.brandName,
        location: formData.location,
        established: formData.established,
        website: formData.website,
        bio: formData.bio,
        design_philosophy: formData.designPhilosophy,
        social_media: formData.socialMedia,
        portfolio: formData.portfolio,
        status: 'pending'
      };
      
      const { error } = await supabase
        .from('designer_applications')
        .insert(applicationData);
      
      if (error) throw error;
      
      toast({
        title: "Application submitted",
        description: "Thank you! We'll review your application and get back to you soon."
      });
      
      navigate('/dashboard');
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Submission failed",
        description: error.message || "Please try again later"
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6">
      <div className="w-full max-w-3xl mx-auto">
        <div className="mb-8 text-center">
          <YemalinLogo className="h-12 w-auto mx-auto mb-6" />
          <h1 className="text-2xl font-display">Designer Application</h1>
          <p className="text-gray-600 mt-2">
            Join the Yemalin community of independent designers
          </p>
        </div>
        
        <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6 md:p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-4">
              <div>
                <Label htmlFor="designerName">Designer / Principal Name</Label>
                <Input
                  id="designerName"
                  name="designerName"
                  value={formData.designerName}
                  onChange={handleChange}
                  required
                />
              </div>
              
              <div>
                <Label htmlFor="brandName">Brand Name</Label>
                <Input
                  id="brandName"
                  name="brandName"
                  value={formData.brandName}
                  onChange={handleChange}
                  required
                />
              </div>
              
              <div>
                <Label htmlFor="email">Contact Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder={user?.email || ''}
                />
                <p className="text-xs text-gray-500 mt-1">
                  Leave blank to use your account email
                </p>
              </div>
              
              <div>
                <Label htmlFor="location">Location</Label>
                <Input
                  id="location"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  placeholder="City, Country"
                  required
                />
              </div>
              
              <div>
                <Label htmlFor="established">Year Established</Label>
                <Input
                  id="established"
                  name="established"
                  value={formData.established}
                  onChange={handleChange}
                  placeholder="e.g., 2018"
                  required
                />
              </div>
              
              <div>
                <Label htmlFor="website">Website</Label>
                <Input
                  id="website"
                  name="website"
                  value={formData.website}
                  onChange={handleChange}
                  placeholder="https://"
                />
              </div>
              
              <div>
                <Label htmlFor="bio">Brand Biography</Label>
                <Textarea
                  id="bio"
                  name="bio"
                  value={formData.bio}
                  onChange={handleChange}
                  placeholder="Tell us about your brand (500 characters max)"
                  className="h-24"
                  maxLength={500}
                  required
                />
              </div>
              
              <div>
                <Label htmlFor="designPhilosophy">Design Philosophy</Label>
                <Textarea
                  id="designPhilosophy"
                  name="designPhilosophy"
                  value={formData.designPhilosophy}
                  onChange={handleChange}
                  placeholder="What values guide your design process? (300 characters max)"
                  className="h-24"
                  maxLength={300}
                  required
                />
              </div>
              
              <div>
                <Label htmlFor="socialMedia">Social Media Handles</Label>
                <Textarea
                  id="socialMedia"
                  name="socialMedia"
                  value={formData.socialMedia}
                  onChange={handleChange}
                  placeholder="Instagram: @your_handle&#10;Pinterest: @your_handle&#10;TikTok: @your_handle"
                  className="h-24"
                />
              </div>
              
              <div>
                <Label htmlFor="portfolio">Portfolio Links</Label>
                <Textarea
                  id="portfolio"
                  name="portfolio"
                  value={formData.portfolio}
                  onChange={handleChange}
                  placeholder="Please provide links to your portfolio, lookbooks, or press features"
                  className="h-24"
                  required
                />
              </div>
            </div>
            
            <div className="pt-4">
              <Button 
                type="submit" 
                className="w-full bg-black text-white hover:bg-black/80"
                disabled={loading}
              >
                {loading ? 'Submitting...' : 'Submit Application'}
              </Button>
            </div>
            
            <p className="text-xs text-gray-500 text-center mt-4">
              Applications are reviewed within 5-7 business days. We'll contact you by email with our decision.
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default DesignerApplication;
