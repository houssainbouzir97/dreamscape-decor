import { Link } from "react-router-dom";
import useScrollAnimation from "@/hooks/useScrollAnimation";

const CTASection = () => {
  const { ref, isVisible } = useScrollAnimation({ threshold: 0.2 });

  return (
    <section className="py-32 md:py-44 bg-accent text-accent-foreground">
      <div
        ref={ref}
        className="container text-center max-w-2xl transition-all duration-1000"
        style={{
          opacity: isVisible ? 1 : 0,
          transform: isVisible ? "translateY(0)" : "translateY(36px)",
        }}
      >
        <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-normal mb-8 leading-[1.15] tracking-[0.03em]">
          Sublimez Votre Intérieur
        </h2>
        <p className="text-accent-foreground/45 text-base md:text-lg max-w-lg mx-auto mb-14 leading-relaxed">
          Découvrez notre collection exclusive de décoration murale en métal et transformez votre espace de vie.
        </p>
        <Link
          to="/produits"
          className="inline-flex items-center px-12 py-4 border border-accent-foreground/20 text-accent-foreground text-xs font-medium uppercase tracking-[0.18em] hover:bg-accent-foreground/5 transition-colors duration-300"
        >
          Découvrir la Collection
        </Link>
      </div>
    </section>
  );
};

export default CTASection;
