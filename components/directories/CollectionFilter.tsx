"use client";

import { useId, useState, type ReactNode } from "react";
import styles from "./Directory.module.css";

type CollectionItem = { id: string; category: string; content: ReactNode };

export function CollectionFilter({ items, noun, className }: { items: CollectionItem[]; noun: string; className: string }) {
  const [active, setActive] = useState("All");
  const id = useId();
  const categories = ["All", ...new Set(items.map(item => item.category))];
  const visible = items.filter(item => active === "All" || item.category === active);

  return <>
    <div className={styles.filterBar}>
      <div role="group" aria-label={`Filter ${noun} by category`} className={styles.filters}>
        {categories.map(category => <button key={category} type="button" aria-pressed={active === category} aria-controls={id} onClick={() => setActive(category)}>
          {category === "All" ? `All ${noun}` : category}<span>{category === "All" ? items.length : items.filter(item => item.category === category).length}</span>
        </button>)}
      </div>
      <p className={styles.resultCount} role="status" aria-live="polite" aria-atomic="true">{String(visible.length).padStart(2, "0")} / {String(items.length).padStart(2, "0")} <span>{noun}</span></p>
    </div>
    <div id={id} className={className} data-filtered={active !== "All"}>
      {items.map(item => <div key={item.id} hidden={active !== "All" && item.category !== active} className={styles.collectionItem}>{item.content}</div>)}
    </div>
  </>;
}
