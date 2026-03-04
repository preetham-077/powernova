import { motion } from "framer-motion";
import { Zap, Clock, Shield, Cpu, Percent, ShoppingBag, Coffee } from "lucide-react";

const HeroBanner = () => {
  return (
    <section className="bg-hero-gradient text-nav-foreground relative overflow-hidden">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 right-10 w-72 h-72 rounded-full bg-primary blur-[120px]" />
        <div className="absolute bottom-10 left-10 w-96 h-96 rounded-full bg-accent blur-[150px]" />
      </div>

      <div className="container mx-auto px-4 py-14 md:py-20 relative z-10">
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

            <motion.h1
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, type: "spring" }}
              className="text-5xl md:text-7xl lg:text-8xl font-logo font-black leading-none mb-4 tracking-[0.15em]"
            >
              <span className="text-gradient-stylish">POWER</span>
              <span className="text-nav-foreground">NOVA</span>
            </motion.h1>

            <p className="text-lg md:text-xl text-nav-foreground/70 mb-1 font-heading">
              Your <span className="text-primary font-semibold">Everything</span> Superstore
            </p>

            <p className="text-sm text-nav-foreground/40 mb-1 font-heading tracking-wider">
              FOUNDED BY <span className="text-primary font-semibold">CHANDAN & PREETHAM</span>
            </p>

            <p className="text-base text-nav-foreground/50 mb-6 max-w-lg mx-auto">
              Electronics, Groceries, Fashion, Skincare, Baby Products, Shoes & POWERNOVA Cafe — delivered in minutes!
            </p>

            <div className="flex flex-wrap gap-3 justify-center mb-8">
              <motion.a
                href="#products"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded-lg font-heading font-semibold text-base shadow-lg hover:opacity-90 transition-opacity"
              >
                <ShoppingBag className="h-5 w-5" />
                Shop Now
              </motion.a>
              <a
                href="#deals"
                className="inline-flex items-center gap-2 border border-primary/50 text-primary px-6 py-3 rounded-lg font-heading font-semibold text-base hover:bg-primary/10 transition-colors"
              >
                <Percent className="h-5 w-5" />
                Today's Deals
              </a>
              <a
                href="/?category=cafe"
                className="inline-flex items-center gap-2 border border-primary/50 text-primary px-6 py-3 rounded-lg font-heading font-semibold text-base hover:bg-primary/10 transition-colors"
              >
                <Coffee className="h-5 w-5" />
                POWERNOVA Cafe
              </a>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-wrap gap-6 justify-center"
          >
            {[
              { icon: Clock, label: "10-min delivery" },
              { icon: Shield, label: "Genuine products" },
              { icon: Zap, label: "Best prices" },
              { icon: Cpu, label: "180+ products" },
            ].map(({ icon: Icon, label }) => (
              <div key={label} className="flex items-center gap-2 text-nav-foreground/60">
                <Icon className="h-4 w-4 text-primary" />
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
