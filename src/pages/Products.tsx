
import React, { useState, useEffect } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import MainLayout from '@/components/layouts/MainLayout';
import ProductGrid from '@/components/products/ProductGrid';
import { useWordPressProducts, useWordPressCategories } from '@/hooks/useWordPress';
import SEOMeta from '@/components/SEO/SEOMeta';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { ChevronDown, Filter, MoreHorizontal } from 'lucide-react';
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

// Add the missing PaginationEllipsis component
const PaginationEllipsis = ({
  className,
  ...props
}: React.ComponentProps<"span">) => (
  <span
    aria-hidden
    className={`flex h-9 w-9 items-center justify-center ${className || ''}`}
    {...props}
  >
    <MoreHorizontal className="h-4 w-4" />
    <span className="sr-only">More pages</span>
  </span>
);

const Products = () => {
  const { categorySlug } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const [currentPage, setCurrentPage] = useState(parseInt(searchParams.get('page') || '1'));
  const [categoryId, setCategoryId] = useState<number | undefined>(undefined);
  const { categories } = useWordPressCategories();
  
  // Find category ID from slug
  useEffect(() => {
    if (categories && categories.length > 0 && categorySlug) {
      const category = categories.find(cat => cat.slug === categorySlug);
      if (category) {
        setCategoryId(category.id);
      } else {
        setCategoryId(undefined);
      }
    } else {
      setCategoryId(undefined);
    }
  }, [categories, categorySlug]);
  
  // Fetch products
  const { products, pagination, loading } = useWordPressProducts(currentPage, 12, categoryId);
  
  // Update URL when page changes
  useEffect(() => {
    searchParams.set('page', currentPage.toString());
    setSearchParams(searchParams);
  }, [currentPage, setSearchParams, searchParams]);
  
  // Handle page change with smooth scroll
  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Create SEO metadata based on current category
  const currentCategory = categories?.find(cat => cat.id === categoryId)?.name || '';
  const title = currentCategory 
    ? `${currentCategory} - Shop Premium Collection | Yemalin` 
    : 'Shop All Luxury Products - Yemalin';
  const description = currentCategory
    ? `Explore our exclusive collection of ${currentCategory.toLowerCase()} products. Luxury fashion pieces curated from sustainable sources for the discerning buyer.`
    : 'Browse Yemalin\'s curated collection of luxury fashion products from emerging designers. Sustainable, ethical, and unique pieces for conscious fashion enthusiasts.';

  // Structured data for product listing
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "name": title,
    "description": description,
    "url": window.location.href,
    "numberOfItems": products.length,
    "itemListElement": products.map((product, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "item": {
        "@type": "Product",
        "name": product.name,
        "description": product.description,
        "image": product.image,
        "url": `${window.location.origin}/shop/${product.slug}`,
        "offers": {
          "@type": "Offer",
          "price": product.price,
          "priceCurrency": "USD",
          "availability": product.inStock ? "https://schema.org/InStock" : "https://schema.org/OutOfStock"
        }
      }
    }))
  };

  // Convert keywords string to array for SEOMeta
  const keywordsArray = `${currentCategory}, luxury fashion, sustainable fashion, designer brands, ethical clothing, premium fashion, yemalin`.split(', ');

  return (
    <MainLayout>
      <SEOMeta 
        title={title}
        description={description}
        keywords={keywordsArray}
        structuredData={structuredData}
      />
      
      <div className="luxury-container py-16">
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-display mb-4">
            {currentCategory || 'All Products'}
          </h1>
          <p className="text-yemalin-grey-600 max-w-2xl mx-auto">
            {description}
          </p>
        </div>
        
        {/* Category selection and filters */}
        <div className="flex flex-wrap gap-4 justify-between items-center mb-8">
          <div className="flex gap-2 flex-wrap">
            {categories && categories.length > 0 && (
              <>
                {categories.slice(0, 5).map(category => (
                  <Button 
                    key={category.id}
                    variant={categoryId === category.id ? "default" : "outline"}
                    size="sm"
                    onClick={() => {
                      if (categoryId === category.id) {
                        setCategoryId(undefined);
                      } else {
                        setCategoryId(category.id);
                      }
                      setCurrentPage(1);
                    }}
                    aria-pressed={categoryId === category.id}
                  >
                    {category.name}
                  </Button>
                ))}
              </>
            )}
          </div>
          
          <Button 
            variant="outline" 
            size="sm" 
            className="flex items-center gap-2"
            aria-label="Open filter options"
          >
            <Filter size={14} /> Filter <ChevronDown size={14} />
          </Button>
        </div>
        
        <Separator className="mb-8" />
        
        {/* Product display with ARIA roles */}
        <section aria-label={`${currentCategory || 'All'} products`}>
          {loading ? (
            <div className="py-20 text-center" aria-live="polite">
              <p className="text-xl font-display animate-pulse">Loading products...</p>
            </div>
          ) : products.length === 0 ? (
            <div className="py-20 text-center">
              <p className="text-xl font-display mb-4">No products found</p>
              <p className="text-yemalin-grey-600 mb-8">
                We couldn't find any products in this category. Please try another category or check back later.
              </p>
              <Button onClick={() => setCategoryId(undefined)}>
                View All Products
              </Button>
            </div>
          ) : (
            <ProductGrid 
              products={products}
              columns={3}
              category={currentCategory}
              collectionName={title}
            />
          )}
        </section>
        
        {/* Improved Pagination with ARIA attributes */}
        {pagination && pagination.totalPages > 1 && (
          <nav className="mt-16" aria-label="Pagination">
            <Pagination>
              <PaginationContent>
                {currentPage > 1 && (
                  <PaginationItem>
                    <PaginationPrevious 
                      href="#" 
                      onClick={(e) => {
                        e.preventDefault();
                        handlePageChange(currentPage - 1);
                      }} 
                      aria-label="Go to previous page"
                    />
                  </PaginationItem>
                )}
                
                {[...Array(pagination.totalPages)].map((_, i) => {
                  const pageNumber = i + 1;
                  // Show limited page numbers with ellipsis for better UX
                  if (
                    pageNumber === 1 || 
                    pageNumber === pagination.totalPages || 
                    (pageNumber >= currentPage - 2 && pageNumber <= currentPage + 2)
                  ) {
                    return (
                      <PaginationItem key={pageNumber}>
                        <PaginationLink 
                          href="#" 
                          isActive={pageNumber === currentPage}
                          onClick={(e) => {
                            e.preventDefault();
                            handlePageChange(pageNumber);
                          }}
                          aria-label={`Page ${pageNumber}${pageNumber === currentPage ? ', current page' : ''}`}
                          aria-current={pageNumber === currentPage ? 'page' : undefined}
                        >
                          {pageNumber}
                        </PaginationLink>
                      </PaginationItem>
                    );
                  } else if (
                    pageNumber === currentPage - 3 || 
                    pageNumber === currentPage + 3
                  ) {
                    return <PaginationEllipsis key={pageNumber} aria-hidden="true" />;
                  } else {
                    return null;
                  }
                })}
                
                {currentPage < pagination.totalPages && (
                  <PaginationItem>
                    <PaginationNext 
                      href="#" 
                      onClick={(e) => {
                        e.preventDefault();
                        handlePageChange(currentPage + 1);
                      }} 
                      aria-label="Go to next page"
                    />
                  </PaginationItem>
                )}
              </PaginationContent>
            </Pagination>
          </nav>
        )}
      </div>
    </MainLayout>
  );
};

export default Products;
