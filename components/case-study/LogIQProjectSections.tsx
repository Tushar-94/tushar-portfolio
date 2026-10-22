import type { CaseStudy } from "@/types/case-study";
import { CaseStudySection } from "./CaseStudySection";
import { LogIQRoleExperience } from "./LogIQRoleExperience";

export function LogIQProjectSections({ caseStudy }: { caseStudy: CaseStudy }) {
  return (
    <>
      <CaseStudySection number="01" title="Project Overview">
        {caseStudy.metrics && (
          <dl className="grid gap-4 sm:grid-cols-3">
            {caseStudy.metrics.map((metric) => (
              <div key={metric.label} className="rounded-xl border border-border bg-surface p-5">
                <dt className="text-xs leading-6 text-muted">{metric.label}</dt>
                <dd className="mt-3 text-4xl font-semibold tracking-[-0.05em] tabular-nums">{metric.value}</dd>
              </div>
            ))}
          </dl>
        )}
        <p className="mt-5 text-xs leading-6 text-muted">Recorded infrastructure data, predefined SQL tools, and evidence-grounded responses tailored to the person investigating.</p>
      </CaseStudySection>

      <LogIQRoleExperience note={caseStudy.architectureNote} sourceUrl={caseStudy.workedInvestigationUrl} />

      <CaseStudySection number="04" title="Explore the Code">
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
