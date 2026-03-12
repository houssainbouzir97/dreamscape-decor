import { PROMOTION, getBannerText } from "@/config/promotion";

const PromotionBanner = () => {
  if (!PROMOTION.active) return null;

  return (
    <div className="w-full bg-[#1E1E1E] text-[#F4EFEA] py-2.5 px-4 text-center">
      <p className="text-[11px] font-medium tracking-[0.2em] uppercase leading-relaxed">
        {getBannerText()}
      </p>
    </div>
  );
};

export default PromotionBanner;
