import { useEffect } from "react";
import { Product } from "@/data/products";
import { getEffectivePrice } from "@/config/promotion";

interface ProductJsonLdProps {
  product: Product;
}

const ProductJsonLd = ({ product }: ProductJsonLdProps) => {
  useEffect(() => {
    const lowestPrice = Math.min(...product.sizes.map(s => getEffectivePrice(s.price)));
    const highestPrice = Math.max(...product.sizes.map(s => getEffectivePrice(s.price)));

    const jsonLd = {
      "@context": "https://schema.org",
      "@type": "Product",
      name: product.name,
      description: product.description,
      image: `https://dreamscape-decor-nu.vercel.app/src/assets/${product.image}.webp`,
      brand: {
        "@type": "Brand",
        name: "Dreamscape Decor",
      },
      offers: {
        "@type": "AggregateOffer",
        priceCurrency: "TND",
        lowPrice: lowestPrice,
        highPrice: highestPrice,
        offerCount: product.sizes.length,
        availability: product.inStock
          ? "https://schema.org/InStock"
          : "https://schema.org/OutOfStock",
        seller: {
          "@type": "Organization",
          name: "Dreamscape Decor",
        },
      },
      material: product.material,
      countryOfOrigin: "TN",
    };

    // Remove any existing JSON-LD script for products
    const existing = document.getElementById("product-jsonld");
    if (existing) existing.remove();

    // Inject new script
    const script = document.createElement("script");
    script.id = "product-jsonld";
    script.type = "application/ld+json";
    script.text = JSON.stringify(jsonLd);
    document.head.appendChild(script);

    // Cleanup on unmount
    return () => {
      const el = document.getElementById("product-jsonld");
      if (el) el.remove();
    };
  }, [product]);

  return null;
};

export default ProductJsonLd;
