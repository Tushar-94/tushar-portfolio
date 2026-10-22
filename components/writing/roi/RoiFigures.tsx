import { roiCalibration as calibration } from "@/data/roiArticle";
import styles from "./RoiArticle.module.css";

export function HistoricalContradiction() {
  return <figure className={styles.contradiction} aria-labelledby="historical-caption">
    <figcaption id="historical-caption" className={styles.figureHeader}><span>Earlier ROI evaluation</span><span>Historical observations</span></figcaption>
    <div className={styles.contradictionGrid}>
      <div><p className={styles.figureLabel}>Anomaly ranking / AUROC</p><div className={styles.historicalNumbers}><span>~0.64</span><span aria-label="increased to">→</span><strong>~0.81</strong></div><p className={styles.smallNote}>Approximately +0.17 AUROC. A masking-only causal effect is not established.</p></div>
      <div><p className={styles.figureLabel}>Inspection flags / threshold 0.72</p><p className={styles.flagNumber}>0 <span>/ 50</span></p><p className={styles.smallNote}>No evaluated image crossed the configured inspection threshold.</p></div>
    </div>
    <p className={styles.historicalConclusion}>Better ranking did not automatically produce useful inspection decisions.</p>
  </figure>;
}

export function ReferencePipeline() {
  return <figure className={styles.pipeline} aria-labelledby="reference-caption">
    <figcaption id="reference-caption" className={styles.figureHeader}><span>Reference-based visual inspection</span><span>Conceptual workflow</span></figcaption>
    <div className={styles.featureBranches}>{[
      ["Confirmed-good images", "DINOv2 encoder", "Reference features"],
      ["Inspection image", "DINOv2 encoder", "Patch features"],
    ].map((branch, index) => <ol key={branch[0]} aria-label={index === 0 ? "Build the normal reference" : "Encode an inspection image"}>{branch.map((item, i) => <li key={item}><span>{index === 0 ? "Reference" : "Inspection"} / 0{i + 1}</span><strong>{item}</strong></li>)}</ol>)}</div>
    <p className={styles.flowMerge}>Reference features + patch embeddings <span aria-hidden="true">↓</span></p>
    <ol className={styles.decisionFlow} aria-label="Compare features and make a decision">{["Reference matching", "Anomaly scoring", "Threshold → decision"].map((item, i) => <li key={item}><span>0{i + 1}</span><strong>{item}</strong></li>)}</ol>
    <div className={styles.formulation}><code>s(p) = min<sub>r ∈ R</sub> ‖f(p) − r‖₂</code><p><strong>p</strong> is an image patch; <strong>f(p)</strong> its embedding; <strong>R</strong> the reference features. This nearest-reference formulation illustrates the idea, not the proprietary distance or image-level aggregation implementation.</p></div>
  </figure>;
}

export function ScoreRangeFigure() {
  const position = (score: number) => (score - 0.2) / 0.24 * 100;
  return <figure className={styles.rangeFigure} aria-labelledby="ranges-caption">
    <figcaption id="ranges-caption" className={styles.figureHeader}><span>Later calibration / observed score ranges</span><span>Summary statistics only</span></figcaption>
    <div className={styles.rangeLegend}><span><i className={styles.meanKey} />Mean marker</span><span><i className={styles.overlapKey} />Overlapping range</span></div>
    {[{ name: "Confirmed good", ...calibration.good }, { name: "Confirmed defective", ...calibration.defect }].map((group, index) => <div className={styles.rangeRow} key={group.name}>
      <div className={styles.rangeHeader}><h3>{group.name}</h3><p>Mean <strong>{group.mean.toFixed(6)}</strong></p></div>
      <div className={styles.rangeTrack} aria-hidden="true"><span className={styles.overlapBand} style={{ left: `${position(calibration.overlap.lower)}%`, width: `${position(calibration.overlap.upper) - position(calibration.overlap.lower)}%` }} /><span className={styles.rangeSegment} data-defect={index === 1} style={{ left: `${position(group.lower)}%`, width: `${position(group.upper) - position(group.lower)}%` }} /><span className={styles.meanPoint} style={{ left: `${position(group.mean)}%` }} /></div>
      <p className={styles.rangeLimits}><span>Observed range</span><strong>{group.lower.toFixed(6)}–{group.upper.toFixed(6)}</strong></p>
    </div>)}
    <div className={styles.scale}><span>0.20</span><span>Anomaly score · displayed scale 0.20–0.44</span><span>0.44</span></div>
    <p className={styles.overlapSummary}>Shared score range <strong>{calibration.overlap.lower.toFixed(6)}–{calibration.overlap.upper.toFixed(6)}</strong></p>
    <p className={styles.figureNote}>Bars show minimum to maximum, not density. No individual measured scores, histogram, or fitted distribution are plotted. The higher mean defect score does not eliminate the overlap.</p>
  </figure>;
}

export function BootstrapFigure() {
  return <figure className={styles.bootstrapFigure} aria-labelledby="bootstrap-caption">
    <figcaption id="bootstrap-caption" className={styles.figureHeader}><span>Later calibration / AUROC uncertainty</span><span>Stratified bootstrap · 10,000 resamples</span></figcaption>
    <div className={styles.intervalHeading}><div><strong>0.785</strong><span>Calibration AUROC · exact estimate {calibration.auroc.toFixed(6)}</span></div><p>95% bootstrap interval<br /><strong>{calibration.lower.toFixed(6)}–{calibration.upper.toFixed(6)}</strong></p></div>
    <div className={styles.intervalTrack} aria-hidden="true"><span className={styles.chanceLine} /><span className={styles.intervalSegment} style={{ left: `${calibration.lower * 100}%`, width: `${(calibration.upper - calibration.lower) * 100}%` }} /><span className={styles.intervalPoint} style={{ left: `${calibration.auroc * 100}%` }} /></div>
    <div className={styles.scale}><span>0</span><span>0.50 · chance-level ranking</span><span>1.00</span></div>
    <p className={styles.figureNote}>The wide interval indicates uncertainty in estimated anomaly-ranking performance. These are calibration-set results, not independent holdout or production performance.</p>
  </figure>;
}
