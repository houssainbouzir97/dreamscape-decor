import { useParams, Link } from "react-router-dom";
import { getArticleBySlug, articles } from "@/data/articles";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import useSEO from "@/hooks/useSEO";
import { ArrowLeft } from "lucide-react";

const BlogArticle = () => {
  const { slug } = useParams();
  const article = getArticleBySlug(slug || "");

  useSEO({
    title: article ? article.metaTitle : "Article – Dreamscape Decor",
    description: article ? article.metaDescription : "Blog décoration murale Tunisie",
    canonical: article ? `/blog/${article.slug}` : "/blog",
  });

  if (!article) {
    return (
      <>
        <Header />
        <main className="py-24 text-center container">
          <h1 className="font-heading text-2xl font-normal text-foreground mb-4">Article introuvable</h1>
          <Link to="/blog" className="text-muted-foreground underline text-sm">Retour au blog</Link>
        </main>
        <Footer />
      </>
    );
  }

  // Article schema
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": article.title,
    "description": article.metaDescription,
    "image": `https://dreamscapedecor.art${article.coverImage}`,
    "datePublished": article.date,
    "author": {
      "@type": "Organization",
      "name": "Dreamscape Decor",
      "url": "https://dreamscapedecor.art",
    },
    "publisher": {
      "@type": "Organization",
      "name": "Dreamscape Decor",
      "logo": {
        "@type": "ImageObject",
        "url": "https://dreamscapedecor.art/logo.webp",
      },
    },
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `https://dreamscapedecor.art/blog/${article.slug}`,
    },
  };

  // Breadcrumb schema
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Accueil", "item": "https://dreamscapedecor.art/" },
      { "@type": "ListItem", "position": 2, "name": "Blog", "item": "https://dreamscapedecor.art/blog" },
      { "@type": "ListItem", "position": 3, "name": article.title, "item": `https://dreamscapedecor.art/blog/${article.slug}` },
    ],
  };

  // Convert markdown-like content to HTML paragraphs
  const renderContent = (content: string) => {
    const lines = content.split("\n");
    return lines.map((line, i) => {
      if (line.startsWith("## ")) {
        return <h2 key={i} className="font-heading text-xl md:text-2xl font-normal text-foreground mt-10 mb-4">{line.replace("## ", "")}</h2>;
      }
      if (line.startsWith("### ")) {
        return <h3 key={i} className="font-heading text-lg font-normal text-foreground mt-8 mb-3">{line.replace("### ", "")}</h3>;
      }
      if (line.startsWith("- ")) {
        return <li key={i} className="text-sm text-muted-foreground leading-relaxed ml-4 mb-1">{line.replace("- ", "")}</li>;
      }
      if (line.startsWith("**") && line.endsWith("**")) {
        return <p key={i} className="text-sm font-semibold text-foreground mt-4 mb-2">{line.replace(/\*\*/g, "")}</p>;
      }
      if (line.trim() === "") return <div key={i} className="h-2" />;
      // Handle inline bold
      const parts = line.split(/\*\*(.*?)\*\*/g);
      if (parts.length > 1) {
        return (
          <p key={i} className="text-sm text-muted-foreground leading-[1.9] mb-2">
            {parts.map((part, j) => j % 2 === 1 ? <strong key={j} className="text-foreground font-medium">{part}</strong> : part)}
          </p>
        );
      }
      return <p key={i} className="text-sm text-muted-foreground leading-[1.9] mb-2">{line}</p>;
    });
  };

  // Other articles for "related" section
  const related = articles.filter(a => a.slug !== article.slug).slice(0, 2);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <Header />
      <main className="py-12 md:py-20">
        <div className="container max-w-3xl">

          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-xs text-muted-foreground mb-8">
            <Link to="/" className="hover:text-foreground transition-colors">Accueil</Link>
            <span>/</span>
            <Link to="/blog" className="hover:text-foreground transition-colors">Blog</Link>
            <span>/</span>
            <span className="text-foreground truncate max-w-[200px]">{article.title}</span>
          </nav>

          {/* Article header */}
          <div className="mb-8">
            <span className="text-[10px] font-medium uppercase tracking-wider px-2.5 py-1 rounded-sm mb-4 inline-block"
              style={{ background: "#C6A75E", color: "#F4EFEA" }}>
              {article.category}
            </span>
            <h1 className="font-heading text-2xl md:text-3xl lg:text-4xl font-normal text-foreground leading-snug mb-4 mt-3">
              {article.title}
            </h1>
            <div className="flex items-center gap-3 text-[11px] text-muted-foreground">
              <span>{article.date}</span>
              <span>·</span>
              <span>{article.readTime} de lecture</span>
            </div>
          </div>

          {/* Cover image */}
          <div className="overflow-hidden rounded-sm mb-10" style={{ aspectRatio: "16/9" }}>
            <img
              src={article.coverImage}
              alt={article.title}
              className="w-full h-full object-cover"
              width={900}
              height={506}
              loading="eager"
            />
          </div>

          {/* Content */}
          <article className="mb-16">
            {renderContent(article.content)}
          </article>

          {/* CTA box */}
          <div className="border-l-4 border-gold bg-secondary/40 p-6 rounded-sm mb-16">
            <p className="text-sm font-medium text-foreground mb-2">Découvrez notre collection</p>
            <p className="text-xs text-muted-foreground leading-relaxed mb-4">
              Tous nos tableaux sont fabriqués en Alucobond premium. Livraison COD dans les 24 gouvernorats de Tunisie.
            </p>
            <Link
              to="/produits"
              className="inline-flex items-center px-6 py-3 bg-accent text-accent-foreground text-xs font-medium uppercase tracking-[0.15em] hover:opacity-90 transition-opacity"
            >
              Voir la Collection →
            </Link>
          </div>

          {/* Related articles */}
          {related.length > 0 && (
            <div>
              <h2 className="font-heading text-xl font-normal text-foreground mb-6">Articles similaires</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {related.map(rel => (
                  <Link key={rel.slug} to={`/blog/${rel.slug}`} className="group block border border-border rounded-sm p-5 hover:border-gold transition-colors">
                    <span className="text-[10px] text-muted-foreground uppercase tracking-wider">{rel.category}</span>
                    <h3 className="font-heading text-base font-normal text-foreground mt-1 mb-2 leading-snug group-hover:text-gold transition-colors">
                      {rel.title}
                    </h3>
                    <p className="text-xs text-muted-foreground line-clamp-2 leading-relaxed">{rel.excerpt}</p>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* Back to blog */}
          <div className="mt-12 pt-8 border-t border-border">
            <Link to="/blog" className="inline-flex items-center gap-2 text-xs text-muted-foreground hover:text-foreground transition-colors uppercase tracking-wider">
              <ArrowLeft className="w-3.5 h-3.5" strokeWidth={1.5} /> Retour au blog
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default BlogArticle;
