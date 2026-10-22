import Link from "next/link";
import { Container } from "@/components/layout/Container";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { profile } from "@/data/profile";
import { retrievalArticle as article, retrievalSections, retrievalStrategies, routingQueries } from "@/data/retrievalArticle";
import { EvaluationChart } from "./EvaluationChart";
import { RoutingExplorer } from "./RoutingExplorer";
import { ReadingGuide } from "./ReadingGuide";
import styles from "./RetrievalArticle.module.css";

const guideLabels = ["The starting point", "Two baselines", "The regression", "Failure analysis", "Query-aware routing", "Four strategies", "The later V2", "What changed"];
const metricDefinitions = [
  { name: "Hit@1", meaning: "Expected evidence ranked first." },
  { name: "Hit@3", meaning: "Expected evidence in the first three results." },
  { name: "Hit@5", meaning: "Expected evidence in the first five results." },
  { name: "MRR", meaning: "Mean Reciprocal Rank. Earlier evidence earns more credit." },
];
const failureLabels = ["Overlap is not relevance.", "Not every question needs two retrievers.", "Identifiers are more than ordinary tokens."];
const laterChanges = ["Qdrant vector storage", "Metadata-aware retrieval", "Shared candidate eligibility", "Document-title embedding context", "Automated retrieval regression tests"];
const lessons = ["More signals do not guarantee better evidence.", "Different information needs deserve different routes.", "Rank fusion does not replace query understanding.", "Evaluation should determine architectural complexity.", "A development benchmark is not a reliability guarantee."];

function Paragraphs({ paragraphs }: { paragraphs: string[] }) {
  return <div className={styles.prose}>{paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}</div>;
}

function RegressionVisual() {
  return <figure className={styles.regressionVisual} aria-labelledby="regression-caption">
    <figcaption id="regression-caption" className={styles.figureHeading}><span>The first hybrid, against the baseline</span><span>MRR · 0–1</span></figcaption>
    <div className={styles.regressionNumbers}><div><span>Dense</span><strong>0.743</strong></div><span className={styles.regressionArrow} aria-label="decreased to">↘</span><div data-regression="true"><span>Naive Hybrid</span><strong>0.705</strong></div></div>
    <div className={styles.regressionFoot}><span>Hit@5 <strong>88% → 84%</strong></span><span>25-query development benchmark</span></div>
  </figure>;
}

function Setup() {
  return <aside className={styles.setup} aria-label="Initial experimental setup"><p className={styles.eyebrow}>The initial experiment</p><dl>{[
    ["Embedding model", "all-MiniLM-L6-v2"], ["Representation", "384 dimensions"], ["Knowledge base", "154 document chunks"], ["Evaluation", "25 development queries"],
  ].map(([name,value]) => <div key={name}><dt>{name}</dt><dd>{value}</dd></div>)}</dl><p>Dense cosine similarity + BM25 + RRF. Before the Qdrant-backed architecture.</p></aside>;
}

function RoutedResults() {
  return <aside className={styles.routedResults} aria-label="Query-aware development results"><dl>{[
    ["80%", "Hit@1"], ["100%", "Hit@5"], ["0.883", "MRR"],
  ].map(([value,label]) => <div key={label}><dt>{label}</dt><dd>{value}</dd></div>)}</dl><p>25-query development benchmark. Not independent production measurements.</p></aside>;
}

function LaterCheckpoint() {
  return <aside className={styles.laterCheckpoint} aria-labelledby="v2-caption"><div className={styles.figureHeading}><h3 id="v2-caption">Later iteration / V2</h3><span>Separate development checkpoint</span></div><dl>{[
    ["Hit@1", "84%"], ["Hit@3", "92%"], ["Hit@5", "100%"], ["MRR", "0.891"],
  ].map(([name,value]) => <div key={name}><dt>{name}</dt><dd>{value}</dd></div>)}</dl><p><strong>90 automated tests passing</strong> were reported with this checkpoint.</p><p>Several architectural changes accompanied this result. It does not isolate the effect of query routing.</p></aside>;
}

export function RetrievalArticle() {
  return (
    <div className={styles.article} id="article-top">
      <a href="#article-content" className={styles.skipLink}>Skip to article</a>
      <Navbar activePath="/writing" />
      <main id="article-content" tabIndex={-1}>
        <article>
          <header className={styles.hero}>
            <Container>
              <Link className={styles.backLink} href="/writing">← All writing</Link>
              <p className={`${styles.eyebrow} ${styles.heroCategory}`}>{article.category} / Engineering field notes</p>
              <h1>{article.title}</h1>
              <p className={styles.subtitle}>{article.subtitle}</p>
              <div className={styles.byline}><span>{profile.name}</span><span>{article.date}</span><span>{article.readingTime}</span></div>
              <div className={styles.opening}>
                <div><p>I expected BM25 to be a straightforward improvement. Dense embeddings could interpret the question; lexical matching could preserve exact technical references. Combining them seemed like the sensible next step.</p><p>Then I ran the benchmark. The first hybrid implementation ranked the supporting evidence worse than dense retrieval alone.</p></div>
                <RegressionVisual />
              </div>
              <blockquote className={styles.openingQuestion}>What if the decision wasn’t which retriever to add,<br className={styles.desktopBreak} /> but when to use it?</blockquote>
            </Container>
          </header>

          <Container>
            <div className={styles.readingLayout}>
              <ReadingGuide sections={retrievalSections.map((section,index) => ({ id: section.id, label: guideLabels[index] }))} />
              <div className={styles.chapters}>
                {retrievalSections.map((section,index) => <section id={section.id} key={section.id} className={styles.chapter} aria-labelledby={`heading-${section.id}`}>
                  <p className={styles.eyebrow}>{String(index + 1).padStart(2,"0")} / {section.label}</p>
                  <h2 id={`heading-${section.id}`}>{section.heading}</h2>

                  {section.id === "context" && <><Paragraphs paragraphs={section.paragraphs} /><Setup /></>}

                  {section.id === "baselines" && <>
                    <Paragraphs paragraphs={section.paragraphs.slice(0,2)} />
                    <figure className={styles.densePipeline}><figcaption className={styles.eyebrow}>The dense baseline</figcaption><ol aria-label="Initial dense retrieval pipeline">{["Query", "MiniLM embedding", "Cosine similarity", "Ranked evidence"].map((item) => <li key={item}>{item}</li>)}</ol></figure>
                    <h3 className={styles.subheading}>A lexical counterpoint</h3><Paragraphs paragraphs={section.paragraphs.slice(2)} />
                    <dl className={styles.metricDefinitions}>{metricDefinitions.map((metric) => <div key={metric.name}><dt>{metric.name}</dt><dd>{metric.meaning}</dd></div>)}</dl>
                    <p className={styles.pullLine}>Semantic similarity is not the same as technical correctness.</p>
                  </>}

                  {section.id === "fusion" && <>
                    <Paragraphs paragraphs={section.paragraphs.slice(0,2)} />
                    <div className={styles.formula}><code>RRF(d) = <span>Σᵣ 1 / (k + rankᵣ(d))</span></code><p>Combine rank positions, not incomparable raw scores.</p></div>
                    <Paragraphs paragraphs={section.paragraphs.slice(2)} />
                    <aside className={styles.regressionNote}><span>What changed?</span><p>Hit@1 stayed at 64%. Hit@3, Hit@5, and MRR all declined.</p></aside>
                  </>}

                  {section.id === "failures" && <>
                    <Paragraphs paragraphs={[section.paragraphs[0]]} />
                    <div className={styles.findings}>{section.paragraphs.slice(1).map((paragraph,i) => <div key={paragraph}><span aria-hidden="true">0{i + 1}</span><div><h3>{failureLabels[i]}</h3><p>{paragraph}</p></div></div>)}</div>
                    <p className={styles.pullLine}>The weak decision was using the same fusion policy for different information needs.</p>
                  </>}

                  {section.id === "routing" && <><Paragraphs paragraphs={section.paragraphs} /><RoutingExplorer queries={routingQueries} /><RoutedResults /></>}

                  {section.id === "comparison" && <><Paragraphs paragraphs={[section.paragraphs[0]]} /><EvaluationChart strategies={retrievalStrategies} /><Paragraphs paragraphs={section.paragraphs.slice(1)} /></>}

                  {section.id === "later" && <>
                    <Paragraphs paragraphs={section.paragraphs.slice(0,2)} />
                    <ul className={styles.laterChanges} aria-label="Later engineering iterations">{laterChanges.map((change) => <li key={change}>{change}</li>)}</ul>
                    <LaterCheckpoint /><Paragraphs paragraphs={[section.paragraphs[2]]} />
                  </>}

                  {section.id === "lessons" && <>
                    <ol className={styles.lessons}>{lessons.map((lesson,i) => <li key={lesson}><span aria-hidden="true">0{i + 1}</span>{lesson}</li>)}</ol>
                    <Paragraphs paragraphs={section.paragraphs} />
                    <blockquote className={styles.finalQuote}>A more complex system is not necessarily a better system.<br /><span>The right architecture is the one whose decisions are supported by evidence.</span></blockquote>
                  </>}
                </section>)}

                <footer id="article-end" className={styles.articleEnd}>
                  <p className={styles.eyebrow}>Continue the investigation</p><h2>Explore the system behind the experiment.</h2><p>The source project documents the retrieval work, synthetic knowledge environment, and engineering decisions.</p>
                  <div className={styles.articleActions}><a href={article.githubUrl} className={styles.githubButton} target="_blank" rel="noopener noreferrer">Explore the Retrieval Experiments on GitHub <span aria-hidden="true">↗</span><span className="sr-only"> (opens in a new tab)</span></a><Link href={article.projectUrl}>Industrial Knowledge Copilot <span aria-hidden="true">↗</span></Link></div>
                  <ul className={styles.tags} aria-label="Article topics">{article.tags.map((tag) => <li key={tag}>{tag}</li>)}</ul>
                  <Link className={styles.allWriting} href="/writing">← Back to all writing</Link>
                </footer>
              </div>
            </div>
          </Container>
        </article>
      </main>
      <Footer />
    </div>
  );
}
