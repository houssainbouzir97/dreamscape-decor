import { Star } from "lucide-react";

const reviews = [
  { name: "Sana B.", city: "Tunis", text: "Qualité incroyable ! Le mandala doré est magnifique dans mon salon. Je recommande à 100%.", rating: 5 },
  { name: "Mohamed K.", city: "Sousse", text: "Livraison rapide et produit conforme. L'installation était super facile. Merci !", rating: 5 },
  { name: "Amira T.", city: "Sfax", text: "J'ai offert l'arbre de vie à ma sœur pour son mariage. Elle était ravie ! Parfait.", rating: 5 },
  { name: "Youssef M.", city: "Nabeul", text: "Design moderne et élégant. La qualité Alucobond se voit tout de suite. Très satisfait.", rating: 4 },
];

const TOTAL_REVIEWS = 127;
const AVERAGE_RATING = 4.9;

const SocialProof = () => (
  <section className="py-24 md:py-32">
    <div className="container">

      {/* Header with stats */}
      <div className="text-center mb-16">
        <p className="text-[11px] font-medium uppercase tracking-[0.3em] text-muted-foreground mb-3">Témoignages</p>
        <h2 className="font-heading text-2xl md:text-3xl font-normal text-foreground mb-6">Ce Que Disent Nos Clients</h2>

        {/* Rating summary */}
        <div className="inline-flex items-center gap-6 bg-secondary/50 px-8 py-4 rounded-sm">
          <div className="text-center">
            <p className="font-heading text-3xl font-normal text-foreground">{AVERAGE_RATING}</p>
            <div className="flex gap-0.5 justify-center mt-1">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className="w-3 h-3 fill-gold text-gold" />
              ))}
            </div>
          </div>
          <div className="w-px h-10 bg-border" />
          <div className="text-center">
            <p className="font-heading text-3xl font-normal text-foreground">{TOTAL_REVIEWS}</p>
            <p className="text-[10px] text-muted-foreground uppercase tracking-wider mt-1">Avis clients</p>
          </div>
          <div className="w-px h-10 bg-border" />
          <div className="text-center">
            <p className="font-heading text-3xl font-normal text-foreground">500+</p>
            <p className="text-[10px] text-muted-foreground uppercase tracking-wider mt-1">Commandes</p>
          </div>
        </div>
      </div>

      {/* Review cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
        {reviews.map((r) => (
          <div key={r.name} className="text-center border border-border p-6 md:p-8 rounded-sm">
            <div className="flex gap-0.5 justify-center mb-5">
              {Array.from({ length: r.rating }).map((_, i) => (
                <Star key={i} className="w-3.5 h-3.5 fill-gold text-gold" />
              ))}
            </div>
            <p className="text-sm text-foreground leading-relaxed mb-6 italic">"{r.text}"</p>
            <p className="text-xs font-medium text-foreground uppercase tracking-wider">{r.name}</p>
            <p className="text-[11px] text-muted-foreground mt-1">{r.city}</p>
          </div>
        ))}
      </div>

    </div>
  </section>
);

export default SocialProof;
