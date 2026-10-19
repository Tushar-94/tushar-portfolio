import { ImplementationStatus } from "./ImplementationStatus";

function Pipeline({ title, steps }: { title: string; steps: string[] }) {
  return (
    <div>
      <h4 className="mb-3 font-mono text-[10px] uppercase tracking-[0.12em] text-muted">{title}</h4>
      <ol className="grid gap-5 md:grid-cols-[repeat(var(--stages),minmax(0,1fr))] md:gap-4"
        style={{ "--stages": steps.length } as React.CSSProperties}>
        {steps.map((step, index) => (
          <li key={step} className="relative flex min-h-16 min-w-0 items-center justify-center rounded-lg border border-border bg-surface px-2 py-3 text-center text-xs leading-5 [overflow-wrap:anywhere]">
            {index > 0 && (
              <span aria-hidden="true" className="absolute -top-5 left-1/2 -translate-x-1/2 rotate-90 text-muted md:top-1/2 md:-left-2 md:-translate-y-1/2 md:rotate-0">→</span>
            )}
            {step}
          </li>
        ))}
      </ol>
    </div>
  );
}

const targetLanes = [
  { title: "Answer generation", stages: ["Retrieved evidence", "LLM context construction", "Grounded answer + source attribution"], bidirectional: false },
  { title: "Agentic workflows", stages: ["AI orchestration", "Technical investigation tools"], bidirectional: true },
  { title: "Backend / deployment", stages: ["FastAPI", "Docker", "Deployment infrastructure"], bidirectional: false },
];

export function CopilotArchitecture() {
  return (
    <figure aria-label="Industrial Knowledge Copilot: evaluated retrieval and target system architecture" className="rounded-2xl border border-border bg-surface p-4 sm:p-5">
      <div className="grid justify-items-center gap-2 text-center">
        <h3 className="text-sm font-semibold">Retrieval engine & development benchmark</h3>
        <ImplementationStatus />
      </div>
      <div className="mt-5 space-y-5 rounded-xl bg-background p-3 sm:p-4">
        <Pipeline title="Document ingestion" steps={["Industrial documentation", "Document processing", "Metadata enrichment", "Chunking and embeddings", "Qdrant vector storage"]} />
        <div aria-hidden="true" className="flex flex-col items-center justify-center gap-1 text-center text-xs text-muted">
          <span>Stored chunks support retrieval</span>
          <svg viewBox="0 0 24 24" fill="none" className="h-6 w-6 shrink-0">
            <path d="M12 3v18m-4-4 4 4 4-4" stroke="currentColor" strokeWidth="1" />
          </svg>
        </div>
        <Pipeline title="Retrieval" steps={["Natural-language query", "Query-aware retrieval routing", "Dense retrieval + conditional BM25", "Shared metadata eligibility constraints", "Fusion / ranking", "Retrieved evidence"]} />
      </div>

      <div className="mt-5 border-t border-border pt-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <h3 className="text-sm font-semibold">Beyond retrieval</h3>
          <ImplementationStatus target />
        </div>
        <div className="mt-4 grid gap-3 md:grid-cols-3">
          {targetLanes.map((lane) => (
            <section key={lane.title} className="min-w-0 rounded-xl border border-dashed border-border bg-background p-3">
              <h4 className="text-xs font-medium">{lane.title}</h4>
              <ol className="mt-3 flex flex-wrap items-center gap-x-2 gap-y-1 text-xs leading-5 text-muted">
                {lane.stages.map((stage, index) => (
                  <li key={stage}>
                    {index > 0 && <span aria-hidden="true" className="mr-2">{lane.bidirectional ? "↔" : "→"}</span>}
                    {stage}
                  </li>
                ))}
              </ol>
              {lane.bidirectional && <p className="sr-only">AI orchestration exchanges requests and results with technical investigation tools.</p>}
            </section>
          ))}
        </div>
      </div>
      <figcaption className="mt-4 text-xs leading-5 text-muted">
        Evaluation covers retrieval on synthetic industrial chunks, not a validated enterprise ingestion service.
        Grounded generation, agentic workflows, FastAPI, and deployment are target capabilities.
      </figcaption>
    </figure>
  );
}
