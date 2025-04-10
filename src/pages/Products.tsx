
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
  }, [currentPage, setSearchParams]);
  
  // Handle page change
  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Create SEO metadata based on current category
  const currentCategory = categories?.find(cat => cat.id === categoryId)?.name || '';
  const title = currentCategory 
    ? `${currentCategory} - Yemalin Products` 
    : 'Shop All Products - Yemalin';
  const description = currentCategory
    ? `Explore our collection of ${currentCategory.toLowerCase()} products. Luxury fashion pieces curated for the discerning buyer.`
    : 'Browse Yemalin\'s curated collection of luxury fashion products from emerging designers. Sustainable, ethical, and unique pieces.';

  // Convert keywords string to array for SEOMeta
  const keywordsArray = `${currentCategory}, luxury fashion, sustainable fashion, designer brands, yemalin`.split(', ');

  return (
    <MainLayout>
      <SEOMeta 
        title={title}
        description={description}
        keywords={keywordsArray}
        structuredData={{
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          "name": title,
          "description": description,
          "url": window.location.href
        }}
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
                  >
                    {category.name}
                  </Button>
                ))}
              </>
            )}
          </div>
          
          <Button variant="outline" size="sm" className="flex items-center gap-2">
            <Filter size={14} /> Filter <ChevronDown size={14} />
          </Button>
        </div>
        
        <Separator className="mb-8" />
        
        {/* Product display */}
        {loading ? (
          <div className="py-20 text-center">
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
        
        {/* Pagination */}
        {pagination && pagination.totalPages > 1 && (
          <div className="mt-16">
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
                        >
                          {pageNumber}
                        </PaginationLink>
                      </PaginationItem>
                    );
                  } else if (
                    pageNumber === currentPage - 3 || 
                    pageNumber === currentPage + 3
                  ) {
                    return <PaginationEllipsis key={pageNumber} />;
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
                    />
                  </PaginationItem>
                )}
              </PaginationContent>
            </Pagination>
          </div>
        )}
      </div>
    </MainLayout>
  );
};

export default Products;
