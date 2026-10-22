"use client";

import { useId, useState } from "react";
import { syntheticEvidence } from "@/data/copilot";
import styles from "./CopilotInvestigation.module.css";

export function CopilotInvestigation() {
  const [selected, setSelected] = useState(0);
  const id = useId();
  const evidence = syntheticEvidence[selected];

  return <section className={styles.walkthrough} aria-labelledby={`${id}-question`}>
    <header className={styles.header}>
      <p className={styles.eyebrow}>Synthetic investigation / Illustrative walkthrough</p>
      <h3 id={`${id}-question`}>Find the documented response to HX-417 on an MX-200.</h3>
    </header>
    <dl className={styles.decision} aria-label="Retrieval decision for this example">
      <div><dt>Identifier</dt><dd>HX-417</dd></div>
      <div><dt>Equipment</dt><dd>MX-200</dd></div>
      <div><dt>Strategy</dt><dd>Dense + BM25</dd></div>
    </dl>
    <div className={styles.sources}>
      <div className={styles.sourceIndex}>
        <div className={styles.indexHeading}><span>Source evidence</span><span>Illustrative order</span></div>
        <div role="group" aria-label="Inspect synthetic evidence" className={styles.sourceList}>
          {syntheticEvidence.map((source, index) => <button key={source.documentId} type="button" className={styles.sourceButton} aria-pressed={selected === index} aria-controls={`${id}-source`} aria-label={`Inspect source ${index + 1}: ${source.title}`} onClick={() => setSelected(index)}>
            <span className={styles.rank}>0{index + 1}</span><span className={styles.sourceTitle}>{source.title}<span className={styles.sourceId}>{source.documentId}</span></span><span className={styles.sourceArrow} aria-hidden="true">→</span>
          </button>)}
        </div>
      </div>
      <section id={`${id}-source`} className={styles.detail} aria-label="Selected source details" aria-live="polite" aria-atomic="true">
        <p className={styles.eyebrow}>{evidence.type} / Relevant section</p>
        <h4>{evidence.section}</h4>
        <p className={styles.context}>{evidence.context}</p>
        <dl className={styles.metadata}>
          <div><dt>Equipment / identifier metadata</dt><dd>{evidence.metadata}</dd></div>
          <div><dt>Source file</dt><dd>{evidence.source}</dd></div>
        </dl>
        <div className={styles.sourceActions}>
          <a className={styles.sourceLink} href={`https://github.com/Tushar-94/industrial-knowledge-copilot/blob/main/data/generated/markdown/${evidence.source}`} target="_blank" rel="noopener noreferrer">Open synthetic source <span aria-hidden="true">↗</span><span className="sr-only">: {evidence.documentId} (opens in a new tab)</span></a>
          <button className={styles.related} type="button" aria-controls={`${id}-source`} onClick={() => setSelected(selected === 0 ? 1 : 0)}>{selected === 0 ? "Follow related procedure: SOP-MNT-001 →" : "← Return to alarm reference: HX-417"}</button>
        </div>
      </section>
    </div>
    <p className={styles.footnote}>Verified synthetic source documents. Display order is illustrative; no retrieval is executed, no scores are claimed, and no LLM answer is generated.</p>
  </section>;
}
