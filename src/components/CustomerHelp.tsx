import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X, Phone, Mail, HelpCircle, CreditCard, Package, RotateCcw, ChevronRight } from "lucide-react";

const faqs = [
  { q: "Payment failed, what should I do?", a: "Please retry the payment or choose a different method (UPI/Card/COD). If money was debited, it will be refunded within 3-5 business days.", icon: CreditCard },
  { q: "Where is my order?", a: "Go to your order confirmation page to see live delivery tracking with your agent's location on the map.", icon: Package },
  { q: "How do I return a product?", a: "You can initiate a return within 7 days of delivery. Go to Orders → Select item → Request Return. Our agent will pick it up.", icon: RotateCcw },
  { q: "UPI payment not reflecting?", a: "UPI payments may take up to 30 minutes to reflect. If not updated, contact us with your UPI transaction ID.", icon: CreditCard },
  { q: "Wrong product delivered?", a: "We apologize! Please contact us immediately. We'll arrange a free pickup and send the correct product within 24 hours.", icon: Package },
];

const CustomerHelp = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedFaq, setSelectedFaq] = useState<number | null>(null);

  return (
    <>
      {/* Floating help button */}
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-primary text-primary-foreground shadow-lg flex items-center justify-center hover:opacity-90 transition-opacity"
      >
        <MessageCircle className="h-6 w-6" />
      </motion.button>

      {/* Help panel */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 z-50 bg-foreground/40 backdrop-blur-sm"
            />
            <motion.div
              initial={{ opacity: 0, y: 100, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 100, scale: 0.95 }}
              className="fixed bottom-6 right-6 z-50 w-[380px] max-h-[600px] bg-card border border-border rounded-2xl shadow-2xl overflow-hidden flex flex-col"
            >
              {/* Header */}
              <div className="bg-primary text-primary-foreground p-5 flex items-center justify-between">
                <div>
                  <h3 className="font-heading font-bold text-lg">POWERNOVA Help</h3>
                  <p className="text-sm opacity-80">We're here to help 24/7</p>
                </div>
                <button onClick={() => setIsOpen(false)} className="p-1 hover:bg-primary-foreground/20 rounded-lg transition-colors">
                  <X className="h-5 w-5" />
                </button>
              </div>

              {/* Content */}
              <div className="flex-1 overflow-y-auto p-4 space-y-3">
                <p className="text-sm font-medium text-card-foreground flex items-center gap-2">
                  <HelpCircle className="h-4 w-4 text-primary" />
                  Frequently Asked Questions
                </p>

                {faqs.map((faq, i) => (
                  <div key={i} className="border border-border rounded-xl overflow-hidden">
                    <button
                      onClick={() => setSelectedFaq(selectedFaq === i ? null : i)}
                      className="w-full flex items-center gap-3 p-3 text-left hover:bg-muted/50 transition-colors"
                    >
                      <faq.icon className="h-4 w-4 text-primary shrink-0" />
                      <span className="text-sm font-medium text-card-foreground flex-1">{faq.q}</span>
                      <ChevronRight className={`h-4 w-4 text-muted-foreground transition-transform ${selectedFaq === i ? 'rotate-90' : ''}`} />
                    </button>
                    <AnimatePresence>
                      {selectedFaq === i && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          className="overflow-hidden"
                        >
                          <p className="px-3 pb-3 text-sm text-muted-foreground">{faq.a}</p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ))}

                <div className="border-t border-border pt-3 mt-3 space-y-2">
                  <p className="text-xs font-medium text-muted-foreground">Still need help?</p>
                  <a href="tel:+918147850160" className="flex items-center gap-3 p-3 rounded-xl bg-primary/5 border border-primary/20 hover:bg-primary/10 transition-colors">
                    <Phone className="h-4 w-4 text-primary" />
                    <div>
                      <span className="text-sm font-medium text-card-foreground">Call Us</span>
                      <p className="text-xs text-muted-foreground">+91 81478 50160</p>
                    </div>
                  </a>
                  <a href="mailto:support@powernova.in" className="flex items-center gap-3 p-3 rounded-xl bg-primary/5 border border-primary/20 hover:bg-primary/10 transition-colors">
                    <Mail className="h-4 w-4 text-primary" />
                    <div>
                      <span className="text-sm font-medium text-card-foreground">Email Support</span>
                      <p className="text-xs text-muted-foreground">support@powernova.in</p>
                    </div>
                  </a>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default CustomerHelp;
