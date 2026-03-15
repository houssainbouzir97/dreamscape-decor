import Header from "@/components/Header";
import Footer from "@/components/Footer";
import useSEO from "@/hooks/useSEO";

const About = () => {
  useSEO({
    title: "À Propos – Dreamscape Decor | Startup Tunisienne",
    description: "Dreamscape Decor est une startup tunisienne fondée en 2024. Nous créons des décorations murales en métal Alucobond premium, fabriquées en Tunisie.",
  });

  return (
    <>
      <Header />
      <main className="py-16 md:py-24">
        <div className="container max-w-2xl">
          <p className="text-[10px] font-medium uppercase tracking-[0.3em] text-muted-foreground mb-3">Notre Histoire</p>
          <h1 className="font-heading text-3xl md:text-4xl font-normal text-foreground mb-10">À Propos de Dreamscape Decor</h1>

          <div className="space-y-6">
            <p className="text-sm text-muted-foreground leading-relaxed">
              Dreamscape Decor est née d'une passion pour le design et la décoration d'intérieur.
              Startup tunisienne fondée en 2024, nous créons des pièces de décoration murale en métal
              Alucobond qui transforment les espaces de vie en véritables œuvres d'art.
            </p>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Chaque pièce est conçue et fabriquée en Tunisie avec un souci du détail et de la qualité.
              Nous utilisons l'Alucobond, un matériau composite aluminium haut de gamme, reconnu pour
              sa légèreté, sa durabilité et sa résistance aux UV.
            </p>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Notre mission est simple : rendre la décoration murale premium accessible à tous les
              Tunisiens, des jeunes mariés aux passionnés de design, en passant par les propriétaires
              de bureaux qui veulent un espace inspirant.
            </p>

            <div className="grid grid-cols-3 gap-8 py-12 border-t border-b border-border">
              <div className="text-center">
                <p className="font-heading text-2xl font-normal text-foreground">500+</p>
                <p className="text-[10px] text-muted-foreground uppercase tracking-wider mt-1">Clients satisfaits</p>
              </div>
              <div className="text-center">
                <p className="font-heading text-2xl font-normal text-foreground">24</p>
                <p className="text-[10px] text-muted-foreground uppercase tracking-wider mt-1">Gouvernorats livrés</p>
              </div>
              <div className="text-center">
                <p className="font-heading text-2xl font-normal text-foreground">100%</p>
                <p className="text-[10px] text-muted-foreground uppercase tracking-wider mt-1">Made in Tunisia</p>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default About;
