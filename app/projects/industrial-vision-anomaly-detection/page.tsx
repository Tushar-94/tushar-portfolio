import { AnomalyProjectPage } from "@/components/case-study/anomaly/AnomalyProjectPage";
import { ProjectStructuredData } from "@/components/seo/PageStructuredData";
import { getProject } from "@/lib/route-data";
import { projectMetadata } from "@/lib/seo/metadata";

const project = getProject("industrial-vision-anomaly-detection");
export const metadata = projectMetadata(project);

export default function ProjectPage() {
  return <>
    <AnomalyProjectPage />
    <ProjectStructuredData project={project} />
  </>;
}
