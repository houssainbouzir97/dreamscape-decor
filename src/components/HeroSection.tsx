import { Link } from "react-router-dom";
import heroImg from "@/assets/hero-living-room.png";

const HeroSection = () => (
  <section className="relative overflow-hidden">
    <div className="relative h-[90vh] md:h-[95vh] overflow-hidden">
      <img
        src={heroImg}
        alt="Décoration murale en métal dans un salon moderne — Dreamscape Decor Tunisie"
        className="w-full h-full object-cover object-top animate-hero-zoom"
        loading="eager"
        fetchPriority="high"
        width={1920}
        height={1080}
        sizes="(max-width: 768px) 100vw, 100vw"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/30 to-transparent" />
    </div>

    <div className="absolute inset-x-0 bottom-0 pb-10 md:pb-16">
      <div className="text-center px-6 max-w-2xl mx-auto">
        <p className="text-[11px] font-medium uppercase tracking-[0.35em] text-muted-foreground mb-5 animate-fade-up">
          Décoration Murale Premium — Tunisie
        </p>
        <h1 className="font-heading text-4xl md:text-6xl lg:text-7xl font-normal text-foreground leading-[1.1] mb-7 animate-fade-up-delay tracking-[0.04em]">
          Élevez vos murs
        </h1>
        <p className="text-base md:text-lg text-muted-foreground leading-relaxed mb-10 animate-fade-up-delay-2 max-w-lg mx-auto">
          Art mural en métal Alucobond — intérieur et extérieur. Livraison partout en Tunisie.
        </p>
        <div className="animate-fade-up-delay-3">
          <Link
            to="/produits"
            className="inline-flex items-center justify-center px-14 py-4 bg-accent text-accent-foreground font-medium text-xs tracking-[0.18em] uppercase rounded-sm hover:opacity-90 transition-all duration-300 active:scale-[0.98]"
          >
            Découvrir la Collection
          </Link>
        </div>
      </div>
    </div>
  </section>
);

export default HeroSection;
