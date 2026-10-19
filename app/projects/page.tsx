import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";
import { Container } from "@/components/layout/Container";
import { ProjectCard } from "@/components/ui/ProjectCard";
import { projects } from "@/data/projects";

export default function ProjectsPage() {
  return (
    <>
      <Navbar />
      <main>
        <section className="py-20 sm:py-28">
          <Container>
            <div className="max-w-4xl">
              <p className="mb-5 font-mono text-xs font-medium uppercase tracking-[0.18em] text-muted">Projects</p>
              <h1 className="text-5xl font-semibold tracking-[-0.04em] text-foreground sm:text-6xl lg:text-7xl">Engineering work, decisions, and evidence.</h1>
              <p className="mt-8 max-w-2xl text-lg leading-8 text-muted">AI and machine-learning systems. Architecture, engineering decisions, and evidence at a glance.</p>
            </div>
            <div className="mt-20">
              {projects.map((project, index) => <ProjectCard key={project.slug} project={project} index={index} headingLevel={2} />)}
              <div className="border-t border-border" />
            </div>
          </Container>
        </section>
      </main>
      <Footer />
    </>
  );
}
