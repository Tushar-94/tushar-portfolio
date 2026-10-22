import Link from "next/link";
import { forecastChannels, forecastTotal } from "@/data/forecasting";
import { AnomalyPreview } from "./AnomalyPreview";
import styles from "./Home.module.css";

function RetrievalPreview() {
  return (
    <figure className={`${styles.preview} ${styles.retrievalPreview} ${styles.linkedPreview}`}>
      <Link className={styles.previewLink} href="/projects/industrial-knowledge-copilot" aria-label="Explore Industrial Knowledge Copilot case study"><span aria-hidden="true">↗</span></Link>
      <div className={styles.previewTop}><span>RETRIEVAL / EVIDENCE</span><span>01</span></div>
      <div className={styles.retrievalDiagram}>
        <div className={styles.queryNode}><span className={styles.nodeIcon} aria-hidden="true">⌕</span><span>Technical question</span><span className={styles.queryCursor} aria-hidden="true" /></div>
        <div className={styles.splitConnector} aria-hidden="true"><span /><span /></div>
        <div className={styles.retrievalRoutes}>
          <div><span className={styles.routeMark} aria-hidden="true">◈</span><strong>Dense retrieval</strong><span>Semantic context</span></div>
          <div><span className={styles.routeMark} aria-hidden="true">≡</span><strong>BM25 + identifiers</strong><span>Lexical precision</span></div>
        </div>
        <div className={styles.mergeConnector} aria-hidden="true"><span /><span /></div>
        <p className={styles.routingLabel}>Query-aware routing <span aria-hidden="true">↓</span></p>
        <div className={styles.evidenceDocuments} aria-label="Ranked, traceable evidence">
          {["01", "02", "03"].map((rank) => <div className={styles.evidenceDocument} key={rank}><span>{rank}</span><svg aria-hidden="true" viewBox="0 0 44 40" fill="none"><path d="M7 10h30M7 18h24M7 26h30M7 34h18" stroke="currentColor" strokeWidth="2" /></svg><span>Source evidence</span></div>)}
        </div>
      </div>
      <figcaption className={styles.previewCaption}><span>From a question to traceable sources.</span><span>Retrieval schematic</span></figcaption>
    </figure>
  );
}

function ForecastPreview() {
  const maximum = Math.max(...forecastChannels.map((channel) => channel.roomNights));
  return (
    <figure className={`${styles.preview} ${styles.forecastPreview} ${styles.linkedPreview}`}>
      <Link className={styles.previewLink} href="/projects/forecasting-decision-intelligence" aria-label="Explore Forecasting & Decision Intelligence case study"><span aria-hidden="true">↗</span></Link>
      <div className={styles.previewTop}><span>DEMAND / CHANNEL COMPOSITION</span><span>03</span></div>
      <div className={styles.forecastSummary}><div><span className={styles.previewMetric}>{forecastTotal.toLocaleString("en-US")}</span><span>forecast room nights</span></div><span>365-day<br />base forecast</span></div>
      <dl className={styles.channelBars}>{forecastChannels.map((channel, index) => <div className={styles.channelLabel} key={channel.name}>
        <dt>{channel.name}</dt><dd>{channel.roomNights.toLocaleString("en-US")}</dd>
        <dd className={styles.channelTrack} aria-hidden="true"><span style={{ width: `${channel.roomNights / maximum * 100}%`, backgroundColor: ["#222", "#686868", "#aaa", "#888"][index] }} /></dd>
      </div>)}</dl>
      <p className={styles.forecastPeriod}>June 1, 2024 – May 31, 2025</p>
      <figcaption className={styles.previewCaption}><span>Annual totals by booking channel.</span><span>Forecast estimates</span></figcaption>
    </figure>
  );
}

export function ProjectPreview({ slug }: { slug: string }) {
  if (slug === "industrial-knowledge-copilot") return <RetrievalPreview />;
  if (slug === "industrial-vision-anomaly-detection") return <AnomalyPreview />;
  return <ForecastPreview />;
}
