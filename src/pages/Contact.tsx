import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Phone, Mail, MapPin, MessageCircle } from "lucide-react";
import useSEO from "@/hooks/useSEO";

const Contact = () => {
  useSEO({
    title: "Contact – Dreamscape Decor | WhatsApp & Téléphone",
    description: "Contactez Dreamscape Decor par WhatsApp, téléphone ou email. Réponse rapide en moins d'1h. Basés à Sousse, livraison partout en Tunisie.",
  });

  return (
    <>
      <Header />
      <main className="py-16 md:py-24">
        <div className="container max-w-2xl">
          <p className="text-[10px] font-medium uppercase tracking-[0.3em] text-muted-foreground mb-3">Contactez-nous</p>
          <h1 className="font-heading text-3xl md:text-4xl font-normal text-foreground mb-10">Nous Sommes À Votre Écoute</h1>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <a href="https://wa.me/21655137598" target="_blank" rel="noopener noreferrer" className="p-6 border border-border hover:border-foreground transition-colors flex items-start gap-4">
              <MessageCircle className="w-4 h-4 text-muted-foreground mt-0.5" strokeWidth={1.5} />
              <div>
                <h3 className="text-sm font-medium text-foreground mb-1">WhatsApp</h3>
                <p className="text-xs text-muted-foreground">Réponse rapide en moins d'1h</p>
              </div>
            </a>

            <a href="tel:+21655137598" className="p-6 border border-border hover:border-foreground transition-colors flex items-start gap-4">
              <Phone className="w-4 h-4 text-muted-foreground mt-0.5" strokeWidth={1.5} />
              <div>
                <h3 className="text-sm font-medium text-foreground mb-1">Téléphone</h3>
                <p className="text-xs text-muted-foreground">+216 55 137 598</p>
              </div>
            </a>

            <a href="mailto:dreamscapedecor.art@gmail.com" className="p-6 border border-border hover:border-foreground transition-colors flex items-start gap-4">
              <Mail className="w-4 h-4 text-muted-foreground mt-0.5" strokeWidth={1.5} />
              <div>
                <h3 className="text-sm font-medium text-foreground mb-1">Email</h3>
                <p className="text-xs text-muted-foreground">dreamscapedecor.art@gmail.com</p>
              </div>
            </a>

            <div className="p-6 border border-border flex items-start gap-4">
              <MapPin className="w-4 h-4 text-muted-foreground mt-0.5" strokeWidth={1.5} />
              <div>
                <h3 className="text-sm font-medium text-foreground mb-1">Adresse</h3>
                <p className="text-xs text-muted-foreground">Sousse, Tunisie</p>
              </div>
            </div>
          </div>

          <div className="mt-12 flex gap-4 justify-center">
            <a href="https://www.facebook.com/DreamscapeDecor.art/" target="_blank" rel="noopener noreferrer" className="px-6 py-3 border border-border text-xs font-medium text-muted-foreground uppercase tracking-wider hover:border-foreground hover:text-foreground transition-colors">
              Facebook
            </a>
            <a href="https://www.instagram.com/dreamscapedecor.art/" target="_blank" rel="noopener noreferrer" className="px-6 py-3 border border-border text-xs font-medium text-muted-foreground uppercase tracking-wider hover:border-foreground hover:text-foreground transition-colors">
              Instagram
            </a>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default Contact;
