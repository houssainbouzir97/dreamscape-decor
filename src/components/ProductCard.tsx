import { useState, useCallback } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ShoppingBag } from "lucide-react";
import { Product } from "@/data/products";
import { useCart } from "@/hooks/useCart";
import { productImageMap } from "@/lib/productImages";
import { useIsMobile } from "@/hooks/use-mobile";
import { getEffectivePrice } from "@/config/promotion";
import PriceDisplay from "./PriceDisplay";
import PromotionBadge from "./PromotionBadge";

const ProductCard = ({ product }: { product: Product }) => {
  const [selectedSize, setSelectedSize] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const { addItem } = useCart();
  const isMobile = useIsMobile();
  const navigate = useNavigate();
  const currentSize = product.sizes[selectedSize];

  const handleAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addItem({
      productId: product.id,
      name: product.name,
      image: product.image,
      size: currentSize.label,
      price: getEffectivePrice(currentSize.price),
    });
  };

  const handleCardClick = useCallback((e: React.MouseEvent) => {
    if (!isMobile) return;
    if (!isActive) {
      e.preventDefault();
      setIsActive(true);
    }
  }, [isMobile, isActive]);

  const handleBlur = useCallback(() => {
    if (isMobile) setIsActive(false);
  }, [isMobile]);

  return (
    <div
      className="group"
      onBlur={handleBlur}
      tabIndex={0}
    >
      {/* Image with cream overlay animation */}
      <Link to={`/produit/${product.slug}`} onClick={handleCardClick}>
        <div
          className="relative overflow-hidden bg-secondary/50 mb-3 rounded-sm"
          style={{ aspectRatio: "4/5" }}
        >
          {/* Product image */}
          <img
            src={productImageMap[product.image]}
            alt={product.name}
            className={`w-full h-full object-cover transition-all duration-700 ease-out
              group-hover:scale-[1.04] group-hover:brightness-[0.90]
              ${isActive ? "scale-[1.04] brightness-[0.90]" : ""}
            `}
            loading="lazy"
          />

          {/* Cream overlay */}
          <div
            className={`absolute inset-0 transition-opacity duration-500
              ${isActive ? "opacity-100" : "opacity-0 group-hover:opacity-100"}
            `}
            style={{ background: "rgba(244, 239, 234, 0.45)" }}
          />

          {/* Bottom content */}
          <div className="absolute inset-x-0 bottom-0 flex flex-col items-center justify-end pb-5 px-4">
            {/* Gold line */}
            <div
              className={`h-px bg-gold transition-all duration-500 ease-out mb-2.5
                ${isActive ? "w-12" : "w-0 group-hover:w-12"}
              `}
              style={{ transitionDelay: isActive ? "0ms" : "150ms" }}
            />
            {/* Text */}
            <p
              className={`text-[10px] font-medium uppercase tracking-[0.2em] text-[#1E1E1E]
                transition-all duration-400 ease-out
                ${isActive
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0"
                }
              `}
              style={{ transitionDelay: isActive ? "0ms" : "200ms" }}
            >
              Voir le produit
            </p>
          </div>

          {/* Promotion badge */}
          <div className="absolute top-2.5 left-2.5">
            <PromotionBadge />
          </div>
        </div>
      </Link>

      {/* Card info */}
      <div>
        <Link to={`/produit/${product.slug}`} onClick={handleCardClick}>
          <p className="text-[10px] text-muted-foreground uppercase tracking-[0.2em] mb-1">
            {product.category}
          </p>
          <h3 className="font-heading text-sm md:text-base font-normal text-foreground mb-2.5 leading-snug">
            {product.name}
          </h3>
        </Link>

        <div className="flex flex-wrap gap-1 mb-3">
          {product.sizes.map((size, i) => (
            <button
              key={size.dimensions}
              onClick={() => setSelectedSize(i)}
              className={`text-[10px] px-2 py-1 border transition-all duration-150 active:scale-[0.97] whitespace-nowrap ${
                i === selectedSize
                  ? "bg-accent text-accent-foreground border-accent"
                  : "border-border text-muted-foreground hover:border-foreground"
              }`}
            >
              {size.label}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <div className="flex-1">
            <PriceDisplay basePrice={currentSize.price} variant="card" />
          </div>
          <button
            onClick={handleAdd}
            className="flex items-center justify-center gap-1.5 px-3 py-2.5 bg-accent text-accent-foreground hover:bg-charcoal-light transition-all duration-150 active:scale-[0.95] text-[10px] font-medium uppercase tracking-[0.1em] whitespace-nowrap"
            aria-label="Ajouter au panier"
          >
            <ShoppingBag className="w-3.5 h-3.5 flex-shrink-0" strokeWidth={1.5} />
            <span className="hidden sm:inline">Ajouter</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
