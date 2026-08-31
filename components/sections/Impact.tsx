import { Container } from "@/components/layout/Container";

import { ImpactMetric } from "@/components/ui/ImpactMetric";

import { impactMetrics } from "@/data/impact";

export function Impact() {

  return (

    <section id="impact" className="py-24 sm:py-32">

      <Container>

        <div className="mb-14 max-w-3xl sm:mb-20">

          <p className="mb-4 font-mono text-xs font-medium uppercase tracking-[0.18em] text-muted">

            Impact

          </p>

          <h2 className="text-4xl font-semibold tracking-[-0.035em] text-foreground sm:text-5xl">

            Measurable outcomes from applied AI and data systems.

          </h2>

          <p className="mt-6 max-w-2xl text-lg leading-8 text-muted">

            A snapshot of technical and operational improvements delivered

            across machine learning, computer vision, data, and deployment

            workflows.

          </p>

        </div>

        <div className="grid gap-x-10 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">

          {impactMetrics.map((metric) => (

            <ImpactMetric key={metric.label} metric={metric} />

          ))}

        </div>

      </Container>

    </section>

  );

}