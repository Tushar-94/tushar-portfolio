"use client";

import { useState } from "react";
import styles from "./About.module.css";

const disciplines = [
  { label: "Software Engineering", lines: ["Software", "Engineering"], caption: "Reliable foundations. Clear interfaces. Maintainable systems." },
  { label: "Data Science", lines: ["Data", "Science"], caption: "Careful analysis. Useful baselines. Evidence-led decisions." },
  { label: "Machine Learning", lines: ["Machine", "Learning"], caption: "Visual representations. Predictive models. Meaningful evaluation." },
  { label: "Applied AI", lines: ["Applied", "AI"], caption: "Connecting models, tools, and data to practical problems." },
];

function DisciplineIcon({ index }: { index: number }) {
  return <svg viewBox="0 0 32 32" width="30" height="30" fill="none" aria-hidden="true">
    {index === 0 ? <path d="m11 8-7 8 7 8m10-16 7 8-7 8M18 6l-4 20" stroke="currentColor" strokeWidth="1.2" /> :
      index === 1 ? <g stroke="currentColor" strokeWidth="1.2"><path d="M5 26h23M9 21V12m7 9V6m7 15v-7" /><circle cx="9" cy="12" r="2" fill="currentColor" /><circle cx="16" cy="6" r="2" fill="currentColor" /><circle cx="23" cy="14" r="2" fill="currentColor" /></g> :
      index === 2 ? <g stroke="currentColor"><path d="m7 8 9 8 9-8M7 24l9-8 9 8M7 8v16m18-16v16" /><circle cx="7" cy="8" r="2" fill="currentColor" /><circle cx="25" cy="8" r="2" fill="currentColor" /><circle cx="7" cy="24" r="2" fill="currentColor" /><circle cx="25" cy="24" r="2" fill="currentColor" /><circle cx="16" cy="16" r="3" fill="currentColor" /></g> :
      <g stroke="currentColor" strokeWidth="1.2"><rect x="5" y="5" width="22" height="22" rx="4" /><path d="m10 16 4 4 8-9" /></g>}
  </svg>;
}

export function DisciplineMap() {
  const [active, setActive] = useState(0);
  return (
    <figure className={`${styles.disciplineMap} ${styles.entrance}`}>
      <div className={styles.diagramHeading}><span className={styles.eyebrow}>Connected disciplines</span><span aria-hidden="true">01—04</span></div>
      <div className={styles.disciplineNodes} role="group" aria-label="Explore interconnected engineering disciplines">
        <svg className={styles.disciplineConnectors} aria-hidden="true" viewBox="0 0 400 32" preserveAspectRatio="none" fill="none"><path d="M50 16h100m-6-4 6 4-6 4m6-4h100m-6-4 6 4-6 4m6-4h100m-6-4 6 4-6 4" stroke="currentColor" /></svg>
        {disciplines.map((discipline, index) => <button type="button" key={discipline.label} aria-label={discipline.label} aria-pressed={active === index} aria-controls="discipline-caption" onClick={() => setActive(index)} onFocus={() => setActive(index)}>
          <span className={styles.disciplineIcon}><DisciplineIcon index={index} /></span><span className={styles.disciplineLabel}>{discipline.lines[0]}<br />{discipline.lines[1]}</span>
        </button>)}
      </div>
      <figcaption id="discipline-caption" className={styles.diagramCaption} aria-live="polite" aria-atomic="true">
        {disciplines.map((discipline, index) => <span key={discipline.label} data-active={active === index} aria-hidden={active !== index}>{discipline.caption}</span>)}
      </figcaption>
    </figure>
  );
}
