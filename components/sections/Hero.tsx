import { Container } from "@/components/layout/Container";

export function Hero() {

  return (

    <section

      id="top"

      className="rounded-full bg-foreground px-6 py-3 text-sm font-medium text-white transition-transform hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground focus-visible:ring-offset-4 focus-visible:ring-offset-background"

    >

      <Container>

        <div className="max-w-5xl">

          <p className="mb-7 font-mono text-xs font-medium uppercase tracking-[0.2em] text-muted">

            Building intelligent systems

          </p>

          <h1 className="max-w-4xl text-5xl font-semibold tracking-[-0.04em] text-foreground sm:text-6xl lg:text-7xl xl:text-8xl">

            Tushar Rao

          </h1>

          <p className="mt-8 max-w-4xl text-2xl leading-[1.35] tracking-[-0.02em] text-neutral-700 sm:text-3xl lg:text-4xl">

            Applied AI Engineer building production systems across Generative

            AI, Machine Learning, and Computer Vision.

          </p>

          <p className="mt-8 max-w-2xl text-lg leading-8 text-muted">

            I turn complex documents, visual data, and industrial datasets into

            reliable AI products.

          </p>

          <div className="mt-10 flex flex-wrap items-center gap-6">

            <a

              href="#projects"

              className="group rounded-sm text-sm font-medium text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground focus-visible:ring-offset-4 focus-visible:ring-offset-background"
            >

              Explore my work

            </a>

            <a

              href="#contact"

              className="group text-sm font-medium text-foreground"

            >

              Get in touch{" "}

              <span

                aria-hidden="true"

                className="inline-block transition-transform group-hover:translate-x-1"

              >

                →

              </span>

            </a>

          </div>

        </div>

      </Container>

    </section>

  );

}