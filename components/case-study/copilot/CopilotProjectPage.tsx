import Link from "next/link";
import { Container } from "@/components/layout/Container";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Tag } from "@/components/ui/Tag";
import { CaseStudySection } from "../CaseStudySection";
import { CopilotPerformance } from "./CopilotPerformance";
import { capabilities, copilot, experiments, principles, technologyGroups } from "@/data/copilot";
import type { CaseStudy } from "@/types/case-study";
import { CopilotArchitecture } from "./CopilotArchitecture";
import { CopilotInvestigation } from "./CopilotInvestigation";
import { ImplementationStatus } from "./ImplementationStatus";

const targetTechnologies = new Set(["LLMs", "FastAPI", "Docker", "RAG"]);

export function CopilotProjectPage({ caseStudy }: { caseStudy: CaseStudy }) {
  return (
    <>
      <Navbar />
      <main>
        <article>
          <header className="py-16 sm:py-24">
            <Container>
              <Link href="/projects" className="font-mono text-xs text-muted transition-colors hover:text-foreground">← All projects</Link>
              <div className="mt-10 max-w-5xl">
                <p className="font-mono text-xs uppercase tracking-[0.16em] text-muted">{copilot.category}</p>
                <h1 className="mt-5 text-4xl font-semibold tracking-[-0.04em] sm:text-6xl lg:text-7xl">{copilot.title}</h1>
                <p className="mt-6 max-w-3xl text-xl font-medium leading-8 tracking-tight sm:text-2xl">{copilot.subtitle}</p>
                <p className="mt-4 max-w-3xl text-base leading-7 text-muted">
                  Query-aware hybrid retrieval for industrial documentation. An evaluated search foundation for evidence-grounded technical assistance.
                </p>
                <div className="mt-7 flex flex-wrap gap-2">
                  {copilot.technologies.map((technology) => (
                    <Tag key={technology}>{technology}{targetTechnologies.has(technology) ? " · Target" : ""}</Tag>
                  ))}
                </div>
                {caseStudy.githubUrl && (
                  <a href={caseStudy.githubUrl} target="_blank" rel="noopener noreferrer"
                    className="mt-7 inline-flex items-center gap-3 rounded-full bg-foreground px-5 py-3 text-sm font-medium text-background! transition-opacity hover:opacity-80">
                    View Source on GitHub <span aria-hidden="true">↗</span>
                    <span className="sr-only"> (opens in a new tab)</span>
                  </a>
                )}
              </div>
            </Container>
          </header>

          <Container>
            <CaseStudySection number="01" title="Project Overview">
              <p className="max-w-3xl text-base leading-7 text-muted">
                Manuals, maintenance procedures, equipment specifications, alarm catalogs, and spare-part documentation contain answers. Engineers need a reliable way to find them without searching documents.
              </p>
              <p className="mt-4 max-w-3xl text-base leading-7 text-muted">
                The retrieval engine combines Qdrant search, conditional BM25, and shared metadata filtering. The target RAG system adds LLM answers for equipment alarms, maintenance procedures, and spare parts.
              </p>
              <div className="mt-7 grid gap-6 md:grid-cols-3">
                {principles.map((principle, index) => (
                  <div key={principle.title} className="border-l border-border pl-4">
                    <p aria-hidden="true" className="font-mono text-xs text-muted">0{index + 1}</p>
                    <h3 className="mt-3 text-base font-semibold tracking-tight">{principle.title}</h3>
                    <p className="mt-2 text-sm leading-6 text-muted">{principle.description}</p>
                  </div>
                ))}
              </div>
            </CaseStudySection>

            <div id="copilot-architecture" className="scroll-mt-24">
              <CaseStudySection number="02" title="System Architecture">
                <CopilotArchitecture />
              </CaseStudySection>
            </div>

            <CaseStudySection number="03" title="Core Capabilities">
              <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
                {capabilities.map((capability) => (
                  <section key={capability.title} className={`flex min-w-0 flex-col rounded-xl border border-border p-5 ${capability.target ? "border-dashed bg-background" : "bg-surface"}`}>
                    <ImplementationStatus target={capability.target} />
                    <h3 className="mt-4 text-base font-semibold tracking-tight">{capability.title}</h3>
                    <p className="mt-2 text-sm leading-6 text-muted">{capability.description}</p>
                  </section>
                ))}
              </div>
            </CaseStudySection>

            <CaseStudySection number="04" title="Investigation in Action">
              <CopilotInvestigation />
            </CaseStudySection>

            <CaseStudySection number="05" title="Retrieval Performance">
              <CopilotPerformance />
              <p className="mt-5 font-mono text-[11px] leading-6 text-muted">154 synthetic chunks · 90 automated tests passing at the local V2 checkpoint</p>
            </CaseStudySection>

            <CaseStudySection number="06" title="Engineered Through Evaluation">
              <div className="grid gap-4 sm:grid-cols-2">
                {experiments.map((experiment) => (
                  <section key={experiment.title} className="flex min-w-0 flex-col rounded-xl border border-border bg-surface p-5">
                    <h3 className="text-base font-semibold tracking-tight">{experiment.title}</h3>
                    <dl className="mt-4 flex flex-1 flex-col text-sm leading-6">
                      <div>
                        <dt className="font-mono text-[10px] uppercase tracking-[0.12em] text-muted">Finding</dt>
                        <dd className="mt-1 text-muted">{experiment.finding}</dd>
                      </div>
                      <div className="mt-auto pt-4">
                        <dt className="font-mono text-[10px] uppercase tracking-[0.12em] text-muted">Engineering change <span aria-hidden="true">→</span></dt>
                        <dd className="mt-1">{experiment.change}</dd>
                      </div>
                    </dl>
                  </section>
                ))}
              </div>
              <p className="mt-5 text-xs leading-6 text-muted"><strong className="font-medium text-foreground">Evaluation Integrity.</strong> Development and diagnostic benchmarks are explicitly distinguished from genuinely unseen evaluation.</p>
            </CaseStudySection>

            <CaseStudySection number="07" title="Technology Stack">
              <p className="mb-5 text-xs leading-5 text-muted">“Target” marks planned integration. RAG refers to the full retrieval-and-generation architecture.</p>
              <div className="grid gap-x-8 gap-y-6 sm:grid-cols-2">
                {technologyGroups.map((group) => (
                  <section key={group.title} className="border-t border-border pt-4">
                    <h3 className="font-mono text-xs text-muted">{group.title}</h3>
                    <ul className="mt-3 flex flex-wrap gap-2">
                      {group.items.map((item) => (
                        <li key={item.name}><Tag>{item.name}{item.target ? " · Target" : ""}</Tag></li>
                      ))}
                    </ul>
                  </section>
                ))}
              </div>
            </CaseStudySection>

            <CaseStudySection number="08" title="Explore the Code">
              <h3 className="text-xl font-semibold tracking-tight">Explore the Engineering Behind the System</h3>
              <p className="mt-3 text-sm leading-7 text-muted">Explore the retrieval architecture, experiments, evaluation methodology, source code, automated tests, and engineering documentation.</p>
              <div className="mt-6 flex flex-wrap items-center gap-5">
                {caseStudy.githubUrl ? (
                  <a href={caseStudy.githubUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-3 rounded-full bg-foreground px-5 py-3 text-sm font-medium text-background! transition-opacity hover:opacity-80">
                    View GitHub Repository <span aria-hidden="true">↗</span><span className="sr-only"> (opens in a new tab)</span>
                  </a>
                ) : <p className="text-xs text-muted">A verified repository URL is not available.</p>}
                <Link href="#copilot-architecture" className="text-sm font-medium transition-colors hover:text-muted">Explore Architecture <span aria-hidden="true">↑</span></Link>
              </div>
            </CaseStudySection>

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
