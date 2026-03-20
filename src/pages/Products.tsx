import { useState } from "react";
import { products } from "@/data/products";
import ProductCard from "@/components/ProductCard";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PromotionBanner from "@/components/PromotionBanner";
import useSEO from "@/hooks/useSEO";

const categories = ["Tous", "Nature", "Abstrait", "Islamique", "Citation"];

const Products = () => {
  const [activeCategory, setActiveCategory] = useState("Tous");

  useSEO({
    title: "Tableau Décoration Tunisie – Art Mural Métal | Dreamscape Decor",
    description: "Découvrez notre collection de tableaux décoratifs en métal Alucobond. Nature, abstrait, citation. Idéal salon, chambre, café et extérieur. Livraison COD.",
    canonical: "/produits",
  });

  const filtered = activeCategory === "Tous"
    ? products
    : products.filter(p => p.category === activeCategory);

  return (
    <>
      <PromotionBanner />
      <Header />
      <main className="py-16 md:py-24">
        <div className="container">
          <div className="text-center mb-16">
            <p className="text-[11px] font-medium uppercase tracking-[0.3em] text-muted-foreground mb-4">
              Notre Collection
            </p>
            <h1 className="font-heading text-3xl md:text-4xl font-normal text-foreground mb-6">
              Décoration Murale en Métal
            </h1>
            <div className="w-16 h-0.5 bg-gold mx-auto" />
          </div>

          {/* Category filters */}
          <div className="flex flex-wrap justify-center gap-3 mb-14">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`text-xs px-5 py-2.5 uppercase tracking-[0.15em] font-medium border transition-all duration-200 ${
                  activeCategory === cat
                    ? "bg-accent text-accent-foreground border-accent"
                    : "border-border text-muted-foreground hover:border-foreground"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {filtered.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default Products;
