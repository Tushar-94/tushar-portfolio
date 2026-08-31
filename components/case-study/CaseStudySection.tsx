type CaseStudySectionProps = {

    number: string;
  
    title: string;
  
    children: React.ReactNode;
  
  };
  
  export function CaseStudySection({
  
    number,
  
    title,
  
    children,
  
  }: CaseStudySectionProps) {
  
    return (
  
      <section className="grid gap-6 border-t border-border py-12 lg:grid-cols-[180px_1fr] lg:gap-16">
  
        <div>
  
          <span className="font-mono text-xs text-muted">{number}</span>
  
        </div>
  
        <div className="max-w-3xl">
  
          <h2 className="text-3xl font-semibold tracking-[-0.03em] text-foreground">
  
            {title}
  
          </h2>
  
          <div className="mt-6 text-lg leading-8 text-muted">
  
            {children}
  
          </div>
  
        </div>
  
      </section>
  
    );
  
  }