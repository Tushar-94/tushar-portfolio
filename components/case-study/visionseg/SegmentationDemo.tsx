"use client";

import { useId, useState } from "react";
import { semanticClasses, type SegmentationMode, type SemanticClass } from "@/data/visionseg";
import { SyntheticVehicle } from "./SyntheticVehicle";

const modes: { id: SegmentationMode; label: string; caption: string }[] = [
  { id: "original", label: "Original Image", caption: "Original authored SVG vehicle. No segmentation layer." },
  { id: "ground-truth", label: "Ground Truth", caption: "Synthetic ground-truth illustration, not a dataset annotation." },
  { id: "prediction", label: "Predicted Segmentation", caption: "Synthetic prediction illustration, not model inference." },
  { id: "overlay", label: "Overlay", caption: "Synthetic prediction regions over the original illustration." },
];

export function SegmentationDemo() {
  const [mode, setMode] = useState<SegmentationMode>("overlay");
  const [selected, setSelected] = useState<SemanticClass>("front-door");
  const [highlight, setHighlight] = useState(true);
  const [opacity, setOpacity] = useState(55);
  const id = useId();

  return (
    <div className="rounded-2xl border border-border bg-surface p-4 sm:p-5">
      <div className="mb-5 flex flex-wrap items-baseline justify-between gap-3">
        <h3 className="text-sm font-semibold">A class for every pixel</h3>
        <span className="font-mono text-[10px] text-muted">Original SVG vehicle · synthetic semantic regions</span>
      </div>
      <div className="grid items-start gap-6 lg:grid-cols-[1.2fr_1fr]">
        <figure className="min-w-0 overflow-hidden rounded-xl border border-border">
          <SyntheticVehicle mode={mode} opacity={opacity / 100} selectedClass={selected} highlight={highlight} />
          <figcaption className="border-t border-border p-4">
            <p className="text-xs font-medium leading-6">Conceptual demonstration — not model output</p>
            <div aria-live="polite" aria-atomic="true" className="mt-2 grid text-xs leading-6 text-muted">
              {modes.map(view => <p key={view.id} aria-hidden={mode !== view.id} className={`col-start-1 row-start-1 ${mode !== view.id ? "invisible" : ""}`}>{view.caption}</p>)}
            </div>
            <p className="mt-3 text-[11px] leading-6 text-muted">The reference and prediction shapes are authored examples. Their differences illustrate boundary errors; no prediction accuracy is claimed.</p>
          </figcaption>
        </figure>
        <div className="min-w-0">
          <fieldset>
            <legend className="font-mono text-[10px] uppercase tracking-[0.12em] text-muted">Visualization mode</legend>
            <div className="mt-3 grid grid-cols-2 gap-2">
              {modes.map(view => <button key={view.id} type="button" aria-pressed={mode === view.id} onClick={() => setMode(view.id)} className={`min-h-11 rounded-lg border px-3 py-2 text-left text-xs font-medium leading-5 transition-colors ${mode === view.id ? "border-foreground bg-foreground text-background" : "border-border hover:bg-background"}`}>{view.label}</button>)}
            </div>
          </fieldset>
          <fieldset className="mt-5">
            <legend className="font-mono text-[10px] uppercase tracking-[0.12em] text-muted">Semantic class</legend>
            <div className="mt-3 grid grid-cols-2 gap-2">
              {semanticClasses.map(item => <button key={item.id} type="button" aria-pressed={selected === item.id} onClick={() => setSelected(item.id)} className={`flex min-h-10 items-center gap-2 rounded-lg border px-3 py-2 text-left text-xs font-medium transition-colors ${selected === item.id ? "border-foreground bg-background" : "border-border hover:bg-background"}`}>
                <span aria-hidden="true" className="h-2 w-2 shrink-0 rounded-full" style={{ backgroundColor: item.color }} />{item.name}
              </button>)}
            </div>
          </fieldset>
          <fieldset className="mt-4 border-t border-border pt-3">
            <legend className="sr-only">Segmentation layers</legend>
            <label className="flex min-h-10 cursor-pointer items-center gap-2 text-xs"><input type="checkbox" checked={mode !== "original"} onChange={event => setMode(event.target.checked ? "overlay" : "original")} className="h-4 w-4 accent-foreground focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-foreground" />Show segmentation overlay</label>
            <label className="flex min-h-10 cursor-pointer items-center gap-2 text-xs"><input type="checkbox" checked={highlight} onChange={event => setHighlight(event.target.checked)} className="h-4 w-4 accent-foreground focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-foreground" />Highlight selected class</label>
            <div className="mt-2 flex items-center justify-between gap-3"><label htmlFor={`${id}-opacity`} className="text-xs">Overlay opacity</label><output htmlFor={`${id}-opacity`} className="font-mono text-xs tabular-nums text-muted">{opacity}%</output></div>
            <input id={`${id}-opacity`} type="range" min="0" max="100" step="5" value={opacity} disabled={mode !== "overlay"} aria-valuetext={`${opacity}% overlay opacity`} onChange={event => setOpacity(Number(event.target.value))} className="mt-2 h-6 w-full cursor-pointer accent-foreground disabled:opacity-40 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-foreground" />
          </fieldset>
          <div aria-live="polite" aria-atomic="true" className="mt-3 grid border-t border-border pt-4">
            {semanticClasses.map(item => <div key={item.id} aria-hidden={selected !== item.id} className={`col-start-1 row-start-1 ${selected !== item.id ? "invisible" : ""}`}><h4 className="text-sm font-medium">{item.name}</h4><p className="mt-2 text-xs leading-6 text-muted">{item.description}</p></div>)}
          </div>
        </div>
      </div>
    </div>
  );
}
