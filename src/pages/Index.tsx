import HeroSection from "@/components/HeroSection";
import TrustBadges from "@/components/TrustBadges";
import BestSellers from "@/components/BestSellers";
import ProductShowcase from "@/components/ProductShowcase";
import CustomerPhotoStrip from "@/components/CustomerPhotoStrip";
import BrandStory from "@/components/BrandStory";
import WhyChooseUs from "@/components/WhyChooseUs";
import SocialProof from "@/components/SocialProof";
import CTASection from "@/components/CTASection";
import HomeQA from "@/components/HomeQA";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PromotionBanner from "@/components/PromotionBanner";
import useSEO from "@/hooks/useSEO";

const Index = () => {
  useSEO({
    title: "Décoration Murale Métal Tunisie | Dreamscape Decor",
    description: "Tableaux en métal Alucobond pour salon, chambre, bureau, café et extérieur. Designs modernes et uniques. Livraison COD dans toute la Tunisie.",
    canonical: "/",
  });

  return (
    <>
      <PromotionBanner />
      <Header />
      <main>
        <HeroSection />
        <TrustBadges />
        <BestSellers />
        <ProductShowcase />
        <BrandStory />
        <CustomerPhotoStrip />
        <WhyChooseUs />
        <SocialProof />
        <HomeQA />
        <CTASection />
      </main>
      <Footer />
    </>
  );
};

export default Index;
