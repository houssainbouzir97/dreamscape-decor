import Header from "@/components/Header";
import Footer from "@/components/Footer";
import useSEO from "@/hooks/useSEO";
import about1 from "@/assets/about-1.jpg";
import about2 from "@/assets/about-2.jpg";
import about3 from "@/assets/about-3.jpg";
import about4 from "@/assets/about-4.jpg";

const About = () => {
  useSEO({
    title: "À Propos – Dreamscape Decor | Startup Tunisienne",
    description: "Dreamscape Decor est une startup tunisienne fondée en 2024. Nous créons des décorations murales en métal Alucobond premium, fabriquées en Tunisie.",
  });

  return (
    <>
      <Header />
      <main>

        {/* Hero photo */}
        <div className="relative h-[55vh] md:h-[65vh] overflow-hidden">
          <img
            src={about2}
            alt="Kissing Silhouette – Dreamscape Decor"
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-background/20 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 pb-10 md:pb-14 text-center">
            <p className="text-[10px] font-medium uppercase tracking-[0.35em] text-muted-foreground mb-3">
              Notre Histoire
            </p>
            <h1 className="font-heading text-3xl md:text-5xl font-normal text-foreground">
              À Propos de Dreamscape Decor
            </h1>
          </div>
        </div>

        {/* Brand story text */}
        <section className="py-20 md:py-28">
          <div className="container max-w-2xl text-center">
            <p className="text-base md:text-lg text-muted-foreground leading-[1.85]">
              Dreamscape Decor est née d'une passion pour le design et la décoration d'intérieur.
              Startup tunisienne fondée en 2024, nous créons des pièces de décoration murale en métal
              Alucobond qui transforment les espaces de vie en véritables œuvres d'art.
            </p>
            <div className="w-16 h-0.5 bg-gold mx-auto mt-10" />
          </div>
        </section>

        {/* Photo grid */}
        <section className="pb-20 md:pb-28">
          <div className="container">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-5">

              {/* Large left photo */}
              <div className="md:col-span-2 aspect-[4/3] overflow-hidden rounded-sm">
                <img
                  src={about3}
                  alt="Sunset of Freedom dans un salon tunisien"
                  className="w-full h-full object-cover hover:scale-[1.03] transition-transform duration-700 ease-out"
                />
              </div>

              {/* Right column — 2 stacked photos */}
              <div className="flex flex-col gap-4 md:gap-5">
                <div className="aspect-[4/3] overflow-hidden rounded-sm">
                  <img
                    src={about1}
                    alt="Birds of Life dans un salon moderne"
                    className="w-full h-full object-cover hover:scale-[1.03] transition-transform duration-700 ease-out"
                  />
                </div>
                <div className="aspect-[4/3] overflow-hidden rounded-sm">
                  <img
                    src={about4}
                    alt="Start with Bismillah – décoration murale islamique"
                    className="w-full h-full object-cover hover:scale-[1.03] transition-transform duration-700 ease-out"
                  />
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* Mission text */}
        <section className="py-20 md:py-28 bg-neutral-warm">
          <div className="container max-w-3xl">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20 items-center">
              <div>
                <p className="text-[10px] font-medium uppercase tracking-[0.3em] text-muted-foreground mb-4">
                  Notre Mission
                </p>
                <h2 className="font-heading text-2xl md:text-3xl font-normal text-foreground mb-6 leading-snug">
                  Rendre le premium accessible à tous
                </h2>
                <p className="text-sm text-muted-foreground leading-[1.85]">
                  Notre mission est simple : rendre la décoration murale premium accessible à tous les
                  Tunisiens, des jeunes mariés aux passionnés de design, en passant par les propriétaires
                  de bureaux qui veulent un espace inspirant.
                </p>
              </div>
              <div>
                <p className="text-[10px] font-medium uppercase tracking-[0.3em] text-muted-foreground mb-4">
                  Notre Matériau
                </p>
                <h2 className="font-heading text-2xl md:text-3xl font-normal text-foreground mb-6 leading-snug">
                  L'Alucobond, le meilleur du métal
                </h2>
                <p className="text-sm text-muted-foreground leading-[1.85]">
                  Nous utilisons l'Alucobond, un matériau composite aluminium haut de gamme, reconnu pour
                  sa légèreté, sa durabilité et sa résistance aux UV. Chaque pièce est conçue et
                  fabriquée en Tunisie avec un souci du détail.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Stats */}
        <section className="py-20 md:py-28">
          <div className="container max-w-2xl">
            <div className="grid grid-cols-3 gap-8 text-center">
              <div>
                <p className="font-heading text-3xl md:text-4xl font-normal text-foreground mb-2">500+</p>
                <div className="w-8 h-0.5 bg-gold mx-auto mb-3" />
                <p className="text-[10px] text-muted-foreground uppercase tracking-wider leading-relaxed">Clients satisfaits</p>
              </div>
              <div>
                <p className="font-heading text-3xl md:text-4xl font-normal text-foreground mb-2">24</p>
                <div className="w-8 h-0.5 bg-gold mx-auto mb-3" />
                <p className="text-[10px] text-muted-foreground uppercase tracking-wider leading-relaxed">Gouvernorats livrés</p>
              </div>
              <div>
                <p className="font-heading text-3xl md:text-4xl font-normal text-foreground mb-2">100%</p>
                <div className="w-8 h-0.5 bg-gold mx-auto mb-3" />
                <p className="text-[10px] text-muted-foreground uppercase tracking-wider leading-relaxed">Made in Tunisia</p>
              </div>
            </div>
          </div>
        </section>

      </main>
      <Footer />
    </>
  );
};

export default About;
