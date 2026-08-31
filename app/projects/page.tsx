import Link from "next/link";

import { Footer } from "@/components/layout/Footer";

import { Navbar } from "@/components/layout/Navbar";

import { Container } from "@/components/layout/Container";

import { Tag } from "@/components/ui/Tag";

import { projects } from "@/data/projects";

export default function ProjectsPage() {

  return (

    <>

      <Navbar />

      <main>

        <section className="py-20 sm:py-28">

          <Container>

            <div className="max-w-4xl">

              <p className="mb-5 font-mono text-xs font-medium uppercase tracking-[0.18em] text-muted">

                Projects

              </p>

              <h1 className="text-5xl font-semibold tracking-[-0.04em] text-foreground sm:text-6xl lg:text-7xl">

                Engineering work, decisions, and evidence.

              </h1>

              <p className="mt-8 max-w-2xl text-lg leading-8 text-muted">

                Detailed case studies covering the problem, system architecture,

                implementation choices, evaluation, results, and lessons behind

                selected AI and machine-learning projects.

              </p>

            </div>

            <div className="mt-20">

              {projects.map((project, index) => (

                <article

                  key={project.slug}

                  className="border-t border-border py-10 sm:py-12"

                >

                  <div className="grid gap-6 lg:grid-cols-[100px_1fr_auto] lg:gap-10">

                    <span className="font-mono text-xs text-muted">

                      {String(index + 1).padStart(2, "0")}

                    </span>

                    <div className="max-w-3xl">

                      <p className="font-mono text-xs uppercase tracking-[0.16em] text-muted">

                        {project.category}

                      </p>

                      <h2 className="mt-3 text-3xl font-semibold tracking-[-0.025em] text-foreground">

                        {project.title}

                      </h2>

                      <p className="mt-4 max-w-2xl text-lg leading-8 text-muted">

                        {project.description}

                      </p>

                      <div className="mt-6 flex flex-wrap gap-2">

                        {project.technologies.map((technology) => (

                          <Tag key={technology}>{technology}</Tag>

                        ))}

                      </div>

                    </div>

                    <div>

                      <Link

                        href={`/projects/${project.slug}`}

                        className="text-sm font-medium text-foreground"

                      >

                        View case study →

                      </Link>

                    </div>

                  </div>

                </article>

              ))}

              <div className="border-t border-border" />

            </div>

          </Container>

        </section>

      </main>

      <Footer />

    </>

  );

}