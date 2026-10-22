import Link from "next/link";
import { Container } from "@/components/layout/Container";
import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";
import { Tag } from "@/components/ui/Tag";
import { errorInvestigations, errorWorkflow, metricDefinitions, visionDecisions, visionseg, visionTechnologyGroups } from "@/data/visionseg";
import { CaseStudySection } from "../CaseStudySection";
import { CompactPipeline } from "../CompactPipeline";
import { EvaluationExplorer } from "./EvaluationExplorer";
import { SegmentationDemo } from "./SegmentationDemo";
import { SyntheticVehicle } from "./SyntheticVehicle";
import { VisionArchitecture } from "./VisionArchitecture";
import { EngineeringRoadmap } from "./EngineeringRoadmap";

export function VisionSegProjectPage() {
  return (
    <>
      <Navbar />
      <main>
        <article>
          <header className="py-16 sm:py-24">
            <Container>
              <Link href="/projects" className="font-mono text-xs text-muted transition-colors hover:text-foreground">← All projects</Link>
              <div className="mt-10 grid items-center gap-10 lg:grid-cols-[1fr_1.2fr] lg:gap-12">
                <div className="min-w-0">
                  <p className="font-mono text-xs leading-6 uppercase tracking-[0.16em] text-muted">{visionseg.category}</p>
                  <h1 className="mt-5 text-6xl font-semibold tracking-[-0.06em] sm:text-8xl lg:text-7xl xl:text-8xl">{visionseg.title}</h1>
                  <p className="mt-6 text-xl font-medium leading-8 tracking-tight sm:text-2xl">{visionseg.subtitle}</p>
                  <p className="mt-4 max-w-2xl text-base leading-7 text-muted">A configurable computer vision framework built around DeepLabV3 and ResNet-50, connecting pixel-level segmentation with reproducible evaluation and deployment-oriented engineering.</p>
                  <div className="mt-7 flex flex-wrap gap-2">{visionseg.technologies.map(item => <Tag key={item}>{item}</Tag>)}</div>
                  <div className="mt-8 flex flex-wrap items-center gap-3">
                    <Link href="#visionseg-architecture" className="inline-flex items-center gap-3 rounded-full bg-foreground px-5 py-3 text-sm font-medium text-background! transition-opacity hover:opacity-80">Explore Architecture <span aria-hidden="true">↓</span></Link>
                    <Link href="#visionseg-demo" className="inline-flex items-center gap-3 rounded-full border border-border bg-surface px-5 py-3 text-sm font-medium transition-colors hover:border-foreground">View Segmentation Demo <span aria-hidden="true">↗</span></Link>
                  </div>
                </div>
                <figure className="min-w-0 overflow-hidden rounded-2xl border border-border bg-surface">
                  <div className="border-b border-border px-4 py-3 font-mono text-[10px] leading-5 text-muted">{visionseg.tagline}</div>
                  <SyntheticVehicle />
                  <figcaption className="border-t border-border p-4">
                    <p className="text-xs font-medium leading-6">Conceptual demonstration — not model output</p>
                    <p className="mt-1 text-xs leading-6 text-muted">Original synthetic vehicle · illustrative semantic regions.</p>
                  </figcaption>
                </figure>
              </div>
            </Container>
          </header>

          <Container>
            <CaseStudySection number="01" title="Beyond Model Training">
              <p className="text-base leading-7 text-muted">Semantic segmentation assigns a class to every pixel. Reliable systems must also address inconsistent image dimensions, class imbalance, ambiguous boundaries, similar-looking classes, and dataset leakage.</p>
              <p className="mt-4 text-base leading-7 text-muted">VisionSeg is an independent framework design connecting modular preprocessing, DeepLabV3 training, evaluation, error analysis, and inference. Reproducibility and inference performance are engineering concerns throughout the lifecycle.</p>
            </CaseStudySection>

            <div id="visionseg-architecture" className="scroll-mt-24">
              <CaseStudySection number="02" title="System Architecture">
                <VisionArchitecture />
              </CaseStudySection>
            </div>

            <div id="visionseg-demo" className="scroll-mt-24">
              <CaseStudySection number="03" title="Interactive Semantic Segmentation"><SegmentationDemo /></CaseStudySection>
            </div>

            <CaseStudySection number="04" title="Understanding Where Segmentation Fails">
              <dl className="mb-6 grid gap-4 sm:grid-cols-3">
                {metricDefinitions.map(metric => <div key={metric.name} className="rounded-xl border border-border bg-surface p-4"><dt className="text-sm font-semibold">{metric.name}</dt><dd className="mt-3 text-xs leading-6 text-muted">{metric.description}</dd></div>)}
              </dl>
              <EvaluationExplorer />
              <div className="mt-5 rounded-2xl border border-border bg-surface p-4 sm:p-5">
                <h3 className="mb-4 font-mono text-[10px] uppercase tracking-[0.12em] text-muted">Error review workflow design</h3>
                <CompactPipeline label="Segmentation error analysis workflow" steps={errorWorkflow} />
              </div>
              <div className="mt-5 grid gap-4 md:grid-cols-3">
                {errorInvestigations.map(item => <section key={item.title} className="rounded-xl border border-border bg-surface p-4"><h3 className="text-sm font-semibold">{item.title}</h3><p className="mt-2 text-xs leading-6 text-muted">{item.description}</p></section>)}
              </div>
            </CaseStudySection>

            <CaseStudySection number="05" title="Engineering Beyond Accuracy">
              <p className="mb-5 text-xs leading-6 text-muted">Architectural decisions. These capabilities are described as designs where implementation is not independently verified.</p>
              <div className="grid gap-4 sm:grid-cols-2">
                {visionDecisions.map((item, index) => <section key={item.title} className="rounded-xl border border-border bg-surface p-5"><p aria-hidden="true" className="font-mono text-[10px] text-muted">0{index + 1}</p><h3 className="mt-3 text-base font-semibold tracking-tight">{item.title}</h3><p className="mt-3 text-sm leading-6 text-muted">{item.description}</p></section>)}
              </div>
            </CaseStudySection>

            <CaseStudySection number="06" title="Engineering Roadmap">
              <EngineeringRoadmap />
            </CaseStudySection>

            <CaseStudySection number="07" title="Technology Stack">
              <div className="grid gap-x-8 gap-y-6 sm:grid-cols-2">
                {visionTechnologyGroups.map(group => <section key={group.title} className="border-t border-border pt-4"><h3 className="font-mono text-xs text-muted">{group.title}</h3><ul className="mt-3 flex flex-wrap gap-2">{group.items.map(item => <li key={item} className="flex"><Tag>{item}{group.planned ? " · Planned" : ""}</Tag></li>)}</ul></section>)}
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
