type ArchitectureDiagramProps = {

    stages: string[];
  
  };
  
  export function ArchitectureDiagram({
  
    stages,
  
  }: ArchitectureDiagramProps) {
  
    return (
  
      <div className="rounded-2xl border border-border bg-surface p-6 sm:p-8">
  
        <div className="flex flex-col items-stretch gap-3">
  
          {stages.map((stage, index) => (
  
            <div key={stage}>
  
              <div className="rounded-xl border border-border px-5 py-4 font-mono text-sm text-foreground">
  
                {stage}
  
              </div>
  
              {index < stages.length - 1 && (
  
                <div
  
                  aria-hidden="true"
  
                  className="py-2 text-center font-mono text-sm text-muted"
  
                >
  
                  ↓
  
                </div>
  
              )}
  
            </div>
  
          ))}
  
        </div>
  
      </div>
  
    );
  
  }