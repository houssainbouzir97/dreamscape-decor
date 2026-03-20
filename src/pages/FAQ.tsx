import Header from "@/components/Header";
import Footer from "@/components/Footer";
import useSEO from "@/hooks/useSEO";
import { useState } from "react";
import { ChevronDown } from "lucide-react";

const faqs = [
  {
    q: "Vos tableaux peuvent-ils être utilisés en extérieur ?",
    a: "Oui, absolument. Nos tableaux sont fabriqués en Alucobond — un panneau composite aluminium résistant aux UV et aux intempéries. Ils conviennent parfaitement pour une utilisation en extérieur : terrasse, jardin, façade de maison, café ou restaurant.",
  },
  {
    q: "Quelles tailles sont disponibles ?",
    a: "Chaque produit est disponible en plusieurs tailles. Les dimensions varient selon le design — de 40×40 cm pour les petits formats jusqu'à 145×85 cm pour les grands formats. Consultez chaque fiche produit pour voir les tailles disponibles.",
  },
  {
    q: "Comment installer la décoration murale ?",
    a: "L'installation est très simple et prend environ 5 minutes. Un système de fixation est inclus avec chaque commande. Vous n'avez pas besoin d'outils spéciaux. Chaque pièce est livrée avec ses instructions de montage.",
  },
  {
    q: "Quel est le délai de livraison ?",
    a: "Nous livrons dans toute la Tunisie sous 3 à 5 jours ouvrables. La livraison est disponible dans les 24 gouvernorats. Le paiement se fait à la livraison (COD) — vous payez uniquement quand vous recevez votre commande.",
  },
  {
    q: "Est-ce que je peux retourner un produit ?",
    a: "Oui. Vous disposez de 7 jours après réception pour retourner un produit si vous n'êtes pas satisfait. Consultez notre politique de retour pour plus de détails.",
  },
  {
    q: "Quel matériau utilisez-vous ?",
    a: "Tous nos tableaux sont fabriqués en Alucobond — un panneau composite en aluminium ultra-résistant, léger et durable. Ce matériau est résistant aux UV, à l'humidité et aux chocs. Il ne rouille pas et conserve son aspect premium sur le long terme.",
  },
  {
    q: "Proposez-vous des designs pour les cafés et restaurants ?",
    a: "Oui. Nos tableaux en métal Alucobond sont parfaits pour la décoration de cafés, restaurants et espaces commerciaux. Ils sont durables, faciles à nettoyer et disponibles en grands formats. Contactez-nous sur WhatsApp pour une commande professionnelle.",
  },
];

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  useSEO({
    title: "FAQ Décoration Murale Métal – Livraison, Tailles & Extérieur",
    description: "Toutes vos questions sur nos tableaux métal Alucobond : installation, tailles, livraison Tunisie, usage extérieur. Réponses claires et rapides.",
    canonical: "/faq",
  });

  // FAQPage schema
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map(faq => ({
      "@type": "Question",
      "name": faq.q,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.a,
      },
    })),
  };

  return (
    <>
      <Header />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <main className="py-20 md:py-32">
        <div className="container max-w-3xl">
          <div className="text-center mb-16">
            <p className="text-[11px] font-medium uppercase tracking-[0.3em] text-muted-foreground mb-4">Aide</p>
            <h1 className="font-heading text-3xl md:text-4xl font-normal text-foreground mb-4">
              Questions Fréquentes
            </h1>
            <div className="w-16 h-0.5 bg-gold mx-auto" />
          </div>

          <div className="space-y-2">
            {faqs.map((faq, i) => (
              <div key={i} className="border border-border rounded-sm overflow-hidden">
                <button
                  className="w-full text-left px-6 py-5 flex items-center justify-between gap-4 hover:bg-secondary/30 transition-colors"
                  onClick={() => setOpenIndex(openIndex === i ? null : i)}
                >
                  <span className="text-sm font-medium text-foreground">{faq.q}</span>
                  <ChevronDown
                    className={`w-4 h-4 text-muted-foreground flex-shrink-0 transition-transform duration-200 ${openIndex === i ? "rotate-180" : ""}`}
                    strokeWidth={1.5}
                  />
                </button>
                {openIndex === i && (
                  <div className="px-6 pb-5">
                    <p className="text-sm text-muted-foreground leading-[1.8]">{faq.a}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default FAQ;
