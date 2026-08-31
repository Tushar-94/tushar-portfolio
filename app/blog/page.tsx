import type { Metadata } from "next";

import Link from "next/link";

import { Container } from "@/components/layout/Container";

import { Footer } from "@/components/layout/Footer";

import { Navbar } from "@/components/layout/Navbar";

import { blogPosts } from "@/data/blogPosts";

export const metadata: Metadata = {

  title: "Writing",

  description:

    "Technical writing by Tushar Rao on Generative AI, machine learning, computer vision, evaluation, and production engineering.",

};

export default function BlogPage() {

  return (

    <>

      <Navbar />

      <main>

        <section className="py-20 sm:py-28">

          <Container>

            <div className="max-w-4xl">

              <p className="mb-5 font-mono text-xs font-medium uppercase tracking-[0.18em] text-muted">

                Writing

              </p>

              <h1 className="text-5xl font-semibold tracking-[-0.04em] text-foreground sm:text-6xl lg:text-7xl">

                Notes on building and evaluating AI systems.

              </h1>

              <p className="mt-8 max-w-2xl text-lg leading-8 text-muted">

                Practical writing on retrieval, computer vision, machine

                learning, evaluation, and production engineering.

              </p>

            </div>

            <div className="mt-20">

              {blogPosts.map((post) => (

                <article

                  key={post.slug}

                  className="border-t border-border py-10 sm:py-12"

                >

                  <div className="grid gap-6 lg:grid-cols-[180px_1fr_auto] lg:gap-10">

                    <div>

                      <p className="font-mono text-xs text-muted">{post.date}</p>

                      <p className="mt-2 font-mono text-xs text-muted">

                        {post.readingTime}

                      </p>

                    </div>

                    <div className="max-w-3xl">

                      <p className="font-mono text-xs uppercase tracking-[0.16em] text-muted">

                        {post.category}

                      </p>

                      <h2 className="mt-3 text-3xl font-semibold tracking-[-0.025em] text-foreground">

                        {post.title}

                      </h2>

                      <p className="mt-4 max-w-2xl text-lg leading-8 text-muted">

                        {post.summary}

                      </p>

                    </div>

                    <div>

                      <Link

                        href={`/blog/${post.slug}`}

                        className="text-sm font-medium text-foreground"

                      >

                        Read article →

                      </Link>

                    </div>

                  </div>

                </article>

              ))}

              <div className="border-t border-border" />

            </div>

          </Container>

        </section>

      </main>

      <Footer />

    </>

  );

}