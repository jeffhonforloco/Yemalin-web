
import { Button } from "@/components/ui/button";
import useAnalytics from "@/hooks/useAnalytics";
import { Facebook, Twitter, Linkedin, Instagram, Mail, Share2 } from 'lucide-react';

export interface SocialShareButtonsProps {
  url?: string;
  title?: string;
  description?: string;
  imageUrl?: string;
  contentType: string;
  contentId: string;
  showLabels?: boolean;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'default' | 'outline' | 'ghost';
  className?: string;
  platforms?: Array<'twitter' | 'facebook' | 'linkedin' | 'pinterest' | 'email'>;
}

const SocialShareButtons = ({
  url = window.location.href,
  title = document.title,
  description = '',
  imageUrl = '',
  contentType,
  contentId,
  showLabels = false,
  size = 'md',
  variant = 'outline',
  className = '',
  platforms = ['twitter', 'facebook', 'linkedin', 'email']
}: SocialShareButtonsProps) => {
  const { shareToSocialMedia, socialTrackingRef } = useAnalytics();

  const handleShare = (platform: 'twitter' | 'facebook' | 'linkedin' | 'pinterest' | 'email') => {
    shareToSocialMedia(platform, contentType, contentId, { url, title, description, imageUrl });
  };

  const getIcon = (platform: string) => {
    switch (platform) {
      case 'twitter':
        return <Twitter className={size === 'sm' ? 'h-4 w-4' : 'h-5 w-5'} />;
      case 'facebook':
        return <Facebook className={size === 'sm' ? 'h-4 w-4' : 'h-5 w-5'} />;
      case 'linkedin':
        return <Linkedin className={size === 'sm' ? 'h-4 w-4' : 'h-5 w-5'} />;
      case 'email':
        return <Mail className={size === 'sm' ? 'h-4 w-4' : 'h-5 w-5'} />;
      default:
        return <Share2 className={size === 'sm' ? 'h-4 w-4' : 'h-5 w-5'} />;
    }
  };

  const getLabel = (platform: string) => {
    switch (platform) {
      case 'twitter':
        return 'Twitter';
      case 'facebook':
        return 'Facebook';
      case 'linkedin':
        return 'LinkedIn';
      case 'email':
        return 'Email';
      default:
        return 'Share';
    }
  };

  const buttonSize = size === 'sm' ? 'sm' : size === 'lg' ? 'lg' : 'default';

  return (
    <div 
      className={`flex gap-2 ${className}`}
      ref={socialTrackingRef}
      data-content-type={contentType}
      data-content-id={contentId}
    >
      {platforms.map(platform => (
        <Button
          key={platform}
          variant={variant}
          size={showLabels ? buttonSize : "icon"}
          onClick={() => handleShare(platform)}
          data-social-platform={platform}
          data-share-url={url}
          data-track={`share_${platform}`}
        >
          {getIcon(platform)}
          {showLabels && <span className="ml-2">{getLabel(platform)}</span>}
          <span className="sr-only">Share on {getLabel(platform)}</span>
        </Button>
      ))}
    </div>
  );
};

export default SocialShareButtons;
