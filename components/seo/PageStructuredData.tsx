import type { CaseStudy } from "@/types/case-study";
import type { PublishedArticle } from "@/lib/seo/metadata";
import { articleSchema, breadcrumbSchema } from "@/lib/seo/structured-data";
import { JsonLd } from "./JsonLd";

export function ProjectStructuredData({ project }: { project: CaseStudy }) {
  return <JsonLd data={breadcrumbSchema([
    { name: "Home", path: "/" },
    { name: "Projects", path: "/projects" },
    { name: project.title, path: `/projects/${project.slug}` },
  ])} />;
}

export function ArticleStructuredData({ article }: { article: PublishedArticle }) {
  return <>
    <JsonLd data={articleSchema(article)} />
    <JsonLd data={breadcrumbSchema([
      { name: "Home", path: "/" },
      { name: "Writing", path: "/writing" },
      { name: article.title, path: `/blog/${article.slug}` },
    ])} />
  </>;
}
