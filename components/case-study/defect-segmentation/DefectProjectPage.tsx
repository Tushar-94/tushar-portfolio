import Link from "next/link";
import { Container } from "@/components/layout/Container";
import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";
import { Tag } from "@/components/ui/Tag";
import { defectClasses, defectSegmentation, segmentationInsights, segmentationTechnologyGroups } from "@/data/defectSegmentation";
import { CaseStudySection } from "../CaseStudySection";
import { DatasetEngineering } from "./DatasetEngineering";
import { DefectArchitecture } from "./DefectArchitecture";
import { InspectionDemo } from "./InspectionDemo";
import { PerformanceComparison } from "./PerformanceComparison";
import { SyntheticComponent } from "./SyntheticComponent";

const validationHighlights = [
  { value: "81.5%", label: "Overall Mask Precision" },
  { value: "77.7%", label: "Overall Mask mAP50" },
  { value: "96.6%", label: "Sink-Mark Mask mAP50" },
];

export function DefectProjectPage() {
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
                  <p className="font-mono text-xs uppercase tracking-[0.16em] text-muted">{defectSegmentation.category}</p>
                  <h1 className="mt-5 text-4xl font-semibold tracking-[-0.04em] sm:text-6xl">{defectSegmentation.title}</h1>
                  <p className="mt-6 max-w-3xl text-xl font-medium leading-8 tracking-tight sm:text-2xl">{defectSegmentation.heroSubtitle}</p>
                  <p className="mt-4 max-w-2xl text-base leading-7 text-muted">A deep learning pipeline for detecting manufacturing defects and localizing affected regions through instance segmentation.</p>
                  <div className="mt-7 flex flex-wrap gap-2">
                    {defectSegmentation.heroTechnologies.map(technology => <Tag key={technology}>{technology}</Tag>)}
                  </div>
                  <div className="mt-8 flex flex-wrap items-center gap-3">
                    <Link href="#defect-architecture" className="inline-flex items-center gap-3 rounded-full bg-foreground px-5 py-3 text-sm font-medium text-background! transition-opacity hover:opacity-80">Explore System <span aria-hidden="true">↓</span></Link>
                    <Link href="#inspection-demo" className="inline-flex items-center gap-3 rounded-full border border-border bg-surface px-5 py-3 text-sm font-medium transition-colors hover:border-foreground">View Inspection Demo <span aria-hidden="true">↗</span></Link>
                  </div>
                </div>
                <figure className="min-w-0 overflow-hidden rounded-2xl border border-border bg-surface">
                  <div className="flex items-center justify-between gap-3 border-b border-border px-4 py-3 font-mono text-[10px] text-muted">
                    <span>Defect boundaries, made visible</span><span aria-hidden="true">⌖</span>
                  </div>
                  <SyntheticComponent />
                  <figcaption className="border-t border-border p-4">
                    <p className="text-xs font-medium leading-6">Illustrative segmentation visualization</p>
                    <p className="mt-1 text-xs leading-6 text-muted">Synthetic component · not actual model output.</p>
                  </figcaption>
                </figure>
              </div>
            </Container>
          </header>

          <Container>
            <CaseStudySection number="01" title="Project Overview">
              <p className="text-base leading-7 text-muted">Manufacturing defects can be subtle, irregular, and difficult to localize consistently. Image classification indicates whether a defect exists, but does not identify its spatial boundaries.</p>
              <p className="mt-4 text-base leading-7 text-muted">YOLOv8 instance segmentation identifies individual defects and generates pixel-level masks. This project investigates Short Shot and Sink Mark through refined polygon annotations, targeted augmentation, GPU training, and class-specific evaluation.</p>
              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                {defectClasses.map(defect => (
                  <section key={defect.id} className="rounded-xl border border-border bg-surface p-5">
                    <h3 className="flex items-center gap-2 text-sm font-semibold"><span aria-hidden="true" className="h-2 w-2 rounded-full" style={{ backgroundColor: defect.color }} />{defect.name}</h3>
                    <p className="mt-3 text-sm leading-6 text-muted">{defect.description}</p>
                  </section>
                ))}
              </div>
            </CaseStudySection>

            <div id="defect-architecture" className="scroll-mt-24">
              <CaseStudySection number="02" title="System Architecture">
                <DefectArchitecture />
              </CaseStudySection>
            </div>

            <div id="inspection-demo" className="scroll-mt-24">
              <CaseStudySection number="03" title="Interactive Visual Inspection">
                <InspectionDemo />
              </CaseStudySection>
            </div>

            <CaseStudySection number="04" title="Data Quality Before Model Complexity">
              <DatasetEngineering />
            </CaseStudySection>

            <CaseStudySection number="05" title="Measured Validation Performance">
              <p className="mb-5 font-mono text-[11px] leading-6 text-muted">Augmented-model validation · YOLOv8n-seg · NVIDIA A100 training</p>
              <dl className="grid gap-4 sm:grid-cols-3">
                {validationHighlights.map(metric => (
                  <div key={metric.label} className="flex flex-col rounded-xl border border-border bg-surface p-5">
                    <dt className="order-2 mt-4 text-xs font-medium leading-6">{metric.label}</dt>
                    <dd className="order-1 text-4xl font-semibold tracking-[-0.05em] tabular-nums">{metric.value}</dd>
                  </div>
                ))}
              </dl>
              <div className="mt-6"><PerformanceComparison /></div>
            </CaseStudySection>

            <CaseStudySection number="06" title="What the Experiments Revealed">
              <div className="grid gap-4 md:grid-cols-3">
                {segmentationInsights.map((insight, index) => (
                  <section key={insight.title} className="rounded-xl border border-border bg-surface p-5">
                    <span aria-hidden="true" className="font-mono text-[10px] text-muted">0{index + 1}</span>
                    <h3 className="mt-3 text-base font-semibold leading-6 tracking-tight">{insight.title}</h3>
                    <p className="mt-3 text-sm leading-6 text-muted">{insight.description}</p>
                  </section>
                ))}
              </div>
            </CaseStudySection>

            <CaseStudySection number="07" title="Technology Stack">
              <div className="grid gap-x-8 gap-y-6 sm:grid-cols-2">
                {segmentationTechnologyGroups.map(group => (
                  <section key={group.title} className="border-t border-border pt-4">
                    <h3 className="font-mono text-xs text-muted">{group.title}</h3>
                    <ul className="mt-3 flex flex-wrap gap-2">
                      {group.items.map(item => <li key={item} className="flex"><Tag>{item}</Tag></li>)}
                    </ul>
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
