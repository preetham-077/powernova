import { useState } from "react";
import { products } from "@/data/products";
import ProductCard from "./ProductCard";
import { motion } from "framer-motion";
import { Tag, ChevronDown } from "lucide-react";

const ITEMS_PER_PAGE = 20;

const ProductGrid = () => {
  const [visibleCount, setVisibleCount] = useState(ITEMS_PER_PAGE);

  // Products with big discounts for deals section
  const dealProducts = products.filter((p) => {
    if (!p.originalPrice) return false;
    const discount = Math.round(((p.originalPrice - p.price) / p.originalPrice) * 100);
    return discount >= 25;
  }).slice(0, 6);

  const visibleProducts = products.slice(0, visibleCount);

  return (
    <>
      {/* Deals Section */}
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

      {/* All Products */}
      <section id="products" className="py-10">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-heading font-bold text-foreground">
              All Electronics ({products.length} products)
            </h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-5">
            {visibleProducts.map((product, i) => (
              <ProductCard key={product.id} product={product} index={i} />
            ))}
          </div>

          {visibleCount < products.length && (
            <div className="text-center mt-8">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setVisibleCount((prev) => Math.min(prev + ITEMS_PER_PAGE, products.length))}
                className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-8 py-3 rounded-lg font-heading font-semibold hover:opacity-90 transition-opacity"
              >
                <ChevronDown className="h-5 w-5" />
                Load More ({products.length - visibleCount} remaining)
              </motion.button>
            </div>
          )}
        </div>
      </section>
    </>
  );
};

export default ProductGrid;
