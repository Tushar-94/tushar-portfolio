import { profile } from "@/data/profile";
import { resolveSiteConfig } from "./config";

export const identity = {
  name: profile.name,
  role: "AI & Machine Learning Engineer",
  title: `${profile.name} — AI & Machine Learning Engineer`,
  description: "Engineering intelligent systems across machine learning, computer vision, and applied AI, with a focus on reliable, practical solutions.",
};

export const site = resolveSiteConfig({
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL,
  nodeEnv: process.env.NODE_ENV,
  vercelEnv: process.env.VERCEL_ENV,
  deployContext: process.env.CONTEXT,
});

/** Omit public URLs until the owner supplies an actual production origin. */
export function canonicalUrl(path: string) {
  return site.url ? new URL(path, site.url).toString() : undefined;
}

export const socialImage = {
  path: "/og",
  width: 1200,
  height: 630,
  alt: `${identity.name}, ${identity.role}. Engineering Intelligence. Building What Matters.`,
};

export const socialImageUrl = site.metadataBase ? new URL(socialImage.path, site.metadataBase).toString() : undefined;
