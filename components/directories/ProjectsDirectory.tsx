import Link from "next/link";
import { Container } from "@/components/layout/Container";
import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";
import { projects } from "@/data/projects";
import { ProjectIndex } from "./ProjectIndex";

// Directory summaries use only capabilities documented in the existing projects.
const entries = [
  { slug: "industrial-knowledge-copilot", descriptor: "Enterprise RAG · Hybrid Retrieval · Qdrant" },
  { slug: "industrial-vision-anomaly-detection", descriptor: "DINOv2 · Few-Shot Learning · Anomaly Detection" },
  { slug: "forecasting-decision-intelligence", descriptor: "Time Series · Forecasting · Model Evaluation" },
  { slug: "logiq-ai-agent", descriptor: "AI Agents · SQL Tool Calling · SereneDB" },
  { slug: "industrial-defect-detection-segmentation", descriptor: "YOLOv8 · Instance Segmentation · Defect Detection" },
  { slug: "visionseg", descriptor: "DeepLabV3 · Semantic Segmentation · PyTorch" },
];

function categoryFor(category: string) {
  if (category.includes("Computer Vision")) return "Computer Vision";
  if (category.includes("Data Science")) return "Data / ML";
  if (category === "Agentic AI" || category === "Generative AI") return "Applied AI";
  return category;
}

export function ProjectsDirectory() {
  const items = projects
    .map(project => ({ project, entry: entries.find(item => item.slug === project.slug) }))
    .sort((a, b) => entries.findIndex(item => item.slug === a.project.slug) - entries.findIndex(item => item.slug === b.project.slug))
    .map(({ project, entry }, position) => ({
      slug: project.slug,
      title: project.title,
      category: categoryFor(project.category),
      descriptor: entry?.descriptor ?? project.description,
      number: String(position + 1).padStart(2, "0"),
    }));

  return <>
    <a href="#projects-content" className="fixed left-6 top-3 z-[100] -translate-y-[160%] bg-foreground px-5 py-3 text-background! focus:translate-y-0">Skip to content</a>
    <Navbar activePath="/projects" />
    <main id="projects-content" tabIndex={-1} className="pb-12 focus:outline-none sm:pb-16">
      <Container>
        <header className="py-10 sm:pb-12 sm:pt-14 lg:pt-16">
          <p className="font-mono text-[10px] uppercase leading-5 tracking-[0.12em] text-muted">SELECTED WORK / {String(items.length).padStart(2, "0")} PROJECTS</p>
          <h1 className="mt-6 max-w-[1000px] text-[clamp(40px,6.2vw,82px)] font-medium leading-[1.08] tracking-[-0.06em]">
            <span className="block text-balance">From complex problems</span>{" "}
            <span className="block text-balance text-muted">to engineered solutions.</span>
          </h1>
          <p className="mt-6 max-w-[620px] text-sm leading-7 text-muted sm:text-[15px]">A selection of applied AI, computer vision, and machine learning projects—exploring how models, data, and engineering decisions come together to solve real-world problems.</p>
        </header>
        <ProjectIndex items={items} />
        <nav className="mt-5 flex flex-wrap items-center justify-between gap-x-8 gap-y-1 text-xs leading-6" aria-label="Continue exploring">
          <p className="text-muted">Notes from the process.</p>
          <Link href="/writing" className="inline-flex min-h-11 items-center gap-4 hover:underline! hover:underline-offset-4 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-foreground">Read the writing <span aria-hidden="true">→</span></Link>
        </nav>
      </Container>
    </main>
    <Footer />
  </>;
}
