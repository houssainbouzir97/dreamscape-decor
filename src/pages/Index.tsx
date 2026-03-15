import HeroSection from "@/components/HeroSection";
import TrustBadges from "@/components/TrustBadges";
import BestSellers from "@/components/BestSellers";
import BrandStory from "@/components/BrandStory";
import WhyChooseUs from "@/components/WhyChooseUs";
import SocialProof from "@/components/SocialProof";
import CTASection from "@/components/CTASection";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PromotionBanner from "@/components/PromotionBanner";
import useSEO from "@/hooks/useSEO";

const Index = () => {
  useSEO({
    title: "Dreamscape Decor – Décoration Murale en Métal | Tunisie",
    description: "Découvrez notre collection de décorations murales en métal Alucobond. Designs uniques, qualité premium, livraison partout en Tunisie. Paiement à la livraison.",
  });

  return (
    <>
      <PromotionBanner />
      <Header />
      <main>
        <HeroSection />
        <TrustBadges />
        <BestSellers />
        <BrandStory />
        <WhyChooseUs />
        <SocialProof />
        <CTASection />
      </main>
      <Footer />
    </>
  );
};

export default Index;
