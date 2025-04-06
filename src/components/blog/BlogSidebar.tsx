
import { Button } from "@/components/ui/button";

interface BlogSidebarProps {
  author?: string;
  authorImage?: string;
  category?: string;
}

const BlogSidebar = ({ author, authorImage, category }: BlogSidebarProps) => {
  return (
    <div className="sticky top-24">
      <div className="bg-yemalin-grey-100 p-6 mb-8">
        <div className="flex items-center mb-4">
          <img 
            src={authorImage}
            alt={author}
            className="w-16 h-16 rounded-full mr-4 object-cover"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.src = '/placeholder.svg';
            }}
          />
          <div>
            <h3 className="font-medium text-lg">{author}</h3>
            <p className="text-sm text-gray-600">Fashion Editor</p>
          </div>
        </div>
        <p className="text-sm">
          With over a decade of experience in luxury fashion journalism, {author} specializes in spotlighting emerging designers and sustainable practices in the industry.
        </p>
      </div>
      
      <div className="mb-8">
        <h3 className="font-display text-xl mb-4">Related Categories</h3>
        <div className="flex flex-wrap gap-2">
          <span className="bg-yemalin-grey-100 px-3 py-1 text-xs font-medium">
            {category}
          </span>
          <span className="bg-yemalin-grey-100 px-3 py-1 text-xs font-medium">
            Fashion
          </span>
        </div>
      </div>
      
      {/* Ad placeholder */}
      <div className="border-2 border-dashed border-gray-300 bg-gray-50 p-6 text-center mb-8">
        <p className="text-gray-500 font-medium">ADSENSE AD PLACEMENT</p>
        <p className="text-xs text-gray-400">300x250 ad will appear here</p>
      </div>
      
      <div>
        <h3 className="font-display text-xl mb-4">Share This Article</h3>
        <div className="flex gap-4">
          <Button variant="outline" size="icon">
            <span className="sr-only">Share on Twitter</span>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-twitter"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path></svg>
          </Button>
          <Button variant="outline" size="icon">
            <span className="sr-only">Share on Facebook</span>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-facebook"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
          </Button>
          <Button variant="outline" size="icon">
            <span className="sr-only">Share on LinkedIn</span>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-linkedin"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect width="4" height="12" x="2" y="9"></rect><circle cx="4" cy="4" r="2"></circle></svg>
          </Button>
          <Button variant="outline" size="icon">
            <span className="sr-only">Share via Email</span>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-mail"><rect width="20" height="16" x="2" y="4" rx="2"></rect><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path></svg>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default BlogSidebar;
