"use client";

import { useId, useState } from "react";
import { logiqEvidence, logiqPerspectives, logiqStages } from "@/data/logiq";
import styles from "./LogIQRoleDemo.module.css";
import { CaseStudySection } from "./CaseStudySection";
import { LogIQEvidenceExplorer } from "./LogIQEvidenceExplorer";
import type { LogIQPerspective } from "./logiq-architecture/content";

export function LogIQInvestigationShowcase({ selectedRole, sourceUrl }: { selectedRole: LogIQPerspective["title"]; sourceUrl?: string }) {
  const [selectedStage, setSelectedStage] = useState(0);
  const id = useId();

  return (
    <CaseStudySection number="03" title="Investigation in Action">
      <header>
        <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-muted">Recorded OpenStack investigation · May 16–17, 2017</p>
        <h3 className="mt-3 text-xl font-semibold leading-7 tracking-tight">Recurring InvalidDiskInfo / qemu-img failures</h3>
        <p className="mt-3 text-sm leading-6 text-muted">Follow the evidence from a scoped question to a role-aware interpretation. The investigation stays the same when the perspective changes.</p>
      </header>

      <figure aria-label="Three distinct historical evidence measures" className="mt-6">
        <dl className="grid gap-3 sm:grid-cols-3">
          {logiqEvidence.map((measure) => (
            <div key={measure.title} className="flex min-w-0 flex-col rounded-xl border border-border bg-surface p-4">
              <dt className="order-2 mt-3 text-xs font-medium leading-5">{measure.title}</dt>
              <dd className="order-1 text-4xl font-semibold tracking-[-0.05em] tabular-nums">{measure.value}</dd>
              <dd className="order-3 mt-2 font-mono text-[10px] leading-5 text-muted [overflow-wrap:anywhere]">{measure.scope}</dd>
              <dd aria-hidden="true" className="order-4 mt-auto pt-4"><div className="h-1.5 rounded-full bg-foreground/10"><div className="h-full rounded-full bg-foreground" style={{ width: `${measure.value / 192 * 100}%` }} /></div></dd>
            </div>
          ))}
        </dl>
        <figcaption className="mt-3 text-xs leading-6 text-muted">Counts are shown separately on a common line-count scale. These measures overlap; they are neither additive nor independent incident counts.</figcaption>
      </figure>

      <div className="mt-6 rounded-2xl border border-border bg-surface p-4 sm:p-5">
        <div className="flex flex-wrap items-baseline justify-between gap-3">
          <h4 className="text-sm font-semibold">Evidence-to-answer workflow</h4>
          <span className="font-mono text-[10px] text-muted">Select a stage</span>
        </div>
        <ol aria-label="LogIQ investigation stages" className="mt-4 grid grid-cols-2 gap-2 md:grid-cols-5">
          {logiqStages.map((stage, index) => (
            <li key={stage.label}>
              <button type="button" aria-label={stage.title} aria-pressed={selectedStage === index} aria-controls={`${id}-stage`}
                onClick={() => setSelectedStage(index)} className={`flex min-h-16 w-full flex-col items-start justify-center rounded-lg border px-3 py-2 text-left transition-colors duration-150 ${selectedStage === index ? "border-foreground bg-foreground text-background" : "border-border hover:bg-background"}`}>
                <span className="font-mono text-[10px] opacity-70">0{index + 1} <span aria-hidden="true">→</span></span>
                <span className="mt-1 text-xs font-medium leading-5">{stage.label}</span>
              </button>
            </li>
          ))}
        </ol>
        <div id={`${id}-stage`} aria-live="polite" aria-atomic="true" className="mt-5 grid rounded-xl bg-background p-4">
          {logiqStages.map((stage, index) => (
            <div key={stage.label} aria-hidden={selectedStage !== index} className={`col-start-1 row-start-1 ${selectedStage !== index ? "invisible" : styles.result}`}>
              <h5 className="text-sm font-semibold leading-6">{stage.title}</h5>
              <p className="mt-2 text-sm leading-6 text-muted">{stage.description}</p>
              <p className="mt-4 border-t border-border pt-3 text-xs leading-6 text-muted">{stage.detail}</p>
            </div>
          ))}
        </div>
        <div aria-live="polite" aria-atomic="true" className="mt-5 grid border-t border-border pt-5">
          {logiqPerspectives.map((perspective) => (
            <div key={perspective.role} aria-hidden={selectedRole !== perspective.role} className={`col-start-1 row-start-1 ${selectedRole !== perspective.role ? "invisible" : styles.result}`}>
              <h5 className="font-mono text-[10px] uppercase tracking-[0.12em] text-muted">Same evidence · {perspective.role} perspective</h5>
              <dl className="mt-3 grid gap-4 text-sm leading-6 sm:grid-cols-2">
                <div><dt className="font-medium">Finding</dt><dd className="mt-1 text-muted">{perspective.finding}</dd></div>
                <div><dt className="font-medium">Recommended follow-up</dt><dd className="mt-1 text-muted">{perspective.action}</dd></div>
              </dl>
            </div>
          ))}
        </div>
      </div>
      <LogIQEvidenceExplorer sourceUrl={sourceUrl} />
      <p className="mt-5 border-l-2 border-foreground pl-4 text-xs leading-6 text-muted"><strong className="font-medium text-foreground">Root cause was not conclusively established.</strong> The missing-path diagnostic does not explain why the file was unavailable. Operational impact remains unconfirmed.</p>
    </CaseStudySection>
  );
}
