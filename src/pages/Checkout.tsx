import { useCart } from "@/context/CartContext";
import { useState } from "react";
import { ArrowLeft, CreditCard, Zap, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CartDrawer from "@/components/CartDrawer";
import { motion, AnimatePresence } from "framer-motion";

const Checkout = () => {
  const { items, totalPrice, clearCart } = useCart();
  const [step, setStep] = useState<"details" | "success">("details");

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    setStep("success");
    clearCart();
  };

  if (step === "success") {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <CartDrawer />
        <main className="container mx-auto px-4 py-20">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="max-w-md mx-auto text-center"
          >
            <div className="w-20 h-20 rounded-full bg-success mx-auto flex items-center justify-center mb-6">
              <CheckCircle className="h-10 w-10 text-primary-foreground" />
            </div>
            <h1 className="text-3xl font-heading font-bold text-foreground mb-3">Order Placed!</h1>
            <p className="text-muted-foreground mb-2">Your order has been confirmed and will be delivered in minutes.</p>
            <p className="text-sm text-primary font-medium mb-8 flex items-center justify-center gap-1">
              <Zap className="h-4 w-4" /> Estimated delivery: 10-15 minutes
            </p>
            <Link
              to="/"
              className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-8 py-3 rounded-lg font-heading font-semibold hover:opacity-90 transition-opacity"
            >
              Continue Shopping
            </Link>
          </motion.div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <CartDrawer />
      <main className="container mx-auto px-4 py-8">
        <Link to="/" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors mb-6">
          <ArrowLeft className="h-4 w-4" />
          Back to shopping
        </Link>

        <h1 className="text-3xl font-heading font-bold text-foreground mb-8">Checkout</h1>

        {items.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-muted-foreground mb-4">Your cart is empty</p>
            <Link to="/" className="text-primary hover:underline font-medium">Go shopping</Link>
          </div>
        ) : (
          <div className="grid lg:grid-cols-3 gap-8">
            <form onSubmit={handlePlaceOrder} className="lg:col-span-2 space-y-6">
              <div className="bg-card border border-border rounded-xl p-6 space-y-4">
                <h2 className="font-heading font-semibold text-lg text-card-foreground">Delivery Address</h2>
                <div className="grid sm:grid-cols-2 gap-4">
                  <input required placeholder="Full Name" className="w-full px-4 py-3 rounded-lg border border-input bg-background text-foreground text-sm outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all" />
                  <input required placeholder="Phone Number" className="w-full px-4 py-3 rounded-lg border border-input bg-background text-foreground text-sm outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all" />
                </div>
                <input required placeholder="Address Line 1" className="w-full px-4 py-3 rounded-lg border border-input bg-background text-foreground text-sm outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all" />
                <div className="grid sm:grid-cols-3 gap-4">
                  <input required placeholder="City" className="w-full px-4 py-3 rounded-lg border border-input bg-background text-foreground text-sm outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all" />
                  <input required placeholder="State" className="w-full px-4 py-3 rounded-lg border border-input bg-background text-foreground text-sm outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all" />
                  <input required placeholder="PIN Code" className="w-full px-4 py-3 rounded-lg border border-input bg-background text-foreground text-sm outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all" />
                </div>
              </div>

              <div className="bg-card border border-border rounded-xl p-6 space-y-4">
                <h2 className="font-heading font-semibold text-lg text-card-foreground flex items-center gap-2">
                  <CreditCard className="h-5 w-5 text-primary" />
                  Payment Method
                </h2>
                <div className="space-y-3">
                  {["Credit / Debit Card", "UPI Payment", "Cash on Delivery"].map((method, i) => (
                    <label key={method} className="flex items-center gap-3 p-3 rounded-lg border border-border hover:border-primary/30 cursor-pointer transition-colors">
                      <input type="radio" name="payment" defaultChecked={i === 0} className="accent-primary" />
                      <span className="text-sm font-medium text-card-foreground">{method}</span>
                    </label>
                  ))}
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-primary text-primary-foreground py-4 rounded-xl font-heading font-semibold text-lg hover:opacity-90 transition-opacity flex items-center justify-center gap-2"
              >
                <Zap className="h-5 w-5" />
                Place Order — ₹{totalPrice.toLocaleString()}
              </button>
            </form>

            {/* Order summary */}
            <div className="bg-card border border-border rounded-xl p-6 h-fit sticky top-32">
              <h2 className="font-heading font-semibold text-lg text-card-foreground mb-4">Order Summary</h2>
              <div className="space-y-3 mb-4">
                {items.map((item) => (
                  <div key={item.product.id} className="flex justify-between text-sm">
                    <span className="text-muted-foreground line-clamp-1 flex-1">{item.product.name} × {item.quantity}</span>
                    <span className="font-medium text-card-foreground ml-2">₹{(item.product.price * item.quantity).toLocaleString()}</span>
                  </div>
                ))}
              </div>
              <div className="border-t border-border pt-3 space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Delivery</span>
                  <span className="text-primary font-medium">FREE</span>
                </div>
                <div className="flex justify-between font-heading font-bold text-lg">
                  <span>Total</span>
                  <span>₹{totalPrice.toLocaleString()}</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default Checkout;
