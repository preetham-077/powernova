import { Star, ShoppingCart, Clock } from "lucide-react";
import { Product, useCart } from "@/context/CartContext";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const ProductCard = ({ product, index }: { product: Product; index: number }) => {
  const { addToCart } = useCart();
  const discount = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
      className="group bg-card rounded-xl border border-border overflow-hidden hover:shadow-card-hover hover:border-primary/20 transition-all duration-300"
    >
      <Link to={`/product/${product.id}`} className="block relative overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-52 object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
        {product.badge && (
          <span className="absolute top-3 left-3 badge-deal text-xs font-bold px-2.5 py-1 rounded-md">
            {product.badge}
          </span>
        )}
        <div className="absolute top-3 right-3 inline-flex items-center gap-1 bg-card/90 backdrop-blur-sm rounded-full px-2 py-1 text-xs font-medium text-foreground">
          <Clock className="h-3 w-3 text-primary" />
          {product.deliveryTime}
        </div>
      </Link>

      <div className="p-4">
        <Link to={`/product/${product.id}`}>
          <h3 className="font-medium text-sm text-card-foreground line-clamp-2 mb-2 group-hover:text-primary transition-colors">
            {product.name}
          </h3>
        </Link>

        <div className="flex items-center gap-1 mb-2">
          <div className="flex items-center gap-0.5 bg-success text-primary-foreground text-xs font-bold px-1.5 py-0.5 rounded">
            <span>{product.rating}</span>
            <Star className="h-3 w-3 fill-current" />
          </div>
          <span className="text-xs text-muted-foreground">({product.reviews.toLocaleString()})</span>
        </div>

        <div className="flex items-end justify-between">
          <div>
            <div className="flex items-baseline gap-2">
              <span className="text-lg font-heading font-bold text-card-foreground">₹{product.price.toLocaleString()}</span>
              {product.originalPrice && (
                <span className="text-sm text-muted-foreground line-through">₹{product.originalPrice.toLocaleString()}</span>
              )}
            </div>
            {discount > 0 && (
              <span className="text-xs font-semibold text-primary">{discount}% off</span>
            )}
          </div>

          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={(e) => {
              e.preventDefault();
              addToCart(product);
            }}
            className="p-2.5 rounded-lg bg-primary text-primary-foreground hover:opacity-90 transition-opacity"
          >
            <ShoppingCart className="h-4 w-4" />
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
};

export default ProductCard;
