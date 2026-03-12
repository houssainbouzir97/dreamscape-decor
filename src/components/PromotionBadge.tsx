import { PROMOTION, getPromotionBadgeLabel } from "@/config/promotion";

const PromotionBadge = () => {
  if (!PROMOTION.active) return null;

  return (
    <span
      className="inline-flex items-center px-2 py-0.5 rounded-sm text-[10px] font-medium tracking-[0.08em] uppercase"
      style={{ background: "#C6A75E", color: "#F4EFEA" }}
    >
      {getPromotionBadgeLabel()}
    </span>
  );
};

export default PromotionBadge;
