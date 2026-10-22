import { notFound } from "next/navigation";
import { caseStudies } from "@/data/caseStudies";
import { blogPosts } from "@/data/blogPosts";

export function getProject(slug: string) {
  const project = caseStudies.find(item => item.slug === slug);
  if (!project) notFound();
  return project;
}

export function getArticle(slug: string) {
  const article = blogPosts.find(item => item.slug === slug);
  if (!article) notFound();
  return article;
}
