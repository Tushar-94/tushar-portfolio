"use client";

import { useRef, useState, type KeyboardEvent } from "react";
import styles from "./Home.module.css";

const stages = [
  { title: "Understand", description: "Define the problem, constraints, and success criteria.", focus: "Start with the right question.", detail: "Make the problem explicit before choosing a model. Clarify what a useful outcome looks like and how to evaluate it." },
  { title: "Engineer", description: "Build modular, reliable, and maintainable solutions.", focus: "Build the system around the model.", detail: "Keep data processing, model behaviour, and interfaces clear. Design components that can be tested, understood, and improved." },
  { title: "Evaluate", description: "Measure performance, investigate failures, and quantify uncertainty.", focus: "Let evidence guide the next iteration.", detail: "Look beyond a headline metric. Examine failure modes, validation boundaries, and the uncertainty that remains." },
  { title: "Deliver", description: "Design for integration, reproducibility, and practical use.", focus: "Make the work useful beyond an experiment.", detail: "Consider reproducibility, interfaces, and the environment a system will operate in. Design a clear path from experiment to practical use." },
];

export function EngineeringSequence() {
  const [active, setActive] = useState(0);
  const group = useRef<HTMLDivElement>(null);
  function navigate(event: KeyboardEvent<HTMLButtonElement>, index: number) {
    const next = event.key === "Home" ? 0 : event.key === "End" ? stages.length - 1 :
      event.key === "ArrowRight" || event.key === "ArrowDown" ? (index + 1) % stages.length :
      event.key === "ArrowLeft" || event.key === "ArrowUp" ? (index - 1 + stages.length) % stages.length : undefined;
    if (next === undefined) return;
    event.preventDefault();
    group.current?.querySelectorAll("button")[next]?.focus();
  }
  return (
    <div>
      <div ref={group} className={styles.stages} role="group" aria-label="Explore engineering stages">
        {stages.map((stage, index) => <button key={stage.title} type="button" className={styles.stage} aria-pressed={active === index} aria-controls="engineering-detail" onClick={() => setActive(index)} onFocus={() => setActive(index)} onKeyDown={(event) => navigate(event, index)} onPointerEnter={(event) => { if (event.pointerType === "mouse" && !group.current?.contains(document.activeElement)) setActive(index); }}>
          <span className={styles.stageNumber}>0{index + 1}<span aria-hidden="true">{index < 3 ? "→" : "↗"}</span></span>
          <span className={styles.stageTitle}>{stage.title}</span><span className={styles.stageDescription}>{stage.description}</span>
        </button>)}
      </div>
      <div id="engineering-detail" className={styles.stageDetail} aria-live="polite" aria-atomic="true">
        {stages.map((stage, index) => <div className={styles.stageDetailContent} key={stage.title} data-active={active === index} aria-hidden={active !== index}>
          <p>{stage.focus}</p><p>{stage.detail}</p>
        </div>)}
      </div>
    </div>
  );
}
