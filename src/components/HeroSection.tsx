import { Link } from "react-router-dom";
import heroImg from "@/assets/hero-living-room.png";

const HeroSection = () => (
  <section className="relative overflow-hidden">
    <div className="relative">
      <div className="relative h-[90vh] md:h-[95vh] overflow-hidden">
        <img
          src={heroImg}
          alt="Décoration murale en métal dans un salon moderne"
          className="w-full h-full object-cover object-top"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/30 to-transparent" />
      </div>

      <div className="absolute inset-x-0 bottom-0 pb-10 md:pb-16">
        <div className="text-center px-6 max-w-2xl mx-auto">
          <p className="text-[11px] font-medium uppercase tracking-[0.35em] text-muted-foreground mb-5 animate-slide-up">
            Décoration Murale Premium
          </p>
          <h1 className="font-heading text-4xl md:text-6xl lg:text-7xl font-normal text-foreground leading-[1.1] mb-7 animate-slide-up tracking-[0.04em]">
            Élevez vos murs
          </h1>
          <p className="text-base md:text-lg text-muted-foreground leading-relaxed mb-10 animate-slide-up-delay max-w-lg mx-auto">
            Décor mural raffiné pour les intérieurs modernes.
          </p>
          <div className="animate-slide-up-delay-2">
            <Link
              to="/produits"
              className="inline-flex items-center justify-center px-14 py-4.5 bg-accent text-accent-foreground font-medium text-xs tracking-[0.18em] uppercase rounded-sm hover:opacity-90 transition-all duration-300 active:scale-[0.98] active:transition-transform active:duration-150"
            >
              Découvrir la Collection
            </Link>
          </div>
        </div>
      </div>
    </div>
  </section>
);

export default HeroSection;
