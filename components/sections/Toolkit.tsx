import { Container } from "@/components/layout/Container";

import { ToolGroup } from "@/components/ui/ToolGroup";

import { toolkit } from "@/data/toolkit";

export function Toolkit() {

  return (

    <section id="toolkit" className="py-24 sm:py-32">

      <Container>

        <div className="mb-14 max-w-3xl sm:mb-20">

          <p className="mb-4 font-mono text-xs font-medium uppercase tracking-[0.18em] text-muted">

            Toolkit

          </p>

          <h2 className="text-4xl font-semibold tracking-[-0.035em] text-foreground sm:text-5xl">

            Technologies I use to build and ship AI systems.

          </h2>

          <p className="mt-6 max-w-2xl text-lg leading-8 text-muted">

            A practical toolkit spanning model development, data systems,

            computer vision, generative AI, deployment, and analytics.

          </p>

        </div>

        <div className="grid gap-x-12 lg:grid-cols-2">

          {toolkit.map((group) => (

            <ToolGroup key={group.category} group={group} />

          ))}

        </div>

      </Container>

    </section>

  );

}