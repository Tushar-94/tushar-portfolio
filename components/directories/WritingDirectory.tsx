import Link from "next/link";
import { Container } from "@/components/layout/Container";
import { blogPosts, type BlogPost } from "@/data/blogPosts";
import { retrievalArticle, retrievalStrategies } from "@/data/retrievalArticle";
import { roiArticle } from "@/data/roiArticle";
import { DirectoryShell, Arrow } from "./DirectoryShell";
import { CollectionFilter } from "./CollectionFilter";
import shared from "./Directory.module.css";
import styles from "./Writing.module.css";

function RetrievalPreview() {
  const strategies = retrievalStrategies.filter(strategy => strategy.name !== "BM25");
  return <figure className={styles.retrievalFigure}>
    <div className={styles.figureHeading}><span>THE RETRIEVAL EXPERIMENT</span><span aria-hidden="true">FIG. 01</span></div>
    <p className={styles.chartThesis}>More signals.<br /><span>Better retrieval?</span></p>
    <div className={styles.chartAxis}><span>Mean reciprocal rank</span><span>0 → 1</span></div>
    <dl className={styles.benchmark}>{strategies.map(strategy => <div key={strategy.name} className={strategy.tone === "regression" ? styles.regression : strategy.tone === "improvement" ? styles.improvement : undefined}>
      <dt>{strategy.name === "Query-Aware" ? "Query-Aware Hybrid" : strategy.name}<span>{strategy.note}</span></dt>
      <dd><span className={styles.track}><span className={styles.bar} style={{ width: `${strategy.mrr * 100}%` }} /></span><strong>{strategy.mrr.toFixed(3)}</strong></dd>
    </div>)}</dl>
    <figcaption>Original development benchmark · 25 queries<br />Development results, not an independent production evaluation.</figcaption>
  </figure>;
}

function RoiPreview() {
  return <figure className={styles.roiFigure}>
    <div className={styles.figureHeading}><span>THE INSPECTION PARADOX</span><span aria-hidden="true">FIG. 02</span></div>
    <div className={styles.roiRanking}><p>Historical AUROC</p><div><span>≈0.64</span><Arrow /><strong>≈0.81</strong></div><span className={styles.rankingLine} aria-hidden="true"><i /><i /></span></div>
    <div className={styles.roiDecision}><div><span>Images flagged</span><p><strong>0</strong><span>/ 50</span></p></div><div className={styles.threshold}><span>Historical threshold</span><strong>0.72</strong></div></div>
    <figcaption>Historical ROI evaluation<br />Better ranking did not establish a useful inspection cutoff.</figcaption>
  </figure>;
}

function Story({ post, index }: { post: BlogPost; index: number }) {
  const isRetrieval = post.slug === retrievalArticle.slug;
  const isRoi = post.slug === roiArticle.slug;
  return <article className={`${styles.story} ${isRetrieval ? styles.featured : isRoi ? styles.roiStory : styles.indexStory}`} aria-labelledby={`article-${post.slug}`}>
    <div className={styles.storyTop}><span>{String(index + 1).padStart(2, "0")} / {isRetrieval ? "Featured investigation" : "Field notes"}</span><span>{post.category}</span></div>
    <Link href={`/blog/${post.slug}`} className={styles.storyLink} aria-labelledby={`article-${post.slug}`}>
      <div className={styles.storyContent}>
        <div className={styles.articleMeta}><span>{post.date}</span><span aria-hidden="true">/</span><span>{post.readingTime}</span></div>
        <h2 id={`article-${post.slug}`}>{post.title}</h2>
        <p className={styles.summary}>{post.summary}</p>
        {isRetrieval && <p className={styles.insight}><span className={styles.insightLabel}>THE QUESTION</span>When does an extra retrieval signal help—and when does it get in the way?</p>}
        {isRoi && <p className={styles.historyNote}><span>Two distinct experimental stages.</span> The historical ROI evaluation precedes the later calibration investigation. The full AUROC change cannot be attributed to masking alone.</p>}
        <span className={styles.readLink}>Read the investigation <Arrow /></span>
      </div>
      {isRetrieval ? <RetrievalPreview /> : isRoi ? <RoiPreview /> : <span className={styles.indexArrow}><Arrow diagonal /></span>}
    </Link>
  </article>;
}

export function WritingDirectory() {
  return <DirectoryShell activePath="/writing"><Container>
    <header className={`${shared.hero} ${styles.journalHero}`}>
      <div className={shared.heroTop}><p className={shared.eyebrow}>Writing / Notes from the field</p><span className={shared.edition}>THE ENGINEERING JOURNAL<br />{String(blogPosts.length).padStart(2, "0")} PUBLISHED ESSAYS</span></div>
      <div className={shared.heroBody}><h1 className={shared.heroTitle}>Experiments, failures<br />&amp; <em>lessons learned.</em></h1><div className={shared.heroAside}><strong>Questions worth investigating.</strong>Working notes on retrieval, vision, and the distance between a promising metric and a reliable system.</div></div>
      <p className={shared.heroCopy}>What worked, what didn’t, and what the evidence changed.<br className={styles.desktopBreak} /> Technical writing from the process of building.</p>
    </header>
    <CollectionFilter noun="essays" className={styles.journal} items={blogPosts.map((post, index) => ({ id: post.slug, category: post.category, content: <Story post={post} index={index} /> }))} />
    <div className={shared.endnote}><p>Written from experiments. Grounded in evidence.</p><Link href="/projects">Explore the systems behind the stories <Arrow /></Link></div>
  </Container></DirectoryShell>;
}
