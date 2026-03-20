import Header from "@/components/Header";
import Footer from "@/components/Footer";
import useSEO from "@/hooks/useSEO";
import { MessageCircle, Mail, Phone } from "lucide-react";

const Contact = () => {
  useSEO({
    title: "Contact – Décoration Murale Métal Tunisie | Dreamscape Decor",
    description: "Contactez-nous sur WhatsApp ou par email. Livraison COD dans les 24 gouvernorats. Réponse rapide 7j/7.",
    canonical: "/contact",
  });

  return (
    <>
      <Header />
      <main className="py-20 md:py-32">
        <div className="container max-w-3xl">
          <div className="text-center mb-16">
            <p className="text-[11px] font-medium uppercase tracking-[0.3em] text-muted-foreground mb-4">Nous Contacter</p>
            <h1 className="font-heading text-3xl md:text-4xl font-normal text-foreground mb-4">
              Parlons de votre projet
            </h1>
            <div className="w-16 h-0.5 bg-gold mx-auto mb-6" />
            <p className="text-muted-foreground text-sm leading-relaxed max-w-lg mx-auto">
              Une question sur un produit, une commande professionnelle pour votre café ou bureau, ou simplement besoin d'un conseil ? Nous sommes là.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <a
              href="https://wa.me/21600000000"
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col items-center text-center p-8 border border-border rounded-sm hover:border-gold transition-colors duration-300 group"
            >
              <MessageCircle className="w-8 h-8 text-gold mb-4" strokeWidth={1.3} />
              <p className="text-sm font-medium text-foreground mb-1">WhatsApp</p>
              <p className="text-xs text-muted-foreground">Réponse rapide 7j/7</p>
            </a>

            <a
              href="mailto:contact@dreamscapedecor.art"
              className="flex flex-col items-center text-center p-8 border border-border rounded-sm hover:border-gold transition-colors duration-300 group"
            >
              <Mail className="w-8 h-8 text-gold mb-4" strokeWidth={1.3} />
              <p className="text-sm font-medium text-foreground mb-1">Email</p>
              <p className="text-xs text-muted-foreground">contact@dreamscapedecor.art</p>
            </a>

            <div className="flex flex-col items-center text-center p-8 border border-border rounded-sm">
              <Phone className="w-8 h-8 text-gold mb-4" strokeWidth={1.3} />
              <p className="text-sm font-medium text-foreground mb-1">Téléphone</p>
              <p className="text-xs text-muted-foreground">Disponible 7j/7</p>
            </div>
          </div>

          <div className="mt-12 p-6 bg-secondary/40 rounded-sm text-center">
            <p className="text-sm text-muted-foreground leading-relaxed">
              Vous avez un projet de décoration pour votre <strong>café, restaurant ou bureau</strong> ?
              Contactez-nous directement sur WhatsApp pour une offre personnalisée et une commande en gros.
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default Contact;
