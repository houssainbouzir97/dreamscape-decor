import { useState, useCallback } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ShoppingBag } from "lucide-react";
import { Product } from "@/data/products";
import { useCart } from "@/hooks/useCart";
import { productImageMap } from "@/lib/productImages";
import { useIsMobile } from "@/hooks/use-mobile";

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
      price: currentSize.price,
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
      className={`group border transition-all duration-300 p-3 -m-3 rounded-sm active:scale-[0.98] active:transition-transform active:duration-150 ${
        isActive
          ? "border-gold/40 shadow-elevated"
          : "border-transparent hover:border-gold/40 hover:shadow-elevated"
      }`}
      onBlur={handleBlur}
      tabIndex={0}
    >
      <Link
        to={`/produit/${product.slug}`}
        onClick={handleCardClick}
      >
        <div className="relative aspect-[4/5] overflow-hidden bg-secondary/50 mb-5 flex items-center justify-center rounded-sm">
          <img
            src={productImageMap[product.image]}
            alt={product.name}
            className={`w-full h-full object-contain transition-transform duration-700 ease-out group-hover:scale-[1.03] ${
              isActive ? "scale-[1.03]" : ""
            }`}
            loading="lazy"
          />
        </div>
      </Link>

      <div className="space-y-2.5">
        <Link to={`/produit/${product.slug}`} onClick={handleCardClick}>
          <p className="text-[10px] text-muted-foreground uppercase tracking-[0.2em]">{product.category}</p>
          <h3 className="font-heading text-base md:text-lg font-normal text-foreground mt-1.5">{product.name}</h3>
        </Link>

        <div className="flex gap-1.5">
          {product.sizes.map((size, i) => (
            <button
              key={size.dimensions}
              onClick={() => setSelectedSize(i)}
              className={`text-[11px] px-2.5 py-1.5 border transition-all duration-150 active:scale-[0.97] ${
                i === selectedSize
                  ? "bg-accent text-accent-foreground border-gold"
                  : "border-border text-muted-foreground hover:border-foreground"
              }`}
            >
              {size.label}
            </button>
          ))}
        </div>

        <div className="flex items-center justify-between pt-1">
          <span className="text-sm font-medium text-foreground">{currentSize.price} TND</span>
          <button
            onClick={handleAdd}
            className="p-2.5 bg-accent text-accent-foreground hover:bg-charcoal-light transition-all duration-150 active:scale-[0.95]"
            aria-label="Ajouter au panier"
          >
            <ShoppingBag className="w-4 h-4" strokeWidth={1.5} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
