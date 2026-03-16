import { useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { ShoppingBag, Truck, Banknote, ArrowLeft } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ProductGallery from "@/components/ProductGallery";
import RelatedProducts from "@/components/RelatedProducts";
import { getProductBySlug } from "@/data/products";
import { useCart } from "@/hooks/useCart";
import { getEffectivePrice } from "@/config/promotion";
import PriceDisplay from "@/components/PriceDisplay";
import PromotionBadge from "@/components/PromotionBadge";
import PromotionBanner from "@/components/PromotionBanner";
import ProductJsonLd from "@/components/ProductJsonLd";
import useSEO from "@/hooks/useSEO";

const ProductDetail = () => {
  const { slug } = useParams();
  const product = getProductBySlug(slug || "");
  const [selectedSize, setSelectedSize] = useState(0);
  const { addItem } = useCart();
  const navigate = useNavigate();

  useSEO({
    title: product
      ? `${product.name} – Décoration Murale Métal | Dreamscape Decor`
      : "Produit – Dreamscape Decor",
    description: product
      ? `${product.description} Disponible en ${product.sizes.map(s => s.label).join(", ")}. Livraison partout en Tunisie, paiement à la livraison.`
      : "Décoration murale en métal Alucobond. Livraison partout en Tunisie.",
  });

  if (!product) {
    return (
      <>
        <Header />
        <main className="py-24 text-center container">
          <h1 className="font-heading text-2xl font-normal text-foreground mb-4">Produit introuvable</h1>
          <Link to="/produits" className="text-muted-foreground underline text-sm">Retour à la collection</Link>
        </main>
        <Footer />
      </>
    );
  }

  const currentSize = product.sizes[selectedSize];

  const handleAdd = () => {
    addItem({
      productId: product.id,
      name: product.name,
      image: product.image,
      size: currentSize.label,
      price: getEffectivePrice(currentSize.price),
    });
  };

  return (
    <>
      <ProductJsonLd product={product} />
      <PromotionBanner />
      <Header />
      <main className="py-10 md:py-20">
        <div className="container">
          <Link to="/produits" className="inline-flex items-center gap-2 text-xs text-muted-foreground hover:text-foreground mb-8 transition-colors uppercase tracking-wider">
            <ArrowLeft className="w-3.5 h-3.5" strokeWidth={1.5} /> Retour à la collection
          </Link>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16">
            <ProductGallery imageKey={product.image} productName={product.name} />

            <div className="flex flex-col justify-center">
              <p className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground mb-3">{product.category}</p>
              <h1 className="font-heading text-3xl md:text-4xl font-normal text-foreground mb-3">{product.name}</h1>
              <div className="mb-5">
                <PromotionBadge />
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed mb-8">{product.description}</p>

              <div className="mb-6">
                <p className="text-xs font-medium text-foreground uppercase tracking-wider mb-3">Taille</p>
                <div className="flex flex-wrap gap-2">
                  {product.sizes.map((size, i) => (
                    <button
                      key={size.dimensions}
                      onClick={() => setSelectedSize(i)}
                      className={`px-4 py-2.5 border text-xs font-medium transition-colors ${
                        i === selectedSize
                          ? "bg-accent text-accent-foreground border-accent"
                          : "border-border text-muted-foreground hover:border-foreground"
                      }`}
                    >
                      {size.label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="mb-8">
                <PriceDisplay basePrice={currentSize.price} variant="detail" />
              </div>

              <div className="flex gap-3 mb-8">
                <button
                  onClick={handleAdd}
                  className="flex-1 inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-accent text-accent-foreground font-medium text-xs uppercase tracking-[0.15em] hover:bg-charcoal-light transition-colors"
                >
                  <ShoppingBag className="w-4 h-4" strokeWidth={1.5} /> Ajouter au Panier
                </button>
                <button
                  onClick={() => {
                    handleAdd();
                    navigate("/panier");
                  }}
                  className="inline-flex items-center justify-center px-6 py-3.5 border border-border text-foreground font-medium text-xs uppercase tracking-[0.15em] hover:border-foreground transition-colors"
                >
                  Commander
                </button>
              </div>

              <div className="border-t border-border pt-8 space-y-4">
                <div className="flex items-center gap-3">
                  <Truck className="w-4 h-4 text-muted-foreground" strokeWidth={1.5} />
                  <span className="text-sm text-muted-foreground">Livraison partout en Tunisie (3-5 jours)</span>
                </div>
                <div className="flex items-center gap-3">
                  <Banknote className="w-4 h-4 text-muted-foreground" strokeWidth={1.5} />
                  <span className="text-sm text-muted-foreground">Paiement à la livraison (COD)</span>
                </div>
                <div className="mt-6 p-5 bg-secondary">
                  <p className="text-xs font-medium text-foreground mb-1">Matériau: {product.material}</p>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    Panneau composite aluminium ultra-résistant. Léger, durable, et résistant aux UV. Système de fixation inclus.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Related Products Carousel */}
        <RelatedProducts
          currentProductId={product.id}
          category={product.category}
        />

      </main>

      {/* Mobile Sticky Add to Cart */}
      <div className="fixed bottom-0 left-0 right-0 bg-background border-t border-border p-4 lg:hidden z-40">
        <div className="flex items-center justify-between gap-4">
          <div>
            <PriceDisplay basePrice={currentSize.price} variant="detail" />
            <p className="text-[10px] text-muted-foreground uppercase tracking-wider">{currentSize.label}</p>
          </div>
          <button
            onClick={handleAdd}
            className="flex-1 max-w-xs inline-flex items-center justify-center gap-2 px-6 py-3 bg-accent text-accent-foreground font-medium text-xs uppercase tracking-[0.15em]"
          >
            <ShoppingBag className="w-4 h-4" strokeWidth={1.5} /> Ajouter
          </button>
        </div>
      </div>

      <div className="pb-20 lg:pb-0" />
      <Footer />
    </>
  );
};

export default ProductDetail;
