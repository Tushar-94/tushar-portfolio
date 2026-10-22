"use client";

import { useId, useState } from "react";
import { segmentationPerformance } from "@/data/defectSegmentation";

export function PerformanceComparison() {
  const [selected, setSelected] = useState(0);
  const id = useId();
  const performance = segmentationPerformance[selected];

  return (
    <figure aria-labelledby={`${id}-title`} className="rounded-2xl border border-border bg-surface p-5 sm:p-6">
      <div className="flex flex-wrap items-baseline justify-between gap-3">
        <h3 id={`${id}-title`} className="text-sm font-semibold">Mask metrics · validation comparison</h3>
        <span className="font-mono text-[10px] text-muted">YOLOv8n-seg · 0–100%</span>
      </div>
      <div role="group" aria-label="Performance category" className="mt-5 grid grid-cols-3 gap-1 rounded-xl border border-border p-1">
        {segmentationPerformance.map((item, index) => (
          <button key={item.name} type="button" aria-pressed={selected === index} aria-controls={`${id}-chart`} onClick={() => setSelected(index)}
            className={`min-h-11 rounded-lg px-2 py-2 text-xs font-medium transition-colors ${selected === index ? "bg-foreground text-background" : "hover:bg-background"}`}>{item.name}</button>
        ))}
      </div>
      <ul aria-label="Chart legend" className="mt-5 flex flex-wrap gap-x-5 gap-y-2 text-xs leading-5 text-muted">
        <li><span aria-hidden="true" className="mr-2 inline-block h-2 w-4 rounded-sm bg-foreground/25" />Before targeted augmentation</li>
        <li><span aria-hidden="true" className="mr-2 inline-block h-2 w-4 rounded-sm bg-foreground" />After targeted augmentation</li>
      </ul>
      <div id={`${id}-chart`} aria-live="polite" aria-atomic="true">
        <p className="sr-only">{performance.name} validation mask metrics</p>
        <div aria-hidden="true" className="mt-6 hidden grid-cols-[100px_minmax(0,1fr)_48px] gap-5 sm:grid">
          <span /><div className="flex justify-between font-mono text-[10px] text-muted"><span>0</span><span>50</span><span>100%</span></div>
        </div>
        <dl className="mt-6 space-y-6 sm:mt-3">
          {performance.metrics.map(metric => {
            const delta = metric.after - metric.before;
            return (
              <div key={metric.name} className="grid gap-3 sm:grid-cols-[100px_minmax(0,1fr)] sm:items-center sm:gap-5">
                <dt className="flex items-baseline justify-between gap-3 text-sm font-medium sm:block">
                  {metric.name}
                  <span className={`font-mono text-[10px] font-normal sm:mt-1 sm:block ${delta >= 0 ? "text-[#28616e]" : "text-[#88442c]"}`}>{delta >= 0 ? "+" : "−"}{Math.abs(delta).toFixed(1)} pp</span>
                </dt>
                <dd className="space-y-3">
                  {[
                    { label: "Before targeted augmentation", value: metric.before, shade: "bg-foreground/25" },
                    { label: "After targeted augmentation", value: metric.after, shade: "bg-foreground" },
                  ].map(model => (
                    <div key={model.label} className="grid grid-cols-[minmax(0,1fr)_48px] items-center gap-5">
                      <div aria-hidden="true" className="h-2 rounded-sm bg-background"><div className={`h-full rounded-sm transition-[width] duration-150 ${model.shade}`} style={{ width: `${model.value}%` }} /></div>
                      <p className="text-right font-mono text-xs tabular-nums"><span className="sr-only">{performance.name} {metric.name}, {model.label}: </span>{model.value.toFixed(1)}%</p>
                    </div>
                  ))}
                </dd>
              </div>
            );
          })}
        </dl>
      </div>
      <figcaption className="mt-6 border-t border-border pt-4 text-xs leading-6 text-muted">
        Targeted augmentation improved precision but reduced short-shot recall and mAP. Values describe model validation; they do not establish test-set or deployment performance. Changes are percentage points (pp).
      </figcaption>
    </figure>
  );
}
