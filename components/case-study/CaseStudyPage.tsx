import Link from "next/link";

import { Container } from "@/components/layout/Container";

import { Footer } from "@/components/layout/Footer";

import { Navbar } from "@/components/layout/Navbar";

import { Tag } from "@/components/ui/Tag";

import type { CaseStudy } from "@/types/case-study";

import { ArchitectureDiagram } from "@/components/case-study/ArchitectureDiagram";

import { CaseStudySection } from "@/components/case-study/CaseStudySection";

type CaseStudyPageProps = {

  caseStudy: CaseStudy;

};

export function CaseStudyPage({

  caseStudy,

}: CaseStudyPageProps) {

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

                  {caseStudy.category} · Case Study

                </p>

                <h1 className="mt-5 text-5xl font-semibold tracking-[-0.04em] text-foreground sm:text-6xl lg:text-7xl">

                  {caseStudy.title}

                </h1>

                <p className="mt-8 max-w-3xl text-xl leading-9 text-muted sm:text-2xl">

                  {caseStudy.summary}

                </p>

                <div className="mt-8 flex flex-wrap gap-2">

                  {caseStudy.technologies.map((technology) => (

                    <Tag key={technology}>{technology}</Tag>

                  ))}

                </div>

              </div>

            </Container>

          </header>

          <section className="border-t border-border py-20 sm:py-24">

            <Container>

              {caseStudy.architecture && (

                <CaseStudySection

                  number="00"

                  title="System architecture"

                >

                  <ArchitectureDiagram stages={caseStudy.architecture} />

                </CaseStudySection>

              )}

              {caseStudy.sections.map((section) => (

                <CaseStudySection

                  key={section.number}

                  number={section.number}

                  title={section.title}

                >

                  {section.content}

                </CaseStudySection>

              ))}

            </Container>

          </section>

        </article>

      </main>

      <Footer />

    </>

  );

}