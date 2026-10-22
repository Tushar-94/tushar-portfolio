import { CopilotProjectPage } from "@/components/case-study/copilot/CopilotProjectPage";
import { ProjectStructuredData } from "@/components/seo/PageStructuredData";
import { getProject } from "@/lib/route-data";
import { projectMetadata } from "@/lib/seo/metadata";

const project = getProject("industrial-knowledge-copilot");
export const metadata = projectMetadata(project);

export default function ProjectPage() {
  return <>
    <CopilotProjectPage caseStudy={project} />
    <ProjectStructuredData project={project} />
  </>;
}
