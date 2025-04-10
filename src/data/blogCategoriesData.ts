
export interface BlogTopic {
  title: string;
  slug: string;
}

export interface BlogCategory {
  name: string;
  slug: string;
  topics: BlogTopic[];
}

export const blogCategories: BlogCategory[] = [
  {
    name: "Luxury Trends",
    slug: "luxury-trends",
    topics: [
      {
        title: "Top 10 Luxury Fashion Trends to Watch in 2025",
        slug: "top-luxury-fashion-trends-2025"
      },
      {
        title: "The Future of Luxury: How Technology is Redefining High-End Fashion",
        slug: "future-of-luxury-technology-redefining-fashion"
      }
    ]
  },
  {
    name: "Designer Spotlights",
    slug: "designer-spotlights",
    topics: [
      {
        title: "Step Inside a Designer's World: A Journey Through Their Signature Styles",
        slug: "designer-world-signature-styles"
      },
      {
        title: "Emerging Luxury Labels: Spotlight on the New Faces of High Fashion",
        slug: "emerging-luxury-labels-new-faces"
      }
    ]
  },
  {
    name: "Styling Guides",
    slug: "styling-guides",
    topics: [
      {
        title: "How to Elevate Your Look: Styling Tips for a Luxury Wardrobe",
        slug: "elevate-your-look-luxury-wardrobe-tips"
      },
      {
        title: "Mixing High-End with Everyday: A Guide to Effortless Luxury Style",
        slug: "mixing-high-end-everyday-effortless-luxury"
      }
    ]
  },
  {
    name: "Shopping Tips",
    slug: "shopping-tips",
    topics: [
      {
        title: "The Ultimate Guide to Buying Authentic Luxury Fashion Online",
        slug: "guide-buying-authentic-luxury-fashion-online"
      },
      {
        title: "Insider Secrets: How to Score Designer Deals Without Compromising Quality",
        slug: "insider-secrets-designer-deals-quality"
      }
    ]
  },
  {
    name: "Curated Collections",
    slug: "curated-collections",
    topics: [
      {
        title: "Editor's Choice: Top Luxury Picks Curated by Our Trusted Sellers",
        slug: "editors-choice-luxury-trusted-sellers"
      },
      {
        title: "Seasonal Spotlight: Must-Have Designer Pieces for Spring 2025",
        slug: "seasonal-spotlight-designer-pieces-spring-2025"
      }
    ]
  }
];

// Export individual topics for easy access
export const allBlogTopics = blogCategories.flatMap(category => 
  category.topics.map(topic => ({
    ...topic,
    category: category.name,
    categorySlug: category.slug
  }))
);
