import { useState } from "react";
import PromotionBanner from "@/components/PromotionBanner";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ProductCard from "@/components/ProductCard";
import { products, categories } from "@/data/products";
import useSEO from "@/hooks/useSEO";

const Products = () => {
  const [activeCategory, setActiveCategory] = useState("Tous");

  useSEO({
    title: "Collection – Décoration Murale Métal | Dreamscape Decor",
    description: "Explorez toute notre collection de décorations murales en métal Alucobond. Nature, géométrie, art islamique — livraison partout en Tunisie.",
  });

  const filtered = activeCategory === "Tous"
    ? products
    : products.filter(p => p.category === activeCategory);

  return (
    <>
      <PromotionBanner />
      <Header />
      <main className="py-12 md:py-20">
        <div className="container">
          <div className="text-center mb-14">
            <p className="text-[10px] font-medium uppercase tracking-[0.3em] text-muted-foreground mb-3">Notre Collection</p>
            <h1 className="font-heading text-3xl md:text-4xl font-normal text-foreground">Décoration Murale en Métal</h1>
          </div>

          <div className="flex flex-wrap justify-center gap-2 mb-14">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`text-xs px-5 py-2 border transition-colors uppercase tracking-wider ${
                  activeCategory === cat
                    ? "bg-accent text-accent-foreground border-accent"
                    : "border-border text-muted-foreground hover:border-foreground hover:text-foreground"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
            {filtered.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default Products;
