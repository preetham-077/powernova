import { Search, ShoppingCart, User, MapPin, Menu, Zap } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { Link } from "react-router-dom";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const Header = () => {
  const { totalItems, setIsCartOpen } = useCart();
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <header className="sticky top-0 z-50">
      {/* Top bar */}
      <div className="bg-nav">
        <div className="container mx-auto flex items-center justify-between px-4 py-3">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 shrink-0">
            <Zap className="h-8 w-8 text-primary" />
            <span className="text-2xl font-heading font-bold text-nav-foreground">
              POWER<span className="text-gradient-brand">NOVA</span>
            </span>
          </Link>

          {/* Delivery location */}
          <div className="hidden md:flex items-center gap-1 text-nav-foreground/70 text-sm cursor-pointer hover:text-nav-foreground transition-colors">
            <MapPin className="h-4 w-4 text-primary" />
            <div>
              <p className="text-xs text-nav-foreground/50">Deliver to</p>
              <p className="font-medium text-sm">Your Location</p>
            </div>
          </div>

          {/* Search */}
          <div className="hidden sm:flex flex-1 max-w-2xl mx-4">
            <div className="flex w-full rounded-lg overflow-hidden border-2 border-primary/50 focus-within:border-primary transition-colors">
              <input
                type="text"
                placeholder="Search for products, brands and more..."
                className="flex-1 px-4 py-2.5 text-sm bg-card text-card-foreground outline-none"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <button className="px-5 bg-primary text-primary-foreground hover:opacity-90 transition-opacity">
                <Search className="h-5 w-5" />
              </button>
            </div>
          </div>

          {/* Right actions */}
          <div className="flex items-center gap-4">
            <button className="hidden md:flex items-center gap-1 text-nav-foreground/70 hover:text-nav-foreground transition-colors text-sm">
              <User className="h-5 w-5" />
              <span className="font-medium">Account</span>
            </button>

            <button
              onClick={() => setIsCartOpen(true)}
              className="relative flex items-center gap-1 text-nav-foreground hover:text-primary transition-colors"
            >
              <ShoppingCart className="h-6 w-6" />
              <AnimatePresence>
                {totalItems > 0 && (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0 }}
                    className="absolute -top-2 -right-2 bg-primary text-primary-foreground text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center"
                  >
                    {totalItems}
                  </motion.span>
                )}
              </AnimatePresence>
            </button>

            <button className="sm:hidden text-nav-foreground">
              <Menu className="h-6 w-6" />
            </button>
          </div>
        </div>
      </div>

      {/* Category bar */}
      <div className="bg-secondary border-b border-border">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-6 py-2 overflow-x-auto scrollbar-none text-sm">
            {["All", "Electronics", "Fashion", "Home", "Beauty", "Sports", "Deals", "New Arrivals"].map((cat) => (
              <Link
                key={cat}
                to={cat === "All" ? "/" : `/?category=${cat.toLowerCase()}`}
                className="text-secondary-foreground/80 hover:text-primary whitespace-nowrap transition-colors font-medium"
              >
                {cat}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
