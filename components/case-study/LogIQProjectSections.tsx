import type { CaseStudy } from "@/types/case-study";
import { CaseStudySection } from "./CaseStudySection";
import { LogIQArchitectureDiagram } from "./LogIQArchitectureDiagram";
import { LogIQRoleDemo } from "./LogIQRoleDemo";
import { ProjectMetrics } from "./ProjectMetrics";

export function LogIQProjectSections({ caseStudy }: { caseStudy: CaseStudy }) {
  return (
    <>
      <CaseStudySection number="01" title="Project Overview">
        {caseStudy.metrics && <ProjectMetrics metrics={caseStudy.metrics} />}
      </CaseStudySection>

      <CaseStudySection number="02" title="System Architecture">
        <LogIQArchitectureDiagram note={caseStudy.architectureNote} />
      </CaseStudySection>

      {caseStudy.roles && <LogIQRoleDemo roles={caseStudy.roles} />}

      <CaseStudySection number="05" title="Explore the Code">
        <h3 className="text-xl font-semibold tracking-tight">Explore the implementation</h3>
        <p className="mt-3 max-w-2xl text-sm leading-7 text-muted">
          Explore the agent, 19 investigation tools, SQL evidence retrieval, MCP integration, and Docker setup.
        </p>
        <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-4">
          {caseStudy.githubUrl && (
            <a href={caseStudy.githubUrl} target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-3 rounded-full bg-foreground px-5 py-3 text-sm font-medium text-background! transition-opacity hover:opacity-80">
              View GitHub Repository <span aria-hidden="true">↗</span>
              <span className="sr-only"> (opens in a new tab)</span>
            </a>
          )}
          {caseStudy.workedInvestigationUrl && (
            <a href={caseStudy.workedInvestigationUrl} target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm font-medium transition-colors hover:text-muted">
              View Worked Investigation <span aria-hidden="true">↗</span>
              <span className="sr-only"> (opens in a new tab)</span>
            </a>
          )}
        </div>
      </CaseStudySection>
    </>
  );
}
