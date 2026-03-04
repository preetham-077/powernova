import { motion } from "framer-motion";
import { categories } from "@/data/products";
import { Link } from "react-router-dom";

const CategoryGrid = () => {
  return (
    <section id="categories" className="py-12">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl font-heading font-bold text-foreground mb-8">
          Shop by Category
        </h2>
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-9 gap-3">
          {categories.map((cat, i) => (
            <Link
              key={cat.id}
              to={`/?category=${cat.id}`}
            >
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.03 }}
                whileHover={{ y: -4 }}
                className="flex flex-col items-center gap-2 p-3 rounded-xl bg-card border border-border hover:shadow-card-hover hover:border-primary/30 transition-all duration-300 cursor-pointer"
              >
                <span className="text-2xl">{cat.icon}</span>
                <span className="text-[11px] font-medium text-card-foreground text-center leading-tight">{cat.name}</span>
              </motion.div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategoryGrid;
