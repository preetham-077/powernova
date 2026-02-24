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
              <span className="text-xl font-heading font-bold">POWERNOVA</span>
            </Link>
            <p className="text-sm text-secondary-foreground/60">
              Your premium electronics superstore. Top gadgets delivered in minutes at unbeatable prices.
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
          © 2026 POWERNOVA. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
