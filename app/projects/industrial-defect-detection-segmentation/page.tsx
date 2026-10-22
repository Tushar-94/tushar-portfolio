import { DefectProjectPage } from "@/components/case-study/defect-segmentation/DefectProjectPage";
import { ProjectStructuredData } from "@/components/seo/PageStructuredData";
import { getProject } from "@/lib/route-data";
import { projectMetadata } from "@/lib/seo/metadata";

const project = getProject("industrial-defect-detection-segmentation");
export const metadata = projectMetadata(project);

export default function ProjectPage() {
  return <>
    <DefectProjectPage />
    <ProjectStructuredData project={project} />
  </>;
}
