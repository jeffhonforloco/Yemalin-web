
import React from 'react';
import { Separator } from '@/components/ui/separator';

interface BlogContentProps {
  excerpt?: string;
  content: string;
  category?: string; 
  publishDate?: string;
}

const BlogContent = ({ excerpt, content, category, publishDate }: BlogContentProps) => {
  // Generate a drop cap for the first paragraph if we have an excerpt
  const renderContent = () => {
    if (content.startsWith('<')) {
      return <div dangerouslySetInnerHTML={{ __html: content }} />;
    }
    
    // If we have raw text content, add some basic formatting
    if (excerpt) {
      return (
        <>
          {excerpt && <p className="text-lg font-medium mb-6">{excerpt}</p>}
          <Separator className="my-6" />
          <p className="mt-6">{content}</p>
        </>
      );
    }
    
    // If no excerpt, just show the content as is
    return <p>{content}</p>;
  };
  
  return (
    <article className="prose prose-lg max-w-none">
      {/* If we have category info, show it as metadata */}
      {(category || publishDate) && (
        <div className="flex items-center gap-4 text-sm text-gray-500 mb-6 not-prose">
          {category && (
            <span className="bg-gray-100 px-3 py-1 rounded">{category}</span>
          )}
          {publishDate && (
            <span>{publishDate}</span>
          )}
        </div>
      )}
      
      {renderContent()}
    </article>
  );
};

export default BlogContent;
