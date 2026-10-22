import Link from "next/link";
import { Container } from "@/components/layout/Container";
import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";
import { Tag } from "@/components/ui/Tag";
import { forecasting, forecastDecisions, forecastOrigins, forecastTechnologyGroups } from "@/data/forecasting";
import type { CaseStudy } from "@/types/case-study";
import { CaseStudySection } from "../CaseStudySection";
import { ForecastArchitecture } from "./ForecastArchitecture";
import { ChannelComposition, ModelComparison } from "./ForecastCharts";

const keyResults = [
  { value: "31.6K", title: "Forecast Room Nights", description: "365-day base forecast estimate" },
  { value: "24%", title: "Lower Direct-Channel MAE", description: "Versus a common 3-month baseline across model-selection backtests" },
  { value: "4", title: "Historical Backtest Origins", description: "Rolling-origin temporal evaluation" },
];

function RepositoryLink({ url }: { url: string }) {
  return (
    <a href={url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-3 rounded-full bg-foreground px-5 py-3 text-sm font-medium text-background! transition-opacity hover:opacity-80">
      View GitHub Repository <span aria-hidden="true">↗</span>
      <span className="sr-only"> (opens in a new tab)</span>
    </a>
  );
}

export function ForecastProjectPage({ caseStudy }: { caseStudy: CaseStudy }) {
  return (
    <>
      <Navbar />
      <main>
        <article>
          <header className="py-16 sm:py-24">
            <Container>
              <Link href="/projects" className="font-mono text-xs text-muted transition-colors hover:text-foreground">← All projects</Link>
              <div className="mt-10 max-w-5xl">
                <p className="font-mono text-xs uppercase tracking-[0.16em] text-muted">{caseStudy.category}</p>
                <h1 className="mt-5 text-4xl font-semibold tracking-[-0.04em] sm:text-6xl lg:text-7xl">{caseStudy.title}</h1>
                <p className="mt-6 max-w-3xl text-xl font-medium leading-8 tracking-tight sm:text-2xl">{forecasting.subtitle}</p>
                <p className="mt-4 max-w-3xl text-base leading-7 text-muted">{caseStudy.summary}</p>
                <div className="mt-7 flex flex-wrap gap-2">
                  {caseStudy.technologies.map((technology) => <Tag key={technology}>{technology}</Tag>)}
                </div>
                <div className="mt-8 flex flex-wrap items-center gap-5">
                  {caseStudy.githubUrl && <RepositoryLink url={caseStudy.githubUrl} />}
                  <Link href="#forecast-architecture" className="inline-flex items-center gap-3 rounded-full border border-border bg-surface px-5 py-3 text-sm font-medium transition-colors hover:border-foreground">
                    Explore Architecture <span aria-hidden="true">↓</span>
                  </Link>
                </div>
              </div>
            </Container>
          </header>

          <Container>
            <CaseStudySection number="01" title="Project Overview">
              <p className="max-w-3xl text-base leading-7 text-muted">
                Reservation transactions are not daily demand. The workflow validates 18,067 completed reservation records, expands stays into 51,696 room-night observations, and aggregates them by channel into complete daily time series.
              </p>
              <p className="mt-4 max-w-3xl text-base leading-7 text-muted">
                Transactional data engineering meets forecasting experiments: temporal validation guides channel-specific model selection, then a 365-day demand forecast supports uncertainty-aware scenario planning.
              </p>
            </CaseStudySection>

            <CaseStudySection number="02" title="Key Results">
              <dl className="grid gap-4 sm:grid-cols-3">
                {keyResults.map((result) => (
                  <div key={result.title} className="flex flex-col rounded-xl border border-border bg-surface p-5">
                    <dt className="order-2 mt-4 text-sm font-medium leading-6">{result.title}</dt>
                    <dd className="order-1 text-5xl font-semibold tracking-[-0.05em] tabular-nums">{result.value}</dd>
                    <dd className="order-3 mt-2 text-xs leading-6 text-muted">{result.description}</dd>
                  </div>
                ))}
              </dl>
              <p className="mt-5 flex flex-wrap gap-x-6 gap-y-2 font-mono text-[11px] leading-5 text-muted">
                <span>51,696 historical room-night observations</span>
                <span>1,460 channel-level daily predictions</span>
              </p>
            </CaseStudySection>

            <div id="forecast-architecture" className="scroll-mt-24">
              <CaseStudySection number="03" title="System Architecture">
                <ForecastArchitecture />
              </CaseStudySection>
            </div>

            <CaseStudySection number="04" title="365-Day Demand Forecast">
              <p className="mb-6 font-mono text-xs leading-6 text-muted">
                Forecast period: <time dateTime="2024-06-01">June 1, 2024</time> – <time dateTime="2025-05-31">May 31, 2025</time>
              </p>
              <ChannelComposition />
            </CaseStudySection>

            <CaseStudySection number="05" title="Evaluation-Driven Model Selection">
              <p className="max-w-3xl text-sm leading-7 text-muted">Each origin simulates a historical forecasting decision using only information available at that time.</p>
              <ol aria-label="Four chronological forecast origins" className="mt-7 grid grid-cols-2 gap-y-6 sm:grid-cols-4">
                {forecastOrigins.map((origin, index) => (
                  <li key={origin.date} className="relative border-t border-border pr-3 pt-5">
                    <span aria-hidden="true" className="absolute -top-1 h-2 w-2 rounded-full bg-foreground" />
                    <p className="font-mono text-[10px] text-muted">Origin 0{index + 1}</p>
                    <time dateTime={origin.date} className="mt-2 block text-xs font-medium leading-5">{origin.label}</time>
                    <div aria-hidden="true" className="mt-3 flex h-1 max-w-24 overflow-hidden rounded-full">
                      <span className="w-2/3 bg-foreground" /><span className="w-1/3 bg-foreground/20" />
                    </div>
                  </li>
                ))}
              </ol>
              <p className="mb-7 mt-4 flex flex-wrap gap-x-5 gap-y-2 text-[11px] text-muted">
                <span><span aria-hidden="true" className="mr-2 inline-block h-1.5 w-3 bg-foreground" />Available history</span>
                <span><span aria-hidden="true" className="mr-2 inline-block h-1.5 w-3 bg-foreground/20" />Following ≈2 months evaluated</span>
              </p>
              <ModelComparison />
              <p className="mt-5 border-l-2 border-foreground pl-4 text-sm leading-6 text-muted">
                <strong className="font-medium text-foreground">Complexity was tested.</strong> Linear-trend extrapolation worsened average MAE for all four channels.
              </p>
            </CaseStudySection>

            <CaseStudySection number="06" title="Engineered Through Evaluation">
              <div className="grid gap-4 md:grid-cols-3">
                {forecastDecisions.map((decision) => (
                  <section key={decision.title} className="flex min-w-0 flex-col rounded-xl border border-border bg-surface p-5">
                    <h3 className="text-base font-semibold tracking-tight">{decision.title}</h3>
                    <dl className="mt-4 flex flex-1 flex-col text-sm leading-6">
                      <div>
                        <dt className="font-mono text-[10px] uppercase tracking-[0.12em] text-muted">Problem</dt>
                        <dd className="mt-1 text-muted">{decision.problem}</dd>
                      </div>
                      <div className="mt-auto pt-4">
                        <dt className="font-mono text-[10px] uppercase tracking-[0.12em] text-muted">Decision <span aria-hidden="true">→</span></dt>
                        <dd className="mt-1">{decision.decision}</dd>
                      </div>
                    </dl>
                  </section>
                ))}
              </div>
            </CaseStudySection>

            <CaseStudySection number="07" title="Technology Stack">
              <div className="grid gap-x-8 gap-y-6 sm:grid-cols-2">
                {forecastTechnologyGroups.map((group) => (
                  <section key={group.title} className="border-t border-border pt-4">
                    <h3 className="font-mono text-xs text-muted">{group.title}</h3>
                    <ul className="mt-3 flex flex-wrap gap-2">
                      {group.items.map((item) => <li key={item} className="flex"><Tag>{item}</Tag></li>)}
                    </ul>
                  </section>
                ))}
              </div>
            </CaseStudySection>

            <CaseStudySection number="08" title="Explore the Full Implementation">
              <p className="text-sm leading-7 text-muted">Explore the forecasting experiments, temporal validation, Python implementations, visualizations, and documented engineering decisions.</p>
              <div className="mt-6 flex flex-wrap items-center gap-5">
                {caseStudy.githubUrl ? <RepositoryLink url={caseStudy.githubUrl} /> : <p className="text-xs text-muted">Repository link pending.</p>}
                <Link href="#forecast-architecture" className="text-sm font-medium transition-colors hover:text-muted">Explore Architecture <span aria-hidden="true">↑</span></Link>
              </div>
            </CaseStudySection>

            <nav aria-label="Project navigation" className="flex flex-wrap items-center justify-between gap-6 border-t border-border py-10">
              <Link href="/projects" className="text-sm font-medium transition-colors hover:text-muted">← Explore all projects</Link>
              <Link href="/#contact" className="text-sm font-medium transition-colors hover:text-muted">Get in touch →</Link>
            </nav>
          </Container>
        </article>
      </main>
      <Footer />
    </>
  );
}
