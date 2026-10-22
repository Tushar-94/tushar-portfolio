import { ProjectLink } from "./ProjectLink";

type IndexItem = { slug: string; title: string; descriptor: string; category: string; number: string };

export function ProjectIndex({ items }: { items: IndexItem[] }) {
  return <section aria-label="Project directory">
    <ol className="list-none border-t border-border" aria-label="Projects">
      {items.map(item => <li key={item.slug} value={Number(item.number)} className="border-b border-border">
        <ProjectLink
          href={`/projects/${item.slug}`}
          className="group grid grid-cols-[minmax(0,1fr)_18px] items-center gap-x-4 gap-y-2 py-6 transition-colors duration-150 hover:bg-foreground/[0.02] focus-visible:bg-foreground/[0.02] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-foreground motion-reduce:transition-none md:grid-cols-[28px_minmax(0,1fr)_120px_18px] md:gap-x-5 lg:grid-cols-[36px_minmax(0,1fr)_140px_18px] lg:gap-x-6"
          aria-labelledby={`project-${item.slug}`}
          aria-describedby={`project-${item.slug}-description`}
        >
          <div className="col-start-1 row-start-1 flex items-center gap-4 md:contents">
            <span className="font-mono text-[10px] leading-5 text-muted md:col-start-1 md:row-start-1 md:self-start md:pt-1" aria-hidden="true">{item.number}</span>
            <span className="font-mono text-[10px] leading-5 text-muted md:col-start-3 md:row-start-1 md:text-right">{item.category}</span>
          </div>
          <div className="col-start-1 row-start-2 min-w-0 md:col-start-2 md:row-start-1">
            <h2 id={`project-${item.slug}`} className="text-xl font-medium leading-snug tracking-[-0.035em] sm:text-2xl lg:text-[26px]">{item.title}</h2>
            <p id={`project-${item.slug}-description`} className="mt-2 text-xs leading-6 text-muted">{item.descriptor}</p>
          </div>
          <svg className="col-start-2 row-start-2 mt-1 self-start text-muted transition-transform duration-150 motion-safe:group-hover:translate-x-0.5 motion-safe:group-hover:-translate-y-0.5 motion-safe:group-focus-visible:translate-x-0.5 motion-safe:group-focus-visible:-translate-y-0.5 group-focus-visible:text-foreground motion-reduce:transition-none md:col-start-4 md:row-start-1 md:mt-0 md:self-center" width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M6 18 18 6M6 6h12v12" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" /></svg>
        </ProjectLink>
      </li>)}
    </ol>
  </section>;
}
