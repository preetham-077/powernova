import { motion } from "framer-motion";
import { categories } from "@/data/products";

const CategoryGrid = () => {
  return (
    <section id="categories" className="py-12">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl font-heading font-bold text-foreground mb-8">
          Shop by Category
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-4">
          {categories.map((cat, i) => (
            <motion.button
              key={cat.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              whileHover={{ y: -4 }}
              className="flex flex-col items-center gap-3 p-4 rounded-xl bg-card border border-border hover:shadow-card-hover hover:border-primary/30 transition-all duration-300 cursor-pointer"
            >
              <span className="text-3xl">{cat.icon}</span>
              <span className="text-xs font-medium text-card-foreground text-center">{cat.name}</span>
            </motion.button>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategoryGrid;
