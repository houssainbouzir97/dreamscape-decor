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

const Index = () => (
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

export default Index;
