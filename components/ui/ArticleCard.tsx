import type { Article } from "@/data/articles";

type ArticleCardProps = {

  article: Article;

};

export function ArticleCard({ article }: ArticleCardProps) {

  return (

    <article className="group border-t border-border py-8 sm:py-10">

      <div className="grid gap-5 lg:grid-cols-[180px_1fr_auto] lg:gap-10">

        <div>

          <p className="font-mono text-xs text-muted">

            {article.date}

          </p>

          <p className="mt-2 font-mono text-xs text-muted">

            {article.readingTime}

          </p>

        </div>

        <div className="max-w-3xl">

          <p className="mb-3 font-mono text-xs uppercase tracking-[0.16em] text-muted">

            {article.category}

          </p>

          <h3 className="text-2xl font-semibold tracking-[-0.02em] text-foreground sm:text-3xl">

            {article.title}

          </h3>

          <p className="mt-4 max-w-2xl text-base leading-7 text-muted sm:text-lg">

            {article.summary}

          </p>

        </div>

        <div className="flex items-start lg:justify-end">

          <a

            href={`/blog/${article.slug}`}

            className="text-sm font-medium text-foreground"

          >

            Read article{" "}

            <span

              aria-hidden="true"

              className="inline-block transition-transform group-hover:translate-x-1"

            >

              →

            </span>

          </a>

        </div>

      </div>

    </article>

  );

}