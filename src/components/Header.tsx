import { Search, ShoppingCart, User, MapPin, Menu, Zap, X, ShoppingBag, Percent } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { Link, useNavigate } from "react-router-dom";
import { useState, useMemo, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { products } from "@/data/products";

const Header = () => {
  const { totalItems, setIsCartOpen } = useCart();
  const [searchQuery, setSearchQuery] = useState("");
  const [searchFocused, setSearchFocused] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const searchRef = useRef<HTMLDivElement>(null);

  const searchResults = useMemo(() => {
    if (!searchQuery.trim()) return [];
    return products
      .filter((p) => p.name.toLowerCase().includes(searchQuery.toLowerCase()))
      .slice(0, 6);
  }, [searchQuery]);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(e.target as Node)) {
        setSearchFocused(false);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const navCategories = ["All", "Smartphones", "Laptops", "Headphones", "Smartwatches", "Tablets", "Cameras", "Speakers", "Gaming", "TVs & Monitors", "Accessories"];

  return (
    <header className="sticky top-0 z-50">
      {/* Top bar */}
      <div className="bg-nav">
        <div className="container mx-auto flex items-center justify-between px-4 py-3">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 shrink-0">
            <Zap className="h-8 w-8 text-primary" />
            <span className="text-2xl font-logo font-bold text-nav-foreground tracking-wider">
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
          <div className="hidden sm:flex flex-1 max-w-2xl mx-4 relative" ref={searchRef}>
            <div className="flex w-full rounded-lg overflow-hidden border-2 border-primary/50 focus-within:border-primary transition-colors">
              <input
                type="text"
                placeholder="Search smartphones, laptops, gadgets..."
                className="flex-1 px-4 py-2.5 text-sm bg-card text-card-foreground outline-none"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={() => setSearchFocused(true)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && searchResults.length > 0) {
                    navigate(`/product/${searchResults[0].id}`);
                    setSearchQuery("");
                    setSearchFocused(false);
                  }
                }}
              />
              <button className="px-5 bg-primary text-primary-foreground hover:opacity-90 transition-opacity">
                <Search className="h-5 w-5" />
              </button>
            </div>

            {/* Search dropdown */}
            <AnimatePresence>
              {searchFocused && searchResults.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: -4 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -4 }}
                  className="absolute top-full left-0 right-0 mt-1 bg-card border border-border rounded-lg shadow-lg overflow-hidden z-50"
                >
                  {searchResults.map((product) => (
                    <Link
                      key={product.id}
                      to={`/product/${product.id}`}
                      onClick={() => { setSearchQuery(""); setSearchFocused(false); }}
                      className="flex items-center gap-3 px-4 py-3 hover:bg-muted transition-colors"
                    >
                      <img src={product.image} alt="" className="w-10 h-10 rounded-lg object-cover" />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm text-card-foreground line-clamp-1">{product.name}</p>
                        <p className="text-xs text-primary font-heading font-semibold">₹{product.price.toLocaleString()}</p>
                      </div>
                    </Link>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Right actions */}
          <div className="flex items-center gap-4">
            {/* Founder credit */}
            <div className="hidden lg:flex items-center gap-2 bg-primary/15 border border-primary/30 rounded-lg px-3 py-1.5">
              <span className="text-[10px] uppercase tracking-widest text-nav-foreground/50">Founder</span>
              <span className="text-xs font-heading font-bold text-primary">CHANDAN & PREETHAM</span>
            </div>

            <Link to="/?category=deals" className="hidden md:flex items-center gap-1 text-nav-foreground/70 hover:text-nav-foreground transition-colors text-sm">
              <Percent className="h-4 w-4 text-primary" />
              <span className="font-medium">Deals</span>
            </Link>

            <button className="hidden md:flex items-center gap-1 text-nav-foreground/70 hover:text-nav-foreground transition-colors text-sm">
              <User className="h-5 w-5" />
              <span className="font-medium">Account</span>
            </button>

            <Link to="/checkout" className="hidden md:flex items-center gap-1 text-nav-foreground/70 hover:text-nav-foreground transition-colors text-sm">
              <ShoppingBag className="h-4 w-4" />
              <span className="font-medium">Orders</span>
            </Link>

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

            <button className="sm:hidden text-nav-foreground" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Category bar */}
      <div className="bg-secondary border-b border-border">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-6 py-2 overflow-x-auto scrollbar-none text-sm">
            {navCategories.map((cat) => {
              const slug = cat === "All" ? "/" : cat === "TVs & Monitors" ? "/?category=tvs" : `/?category=${cat.toLowerCase()}`;
              return (
                <Link
                  key={cat}
                  to={slug}
                  className="text-secondary-foreground/80 hover:text-primary whitespace-nowrap transition-colors font-medium"
                >
                  {cat}
                </Link>
              );
            })}
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="sm:hidden bg-card border-b border-border overflow-hidden"
          >
            <div className="p-4 space-y-3">
              <div className="flex rounded-lg overflow-hidden border border-border">
                <input
                  type="text"
                  placeholder="Search products..."
                  className="flex-1 px-4 py-2 text-sm bg-background text-foreground outline-none"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <button className="px-4 bg-primary text-primary-foreground">
                  <Search className="h-4 w-4" />
                </button>
              </div>
              <div className="grid grid-cols-2 gap-2">
                {navCategories.map((cat) => {
                  const slug = cat === "All" ? "/" : cat === "TVs & Monitors" ? "/?category=tvs" : `/?category=${cat.toLowerCase()}`;
                  return (
                    <Link
                      key={cat}
                      to={slug}
                      onClick={() => setMobileMenuOpen(false)}
                      className="text-sm text-card-foreground font-medium px-3 py-2 rounded-lg bg-muted hover:bg-primary/10 transition-colors"
                    >
                      {cat}
                    </Link>
                  );
                })}
              </div>
              <div className="pt-2 border-t border-border text-center">
                <p className="text-xs text-muted-foreground">Founded by <span className="text-primary font-semibold">CHANDAN & PREETHAM</span></p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;
