import { profile } from "@/data/profile";
import { articleDescription, type PublishedArticle } from "./metadata";
import { canonicalUrl, identity } from "./site";

export function identitySchema() {
  const url = canonicalUrl("/");
  if (!url) return null;
  return {
    "@context": "https://schema.org",
    "@graph": [
      { "@type": "Person", "@id": `${url}#person`, name: identity.name, jobTitle: identity.role, url: canonicalUrl("/about"), sameAs: [profile.github, profile.linkedin], knowsAbout: ["Applied AI", "Machine Learning", "Computer Vision", "LLM Systems", "Retrieval-Augmented Generation", "Data Engineering"] },
      { "@type": "WebSite", "@id": `${url}#website`, url, name: identity.name, description: identity.description, inLanguage: "en", publisher: { "@id": `${url}#person` } },
    ],
  };
}

export function breadcrumbSchema(items: { name: string; path: string }[]) {
  if (!canonicalUrl("/")) return null;
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({ "@type": "ListItem", position: index + 1, name: item.name, item: canonicalUrl(item.path) })),
  };
}

export function articleSchema(article: PublishedArticle) {
  const url = canonicalUrl(`/blog/${article.slug}`);
  const home = canonicalUrl("/");
  if (!url || !home) return null;
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "@id": `${url}#article`,
    url,
    headline: article.title,
    description: articleDescription(article),
    inLanguage: "en",
    articleSection: article.category,
    keywords: article.tags?.join(", "),
    author: { "@id": `${home}#person` },
    publisher: { "@id": `${home}#person` },
    isPartOf: { "@id": `${home}#website` },
    mainEntityOfPage: { "@type": "WebPage", "@id": url },
    // Existing dates have month precision only. Do not fabricate days or modified dates.
  };
}
