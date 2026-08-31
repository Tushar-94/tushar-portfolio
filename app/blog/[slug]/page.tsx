import type { Metadata } from "next";

import Link from "next/link";

import { notFound } from "next/navigation";

import { Container } from "@/components/layout/Container";

import { Footer } from "@/components/layout/Footer";

import { Navbar } from "@/components/layout/Navbar";

import { blogPosts } from "@/data/blogPosts";

type BlogPostPageProps = {

  params: Promise<{

    slug: string;

  }>;

};

export function generateStaticParams() {

  return blogPosts.map((post) => ({

    slug: post.slug,

  }));

}

export async function generateMetadata({

  params,

}: BlogPostPageProps): Promise<Metadata> {

  const { slug } = await params;

  const post = blogPosts.find((item) => item.slug === slug);

  if (!post) {

    return {};

  }

  return {

    title: post.title,

    description: post.summary,

  };

}

export default async function BlogPostPage({

  params,

}: BlogPostPageProps) {

  const { slug } = await params;

  const post = blogPosts.find((item) => item.slug === slug);

  if (!post) {

    notFound();

  }

  return (

    <>

      <Navbar />

      <main>

        <article>

          <header className="py-20 sm:py-28">

            <Container>

              <Link

                href="/blog"

                className="font-mono text-xs text-muted transition-colors hover:text-foreground"

              >

                ← All writing

              </Link>

              <div className="mt-10 max-w-4xl">

                <p className="font-mono text-xs uppercase tracking-[0.16em] text-muted">

                  {post.category}

                </p>

                <h1 className="mt-5 text-5xl font-semibold tracking-[-0.04em] text-foreground sm:text-6xl">

                  {post.title}

                </h1>

                <p className="mt-8 max-w-3xl text-xl leading-9 text-muted">

                  {post.summary}

                </p>

                <div className="mt-6 flex gap-4 font-mono text-xs text-muted">

                  <span>{post.date}</span>

                  <span>·</span>

                  <span>{post.readingTime}</span>

                </div>

              </div>

            </Container>

          </header>

          <section className="border-t border-border py-20 sm:py-24">

            <Container>

              <div className="mx-auto max-w-3xl">

                {post.sections.map((section) => (

                  <section

                    key={section.heading}

                    className="border-t border-border py-10 first:border-t-0 first:pt-0"

                  >

                    <h2 className="text-3xl font-semibold tracking-[-0.03em] text-foreground">

                      {section.heading}

                    </h2>

                    <div className="mt-6 space-y-5">

                      {section.paragraphs.map((paragraph) => (

                        <p

                          key={paragraph}

                          className="text-lg leading-8 text-muted"

                        >

                          {paragraph}

                        </p>

                      ))}

                    </div>

                  </section>

                ))}

              </div>

            </Container>

          </section>

        </article>

      </main>

      <Footer />

    </>

  );

}