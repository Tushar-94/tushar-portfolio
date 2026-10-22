"use client";

import { useRef, useState, type KeyboardEvent } from "react";
import type { JourneyStage } from "./content";
import styles from "./About.module.css";

export function Journey({ stages }: { stages: JourneyStage[] }) {
  const [active, setActive] = useState(0);
  const controls = useRef<HTMLDivElement>(null);
  function navigate(event: KeyboardEvent<HTMLButtonElement>, index: number) {
    const next = event.key === "Home" ? 0 : event.key === "End" ? stages.length - 1 :
      ["ArrowRight", "ArrowDown"].includes(event.key) ? (index + 1) % stages.length :
      ["ArrowLeft", "ArrowUp"].includes(event.key) ? (index - 1 + stages.length) % stages.length : undefined;
    if (next === undefined) return;
    event.preventDefault();
    controls.current?.querySelectorAll("button")[next]?.focus();
  }
  return (
    <div>
      <div ref={controls} className={styles.journeyStages} role="group" aria-label="Select a career discipline">
        {stages.map((stage, index) => <button key={stage.title} type="button" aria-pressed={index === active} aria-controls="journey-detail" onClick={() => setActive(index)} onFocus={() => setActive(index)} onKeyDown={(event) => navigate(event, index)}>
          <span className={styles.stageNumber}>0{index + 1}<span aria-hidden="true">{index === stages.length - 1 ? "↗" : "→"}</span></span><span className={styles.stageTitle}>{stage.title}</span>
        </button>)}
      </div>
      <div id="journey-detail" className={styles.journeyDetail} aria-live="polite" aria-atomic="true">
        {stages.map((stage, index) => <div key={stage.title} className={styles.journeyPanel} data-active={active === index} aria-hidden={active !== index}>
          <div className={styles.journeyFocus}><p className={styles.eyebrow}>Engineering focus</p><h3>{stage.title}</h3><p>{stage.description}</p><ul className={styles.capabilities} aria-label="Core capabilities">{stage.capabilities.map((capability) => <li key={capability}>{capability}</li>)}</ul></div>
          <div className={styles.journeyContext}><div><p className={styles.eyebrow}>Representative tools from my portfolio</p><p className={styles.toolLine}>{stage.technologies.join(" / ")}</p></div><div className={styles.professionalContext}><p className={styles.eyebrow}>Relevant professional experience</p><div><h4>{stage.experience.company}</h4><span>{stage.experience.period}</span></div><p className={styles.contextRole}>{stage.experience.role}</p><p>{stage.experience.summary}</p></div></div>
        </div>)}
      </div>
    </div>
  );
}
