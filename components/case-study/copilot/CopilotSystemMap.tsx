"use client";

import { useId, useRef, useState } from "react";
import { architectureDomains, architectureQueries, type ArchitectureDomain } from "./architectureContent";
import { ArchitectureConnections } from "./ArchitectureConnections";
import styles from "./CopilotArchitecture.module.css";

function Down({ label }: { label?: string }) {
  return <div className={styles.down} aria-hidden="true"><span>↓</span>{label && <small>{label}</small>}</div>;
}

export function CopilotArchitecture() {
  const id = useId();
  const mapRef = useRef<HTMLDivElement>(null);
  const [selected, setSelected] = useState<ArchitectureDomain>("retrieval");
  const [queryType, setQueryType] = useState(0);
  const domain = architectureDomains.find(item => item.id === selected)!;
  const query = architectureQueries[queryType];
  const hybrid = queryType === 1;

  function domainHeading(key: ArchitectureDomain) {
    const item = architectureDomains.find(item => item.id === key)!;
    return <button type="button" className={styles.domainHeading} aria-label={`Inspect ${item.title}`} aria-pressed={selected === key} aria-controls={`${id}-inspector`} onClick={() => setSelected(key)}>
      <span className={styles.domainNumber}>{item.number}</span><span>{item.title}</span><span className={styles.inspectMark} aria-hidden="true">↗</span>
    </button>;
  }

  return <figure className={styles.architecture} aria-labelledby={`${id}-title`} aria-describedby={`${id}-summary`}>
    <header className={styles.masthead}>
      <div><p className={styles.overline}>System design / Local V2</p><h3 id={`${id}-title`}>From knowledge to evidence.</h3></div>
      <p className={styles.status}><span aria-hidden="true" />Retrieval implemented<br /><span className={styles.plannedDot} aria-hidden="true" />Generation planned</p>
    </header>
    <p id={`${id}-summary`} className={styles.introduction}>Prepare the knowledge offline. Route each question deliberately. Return evidence with its sources. Evaluate retrieval separately.</p>

    <div className={styles.queryExplorer}>
      <div className={styles.explorerTop}><span className={styles.overline}>Trace an example route</span><div role="group" aria-label="Example query type" className={styles.queryControls}>{architectureQueries.map((item, index) => <button key={item.id} type="button" aria-pressed={queryType === index} aria-controls={`${id}-map ${id}-query`} onClick={() => setQueryType(index)}>{item.label}</button>)}</div></div>
      <div id={`${id}-query`} className={styles.queryExample} aria-live="polite" aria-atomic="true"><p>“{query.question}”</p><span className={styles.routeBadge}>{query.route} ROUTE</span><p className={styles.queryReason}>{query.reason}</p></div>
    </div>

    <div className={styles.mapContainer}>
      <div ref={mapRef} id={`${id}-map`} className={styles.map} data-hybrid={hybrid}>
        <ArchitectureConnections mapRef={mapRef} id={id} selected={selected} />

        <section className={`${styles.domain} ${styles.knowledge}`} data-selected={selected === "knowledge"} aria-label="Knowledge preparation subsystem">
          {domainHeading("knowledge")}
          <div className={styles.preparation}>
            <div className={styles.prepStage}><span className={styles.componentLabel}>01 / Sources</span><h4>Synthetic documents</h4><p>Canonical YAML → Markdown<br />Manuals · SOPs · guides</p><span className={styles.prepOutput}>Offline preparation</span></div>
            <span className={styles.stageConnector} aria-hidden="true" />
            <div className={styles.prepStage}><span className={styles.componentLabel}>02 / Structure</span><h4>Section-aware chunks</h4><p>Document IDs · heading paths<br />Equipment &amp; revision metadata</p><span className={styles.prepOutput}>Chunk text → BM25<i className={styles.portDot} data-architecture-anchor="chunk-output" aria-hidden="true" /></span></div>
            <span className={styles.stageConnector} aria-hidden="true" />
            <div className={styles.prepStage}><span className={styles.componentLabel}>03 / Representation</span><h4>Title-aware embeddings</h4><p>all-MiniLM-L6-v2<br />Document title + chunk context</p><span className={styles.prepOutput}>Vectors + metadata → Qdrant<i className={styles.portDot} data-architecture-anchor="vector-output" aria-hidden="true" /></span></div>
          </div>
        </section>

        <div className={styles.runtime} data-architecture-anchor="runtime">
        <section className={`${styles.domain} ${styles.query}`} data-architecture-anchor="query-domain" data-selected={selected === "query"} aria-label="Query understanding subsystem">
          {domainHeading("query")}
          <div className={styles.queryStages}>
            <div><span className={styles.componentLabel}>Input</span><h4>User question</h4></div>
            <Down />
            <div><h4>Query analysis</h4><p>Identifiers &amp; parts intent</p></div>
            <Down />
            <div><h4>Shared constraints</h4><p>Candidate eligibility</p></div>
            <Down />
            <div className={styles.decision} data-architecture-anchor="decision"><span aria-hidden="true">◇</span><div><h4>Route selection</h4><p>{hybrid ? "Dense + lexical" : "Dense only"}</p></div></div>
          </div>
          <p className={styles.mobileConnection}>Mode + constraints <span aria-hidden="true">↓</span></p>
        </section>

        <section className={`${styles.domain} ${styles.retrieval}`} data-architecture-anchor="retrieval-domain" data-selected={selected === "retrieval"} aria-label="Evidence retrieval subsystem">
          <div className={styles.indexDock} aria-hidden="true"><span><i className={styles.portDot} data-architecture-anchor="lexical-input" /><small>BM25 index</small></span><span><i className={styles.portDot} data-architecture-anchor="dense-input" /><small>Qdrant index</small></span></div>
          {domainHeading("retrieval")}
          <p className={styles.eligibility} data-architecture-anchor="eligibility">Shared metadata eligibility <span>before top-K</span></p>
          <div className={styles.retrievalBranches}>
            <div className={styles.branch} data-route="bm25" data-active={hybrid}><span className={styles.branchState}>{hybrid ? "ACTIVE · HYBRID" : "BYPASSED"}</span><div className={styles.store}><h4>BM25</h4><p>Lexical retrieval</p></div><p className={styles.branchDetail}>Terminology-sensitive<br />Eligible chunks only</p></div>
            <div className={styles.branch} data-route="dense" data-active="true"><span className={styles.branchState}>ALWAYS USED</span><div className={styles.store}><h4>Qdrant</h4><p>Dense vector search</p></div><p className={styles.branchDetail}>Query embedding<br />Semantic similarity</p></div>
          </div>
          <div className={styles.merge} aria-hidden="true"><span data-bypassed={!hybrid} /><span /></div>
          <div className={styles.ranking} data-architecture-anchor="ranking" data-route="ranking" data-active={hybrid}><span className={styles.componentLabel}>{hybrid ? "Hybrid route" : "Dense route"}</span><h4>{hybrid ? "RRF → identifier boost" : "Preserve semantic order"}</h4><p>{hybrid ? "Fuse candidate lists, then boost exact IDs" : "Fusion & identifier boosting bypassed"}</p></div>
          <p className={styles.mobileConnection}>Ranked source evidence <span aria-hidden="true">↓</span></p>
        </section>

        <section className={`${styles.domain} ${styles.response}`} data-architecture-anchor="response-domain" data-selected={selected === "response"} aria-label="Evidence and planned response subsystem">
          {domainHeading("response")}
          <div className={styles.evidence} data-architecture-anchor="evidence"><span className={styles.componentLabel}>Implemented output</span><h4>Ranked evidence</h4><p>Chunk text · document ID<br />Section &amp; source metadata</p><div className={styles.evidenceLines} aria-hidden="true"><span /><span /><span /></div></div>
          <Down label="target integration" />
          <div className={styles.target}><span className={styles.componentLabel}>Planned</span><h4>Grounded LLM answer</h4><p>Evidence-supported response<br />Generated source citations</p></div>
        </section>
        </div>

        <section className={`${styles.domain} ${styles.evaluation}`} data-selected={selected === "evaluation"} aria-label="Offline evaluation subsystem">
          <i className={`${styles.portDot} ${styles.evaluationPort}`} data-architecture-anchor="evaluation-input" aria-hidden="true" />
          {domainHeading("evaluation")}
          <p className={styles.evaluationNote}>Offline assessment · outside the query-serving path</p>
          <div className={styles.evaluationComponents}>
            <div className={styles.evaluationStep}><span className={styles.componentLabel}>01 / Define</span><h4>Benchmark cases</h4><p>Queries + expected evidence</p></div><span className={styles.evaluationConnector} aria-hidden="true" />
            <div className={styles.evaluationStep}><span className={styles.componentLabel}>02 / Measure</span><h4>Retrieval quality</h4><p>Ranked results → Hit@K · MRR</p></div><span className={styles.evaluationConnector} aria-hidden="true" />
            <div className={styles.evaluationStep}><span className={styles.componentLabel}>03 / Verify behavior</span><h4>Regression checks</h4><p>Routing · constraints · metrics</p></div>
          </div>
          <p className={styles.evaluationFoot}>Benchmark assessment and regression tests are complementary offline checks.</p>
        </section>
      </div>
    </div>

    <div className={styles.legend} aria-label="Architecture connection legend"><span><i aria-hidden="true" />Data / evidence flow</span><span><i className={styles.dottedLine} aria-hidden="true" />Routing control</span><span><i className={styles.dashedLine} aria-hidden="true" />Offline evaluation</span><span><i className={styles.targetBoundary} aria-hidden="true" />Planned boundary</span></div>

    <aside id={`${id}-inspector`} className={styles.inspector} aria-label="Selected subsystem details" aria-live="polite" aria-atomic="true">
      <div className={styles.inspectorIntro}><span className={styles.overline}>Inspect / {domain.number}</span><h4>{domain.title}</h4><p className={styles.inspectorPhase}>{domain.phase}</p><p>{domain.description}</p></div>
      <div className={styles.inspectorDetails}><div><h5>Engineering decision</h5><p>{domain.decision}</p></div><div><h5>Trade-off</h5><p>{domain.tradeoff}</p></div><p className={styles.implementation}>{domain.implementation}</p><p className={styles.references}>SOURCE / {domain.references}</p></div>
    </aside>

    <details className={styles.textDescription}><summary>Text architecture &amp; development-stage notes <span aria-hidden="true">＋</span></summary><div>
      <p><strong>Knowledge preparation.</strong> Synthetic Markdown documents become section-aware chunks with metadata. Title-aware embeddings and metadata payloads populate Qdrant; chunk text supplies the BM25 index.</p>
      <p><strong>Query and evidence flow.</strong> Query analysis builds shared eligibility constraints and chooses dense or hybrid retrieval. Dense queries use Qdrant and retain semantic ranking. Hybrid queries use Qdrant and eligible BM25 candidates, followed by reciprocal rank fusion and exact identifier boosting. Ranked evidence retains source metadata.</p>
      <p><strong>Implemented versus planned.</strong> Evidence retrieval and source traceability are implemented. Evidence-grounded LLM responses and generated citations are planned. The route examples illustrate verified rules; they do not execute retrieval.</p>
      <p><strong>Separate development stages.</strong> This map describes local V2. Earlier in-memory, cosine-similarity experiments preceded Qdrant. Their results are not measurements of this later architecture. Development metrics and the reused 12-query diagnostic suite remain distinct; regression tests are offline checks, not production monitoring.</p>
    </div></details>
    <figcaption className={styles.caption}><span>FIG. 01 / Industrial Knowledge Copilot</span><span>Local V2 retrieval architecture · select a subsystem to inspect</span></figcaption>
  </figure>;
}
