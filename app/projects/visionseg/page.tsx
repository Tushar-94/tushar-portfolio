import { VisionSegProjectPage } from "@/components/case-study/visionseg/VisionSegProjectPage";
import { ProjectStructuredData } from "@/components/seo/PageStructuredData";
import { getProject } from "@/lib/route-data";
import { projectMetadata } from "@/lib/seo/metadata";

const project = getProject("visionseg");
export const metadata = projectMetadata(project);

export default function ProjectPage() {
  return <>
    <VisionSegProjectPage />
    <ProjectStructuredData project={project} />
  </>;
}
