import type { ProjectMetric } from "@/types/case-study";

export function ProjectMetrics({ metrics }: { metrics: ProjectMetric[] }) {
  return (
    <dl className="grid gap-8 sm:grid-cols-3 sm:gap-6">
      {metrics.map((metric) => (
        <div key={metric.label} className="border-l border-border pl-5">
          <dt className="text-sm leading-6 text-muted">{metric.label}</dt>
          <dd className="mt-3 text-5xl font-semibold tracking-[-0.05em] text-foreground sm:text-6xl">{metric.value}</dd>
        </div>
      ))}
    </dl>
  );
}
