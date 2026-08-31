import type { ImpactMetric as ImpactMetricType } from "@/data/impact";

type ImpactMetricProps = {

  metric: ImpactMetricType;

};

export function ImpactMetric({ metric }: ImpactMetricProps) {

  return (

    <article className="border-t border-border pt-6">

      <p className="text-4xl font-semibold tracking-[-0.04em] text-foreground sm:text-5xl">

        {metric.value}

      </p>

      <h3 className="mt-4 text-base font-medium text-foreground">

        {metric.label}

      </h3>

      <p className="mt-3 max-w-sm text-sm leading-6 text-muted">

        {metric.description}

      </p>

    </article>

  );

}