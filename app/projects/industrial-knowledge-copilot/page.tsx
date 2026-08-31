import Link from "next/link";

import { Container } from "@/components/layout/Container";

import { Footer } from "@/components/layout/Footer";

import { Navbar } from "@/components/layout/Navbar";

import { Tag } from "@/components/ui/Tag";

const technologies = [

  "Python",

  "RAG",

  "Embeddings",

  "Vector Search",

  "Evaluation",

];

export default function IndustrialKnowledgeCopilotPage() {

  return (

    <>

      <Navbar />

      <main>

        <article>

          <header className="py-20 sm:py-28">

            <Container>

              <Link

                href="/projects"

                className="font-mono text-xs text-muted transition-colors hover:text-foreground"

              >

                ← All projects

              </Link>

              <div className="mt-10 max-w-5xl">

                <p className="font-mono text-xs font-medium uppercase tracking-[0.18em] text-muted">

                  Generative AI · Case Study

                </p>

                <h1 className="mt-5 text-5xl font-semibold tracking-[-0.04em] text-foreground sm:text-6xl lg:text-7xl">

                  Industrial Knowledge Copilot

                </h1>

                <p className="mt-8 max-w-3xl text-xl leading-9 text-muted sm:text-2xl">

                  A production-oriented retrieval system for answering

                  questions across industrial documentation with measurable

                  retrieval quality and evidence-backed responses.

                </p>

                <div className="mt-8 flex flex-wrap gap-2">

                  {technologies.map((technology) => (

                    <Tag key={technology}>{technology}</Tag>

                  ))}

                </div>

              </div>

            </Container>

          </header>

          <section className="border-t border-border py-20 sm:py-24">

            <Container>

              <CaseStudySection number="01" title="The problem">

                Industrial engineers frequently need answers buried inside

                specifications, manuals, maintenance documents, and other

                technical material. Traditional search can retrieve documents,

                but it does not necessarily surface the precise evidence needed

                to answer a technical question reliably.

              </CaseStudySection>

              <CaseStudySection number="02" title="Project objective">

                The goal is to build a retrieval-augmented AI system that can

                locate relevant technical evidence, provide grounded answers,

                and make retrieval quality measurable rather than relying on

                demonstrations that merely appear correct.

              </CaseStudySection>

              <CaseStudySection number="03" title="System architecture">

                <ArchitectureDiagram />

              </CaseStudySection>

              <CaseStudySection number="04" title="Engineering approach">

                The system separates document processing, chunking, embedding,

                retrieval, evaluation, and answer generation into distinct

                stages. This makes individual components measurable and allows

                retrieval failures to be diagnosed independently from language

                model behavior.

              </CaseStudySection>

              <CaseStudySection number="05" title="Evaluation">

                Retrieval is evaluated using a curated set of questions with

                known relevant evidence. Instead of judging the system only by

                whether the final answer sounds convincing, the evaluation

                checks whether the correct source material appears at the right

                rank in the retrieved results.

              </CaseStudySection>

              <CaseStudySection number="06" title="Key engineering decision">

                Dense retrieval was introduced as a measurable baseline rather

                than treated as an unquestioned component. Each query can be

                inspected for whether the expected evidence is retrieved and at

                what rank, creating a foundation for comparing chunking,

                embedding, reranking, and hybrid-search strategies.

              </CaseStudySection>

              <CaseStudySection number="07" title="Current status">

                The project currently includes a working dense-retrieval

                evaluation workflow and is being expanded toward a complete

                production-oriented knowledge assistant with stronger

                retrieval, grounded generation, evaluation, and deployment.

              </CaseStudySection>

              <CaseStudySection number="08" title="What this project demonstrates">

                The project is designed to demonstrate more than basic RAG

                implementation. It focuses on retrieval quality, system

                decomposition, reproducible evaluation, engineering trade-offs,

                and the path from an AI prototype toward a dependable product.

              </CaseStudySection>

            </Container>

          </section>

        </article>

      </main>

      <Footer />

    </>

  );

}

type CaseStudySectionProps = {

  number: string;

  title: string;

  children: React.ReactNode;

};

function CaseStudySection({

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

function ArchitectureDiagram() {

  const stages = [

    "Industrial documents",

    "Parsing",

    "Chunking",

    "Embeddings",

    "Vector retrieval",

    "Evaluation",

    "Grounded answer",

  ];

  return (

    <div className="mt-2 rounded-2xl border border-border bg-surface p-6 sm:p-8">

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