import { useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { products } from "@/data/products";
import { useCart } from "@/context/CartContext";
import { Star, Clock, ShoppingCart, ArrowLeft, Zap, Shield, RotateCcw, Tag } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CartDrawer from "@/components/CartDrawer";

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const product = products.find((p) => p.id === id);
  const [selectedImg, setSelectedImg] = useState(0);

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <p className="text-muted-foreground">Product not found.</p>
      </div>
    );
  }

  const displayImages = product.images?.length ? product.images : [product.image];
  const discount = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  const handleBuyNow = () => {
    addToCart(product);
    navigate("/checkout");
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <CartDrawer />
      <main className="container mx-auto px-4 py-8">
        <Link to="/" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors mb-6">
          <ArrowLeft className="h-4 w-4" />
          Back to products
        </Link>

        <div className="grid md:grid-cols-2 gap-10">
          {/* Image Gallery */}
          <div className="space-y-4">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="relative rounded-2xl overflow-hidden bg-card">
              <AnimatePresence mode="wait">
                <motion.img
                  key={selectedImg}
                  src={displayImages[selectedImg]}
                  alt={product.name}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="w-full aspect-square object-cover"
                />
              </AnimatePresence>
              {product.badge && (
                <span className="absolute top-4 left-4 badge-deal text-sm font-bold px-3 py-1.5 rounded-lg">
                  {product.badge}
                </span>
              )}
            </motion.div>

            {/* Thumbnail strip */}
            {displayImages.length > 1 && (
              <div className="flex gap-3 overflow-x-auto pb-1">
                {displayImages.map((imgUrl, i) => (
                  <button
                    key={i}
                    onClick={() => setSelectedImg(i)}
                    className={`shrink-0 w-20 h-20 rounded-xl overflow-hidden border-2 transition-all ${
                      i === selectedImg ? "border-primary ring-2 ring-primary/30" : "border-border hover:border-primary/40"
                    }`}
                  >
                    <img src={imgUrl} alt={`${product.name} view ${i + 1}`} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }}>
            <h1 className="text-3xl font-heading font-bold text-foreground mb-3">{product.name}</h1>

            <div className="flex items-center gap-3 mb-4">
              <div className="flex items-center gap-1 bg-success text-primary-foreground text-sm font-bold px-2 py-1 rounded">
                <span>{product.rating}</span>
                <Star className="h-3.5 w-3.5 fill-current" />
              </div>
              <span className="text-sm text-muted-foreground">{product.reviews.toLocaleString()} ratings</span>
            </div>

            <div className="flex items-baseline gap-3 mb-2">
              <span className="text-4xl font-heading font-bold text-foreground">₹{product.price.toLocaleString()}</span>
              {product.originalPrice && (
                <>
                  <span className="text-xl text-muted-foreground line-through">₹{product.originalPrice.toLocaleString()}</span>
                  <span className="text-lg font-semibold text-primary">{discount}% off</span>
                </>
              )}
            </div>

            {discount >= 15 && (
              <div className="inline-flex items-center gap-1 bg-primary/10 text-primary text-sm font-semibold px-3 py-1.5 rounded-lg mb-4">
                <Tag className="h-4 w-4" />
                Special Offer: Save ₹{((product.originalPrice || 0) - product.price).toLocaleString()}!
              </div>
            )}

            <p className="text-muted-foreground mb-6">{product.description}</p>

            <div className="flex items-center gap-2 text-sm text-primary font-medium mb-6 bg-primary/10 p-3 rounded-lg">
              <Clock className="h-4 w-4" />
              <span>Delivery in {product.deliveryTime}</span>
            </div>

            <div className="flex gap-3 mb-8">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => addToCart(product)}
                className="flex-1 flex items-center justify-center gap-2 bg-primary text-primary-foreground py-4 rounded-xl font-heading font-semibold text-lg hover:opacity-90 transition-opacity"
              >
                <ShoppingCart className="h-5 w-5" />
                Add to Cart
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleBuyNow}
                className="flex-1 flex items-center justify-center gap-2 bg-accent text-accent-foreground py-4 rounded-xl font-heading font-semibold text-lg hover:opacity-90 transition-opacity"
              >
                <Zap className="h-5 w-5" />
                Buy Now
              </motion.button>
            </div>

            <div className="grid grid-cols-3 gap-4">
              {[
                { icon: Zap, label: "Fast Delivery" },
                { icon: Shield, label: "Genuine Product" },
                { icon: RotateCcw, label: "Easy Returns" },
              ].map(({ icon: Icon, label }) => (
                <div key={label} className="flex flex-col items-center gap-2 p-3 rounded-lg bg-muted text-center">
                  <Icon className="h-5 w-5 text-primary" />
                  <span className="text-xs font-medium text-muted-foreground">{label}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ProductDetail;
