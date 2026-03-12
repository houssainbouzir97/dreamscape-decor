import { PROMOTION, getDiscountedPrice } from "@/config/promotion";

interface PriceDisplayProps {
  basePrice: number;
  /** "card" = compact for product grid, "detail" = larger for product detail page */
  variant?: "card" | "detail";
}

const PriceDisplay = ({ basePrice, variant = "card" }: PriceDisplayProps) => {
  if (!PROMOTION.active) {
    return (
      <span
        className={
          variant === "detail"
            ? "text-2xl font-medium text-foreground"
            : "text-sm font-medium text-foreground"
        }
      >
        {basePrice} TND
      </span>
    );
  }

  const discountedPrice = getDiscountedPrice(basePrice);

  if (variant === "detail") {
    return (
      <div className="flex items-baseline gap-3">
        <span className="text-2xl font-medium text-[#1E1E1E]">
          {discountedPrice} TND
        </span>
        <span className="text-base text-muted-foreground line-through">
          {basePrice} TND
        </span>
      </div>
    );
  }

  // card variant
  return (
    <div className="flex items-baseline gap-2">
      <span className="text-sm font-medium text-[#1E1E1E]">
        {discountedPrice} TND
      </span>
      <span className="text-xs text-muted-foreground line-through">
        {basePrice} TND
      </span>
    </div>
  );
};

export default PriceDisplay;
