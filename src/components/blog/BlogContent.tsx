import React from 'react';
import { Separator } from '@/components/ui/separator';
import { LeadMagnet } from '@/components/marketing/LeadMagnet';

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
      // If we have HTML content, embed lead magnet between paragraphs
      const paragraphs = content.split('</p>');
      
      // Add lead magnet after 3rd paragraph or at the end if less than 3 paragraphs
      if (paragraphs.length > 3) {
        const insertPosition = 3;
        return (
          <>
            <div dangerouslySetInnerHTML={{ __html: paragraphs.slice(0, insertPosition).join('</p>') + '</p>' }} />
            
            <LeadMagnet 
              type="inline" 
              offer="style-guide"
              source="Blog Content"
            />
            
            <div dangerouslySetInnerHTML={{ __html: paragraphs.slice(insertPosition).join('</p>') }} />
          </>
        );
      }
      
      return (
        <>
          <div dangerouslySetInnerHTML={{ __html: content }} />
          <LeadMagnet 
            type="inline" 
            offer="trend-report"
            source="Blog Content End"
            className="mt-12"
          />
        </>
      );
    }
    
    // If we have raw text content, add some basic formatting
    if (excerpt) {
      return (
        <>
          {excerpt && <p className="text-lg font-medium mb-6">{excerpt}</p>}
          <Separator className="my-6" />
          <p className="mt-6">{content}</p>
          
          <LeadMagnet 
            type="inline" 
            offer="newsletter"
            source="Blog Content - Text Format"
            className="my-12"
          />
        </>
      );
    }
    
    // If no excerpt, just show the content as is
    return (
      <>
        <p>{content}</p>
        <LeadMagnet 
          type="inline" 
          offer="trend-report"
          source="Blog Content Simple"
          className="mt-12"
        />
      </>
    );
  };
  
  return (
    <article className="prose prose-lg max-w-none">
      {category && (
        <div className="flex items-center gap-4 text-sm text-gray-500 mb-6 not-prose">
          <span className="bg-gray-100 px-3 py-1 rounded">{category}</span>
        </div>
      )}
      
      {renderContent()}
    </article>
  );
};

export default BlogContent;
