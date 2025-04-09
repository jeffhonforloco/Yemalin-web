
import { LeadMagnet } from '@/components/marketing/LeadMagnet';

const BlogNewsletter = () => {
  return (
    <div className="mt-16 p-12 bg-yemalin-grey-100">
      <LeadMagnet
        type="inline"
        offer="newsletter"
        title="Subscribe to Our Journal"
        description="Stay updated with our latest articles, designer interviews, style guides, and exclusive content."
        source="Blog Page Footer"
        className="bg-transparent max-w-xl mx-auto"
      />
    </div>
  );
};

export default BlogNewsletter;
