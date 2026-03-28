import { useState, useMemo } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { ShoppingBag, Truck, Banknote, ArrowLeft, Star } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ProductGallery from "@/components/ProductGallery";
import RelatedProducts from "@/components/RelatedProducts";
import { getProductBySlug } from "@/data/products";
import { useCart } from "@/hooks/useCart";
import { getEffectivePrice, PROMOTION } from "@/config/promotion";
import PriceDisplay from "@/components/PriceDisplay";
import PromotionBadge from "@/components/PromotionBadge";
import PromotionBanner from "@/components/PromotionBanner";
import ProductJsonLd from "@/components/ProductJsonLd";
import useSEO from "@/hooks/useSEO";

// ── Delivery date (Mon–Sat, +3 business days) ──
const getEstimatedDelivery = () => {
  const days = ["Dimanche", "Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi"];
  const months = ["Jan", "Fév", "Mar", "Avr", "Mai", "Juin", "Juil", "Août", "Sep", "Oct", "Nov", "Déc"];
  let daysAdded = 0;
  const delivery = new Date();
  while (daysAdded < 3) {
    delivery.setDate(delivery.getDate() + 1);
    if (delivery.getDay() !== 0) daysAdded++;
  }
  return `${days[delivery.getDay()]} ${delivery.getDate()} ${months[delivery.getMonth()]}`;
};

// ── Scarcity — stable per product ID ──
const getStockCount = (productId: string) => {
  const seed = productId.charCodeAt(productId.length - 1);
  return (seed % 5) + 3;
};

// ── Reviews per product ──
const allReviews: Record<string, { name: string; city: string; text: string; rating: number }[]> = {
  "DSC-001": [
    { name: "Sana B.", city: "Tunis", text: "Magnifique ! L'arbre de vie est encore plus beau en vrai. Livraison rapide, je recommande à 100%.", rating: 5 },
    { name: "Amira T.", city: "Sfax", text: "Parfait pour un cadeau de mariage. Ma sœur était ravie, qualité impeccable.", rating: 5 },
    { name: "Khaled M.", city: "Sousse", text: "Installation en 5 minutes comme promis. Très satisfait de la qualité Alucobond.", rating: 5 },
  ],
  "DSC-002": [
    { name: "Rim H.", city: "Tunis", text: "Le triptyque est magnifique dans mon salon. Les oiseaux donnent vraiment vie au mur.", rating: 5 },
    { name: "Mohamed K.", city: "Nabeul", text: "Qualité premium, livraison soignée. Exactement comme sur les photos.", rating: 5 },
    { name: "Yasmine O.", city: "Monastir", text: "Superbe pièce, je l'ai offert à ma mère et elle adore !", rating: 5 },
  ],
  "DSC-003": [
    { name: "Fatma L.", city: "Sousse", text: "Très élégant, s'adapte parfaitement à mon intérieur moderne.", rating: 5 },
    { name: "Anis B.", city: "Tunis", text: "Bonne qualité, bien emballé. Le mur de ma chambre est transformé.", rating: 4 },
    { name: "Nour S.", city: "Sfax", text: "Livraison rapide et produit conforme. Je recommande vivement.", rating: 5 },
  ],
  "DSC-004": [
    { name: "Youssef M.", city: "Nabeul", text: "Le coucher de soleil est poétique. Mes invités ne peuvent pas s'empêcher de le regarder.", rating: 5 },
    { name: "Leila A.", city: "Bizerte", text: "Design très original, léger et facile à installer.", rating: 5 },
    { name: "Sami R.", city: "Tunis", text: "Excellent rapport qualité/prix. La qualité se voit tout de suite.", rating: 4 },
  ],
  "DSC-005": [
    { name: "Ines M.", city: "Tunis", text: "La silhouette est sublime, très romantique. Parfait cadeau de mariage.", rating: 5 },
    { name: "Rami B.", city: "Sousse", text: "Très belle pièce, moderne et élégante. Ma femme adore !", rating: 5 },
    { name: "Dalia K.", city: "Sfax", text: "Qualité exceptionnelle, installation facile. Je recommande.", rating: 5 },
  ],
  "DSC-006": [
    { name: "Hana T.", city: "Tunis", text: "Magnifique ! La fenêtre donne une impression de liberté à mon salon.", rating: 5 },
    { name: "Bilel R.", city: "Nabeul", text: "Très beau design, bien finit. Livraison soignée.", rating: 5 },
    { name: "Mouna A.", city: "Monastir", text: "Superbe décoration, transforme complètement l'ambiance de la pièce.", rating: 4 },
  ],
  "DSC-007": [
    { name: "Samir H.", city: "Tunis", text: "La Khomssa est magnifique, symbole fort et belle finition.", rating: 5 },
    { name: "Wafa B.", city: "Sfax", text: "Cadeau parfait, ma mère était très touchée. Qualité premium.", rating: 5 },
    { name: "Lotfi M.", city: "Sousse", text: "Très beau, conforme aux photos. Je suis très satisfait.", rating: 5 },
  ],
  "DSC-023": [
    { name: "Karim L.", city: "Sousse", text: "Parfait au-dessus de notre coin café. Les invités adorent le détail du cœur.", rating: 5 },
    { name: "Sonia M.", city: "Tunis", text: "Livraison rapide, découpe très propre. Ambiance salon de thé assurée.", rating: 5 },
    { name: "Mehdi F.", city: "Sfax", text: "Qualité Alucobond au rendu, comme sur les photos. Je recommande.", rating: 5 },
  ],
  "DSC-024": [
    { name: "Leïla K.", city: "Nabeul", text: "Coffee Time dans la cuisine : tout le monde me demande où je l’ai acheté.", rating: 5 },
    { name: "Omar B.", city: "Tunis", text: "Design sobre, très lisible de loin. Idéal pour notre petite salle à manger.", rating: 5 },
    { name: "Hend R.", city: "Ariana", text: "Installation en quelques minutes, finition nickel.", rating: 5 },
  ],
};

const getReviews = (productId: string) => {
  return allReviews[productId] || [
    { name: "Client vérifié", city: "Tunisie", text: "Très belle pièce, qualité premium. Je suis très satisfait de mon achat.", rating: 5 },
    { name: "Client vérifié", city: "Tunisie", text: "Livraison rapide et produit conforme aux photos. Installation facile.", rating: 5 },
    { name: "Client vérifié", city: "Tunisie", text: "Magnifique décoration, transforme complètement l'ambiance du salon.", rating: 5 },
  ];
};

const ProductDetail = () => {
  const { slug } = useParams();
  const product = getProductBySlug(slug || "");
  const [selectedSize, setSelectedSize] = useState(0);
  const { addItem } = useCart();
  const navigate = useNavigate();

  const deliveryDate = useMemo(() => getEstimatedDelivery(), []);

  useSEO({
    title: product
      ? `${product.name} – Tableau Métal ${product.category} | Dreamscape Decor Tunisie`
      : "Produit – Dreamscape Decor",
    description: product
      ? `${product.description} En métal Alucobond résistant UV — idéal salon, chambre, bureau et extérieur. Disponible en ${product.sizes.map(s => s.label).join(", ")}. Livraison COD Tunisie.`
      : "Décoration murale en métal Alucobond. Livraison partout en Tunisie.",
    canonical: product ? `/produit/${product.slug}` : undefined,
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
  const stockCount = getStockCount(product.id);
  const reviews = getReviews(product.id);
  const avgRating = (reviews.reduce((acc, r) => acc + r.rating, 0) / reviews.length).toFixed(1);

  // Breadcrumb schema
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Accueil", "item": "https://dreamscapedecor.art/" },
      { "@type": "ListItem", "position": 2, "name": "Collection", "item": "https://dreamscapedecor.art/produits" },
      { "@type": "ListItem", "position": 3, "name": product.name, "item": `https://dreamscapedecor.art/produit/${product.slug}` },
    ],
  };

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
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <PromotionBanner />
      <Header />
      <main className="py-10 md:py-20">
        <div className="container">
          {/* Breadcrumb navigation */}
          <nav className="flex items-center gap-2 text-xs text-muted-foreground mb-8" aria-label="Breadcrumb">
            <Link to="/" className="hover:text-foreground transition-colors">Accueil</Link>
            <span>/</span>
            <Link to="/produits" className="hover:text-foreground transition-colors">Collection</Link>
            <span>/</span>
            <span className="text-foreground">{product.name}</span>
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16">
            <div>
              {PROMOTION.active && (
                <div className="mb-2 flex justify-start">
                  <PromotionBadge />
                </div>
              )}
              <ProductGallery imageKey={product.image} productName={product.name} />
            </div>

            <div className="flex flex-col justify-center">
              <p className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground mb-3">{product.category}</p>
              <h1 className="font-heading text-3xl md:text-4xl font-normal text-foreground mb-3">{product.name}</h1>

              {/* Rating */}
              <div className="flex items-center gap-2 mb-4">
                <div className="flex gap-0.5">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-gold text-gold" />
                  ))}
                </div>
                <span className="text-xs text-muted-foreground">{avgRating} · {reviews.length} avis vérifiés</span>
              </div>

              <p className="text-sm text-muted-foreground leading-relaxed mb-4">{product.description}</p>

              {/* Exterior mention */}
              <p className="text-xs text-muted-foreground leading-relaxed mb-8 border-l-2 border-gold pl-3">
                Fabriqué en Alucobond résistant aux UV — convient pour le salon, la chambre, le bureau, le café et l'extérieur.
              </p>

              {/* Size selector */}
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

              {/* Price */}
              <div className="mb-5">
                <PriceDisplay basePrice={currentSize.price} variant="detail" />
              </div>

              {/* Scarcity */}
              <div className="flex items-center gap-2 mb-6">
                <div className="w-2 h-2 rounded-full bg-[#E07A35] animate-pulse flex-shrink-0" />
                <p className="text-xs text-[#E07A35] font-medium">
                  Plus que {stockCount} pièces disponibles
                </p>
              </div>

              {/* Action buttons */}
              <div className="flex gap-3 mb-6">
                <button
                  onClick={handleAdd}
                  className="flex-1 inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-accent text-accent-foreground font-medium text-xs uppercase tracking-[0.15em] hover:bg-charcoal-light transition-colors"
                >
                  <ShoppingBag className="w-4 h-4" strokeWidth={1.5} /> Ajouter au Panier
                </button>
                <button
                  onClick={() => { handleAdd(); navigate("/panier"); }}
                  className="inline-flex items-center justify-center px-6 py-3.5 border border-border text-foreground font-medium text-xs uppercase tracking-[0.15em] hover:border-foreground transition-colors"
                >
                  Commander
                </button>
              </div>

              {/* Delivery & info */}
              <div className="border-t border-border pt-6 space-y-3">
                <div className="flex items-start gap-3">
                  <Truck className="w-4 h-4 text-muted-foreground flex-shrink-0 mt-0.5" strokeWidth={1.5} />
                  <div>
                    <p className="text-sm font-medium text-foreground">Livraison estimée : {deliveryDate}</p>
                    <p className="text-[10px] text-muted-foreground mt-0.5">Commandez aujourd'hui · livré sous 3-5 jours ouvrables</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Banknote className="w-4 h-4 text-muted-foreground flex-shrink-0" strokeWidth={1.5} />
                  <span className="text-sm text-muted-foreground">Paiement à la livraison (COD)</span>
                </div>
                <div className="mt-4 p-5 bg-secondary">
                  <p className="text-xs font-medium text-foreground mb-1">Matériau: {product.material}</p>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    Panneau composite aluminium ultra-résistant. Léger, durable, résistant aux UV et aux intempéries. Système de fixation inclus.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Reviews */}
          <div className="mt-20 pt-16 border-t border-border">
            <div className="flex items-start justify-between mb-10">
              <div>
                <p className="text-[11px] font-medium uppercase tracking-[0.3em] text-muted-foreground mb-2">Avis clients</p>
                <h2 className="font-heading text-2xl font-normal text-foreground">
                  Ce qu'ils pensent de {product.name}
                </h2>
              </div>
              <div className="text-right hidden md:block">
                <p className="font-heading text-3xl font-normal text-foreground">{avgRating}</p>
                <div className="flex gap-0.5 justify-end mt-1">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className="w-3 h-3 fill-gold text-gold" />
                  ))}
                </div>
                <p className="text-[10px] text-muted-foreground mt-1">{reviews.length} avis vérifiés</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {reviews.map((r, i) => (
                <div key={i} className="border border-border p-6 rounded-sm">
                  <div className="flex gap-0.5 mb-4">
                    {Array.from({ length: r.rating }).map((_, j) => (
                      <Star key={j} className="w-3.5 h-3.5 fill-gold text-gold" />
                    ))}
                  </div>
                  <p className="text-sm text-foreground leading-relaxed mb-4 italic">"{r.text}"</p>
                  <p className="text-xs font-medium text-foreground uppercase tracking-wider">{r.name}</p>
                  <p className="text-[11px] text-muted-foreground mt-0.5">{r.city}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <RelatedProducts
          currentProductId={product.id}
          category={product.category}
        />
      </main>

      {/* Mobile Sticky */}
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
