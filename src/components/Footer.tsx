import { Zap } from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-secondary text-secondary-foreground">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div>
            <Link to="/" className="flex items-center gap-2 mb-4">
              <Zap className="h-6 w-6 text-primary" />
              <span className="text-xl font-logo font-bold tracking-wider">POWERNOVA</span>
            </Link>
            <p className="text-sm text-secondary-foreground/60 mb-3">
              Your premium electronics superstore. 100+ gadgets delivered in minutes.
            </p>
            <p className="text-xs text-primary font-heading font-semibold">
              Founded by CHANDAN & PREETHAM
            </p>
          </div>
          {[
            { title: "Shop", links: ["Smartphones", "Laptops", "Headphones", "Cameras"] },
            { title: "Help", links: ["Track Order", "Returns", "FAQs", "Contact Us"] },
            { title: "Company", links: ["About Us", "Careers", "Blog", "Press"] },
          ].map((section) => (
            <div key={section.title}>
              <h4 className="font-heading font-semibold mb-4">{section.title}</h4>
              <ul className="space-y-2">
                {section.links.map((link) => (
                  <li key={link}>
                    <a href="#" className="text-sm text-secondary-foreground/60 hover:text-primary transition-colors">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="border-t border-secondary-foreground/10 mt-10 pt-6 text-center text-sm text-secondary-foreground/40">
          © 2026 POWERNOVA. All rights reserved. | Founded by Chandan & Preetham
        </div>
      </div>
    </footer>
  );
};

export default Footer;
