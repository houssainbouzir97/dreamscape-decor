import { useEffect, useRef, useCallback } from "react";
import { Link } from "react-router-dom";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { products } from "@/data/products";
import { productImageMap } from "@/lib/productImages";
import { getEffectivePrice, PROMOTION } from "@/config/promotion";
import PromotionBadge from "@/components/PromotionBadge";

interface RelatedProductsProps {
  currentProductId: string;
  category: string;
}

const CARD_WIDTH = 224;
const GAP = 24;
const ITEM_WIDTH = CARD_WIDTH + GAP;

const RelatedProducts = ({ currentProductId, category }: RelatedProductsProps) => {
  const related = products
    .filter((p) => p.id !== currentProductId && p.category === category)
    .slice(0, 8);

  const allRelated = related.length >= 3
    ? related
    : [
        ...related,
        ...products
          .filter((p) => p.id !== currentProductId && p.category !== category)
          .slice(0, 8 - related.length),
      ];

  const items = [...allRelated, ...allRelated, ...allRelated];
  const loopWidth = allRelated.length * ITEM_WIDTH;

  const trackRef = useRef<HTMLDivElement>(null);
  const positionRef = useRef(loopWidth);
  const animFrameRef = useRef<number>();
  const isPausedRef = useRef(false);
  const isDraggingRef = useRef(false);
  const dragStartXRef = useRef(0);
  const dragStartPosRef = useRef(0);

  // Auto-scroll
  useEffect(() => {
    const track = trackRef.current;
    if (!track || allRelated.length === 0) return;

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
  }, [allRelated.length, loopWidth]);

  // Arrow scroll with easing
  const scrollBy = useCallback((direction: "left" | "right") => {
    isPausedRef.current = true;
    const target = positionRef.current + (direction === "right" ? ITEM_WIDTH * 2 : -ITEM_WIDTH * 2);
    const start = positionRef.current;
    const distance = target - start;
    const duration = 400;
    const startTime = performance.now();
    const ease = (t: number) => t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;

    const animateScroll = (now: number) => {
      const progress = Math.min((now - startTime) / duration, 1);
      positionRef.current = start + distance * ease(progress);
      if (positionRef.current >= loopWidth * 2) positionRef.current -= loopWidth;
      if (positionRef.current < loopWidth) positionRef.current += loopWidth;
      if (trackRef.current) trackRef.current.style.transform = `translateX(-${positionRef.current}px)`;
      if (progress < 1) requestAnimationFrame(animateScroll);
      else setTimeout(() => { isPausedRef.current = false; }, 800);
    };

    requestAnimationFrame(animateScroll);
  }, [loopWidth]);

  // Mouse drag
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

  // Touch swipe
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
    setTimeout(() => { isPausedRef.current = false; }, 1200);
  };

  if (allRelated.length === 0) return null;

  return (
    <section className="py-20 md:py-28 border-t border-border overflow-hidden">
      <div className="container mb-12">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-[11px] font-medium uppercase tracking-[0.3em] text-muted-foreground mb-2">
              Vous aimerez aussi
            </p>
            <h2 className="font-heading text-2xl md:text-3xl font-normal text-foreground">
              Dans la même collection
            </h2>
            <div className="w-16 h-0.5 bg-gold mt-4" />
          </div>

          {/* Arrow buttons */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => scrollBy("left")}
              className="w-10 h-10 rounded-full border border-border flex items-center justify-center hover:border-foreground transition-colors active:scale-95"
              aria-label="Précédent"
            >
              <ChevronLeft className="w-4 h-4 text-foreground" strokeWidth={1.5} />
            </button>
            <button
              onClick={() => scrollBy("right")}
              className="w-10 h-10 rounded-full border border-border flex items-center justify-center hover:border-foreground transition-colors active:scale-95"
              aria-label="Suivant"
            >
              <ChevronRight className="w-4 h-4 text-foreground" strokeWidth={1.5} />
            </button>
          </div>
        </div>
      </div>

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
        <div className="absolute left-0 top-0 bottom-0 w-16 z-10 pointer-events-none"
          style={{ background: "linear-gradient(to right, hsl(28,25%,94%), transparent)" }} />
        <div className="absolute right-0 top-0 bottom-0 w-16 z-10 pointer-events-none"
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
              {PROMOTION.active && (
                <div className="mb-1.5 flex justify-start">
                  <PromotionBadge />
                </div>
              )}
              <div className="relative aspect-[4/5] overflow-hidden bg-secondary/50 rounded-sm mb-3">
                <img
                  src={productImageMap[product.image]}
                  alt={product.name}
                  className="w-full h-full object-contain object-[center_48%] transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                  loading="lazy"
                  draggable={false}
                />
              </div>

              <p className="text-[10px] text-muted-foreground uppercase tracking-[0.2em] mb-1">
                {product.category}
              </p>
              <h3 className="font-heading text-sm font-normal text-foreground mb-1.5 truncate">
                {product.name}
              </h3>

              {PROMOTION.active ? (
                <div className="flex items-baseline gap-2">
                  <span className="text-sm font-medium text-[#1E1E1E]">
                    {getEffectivePrice(product.sizes[0].price)} TND
                  </span>
                  <span className="text-xs text-muted-foreground line-through">
                    {product.sizes[0].price} TND
                  </span>
                </div>
              ) : (
                <span className="text-sm font-medium text-foreground">
                  {product.sizes[0].price} TND
                </span>
              )}
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default RelatedProducts;
