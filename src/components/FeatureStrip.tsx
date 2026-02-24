import { Zap, Truck, RotateCcw, Shield } from "lucide-react";
import { motion } from "framer-motion";

const features = [
  { icon: Zap, title: "10-Min Delivery", desc: "Fastest delivery in your area" },
  { icon: Truck, title: "Free Shipping", desc: "On orders above ₹499" },
  { icon: RotateCcw, title: "Easy Returns", desc: "7-day hassle-free returns" },
  { icon: Shield, title: "Secure Payments", desc: "100% safe & encrypted" },
];

const FeatureStrip = () => (
  <section className="bg-card border-y border-border py-8">
    <div className="container mx-auto px-4">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {features.map(({ icon: Icon, title, desc }, i) => (
          <motion.div
            key={title}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 * i }}
            className="flex items-center gap-3"
          >
            <div className="p-2.5 rounded-lg bg-primary/10">
              <Icon className="h-5 w-5 text-primary" />
            </div>
            <div>
              <p className="text-sm font-heading font-semibold text-card-foreground">{title}</p>
              <p className="text-xs text-muted-foreground">{desc}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default FeatureStrip;
