import { Zap } from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-secondary text-secondary-foreground">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
          <div>
            <Link to="/" className="flex items-center gap-2 mb-4">
              <Zap className="h-6 w-6 text-primary" />
              <span className="text-xl font-logo font-bold tracking-wider">POWERNOVA</span>
            </Link>
            <p className="text-sm text-secondary-foreground/60 mb-3">
              Your everything superstore. Electronics, groceries, fashion & more — delivered in minutes.
            </p>
            <p className="text-xs text-primary font-heading font-semibold">
              Founded by CHANDAN & PREETHAM
            </p>
          </div>
          {[
            { title: "Electronics", links: [
              { name: "Smartphones", to: "/?category=smartphones" },
              { name: "Laptops", to: "/?category=laptops" },
              { name: "Headphones", to: "/?category=headphones" },
              { name: "Gaming", to: "/?category=gaming" },
            ]},
            { title: "Fashion", links: [
              { name: "Clothes", to: "/?category=clothes" },
              { name: "Girls Wear", to: "/?category=girlswear" },
              { name: "Underwear", to: "/?category=underwear" },
              { name: "Shoes", to: "/?category=shoes" },
            ]},
            { title: "Essentials", links: [
              { name: "Groceries", to: "/?category=groceries" },
              { name: "Skincare", to: "/?category=skincare" },
              { name: "Baby Products", to: "/?category=babyproducts" },
              { name: "POWERNOVA Cafe", to: "/?category=cafe" },
            ]},
            { title: "Help", links: [
              { name: "Track Order", to: "/checkout" },
              { name: "Returns", to: "#" },
              { name: "FAQs", to: "#" },
              { name: "Contact Us", to: "#" },
            ]},
          ].map((section) => (
            <div key={section.title}>
              <h4 className="font-heading font-semibold mb-4">{section.title}</h4>
              <ul className="space-y-2">
                {section.links.map((link) => (
                  <li key={link.name}>
                    <Link to={link.to} className="text-sm text-secondary-foreground/60 hover:text-primary transition-colors">
                      {link.name}
                    </Link>
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
