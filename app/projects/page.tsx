import type { Metadata } from "next";
import { ProjectsDirectory } from "@/components/directories/ProjectsDirectory";
import { pageMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = pageMetadata({ title: "Projects", description: "Technical case studies by Sunkra Tushar Rao spanning applied AI, computer vision, retrieval systems, and forecasting.", path: "/projects" });

export default function ProjectsPage() {
  return <ProjectsDirectory />;
}
