import { Star } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import useScrollAnimation from "@/hooks/useScrollAnimation";

const reviews = [
  { name: "Sana B.", city: "Tunis", text: "Qualité incroyable ! Le mandala doré est magnifique dans mon salon. Je recommande à 100%.", rating: 5 },
  { name: "Mohamed K.", city: "Sousse", text: "Livraison rapide et produit conforme. L'installation était super facile. Merci !", rating: 5 },
  { name: "Amira T.", city: "Sfax", text: "J'ai offert l'arbre de vie à ma sœur pour son mariage. Elle était ravie ! Parfait.", rating: 5 },
  { name: "Youssef M.", city: "Nabeul", text: "Design moderne et élégant. La qualité Alucobond se voit tout de suite. Très satisfait.", rating: 4 },
];

const TOTAL_REVIEWS = 127;
const AVERAGE_RATING = 4.9;

// Counter animation hook
const useCounter = (target: number, isVisible: boolean, duration = 1500) => {
  const [count, setCount] = useState(0);
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (!isVisible || hasAnimated.current) return;
    hasAnimated.current = true;

    const startTime = performance.now();
    const animate = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.round(eased * target));
      if (progress < 1) requestAnimationFrame(animate);
    };
    requestAnimationFrame(animate);
  }, [isVisible, target, duration]);

  return count;
};

const SocialProof = () => {
  const { ref: statsRef, isVisible: statsVisible } = useScrollAnimation({ threshold: 0.2 });
  const { ref: cardsRef, isVisible: cardsVisible } = useScrollAnimation({ threshold: 0.05 });

  const reviewCount = useCounter(TOTAL_REVIEWS, statsVisible);
  const orderCount = useCounter(500, statsVisible);

  return (
    <section className="py-24 md:py-32">
      <div className="container">

        {/* Header */}
        <div
          ref={statsRef}
          className="text-center mb-12 transition-all duration-700"
          style={{
            opacity: statsVisible ? 1 : 0,
            transform: statsVisible ? "translateY(0)" : "translateY(28px)",
          }}
        >
          <p className="text-[11px] font-medium uppercase tracking-[0.3em] text-muted-foreground mb-3">Témoignages</p>
          <h2 className="font-heading text-2xl md:text-3xl font-normal text-foreground mb-6">Ce Que Disent Nos Clients</h2>

          {/* Animated stats */}
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
              <p className="font-heading text-3xl font-normal text-foreground">{reviewCount}</p>
              <p className="text-[10px] text-muted-foreground uppercase tracking-wider mt-1">Avis clients</p>
            </div>
            <div className="w-px h-10 bg-border" />
            <div className="text-center">
              <p className="font-heading text-3xl font-normal text-foreground">{orderCount}+</p>
              <p className="text-[10px] text-muted-foreground uppercase tracking-wider mt-1">Commandes</p>
            </div>
          </div>
        </div>

        {/* Review cards */}
        <div ref={cardsRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {reviews.map((r, i) => (
            <div
              key={r.name}
              className="text-center border border-border p-6 md:p-8 rounded-sm transition-all duration-700"
              style={{
                opacity: cardsVisible ? 1 : 0,
                transform: cardsVisible ? "translateY(0)" : "translateY(32px)",
                transitionDelay: `${i * 120}ms`,
              }}
            >
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
};

export default SocialProof;
