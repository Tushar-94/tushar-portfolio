import type { CSSProperties } from "react";

export function CompactPipeline({ steps, label }: { steps: { title: string; detail?: string; active?: boolean }[]; label: string }) {
  return (
    <div>
    <div role="region" aria-label={`${label}. Scroll horizontally on narrow screens.`} tabIndex={0} className="min-w-0 overflow-x-auto rounded-xl pb-2 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-foreground">
    <ol aria-label={label} style={{ "--pipeline-count": steps.length } as CSSProperties}
      className="grid grid-cols-[repeat(var(--pipeline-count),minmax(112px,1fr))] gap-5 md:grid-cols-[repeat(var(--pipeline-count),minmax(0,1fr))]">
      {steps.map((step, index) => (
        <li key={step.title} className={`relative flex min-h-28 min-w-0 flex-col rounded-xl border p-3 transition-colors duration-150 ${step.active ? "border-foreground bg-foreground text-background" : "border-border bg-background"}`}>
          <span aria-hidden="true" className={`font-mono text-[10px] ${step.active ? "text-background/70" : "text-muted"}`}>{String(index + 1).padStart(2, "0")}</span>
          <p className="mt-2 text-xs font-medium leading-5">{step.title}</p>
          {step.detail && <p className={`mt-auto pt-2 text-[10px] leading-4 ${step.active ? "text-background/70" : "text-muted"}`}>{step.detail}</p>}
          {index < steps.length - 1 && <svg aria-hidden="true" viewBox="0 0 20 20" fill="none" className="absolute top-1/2 -right-[21px] h-5 w-5 -translate-y-1/2 text-muted"><path d="M2 10h15m-4-4 4 4-4 4" stroke="currentColor" /></svg>}
        </li>
      ))}
    </ol>
    </div>
    <p className="mt-1 font-mono text-[10px] leading-5 text-muted md:hidden">Scroll to explore the pipeline <span aria-hidden="true">→</span></p>
    </div>
  );
}
