import { useState, useEffect } from "react";
import { Star, ShoppingCart, Clock, Plus, Minus, Check } from "lucide-react";
import { Product, useCart } from "@/context/CartContext";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";

const ProductCard = ({ product, index }: { product: Product; index: number }) => {
  const { addToCart, items, updateQuantity, removeFromCart } = useCart();
  const [hoveredImgIdx, setHoveredImgIdx] = useState(0);
  const [justAdded, setJustAdded] = useState(false);
  const discount = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  const cartItem = items.find((i) => i.product.id === product.id);
  const quantity = cartItem?.quantity || 0;
  const displayImages = product.images?.length ? product.images : [product.image];

  // Cycle images on hover
  useEffect(() => {
    if (displayImages.length <= 1) return;
    let interval: NodeJS.Timeout;
    return () => clearInterval(interval);
  }, [displayImages.length]);

  const handleAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product);
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 800);
  };

  const handleIncrement = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    updateQuantity(product.id, quantity + 1);
  };

  const handleDecrement = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (quantity <= 1) removeFromCart(product.id);
    else updateQuantity(product.id, quantity - 1);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.03 }}
      className="group bg-card rounded-xl border border-border overflow-hidden hover:shadow-card-hover hover:border-primary/20 transition-all duration-300"
      onMouseEnter={() => {
        if (displayImages.length > 1) {
          const cycle = setInterval(() => {
            setHoveredImgIdx((prev) => (prev + 1) % displayImages.length);
          }, 1200);
          (window as any).__cardCycle = cycle;
        }
      }}
      onMouseLeave={() => {
        clearInterval((window as any).__cardCycle);
        setHoveredImgIdx(0);
      }}
    >
      <Link to={`/product/${product.id}`} className="block relative overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.img
            key={hoveredImgIdx}
            src={displayImages[hoveredImgIdx]}
            alt={product.name}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="w-full h-52 object-cover"
            loading="lazy"
          />
        </AnimatePresence>
        {product.badge && (
          <span className="absolute top-3 left-3 badge-deal text-xs font-bold px-2.5 py-1 rounded-md">
            {product.badge}
          </span>
        )}
        <div className="absolute top-3 right-3 inline-flex items-center gap-1 bg-card/90 backdrop-blur-sm rounded-full px-2 py-1 text-xs font-medium text-foreground">
          <Clock className="h-3 w-3 text-primary" />
          {product.deliveryTime}
        </div>
        {/* Image dots */}
        {displayImages.length > 1 && (
          <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1">
            {displayImages.map((_, i) => (
              <span key={i} className={`w-1.5 h-1.5 rounded-full transition-colors ${i === hoveredImgIdx ? 'bg-primary' : 'bg-card/60'}`} />
            ))}
          </div>
        )}
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

          {/* Zepto-style add/stepper button */}
          <AnimatePresence mode="wait">
            {quantity === 0 ? (
              <motion.button
                key="add"
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={handleAdd}
                className="p-2.5 rounded-lg bg-primary text-primary-foreground hover:opacity-90 transition-opacity relative"
              >
                {justAdded ? <Check className="h-4 w-4" /> : <ShoppingCart className="h-4 w-4" />}
              </motion.button>
            ) : (
              <motion.div
                key="stepper"
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                className="flex items-center gap-0 rounded-lg overflow-hidden border-2 border-primary"
              >
                <button onClick={handleDecrement} className="p-1.5 bg-primary/10 text-primary hover:bg-primary/20 transition-colors">
                  <Minus className="h-4 w-4" />
                </button>
                <span className="px-3 text-sm font-heading font-bold text-primary">{quantity}</span>
                <button onClick={handleIncrement} className="p-1.5 bg-primary/10 text-primary hover:bg-primary/20 transition-colors">
                  <Plus className="h-4 w-4" />
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  );
};

export default ProductCard;
