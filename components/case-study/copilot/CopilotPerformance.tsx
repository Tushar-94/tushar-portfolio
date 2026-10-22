"use client";

import { useState } from "react";
import { retrievalBenchmarks } from "@/data/copilot";

export function CopilotPerformance() {
  const [selected, setSelected] = useState(1);
  const benchmark = retrievalBenchmarks[selected];
  const format = (name: string, value: number) => name === "MRR" ? value.toFixed(3) : `${(value * 100).toFixed(value === 0.833 ? 1 : 0)}%`;

  return (
    <figure aria-labelledby="copilot-performance-title" className="rounded-2xl border border-border bg-surface p-5 sm:p-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <h3 id="copilot-performance-title" className="text-sm font-semibold">Retrieval quality by evaluation suite</h3>
        <div role="group" aria-label="Evaluation checkpoint" className="flex rounded-lg border border-border p-1">
          {retrievalBenchmarks.map((item, index) => <button key={item.label} type="button" aria-pressed={selected === index} onClick={() => setSelected(index)} className={`min-h-10 rounded-md px-3 py-2 text-xs font-medium transition-colors ${selected === index ? "bg-foreground text-background" : "hover:bg-background"}`}>{item.label}</button>)}
        </div>
      </div>
      <div aria-live="polite" aria-atomic="true" className="mt-4">
        <div className="grid font-mono text-[10px] leading-5 text-muted">
          {retrievalBenchmarks.map((item, index) => <p key={item.label} aria-hidden={selected !== index} className={`col-start-1 row-start-1 ${selected !== index ? "invisible" : ""}`}>{item.source}<br />{item.diagnostic ? "Latest local checkpoint · former held-out set reused for debugging" : "Repository-reported checkpoint · held-out before subsequent iteration"}</p>)}
        </div>
        <ul aria-label="Comparison legend" className="mt-4 flex flex-wrap gap-x-5 gap-y-2 text-xs text-muted">
          <li><span aria-hidden="true" className="mr-2 inline-block h-2 w-4 rounded-sm bg-foreground" />Development · 25 queries</li>
          <li><span aria-hidden="true" className="mr-2 inline-block h-2 w-4 rounded-sm bg-foreground/25" />{benchmark.comparison} · 12 queries</li>
        </ul>
        <div className="mt-6 grid gap-6 sm:grid-cols-2">
          {benchmark.metrics.map((metric) => (
            <div key={metric.name}>
              <div className="flex items-baseline justify-between gap-3">
                <h4 className="text-sm font-medium">{metric.name}</h4>
                <span className="font-mono text-[10px] text-muted">{metric.name === "MRR" ? "0–1 scale" : "0–100%"}</span>
              </div>
              <div className="mt-3 space-y-3">
                {[
                  { label: "Development", value: metric.development, shade: "bg-foreground" },
                  { label: benchmark.comparison, value: metric.comparison, shade: "bg-foreground/25" },
                ].map((suite) => (
                  <div key={suite.label} className="grid grid-cols-[minmax(0,1fr)_3rem] items-center gap-3">
                    <div aria-hidden="true" className="h-2 rounded-sm bg-background"><div className={`h-full rounded-sm ${suite.shade}`} style={{ width: `${suite.value * 100}%` }} /></div>
                    <p className="text-right font-mono text-xs tabular-nums"><span className="sr-only">{suite.label} {metric.name}: </span>{format(metric.name, suite.value)}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
      <figcaption className="mt-6 grid border-t border-border pt-4 text-xs leading-6 text-muted">
        {retrievalBenchmarks.map((item, index) => <p key={item.label} aria-hidden={selected !== index} className={`col-start-1 row-start-1 ${selected !== index ? "invisible" : ""}`}>
          {item.diagnostic ? "The 12-query suite informed V2 changes and is now diagnostic. Its perfect retrieval scores do not establish unseen-query generalization. Development and diagnostic results belong to this V2 checkpoint." : "The published V1 development set influenced tuning; the 12 held-out cases were unseen at that checkpoint. Later inspection made that suite diagnostic. Small synthetic benchmarks do not establish production or final-answer quality."}
        </p>)}
      </figcaption>
    </figure>
  );
}
