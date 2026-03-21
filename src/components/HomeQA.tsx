import { useState } from "react";
import { Link } from "react-router-dom";
import { ChevronDown } from "lucide-react";

const qaItems = [
  {
    q: "Qu'est-ce que la décoration murale en métal Alucobond ?",
    a: "L'Alucobond est un panneau composite aluminium ultra-résistant utilisé dans l'architecture et la construction. En décoration murale, il permet de créer des tableaux découpés au laser avec une précision et une durabilité impossibles à atteindre avec d'autres matériaux. Résistant aux UV et aux intempéries, il convient aussi bien pour l'intérieur que l'extérieur.",
    link: { label: "En savoir plus sur l'Alucobond", to: "/blog/alucobond-materiau-decoration-murale" },
  },
  {
    q: "Où acheter de la décoration murale en métal en Tunisie ?",
    a: "Dreamscape Decor est la première boutique en ligne tunisienne spécialisée en art mural Alucobond. Nous proposons 22 designs exclusifs — nature, abstrait, islamique — avec livraison COD dans les 24 gouvernorats de Tunisie sous 3 à 5 jours ouvrables.",
    link: { label: "Découvrir la collection", to: "/produits" },
  },
  {
    q: "Les tableaux muraux en métal résistent-ils à l'extérieur en Tunisie ?",
    a: "Oui. L'Alucobond est conçu pour les conditions extérieures les plus exigeantes — résistant aux UV, à l'humidité et aux variations de température. Il est parfait pour une terrasse, un jardin, une façade ou tout espace commercial extérieur. Durée de vie estimée : 15 à 25 ans.",
    link: { label: "Guide décoration extérieure", to: "/blog/decoration-murale-exterieure-metal-tunisie" },
  },
  {
    q: "Comment choisir la bonne taille de tableau mural pour son salon ?",
    a: "La règle des deux tiers : votre tableau doit occuper 60 à 75% de la largeur du meuble en dessous. Pour un canapé de 2 mètres, optez pour un format entre 110 et 150 cm. Le centre du tableau doit être à 150-160 cm du sol. En cas de doute, choisissez toujours le format supérieur.",
    link: { label: "Guide des tailles", to: "/blog/choisir-taille-tableau-mural" },
  },
  {
    q: "Quel tableau mural choisir comme cadeau de mariage en Tunisie ?",
    a: "Un tableau mural en métal est le cadeau de mariage idéal — unique, durable, et utile pour le nouveau foyer. Pour un couple romantique : Kissing Silhouette. Pour un couple traditionnel : la Khomssa. Pour un couple moderne : Geometric Shapes ou Ethereal Muse. Livraison possible directement chez les mariés.",
    link: { label: "Idées cadeaux mariage", to: "/blog/cadeau-mariage-original-tunisie" },
  },
];

// Schema for Google AI Overview
const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": qaItems.map(item => ({
    "@type": "Question",
    "name": item.q,
    "acceptedAnswer": {
      "@type": "Answer",
      "text": item.a,
    },
  })),
};

const HomeQA = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="py-20 md:py-28 border-t border-border">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <div className="container max-w-3xl">
        <div className="text-center mb-12">
          <p className="text-[11px] font-medium uppercase tracking-[0.3em] text-muted-foreground mb-4">
            Questions Fréquentes
          </p>
          <h2 className="font-heading text-2xl md:text-3xl font-normal text-foreground mb-4">
            Tout ce que vous devez savoir
          </h2>
          <div className="w-16 h-0.5 bg-gold mx-auto" />
        </div>

        <div className="space-y-2">
          {qaItems.map((item, i) => (
            <div key={i} className="border border-border rounded-sm overflow-hidden">
              <button
                className="w-full text-left px-6 py-5 flex items-start justify-between gap-4 hover:bg-secondary/30 transition-colors"
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                aria-expanded={openIndex === i}
              >
                <span className="text-sm font-medium text-foreground leading-snug">
                  {item.q}
                </span>
                <ChevronDown
                  className={`w-4 h-4 text-muted-foreground flex-shrink-0 mt-0.5 transition-transform duration-200 ${openIndex === i ? "rotate-180" : ""}`}
                  strokeWidth={1.5}
                />
              </button>

              {openIndex === i && (
                <div className="px-6 pb-5">
                  <p className="text-sm text-muted-foreground leading-[1.8] mb-3">
                    {item.a}
                  </p>
                  {item.link && (
                    <Link
                      to={item.link.to}
                      className="text-xs text-gold font-medium uppercase tracking-wider hover:opacity-80 transition-opacity"
                    >
                      {item.link.label} →
                    </Link>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="text-center mt-10">
          <Link
            to="/faq"
            className="text-xs text-muted-foreground uppercase tracking-wider hover:text-foreground transition-colors"
          >
            Voir toutes les questions →
          </Link>
        </div>
      </div>
    </section>
  );
};

export default HomeQA;
