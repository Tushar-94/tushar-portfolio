type CaseStudySectionProps = {
  number: string;
  title: string;
  children: React.ReactNode;
};

export function CaseStudySection({ number, title, children }: CaseStudySectionProps) {
  return (
    <section className="grid gap-8 border-t border-border py-12 sm:py-16 lg:grid-cols-[220px_minmax(0,1fr)] lg:gap-16">
      <div>
        <span className="font-mono text-xs text-muted">{number}</span>
        <h2 className="mt-3 text-2xl font-semibold tracking-[-0.03em] text-foreground">{title}</h2>
      </div>
      <div className="min-w-0">{children}</div>
    </section>
  );
}
