import { products } from "@/data/products";
import ProductCard from "./ProductCard";

const ProductGrid = () => {
  return (
    <section id="products" className="py-12">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-heading font-bold text-foreground">
            Trending Products
          </h2>
          <span className="text-sm text-muted-foreground">{products.length} products</span>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {products.map((product, i) => (
            <ProductCard key={product.id} product={product} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductGrid;
