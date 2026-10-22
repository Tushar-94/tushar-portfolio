"use client";

import { useId, useState } from "react";
import { illustrativeRoiScores, roiThresholds } from "@/data/roiArticle";
import styles from "./RoiArticle.module.css";

const modes = [
  { name: "Original image", description: "The component shares the frame with fixture edges, a work surface, and a shadow. All are visual input; only some belong to the inspection task." },
  { name: "ROI mask", description: "White marks the conceptual inspection region (1). Black marks excluded regions (0). This is a binary region definition, not an anomaly prediction." },
  { name: "ROI-focused view", description: "The inspection region remains visible while surrounding context is suppressed. This illustrates the intent of masking, not a verified project implementation." },
];
const region = "M202 122H458L480 144V286L458 308H202L180 286V144Z";

function ComponentScene() {
  return <>
    <rect x="30" y="30" width="600" height="360" rx="8" fill="#eaeae5" stroke="#d2d2cc" />
    {[90, 150, 210, 270, 330].map(y => <path key={y} d={`M30 ${y}H630`} stroke="#deded7" />)}
    <path d="M70 100h65v230H70m520-230h-65v230h65" stroke="#9b9b92" strokeWidth="12" fill="none" />
    <path d="M170 106H490L528 144V302L490 340H170L132 302V144Z" transform="translate(8 12)" fill="#c1c1b7" />
    <path d="M170 94H490L528 132V290L490 328H170L132 290V132Z" fill="#d3d3ca" stroke="#77776e" strokeWidth="1.5" />
    <path d="M185 110H475L509 144V278L475 312H185L151 278V144Z" fill="#e2e2d9" stroke="#aaa99f" />
    <rect x="216" y="152" width="228" height="125" rx="19" fill="#bdbdb2" stroke="#8c8c80" />
    <rect x="229" y="164" width="202" height="100" rx="12" fill="#d9d9cf" stroke="#a2a297" />
    {[253, 284, 315, 346, 377, 408].map(x => <path key={x} d={`M${x} 174v80`} stroke="#bebeb2" strokeWidth="5" />)}
    {[166, 494].flatMap(x => [151, 273].map(y => <g key={`${x}-${y}`}><circle cx={x} cy={y} r="13" fill="#c6c6bb" stroke="#8d8d80" /><circle cx={x} cy={y} r="6" fill="#808075" /><path d={`M${x - 3} ${y}h6`} stroke="#d7d7cf" /></g>))}
    <path d="M115 355H566" stroke="#bdbdb3" />
  </>;
}

export function RoiExplorer() {
  const [mode, setMode] = useState(0);
  const id = useId();
  return <figure className={styles.roiExplorer} aria-labelledby="roi-demo-caption">
    <div className={styles.demoImage}>
      <div className={styles.imageMeta}><span>Synthetic inspection scene</span><span aria-hidden="true">ROI / 01</span></div>
      <svg role="img" aria-label={`Conceptual synthetic component: ${modes[mode].name}. Not an experiment image.`} viewBox="0 0 660 420">
        <defs><clipPath id={`${id}-region`}><path d={region} /></clipPath></defs>
        <rect width="660" height="420" fill="#f1f1ed" />
        <g className={styles.svgLayer} opacity={mode === 1 ? 0 : 1}><ComponentScene /></g>
        <g className={styles.svgLayer} opacity={mode === 2 ? 1 : 0}>
          <rect width="660" height="420" fill="#252522" />
          <g clipPath={`url(#${id}-region)`}><ComponentScene /></g>
          <path d={region} fill="none" stroke="#fafaf8" strokeWidth="1.5" strokeDasharray="6 5" />
        </g>
        <g className={styles.svgLayer} opacity={mode === 1 ? 1 : 0}><rect width="660" height="420" fill="#252522" /><path d={region} fill="#fafaf8" /></g>
      </svg>
      <p className={styles.imageNote}>Conceptual illustration — synthetic component.</p>
    </div>
    <div className={styles.demoControls}>
      <p id="roi-demo-caption" className={styles.figureLabel}>Keep the component. Question the context.</p>
      <div className={styles.modeControls} role="group" aria-label="Select ROI visualization">{modes.map((item, index) => <button key={item.name} type="button" aria-pressed={mode === index} aria-controls="roi-mode-description" onClick={() => setMode(index)}><span aria-hidden="true">0{index + 1}</span>{item.name}<span aria-hidden="true">{mode === index ? "●" : "○"}</span></button>)}</div>
      <div id="roi-mode-description" className={styles.modeDescriptions} aria-live="polite" aria-atomic="true">{modes.map((item, index) => <p key={item.name} data-active={mode === index} aria-hidden={mode !== index}>{item.description}</p>)}</div>
      <p className={styles.smallNote}>M(x, y) = 1 inside the ROI; 0 outside.</p>
    </div>
  </figure>;
}

export function RankingThresholdExplorer() {
  const [threshold, setThreshold] = useState(0.72);
  const flags = illustrativeRoiScores.filter(item => item.score >= threshold);
  const falseAlarms = flags.filter(item => !item.defective).length;
  const missed = illustrativeRoiScores.filter(item => item.defective && item.score < threshold).length;
  return <figure className={styles.thresholdDemo} aria-labelledby="threshold-demo-caption">
    <figcaption id="threshold-demo-caption" className={styles.figureHeader}><span>Same scores. Different decisions.</span><span>Illustrative example — not experimental data.</span></figcaption>
    <div className={styles.thresholdControl}><label htmlFor="illustrative-threshold">Decision threshold <output htmlFor="illustrative-threshold">{threshold.toFixed(2)}</output></label><input id="illustrative-threshold" type="range" min="0" max="1" step="0.01" value={threshold} onChange={event => setThreshold(Number(event.target.value))} aria-describedby="threshold-demo-note" /><div className={styles.scale}><span>0.00</span><span>1.00</span></div></div>
    <div className={styles.scoreLanes}>
      {illustrativeRoiScores.map(item => <div key={item.label} className={styles.scoreLane} data-flagged={item.score >= threshold}>
        <div className={styles.scoreLabel}><span>{item.label}</span><strong>{item.score.toFixed(2)}</strong></div>
        <div className={styles.scoreTrack} aria-hidden="true"><span className={styles.scorePoint} style={{ left: `${item.score * 100}%` }} data-defective={item.defective} /><span className={styles.thresholdLine} style={{ left: `${threshold * 100}%` }} /></div>
        <span className={styles.decision}>{item.score >= threshold ? "Flagged" : "Not flagged"}</span>
      </div>)}
    </div>
    <div className={styles.demoOutcome} aria-live="polite" aria-atomic="true"><strong>{flags.length} / 4 <span>illustrative flags</span></strong><span>{falseAlarms} false alarms · {missed} missed defects</span></div>
    <p id="threshold-demo-note" className={styles.figureNote}>A score ≥ threshold is flagged. The score positions and ranking stay fixed; moving the slider does not recalculate AUROC. These four teaching scores are separate from every measured result in this article.</p>
  </figure>;
}

export function ThresholdStrategyExplorer() {
  const [selected, setSelected] = useState(0);
  const strategy = roiThresholds[selected];
  return <figure className={styles.strategyFigure} aria-labelledby="strategy-caption">
    <figcaption id="strategy-caption" className={styles.figureHeader}><span>Calibration operating points</span><span>12 good + 12 defective examples</span></figcaption>
    <div className={styles.strategyGrid}>
      <div>
        <div className={styles.legend}><span><i />Recall</span><span><i />False-positive rate</span></div>
        <div className={styles.strategyBars}>{roiThresholds.map((item, index) => <div className={styles.strategyRow} data-selected={index === selected} key={item.name}>
          <p>{item.name}<span>t = {item.threshold}</span></p>
          <div className={styles.metricBar}><span>Recall</span><div><i style={{ width: `${item.recall}%` }} /></div><strong>{item.recall.toFixed(1)}%</strong></div>
          <div className={styles.metricBar} data-fpr="true"><span>FPR</span><div><i style={{ width: `${item.fpr}%` }} /></div><strong>{item.fpr.toFixed(1)}%</strong></div>
        </div>)}</div>
        <div className={styles.barScale}><span>0%</span><span>50%</span><span>100%</span></div>
      </div>
      <div className={styles.strategyDetail}>
        <div className={styles.strategyControls} role="group" aria-label="Inspect a threshold strategy">{roiThresholds.map((item, index) => <button type="button" key={item.name} aria-pressed={index === selected} aria-controls="strategy-explanation" onClick={() => setSelected(index)}>{item.name}</button>)}</div>
        <div id="strategy-explanation" className={styles.strategyPanels} aria-live="polite" aria-atomic="true">{roiThresholds.map((item, index) => <div key={item.name} data-active={index === selected} aria-hidden={index !== selected}><p className={styles.figureLabel}>{item.basis}</p><p className={styles.selectedThreshold}>{item.threshold}<span>calibration threshold</span></p><p>{item.explanation}</p></div>)}</div>
        <table className={styles.confusionTable} aria-label={`${strategy.name} calibration confusion counts`}><caption>Actual class × inspection decision</caption><thead><tr><th scope="col">Actual</th><th scope="col">Flag</th><th scope="col">No flag</th></tr></thead><tbody><tr><th scope="row">Defective</th><td>{strategy.tp}<small>TP</small></td><td>{strategy.fn}<small>FN</small></td></tr><tr><th scope="row">Good</th><td>{strategy.fp}<small>FP</small></td><td>{strategy.tn}<small>TN</small></td></tr></tbody></table>
        <p className={styles.confusionKey}>TP: detected defect · FP: false alarm<br />TN: accepted good · FN: missed defect</p>
      </div>
    </div>
    <details className={styles.exactCounts}><summary>Read all calibration confusion counts</summary><dl>{roiThresholds.map(item => <div key={item.name}><dt>{item.name} · {item.threshold}</dt><dd>TP {item.tp} · FP {item.fp} · TN {item.tn} · FN {item.fn}</dd></div>)}</dl></details>
    <p className={styles.figureNote}>Recall = TP / (TP + FN). FPR = FP / (FP + TN). All operating points use calibration data. Percentiles are based on only 12 good examples and do not guarantee future false-positive rates. No production threshold is selected here.</p>
  </figure>;
}
