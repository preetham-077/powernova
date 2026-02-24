import { motion } from "framer-motion";
import { Zap, Clock, Shield, Cpu } from "lucide-react";

const HeroBanner = () => {
  return (
    <section className="bg-hero-gradient text-nav-foreground relative overflow-hidden">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 right-10 w-72 h-72 rounded-full bg-primary blur-[120px]" />
        <div className="absolute bottom-10 left-10 w-96 h-96 rounded-full bg-accent blur-[150px]" />
      </div>

      <div className="container mx-auto px-4 py-16 md:py-24 relative z-10">
        <div className="flex flex-col items-center text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl"
          >
            <div className="inline-flex items-center gap-2 bg-primary/20 border border-primary/30 rounded-full px-4 py-1.5 mb-6">
              <Zap className="h-4 w-4 text-primary" />
              <span className="text-sm font-medium text-primary">Lightning Fast Delivery</span>
            </div>

            {/* Stylish POWERNOVA name centered */}
            <motion.h1
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, type: "spring" }}
              className="text-6xl md:text-8xl font-heading font-bold leading-none mb-6 tracking-tight"
            >
              <span className="text-gradient-brand">POWER</span>
              <span className="text-nav-foreground">NOVA</span>
            </motion.h1>

            <p className="text-xl md:text-2xl text-nav-foreground/70 mb-4 font-heading">
              Your <span className="text-primary font-semibold">Electronics</span> Superstore
            </p>

            <p className="text-base text-nav-foreground/50 mb-8 max-w-lg mx-auto">
              Premium gadgets — smartphones, laptops, cameras & more — delivered to your door in minutes at unbeatable prices.
            </p>

            <div className="flex flex-wrap gap-4 justify-center mb-10">
              <motion.a
                href="#products"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-8 py-3.5 rounded-lg font-heading font-semibold text-lg shadow-lg hover:opacity-90 transition-opacity"
              >
                <Cpu className="h-5 w-5" />
                Explore Gadgets
              </motion.a>
              <a
                href="#categories"
                className="inline-flex items-center gap-2 border border-nav-foreground/20 text-nav-foreground px-8 py-3.5 rounded-lg font-heading font-semibold text-lg hover:border-primary/50 hover:text-primary transition-colors"
              >
                Browse Categories
              </a>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-wrap gap-8 justify-center"
          >
            {[
              { icon: Clock, label: "10-min delivery" },
              { icon: Shield, label: "Genuine products" },
              { icon: Zap, label: "Best prices" },
            ].map(({ icon: Icon, label }) => (
              <div key={label} className="flex items-center gap-2 text-nav-foreground/60">
                <Icon className="h-5 w-5 text-primary" />
                <span className="text-sm font-medium">{label}</span>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroBanner;
