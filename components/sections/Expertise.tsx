import { Container } from "@/components/layout/Container";

import { ExpertiseCard } from "@/components/ui/ExpertiseCard";

import { expertise } from "@/data/expertise";

export function Expertise() {

  return (

    <section id="expertise" className="py-24 sm:py-32">

      <Container>

        <div className="grid gap-14 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">

          <div className="max-w-xl">

            <p className="mb-4 font-mono text-xs font-medium uppercase tracking-[0.18em] text-muted">

              What I build

            </p>

            <h2 className="text-4xl font-semibold tracking-[-0.035em] text-foreground sm:text-5xl">

              AI systems designed around real problems.

            </h2>

            <p className="mt-6 text-lg leading-8 text-muted">

              My work spans the full path from data and models to evaluation,

              deployment, and usable AI products.

            </p>

          </div>

          <div>

            {expertise.map((item, index) => (

              <ExpertiseCard

                key={item.title}

                item={item}

                index={index}

              />

            ))}

          </div>

        </div>

      </Container>

    </section>

  );

}