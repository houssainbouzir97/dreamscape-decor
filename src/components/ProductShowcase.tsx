import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { products } from "@/data/products";
import { productImageMap } from "@/lib/productImages";
import { getEffectivePrice, PROMOTION } from "@/config/promotion";
import useScrollAnimation from "@/hooks/useScrollAnimation";

const CARD_WIDTH = 260;
const GAP = 20;
const ITEM_WIDTH = CARD_WIDTH + GAP;

const ProductShowcase = () => {
  const items = [...products, ...products, ...products];
  const loopWidth = products.length * ITEM_WIDTH;

  const trackRef = useRef<HTMLDivElement>(null);
  const positionRef = useRef(loopWidth);
  const animFrameRef = useRef<number>();
  const isPausedRef = useRef(false);
  const isDraggingRef = useRef(false);
  const dragStartXRef = useRef(0);
  const dragStartPosRef = useRef(0);

  const { ref: sectionRef, isVisible } = useScrollAnimation({ threshold: 0.05 });

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    positionRef.current = loopWidth;
    track.style.transform = `translateX(-${positionRef.current}px)`;

    const animate = () => {
      if (!isPausedRef.current && !isDraggingRef.current) {
        positionRef.current += 1.2;
        if (positionRef.current >= loopWidth * 2) positionRef.current = loopWidth;
        if (positionRef.current < loopWidth) positionRef.current = loopWidth * 2 - ITEM_WIDTH;
        track.style.transform = `translateX(-${positionRef.current}px)`;
      }
      animFrameRef.current = requestAnimationFrame(animate);
    };

    animFrameRef.current = requestAnimationFrame(animate);
    return () => { if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current); };
  }, [loopWidth]);

  const onMouseDown = (e: React.MouseEvent) => {
    isDraggingRef.current = true;
    dragStartXRef.current = e.clientX;
    dragStartPosRef.current = positionRef.current;
  };
  const onMouseMove = (e: React.MouseEvent) => {
    if (!isDraggingRef.current) return;
    positionRef.current = dragStartPosRef.current + (dragStartXRef.current - e.clientX);
    if (trackRef.current) trackRef.current.style.transform = `translateX(-${positionRef.current}px)`;
  };
  const onMouseUp = () => { isDraggingRef.current = false; };
  const onTouchStart = (e: React.TouchEvent) => {
    isDraggingRef.current = true;
    isPausedRef.current = true;
    dragStartXRef.current = e.touches[0].clientX;
    dragStartPosRef.current = positionRef.current;
  };
  const onTouchMove = (e: React.TouchEvent) => {
    if (!isDraggingRef.current) return;
    positionRef.current = dragStartPosRef.current + (dragStartXRef.current - e.touches[0].clientX);
    if (trackRef.current) trackRef.current.style.transform = `translateX(-${positionRef.current}px)`;
  };
  const onTouchEnd = () => {
    isDraggingRef.current = false;
    setTimeout(() => { isPausedRef.current = false; }, 1000);
  };

  return (
    <section className="py-20 md:py-28 overflow-hidden" ref={sectionRef}>
      {/* Section header */}
      <div
        className="container mb-14 transition-all duration-700"
        style={{
          opacity: isVisible ? 1 : 0,
          transform: isVisible ? "translateY(0)" : "translateY(28px)",
        }}
      >
        <div className="flex items-end justify-between">
          <div>
            <p className="text-[11px] font-medium uppercase tracking-[0.3em] text-muted-foreground mb-3">
              Toute la Collection
            </p>
            <h2 className="font-heading text-2xl md:text-3xl lg:text-4xl font-normal text-foreground tracking-wide">
              Explorez Nos Créations
            </h2>
            <div className="w-16 h-0.5 bg-gold mt-5" />
          </div>
          <Link
            to="/produits"
            className="hidden md:inline-flex items-center px-8 py-3 border border-border text-foreground text-xs font-medium uppercase tracking-[0.18em] hover:border-foreground transition-colors duration-300"
          >
            Voir tout
          </Link>
        </div>
      </div>

      {/* Carousel */}
      <div
        className="relative select-none"
        onMouseEnter={() => { isPausedRef.current = true; }}
        onMouseLeave={() => { isPausedRef.current = false; isDraggingRef.current = false; }}
        onMouseDown={onMouseDown}
        onMouseMove={onMouseMove}
        onMouseUp={onMouseUp}
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
        style={{ cursor: "grab" }}
      >
        {/* Fade edges */}
        <div className="absolute left-0 top-0 bottom-0 w-20 z-10 pointer-events-none"
          style={{ background: "linear-gradient(to right, hsl(28,25%,94%), transparent)" }} />
        <div className="absolute right-0 top-0 bottom-0 w-20 z-10 pointer-events-none"
          style={{ background: "linear-gradient(to left, hsl(28,25%,94%), transparent)" }} />

        <div ref={trackRef} className="flex" style={{ width: "max-content" }}>
          {items.map((product, index) => (
            <Link
              key={`${product.id}-${index}`}
              to={`/produit/${product.slug}`}
              className="group flex-shrink-0"
              style={{ width: CARD_WIDTH, marginRight: GAP }}
              draggable={false}
            >
              {/* Image */}
              <div className="relative overflow-hidden rounded-sm mb-3" style={{ aspectRatio: "4/5" }}>
                <img
                  src={productImageMap[product.image]}
                  alt={product.name}
                  className="w-full h-full object-cover transition-all duration-700 ease-out group-hover:scale-[1.04] group-hover:brightness-[0.82]"
                  loading="lazy"
                  draggable={false}
                />
                {/* Dark overlay */}
                <div className="absolute inset-0 bg-[#1E1E1E] opacity-0 group-hover:opacity-30 transition-opacity duration-500" />
                {/* Bottom reveal */}
                <div className="absolute inset-x-0 bottom-0 flex flex-col items-center pb-4">
                  <div className="h-px bg-gold w-0 group-hover:w-10 transition-all duration-500 mb-2" style={{ transitionDelay: "150ms" }} />
                  <p className="text-[9px] font-medium uppercase tracking-[0.2em] text-[#F4EFEA] opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-400" style={{ transitionDelay: "200ms" }}>
                    Voir
                  </p>
                </div>
                {/* Promo badge */}
                {PROMOTION.active && (
                  <span className="absolute top-2 left-2 text-[9px] font-medium px-2 py-0.5 rounded-sm uppercase tracking-[0.06em]"
                    style={{ background: "#C6A75E", color: "#F4EFEA" }}>
                    -{PROMOTION.discountPercentage}%
                  </span>
                )}
              </div>

              {/* Info */}
              <p className="text-[9px] text-muted-foreground uppercase tracking-[0.2em] mb-1">{product.category}</p>
              <h3 className="font-heading text-sm font-normal text-foreground mb-1 truncate">{product.name}</h3>
              {PROMOTION.active ? (
                <div className="flex items-baseline gap-1.5">
                  <span className="text-sm font-semibold text-foreground">{getEffectivePrice(product.sizes[0].price)} TND</span>
                  <span className="text-[10px] text-muted-foreground line-through">{product.sizes[0].price} TND</span>
                </div>
              ) : (
                <span className="text-sm font-medium text-foreground">{product.sizes[0].price} TND</span>
              )}
            </Link>
          ))}
        </div>
      </div>

      {/* Mobile CTA */}
      <div className="container mt-10 md:hidden text-center">
        <Link
          to="/produits"
          className="inline-flex items-center px-8 py-3 border border-border text-foreground text-xs font-medium uppercase tracking-[0.18em] hover:border-foreground transition-colors duration-300"
        >
          Voir tout
        </Link>
      </div>
    </section>
  );
};

export default ProductShowcase;
