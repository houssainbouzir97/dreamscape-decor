import Header from "@/components/Header";
import Footer from "@/components/Footer";
import useSEO from "@/hooks/useSEO";
import about1 from "@/assets/about-1.jpg";
import about2 from "@/assets/about-2.jpg";
import about3 from "@/assets/about-3.jpg";
import about4 from "@/assets/about-4.jpg";

const About = () => {
  useSEO({
    title: "Notre Histoire | Décoration Tunisienne Métal – Dreamscape Decor",
    description: "Marque tunisienne spécialisée en art mural métal. 500+ clients satisfaits dans les 24 gouvernorats. Découvrez qui nous sommes et notre vision.",
    canonical: "/a-propos",
  });

  return (
    <>
      <Header />
      <main>
        {/* Hero */}
        <section className="relative h-[60vh] overflow-hidden">
          <img
            src={about3}
            alt="Décoration murale Dreamscape Decor dans un salon tunisien moderne"
            className="w-full h-full object-cover object-center"
            width={1920}
            height={1080}
            loading="eager"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
          <div className="absolute inset-x-0 bottom-0 pb-12 text-center">
            <p className="text-[11px] font-medium uppercase tracking-[0.3em] text-muted-foreground mb-3">Notre Histoire</p>
            <h1 className="font-heading text-3xl md:text-4xl font-normal text-foreground">À Propos de Dreamscape Decor</h1>
          </div>
        </section>

        {/* Story section 1 */}
        <section className="py-20 md:py-28">
          <div className="container max-w-6xl">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20 items-center">
              <div>
                <p className="text-[11px] font-medium uppercase tracking-[0.3em] text-muted-foreground mb-4">Art Islamique</p>
                <h2 className="font-heading text-2xl md:text-3xl font-normal text-foreground mb-6 leading-snug">
                  Inspiré de la culture tunisienne
                </h2>
                <p className="text-muted-foreground leading-[1.8] mb-4">
                  Nos designs s'inspirent de l'art islamique, de la calligraphie et de la culture tunisienne. Des pièces qui racontent une histoire et apportent une âme à votre intérieur.
                </p>
                <p className="text-muted-foreground leading-[1.8]">
                  Chaque création est pensée pour transformer un simple mur en une œuvre d'art — que ce soit dans votre salon, votre chambre, votre bureau ou votre café.
                </p>
              </div>
              <div className="overflow-hidden rounded-sm">
                <img
                  src={about1}
                  alt="Bismillah décoration murale islamique métal dans un salon tunisien"
                  className="w-full object-cover hover:scale-[1.03] transition-transform duration-700"
                  width={800}
                  height={600}
                  loading="lazy"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Story section 2 */}
        <section className="py-20 md:py-28 bg-secondary/40">
          <div className="container max-w-6xl">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20 items-center">
              <div className="overflow-hidden rounded-sm md:order-first order-last">
                <img
                  src={about2}
                  alt="Birds of Life tableau mural métal dans un salon moderne"
                  className="w-full object-cover hover:scale-[1.03] transition-transform duration-700"
                  width={800}
                  height={600}
                  loading="lazy"
                />
              </div>
              <div>
                <p className="text-[11px] font-medium uppercase tracking-[0.3em] text-muted-foreground mb-4">Art Naturel</p>
                <h2 className="font-heading text-2xl md:text-3xl font-normal text-foreground mb-6 leading-snug">
                  La nature au cœur du design
                </h2>
                <p className="text-muted-foreground leading-[1.8] mb-4">
                  Oiseaux, arbres, couchers de soleil — nos motifs naturels apportent sérénité et élégance à tous les styles d'intérieur, du moderne au classique.
                </p>
                <p className="text-muted-foreground leading-[1.8]">
                  Fabriqués en Alucobond, nos tableaux résistent aux UV et aux intempéries — parfaits aussi bien pour l'intérieur que pour l'extérieur.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Stats band */}
        <section className="py-16 md:py-20 border-y border-border">
          <div className="container">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              {[
                ["500+", "Commandes livrées"],
                ["24", "Gouvernorats couverts"],
                ["22", "Designs exclusifs"],
                ["4.9/5", "Satisfaction client"],
              ].map(([num, label]) => (
                <div key={label}>
                  <p className="font-heading text-3xl md:text-4xl font-normal text-foreground mb-2">{num}</p>
                  <p className="text-xs text-muted-foreground uppercase tracking-wider">{label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Photo grid */}
        <section className="py-20 md:py-28">
          <div className="container max-w-6xl">
            <div className="text-center mb-14">
              <p className="text-[11px] font-medium uppercase tracking-[0.3em] text-muted-foreground mb-4">Chez Nos Clients</p>
              <h2 className="font-heading text-2xl md:text-3xl font-normal text-foreground">Dans Vos Intérieurs</h2>
              <div className="w-16 h-0.5 bg-gold mx-auto mt-5" />
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {[
                { src: about1, alt: "Décoration islamique métal dans un salon doré tunisien" },
                { src: about2, alt: "Art mural oiseaux métal dans un salon moderne" },
                { src: about3, alt: "Sunset of Freedom tableau métal dans un salon contemporain" },
                { src: about4, alt: "Décoration murale métal dans une chambre moderne tunisienne" },
              ].map((photo, i) => (
                <div key={i} className="overflow-hidden rounded-sm" style={{ aspectRatio: i % 2 === 0 ? "3/4" : "3/3.5" }}>
                  <img
                    src={photo.src}
                    alt={photo.alt}
                    className="w-full h-full object-cover object-top hover:scale-[1.04] transition-transform duration-700"
                    width={400}
                    height={500}
                    loading="lazy"
                  />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 bg-accent text-accent-foreground text-center">
          <div className="container max-w-xl">
            <h2 className="font-heading text-2xl md:text-3xl font-normal mb-6">Prêt à transformer vos murs ?</h2>
            <a
              href="/produits"
              className="inline-flex items-center px-10 py-4 border border-accent-foreground/20 text-accent-foreground text-xs font-medium uppercase tracking-[0.18em] hover:bg-accent-foreground/5 transition-colors"
            >
              Découvrir la Collection
            </a>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default About;
