import type { MetadataRoute } from "next";
import { canonicalUrl, site } from "@/lib/seo/site";

export default function robots(): MetadataRoute.Robots {
  return {
    // Crawlers must be able to read noindex on preview/development HTML.
    rules: { userAgent: "*", allow: "/" },
    ...(site.indexable ? { sitemap: canonicalUrl("/sitemap.xml") } : {}),
  };
}
