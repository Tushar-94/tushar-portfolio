import type { ExpertiseItem } from "@/data/expertise";

type ExpertiseCardProps = {

  item: ExpertiseItem;

  index: number;

};

export function ExpertiseCard({

  item,

  index,

}: ExpertiseCardProps) {

  return (

    <article className="border-t border-border py-8">

      <div className="grid gap-5 sm:grid-cols-[80px_1fr]">

        <span className="font-mono text-xs text-muted">

          {String(index + 1).padStart(2, "0")}

        </span>

        <div>

          <h3 className="text-2xl font-semibold tracking-[-0.02em] text-foreground">

            {item.title}

          </h3>

          <p className="mt-4 max-w-xl text-base leading-7 text-muted">

            {item.description}

          </p>

        </div>

      </div>

    </article>

  );

}