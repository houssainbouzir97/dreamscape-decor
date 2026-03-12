import { products } from "@/data/products";
import ProductCard from "./ProductCard";
import { Link } from "react-router-dom";

const BestSellers = () => (
  <section className="py-28 md:py-36">
    <div className="container">
      <div className="text-center mb-20">
        <p className="text-[11px] font-medium uppercase tracking-[0.3em] text-muted-foreground mb-4">Notre Sélection</p>
        <h2 className="font-heading text-2xl md:text-3xl lg:text-4xl font-normal text-foreground tracking-wide">Les Plus Vendus</h2>
        <div className="w-16 h-0.5 bg-gold mx-auto mt-5" />
      </div>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 md:gap-10">
        {products.slice(0, 4).map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
      <div className="text-center mt-20">
        <Link
          to="/produits"
          className="inline-flex items-center px-12 py-4.5 bg-accent text-accent-foreground text-xs font-medium uppercase tracking-[0.18em] hover:opacity-90 transition-opacity duration-300"
        >
          Voir Toute la Collection
        </Link>
      </div>
    </div>
  </section>
);

export default BestSellers;
