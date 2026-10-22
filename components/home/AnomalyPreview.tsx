"use client";

import Link from "next/link";
import { useId, useState } from "react";
import styles from "./Home.module.css";

export function AnomalyPreview() {
  const [heatmap, setHeatmap] = useState(true);
  const id = useId();
  return (
    <figure className={`${styles.preview} ${styles.anomalyPreview} ${styles.linkedPreview}`}>
      <Link className={styles.previewLink} href="/projects/industrial-vision-anomaly-detection" aria-label="Explore Industrial Visual Anomaly Detection case study"><span aria-hidden="true">↗</span></Link>
      <div className={styles.previewTop}><span>VISION / ANOMALY INSPECTION</span><span>02</span></div>
      <div className={styles.inspectionCanvas}>
        <svg viewBox="0 0 540 300" role="img" aria-label={`Synthetic machined component${heatmap ? " with an illustrative heatmap highlighting a visual deviation" : " without the heatmap overlay"}. Not actual model output.`}>
          <defs>
            <linearGradient id={`${id}-metal`} x1="0" y1="0" x2="1" y2="1"><stop stopColor="#eee" /><stop offset=".45" stopColor="#d6d7d5" /><stop offset="1" stopColor="#bcbfbc" /></linearGradient>
            <radialGradient id={`${id}-heat`}><stop stopColor="#b65027" stopOpacity=".8" /><stop offset=".42" stopColor="#c47a39" stopOpacity=".65" /><stop offset="1" stopColor="#d4ad61" stopOpacity="0" /></radialGradient>
          </defs>
          <g fill="none" stroke="#dededb" strokeWidth="1"><path d="M36 150h468M270 20v260" strokeDasharray="3 7" /><path d="M92 70V42h28m300 0h28v28M92 230v28h28m300 0h28v-28" /></g>
          <path d="m140 68 260 0 27 29v122l-27 23H140l-27-23V97Z" fill="#dddeda" stroke="#bcbeba" />
          <path d="m140 60 260 0 27 29v122l-27 23H140l-27-23V89Z" fill={`url(#${id}-metal)`} stroke="#a9ada8" />
          <path d="m151 77 238 0 20 20v106l-20 14H151l-20-14V97Z" fill="none" stroke="#f6f6f3" />
          <ellipse cx="270" cy="149" rx="79" ry="66" fill="#aeb3ad" stroke="#91988f" /><ellipse cx="270" cy="145" rx="68" ry="56" fill="#eceee9" stroke="#9da49b" /><ellipse cx="270" cy="145" rx="56" ry="46" fill="#f3f3f0" stroke="#d1d5cd" />
          <g fill="#a5aaa2" stroke="#8c9389">{[[152,98],[388,98],[152,198],[388,198]].map(([cx,cy]) => <circle key={`${cx}-${cy}`} cx={cx} cy={cy} r="9" />)}</g>
          <g stroke="#e4e7df" strokeWidth="1">{[[152,96],[388,96],[152,196],[388,196]].map(([cx,cy]) => <path key={`${cx}-${cy}`} d={`M${cx-4} ${cy}h8`} />)}</g>
          <path d="m332 172-9 8 3 11-10 7" fill="none" stroke="#949b90" strokeWidth="2" />
          <g className={styles.heatmapOverlay} data-visible={heatmap}>
            <ellipse cx="325" cy="185" rx="50" ry="43" fill={`url(#${id}-heat)`} />
            <rect x="294" y="155" width="63" height="60" rx="6" fill="none" stroke="#a86832" strokeWidth="1" strokeDasharray="3 4" />
            <path d="M357 185h83" stroke="#a86832" /><circle cx="440" cy="185" r="3" fill="#a86832" />
          </g>
          <g fontFamily="var(--font-geist-mono), monospace" fontSize="9" fill="#696e66"><text x="92" y="29">SYNTHETIC COMPONENT</text><text x="374" y="278">REGION OF INTEREST</text></g>
        </svg>
      </div>
      <div className={styles.inspectionControls}><span>Reference-based inspection</span><button type="button" aria-pressed={heatmap} onClick={() => setHeatmap(!heatmap)}><span className={styles.toggleIndicator} aria-hidden="true" />Heatmap {heatmap ? "on" : "off"}</button></div>
      <figcaption className={styles.previewCaption}>Illustrative visualization — not actual model output</figcaption>
    </figure>
  );
}
