import { Link } from "react-router-dom";
import { articles } from "@/data/articles";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import useSEO from "@/hooks/useSEO";

const Blog = () => {
  useSEO({
    title: "Blog Décoration Murale Tunisie – Conseils & Inspirations | Dreamscape Decor",
    description: "Conseils, guides et inspirations pour décorer votre intérieur et extérieur en Tunisie. Art mural métal, tendances déco, idées cadeaux.",
    canonical: "/blog",
  });

  return (
    <>
      <Header />
      <main className="py-20 md:py-32">
        <div className="container max-w-5xl">
          {/* Header */}
          <div className="text-center mb-16">
            <p className="text-[11px] font-medium uppercase tracking-[0.3em] text-muted-foreground mb-4">
              Conseils & Inspirations
            </p>
            <h1 className="font-heading text-3xl md:text-4xl font-normal text-foreground mb-4">
              Le Blog Décoration
            </h1>
            <div className="w-16 h-0.5 bg-gold mx-auto mb-6" />
            <p className="text-sm text-muted-foreground max-w-lg mx-auto leading-relaxed">
              Idées, guides et inspirations pour transformer vos espaces avec l'art mural en métal.
            </p>
          </div>

          {/* Articles grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {articles.map(article => (
              <Link
                key={article.slug}
                to={`/blog/${article.slug}`}
                className="group block"
              >
                {/* Cover image */}
                <div className="relative overflow-hidden rounded-sm mb-4 bg-secondary/50" style={{ aspectRatio: "16/9" }}>
                  <img
                    src={article.coverImage}
                    alt={article.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                    loading="lazy"
                    width={600}
                    height={338}
                  />
                  <span className="absolute top-3 left-3 text-[10px] font-medium uppercase tracking-wider px-2.5 py-1 rounded-sm"
                    style={{ background: "#C6A75E", color: "#F4EFEA" }}>
                    {article.category}
                  </span>
                </div>

                {/* Meta */}
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-[10px] text-muted-foreground">{article.date}</span>
                  <span className="text-[10px] text-muted-foreground">·</span>
                  <span className="text-[10px] text-muted-foreground">{article.readTime} de lecture</span>
                </div>

                {/* Title */}
                <h2 className="font-heading text-base md:text-lg font-normal text-foreground leading-snug mb-3 group-hover:text-gold transition-colors duration-200">
                  {article.title}
                </h2>

                {/* Excerpt */}
                <p className="text-xs text-muted-foreground leading-relaxed line-clamp-2">
                  {article.excerpt}
                </p>

                <p className="text-xs text-gold font-medium mt-3 uppercase tracking-wider">
                  Lire l'article →
                </p>
              </Link>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default Blog;
