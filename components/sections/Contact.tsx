import { Container } from "@/components/layout/Container";

export function Contact() {

  return (

    <section id="contact" className="py-24 sm:py-32">

      <Container>

        <div className="border-t border-border pt-16 sm:pt-20">

          <div className="max-w-4xl">

            <p className="mb-4 font-mono text-xs font-medium uppercase tracking-[0.18em] text-muted">

              Contact

            </p>

            <h2 className="text-4xl font-semibold tracking-[-0.035em] text-foreground sm:text-5xl lg:text-6xl">

              Interested in building useful AI systems together?

            </h2>

            <p className="mt-6 max-w-2xl text-lg leading-8 text-muted">

              I am interested in challenging problems across Applied AI,

              Machine Learning, Generative AI, and Computer Vision.

            </p>

            <div className="mt-10 flex flex-wrap gap-6">

              <a

                href="mailto:your-email@example.com"

                className="rounded-full bg-foreground px-6 py-3 text-sm font-medium text-white transition-transform hover:-translate-y-0.5"

              >

                Email me

              </a>

              <a

                href="#"

                className="text-sm font-medium text-foreground"

              >

                LinkedIn ↗

              </a>

              <a

                href="#"

                className="text-sm font-medium text-foreground"

              >

                GitHub ↗

              </a>

            </div>

          </div>

        </div>

      </Container>

    </section>

  );

}