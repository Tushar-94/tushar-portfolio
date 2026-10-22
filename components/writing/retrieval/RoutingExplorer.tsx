"use client";

import { useState } from "react";
import type { RoutingQuery } from "@/data/retrievalArticle";
import styles from "./RetrievalArticle.module.css";

function Connector({ returning = false, split = false, merge = false, lexicalActive = true }: { returning?: boolean; split?: boolean; merge?: boolean; lexicalActive?: boolean }) {
  if (returning) return <div aria-hidden="true" className={styles.returnConnector}><svg viewBox="0 0 100 24" preserveAspectRatio="none" fill="none"><path d="M100 0v6q0 6-6 6H6q-6 0-6 6v5" stroke="currentColor" vectorEffect="non-scaling-stroke" /></svg><span>↓</span></div>;
  return <svg aria-hidden="true" className={styles.connector} viewBox="0 0 28 100" preserveAspectRatio="none" fill="none">
    <path d={split ? "M0 50h8V35h19m-5-4 5 4-5 4" : merge ? "M0 35h12v15h15m-5-4 5 4-5 4" : "M0 50h27m-5-4 5 4-5 4"} stroke="currentColor" vectorEffect="non-scaling-stroke" />
    {lexicalActive && (split || merge) && <path d={split ? "M8 50v30h19m-5-4 5 4-5 4" : "M0 80h12V50"} stroke="currentColor" vectorEffect="non-scaling-stroke" />}
  </svg>;
}

export function RoutingExplorer({ queries }: { queries: RoutingQuery[] }) {
  const [mode, setMode] = useState<"naive" | "aware">("aware");
  const [selected, setSelected] = useState(0);
  const query = queries[selected];
  const hybrid = mode === "naive" || query.kind === "identifier";
  return (
    <figure className={styles.routingFigure} aria-labelledby="routing-caption">
      <figcaption className={styles.figureHeading} id="routing-caption"><span>One question. Two retrieval policies.</span><span>Architecture illustration</span></figcaption>
      <div className={styles.policyControls} role="group" aria-label="Select retrieval policy"><button type="button" aria-pressed={mode === "naive"} onClick={() => setMode("naive")}>Naive fusion</button><button type="button" aria-pressed={mode === "aware"} onClick={() => setMode("aware")}>Query-aware</button></div>
      <div className={styles.queryControls} role="group" aria-label="Select example query type">{queries.map((item, index) => <button type="button" key={item.label} aria-pressed={selected === index} onClick={() => setSelected(index)}>{item.label}</button>)}</div>
      <div className={styles.exampleQuestion} aria-live="polite" aria-atomic="true">{queries.map((item, index) => <div key={item.label} data-active={index === selected} aria-hidden={index !== selected}><span className={styles.eyebrow}>{item.analysis}</span><p>“{item.question}”</p></div>)}</div>
      <div className={styles.routeDiagram} aria-label={hybrid ? "Both dense and BM25 retrieval participate" : "Dense retrieval only; BM25 is inactive"}>
        <div className={styles.routeNode}><span className={styles.nodeNumber}>01</span><strong>{mode === "naive" ? "No query routing" : "Query analyzer"}</strong><span>{mode === "naive" ? "One route for all" : query.kind === "semantic" ? "Semantic question" : "Exact reference"}</span></div>
        <Connector split lexicalActive={hybrid} />
        <div className={styles.retrievalBranches}><span className={styles.nodeNumber}>02</span><div className={styles.branch} data-active="true"><strong>Dense</strong><span>Semantic relevance</span></div><div className={styles.branch} data-active={hybrid}><strong>BM25</strong><span>{hybrid ? "Lexical evidence" : "Not used"}</span></div></div>
        <div className={styles.middleConnector}><span className={styles.desktopConnector}><Connector merge lexicalActive={hybrid} /></span><Connector returning /></div>
        <div className={styles.routeNode}><span className={styles.nodeNumber}>03</span><strong>{mode === "naive" ? "RRF" : hybrid ? "Hybrid ranking" : "Dense ranking"}</strong><span>{mode === "naive" ? "Combine both lists" : hybrid ? "RRF + ID boost" : "Semantic order"}</span></div>
        <Connector />
        <div className={styles.routeNode}><span className={styles.nodeNumber}>04</span><strong>Ranked evidence</strong><span>Supporting sources</span></div>
      </div>
      <div className={styles.routeExplanation} aria-live="polite" aria-atomic="true">
        <p data-active={mode === "naive"} aria-hidden={mode !== "naive"}>Every query activates both retrieval branches. RRF combines their rankings, even when lexical overlap adds little useful information. There is no query-specific identifier handling in this naive policy.</p>
        {queries.map((item, index) => <p key={item.label} data-active={mode === "aware" && selected === index} aria-hidden={mode !== "aware" || selected !== index}>{item.explanation}</p>)}
      </div>
      <p className={styles.figureNote}>Conceptual routes from the initial experiment—not live search results. Qdrant and later V2 changes are outside this comparison.</p>
    </figure>
  );
}
