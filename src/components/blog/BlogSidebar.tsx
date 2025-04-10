
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import SocialShareButtons from "../social/SocialShareButtons";
import { Link } from "react-router-dom";

interface BlogSidebarProps {
  author?: string;
  authorImage?: string;
  category?: string;
  postTitle?: string;
  postUrl?: string;
  postId?: string;
}

const BlogSidebar = ({ 
  category, 
  postTitle, 
  postUrl,
  postId = "unknown"
}: BlogSidebarProps) => {
  const [relatedCategories, setRelatedCategories] = useState<string[]>([]);
  
  // Get related categories based on current category
  useEffect(() => {
    // Default categories if none are found
    const defaultCategories = ["Fashion", "Style Guide", "Sustainability"];
    
    // If we have a category, include it and add some related ones
    if (category) {
      const allCategories = [
        "Sustainability", 
        "Designer Spotlight", 
        "Fashion History", 
        "Style Guide", 
        "Craftsmanship",
        "Fashion"
      ];
      
      // Filter out the current category
      const otherCategories = allCategories.filter(cat => cat !== category);
      
      // Get 2-3 random related categories
      const randomRelated = [...otherCategories]
        .sort(() => 0.5 - Math.random())
        .slice(0, Math.floor(Math.random() * 2) + 2);
      
      // Add current category first, then the random related ones
      setRelatedCategories([category, ...randomRelated]);
    } else {
      setRelatedCategories(defaultCategories);
    }
  }, [category]);

  return (
    <div className="sticky top-24">
      <div className="mb-8">
        <h3 className="font-display text-xl mb-4">Related Categories</h3>
        <div className="flex flex-wrap gap-2">
          {relatedCategories.map((relatedCategory, index) => (
            <Link 
              key={index} 
              to={`/blog/category/${encodeURIComponent(relatedCategory)}`}
              className="bg-yemalin-grey-100 px-3 py-1 text-xs font-medium hover:bg-gray-200 transition-colors"
            >
              {relatedCategory}
            </Link>
          ))}
        </div>
      </div>
      
      {/* Ad placeholder */}
      <div className="border-2 border-dashed border-gray-300 bg-gray-50 p-6 text-center mb-8">
        <p className="text-gray-500 font-medium">ADSENSE AD PLACEMENT</p>
        <p className="text-xs text-gray-400">300x250 ad will appear here</p>
      </div>
      
      <div>
        <h3 className="font-display text-xl mb-4">Share This Article</h3>
        <SocialShareButtons
          contentType="blog"
          contentId={postId}
          url={postUrl}
          title={postTitle}
          className="flex-wrap"
        />
      </div>
    </div>
  );
};

export default BlogSidebar;
