
import { ReactNode } from 'react';
import { Button } from '@/components/ui/button';
import { LeadMagnet } from '@/components/marketing/LeadMagnet';
import YemalinLogo from '@/components/YemalinLogo';
import { Link } from 'react-router-dom';
import { ArrowRight, X } from 'lucide-react';

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
}: LandingPageLayoutProps) => {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Minimal Header */}
      <header className="py-4 px-6 flex justify-between items-center bg-white border-b border-gray-100">
        {showLogo && (
          <Link to="/">
            <YemalinLogo className="h-8" />
          </Link>
        )}
        
        {showClose && (
          <Link to="/">
            <Button variant="ghost" size="sm">
              <X size={20} />
            </Button>
          </Link>
        )}
      </header>
      
      {/* Hero Section with Background */}
      <div 
        className="py-16 md:py-24 px-6 flex-grow flex flex-col items-center justify-center text-center relative"
        style={backgroundImage ? {
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.7)), url(${backgroundImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          color: 'white'
        } : {}}
      >
        <div className="max-w-3xl mx-auto z-10">
          <h1 className="text-4xl md:text-5xl font-display mb-6">
            {title}
          </h1>
          
          {subtitle && (
            <p className="text-xl md:text-2xl mb-8 max-w-2xl mx-auto">
              {subtitle}
            </p>
          )}
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button 
              size="lg" 
              className="bg-yemalin-accent hover:bg-yemalin-accent/90 text-white"
              asChild
            >
              <a href={ctaLink}>{ctaText} <ArrowRight size={16} className="ml-2" /></a>
            </Button>
            
            {secondaryCtaText && (
              <Button 
                variant="outline" 
                size="lg"
                className={`border-2 ${backgroundImage ? 'border-white text-white hover:bg-white/10' : 'border-yemalin-grey-800 hover:bg-yemalin-grey-100'}`}
                asChild
              >
                <Link to={secondaryCtaLink}>{secondaryCtaText}</Link>
              </Button>
            )}
          </div>
        </div>
      </div>
      
      {/* Main Content */}
      <main className="py-12 px-4">
        <div className="max-w-6xl mx-auto">
          {children}
        </div>
      </main>
      
      {/* Simplified Footer */}
      <footer className="py-6 px-4 bg-yemalin-grey-900 text-white">
        <div className="max-w-6xl mx-auto text-center">
          <p className="text-sm">© {new Date().getFullYear()} Yemalin. All rights reserved.</p>
          <div className="mt-2 flex justify-center gap-4">
            <Link to="/privacy" className="text-xs text-gray-400 hover:text-white">Privacy Policy</Link>
            <Link to="/terms" className="text-xs text-gray-400 hover:text-white">Terms of Service</Link>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPageLayout;
