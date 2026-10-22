"use client";

import { useState } from "react";
import type { RetrievalMetric, RetrievalStrategy } from "@/data/retrievalArticle";
import styles from "./RetrievalArticle.module.css";

const metrics: { id: RetrievalMetric; name: string; explanation: string }[] = [
  { id: "hit1", name: "Hit@1", explanation: "Expected supporting evidence ranked first." },
  { id: "hit3", name: "Hit@3", explanation: "Expected supporting evidence within the first three results." },
  { id: "hit5", name: "Hit@5", explanation: "Expected supporting evidence within the first five results." },
  { id: "mrr", name: "MRR", explanation: "Mean Reciprocal Rank: earlier expected evidence earns more credit." },
];
const format = (value: number, metric: RetrievalMetric) => metric === "mrr" ? value.toFixed(3) : `${Math.round(value * 100)}%`;

export function EvaluationChart({ strategies }: { strategies: RetrievalStrategy[] }) {
  const [selected, setSelected] = useState<RetrievalMetric>("mrr");
  const metric = metrics.find((item) => item.id === selected)!;
  return (
    <figure className={styles.evaluationFigure} aria-labelledby="comparison-caption">
      <figcaption id="comparison-caption" className={styles.figureHeading}><span>Original four-strategy experiment</span><span>25 development queries</span></figcaption>
      <div className={styles.metricControls} role="group" aria-label="Select retrieval comparison metric">
        {metrics.map((item) => <button key={item.id} type="button" aria-pressed={selected === item.id} aria-controls="comparison-bars" onClick={() => setSelected(item.id)}>{item.name}</button>)}
      </div>
      <p className={styles.metricExplanation}>{metric.explanation} <span>Higher is better · {selected === "mrr" ? "0–1 scale" : "0–100% scale"}</span></p>
      <div id="comparison-bars" className={styles.comparisonBars} aria-hidden="true">
        {strategies.map((strategy) => <div className={styles.comparisonRow} key={strategy.name} data-tone={strategy.tone}>
          <div className={styles.barLabel}><span>{strategy.name}<small>{strategy.note}</small></span><strong>{format(strategy[selected], selected)}</strong></div>
          <div className={styles.barTrack}><span style={{ width: `${strategy[selected] * 100}%` }} /></div>
        </div>)}
        <div className={styles.chartScale}>{[0,.25,.5,.75,1].map((tick) => <span key={tick}>{selected === "mrr" ? tick.toFixed(tick === 0 || tick === 1 ? 0 : 2) : `${tick * 100}%`}</span>)}</div>
      </div>
      <p className="sr-only" aria-live="polite" aria-atomic="true">{metric.name}: {strategies.map((strategy) => `${strategy.name} ${format(strategy[selected], selected)}`).join("; ")}.</p>
      <table className={styles.resultsTable}>
        <caption>Exact development results · all four metrics</caption>
        <colgroup><col />{metrics.map((item) => <col key={item.id} />)}</colgroup>
        <thead><tr><th scope="col">Strategy</th>{metrics.map((item) => <th key={item.id} scope="col" data-selected={selected === item.id}>{item.name}</th>)}</tr></thead>
        <tbody>{strategies.map((strategy) => <tr key={strategy.name}><th scope="row">{strategy.name}</th>{metrics.map((item) => <td key={item.id} data-selected={selected === item.id}>{format(strategy[item.id], item.id)}</td>)}</tr>)}</tbody>
      </table>
      <p className={styles.figureNote}>The same development benchmark informed model selection. These are not independent holdout or production measurements. Later V2 results are excluded.</p>
    </figure>
  );
}
