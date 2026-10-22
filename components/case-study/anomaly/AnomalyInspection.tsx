"use client";

import { useId, useState } from "react";
import { illustrativeAnomalyScore } from "@/data/anomalyDetection";
import { SyntheticAnomalyComponent } from "./SyntheticAnomalyComponent";

const modes = ["Original Image", "ROI Mask", "Anomaly Heatmap", "Inspection Decision"];

export function AnomalyInspection() {
  const [mode, setMode] = useState(2);
  const [roi, setROI] = useState(true);
  const [highlight, setHighlight] = useState(true);
  const [opacity, setOpacity] = useState(55);
  const [threshold, setThreshold] = useState(0.55);
  const id = useId();
  const heatmap = mode >= 2;
  const review = illustrativeAnomalyScore >= threshold;

  function selectMode(index: number) {
    setMode(index);
    setROI(index !== 0);
  }

  return (
    <div className="rounded-2xl border border-border bg-surface p-4 sm:p-5">
      <div className="mb-5 flex flex-wrap items-baseline justify-between gap-2">
        <h3 className="text-sm font-semibold">From visual deviation to a decision</h3>
        <span className="font-mono text-[10px] text-muted">Synthetic component · illustrative controls</span>
      </div>
      <div className="grid items-start gap-6 lg:grid-cols-[1.1fr_1fr]">
        <figure className="min-w-0 overflow-hidden rounded-xl border border-border">
          <SyntheticAnomalyComponent roi={roi} heatmap={heatmap} highlight={highlight} opacity={opacity / 100} decision={mode === 3 ? review ? "review" : "below" : undefined} />
          <figcaption className="border-t border-border p-4">
            <p className="text-xs font-medium leading-6">Illustrative visualization — not actual model output</p>
            <p className="mt-1 text-xs leading-6 text-muted">Authored SVG geometry and heatmap. This visualization does not run DINOv2 inference or identify a defect category.</p>
            <div className="mt-3 flex items-center gap-3 text-[10px] text-muted">
              <span>Lower deviation</span><span aria-hidden="true" className="h-1.5 flex-1 rounded-full bg-linear-to-r from-[#7baca5] via-[#d29c54] to-[#a9532f]" /><span>Higher deviation</span>
            </div>
          </figcaption>
        </figure>
        <div className="min-w-0">
          <fieldset>
            <legend className="font-mono text-[10px] uppercase tracking-[0.12em] text-muted">Visualization mode</legend>
            <div className="mt-3 grid grid-cols-2 gap-2">
              {modes.map((label, index) => <button key={label} type="button" aria-pressed={mode === index} onClick={() => selectMode(index)}
                className={`min-h-11 rounded-lg border px-3 py-2 text-left text-xs font-medium leading-5 transition-colors ${mode === index ? "border-foreground bg-foreground text-background" : "border-border hover:bg-background"}`}>{label}</button>)}
            </div>
          </fieldset>
          <fieldset className="mt-4 border-t border-border pt-3">
            <legend className="sr-only">Inspection layers</legend>
            <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs">
              <label className="flex min-h-10 cursor-pointer items-center gap-2"><input type="checkbox" checked={roi} onChange={event => { const visible = event.target.checked; setROI(visible); if (mode < 2) setMode(visible ? 1 : 0); }} className="h-4 w-4 accent-foreground focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-foreground" />ROI overlay</label>
              <label className="flex min-h-10 cursor-pointer items-center gap-2"><input type="checkbox" checked={highlight} onChange={event => setHighlight(event.target.checked)} className="h-4 w-4 accent-foreground focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-foreground" />Highlight suspicious region</label>
            </div>
            <div className="mt-2 flex items-center justify-between gap-4">
              <label htmlFor={`${id}-opacity`} className="text-xs">Heatmap opacity</label>
              <output htmlFor={`${id}-opacity`} className="font-mono text-xs tabular-nums text-muted">{opacity}%</output>
            </div>
            <input id={`${id}-opacity`} type="range" min="0" max="100" step="5" value={opacity} disabled={!heatmap} aria-valuetext={`${opacity}% heatmap opacity`} onChange={event => setOpacity(Number(event.target.value))} className="mt-2 h-6 w-full cursor-pointer accent-foreground disabled:opacity-40 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-foreground" />
          </fieldset>
          <div className="mt-3 rounded-xl border border-border bg-background p-4">
            <p className="font-mono text-[10px] uppercase tracking-[0.1em] text-muted">Illustrative score & threshold</p>
            <dl className="mt-3 grid grid-cols-2 gap-3">
              <div><dt className="text-[11px] text-muted">Illustrative anomaly score</dt><dd className="mt-1 font-mono text-2xl font-medium tabular-nums">{illustrativeAnomalyScore.toFixed(2)}</dd></div>
              <div><dt className="text-[11px] text-muted">Illustrative threshold</dt><dd className="mt-1 font-mono text-2xl font-medium tabular-nums">{threshold.toFixed(2)}</dd></div>
            </dl>
            <label htmlFor={`${id}-threshold`} className="mt-4 block text-xs">Adjust illustrative decision threshold</label>
            <input id={`${id}-threshold`} type="range" min="0" max="1" step="0.01" value={threshold} aria-valuetext={`${threshold.toFixed(2)} on the illustrative 0–1 scale`} onChange={event => setThreshold(Number(event.target.value))} className="mt-2 h-6 w-full cursor-pointer accent-foreground focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-foreground" />
            <div aria-live="polite" aria-atomic="true" className="mt-3 grid">
              <p aria-hidden={!review} className={`col-start-1 row-start-1 text-xs font-medium leading-6 text-[#884929] ${!review ? "invisible" : ""}`}>Illustrative decision: review region<br /><span className="font-normal text-muted">Score ≥ threshold.</span></p>
              <p aria-hidden={review} className={`col-start-1 row-start-1 text-xs font-medium leading-6 text-[#365f53] ${review ? "invisible" : ""}`}>Illustrative decision: below threshold<br /><span className="font-normal text-muted">Score &lt; threshold.</span></p>
            </div>
          </div>
          <p className="mt-3 text-[11px] leading-6 text-muted">Demo values use a pedagogical 0–1 scale and are unrelated to the calibration scores below.</p>
        </div>
      </div>
    </div>
  );
}
