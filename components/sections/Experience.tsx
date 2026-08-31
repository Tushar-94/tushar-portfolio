import { Container } from "@/components/layout/Container";

import { ExperienceItem } from "@/components/ui/ExperienceItem";

import { experience } from "@/data/experience";

export function Experience() {

  return (

    <section id="experience" className="py-24 sm:py-32">

      <Container>

        <div className="mb-14 max-w-3xl sm:mb-20">

          <p className="mb-4 font-mono text-xs font-medium uppercase tracking-[0.18em] text-muted">

            Experience

          </p>

          <h2 className="text-4xl font-semibold tracking-[-0.035em] text-foreground sm:text-5xl">

            Building across AI, data, and software systems.

          </h2>

          <p className="mt-6 max-w-2xl text-lg leading-8 text-muted">

            Experience spanning applied AI, machine learning, analytics, and

            software engineering, with a growing focus on production AI systems.

          </p>

        </div>

        <div>

          {experience.map((item) => (

            <ExperienceItem

              key={`${item.company}-${item.role}`}

              item={item}

            />

          ))}

        </div>

      </Container>

    </section>

  );

}