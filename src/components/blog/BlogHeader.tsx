
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface BlogHeaderProps {
  title: string;
  category?: string;
  readTime?: string;
  showBackButton?: boolean;
  backButtonText?: string;
  backTo?: string;
}

const BlogHeader = ({
  title,
  category,
  readTime,
  showBackButton = true,
  backButtonText = "Back to Journal",
  backTo = "/blog"
}: BlogHeaderProps) => {
  const navigate = useNavigate();

  return (
    <>
      {showBackButton && (
        <Button 
          variant="ghost" 
          className="mb-8 inline-flex items-center"
          onClick={() => navigate(backTo)}
        >
          <ArrowLeft size={16} className="mr-2" /> {backButtonText}
        </Button>
      )}
      
      <div className="mb-6">
        {category && (
          <span className="inline-block bg-yemalin-grey-100 px-3 py-1 text-xs font-medium mb-4">
            {category}
          </span>
        )}
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-display mb-6">{title}</h1>
        
        {readTime && (
          <div className="text-sm text-gray-600 mb-8">
            <span>{readTime} read</span>
          </div>
        )}
      </div>
    </>
  );
};

export default BlogHeader;
