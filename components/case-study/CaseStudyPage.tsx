import Link from "next/link";
import { Container } from "@/components/layout/Container";
import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";
import { Tag } from "@/components/ui/Tag";
import type { CaseStudy } from "@/types/case-study";
import { ArchitectureDiagram } from "./ArchitectureDiagram";
import { LogIQProjectSections } from "./LogIQProjectSections";
import { CaseStudySection } from "./CaseStudySection";
import { ProjectMetrics } from "./ProjectMetrics";

export function CaseStudyPage({ caseStudy }: { caseStudy: CaseStudy }) {
  const repositoryLink = caseStudy.githubUrl && (
    <a href={caseStudy.githubUrl} target="_blank" rel="noopener noreferrer"
      className="inline-flex items-center gap-4 rounded-full bg-foreground px-6 py-3 text-sm font-medium text-background! transition-opacity hover:opacity-80">
      {caseStudy.slug === "logiq-ai-agent" ? "View Source on GitHub" : "View implementation on GitHub"} <span aria-hidden="true">↗</span>
      <span className="sr-only"> (opens in a new tab)</span>
    </a>
  );

  return (
    <>
      <Navbar />
      <main>
        <article>
          <header className="py-16 sm:py-24">
            <Container>
              <Link href="/projects" className="font-mono text-xs text-muted transition-colors hover:text-foreground">← All projects</Link>
              <div className="mt-10 max-w-5xl">
                <p className="font-mono text-xs font-medium uppercase tracking-[0.18em] text-muted">{caseStudy.category} · Project overview</p>
                <h1 className="mt-5 text-4xl font-semibold tracking-[-0.04em] text-foreground sm:text-6xl lg:text-7xl">{caseStudy.title}</h1>
                <p className="mt-6 max-w-3xl text-lg leading-8 text-muted sm:text-xl">{caseStudy.summary}</p>
                <div className="mt-8 flex flex-wrap gap-2">
                  {caseStudy.technologies.map((technology) => <Tag key={technology}>{technology}</Tag>)}
                </div>
                {repositoryLink && <div className="mt-8">{repositoryLink}</div>}
              </div>
            </Container>
          </header>

          <Container>
            {caseStudy.slug === "logiq-ai-agent" ? (
              <LogIQProjectSections caseStudy={caseStudy} />
            ) : (
              <>
                {caseStudy.metrics && (
                  <CaseStudySection number="01" title="Project scale">
                    <ProjectMetrics metrics={caseStudy.metrics} />
                  </CaseStudySection>
                )}

                {caseStudy.roles && (
                  <CaseStudySection number="02" title="Role-aware intelligence">
                    <p className="mb-6 text-base leading-7 text-muted">One AI agent. Three role-specific perspectives.</p>
                    <div className="grid gap-4 xl:grid-cols-3">
                      {caseStudy.roles.map((role, index) => (
                        <section key={role.title} className="rounded-2xl border border-border bg-surface p-6 text-foreground transition-colors hover:border-foreground">
                          <p aria-hidden="true" className="font-mono text-xs opacity-70">0{index + 1}</p>
                          <h3 className="mt-6 text-xl font-semibold tracking-tight">{role.title}</h3>
                          <dl className="mt-5 text-sm leading-6">
                            <dt className="font-mono text-xs opacity-70">Focus</dt>
                            <dd className="mt-1">{role.focus}</dd>
                            <dt className="mt-5 font-mono text-xs opacity-70">Output</dt>
                            <dd className="mt-1">{role.output}</dd>
                          </dl>
                        </section>
                      ))}
                    </div>
                  </CaseStudySection>
                )}

                {caseStudy.architecture && (
                  <CaseStudySection number={caseStudy.roles ? "03" : "01"} title="System architecture">
                    <ArchitectureDiagram stages={caseStudy.architecture} note={caseStudy.architectureNote} />
                  </CaseStudySection>
                )}

                {caseStudy.investigation && (
                  <CaseStudySection number="04" title="Real investigation">
                    <h3 className="mb-8 text-xl font-semibold tracking-tight">{caseStudy.investigation.title}</h3>
                    <ProjectMetrics metrics={caseStudy.investigation.evidence} />
                    <p className="mt-8 text-sm leading-6 text-muted">{caseStudy.investigation.caveat}</p>
                    <p className="mt-5 border-l-2 border-foreground pl-5 text-base font-medium leading-7">{caseStudy.investigation.conclusion}</p>
                  </CaseStudySection>
                )}

                {caseStudy.sections.length > 0 && (
                  <CaseStudySection number="02" title="Engineering highlights">
                    <div className="grid gap-4 sm:grid-cols-2">
                      {caseStudy.sections.map((section) => (
                        <section key={section.number} className="rounded-2xl border border-border bg-surface p-6 transition-colors hover:border-foreground">
                          <h3 className="text-lg font-semibold tracking-tight">{section.title}</h3>
                          <p className="mt-3 text-sm leading-7 text-muted">{section.content}</p>
                        </section>
                      ))}
                    </div>
                  </CaseStudySection>
                )}

                {repositoryLink && (
                  <CaseStudySection number={caseStudy.roles ? "05" : "03"} title="Explore the implementation">
                    <p className="mb-6 text-base leading-7 text-muted">Source code and implementation details on GitHub.</p>
                    {repositoryLink}
                  </CaseStudySection>
                )}

              </>
            )}

            <nav aria-label="Project navigation" className="flex flex-wrap items-center justify-between gap-6 border-t border-border py-10">
              <Link href="/projects" className="text-sm font-medium transition-colors hover:text-muted">← Explore all projects</Link>
              <Link href="/#contact" className="text-sm font-medium transition-colors hover:text-muted">Get in touch →</Link>
            </nav>
          </Container>
        </article>
      </main>
      <Footer />
    </>
  );
}
