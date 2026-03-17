import { PROMOTION, getDiscountedPrice } from "@/config/promotion";

interface PriceDisplayProps {
  basePrice: number;
  variant?: "card" | "detail";
}

const PriceDisplay = ({ basePrice, variant = "card" }: PriceDisplayProps) => {
  if (!PROMOTION.active) {
    return (
      <span
        className={
          variant === "detail"
            ? "text-2xl font-medium text-foreground"
            : "text-base font-medium text-foreground"
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
        <span className="text-2xl font-semibold text-[#1E1E1E]">
          {discountedPrice} TND
        </span>
        <span className="text-base text-muted-foreground line-through">
          {basePrice} TND
        </span>
      </div>
    );
  }

  // card variant — new price bold and prominent, old price clearly visible but secondary
  return (
    <div className="flex items-baseline gap-2">
      <span className="text-base font-semibold text-[#1E1E1E]">
        {discountedPrice} TND
      </span>
      <span className="text-xs text-muted-foreground line-through">
        {basePrice} TND
      </span>
    </div>
  );
};

export default PriceDisplay;
