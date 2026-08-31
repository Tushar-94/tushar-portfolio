import Link from "next/link";

import { Container } from "@/components/layout/Container";

import { ArticleCard } from "@/components/ui/ArticleCard";

import { articles } from "@/data/articles";

export function Writing() {

  return (

    <section id="writing" className="py-24 sm:py-32">

      <Container>

        <div className="mb-14 max-w-3xl sm:mb-20">

          <p className="mb-4 font-mono text-xs font-medium uppercase tracking-[0.18em] text-muted">

            Writing

          </p>

          <h2 className="text-4xl font-semibold tracking-[-0.035em] text-foreground sm:text-5xl">

            Notes on building and evaluating AI systems.

          </h2>

          <p className="mt-6 max-w-2xl text-lg leading-8 text-muted">

            Technical writing on retrieval, computer vision, machine learning,

            evaluation, and production engineering.

          </p>

        </div>

        <div>

          {articles.map((article) => (

            <ArticleCard key={article.slug} article={article} />

          ))}

        </div>

        <div className="border-t border-border pt-8">

        <Link

            href="/blog"

            className="text-sm font-medium text-foreground"

          >

            View all writing →

            </Link>

        </div>

      </Container>

    </section>

  );

}