import { PROMOTION, getPromotionBadgeLabel } from "@/config/promotion";

const PromotionBadge = () => {
  if (!PROMOTION.active) return null;

  return (
    <span
      className="inline-flex items-center px-2.5 py-1 rounded-sm text-[10px] sm:text-[11px] font-medium tracking-wide text-left normal-case leading-snug max-w-full"
      style={{ background: "#C6A75E", color: "#F4EFEA" }}
    >
      {getPromotionBadgeLabel()}
    </span>
  );
};

export default PromotionBadge;
