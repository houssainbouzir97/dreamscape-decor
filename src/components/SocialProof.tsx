import { Star } from "lucide-react";

const reviews = [
  { name: "Sana B.", city: "Tunis", text: "Qualité incroyable ! Le mandala doré est magnifique dans mon salon. Je recommande à 100%.", rating: 5 },
  { name: "Mohamed K.", city: "Sousse", text: "Livraison rapide et produit conforme. L'installation était super facile. Merci !", rating: 5 },
  { name: "Amira T.", city: "Sfax", text: "J'ai offert l'arbre de vie à ma sœur pour son mariage. Elle était ravie ! Parfait.", rating: 5 },
  { name: "Youssef M.", city: "Nabeul", text: "Design moderne et élégant. La qualité Alucobond se voit tout de suite. Très satisfait.", rating: 4 },
];

const SocialProof = () => (
  <section className="py-24 md:py-32">
    <div className="container">
      <div className="text-center mb-16">
        <p className="text-[11px] font-medium uppercase tracking-[0.3em] text-muted-foreground mb-3">Témoignages</p>
        <h2 className="font-heading text-2xl md:text-3xl font-normal text-foreground">Ce Que Disent Nos Clients</h2>
      </div>
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
