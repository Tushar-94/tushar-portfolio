import { CaseStudyPage } from "@/components/case-study/CaseStudyPage";
import { ProjectStructuredData } from "@/components/seo/PageStructuredData";
import { getProject } from "@/lib/route-data";
import { projectMetadata } from "@/lib/seo/metadata";

const project = getProject("logiq-ai-agent");
export const metadata = projectMetadata(project);

export default function ProjectPage() {
  return <>
    <CaseStudyPage caseStudy={project} />
    <ProjectStructuredData project={project} />
  </>;
}
