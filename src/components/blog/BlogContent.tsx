
import React from 'react';

interface BlogContentProps {
  excerpt?: string;
  content: string;
}

const BlogContent = ({ excerpt, content }: BlogContentProps) => {
  return (
    <div className="prose prose-lg max-w-none">
      {excerpt && <p className="text-lg font-medium mb-6">{excerpt}</p>}
      
      {content.startsWith('<') ? (
        <div dangerouslySetInnerHTML={{ __html: content }} />
      ) : (
        <p>{content}</p>
      )}
    </div>
  );
};

export default BlogContent;
