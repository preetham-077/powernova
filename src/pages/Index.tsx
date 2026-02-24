import Header from "@/components/Header";
import HeroBanner from "@/components/HeroBanner";
import FeatureStrip from "@/components/FeatureStrip";
import CategoryGrid from "@/components/CategoryGrid";
import ProductGrid from "@/components/ProductGrid";
import Footer from "@/components/Footer";
import CartDrawer from "@/components/CartDrawer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <CartDrawer />
      <main>
        <HeroBanner />
        <FeatureStrip />
        <CategoryGrid />
        <ProductGrid />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
