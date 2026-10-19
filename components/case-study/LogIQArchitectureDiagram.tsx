function FlowConnector({ bidirectional = false }: { bidirectional?: boolean }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 28 28"
      fill="none"
      className={`h-7 w-7 shrink-0 text-muted ${bidirectional ? "rotate-90" : "rotate-90 md:rotate-0"}`}
    >
      <path d="M3 14h22m-5-5 5 5-5 5" stroke="currentColor" strokeWidth="1" />
      {bidirectional && <path d="m8 9-5 5 5 5" stroke="currentColor" strokeWidth="1" />}
    </svg>
  );
}

const nodeClassName = "min-w-0 rounded-xl border border-border p-4 md:min-h-36";
const labelClassName = "font-mono text-[10px] font-medium uppercase tracking-[0.14em] text-muted";

export function LogIQArchitectureDiagram({ note }: { note?: string }) {
  return (
    <figure aria-label="LogIQ system architecture" className="rounded-2xl border border-border bg-surface p-4 sm:p-5">
      <p className="sr-only">
        Input flows to a single AI agent, which selects predefined tools and
        retrieves evidence from SereneDB before generating a role-specific answer.
        The agent exchanges requests and retrieved evidence with the evidence layer.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-[minmax(0,1fr)_28px_minmax(0,1fr)_28px_minmax(0,1fr)]">
        <section aria-label="Input" className={`${nodeClassName} bg-background md:col-start-1 md:row-start-1`}>
          <h3 className={labelClassName}>Input</h3>
          <p className="mt-4 text-sm font-medium leading-5">Natural-language question</p>
          <p className="mt-2 text-xs leading-5 text-muted">Selected user role</p>
        </section>

        <div className="flex items-center justify-center md:col-start-2 md:row-start-1">
          <FlowConnector />
        </div>

        <section aria-label="AI intelligence" className={`${nodeClassName} bg-background md:col-start-3 md:row-start-1`}>
          <h3 className={labelClassName}>AI intelligence</h3>
          <p className="mt-4 text-sm font-semibold leading-5">Single AI agent</p>
          <ul className="mt-2 space-y-1 text-xs leading-5 text-muted">
            <li>Tool selection</li>
            <li>Evidence-grounded reasoning</li>
          </ul>
        </section>

        <div className="flex h-8 items-center justify-center md:col-start-3 md:row-start-2">
          <FlowConnector bidirectional />
        </div>

        <section aria-label="Evidence layer" className="min-w-0 rounded-xl border border-border bg-background p-4 md:col-span-5 md:row-start-3">
          <h3 className={labelClassName}>Evidence layer</h3>
          <ol className="mx-auto mt-3 grid w-full max-w-2xl gap-6 text-center text-xs leading-5 sm:grid-cols-3 sm:gap-8">
            {["19 predefined investigation tools", "Parameterized SQL", "SereneDB"].map((stage, index) => (
              <li key={stage} className="relative flex min-h-10 min-w-0 items-center justify-center">
                {index > 0 && (
                  <span aria-hidden="true" className="absolute -top-6 left-1/2 -translate-x-1/2 rotate-90 text-muted sm:top-1/2 sm:-left-4 sm:-translate-y-1/2 sm:rotate-0">→</span>
                )}
                <span className={index === 0 ? "font-medium" : undefined}>{stage}</span>
              </li>
            ))}
          </ol>
          <p className="mt-1 text-center text-xs leading-5 text-muted">4.96M searchable log records</p>
        </section>

        <div className="flex items-center justify-center md:col-start-4 md:row-start-1">
          <FlowConnector />
        </div>

        <section aria-label="Role-aware output" className={`${nodeClassName} bg-background md:col-start-5 md:row-start-1`}>
          <h3 className={labelClassName}>Output</h3>
          <p className="mt-4 text-sm font-medium leading-5">Role-specific answer</p>
          <p className="mt-2 text-xs leading-5 text-muted">Supporting evidence</p>
        </section>
      </div>

      <figcaption className="mt-3 text-xs leading-5 text-muted">
        Evidence retrieved before answering. No arbitrary SQL.
        {note && <span className="sr-only"> {note}</span>}
      </figcaption>
    </figure>
  );
}
