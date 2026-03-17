import Header from "@/components/Header";
import Footer from "@/components/Footer";
import useSEO from "@/hooks/useSEO";
import { Link } from "react-router-dom";
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

        {/* ── HERO ── Full width, tall, with overlay text */}
        <div className="relative h-[70vh] overflow-hidden">
          <img
            src={about3}
            alt="Sunset of Freedom dans un salon"
            className="w-full h-full object-cover object-top"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-black/20 to-black/60" />
          <div className="absolute inset-0 flex flex-col items-center justify-end pb-16 text-center px-6">
            <p className="text-[10px] font-medium uppercase tracking-[0.4em] text-white/70 mb-4">
              Notre Histoire
            </p>
            <h1 className="font-heading text-4xl md:text-6xl font-normal text-white leading-tight max-w-2xl">
              L'art mural qui transforme vos espaces
            </h1>
          </div>
        </div>

        {/* ── INTRO — Full width text with large typography ── */}
        <section className="py-24 md:py-32">
          <div className="container">
            <div className="max-w-4xl mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-24 items-start">
                <div>
                  <p className="text-[10px] font-medium uppercase tracking-[0.3em] text-muted-foreground mb-5">
                    Qui sommes-nous
                  </p>
                  <h2 className="font-heading text-3xl md:text-4xl font-normal text-foreground leading-snug">
                    Dreamscape Decor, né en Tunisie en 2024
                  </h2>
                </div>
                <div className="md:pt-14">
                  <p className="text-base text-muted-foreground leading-[1.9]">
                    Nous créons des pièces de décoration murale en métal Alucobond
                    qui transforment les espaces de vie en véritables œuvres d'art.
                    Chaque pièce est conçue et fabriquée en Tunisie avec un souci
                    du détail et de la qualité.
                  </p>
                  <div className="w-12 h-0.5 bg-gold mt-8" />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── STATS — Full width dark band ── */}
        <section className="bg-accent text-accent-foreground py-16 md:py-20">
          <div className="container">
            <div className="grid grid-cols-3 divide-x divide-accent-foreground/10 max-w-3xl mx-auto">
              <div className="text-center px-8">
                <p className="font-heading text-4xl md:text-5xl font-normal text-accent-foreground mb-3">500+</p>
                <p className="text-[10px] font-medium uppercase tracking-[0.2em] text-accent-foreground/50">Clients satisfaits</p>
              </div>
              <div className="text-center px-8">
                <p className="font-heading text-4xl md:text-5xl font-normal text-accent-foreground mb-3">24</p>
                <p className="text-[10px] font-medium uppercase tracking-[0.2em] text-accent-foreground/50">Gouvernorats livrés</p>
              </div>
              <div className="text-center px-8">
                <p className="font-heading text-4xl md:text-5xl font-normal text-gold mb-3">100%</p>
                <p className="text-[10px] font-medium uppercase tracking-[0.2em] text-accent-foreground/50">Made in Tunisia</p>
              </div>
            </div>
          </div>
        </section>

        {/* ── PHOTO + TEXT — Alternating layout ── */}
        {/* Row 1: Photo left, text right */}
        <section className="py-24 md:py-32">
          <div className="container">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-0 items-stretch">
              <div className="overflow-hidden" style={{ minHeight: "480px" }}>
                <img
                  src={about2}
                  alt="Kissing Silhouette dans un salon moderne"
                  className="w-full h-full object-cover object-top hover:scale-[1.02] transition-transform duration-700"
                  style={{ minHeight: "480px" }}
                />
              </div>
              <div className="flex flex-col justify-center px-8 md:px-16 py-12 bg-secondary/40">
                <p className="text-[10px] font-medium uppercase tracking-[0.3em] text-muted-foreground mb-5">
                  Notre Mission
                </p>
                <h2 className="font-heading text-2xl md:text-3xl font-normal text-foreground mb-6 leading-snug">
                  Rendre le premium accessible à tous les Tunisiens
                </h2>
                <p className="text-sm text-muted-foreground leading-[1.9]">
                  Des jeunes mariés aux passionnés de design, en passant par les
                  propriétaires de bureaux — nous croyons que chaque espace mérite
                  une touche d'élégance, sans compromis sur la qualité.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Row 2: Text left, photo right */}
        <section className="pb-24 md:pb-32">
          <div className="container">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-0 items-stretch">
              <div className="flex flex-col justify-center px-8 md:px-16 py-12 bg-secondary/40 order-2 md:order-1">
                <p className="text-[10px] font-medium uppercase tracking-[0.3em] text-muted-foreground mb-5">
                  Notre Matériau
                </p>
                <h2 className="font-heading text-2xl md:text-3xl font-normal text-foreground mb-6 leading-snug">
                  L'Alucobond — léger, durable, élégant
                </h2>
                <p className="text-sm text-muted-foreground leading-[1.9]">
                  Un matériau composite aluminium haut de gamme, reconnu pour
                  sa légèreté, sa résistance aux UV et sa finition premium.
                  Système de fixation inclus — installation en 5 minutes.
                </p>
              </div>
              <div className="overflow-hidden order-1 md:order-2" style={{ minHeight: "480px" }}>
                <img
                  src={about1}
                  alt="Birds of Life dans un salon"
                  className="w-full h-full object-cover object-top hover:scale-[1.02] transition-transform duration-700"
                  style={{ minHeight: "480px" }}
                />
              </div>
            </div>
          </div>
        </section>

        {/* ── FULL WIDTH PHOTO STRIP ── */}
        <section className="pb-24 md:pb-32">
          <div className="container">
            <div className="grid grid-cols-2 gap-3 mb-0">
              <div className="overflow-hidden rounded-sm" style={{ aspectRatio: "4/3" }}>
                <img
                  src={about4}
                  alt="Start with Bismillah – décoration murale islamique"
                  className="w-full h-full object-cover object-top hover:scale-[1.02] transition-transform duration-700"
                />
              </div>
              <div className="overflow-hidden rounded-sm" style={{ aspectRatio: "4/3" }}>
                <img
                  src={about3}
                  alt="Sunset of Freedom dans un salon"
                  className="w-full h-full object-cover object-center hover:scale-[1.02] transition-transform duration-700"
                />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-0 max-w-full">
              <div className="bg-secondary/40 px-8 md:px-16 py-12">
                <p className="text-[10px] font-medium uppercase tracking-[0.3em] text-muted-foreground mb-4">
                  Art Islamique
                </p>
                <h3 className="font-heading text-xl md:text-2xl font-normal text-foreground mb-4 leading-snug">
                  Inspiré de la culture tunisienne
                </h3>
                <p className="text-sm text-muted-foreground leading-[1.9]">
                  Nos designs s'inspirent de l'art islamique, de la calligraphie
                  et de la culture tunisienne. Des pièces qui racontent une histoire
                  et apportent une âme à votre intérieur.
                </p>
              </div>
              <div className="bg-secondary/40 px-8 md:px-16 py-12 border-l border-border">
                <p className="text-[10px] font-medium uppercase tracking-[0.3em] text-muted-foreground mb-4">
                  Art Naturel
                </p>
                <h3 className="font-heading text-xl md:text-2xl font-normal text-foreground mb-4 leading-snug">
                  La nature au cœur du design
                </h3>
                <p className="text-sm text-muted-foreground leading-[1.9]">
                  Oiseaux, arbres, couchers de soleil — nos motifs naturels apportent
                  sérénité et élégance à tous les styles d'intérieur, du moderne
                  au classique.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ── CTA ── */}
        <section className="py-24 md:py-32 bg-accent text-accent-foreground text-center">
          <div className="container max-w-xl">
            <p className="text-[10px] font-medium uppercase tracking-[0.3em] text-accent-foreground/50 mb-5">
              Découvrez notre collection
            </p>
            <h2 className="font-heading text-3xl md:text-4xl font-normal text-accent-foreground mb-10 leading-snug">
              Trouvez la pièce parfaite pour votre intérieur
            </h2>
            <Link
              to="/produits"
              className="inline-flex items-center px-12 py-4 border border-accent-foreground/20 text-accent-foreground text-xs font-medium uppercase tracking-[0.18em] hover:bg-accent-foreground/5 transition-colors duration-300"
            >
              Voir la Collection
            </Link>
          </div>
        </section>

      </main>
      <Footer />
    </>
  );
};

export default About;
