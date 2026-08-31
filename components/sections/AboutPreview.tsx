import Link from "next/link";

import { Container } from "@/components/layout/Container";

export function AboutPreview() {

  return (

    <section id="about" className="py-24 sm:py-32">

      <Container>

        <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">

          <div>

            <p className="font-mono text-xs font-medium uppercase tracking-[0.18em] text-muted">

              About

            </p>

          </div>

          <div className="max-w-3xl">

            <h2 className="text-3xl font-semibold tracking-[-0.03em] text-foreground sm:text-4xl">

              I work at the intersection of machine learning, software engineering,

              and data systems.

            </h2>

            <p className="mt-6 text-lg leading-8 text-muted">

              My focus is building AI systems that do not stop at the notebook —

              systems that can be evaluated, deployed, and used in real workflows.

            </p>

            <p className="mt-5 text-lg leading-8 text-muted">

              I am particularly interested in applied AI problems involving

              Generative AI, computer vision, intelligent data products, and

              production machine learning.

            </p>

            <div className="mt-8">

            <Link

                href="/about"

                className="text-sm font-medium text-foreground"

              >

                More about me →

                </Link>

            </div>

          </div>

        </div>

      </Container>

    </section>

  );

}