import type { Project } from "@/data/projects";

import { Tag } from "@/components/ui/Tag";

type ProjectCardProps = {

  project: Project;

  index: number;

};

export function ProjectCard({

  project,

  index,

}: ProjectCardProps) {

  return (

    <article className="group border-t border-border py-10 sm:py-12">

      <div className="grid gap-6 lg:grid-cols-[120px_1fr_auto] lg:gap-10">

        <div>

          <span className="font-mono text-xs text-muted">

            {String(index + 1).padStart(2, "0")}

          </span>

        </div>

        <div className="max-w-3xl">

          <p className="mb-3 font-mono text-xs uppercase tracking-[0.16em] text-muted">

            {project.category}

          </p>

          <h3 className="text-2xl font-semibold tracking-[-0.02em] text-foreground sm:text-3xl">

            {project.title}

          </h3>

          <p className="mt-4 max-w-2xl text-base leading-7 text-muted sm:text-lg">

            {project.description}

          </p>

          <div className="mt-6 flex flex-wrap gap-2">

            {project.technologies.map((technology) => (

              <Tag key={technology}>{technology}</Tag>

            ))}

          </div>

        </div>

        <div className="flex items-start lg:justify-end">

          <a

            href={`/projects/${project.slug}`}

            className="text-sm font-medium text-foreground"

          >

            View case study{" "}

            <span

              aria-hidden="true"

              className="inline-block transition-transform group-hover:translate-x-1"

            >

              →

            </span>

          </a>

        </div>

      </div>

    </article>

  );

}