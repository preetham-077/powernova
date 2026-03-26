import { useCart } from "@/context/CartContext";
import { useState, useEffect } from "react";
import { ArrowLeft, CreditCard, Zap, CheckCircle, MapPin, Package, Truck, QrCode, Smartphone } from "lucide-react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CartDrawer from "@/components/CartDrawer";
import { motion, AnimatePresence } from "framer-motion";
import { QRCodeSVG } from "qrcode.react";
import DeliveryTracker from "@/components/DeliveryTracker";

const Checkout = () => {
  const { items, totalPrice, clearCart } = useCart();
  const [step, setStep] = useState<"details" | "payment" | "tracking">("details");
  const [paymentMethod, setPaymentMethod] = useState("upi");
  const [paymentDone, setPaymentDone] = useState(false);
  const [orderId] = useState(() => `PN-${Date.now().toString(36).toUpperCase()}`);
  const [cardNumber, setCardNumber] = useState("");
  const [cardExpiry, setCardExpiry] = useState("");
  const [cardCvv, setCardCvv] = useState("");
  const [cardName, setCardName] = useState("");

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    setStep("payment");
  };

  const handlePaymentComplete = () => {
    setPaymentDone(true);
    clearCart();
    setTimeout(() => setStep("tracking"), 1500);
  };

  // UPI QR value with the real phone number
  const upiQrValue = `upi://pay?pa=8147850160@upi&pn=POWERNOVA&am=${totalPrice}&cu=INR&tn=Order-${orderId}`;

  if (step === "tracking") {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <CartDrawer />
        <main className="container mx-auto px-4 py-8">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <div className="max-w-4xl mx-auto">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <CheckCircle className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h1 className="text-2xl font-heading font-bold text-foreground">Order Confirmed!</h1>
                  <p className="text-sm text-muted-foreground">Order ID: {orderId}</p>
                </div>
              </div>

              <div className="bg-card border border-border rounded-xl p-6 mb-6">
                <h2 className="font-heading font-semibold text-lg text-card-foreground mb-4">Order Status</h2>
                <OrderTimeline />
              </div>

              <div className="bg-card border border-border rounded-xl p-6 mb-6">
                <h2 className="font-heading font-semibold text-lg text-card-foreground mb-4 flex items-center gap-2">
                  <MapPin className="h-5 w-5 text-primary" />
                  Live Delivery Tracking
                </h2>
                <DeliveryTracker />
              </div>

              <div className="text-center">
                <Link
                  to="/"
                  className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-8 py-3 rounded-lg font-heading font-semibold hover:opacity-90 transition-opacity"
                >
                  Continue Shopping
                </Link>
              </div>
            </div>
          </motion.div>
        </main>
        <Footer />
      </div>
    );
  }

  if (step === "payment") {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <CartDrawer />
        <main className="container mx-auto px-4 py-8">
          <button onClick={() => setStep("details")} className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors mb-6">
            <ArrowLeft className="h-4 w-4" />
            Back to details
          </button>

          <div className="max-w-lg mx-auto">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-card border border-border rounded-2xl p-8 text-center">
              <AnimatePresence mode="wait">
                {!paymentDone ? (
                  <motion.div key="payment-form" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                    <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                      {paymentMethod === "upi" ? <QrCode className="h-8 w-8 text-primary" /> : <CreditCard className="h-8 w-8 text-primary" />}
                    </div>
                    <h2 className="text-2xl font-heading font-bold text-card-foreground mb-2">
                      {paymentMethod === "upi" ? "Scan QR to Pay via UPI" : paymentMethod === "card" ? "Enter Card Details" : "Cash on Delivery"}
                    </h2>
                    <p className="text-muted-foreground mb-6">
                      Amount: <span className="font-heading font-bold text-foreground text-xl">₹{totalPrice.toLocaleString()}</span>
                    </p>

                    {paymentMethod === "upi" && (
                      <div className="space-y-4">
                        <div className="bg-background rounded-xl p-6 inline-block">
                         <QRCodeSVG
                            value={upiQrValue}
                            size={240}
                            bgColor="#ebe5f0"
                            fgColor="#1c1424"
                            level="H"
                            includeMargin
                          />
                        </div>
                        <div className="bg-muted rounded-lg p-3">
                          <p className="text-xs text-muted-foreground">UPI ID</p>
                          <p className="font-heading font-semibold text-foreground">8147850160@upi</p>
                        </div>
                        <p className="text-xs text-muted-foreground">
                          Open <span className="font-semibold text-foreground">Google Pay, PhonePe, Paytm</span> or any UPI app to scan & pay
                        </p>
                      </div>
                    )}

                    {paymentMethod === "card" && (
                      <div className="bg-background rounded-xl p-6 mb-4 space-y-4 text-left">
                        <div>
                          <label className="text-xs font-medium text-muted-foreground mb-1 block">Cardholder Name</label>
                          <input
                            placeholder="John Doe"
                            value={cardName}
                            onChange={(e) => setCardName(e.target.value)}
                            className="w-full px-4 py-3 rounded-lg border border-input bg-card text-foreground text-sm outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all"
                          />
                        </div>
                        <div>
                          <label className="text-xs font-medium text-muted-foreground mb-1 block">Card Number</label>
                          <input
                            placeholder="1234 5678 9012 3456"
                            value={cardNumber}
                            onChange={(e) => setCardNumber(e.target.value.replace(/\D/g, "").slice(0, 16))}
                            className="w-full px-4 py-3 rounded-lg border border-input bg-card text-foreground text-sm outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all font-mono tracking-wider"
                          />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label className="text-xs font-medium text-muted-foreground mb-1 block">Expiry</label>
                            <input
                              placeholder="MM/YY"
                              value={cardExpiry}
                              onChange={(e) => setCardExpiry(e.target.value.slice(0, 5))}
                              className="w-full px-4 py-3 rounded-lg border border-input bg-card text-foreground text-sm outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all"
                            />
                          </div>
                          <div>
                            <label className="text-xs font-medium text-muted-foreground mb-1 block">CVV</label>
                            <input
                              placeholder="•••"
                              type="password"
                              value={cardCvv}
                              onChange={(e) => setCardCvv(e.target.value.replace(/\D/g, "").slice(0, 4))}
                              className="w-full px-4 py-3 rounded-lg border border-input bg-card text-foreground text-sm outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all"
                            />
                          </div>
                        </div>
                        <p className="text-xs text-muted-foreground flex items-center gap-1">
                          🔒 Your card details are encrypted and secure
                        </p>
                      </div>
                    )}

                    {paymentMethod === "cod" && (
                      <div className="bg-background rounded-xl p-6 mb-4 text-center">
                        <Package className="h-16 w-16 text-primary mx-auto mb-4" />
                        <p className="text-foreground font-medium mb-2">Pay ₹{totalPrice.toLocaleString()} on delivery</p>
                        <p className="text-xs text-muted-foreground">Cash or UPI accepted at doorstep</p>
                      </div>
                    )}

                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={handlePaymentComplete}
                      className="w-full bg-primary text-primary-foreground py-4 rounded-xl font-heading font-semibold text-lg hover:opacity-90 transition-opacity flex items-center justify-center gap-2 mt-6"
                    >
                      <Zap className="h-5 w-5" />
                      {paymentMethod === "upi"
                        ? "I've Completed UPI Payment"
                        : paymentMethod === "card"
                        ? `Pay ₹${totalPrice.toLocaleString()}`
                        : "Place COD Order"}
                    </motion.button>
                  </motion.div>
                ) : (
                  <motion.div key="success" initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }}>
                    <motion.div
                      animate={{ rotate: [0, 10, -10, 0] }}
                      transition={{ duration: 0.5 }}
                      className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4"
                    >
                      <CheckCircle className="h-10 w-10 text-primary" />
                    </motion.div>
                    <h2 className="text-2xl font-heading font-bold text-card-foreground mb-2">Payment Successful!</h2>
                    <p className="text-muted-foreground">Preparing your delivery...</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </div>
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
                  {[
                    { id: "upi", label: "UPI / QR Code Payment", icon: Smartphone, desc: "Scan QR code with any UPI app — Pay to 8147850160" },
                    { id: "card", label: "Credit / Debit Card", icon: CreditCard, desc: "Visa, Mastercard, RuPay" },
                    { id: "cod", label: "Cash on Delivery", icon: Package, desc: "Pay when you receive" },
                  ].map((method) => (
                    <label key={method.id} className={`flex items-center gap-3 p-4 rounded-xl border cursor-pointer transition-all ${paymentMethod === method.id ? 'border-primary bg-primary/5' : 'border-border hover:border-primary/30'}`}>
                      <input type="radio" name="payment" value={method.id} checked={paymentMethod === method.id} onChange={() => setPaymentMethod(method.id)} className="accent-primary" />
                      <method.icon className="h-5 w-5 text-primary shrink-0" />
                      <div>
                        <span className="text-sm font-medium text-card-foreground">{method.label}</span>
                        <p className="text-xs text-muted-foreground">{method.desc}</p>
                      </div>
                    </label>
                  ))}
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-primary text-primary-foreground py-4 rounded-xl font-heading font-semibold text-lg hover:opacity-90 transition-opacity flex items-center justify-center gap-2"
              >
                <Zap className="h-5 w-5" />
                Proceed to Payment — ₹{totalPrice.toLocaleString()}
              </button>
            </form>

            <div className="bg-card border border-border rounded-xl p-6 h-fit sticky top-32">
              <h2 className="font-heading font-semibold text-lg text-card-foreground mb-4">Order Summary</h2>
              <div className="space-y-3 mb-4 max-h-64 overflow-y-auto">
                {items.map((item) => (
                  <div key={item.product.id} className="flex gap-3 items-center">
                    <img src={item.product.image} alt={item.product.name} className="w-12 h-12 rounded-lg object-cover" />
                    <div className="flex-1 min-w-0">
                      <span className="text-sm text-card-foreground line-clamp-1">{item.product.name}</span>
                      <span className="text-xs text-muted-foreground">Qty: {item.quantity}</span>
                    </div>
                    <span className="font-medium text-sm text-card-foreground">₹{(item.product.price * item.quantity).toLocaleString()}</span>
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

const OrderTimeline = () => {
  const [activeStep, setActiveStep] = useState(0);

  useEffect(() => {
    const timers = [
      setTimeout(() => setActiveStep(1), 2000),
      setTimeout(() => setActiveStep(2), 5000),
      setTimeout(() => setActiveStep(3), 9000),
    ];
    return () => timers.forEach(clearTimeout);
  }, []);

  const steps = [
    { icon: CheckCircle, label: "Order Confirmed", time: "Just now" },
    { icon: Package, label: "Packing Your Order", time: "~2 min" },
    { icon: Truck, label: "Out for Delivery", time: "~5 min" },
    { icon: MapPin, label: "Arriving Soon", time: "~10 min" },
  ];

  return (
    <div className="space-y-0">
      {steps.map((s, i) => (
        <div key={s.label} className="flex gap-4 items-start">
          <div className="flex flex-col items-center">
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: i <= activeStep ? 1 : 0.8 }}
              className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 transition-colors duration-500 ${i <= activeStep ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'}`}
            >
              <s.icon className="h-5 w-5" />
            </motion.div>
            {i < steps.length - 1 && (
              <div className={`w-0.5 h-10 transition-colors duration-500 ${i < activeStep ? 'bg-primary' : 'bg-border'}`} />
            )}
          </div>
          <div className="pt-2 pb-4">
            <p className={`text-sm font-medium transition-colors ${i <= activeStep ? 'text-foreground' : 'text-muted-foreground'}`}>{s.label}</p>
            <p className="text-xs text-muted-foreground">{s.time}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Checkout;
