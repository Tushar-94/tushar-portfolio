"use client";

import { useId, useRef, useState } from "react";
import { Connections } from "./Connections";
import { domains, perspectives, toolFamilies, type DomainId, type LogIQPerspective } from "./content";
import styles from "./LogIQArchitecture.module.css";

export function LogIQArchitectureDiagram({ note, perspective, onRoleChange }: {
  note?: string;
  perspective: LogIQPerspective;
  onRoleChange: (perspective: LogIQPerspective) => void;
}) {
  const id = useId();
  const mapRef = useRef<HTMLDivElement>(null);
  const notesRef = useRef<HTMLDetailsElement>(null);
  const [selected, setSelected] = useState<DomainId>("agent");
  const domain = domains.find(d => d.id === selected)!;

  function heading(key: DomainId) {
    const item = domains.find(d => d.id === key)!;
    return <button type="button" className={styles.domainHeading} aria-label={`Inspect ${item.title}`} aria-pressed={selected === key} aria-controls={`${id}-details`} onClick={() => { setSelected(key); if (notesRef.current) notesRef.current.open = true; }}><span className={styles.domainLetter}>{item.letter}</span><span>{item.title}</span><span className={styles.inspectArrow} aria-hidden="true">↗</span></button>;
  }

  return <figure className={styles.architecture} aria-labelledby={`${id}-title`} aria-describedby={`${id}-summary`}>
    <header className={styles.masthead}><div><p className={styles.overline}>LogIQ / System architecture</p><h3 id={`${id}-title`}>One agent. A loop of evidence.</h3></div><p className={styles.headerNote}>Historical logs<br />Three reporting perspectives</p></header>
    <p id={`${id}-summary`} className={styles.introduction}>An investigation moves between a shared AI agent and its SQL tools. Evidence returns to the agent before findings are adapted to the selected audience.</p>

    <div ref={mapRef} className={styles.map} data-logiq-map>
      <Connections mapRef={mapRef} id={id} selected={selected} />
      <section className={`${styles.domain} ${styles.request}`} data-selected={selected === "request"} aria-label="Investigation request subsystem">
        {heading("request")}
        <div className={styles.requestFields}><div><span className={styles.label}>Question</span><h4>Natural-language investigation</h4></div><div><span className={styles.label}>Scope</span><p>Dataset · time window · filters</p></div><div><span className={styles.label}>Selected perspective</span><p>{perspective.title}</p></div></div>
        <i className={`${styles.port} ${styles.requestPort}`} data-logiq-anchor="request-out" aria-hidden="true" />
      </section>

      <div className={styles.main}>
        <div className={styles.reasoningColumn}>
          <section className={`${styles.domain} ${styles.agent}`} data-logiq-anchor="agent" data-selected={selected === "agent"} aria-label="Agent orchestration subsystem">
            <i className={`${styles.port} ${styles.topPort}`} data-logiq-anchor="agent-in" aria-hidden="true" />
            {heading("agent")}
            <div className={styles.agentBody}>
              <div className={styles.agentIdentity}><span data-agent-instance>ONE SHARED AI AGENT</span><span>{perspective.title} context</span></div>
              <div>
                <div className={styles.agentStep}><span className={styles.stepNumber}>01</span><div><h4>Interpret the request</h4><p>Question, scope, role instructions, and conversation context.</p></div></div>
                <span className={styles.innerDown} aria-hidden="true">↓</span>
                <div className={styles.agentStep} data-logiq-anchor="agent-call"><span className={styles.stepNumber}>02</span><div><h4>Choose the next tool</h4><p>Select a named function and relevant arguments.</p></div></div>
                <span className={styles.innerDown} aria-hidden="true">↓</span>
                <div className={styles.agentStep} data-logiq-anchor="agent-observe"><span className={styles.stepNumber}>03</span><div><h4>Interpret returned evidence</h4><p>Read structured results and their limits; decide whether more evidence is needed.</p></div></div>
              </div>
              <div className={styles.loopDecision}><span aria-hidden="true">↺</span><p>Continue with another tool, or synthesize the answer.</p></div>
              <p className={styles.agentFoot}>Planning, tool choice, and interpretation belong to this same agent loop.</p>
            </div>
            <i className={`${styles.port} ${styles.bottomPort}`} data-logiq-anchor="synthesis-out" aria-hidden="true" />
          </section>

          <section className={`${styles.domain} ${styles.evidence}`} data-selected={selected === "evidence"} aria-label="Evidence synthesis subsystem">
            <i className={`${styles.port} ${styles.topPort}`} data-logiq-anchor="evidence-in" aria-hidden="true" />
            {heading("evidence")}
            <div className={styles.evidenceBody}><span className={styles.label}>Inside the same reasoning process</span><h4>Patterns, context &amp; findings</h4><p>Interpret observed errors and temporal context. Keep findings traceable to the returned evidence.</p>
              <dl className={styles.envelope}><div><dt>scope · filters</dt><dd>What was queried</dd></div><div><dt>queries · params</dt><dd>Executed SQL and bound values</dd></div><div><dt>data</dt><dd>Bounded records and aggregates</dd></div><div><dt>notes · truncated</dt><dd>Caveats and result limits</dd></div></dl>
            </div>
            <i className={`${styles.port} ${styles.bottomPort}`} data-logiq-anchor="findings-out" aria-hidden="true" />
          </section>
        </div>

        <div className={styles.executionColumn}>
          <section className={`${styles.domain} ${styles.tools}`} data-logiq-anchor="tools" data-selected={selected === "tools"} aria-label="SQL tool execution subsystem">
            {heading("tools")}
            <div className={styles.toolInterface} data-logiq-anchor="tool-call"><h4>Named tool + arguments</h4><p>19 predefined tools · selected as needed</p></div>
            <div className={styles.toolFamilies}>{toolFamilies.map(family => <details key={family.title} className={styles.family}><summary><span>{family.title}</span><span>{family.tools.length}<b aria-hidden="true">＋</b></span></summary><div><p>{family.description}</p><ul aria-label={`${family.title} tool names`}>{family.tools.map(tool => <li key={tool}><code>{tool}</code></li>)}</ul></div></details>)}</div>
            <div className={styles.execution} data-logiq-anchor="tool-result"><div><span className={styles.label}>Database execution</span><h4>Parameterized SQL</h4></div><p>Return structured evidence<br />to the same agent</p></div>
            <div className={styles.databasePorts} aria-hidden="true"><i className={styles.port} data-logiq-anchor="sql-out" /><i className={styles.port} data-logiq-anchor="rows-in" /></div>
          </section>

          <section className={`${styles.domain} ${styles.data}`} data-selected={selected === "data"} aria-label="Historical log data subsystem">
            <div className={styles.databasePortsTop} aria-hidden="true"><i className={styles.port} data-logiq-anchor="sql-in" /><i className={styles.port} data-logiq-anchor="rows-out" /></div>
            {heading("data")}
            <div className={styles.dataBody}><div className={styles.store}><h4>SereneDB</h4><p>SQL search &amp; aggregation</p><span>4,955,783 historical log records</span></div><p className={styles.recordFields}>Timestamp · source · component<br />Level · template · log content</p></div>
            <div className={styles.offline}><span className={styles.label}>Offline preparation</span><p><strong>BGL + OpenStack</strong> → parsed CSVs → loaded tables</p><p>Recorded datasets, prepared before investigation.</p></div>
          </section>
        </div>
      </div>

      <section className={`${styles.domain} ${styles.reporting}`} data-selected={selected === "reporting"} aria-label="Role-aware reporting subsystem">
        <i className={`${styles.port} ${styles.reportPort}`} data-logiq-anchor="report-in" aria-hidden="true" />
        {heading("reporting")}
        <p className={styles.reportingIntro}>One agent’s findings, presented for the selected audience.</p>
        <div className={styles.perspectives} role="group" aria-label="Preview reporting perspective">{perspectives.map((item,index) => <button key={item.id} type="button" aria-pressed={perspective.id === item.id} aria-controls={`${id}-perspective`} onClick={() => onRoleChange(item)}><span className={styles.label}>Perspective / 0{index+1}</span><strong>{item.title}</strong><span>{item.focus}</span></button>)}</div>
        <p id={`${id}-perspective`} className={styles.perspectiveDetail} aria-live="polite" aria-atomic="true"><strong>{perspective.title} emphasis:</strong> {perspective.detail}</p>
      </section>
    </div>

    <div className={styles.legend} aria-label="Connection legend"><span><i aria-hidden="true" />Returned data / evidence</span><span><i className={styles.controlLegend} aria-hidden="true" />Request / invocation</span><span>Arrowheads show direction</span></div>
    <aside id={`${id}-details`} className={styles.inspector} aria-label="Selected architecture domain" aria-live="polite" aria-atomic="true"><div><p className={styles.overline}>Inspect / {domain.letter}</p><h4>{domain.title}</h4><p className={styles.inspectHint}>Select a subsystem to explore its engineering decisions.</p></div><details ref={notesRef} className={styles.inspectorNotes} open><summary>Engineering decisions &amp; boundaries <span aria-hidden="true" /></summary><div className={styles.inspectorBody}><p>{domain.decision}</p><p><strong>Design boundary.</strong> {domain.tradeoff}</p><p className={styles.source}>SOURCE / {domain.source}</p></div></details></aside>
    <details className={styles.textSummary}><summary>Text architecture &amp; implementation boundaries <span aria-hidden="true">＋</span></summary><div><p>A natural-language question and selected role enter one agent session. The agent interprets the context and dynamically selects from 19 predefined SQL-backed tools. Selected functions execute parameterized queries in SereneDB; bounded results and their evidence envelopes return to the same agent. It can select another tool or synthesize a response.</p><p>Evidence supports error-pattern and temporal interpretation. Role instructions shape Engineer, Team Lead, or Manager reporting through the same agent, rather than independent agents. Tools remain a shared registry; selecting a perspective here only previews reporting emphasis.</p><p>BGL and OpenStack are historical datasets. Offline preparation parses archives into structured CSVs and loads SereneDB before investigations. The corpus total describes log records, not live telemetry or independent incidents. Subsystem boundaries and tool families express responsibilities, not separate deployed services.</p></div></details>
    <figcaption className={styles.caption}><span>FIG. 01 / LogIQ agent architecture</span><span>Interactive explanation · no tool or model calls are executed</span>{note && <p>{note}</p>}</figcaption>
  </figure>;
}
