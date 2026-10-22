"use client";

import { useId, useState } from "react";
import { thresholdStrategies } from "@/data/anomalyDetection";

export function ThresholdComparison() {
  const [selected, setSelected] = useState(0);
  const id = useId();
  const strategy = thresholdStrategies[selected];
  return (
    <figure aria-labelledby={`${id}-title`} className="rounded-2xl border border-border bg-surface p-5 sm:p-6">
      <h3 id={`${id}-title`} className="text-sm font-semibold">Calibration-set operating points</h3>
      <p className="mt-2 text-xs leading-6 text-muted">Compare detection recall and false alarms. These operating points do not select a production threshold.</p>
      <div role="group" aria-label="Threshold strategy" className="mt-5 grid grid-cols-2 gap-2">
        {thresholdStrategies.map((item, index) => <button key={item.label} type="button" aria-pressed={selected === index} aria-controls={`${id}-comparison`} onClick={() => setSelected(index)}
          className={`min-h-12 rounded-lg border px-3 py-2 text-left text-xs font-medium leading-5 transition-colors ${selected === index ? "border-foreground bg-foreground text-background" : "border-border hover:bg-background"}`}>{item.label}</button>)}
      </div>
      <div id={`${id}-comparison`} aria-live="polite" aria-atomic="true" className="mt-5">
        <div className="grid font-mono text-[10px] leading-6">
          <p aria-hidden={!strategy.historical} className={`col-start-1 row-start-1 text-[#884929] ${!strategy.historical ? "invisible" : ""}`}>Historical reference · not a selection baseline</p>
          <p aria-hidden={strategy.historical} className={`col-start-1 row-start-1 text-muted ${strategy.historical ? "invisible" : ""}`}>Calibration-only threshold candidate</p>
        </div>
        <dl className="mt-4 grid grid-cols-2 gap-4">
          <div className="border-l border-border pl-4"><dt className="text-xs leading-5 text-muted">Defect recall</dt><dd className="mt-2 text-3xl font-semibold tracking-tight tabular-nums">{strategy.recall.toFixed(1)}%</dd></div>
          <div className="border-l border-border pl-4"><dt className="text-xs leading-5 text-muted">False-positive rate</dt><dd className="mt-2 text-3xl font-semibold tracking-tight tabular-nums">{strategy.falsePositiveRate.toFixed(1)}%</dd></div>
        </dl>
        <div className="mt-6 space-y-4">
          {[
            { label: "Recall", value: strategy.recall, shade: "bg-foreground" },
            { label: "False-positive rate", value: strategy.falsePositiveRate, shade: "bg-foreground/30" },
          ].map(metric => (
            <div key={metric.label}>
              <p className="text-[11px] text-muted">{metric.label}</p>
              <div aria-hidden="true" className="mt-2 h-2 rounded-sm bg-background"><div className={`h-full rounded-sm transition-[width] duration-150 ${metric.shade}`} style={{ width: `${metric.value}%` }} /></div>
            </div>
          ))}
        </div>
        <div aria-hidden="true" className="mt-3 flex justify-between font-mono text-[10px] text-muted"><span>0%</span><span>50%</span><span>100%</span></div>
        <div className="mt-5 grid border-t border-border pt-4 text-sm leading-7 text-muted">
          {thresholdStrategies.map((item, index) => <p key={item.label} aria-hidden={selected !== index} className={`col-start-1 row-start-1 ${selected !== index ? "invisible" : ""}`}>{item.explanation}</p>)}
        </div>
      </div>
      <figcaption className="mt-5 rounded-lg bg-background p-3 text-xs leading-6 text-muted">
        All values are calibration-set operating points. Higher recall can increase false alarms; a lower false-positive rate can miss more defects. The historical 0.33 threshold is not a leakage-safe model-selection baseline.
      </figcaption>
    </figure>
  );
}
