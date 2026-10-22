"use client";

import { useEffect, useRef, type ReactNode } from "react";
import styles from "./Home.module.css";

export function Reveal({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const node = ref.current;
    if (!node || window.matchMedia("(prefers-reduced-motion: reduce)").matches || !("IntersectionObserver" in window)) return;
    // Server-rendered content stays visible without JavaScript. Only upcoming
    // sections are enhanced; the hero and initially visible content never hide.
    if (node.getBoundingClientRect().top < window.innerHeight) return;
    node.dataset.reveal = "waiting";
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) { node.dataset.reveal = "visible"; observer.disconnect(); }
    }, { rootMargin: "0px 0px 40px 0px", threshold: 0 });
    observer.observe(node);
    return () => observer.disconnect();
  }, []);
  return <div ref={ref} className={styles.reveal}>{children}</div>;
}
