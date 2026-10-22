"use client";

import { useId, useRef, useState } from "react";
import { historicalROI } from "@/data/anomalyDetection";
import { roiCalibration } from "@/data/roiArticle";
import { AnomalyConnections } from "./architecture/AnomalyConnections";
import { ComponentDrawing, PatchGrid } from "./architecture/Visuals";
import { domains, type DomainId } from "./architecture/content";
import styles from "./architecture/AnomalyArchitecture.module.css";

export function AnomalyArchitecture() {
  const id = useId();
  const mapRef = useRef<HTMLDivElement>(null);
  const notesRef = useRef<HTMLDetailsElement>(null);
  const [selected, setSelected] = useState<DomainId>("matching");
  const domain = domains.find(item => item.id === selected)!;

  function heading(key: DomainId) {
    const item = domains.find(d => d.id === key)!;
    return <button type="button" className={styles.heading} aria-label={`Inspect ${item.title}`} aria-pressed={selected === key} aria-controls={`${id}-inspector`} onClick={() => { setSelected(key); if (notesRef.current) notesRef.current.open = true; }}><span className={styles.number}>{item.number}</span><span>{item.title}</span><span className={styles.inspect} aria-hidden="true">↗</span></button>;
  }

  return <figure className={styles.architecture} aria-labelledby={`${id}-title`} aria-describedby={`${id}-summary`}>
    <header className={styles.masthead}><div><p className={styles.overline}>Computer vision / System architecture</p><h3 id={`${id}-title`}>Learn normal. Inspect the difference.</h3></div><p className={styles.status}>Pretrained features<br />Reference-based comparison</p></header>
    <p id={`${id}-summary`} className={styles.intro}>Two image paths share a frozen visual encoder and converge at reference matching. Ranking quality and threshold-dependent decisions are evaluated separately.</p>

    <div ref={mapRef} className={styles.map} data-anomaly-map>
      <AnomalyConnections mapRef={mapRef} id={id} selected={selected} />
      <div className={styles.inputs}>
        <section className={styles.domain} data-selected={selected === "reference"} data-cv-anchor="reference" aria-label="Normal reference path">
          {heading("reference")}
          <div className={styles.imageInput}><ComponentDrawing collection /><div><span className={styles.label}>Preparation · before inspection</span><h4>Confirmed-good images</h4><p>A small reference set represents normal component appearance.</p></div></div>
          <p className={styles.strip}>RGB conversion + model preprocessing</p>
        </section>
        <section className={styles.domain} data-selected={selected === "inspection"} data-cv-anchor="inspection" aria-label="Inspection inference path">
          {heading("inspection")}
          <div className={styles.imageInput}><ComponentDrawing inspection /><div><span className={styles.label}>Inference · per image</span><h4>New inspection image</h4><p>Look for visual deviation, rather than a named defect category.</p></div></div>
          <p className={styles.strip}>Same RGB conversion + preprocessing</p>
        </section>
      </div>

      <section className={`${styles.domain} ${styles.encoder}`} data-cv-anchor="encoder" data-selected={selected === "features"} aria-label="Shared feature extraction">
        {heading("features")}
        <div className={styles.encoderBody}><div className={styles.featureSample}><PatchGrid /><span>Reference patches</span></div><div className={styles.backbone}><span className={styles.label}>Shared pretrained weights</span><h4>DINOv2 Small</h4><code>vit_small_patch14_dinov2</code><p>Forward passes only · no fine-tuning</p></div><div className={styles.featureSample}><PatchGrid variant="inspection" /><span>Inspection patches</span></div></div>
      </section>

      <section className={styles.domain} data-cv-anchor="roi" data-selected={selected === "roi"} aria-label="Feature-level foreground masking">
        {heading("roi")}
        <div className={styles.roiIntro}><h4>PCA-based foreground masking</h4><p>Built-in AnomalyDINO masking after feature extraction, before anomaly scoring.</p></div>
        <div className={styles.featureOutputs}><div><PatchGrid masked /><div><span className={styles.label}>Reference path output</span><h4>Reference feature memory</h4><p>Confirmed-good patch representation</p></div></div><div><PatchGrid masked variant="inspection" /><div><span className={styles.label}>Inspection path output</span><h4>Inspection patch features</h4><p>Foreground-aware comparison</p></div></div></div>
        <p className={styles.strip}>Experiment configuration: internal masking ON · image-space auto-ROI OFF</p>
      </section>

      <section className={`${styles.domain} ${styles.matching}`} data-cv-anchor="matching" data-selected={selected === "matching"} aria-label="Anomaly matching and scoring">
        {heading("matching")}
        <div className={styles.matchInputs}><span>Normal reference features</span><span>Inspection features</span></div>
        <div className={styles.comparison}><span className={styles.label}>Paths converge</span><h4>Patch-level reference matching</h4><p>AnomalyDINO compares local features with the confirmed-good memory using kNN.</p></div>
        <div className={styles.modelOutputs}><div><PatchGrid variant="anomaly" /><div><span className={styles.label}>Spatial output</span><h4>Anomaly map</h4><p>Where visual deviations appear</p></div></div><div data-cv-anchor="score"><span className={styles.scoreSymbol} aria-hidden="true">s<span>(x)</span></span><div><span className={styles.label}>Image-level output</span><h4>Anomaly score</h4><p>How unusual the image appears</p></div></div></div>
        <p className={styles.schematic}>All component, patch and anomaly-map drawings are synthetic schematics, not inspection outputs.</p>
      </section>

      <section className={styles.domain} data-cv-anchor="decision" data-selected={selected === "decision"} aria-label="Threshold-dependent inspection decision">
        {heading("decision")}
        <div className={styles.decisionBody}><div><span className={styles.label}>Configured cutoff · τ</span><h4>Compare score with threshold</h4><p>The threshold changes flags; it does not change the ranking of scores.</p></div><dl className={styles.outcomes}><div><dt>s(x) &lt; τ</dt><dd>No anomaly flag</dd></div><div><dt>s(x) ≥ τ</dt><dd>Anomaly flag</dd></div></dl></div>
        <p className={styles.strip}>An inspection rule under investigation, not a production-validated cutoff.</p>
      </section>

      <section className={`${styles.domain} ${styles.evaluation}`} data-cv-anchor="evaluation" data-selected={selected === "evaluation"} aria-label="Offline evaluation and calibration">
        {heading("evaluation")}
        <p className={styles.offlineNote}>Offline analysis of labeled examples and detector scores · outside per-image inference</p>
        <div className={styles.evaluationFlow}>
          <div className={styles.evalStage}><span className={styles.label}>01 / Define</span><h4>Frozen calibration split</h4><p>12 good + 12 defective<br />Separate from reference images</p></div>
          <div className={styles.evalStage}><span className={styles.label}>02 / Inspect scores</span><h4>Score distributions</h4><p>Compare good and defect scores.<br />Inspect separation and overlap.</p></div>
          <div className={styles.evalBranches}><div><span className={styles.label}>Ranking quality</span><h4>AUROC + bootstrap</h4><p>Threshold-independent ranking<br />Uncertainty under resampling</p></div><div><span className={styles.label}>Decision quality</span><h4>Youden · P95 · P99</h4><p>Threshold candidates<br />Recall ↔ false-positive rate</p></div></div>
        </div>
        <p className={styles.evalFoot}>Candidates provide evidence for review; calibration does not automatically update the runtime threshold. The independent holdout is not reported as evaluated in this calibration study.</p>
        <details className={styles.context}><summary>Experimental context <span>Separate stages</span></summary><div className={styles.contextGrid}>
          <div><span className={styles.label}>Earlier / ROI investigation</span><h4>AUROC ≈ {historicalROI.before} → {historicalROI.after}</h4><p>A historical masking evaluation, not a controlled comparison with the later calibration split.</p></div>
          <div><span className={styles.label}>Historical / Threshold observation</span><h4>0 of 50 images flagged</h4><p>Configured cutoff: 0.72. A separate historical observation, not the later calibration operating point.</p></div>
          <div><span className={styles.label}>Later / Frozen calibration</span><h4>AUROC {roiCalibration.auroc}</h4><p>12 good + 12 defective.<br />95% bootstrap interval:<br />[{roiCalibration.lower}, {roiCalibration.upper}]</p></div>
        </div></details>
      </section>
    </div>

    <div className={styles.legend} aria-label="Architecture connection legend"><span><i />Image / feature flow</span><span><i className={styles.matchLine} />Reference matching</span><span><i className={styles.offlineLine} />Offline score analysis</span></div>
    <aside id={`${id}-inspector`} className={styles.inspector} aria-label="Selected vision subsystem" aria-live="polite" aria-atomic="true"><div><p className={styles.overline}>Inspect / {domain.number}</p><h4>{domain.title}</h4><p className={styles.hint}>Select a subsystem to inspect its engineering decisions.</p></div><details ref={notesRef} open className={styles.notes}><summary>Engineering decisions &amp; boundaries <span aria-hidden="true" /></summary><div><p>{domain.description}</p><p><strong>Trade-off.</strong> {domain.tradeoff}</p><p className={styles.source}>SOURCE / {domain.source}</p></div></details></aside>
    <details className={styles.textSummary}><summary><span>Text architecture &amp; implementation scope</span><span aria-hidden="true">＋</span></summary><div><p>Confirmed-good reference images and inspection images use the same preprocessing and pretrained DINOv2 Small encoder. Reference preparation builds a feature memory through forward passes, without supervised training or weight updates.</p><p>The documented masking experiment uses AnomalyDINO’s built-in PCA-based foreground masking on extracted features. Image-space auto-ROI is a different operation and is disabled in the calibration configuration shown here. Masking does not guarantee removal of all background influence.</p><p>Inspection features are compared against the reference memory with patch-level kNN. The model returns a spatial anomaly map and an image-level score. This diagram does not specify an unverified score-aggregation formula. A configured threshold turns the score into a flag; AUROC assesses ranking independently of that cutoff.</p><p>Labeled calibration examples support score-distribution analysis, threshold-candidate assessment, and stratified bootstrap AUROC uncertainty. Historical ROI results, the historical 0.72 threshold observation, and the later 12-good/12-defective calibration results describe separate experimental contexts. No production deployment, vector database, or model fine-tuning is represented.</p></div></details>
    <figcaption className={styles.caption}><span>FIG. 01 / Reference-based visual anomaly detection</span><span>Research workflow · synthetic illustrations · no inference executed</span></figcaption>
  </figure>;
}
