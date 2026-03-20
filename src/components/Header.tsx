import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, ShoppingBag } from "lucide-react";
import { useCart } from "@/hooks/useCart";
import logo from "@/assets/logo.png";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const { itemCount } = useCart();

  const links = [
    { to: "/", label: "Accueil" },
    { to: "/produits", label: "Collection" },
    { to: "/blog", label: "Blog" },
    { to: "/a-propos", label: "À Propos" },
    { to: "/contact", label: "Contact" },
    { to: "/faq", label: "FAQ" },
  ];

  const isActive = (to: string) => {
    if (to === "/") return location.pathname === "/";
    return location.pathname === to || location.pathname.startsWith(to + "/");
  };

  return (
    <header className="sticky top-0 z-50 bg-background/90 backdrop-blur-md border-b border-border">
      <div className="container flex items-center justify-between h-18 md:h-24">
        <Link to="/" className="flex items-center py-2">
          <img
            src={logo}
            alt="Dreamscape Decor — Décoration murale métal Tunisie"
            className="h-14 sm:h-18 md:h-22 w-auto object-contain"
            width={120}
            height={88}
          />
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-10">
          {links.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className={`text-xs font-medium uppercase tracking-[0.15em] transition-all duration-300 hover:text-gold active:scale-[0.97] active:transition-transform active:duration-150 ${
                isActive(link.to) ? "text-foreground" : "text-muted-foreground"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          <Link to="/panier" className="relative p-2 active:scale-[0.95] transition-transform duration-150">
            <ShoppingBag className="w-5 h-5 text-foreground" strokeWidth={1.5} />
            {itemCount > 0 && (
              <span className="absolute -top-0.5 -right-0.5 w-4 h-4 rounded-full bg-accent text-accent-foreground text-[10px] flex items-center justify-center font-medium">
                {itemCount}
              </span>
            )}
          </Link>

          <button
            className="md:hidden p-2"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Menu"
          >
            {isOpen ? <X className="w-5 h-5" strokeWidth={1.5} /> : <Menu className="w-5 h-5" strokeWidth={1.5} />}
          </button>
        </div>
      </div>

      {/* Mobile Nav */}
      {isOpen && (
        <nav className="md:hidden bg-background border-t border-border animate-slide-up">
          {links.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              onClick={() => setIsOpen(false)}
              className={`block px-6 py-4 text-xs font-medium uppercase tracking-[0.15em] border-b border-border transition-colors ${
                isActive(link.to) ? "text-foreground" : "text-muted-foreground"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
};

export default Header;
