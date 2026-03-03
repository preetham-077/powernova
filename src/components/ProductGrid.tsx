import { useState, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import { products } from "@/data/products";
import ProductCard from "./ProductCard";
import { motion } from "framer-motion";
import { Tag, ChevronDown, ArrowUpDown } from "lucide-react";

const ITEMS_PER_PAGE = 20;

type SortOption = "default" | "price-asc" | "price-desc" | "rating" | "discount";

const ProductGrid = () => {
  const [visibleCount, setVisibleCount] = useState(ITEMS_PER_PAGE);
  const [sortBy, setSortBy] = useState<SortOption>("default");
  const [searchParams] = useSearchParams();
  const categoryFilter = searchParams.get("category");

  const filteredProducts = useMemo(() => {
    let filtered = categoryFilter
      ? products.filter((p) => p.category === categoryFilter)
      : products;

    switch (sortBy) {
      case "price-asc":
        return [...filtered].sort((a, b) => a.price - b.price);
      case "price-desc":
        return [...filtered].sort((a, b) => b.price - a.price);
      case "rating":
        return [...filtered].sort((a, b) => b.rating - a.rating);
      case "discount":
        return [...filtered].sort((a, b) => {
          const dA = a.originalPrice ? ((a.originalPrice - a.price) / a.originalPrice) * 100 : 0;
          const dB = b.originalPrice ? ((b.originalPrice - b.price) / b.originalPrice) * 100 : 0;
          return dB - dA;
        });
      default:
        return filtered;
    }
  }, [categoryFilter, sortBy]);

  // Products with big discounts for deals section
  const dealProducts = products.filter((p) => {
    if (!p.originalPrice) return false;
    const discount = Math.round(((p.originalPrice - p.price) / p.originalPrice) * 100);
    return discount >= 25;
  }).slice(0, 6);

  const visibleProducts = filteredProducts.slice(0, visibleCount);

  return (
    <>
      {/* Deals Section */}
      {!categoryFilter && (
        <section id="deals" className="py-10">
          <div className="container mx-auto px-4">
            <div className="flex items-center gap-2 mb-6">
              <Tag className="h-6 w-6 text-primary" />
              <h2 className="text-2xl font-heading font-bold text-foreground">🔥 Today's Hot Deals</h2>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {dealProducts.map((product, i) => (
                <ProductCard key={`deal-${product.id}`} product={product} index={i} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* All Products */}
      <section id="products" className="py-10">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-8 flex-wrap gap-4">
            <h2 className="text-2xl font-heading font-bold text-foreground">
              {categoryFilter
                ? `${categoryFilter.charAt(0).toUpperCase() + categoryFilter.slice(1)} (${filteredProducts.length})`
                : `All Electronics (${filteredProducts.length} products)`}
            </h2>

            {/* Sort dropdown */}
            <div className="flex items-center gap-2">
              <ArrowUpDown className="h-4 w-4 text-muted-foreground" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as SortOption)}
                className="bg-card border border-border rounded-lg px-3 py-2 text-sm text-card-foreground font-medium outline-none focus:ring-2 focus:ring-primary/30 cursor-pointer"
              >
                <option value="default">Sort: Default</option>
                <option value="price-asc">Price: Low → High</option>
                <option value="price-desc">Price: High → Low</option>
                <option value="rating">Top Rated</option>
                <option value="discount">Biggest Discount</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-5">
            {visibleProducts.map((product, i) => (
              <ProductCard key={product.id} product={product} index={i} />
            ))}
          </div>

          {visibleCount < filteredProducts.length && (
            <div className="text-center mt-8">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setVisibleCount((prev) => Math.min(prev + ITEMS_PER_PAGE, filteredProducts.length))}
                className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-8 py-3 rounded-lg font-heading font-semibold hover:opacity-90 transition-opacity"
              >
                <ChevronDown className="h-5 w-5" />
                Load More ({filteredProducts.length - visibleCount} remaining)
              </motion.button>
            </div>
          )}
        </div>
      </section>
    </>
  );
};

export default ProductGrid;
