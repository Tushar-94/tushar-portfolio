"use client";

import { useId, useState } from "react";
import { defectClasses, type DefectClass } from "@/data/defectSegmentation";
import { SyntheticComponent } from "./SyntheticComponent";

const views = [
  { id: "original", label: "Original image", masks: false, boxes: false },
  { id: "boxes", label: "Bounding boxes", masks: false, boxes: true },
  { id: "masks", label: "Segmentation masks", masks: true, boxes: false },
  { id: "combined", label: "Combined visualization", masks: true, boxes: true },
] as const;

const defectNotes: Record<DefectClass, string> = {
  "short-shot": "An irregular edge mask outlines incomplete filling within the bounding box.",
  "sink-mark": "A curved surface mask outlines the depression within the bounding box.",
};

export function InspectionDemo() {
  const [defect, setDefect] = useState<DefectClass>("short-shot");
  const [viewId, setViewId] = useState<(typeof views)[number]["id"]>("combined");
  const [opacity, setOpacity] = useState(45);
  const id = useId();
  const selected = defectClasses.find(item => item.id === defect)!;
  const { masks, boxes } = views.find(view => view.id === viewId)!;

  return (
    <div className="rounded-2xl border border-border bg-surface p-4 sm:p-5">
      <div className="mb-5 flex flex-wrap items-baseline justify-between gap-2">
        <h3 className="text-sm font-semibold">Explore defect localization</h3>
        <span className="font-mono text-[10px] text-muted">Interactive layers</span>
      </div>
      <div className="grid items-start gap-6 lg:grid-cols-[1.1fr_1fr]">
        <figure id={`${id}-visualization`} className="min-w-0 overflow-hidden rounded-xl border border-border">
          <SyntheticComponent defect={defect} masks={masks} boxes={boxes} opacity={opacity / 100} labels={masks || boxes} />
          <figcaption className="border-t border-border p-4">
            <p className="text-xs font-medium leading-6">Illustrative visualization — not actual model output.<span className="mt-1 block font-normal text-muted">Synthetic component · authored SVG overlays</span></p>
            <p aria-live="polite" aria-atomic="true" className="mt-3 font-mono text-[10px] leading-5 text-muted">{selected.name} · masks {masks ? "on" : "off"} · boxes {boxes ? "on" : "off"}</p>
          </figcaption>
        </figure>
        <div className="min-w-0">
          <fieldset>
            <legend className="font-mono text-[10px] uppercase tracking-[0.12em] text-muted">Visualization</legend>
            <div className="mt-3 grid grid-cols-2 gap-2">
              {views.map(view => {
                const active = view.id === viewId;
                return <button key={view.id} type="button" aria-pressed={active} aria-controls={`${id}-visualization`} onClick={() => setViewId(view.id)}
                  className={`min-h-11 rounded-lg border px-3 py-2 text-left text-xs font-medium leading-5 transition-colors duration-150 ${active ? "border-foreground bg-foreground text-background" : "border-border hover:bg-background"}`}>{view.label}</button>;
              })}
            </div>
          </fieldset>
          <fieldset className="mt-5">
            <legend className="font-mono text-[10px] uppercase tracking-[0.12em] text-muted">Defect class</legend>
            <div className="mt-3 grid grid-cols-2 gap-2">
              {defectClasses.map(item => (
                <button key={item.id} type="button" aria-pressed={defect === item.id} aria-controls={`${id}-visualization`} onClick={() => setDefect(item.id)}
                  className={`flex min-h-11 items-center justify-center gap-2 rounded-lg border px-2 py-2 text-xs font-medium transition-colors ${defect === item.id ? "border-foreground bg-background" : "border-border hover:bg-background"}`}>
                  <span aria-hidden="true" className="h-2 w-2 rounded-full" style={{ backgroundColor: item.color }} />{item.name}
                </button>
              ))}
            </div>
          </fieldset>
          <div aria-live="polite" aria-atomic="true" className="mt-3 grid border-t border-border pt-4">
            {defectClasses.map(item => (
              <div key={item.id} aria-hidden={defect !== item.id} className={`col-start-1 row-start-1 ${defect !== item.id ? "invisible" : ""}`}>
                <h4 className="text-sm font-medium">{item.name}</h4>
                <p className="mt-2 text-xs leading-6 text-muted">{defectNotes[item.id]}</p>
              </div>
            ))}
          </div>
          {masks && <div className="mt-5 border-t border-border pt-4">
            <div className="flex items-center justify-between gap-4">
              <label htmlFor={`${id}-opacity`} className="text-xs">Mask opacity</label>
              <output htmlFor={`${id}-opacity`} className="font-mono text-xs tabular-nums text-muted">{opacity}%</output>
            </div>
            <input id={`${id}-opacity`} type="range" min="0" max="100" step="5" value={opacity} aria-valuetext={`${opacity}% mask opacity`}
              onChange={event => setOpacity(Number(event.target.value))} className="mt-3 h-6 w-full cursor-pointer accent-foreground focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-foreground" />
          </div>}
        </div>
      </div>
    </div>
  );
}
