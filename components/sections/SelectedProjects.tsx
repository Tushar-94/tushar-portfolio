import { Container } from "@/components/layout/Container";

import { ProjectCard } from "@/components/ui/ProjectCard";

import { projects } from "@/data/projects";

export function SelectedProjects() {

  return (

    <section id="projects" className="py-24 sm:py-32">

      <Container>

        <div className="mb-14 max-w-3xl sm:mb-20">

          <p className="mb-4 font-mono text-xs font-medium uppercase tracking-[0.18em] text-muted">

            Selected work

          </p>

          <h2 className="text-4xl font-semibold tracking-[-0.035em] text-foreground sm:text-5xl">

            Engineering AI systems beyond the demo.

          </h2>

          <p className="mt-6 max-w-2xl text-lg leading-8 text-muted">

            Selected projects focused on system design, evaluation, production

            constraints, and measurable technical decisions.

          </p>

        </div>

        <div>

          {projects.map((project, index) => (

            <ProjectCard

              key={project.slug}

              project={project}

              index={index}

            />

          ))}

        </div>

        <div className="border-t border-border pt-8">

          <a

            href="/projects"

            className="text-sm font-medium text-foreground"

          >

            View all projects →

          </a>

        </div>

      </Container>

    </section>

  );

}