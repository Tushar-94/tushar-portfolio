"use client";

import { useId, useState } from "react";
import { logiqLogContext, logiqTools } from "@/data/logiq";

export function LogIQEvidenceExplorer({ sourceUrl }: { sourceUrl?: string }) {
  const [selected, setSelected] = useState(0);
  const id = useId();

  return (
    <details className="mt-5 overflow-hidden rounded-xl border border-border bg-surface">
      <summary className="cursor-pointer px-5 py-4 text-sm font-medium transition-colors hover:bg-background focus-visible:outline-2 focus-visible:-outline-offset-4 focus-visible:outline-foreground">
        Explore the recorded evidence <span className="ml-2 font-mono text-[10px] text-muted">Tools · inputs · log context</span>
      </summary>
      <div className="border-t border-border p-5">
        <div role="group" aria-label="Evidence tool family" className="grid gap-2 sm:grid-cols-3">
          {logiqTools.map((tool, index) => (
            <button key={tool.name} type="button" aria-pressed={selected === index} aria-controls={`${id}-evidence`} onClick={() => setSelected(index)}
              className={`min-h-11 rounded-lg border px-3 py-2 text-xs font-medium transition-colors ${selected === index ? "border-foreground bg-foreground text-background" : "border-border hover:bg-background"}`}>{tool.label}</button>
          ))}
        </div>
        <div id={`${id}-evidence`} aria-live="polite" aria-atomic="true" className="mt-5 grid">
          {logiqTools.map((tool, index) => (
            <div key={tool.name} aria-hidden={selected !== index} className={`col-start-1 row-start-1 min-w-0 ${selected !== index ? "invisible" : ""}`}>
              <p className="font-mono text-[10px] leading-6 text-muted">{tool.family} family · <span className="text-foreground">{tool.name}</span></p>
              <dl className="mt-3 grid gap-5 text-xs leading-6 sm:grid-cols-2">
                <div className="min-w-0">
                  <dt className="font-medium">Example recorded input parameters</dt>
                  <dd><pre className="mt-2 rounded-lg bg-background p-3 font-mono text-[11px] leading-6 whitespace-pre-wrap break-all">{JSON.stringify(tool.parameters, null, 2)}</pre></dd>
                </div>
                <div>
                  <dt className="font-medium">Evidence type</dt><dd className="mt-2 text-muted">{tool.evidenceType}</dd>
                  <dt className="mt-4 font-medium">Tool operation</dt><dd className="mt-2 text-muted">{tool.operation}</dd>
                </div>
              </dl>
              <p className="mt-4 border-l-2 border-border pl-3 text-xs leading-6 text-muted"><strong className="font-medium text-foreground">Interpretation limit.</strong> {tool.limitation}</p>
            </div>
          ))}
        </div>
        <figure className="mt-5 border-t border-border pt-5">
          <figcaption className="font-mono text-[10px] leading-5 text-muted">Representative recorded context · engineer/Q1 · line 45631<br />2017-05-16 03:19:45 · oslo_service.periodic_task · ERROR</figcaption>
          <blockquote cite={sourceUrl} className="mt-3 rounded-lg bg-background p-3">
            <p className="font-mono text-[11px] leading-6 break-all">{logiqLogContext}</p>
          </blockquote>
          <p className="mt-3 text-xs leading-6 text-muted">The adjacent recorded traceback includes a missing-path diagnostic. Why the path was unavailable remains unconfirmed. This context comes from the recorded search, not a new tool execution.</p>
        </figure>
        {sourceUrl && <a href={sourceUrl} target="_blank" rel="noopener noreferrer" className="mt-4 inline-block text-xs font-medium underline decoration-border underline-offset-4">Inspect the worked-investigation source <span aria-hidden="true">↗</span><span className="sr-only"> (opens in a new tab)</span></a>}
      </div>
    </details>
  );
}
