import { Truck, Banknote, Wrench, Award } from "lucide-react";
import useScrollAnimation from "@/hooks/useScrollAnimation";

const badges = [
  { icon: Truck, label: "Livraison partout en Tunisie" },
  { icon: Banknote, label: "Paiement à la livraison" },
  { icon: Award, label: "Métal durable et élégant" },
  { icon: Wrench, label: "Installation facile" },
];

const TrustBadges = () => {
  const { ref, isVisible } = useScrollAnimation({ threshold: 0.1 });

  return (
    <section className="py-16 md:py-20 border-b border-border/60" ref={ref}>
      <div className="container max-w-5xl">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 md:gap-16">
          {badges.map((b, i) => (
            <div
              key={b.label}
              className="flex flex-col items-center text-center gap-4 transition-all duration-700"
              style={{
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? "translateY(0)" : "translateY(32px)",
                transitionDelay: `${i * 120}ms`,
              }}
            >
              <div className="w-12 h-12 rounded-full bg-secondary/60 flex items-center justify-center">
                <b.icon className="w-5 h-5 text-gold" strokeWidth={1.3} />
              </div>
              <p className="text-[10px] font-medium text-muted-foreground uppercase tracking-[0.15em] leading-relaxed">
                {b.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrustBadges;
