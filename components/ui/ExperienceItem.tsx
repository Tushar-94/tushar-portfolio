import type { ExperienceItem as ExperienceItemType } from "@/data/experience";

import { Tag } from "@/components/ui/Tag";

type ExperienceItemProps = {

  item: ExperienceItemType;

};

export function ExperienceItem({ item }: ExperienceItemProps) {

  return (

    <article className="border-t border-border py-10 sm:py-12">

      <div className="grid gap-6 lg:grid-cols-[180px_1fr] lg:gap-12">

        <div>

          <p className="font-mono text-xs text-muted">{item.period}</p>

        </div>

        <div className="max-w-3xl">

          <h3 className="text-2xl font-semibold tracking-[-0.02em] text-foreground">

            {item.role}

          </h3>

          <p className="mt-1 text-base font-medium text-muted">

            {item.company}

          </p>

          <p className="mt-5 text-base leading-7 text-muted sm:text-lg">

            {item.summary}

          </p>

          <div className="mt-6 flex flex-wrap gap-2">

            {item.focus.map((area) => (

              <Tag key={area}>{area}</Tag>

            ))}

          </div>

        </div>

      </div>

    </article>

  );

}