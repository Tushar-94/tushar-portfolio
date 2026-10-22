"use client";

import { useEffect, useState } from "react";
import styles from "./RetrievalArticle.module.css";

type GuideSection = { id: string; label: string };

export function ReadingGuide({ sections }: { sections: GuideSection[] }) {
  const [active, setActive] = useState(sections[0].id);
  useEffect(() => {
    if (!("IntersectionObserver" in window)) return;
    const nodes = sections.map((section) => document.getElementById(section.id)).filter((node): node is HTMLElement => node !== null);
    const end = document.getElementById("article-end");
    let observer: IntersectionObserver;
    function update() {
      const current = nodes.filter((node) => node.getBoundingClientRect().top <= 133).at(-1);
      setActive(end && end.getBoundingClientRect().top < innerHeight ? sections[sections.length - 1].id : current?.id ?? sections[0].id);
    }
    function observe() {
      observer?.disconnect();
      observer = new IntersectionObserver(update, { rootMargin: `-132px 0px -${Math.max(0,innerHeight - 134)}px 0px`, threshold: 0 });
      nodes.forEach((node) => observer.observe(node));
    }
    observe();
    const endObserver = new IntersectionObserver(update, { threshold: [0,.1] });
    if (end) endObserver.observe(end);
    window.addEventListener("resize", observe);
    return () => { observer.disconnect(); endObserver.disconnect(); window.removeEventListener("resize", observe); };
  }, [sections]);

  function links() {
    return sections.map((section, index) => <a key={section.id} href={`#${section.id}`} aria-current={active === section.id ? "location" : undefined} onClick={(event) => { const details = event.currentTarget.closest("details"); if (details) details.open = false; }}><span aria-hidden="true">{String(index + 1).padStart(2,"0")}</span>{section.label}</a>);
  }
  return <aside className={styles.readingGuide}>
    <nav className={styles.desktopGuide} aria-label="On this page"><p className={styles.eyebrow}>In this investigation</p><div>{links()}</div><p className={styles.guideNote}>An experiment-led<br />retrieval engineering story.</p></nav>
    <details className={styles.mobileGuide}><summary>In this investigation <span aria-hidden="true">↓</span></summary><nav aria-label="On this page">{links()}</nav></details>
  </aside>;
}
