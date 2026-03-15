import { useEffect } from "react";

interface SEOProps {
  title: string;
  description: string;
}

const useSEO = ({ title, description }: SEOProps) => {
  useEffect(() => {
    // Set page title
    document.title = title;

    // Set meta description
    let metaDescription = document.querySelector('meta[name="description"]');
    if (!metaDescription) {
      metaDescription = document.createElement("meta");
      metaDescription.setAttribute("name", "description");
      document.head.appendChild(metaDescription);
    }
    metaDescription.setAttribute("content", description);

    // Set OG title
    let ogTitle = document.querySelector('meta[property="og:title"]');
    if (!ogTitle) {
      ogTitle = document.createElement("meta");
      ogTitle.setAttribute("property", "og:title");
      document.head.appendChild(ogTitle);
    }
    ogTitle.setAttribute("content", title);

    // Set OG description
    let ogDescription = document.querySelector('meta[property="og:description"]');
    if (!ogDescription) {
      ogDescription = document.createElement("meta");
      ogDescription.setAttribute("property", "og:description");
      document.head.appendChild(ogDescription);
    }
    ogDescription.setAttribute("content", description);
  }, [title, description]);
};

export default useSEO;
