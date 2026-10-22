"use client";

import Link from "next/link";
import { useRef, useState, type KeyboardEvent } from "react";
import type { ExpertiseCategory } from "./content";
import styles from "./About.module.css";

export function ExpertiseExplorer({ categories }: { categories: ExpertiseCategory[] }) {
  const [active, setActive] = useState(0);
  const controls = useRef<HTMLDivElement>(null);
  function navigate(event: KeyboardEvent<HTMLButtonElement>, index: number) {
    const next = event.key === "Home" ? 0 : event.key === "End" ? categories.length - 1 :
      ["ArrowRight", "ArrowDown"].includes(event.key) ? (index + 1) % categories.length :
      ["ArrowLeft", "ArrowUp"].includes(event.key) ? (index - 1 + categories.length) % categories.length : undefined;
    if (next === undefined) return;
    event.preventDefault();
    controls.current?.querySelectorAll("button")[next]?.focus();
  }
  return (
    <div className={styles.expertiseExplorer}>
      <div ref={controls} className={styles.expertiseTabs} role="tablist" aria-label="Technical expertise categories">
        {categories.map((category, index) => <button key={category.id} type="button" role="tab" id={`tab-${category.id}`} aria-selected={active === index} aria-controls={`panel-${category.id}`} tabIndex={active === index ? 0 : -1} onClick={() => setActive(index)} onFocus={() => setActive(index)} onKeyDown={(event) => navigate(event, index)}><span>0{index + 1}</span>{category.title}<span aria-hidden="true">↗</span></button>)}
      </div>
      <div className={styles.expertisePanels}>
        {categories.map((category, index) => <div className={styles.expertisePanel} key={category.id} role="tabpanel" id={`panel-${category.id}`} aria-labelledby={`tab-${category.id}`} aria-hidden={active !== index} tabIndex={active === index ? 0 : -1} data-active={active === index}>
          <div className={styles.expertiseFocus}><p className={styles.eyebrow}>Engineering focus</p><h3>{category.headline}</h3><p>{category.focus}</p></div>
          <div className={styles.expertiseContent}><div><h4 className={styles.eyebrow}>Core technologies & methods</h4><ul className={styles.toolList}>{category.tools.map((tool) => <li key={tool}>{tool}</li>)}</ul></div><div><h4 className={styles.eyebrow}>Related work</h4><ul className={styles.relatedProjects}>{category.projects.map((project) => <li key={project.slug}><Link href={`/projects/${project.slug}`}><span>{project.title}<small>{project.context}</small></span><span aria-hidden="true">↗</span></Link></li>)}</ul></div></div>
        </div>)}
      </div>
    </div>
  );
}
