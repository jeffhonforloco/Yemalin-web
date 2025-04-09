
import { ReactNode } from 'react';
import { Button } from '@/components/ui/button';
import { LeadMagnet } from '@/components/marketing/LeadMagnet';
import YemalinLogo from '@/components/YemalinLogo';
import { Link } from 'react-router-dom';
import { ArrowRight, X } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';
import SEO from '@/components/SEO';
import useAnalytics from '@/hooks/useAnalytics';

interface LandingPageLayoutProps {
  children: ReactNode;
  title: string;
  subtitle?: string;
  ctaText?: string;
  ctaLink?: string;
  secondaryCtaText?: string;
  secondaryCtaLink?: string;
  backgroundImage?: string;
  showLogo?: boolean;
  showClose?: boolean;
  seoDescription?: string;
  seoKeywords?: string;
  seoImage?: string;
}

const LandingPageLayout = ({
  children,
  title,
  subtitle,
  ctaText = "Get Started",
  ctaLink = "#lead-form",
  secondaryCtaText,
  secondaryCtaLink = "/",
  backgroundImage,
  showLogo = true,
  showClose = true,
  seoDescription,
  seoKeywords,
  seoImage,
}: LandingPageLayoutProps) => {
  const isMobile = useIsMobile();
  const { trackEvent } = useAnalytics();
  
  // Handle CTA clicks for analytics tracking
  const handleCtaClick = () => {
    trackEvent('landing_page_cta_click', { 
      cta_text: ctaText,
      page_title: title
    });
  };
  
  const handleSecondaryCtaClick = () => {
    trackEvent('landing_page_secondary_cta_click', { 
      cta_text: secondaryCtaText,
      page_title: title
    });
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      {/* SEO Configuration */}
      <SEO 
        title={title}
        description={seoDescription || subtitle || `Explore ${title} - Yemalin Luxury Fashion`}
        ogImage={seoImage || backgroundImage}
        keywords={seoKeywords}
        ogType="website"
      />
      
      {/* Responsive Header */}
      <header className="py-3 md:py-4 px-4 md:px-6 flex justify-between items-center bg-white border-b border-gray-100">
        {showLogo && (
          <Link to="/">
            <YemalinLogo className="h-6 md:h-8" />
          </Link>
        )}
        
        {showClose && (
          <Link to="/">
            <Button variant="ghost" size={isMobile ? "icon" : "sm"}>
              <X size={isMobile ? 18 : 20} />
            </Button>
          </Link>
        )}
      </header>
      
      {/* Responsive Hero Section with Background */}
      <div 
        className="py-12 md:py-16 lg:py-24 px-4 md:px-6 flex-grow flex flex-col items-center justify-center text-center relative"
        style={backgroundImage ? {
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.7)), url(${backgroundImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          color: 'white'
        } : {}}
      >
        <div className="max-w-3xl mx-auto z-10 px-2">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-display mb-4 md:mb-6">
            {title}
          </h1>
          
          {subtitle && (
            <p className="text-lg md:text-xl lg:text-2xl mb-6 md:mb-8 max-w-2xl mx-auto">
              {subtitle}
            </p>
          )}
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 md:gap-4">
            <Button 
              size={isMobile ? "default" : "lg"} 
              className="bg-yemalin-accent hover:bg-yemalin-accent/90 text-white w-full sm:w-auto"
              asChild
              onClick={handleCtaClick}
              data-track="primary_cta"
            >
              <a href={ctaLink}>{ctaText} <ArrowRight size={16} className="ml-2" /></a>
            </Button>
            
            {secondaryCtaText && (
              <Button 
                variant="outline" 
                size={isMobile ? "default" : "lg"}
                className={`border-2 mt-3 sm:mt-0 w-full sm:w-auto ${backgroundImage ? 'border-white text-white hover:bg-white/10' : 'border-yemalin-grey-800 hover:bg-yemalin-grey-100'}`}
                asChild
                onClick={handleSecondaryCtaClick}
                data-track="secondary_cta"
              >
                <Link to={secondaryCtaLink}>{secondaryCtaText}</Link>
              </Button>
            )}
          </div>
        </div>
      </div>
      
      {/* Responsive Main Content */}
      <main className="py-8 md:py-12 px-4">
        <div className="max-w-6xl mx-auto">
          {children}
        </div>
      </main>
      
      {/* Responsive Footer */}
      <footer className="py-4 md:py-6 px-4 bg-yemalin-grey-900 text-white">
        <div className="max-w-6xl mx-auto text-center">
          <p className="text-xs md:text-sm">© {new Date().getFullYear()} Yemalin. All rights reserved.</p>
          <div className="mt-2 flex justify-center gap-3 md:gap-4">
            <Link to="/privacy" className="text-xs text-gray-400 hover:text-white">Privacy Policy</Link>
            <Link to="/terms" className="text-xs text-gray-400 hover:text-white">Terms of Service</Link>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPageLayout;
