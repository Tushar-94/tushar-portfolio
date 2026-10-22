import Link from "next/link";
import { Container } from "@/components/layout/Container";
import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";
import { Tag } from "@/components/ui/Tag";
import { anomalyDecisions, anomalyDetection, anomalyTechnologyGroups } from "@/data/anomalyDetection";
import { CaseStudySection } from "../CaseStudySection";
import { AnomalyArchitecture } from "./AnomalyArchitecture";
import { AnomalyEvaluation } from "./AnomalyEvaluation";
import { AnomalyInspection } from "./AnomalyInspection";
import { SyntheticAnomalyComponent } from "./SyntheticAnomalyComponent";
import { ThresholdComparison } from "./ThresholdComparison";

export function AnomalyProjectPage() {
  return (
    <>
      <Navbar />
      <main>
        <article>
          <header className="py-16 sm:py-24">
            <Container>
              <Link href="/projects" className="font-mono text-xs text-muted transition-colors hover:text-foreground">← All projects</Link>
              <div className="mt-10 grid items-center gap-10 lg:grid-cols-[1.2fr_1fr] lg:gap-12">
                <div className="min-w-0">
                  <p className="font-mono text-xs leading-6 uppercase tracking-[0.16em] text-muted">{anomalyDetection.category}</p>
                  <h1 className="mt-5 text-4xl font-semibold tracking-[-0.04em] sm:text-6xl">{anomalyDetection.title}</h1>
                  <p className="mt-6 text-xl font-medium leading-8 tracking-tight sm:text-2xl">{anomalyDetection.subtitle}</p>
                  <p className="mt-4 max-w-2xl text-base leading-7 text-muted">A reference-based inspection pipeline that uses DINOv2 visual representations to identify manufacturing anomalies without extensive defect-specific annotations.</p>
                  <div className="mt-7 flex flex-wrap gap-2">
                    {anomalyDetection.heroTechnologies.map(technology => <Tag key={technology}>{technology}</Tag>)}
                  </div>
                  <div className="mt-8 flex flex-wrap items-center gap-3">
                    <Link href="#anomaly-architecture" className="inline-flex items-center gap-3 rounded-full bg-foreground px-5 py-3 text-sm font-medium text-background! transition-opacity hover:opacity-80">Explore Architecture <span aria-hidden="true">↓</span></Link>
                    <Link href="#anomaly-inspection" className="inline-flex items-center gap-3 rounded-full border border-border bg-surface px-5 py-3 text-sm font-medium transition-colors hover:border-foreground">View Inspection Demo <span aria-hidden="true">↗</span></Link>
                  </div>
                </div>
                <figure className="min-w-0 overflow-hidden rounded-2xl border border-border bg-surface">
                  <div className="flex items-center justify-between gap-3 border-b border-border px-4 py-3 font-mono text-[10px] text-muted"><span>Visual deviation, made visible</span><span aria-hidden="true">⌖</span></div>
                  <SyntheticAnomalyComponent />
                  <figcaption className="border-t border-border p-4">
                    <p className="text-xs font-medium leading-6">Illustrative anomaly visualization</p>
                    <p className="mt-1 text-xs leading-6 text-muted">Synthetic component · not actual model output.</p>
                  </figcaption>
                </figure>
              </div>
            </Container>
          </header>
          <Container>
            <CaseStudySection number="01" title="Project Overview">
              <p className="text-base leading-7 text-muted">Industrial defects are difficult to model when annotated examples are limited and visual conditions vary. Supervised detection typically depends on examples of known defect categories.</p>
              <p className="mt-4 text-base leading-7 text-muted">This reference-based workflow compares incoming images against confirmed-good visual representations. DINOv2 extracts features, while ROI-aware processing reduces the influence of irrelevant regions. The result measures visual deviation rather than assigning a specific defect category.</p>
            </CaseStudySection>

            <div id="anomaly-architecture" className="scroll-mt-24">
              <CaseStudySection number="02" title="System Architecture"><AnomalyArchitecture /></CaseStudySection>
            </div>

            <div id="anomaly-inspection" className="scroll-mt-24">
              <CaseStudySection number="03" title="Interactive Anomaly Inspection"><AnomalyInspection /></CaseStudySection>
            </div>

            <CaseStudySection number="04" title="Evaluating Anomaly Separation">
              <p className="mb-6 text-sm leading-7 text-muted">Evaluate ranking separately from inspection decisions. The calibration estimate and earlier ROI investigation below come from distinct evaluation contexts.</p>
              <AnomalyEvaluation />
            </CaseStudySection>

            <CaseStudySection number="05" title="Balancing Detection and False Alarms"><ThresholdComparison /></CaseStudySection>

            <CaseStudySection number="06" title="Engineering Beyond the Model">
              <div className="grid gap-4 md:grid-cols-3">
                {anomalyDecisions.map((decision, index) => (
                  <section key={decision.title} className="rounded-xl border border-border bg-surface p-5">
                    <span aria-hidden="true" className="font-mono text-[10px] text-muted">0{index + 1}</span>
                    <h3 className="mt-3 text-base font-semibold leading-6 tracking-tight">{decision.title}</h3>
                    <p className="mt-3 text-sm leading-6 text-muted">{decision.description}</p>
                  </section>
                ))}
              </div>
              <p className="mt-5 border-l-2 border-foreground pl-4 text-xs leading-6 text-muted">Historical threshold and ROI investigations revealed that anomaly ranking and operational inspection decisions require separate evaluation.</p>
            </CaseStudySection>

            <CaseStudySection number="07" title="Technology Stack">
              <div className="grid gap-x-8 gap-y-6 sm:grid-cols-2">
                {anomalyTechnologyGroups.map(group => (
                  <section key={group.title} className="border-t border-border pt-4">
                    <h3 className="font-mono text-xs text-muted">{group.title}</h3>
                    <ul className="mt-3 flex flex-wrap gap-2">
                      {group.items.map(item => <li key={item} className="flex"><Tag>{item}{group.planned ? " · Planned" : ""}</Tag></li>)}
                    </ul>
                    {group.planned && <p className="mt-3 text-xs leading-6 text-muted">Intended integration targets. API, container, and Jetson deployment are not claimed.</p>}
                  </section>
                ))}
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
