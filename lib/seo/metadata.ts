import type { Metadata } from "next";
import type { BlogPost } from "@/data/blogPosts";
import type { CaseStudy } from "@/types/case-study";
import { canonicalUrl, identity, site, socialImage, socialImageUrl } from "./site";

export const robotsMetadata: Metadata["robots"] = {
  index: site.indexable,
  follow: site.indexable,
  ...(site.indexable ? { googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1, "max-video-preview": -1 } } : {}),
};

type PageMetadata = {
  title: string;
  description: string;
  path: string;
  absoluteTitle?: boolean;
  article?: { category: string; tags?: string[] };
};

export function pageMetadata({ title, description, path, absoluteTitle, article }: PageMetadata): Metadata {
  const url = canonicalUrl(path);
  return {
    title: absoluteTitle ? { absolute: title } : title,
    description,
    ...(url ? { alternates: { canonical: url } } : {}),
    robots: robotsMetadata,
    ...(article ? { authors: [{ name: identity.name, ...(canonicalUrl("/about") ? { url: canonicalUrl("/about") } : {}) }], keywords: article.tags } : {}),
    openGraph: {
      type: article ? "article" : "website",
      siteName: identity.name,
      title: absoluteTitle ? title : `${title} | ${identity.name}`,
      description,
      locale: "en_US",
      ...(url ? { url } : {}),
      ...(socialImageUrl ? { images: [{ url: socialImageUrl, width: socialImage.width, height: socialImage.height, alt: socialImage.alt, type: "image/png" }] } : {}),
      ...(article ? { section: article.category, tags: article.tags } : {}),
    },
    twitter: {
      card: "summary_large_image",
      title: absoluteTitle ? title : `${title} | ${identity.name}`,
      description,
      ...(socialImageUrl ? { images: [{ url: socialImageUrl, alt: socialImage.alt }] } : {}),
    },
  };
}

export const rootMetadata: Metadata = {
  metadataBase: site.metadataBase,
  applicationName: `${identity.name} Portfolio`,
  title: { default: identity.title, template: `%s | ${identity.name}` },
  description: identity.description,
  authors: [{ name: identity.name }],
  creator: identity.name,
  robots: robotsMetadata,
  openGraph: pageMetadata({ title: identity.title, description: identity.description, path: "/", absoluteTitle: true }).openGraph,
  twitter: pageMetadata({ title: identity.title, description: identity.description, path: "/", absoluteTitle: true }).twitter,
};

// Short SEO summaries of existing case-study content; the project registries stay unchanged.
const projectDescriptions: Record<string, string> = {
  "industrial-knowledge-copilot": "Query-aware hybrid retrieval across synthetic industrial documents, with Qdrant search, source traceability, and development-benchmark evaluation.",
  "industrial-vision-anomaly-detection": "Reference-based visual anomaly detection with DINOv2, ROI investigation, score analysis, and threshold calibration for industrial inspection.",
  "forecasting-decision-intelligence": "Hotel room-night demand forecasting from reservation data, with channel-level baselines, rolling-origin backtesting, and planning scenarios.",
  "logiq-ai-agent": "One role-aware AI agent investigates historical BGL and OpenStack logs through 19 SQL-backed tools, with evidence tailored to three audiences.",
  "industrial-defect-detection-segmentation": "YOLOv8n-seg defect detection and instance segmentation, investigating annotation quality, targeted augmentation, and class-level validation.",
  "visionseg": "A DeepLabV3 and ResNet-50 semantic segmentation framework with preprocessing and metric utilities, plus a deployment engineering roadmap.",
};

export function projectMetadata(project: CaseStudy) {
  return pageMetadata({ title: project.title, description: projectDescriptions[project.slug] ?? project.summary, path: `/projects/${project.slug}` });
}

export type PublishedArticle = BlogPost & { seoDescription?: string; tags?: string[] };

export function articleDescription(article: PublishedArticle) {
  return article.seoDescription ?? article.summary;
}

export function articleMetadata(article: PublishedArticle) {
  return pageMetadata({ title: article.title, description: articleDescription(article), path: `/blog/${article.slug}`, article: { category: article.category, tags: article.tags } });
}
