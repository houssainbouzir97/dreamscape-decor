import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { Product, products } from "@/data/products";
import { productImageMap } from "@/lib/productImages";
import { getEffectivePrice, PROMOTION } from "@/config/promotion";

interface RelatedProductsProps {
  currentProductId: string;
  category: string;
}

const RelatedProducts = ({ currentProductId, category }: RelatedProductsProps) => {
  const related = products
    .filter((p) => p.id !== currentProductId && p.category === category)
    .slice(0, 8);

  // Fallback: if not enough in same category, fill with other products
  const allRelated = related.length >= 3
    ? related
    : [
        ...related,
        ...products
          .filter((p) => p.id !== currentProductId && p.category !== category)
          .slice(0, 8 - related.length),
      ];

  // Duplicate for infinite loop effect
  const items = [...allRelated, ...allRelated];

  const trackRef = useRef<HTMLDivElement>(null);
  const [isPaused, setIsPaused] = useState(false);
  const positionRef = useRef(0);
  const animFrameRef = useRef<number>();

  useEffect(() => {
    const track = trackRef.current;
    if (!track || allRelated.length === 0) return;

    const speed = 0.5; // px per frame

    const animate = () => {
      if (!isPaused) {
        positionRef.current += speed;
        const halfWidth = track.scrollWidth / 2;
        if (positionRef.current >= halfWidth) {
          positionRef.current = 0;
        }
        track.style.transform = `translateX(-${positionRef.current}px)`;
      }
      animFrameRef.current = requestAnimationFrame(animate);
    };

    animFrameRef.current = requestAnimationFrame(animate);
    return () => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, [isPaused, allRelated.length]);

  if (allRelated.length === 0) return null;

  return (
    <section className="py-20 md:py-28 border-t border-border overflow-hidden">
      <div className="container mb-12">
        <div className="text-center">
          <p className="text-[11px] font-medium uppercase tracking-[0.3em] text-muted-foreground mb-3">
            Vous aimerez aussi
          </p>
          <h2 className="font-heading text-2xl md:text-3xl font-normal text-foreground">
            Dans la même collection
          </h2>
          <div className="w-16 h-0.5 bg-gold mx-auto mt-4" />
        </div>
      </div>

      {/* Carousel */}
      <div
        className="relative"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        onTouchStart={() => setIsPaused(true)}
        onTouchEnd={() => setIsPaused(false)}
      >
        {/* Left fade */}
        <div className="absolute left-0 top-0 bottom-0 w-16 z-10 pointer-events-none"
          style={{ background: "linear-gradient(to right, hsl(28,25%,94%), transparent)" }} />
        {/* Right fade */}
        <div className="absolute right-0 top-0 bottom-0 w-16 z-10 pointer-events-none"
          style={{ background: "linear-gradient(to left, hsl(28,25%,94%), transparent)" }} />

        <div className="flex" ref={trackRef} style={{ width: "max-content" }}>
          {items.map((product, index) => (
            <Link
              key={`${product.id}-${index}`}
              to={`/produit/${product.slug}`}
              className="group flex-shrink-0 w-52 md:w-64 mx-3"
            >
              {/* Image */}
              <div className="relative aspect-[4/5] overflow-hidden bg-secondary/50 rounded-sm mb-3">
                <img
                  src={productImageMap[product.image]}
                  alt={product.name}
                  className="w-full h-full object-contain transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                  loading="lazy"
                />
                {/* Promo badge */}
                {PROMOTION.active && (
                  <span
                    className="absolute top-2 left-2 text-[10px] font-medium px-2 py-0.5 rounded-sm uppercase tracking-[0.06em]"
                    style={{ background: "#C6A75E", color: "#F4EFEA" }}
                  >
                    -{PROMOTION.discountPercentage}%
                  </span>
                )}
              </div>

              {/* Info */}
              <p className="text-[10px] text-muted-foreground uppercase tracking-[0.2em] mb-1">
                {product.category}
              </p>
              <h3 className="font-heading text-sm font-normal text-foreground mb-1.5 truncate">
                {product.name}
              </h3>

              {/* Price */}
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
