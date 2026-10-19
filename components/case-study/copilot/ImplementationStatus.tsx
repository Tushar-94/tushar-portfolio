export function ImplementationStatus({ target = false }: { target?: boolean }) {
  return (
    <span className={`inline-flex w-fit items-center gap-2 rounded-full border border-border px-2.5 py-1 font-mono text-[10px] leading-4 ${target ? "border-dashed bg-background text-muted" : "bg-surface text-foreground"}`}>
      <span aria-hidden="true" className={`h-1.5 w-1.5 shrink-0 rounded-full ${target ? "border border-muted" : "bg-foreground"}`} />
      {target ? "Target Architecture" : "Implemented / Evaluated"}
    </span>
  );
}
