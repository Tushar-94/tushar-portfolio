import type { MetadataRoute } from "next";
import { caseStudies } from "@/data/caseStudies";
import { blogPosts } from "@/data/blogPosts";
import { canonicalUrl, site } from "@/lib/seo/site";

export default function sitemap(): MetadataRoute.Sitemap {
  if (!site.indexable) return [];
  const paths = ["/", "/about", "/projects", "/writing", ...caseStudies.map(project => `/projects/${project.slug}`), ...blogPosts.map(article => `/blog/${article.slug}`)];
  return [...new Set(paths)].map(path => ({ url: canonicalUrl(path)! }));
}
