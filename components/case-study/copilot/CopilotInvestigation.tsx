"use client";

import { useId, useState } from "react";
import { investigationSteps } from "@/data/copilot";

export function CopilotInvestigation() {
  const [selectedStep, setSelectedStep] = useState(0);
  const id = useId();
  const step = investigationSteps[selectedStep];

  return (
    <div className="overflow-hidden rounded-2xl border border-border bg-surface">
      <header className="border-b border-border p-5">
        <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-muted">Illustrative example · Intended workflow</p>
        <h3 className="mt-3 text-lg font-medium leading-7 tracking-tight">What should an engineer check when an industrial pump reports a high-vibration alarm?</h3>
        <p className="mt-2 text-xs leading-5 text-muted">A product walkthrough, not a historical agent execution or a live query.</p>
      </header>

      <div className="p-5">
        <ol aria-label="Investigation steps" className="grid grid-cols-2 gap-2 sm:grid-cols-5">
          {investigationSteps.map((item, index) => (
            <li key={item.label}>
              <button type="button" aria-pressed={selectedStep === index} aria-controls={`${id}-step`}
                onClick={() => setSelectedStep(index)}
                className={`flex min-h-11 w-full items-center justify-center gap-2 rounded-lg border px-2 py-2 text-xs transition-colors ${selectedStep === index ? "border-foreground bg-foreground text-background" : "border-border bg-surface text-foreground hover:bg-background"}`}>
                <span className="font-mono text-[10px]">{String(index + 1).padStart(2, "0")}</span>{item.label}
              </button>
            </li>
          ))}
        </ol>

        <div id={`${id}-step`} aria-live="polite" aria-atomic="true" className="mt-5 min-h-28">
          <h4 className="text-sm font-semibold">{step.title}</h4>
          <p className="mt-2 text-sm leading-6 text-muted">{step.description}</p>
        </div>

        <div className="grid gap-5 border-t border-border pt-5 sm:grid-cols-2">
          <section aria-label="Illustrative evidence panel" className="rounded-xl bg-background p-4">
            <h4 className="font-mono text-xs text-muted">Evidence · Placeholders</h4>
            {selectedStep >= 3 ? (
              <ul className="mt-3 space-y-2 text-sm leading-6">
                <li>Alarm guidance — source placeholder</li>
                <li>Maintenance procedure — source placeholder</li>
              </ul>
            ) : <p className="mt-3 text-sm leading-6 text-muted">Select “Evidence” to preview the intended evidence presentation.</p>}
            <p className="mt-3 text-xs leading-5 text-muted">No actual documents, excerpts, or citations are shown.</p>
          </section>
          <section aria-label="Illustrative response panel" className="p-1">
            <h4 className="font-mono text-xs text-muted">Illustrative response · Target capability</h4>
            <p className="mt-3 text-sm leading-6 text-muted">
              {selectedStep === 4
                ? "Confirm the equipment identity and operating context. Review applicable alarm guidance and maintenance checks before recommending an action."
                : "A recommendation follows evidence selection. Select “Recommend” to preview illustrative response text."}
            </p>
            <p className="mt-3 text-xs leading-5 text-muted">Illustrative text only; not a completed model output or verified maintenance instruction.</p>
          </section>
        </div>
      </div>
    </div>
  );
}
