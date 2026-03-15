import { Link } from "react-router-dom";
import { Phone, Mail, MapPin } from "lucide-react";
import logoImg from "@/assets/logo.webp";

const Footer = () => (
  <footer className="bg-accent text-accent-foreground border-t border-gold/40">
    <div className="container py-20 md:py-28">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-16">
        <div className="md:col-span-1">
          <img src={logoImg} alt="Dreamscape Decor" className="h-10 w-auto mb-5 brightness-0 invert opacity-80" />
          <p className="text-sm text-accent-foreground/50 leading-[1.8]">
            Art mural en métal raffiné. Qualité premium, design tunisien.
          </p>
        </div>

        <div>
          <h4 className="text-[10px] font-medium uppercase tracking-[0.25em] mb-6 text-accent-foreground/70">Navigation</h4>
          <div className="flex flex-col gap-4">
            <Link to="/produits" className="text-sm text-accent-foreground/45 hover:text-gold-light transition-colors duration-300">Collection</Link>
            <Link to="/a-propos" className="text-sm text-accent-foreground/45 hover:text-gold-light transition-colors duration-300">À Propos</Link>
            <Link to="/faq" className="text-sm text-accent-foreground/45 hover:text-gold-light transition-colors duration-300">FAQ</Link>
            <Link to="/contact" className="text-sm text-accent-foreground/45 hover:text-gold-light transition-colors duration-300">Contact</Link>
          </div>
        </div>

        <div>
          <h4 className="text-[10px] font-medium uppercase tracking-[0.25em] mb-6 text-accent-foreground/70">Contact</h4>
          <div className="flex flex-col gap-4">
            <a href="tel:+21655137598" className="text-sm text-accent-foreground/45 hover:text-accent-foreground/75 transition-colors duration-300 flex items-center gap-2.5">
              <Phone className="w-3.5 h-3.5" strokeWidth={1.3} /> +216 55 137 598
            </a>
            <a href="mailto:dreamscapedecor.art@gmail.com" className="text-sm text-accent-foreground/45 hover:text-accent-foreground/75 transition-colors duration-300 flex items-center gap-2.5">
              <Mail className="w-3.5 h-3.5" strokeWidth={1.3} /> dreamscapedecor.art@gmail.com
            </a>
            <span className="text-sm text-accent-foreground/45 flex items-center gap-2.5">
              <MapPin className="w-3.5 h-3.5" strokeWidth={1.3} /> Sousse, Tunisie
            </span>
          </div>
        </div>

        <div>
          <h4 className="text-[10px] font-medium uppercase tracking-[0.25em] mb-6 text-accent-foreground/70">Réseaux</h4>
          <div className="flex flex-col gap-4">
            <a href="https://www.facebook.com/DreamscapeDecor.art/" target="_blank" rel="noopener noreferrer" className="text-sm text-accent-foreground/45 hover:text-gold-light transition-colors duration-300">Facebook</a>
            <a href="https://www.instagram.com/dreamscapedecor.art/" target="_blank" rel="noopener noreferrer" className="text-sm text-accent-foreground/45 hover:text-gold-light transition-colors duration-300">Instagram</a>
          </div>
        </div>
      </div>

      <div className="border-t border-accent-foreground/8 mt-16 pt-10 text-center">
        <p className="text-[11px] text-accent-foreground/35 tracking-[0.1em]">
          © 2026 Dreamscape Decor. Tous droits réservés. Fabriqué en Tunisie 🇹🇳
        </p>
      </div>
    </div>
  </footer>
);

export default Footer;
