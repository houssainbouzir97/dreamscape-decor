import about1 from "@/assets/about-1.jpg";
import about2 from "@/assets/about-2.jpg";
import about3 from "@/assets/about-3.jpg";
import about4 from "@/assets/about-4.jpg";
import useScrollAnimation from "@/hooks/useScrollAnimation";

const photos = [
  { src: about1, alt: "Birds of Life dans un salon moderne" },
  { src: about3, alt: "Sunset of Freedom dans un salon" },
  { src: about2, alt: "Kissing Silhouette dans un salon" },
  { src: about4, alt: "Start with Bismillah dans un salon doré" },
  { src: about1, alt: "Birds of Life" },
  { src: about3, alt: "Sunset of Freedom" },
];

const CustomerPhotoStrip = () => {
  const { ref, isVisible } = useScrollAnimation({ threshold: 0.1 });

  return (
    <section className="py-20 md:py-28 overflow-hidden">
      {/* Header */}
      <div
        ref={ref}
        className="container mb-12 text-center transition-all duration-700"
        style={{
          opacity: isVisible ? 1 : 0,
          transform: isVisible ? "translateY(0)" : "translateY(28px)",
        }}
      >
        <p className="text-[11px] font-medium uppercase tracking-[0.3em] text-muted-foreground mb-3">
          Chez Nos Clients
        </p>
        <h2 className="font-heading text-2xl md:text-3xl font-normal text-foreground">
          Dans Vos Intérieurs
        </h2>
        <div className="w-16 h-0.5 bg-gold mx-auto mt-5" />
      </div>

      {/* Photo strip — horizontal scroll on mobile, fixed grid on desktop */}
      <div className="container">
        {/* Desktop — 4 columns masonry-like */}
        <div className="hidden md:grid grid-cols-4 gap-3">
          {[about1, about3, about2, about4].map((src, i) => (
            <div
              key={i}
              className="overflow-hidden rounded-sm transition-all duration-700"
              style={{
                aspectRatio: i % 2 === 0 ? "3/4" : "3/3.5",
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? "translateY(0)" : "translateY(40px)",
                transitionDelay: `${i * 100}ms`,
              }}
            >
              <img
                src={src}
                alt={`Client interior ${i + 1}`}
                className="w-full h-full object-cover object-top hover:scale-[1.04] transition-transform duration-700 ease-out"
                loading="lazy"
              />
            </div>
          ))}
        </div>

        {/* Mobile — horizontal scroll */}
        <div className="md:hidden flex gap-3 overflow-x-auto scrollbar-none pb-2">
          {photos.map((photo, i) => (
            <div
              key={i}
              className="flex-shrink-0 overflow-hidden rounded-sm"
              style={{ width: "200px", aspectRatio: "3/4" }}
            >
              <img
                src={photo.src}
                alt={photo.alt}
                className="w-full h-full object-cover object-top"
                loading="lazy"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CustomerPhotoStrip;
