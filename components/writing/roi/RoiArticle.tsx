import Link from "next/link";
import { Container } from "@/components/layout/Container";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { profile } from "@/data/profile";
import { roiArticle as article, roiSections } from "@/data/roiArticle";
import { HistoricalContradiction, ReferencePipeline, ScoreRangeFigure, BootstrapFigure } from "./RoiFigures";
import { RoiExplorer, RankingThresholdExplorer, ThresholdStrategyExplorer } from "./RoiExplorers";
import styles from "./RoiArticle.module.css";

const maskingApproaches = [
  { title: "Image-level", description: "Restrict input pixels before encoding. The encoder sees the changed image, including the boundary introduced by masking." },
  { title: "Feature-level", description: "Restrict which patch embeddings contribute to matching. The features were still extracted from a particular visual context." },
  { title: "Score-level", description: "Restrict the spatial anomaly scores used in aggregation. The mask changes what contributes to the inspection score." },
];
const investigations = [
  { title: "Reference selection", description: "Improve the choice of confirmed-good reference images." },
  { title: "Scoring and aggregation", description: "Investigate nearest-neighbour aggregation and top-k patch scoring." },
  { title: "Inspection boundaries", description: "Refine manually defined ROIs around relevant component regions." },
  { title: "Encoder capacity", description: "Evaluate a larger DINOv2 encoder after simpler changes." },
];
const lessons = [
  ["The background can become evidence.", "Visual deviation and inspection relevance are different things."],
  ["Masking needs an experiment.", "The historical AUROC improvement does not isolate a masking-only causal effect."],
  ["A ranking is not a decision policy.", "The zero-flag result made the threshold’s score scale impossible to ignore."],
  ["Every cutoff trades errors.", "Calibration recall and false alarms must be interpreted together."],
  ["Uncertainty belongs beside the metric.", "Frozen splits, leakage prevention, and a wide bootstrap interval constrain the claims."],
];

function Prose({ paragraphs }: { paragraphs: string[] }) {
  return <div className={styles.prose}>{paragraphs.map(paragraph => <p key={paragraph}>{paragraph}</p>)}</div>;
}

export function RoiArticle() {
  return <div className={styles.article} id="roi-article-top">
    <a href="#roi-article-content" className={styles.skipLink}>Skip to article</a>
    <Navbar activePath="/writing" />
    <main id="roi-article-content" tabIndex={-1}>
      <article>
        <header className={styles.hero}>
          <Container>
            <Link href="/writing" className={styles.backLink}>← All writing</Link>
            <p className={styles.eyebrow}>{article.category} / An inspection field note</p>
            <h1>{article.title}</h1>
            <p className={styles.subtitle}>{article.subtitle}</p>
            <div className={styles.byline}><span>{profile.name}</span><span>{article.date}</span><span>{article.readingTime}</span></div>
            <HistoricalContradiction />
            <div className={styles.opening}><p>The detector appeared to be getting better. An earlier ROI evaluation reported stronger anomaly ranking. But at the configured inspection threshold, not one of the evaluated images was flagged.</p><p>I could have stopped at the improved AUROC. Instead, that mismatch became the more useful result. It exposed a gap between recognizing visual differences and turning those differences into an inspection decision.</p></div>
          </Container>
        </header>
        <Container>
          <nav className={styles.contents} aria-label="In this article"><p className={styles.eyebrow}>Follow the investigation</p><ol>{roiSections.map((section, index) => <li key={section.id}><a href={`#${section.id}`}><span aria-hidden="true">0{index + 1}</span>{section.nav}</a></li>)}</ol></nav>
          <div className={styles.evaluationStages} aria-label="Separate evidence contexts"><p><span>Historical</span>ROI investigation</p><p><span>Later</span>Frozen calibration</p><p><span>Reserved</span>Independent holdout</p></div>
          <div>{roiSections.map((section, index) => <section key={section.id} id={section.id} className={styles.chapter} aria-labelledby={`roi-heading-${section.id}`}>
            <header className={styles.chapterHeading}><p className={styles.eyebrow}>0{index + 1} / {section.label}</p><h2 id={`roi-heading-${section.id}`}>{section.heading}</h2></header>

            {section.id === "visual-context" && <><Prose paragraphs={section.paragraphs.slice(0, 3)} /><ReferencePipeline /><Prose paragraphs={section.paragraphs.slice(3)} /></>}

            {section.id === "roi-hypothesis" && <>
              <Prose paragraphs={[section.paragraphs[0]]} /><RoiExplorer /><Prose paragraphs={[section.paragraphs[1]]} />
              <div className={styles.maskingApproaches}>{maskingApproaches.map((item, i) => <div key={item.title}><span className={styles.eyebrow}>0{i + 1} / Masking approach</span><h3>{item.title}</h3><p>{item.description}</p></div>)}</div>
              <Prose paragraphs={section.paragraphs.slice(2)} />
              <aside className={styles.observation}><strong>A boundary is a hypothesis.</strong><p>Masking cannot guarantee better AUROC, correct thresholds, immunity to lighting, generalization across components, or production reliability.</p></aside>
            </>}

            {section.id === "threshold-failure" && <><Prose paragraphs={section.paragraphs.slice(0, 3)} /><RankingThresholdExplorer /><Prose paragraphs={section.paragraphs.slice(3)} /></>}

            {section.id === "calibration" && <><Prose paragraphs={section.paragraphs.slice(0, 2)} /><ScoreRangeFigure /><Prose paragraphs={section.paragraphs.slice(2)} /></>}

            {section.id === "operating-points" && <>
              <Prose paragraphs={section.paragraphs.slice(0, 2)} /><ThresholdStrategyExplorer /><Prose paragraphs={[section.paragraphs[2]]} />
              <aside className={styles.leakageNote}><h3>A different historical reference: 0.33</h3><p>{section.paragraphs[3]}</p></aside>
            </>}

            {section.id === "uncertainty" && <><Prose paragraphs={section.paragraphs.slice(0, 2)} /><BootstrapFigure /><Prose paragraphs={section.paragraphs.slice(2)} /></>}

            {section.id === "next-investigations" && <>
              <Prose paragraphs={section.paragraphs.slice(0, 2)} />
              <ol className={styles.investigations} aria-label="Planned investigations">{investigations.map((item, i) => <li key={item.title}><span aria-hidden="true">0{i + 1}</span><div><h3>{item.title}</h3><p>{item.description}</p></div><span className={styles.plannedLabel}>Planned</span></li>)}</ol>
              <Prose paragraphs={section.paragraphs.slice(2)} />
            </>}

            {section.id === "inspection-lessons" && <>
              <ol className={styles.lessons}>{lessons.map(([title, description], i) => <li key={title}><span aria-hidden="true">0{i + 1}</span><div><h3>{title}</h3><p>{description}</p></div></li>)}</ol>
              <Prose paragraphs={section.paragraphs} />
              <blockquote className={styles.closingThought}>Better anomaly ranking is a model result.<br /><span>A reliable inspection decision is a system question.</span></blockquote>
            </>}
          </section>)}</div>
        </Container>
        <footer className={styles.articleEnd}><Container><p className={styles.eyebrow}>The related case study</p><h2>Explore the inspection workflow.</h2><p>Reference features, ROI-aware processing, calibration, and the engineering decisions around visual anomaly detection.</p><Link href={article.projectUrl} className={styles.projectLink}>Industrial Visual Anomaly Detection <span aria-hidden="true">↗</span></Link><ul className={styles.tags} aria-label="Article topics">{article.tags.map(tag => <li key={tag}>{tag}</li>)}</ul><Link href="/writing" className={styles.allWriting}>← Back to all writing</Link></Container></footer>
      </article>
    </main>
    <Footer />
  </div>;
}
