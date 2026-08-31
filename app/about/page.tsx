import type { Metadata } from "next";

import Link from "next/link";

import { Container } from "@/components/layout/Container";

import { Footer } from "@/components/layout/Footer";

import { Navbar } from "@/components/layout/Navbar";

import { profile } from "@/data/profile";

export const metadata: Metadata = {

  title: "About",

  description:

    "About Tushar Rao, an Applied AI Engineer working across Generative AI, Machine Learning, Computer Vision, and data systems.",

};

const principles = [

  {

    title: "Measure before optimizing",

    description:

      "I prefer establishing reproducible baselines and evaluation criteria before introducing additional model or system complexity.",

  },

  {

    title: "Build beyond the demo",

    description:

      "A convincing prototype is only the beginning. Reliability, deployment, maintainability, and evaluation determine whether an AI system becomes useful.",

  },

  {

    title: "Make decisions explainable",

    description:

      "Whether working with retrieval, computer vision, or structured machine learning, I want technical decisions and model behavior to be inspectable.",

  },

  {

    title: "Use complexity deliberately",

    description:

      "I favor the simplest architecture that solves the problem well and introduce additional complexity only when evidence justifies it.",

  },

];

export default function AboutPage() {

  return (

    <>

      <Navbar />

      <main>

        <section className="py-20 sm:py-28">

          <Container>

            <div className="max-w-5xl">

              <p className="mb-5 font-mono text-xs font-medium uppercase tracking-[0.18em] text-muted">

                About

              </p>

              <h1 className="max-w-4xl text-5xl font-semibold tracking-[-0.04em] text-foreground sm:text-6xl lg:text-7xl">

                Building AI systems that connect models with real workflows.

              </h1>

              <p className="mt-8 max-w-3xl text-xl leading-9 text-muted sm:text-2xl">

                {profile.shortBio}

              </p>

            </div>

          </Container>

        </section>

        <section className="border-t border-border py-20 sm:py-24">

          <Container>

            <div className="grid gap-12 lg:grid-cols-[180px_1fr] lg:gap-16">

              <div>

                <p className="font-mono text-xs uppercase tracking-[0.16em] text-muted">

                  Background

                </p>

              </div>

              <div className="max-w-3xl space-y-6 text-lg leading-8 text-muted">

                <p>

                  My background spans software engineering, analytics, data

                  science, and applied machine learning. That progression shaped

                  how I approach AI: models are important, but so are the data

                  pipelines, APIs, evaluation systems, and engineering decisions

                  surrounding them.

                </p>

                <p>

                  Today, my work focuses on applied AI problems across

                  Generative AI, computer vision, machine-learning systems, and

                  data-intensive applications.

                </p>

                <p>

                  I am particularly interested in systems where reliability and

                  evaluation matter: knowledge retrieval, industrial inspection,

                  explainable machine learning, and production AI workflows.

                </p>

              </div>

            </div>

          </Container>

        </section>

        <section className="py-20 sm:py-24">

          <Container>

            <div className="grid gap-12 lg:grid-cols-[180px_1fr] lg:gap-16">

              <div>

                <p className="font-mono text-xs uppercase tracking-[0.16em] text-muted">

                  Principles

                </p>

              </div>

              <div className="max-w-4xl">

                {principles.map((principle, index) => (

                  <article

                    key={principle.title}

                    className="grid gap-5 border-t border-border py-8 sm:grid-cols-[70px_1fr]"

                  >

                    <span className="font-mono text-xs text-muted">

                      {String(index + 1).padStart(2, "0")}

                    </span>

                    <div>

                      <h2 className="text-2xl font-semibold tracking-[-0.02em] text-foreground">

                        {principle.title}

                      </h2>

                      <p className="mt-4 max-w-2xl text-base leading-7 text-muted">

                        {principle.description}

                      </p>

                    </div>

                  </article>

                ))}

                <div className="border-t border-border" />

              </div>

            </div>

          </Container>

        </section>

        <section className="py-20 sm:py-28">

          <Container>

            <div className="border-t border-border pt-16">

              <p className="font-mono text-xs uppercase tracking-[0.16em] text-muted">

                Explore

              </p>

              <h2 className="mt-5 max-w-3xl text-3xl font-semibold tracking-[-0.03em] text-foreground sm:text-4xl">

                The best way to understand my work is through the systems

                themselves.

              </h2>

              <div className="mt-8 flex flex-wrap gap-6">

                <Link

                  href="/projects"

                  className="rounded-full bg-foreground px-6 py-3 text-sm font-medium text-white"

                >

                  View projects

                </Link>

                <a

                  href={profile.github}

                  target="_blank"

                  rel="noreferrer"

                  className="text-sm font-medium text-foreground"

                >

                  GitHub ↗

                </a>

              </div>

            </div>

          </Container>

        </section>

      </main>

      <Footer />

    </>

  );

}