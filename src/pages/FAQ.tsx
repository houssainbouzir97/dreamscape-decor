import Header from "@/components/Header";
import Footer from "@/components/Footer";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    q: "Quel est le délai de livraison ?",
    a: "La livraison prend entre 3 à 5 jours ouvrables partout en Tunisie. Vous recevrez un appel de confirmation avant la livraison.",
  },
  {
    q: "Comment installer la décoration murale ?",
    a: "Chaque pièce est livrée avec un système de fixation inclus. L'installation prend moins de 5 minutes. Des instructions détaillées sont incluses dans le colis.",
  },
  {
    q: "Quel est le mode de paiement ?",
    a: "Nous proposons le paiement à la livraison (COD). Vous payez en espèces au livreur lors de la réception de votre commande.",
  },
  {
    q: "Qu'est-ce que l'Alucobond ?",
    a: "L'Alucobond est un panneau composite en aluminium haut de gamme. Il est ultra-léger, résistant aux UV et aux intempéries, et offre une finition premium durable.",
  },
  {
    q: "Puis-je retourner un produit ?",
    a: "Oui, vous disposez de 7 jours après réception pour retourner un produit en parfait état. Contactez-nous via WhatsApp pour organiser le retour.",
  },
  {
    q: "Livrez-vous dans toute la Tunisie ?",
    a: "Oui, nous livrons dans les 24 gouvernorats de la Tunisie. Les frais de livraison sont de 8 TND.",
  },
  {
    q: "Proposez-vous des designs personnalisés ?",
    a: "Oui ! Contactez-nous via WhatsApp avec votre idée de design et nous vous enverrons une maquette gratuite avant production.",
  },
];

const FAQ = () => (
  <>
    <Header />
    <main className="py-16 md:py-24">
      <div className="container max-w-2xl">
        <p className="text-[10px] font-medium uppercase tracking-[0.3em] text-muted-foreground mb-3">Support</p>
        <h1 className="font-heading text-3xl md:text-4xl font-normal text-foreground mb-10">Questions Fréquentes</h1>

        <Accordion type="single" collapsible className="space-y-3">
          {faqs.map((faq, i) => (
            <AccordionItem key={i} value={`item-${i}`} className="border border-border px-5">
              <AccordionTrigger className="font-heading text-left font-normal text-foreground hover:no-underline text-sm py-5">
                {faq.q}
              </AccordionTrigger>
              <AccordionContent className="text-sm text-muted-foreground leading-relaxed pb-5">
                {faq.a}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </main>
    <Footer />
  </>
);

export default FAQ;
