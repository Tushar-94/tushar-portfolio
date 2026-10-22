import { ForecastProjectPage } from "@/components/case-study/forecasting/ForecastProjectPage";
import { ProjectStructuredData } from "@/components/seo/PageStructuredData";
import { getProject } from "@/lib/route-data";
import { projectMetadata } from "@/lib/seo/metadata";

const project = getProject("forecasting-decision-intelligence");
export const metadata = projectMetadata(project);

export default function ProjectPage() {
  return <>
    <ForecastProjectPage caseStudy={project} />
    <ProjectStructuredData project={project} />
  </>;
}
