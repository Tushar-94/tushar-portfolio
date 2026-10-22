import type { Metadata } from "next";
import { AboutPage } from "@/components/about/AboutPage";
import { pageMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = pageMetadata({ title: "About", description: "About Sunkra Tushar Rao, an AI & Machine Learning Engineer working across applied AI, computer vision, and reliable machine learning systems.", path: "/about" });

export default function About() {
  return <AboutPage />;
}
