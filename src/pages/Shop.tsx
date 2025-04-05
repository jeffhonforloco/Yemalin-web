
import { useState } from 'react';
import MainLayout from '@/components/layouts/MainLayout';
import ProductGrid from '@/components/products/ProductGrid';
import { featuredProducts, newArrivals } from '@/data/mockProducts';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Check, ChevronDown } from 'lucide-react';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';
import { Separator } from '@/components/ui/separator';

const shopCategories = [
  "All", "Clothing", "Accessories", "Footwear", "Jewelry", "Beauty"
];

const designers = [
  "All Designers", "Elise Laurent", "Maison Noir", "Hiroshi Tanaka", "Sofia Vega", "Pierre Blanc"
];

const Shop = () => {
  const [category, setCategory] = useState("All");
  const [designer, setDesigner] = useState("All Designers");
  const [priceRange, setPriceRange] = useState([0, 1000]);
  const [sortBy, setSortBy] = useState("Newest");
  
  // Combine all products for the shop page
  const allProducts = [...newArrivals, ...featuredProducts];
  
  // Remove duplicates (in case some products appear in both arrays)
  const uniqueProducts = allProducts.filter((product, index, self) =>
    index === self.findIndex((p) => p.id === product.id)
  );

  return (
    <MainLayout>
      <div className="luxury-container py-8">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Filters Sidebar */}
          <div className="w-full md:w-64 flex-shrink-0">
            <h2 className="text-xl font-medium mb-6">Filters</h2>
            
            {/* Categories */}
            <div className="mb-8">
              <h3 className="text-sm font-medium mb-3">Categories</h3>
              <div className="space-y-2">
                {shopCategories.map(cat => (
                  <Button
                    key={cat}
                    variant={category === cat ? "default" : "ghost"}
                    className={`justify-start px-2 w-full ${category === cat ? 'bg-black text-white' : 'hover:bg-gray-100'}`}
                    onClick={() => setCategory(cat)}
                  >
                    {cat}
                    {category === cat && <Check size={16} className="ml-auto" />}
                  </Button>
                ))}
              </div>
            </div>
            
            <Separator className="my-6" />
            
            {/* Designers */}
            <div className="mb-8">
              <h3 className="text-sm font-medium mb-3">Designers</h3>
              <div className="space-y-2">
                {designers.map(d => (
                  <Button
                    key={d}
                    variant={designer === d ? "default" : "ghost"}
                    className={`justify-start px-2 w-full ${designer === d ? 'bg-black text-white' : 'hover:bg-gray-100'}`}
                    onClick={() => setDesigner(d)}
                  >
                    {d}
                    {designer === d && <Check size={16} className="ml-auto" />}
                  </Button>
                ))}
              </div>
            </div>
            
            <Separator className="my-6" />
            
            {/* Price Range */}
            <div className="mb-8">
              <h3 className="text-sm font-medium mb-3">Price Range</h3>
              <Slider
                defaultValue={priceRange}
                max={1000}
                step={50}
                onValueChange={setPriceRange}
                className="my-6"
              />
              <div className="flex justify-between text-sm">
                <span>${priceRange[0]}</span>
                <span>${priceRange[1]}</span>
              </div>
            </div>
            
            <Separator className="my-6" />
            
            {/* Reset Filters */}
            <Button 
              variant="outline" 
              className="w-full border-black hover:bg-black hover:text-white"
              onClick={() => {
                setCategory("All");
                setDesigner("All Designers");
                setPriceRange([0, 1000]);
              }}
            >
              Reset Filters
            </Button>
          </div>

          {/* Products Section */}
          <div className="flex-grow">
            {/* Header with sorting and results count */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
              <h1 className="text-2xl font-display mb-4 sm:mb-0">Shop All</h1>
              
              <div className="flex items-center gap-4">
                <span className="text-sm text-gray-600">{uniqueProducts.length} products</span>
                
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" className="text-sm">
                      Sort: {sortBy} <ChevronDown size={14} className="ml-2" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={() => setSortBy("Newest")}>
                      Newest
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setSortBy("Price: Low to High")}>
                      Price: Low to High
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setSortBy("Price: High to Low")}>
                      Price: High to Low
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setSortBy("Bestsellers")}>
                      Bestsellers
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
            
            {/* Product Grid */}
            <ProductGrid 
              products={uniqueProducts}
              columns={3}
              title=""
            />
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default Shop;
