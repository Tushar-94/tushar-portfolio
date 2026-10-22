type ArchitectureDiagramProps = {
  stages: string[];
  note?: string;
};

export function ArchitectureDiagram({ stages, note }: ArchitectureDiagramProps) {
  return (
    <figure className="rounded-2xl border border-border bg-surface p-5 sm:p-8">
      <ol className="grid gap-8">
        {stages.map((stage, index) => (
          <li key={stage} className={`relative grid min-w-0 items-center gap-3 rounded-xl border p-5 sm:grid-cols-[36px_1fr] ${
            index === stages.length - 1 ? "border-foreground bg-background" : "border-border"
          }`}>
            <span className="font-mono text-xs text-muted">{String(index + 1).padStart(2, "0")}</span>
            <span className="text-sm font-medium leading-6 text-foreground [overflow-wrap:anywhere]">{stage}</span>
            {index < stages.length - 1 && <span aria-hidden="true" className="absolute -bottom-7 left-1/2 text-muted">↓</span>}
          </li>
        ))}
      </ol>
      {note && <figcaption className="mt-8 border-t border-border pt-5 text-sm leading-6 text-muted">{note}</figcaption>}
    </figure>
  );
}
