"use client";

import { useId, useRef, useState } from "react";
import { segmentationPerformance } from "@/data/defectSegmentation";
import { Connections } from "./architecture/Connections";
import { FeaturePyramid, MaskBasis, Specimen } from "./architecture/Visuals";
import { domains, outputClasses, type DomainId } from "./architecture/content";
import styles from "./architecture/DefectArchitecture.module.css";

export function DefectArchitecture() {
  const id = useId();
  const mapRef = useRef<HTMLDivElement>(null);
  const notesRef = useRef<HTMLDetailsElement>(null);
  const [selected, setSelected] = useState<DomainId>("model");
  const [classIndex, setClassIndex] = useState(0);
  const domain = domains.find(item => item.id === selected)!;
  const outputClass = outputClasses[classIndex];
  const maskMetric = (category: string, metric: string) => segmentationPerformance.find(item => item.name === category)!.metrics.find(item => item.name === metric)!.after.toFixed(1);

  function heading(key: DomainId) {
    const item = domains.find(d => d.id === key)!;
    return <button type="button" className={styles.heading} aria-label={`Inspect ${item.title}`} aria-pressed={selected === key} aria-controls={`${id}-inspector`} onClick={() => { setSelected(key); if (notesRef.current) notesRef.current.open = true; }}><span className={styles.letter}>{item.letter}</span><span>{item.title}</span><span className={styles.inspect} aria-hidden="true">↗</span></button>;
  }

  return <figure className={styles.architecture} aria-labelledby={`${id}-title`} aria-describedby={`${id}-summary`}>
    <header className={styles.masthead}><div><p className={styles.overline}>Supervised vision / System architecture</p><h3 id={`${id}-title`}>From defect boundaries to instance masks.</h3></div><p className={styles.status}>YOLOv8n-seg<br />Short Shot · Sink Mark</p></header>
    <p id={`${id}-summary`} className={styles.intro}>Annotated examples shape the model offline. A trained model localizes and segments defects at inspection time. Validation tests the engineering choices separately.</p>

    <div ref={mapRef} className={styles.map} data-defect-map>
      <Connections mapRef={mapRef} id={id} selected={selected} />
      <div className={styles.workbench}>
        <section className={styles.domain} data-defect-anchor="dataset" data-selected={selected === "dataset"} aria-label="Dataset and annotations subsystem">
          {heading("dataset")}
          <p className={styles.phase}>Offline / Dataset preparation</p>
          <div className={styles.samplePair}><div><Specimen /><span>Inspection image</span></div><div><Specimen view="annotation" /><span>Refined polygon labels</span></div></div>
          <div className={styles.datasetText}><h4>Images + instance annotations</h4><p>Class labels and defect boundaries<br />Short Shot · Sink Mark</p></div>
          <dl className={styles.splits}><div data-defect-anchor="train-split"><dt>Train</dt><dd>Learn weights</dd></div><div data-defect-anchor="validation-split"><dt>Validation</dt><dd>Compare runs</dd></div><div><dt>Test</dt><dd>Separate split</dd></div></dl>
        </section>

        <section className={styles.domain} data-defect-anchor="training" data-selected={selected === "training"} aria-label="Offline training and augmentation subsystem">
          {heading("training")}
          <p className={styles.phase}>Offline / Experimental configurations</p>
          <div className={styles.experiments}><div><span className={styles.label}>Reference configuration</span><h4>Baseline training</h4></div><span className={styles.versus}>vs</span><div><span className={styles.label}>Experimental configuration</span><h4>Targeted augmentation</h4><p>Training split only</p></div></div>
          <div className={styles.trainer} data-defect-anchor="trainer"><span className={styles.label}>Supervised model development</span><h4>YOLOv8n-seg training</h4><p>NVIDIA A100 · CUDA<br />Compare the resulting models on validation.</p></div>
          <p className={styles.weights}>Output / Trained weights for each run</p>
        </section>
      </div>

      <div className={styles.runtime}>
        <section className={styles.domain} data-defect-anchor="inference" data-selected={selected === "inference"} aria-label="Inspection inference subsystem">
          {heading("inference")}
          <div className={styles.inferenceBody}><Specimen /><div><span className={styles.label}>Inspection-time input</span><h4>New image</h4><p>No annotation required.<br />No weight updates.</p></div></div>
        </section>

        <section className={`${styles.domain} ${styles.model}`} data-defect-anchor="model" data-selected={selected === "model"} aria-label="Standard YOLOv8n-seg model architecture">
          {heading("model")}
          <div className={styles.modelMeta}><span>Standard Ultralytics architecture</span><span>Trained weights / per run</span></div>
          <div className={styles.modelStages}>
            <div className={styles.modelStage} data-defect-anchor="backbone"><span className={styles.label}>01 / Backbone</span><FeaturePyramid /><h4>Feature extraction</h4><p>Conv · C2f · SPPF</p></div>
            <div className={styles.modelStage} data-defect-anchor="neck"><span className={styles.label}>02 / Feature fusion</span><FeaturePyramid fused /><h4>Multi-scale features</h4><p>Upsample · concatenate<br />Downsample · fuse</p></div>
            <div className={styles.modelStage} data-defect-anchor="head"><span className={styles.label}>03 / Segment head</span><div className={styles.headBranch}><h4>Boxes + classes</h4><p>Object localization</p></div><div className={styles.headBranch}><MaskBasis /><h4>Prototypes + coefficients</h4><p>Instance mask reconstruction</p></div></div>
          </div>
          <p className={styles.modelFoot}>Functional model schematic · no custom layers or project-specific dimensions are implied.</p>
        </section>
      </div>

      <section className={styles.domain} data-defect-anchor="outputs" data-selected={selected === "outputs"} aria-label="Illustrative instance predictions">
        {heading("outputs")}
        <div className={styles.outputTop}><div><h4>One instance. Two spatial descriptions.</h4><p>Enclose the defect with a box; describe its boundary with a mask.</p></div><div className={styles.classControls} role="group" aria-label="Illustrative defect class">{outputClasses.map((item,index)=><button key={item.id} type="button" aria-pressed={classIndex===index} aria-controls={`${id}-output`} onClick={()=>setClassIndex(index)}>{item.name}</button>)}</div></div>
        <div id={`${id}-output`} className={styles.outputViews}>
          <div><Specimen view="box" defect={outputClass.id} /><div><span className={styles.label}>Detection / Localization</span><h4>Bounding box</h4><p>Dashed enclosing rectangle</p></div></div>
          <div><Specimen view="mask" defect={outputClass.id} /><div><span className={styles.label}>Segmentation / Boundary</span><h4>Instance mask</h4><p>Hatched pixel region</p></div></div>
        </div>
        <p className={styles.outputNote} aria-live="polite" aria-atomic="true"><strong>{outputClass.name}.</strong> {outputClass.note}</p>
        <p className={styles.synthetic}>All sample images, annotations, feature maps, and predictions are original synthetic schematics. No measured confidence or actual model output is shown.</p>
      </section>

      <section className={`${styles.domain} ${styles.evaluation}`} data-defect-anchor="evaluation" data-selected={selected === "evaluation"} aria-label="Offline model evaluation subsystem">
        {heading("evaluation")}
        <p className={styles.phase}>Offline / Validation for each experimental run</p>
        <div className={styles.evaluationBody}>
          <div className={styles.comparison}><span className={styles.label}>Validation predictions + ground truth</span><h4>Compare instances &amp; boundaries</h4><p>Run validation images through the trained model and compare predictions with their annotations.</p></div>
          <div className={styles.assessments}><div><span className={styles.label}>Mask validation</span><h4>Precision · recall · mAP50</h4><p>Overall performance and class-level analysis</p></div><div><span className={styles.label}>Experimental comparison</span><h4>Baseline ↔ augmented</h4><p>Short Shot and Sink Mark assessed separately</p></div></div>
        </div>
        <div className={styles.review}><span className={styles.label}>Engineering review</span><p>Investigate class-level failure modes, revisit annotation quality, and reassess augmentation. These are review decisions, not an automatic retraining loop.</p></div>
        <details className={styles.results}><summary><span>Verified experiment context</span><span className={styles.disclosureMark} aria-hidden="true" /></summary><div>
          <p className={styles.metricContext}>Augmented-model validation · mask metrics</p>
          <dl className={styles.metrics}><div><dt>Overall precision</dt><dd>{maskMetric("Overall","Precision")}%</dd></div><div><dt>Overall mAP50</dt><dd>{maskMetric("Overall","mAP50")}%</dd></div><div><dt>Sink Mark mAP50</dt><dd>{maskMetric("Sink Mark","mAP50")}%</dd></div></dl>
          <p className={styles.caveat}>Targeted augmentation reduced Short Shot recall and mAP in the documented comparison. These validation mask results are not box-detection metrics, test-set results, or production guarantees.</p>
        </div></details>
      </section>
    </div>

    <div className={styles.legend} aria-label="Architecture connection legend"><span><i />Inference / feature data</span><span><i className={styles.trainingLine} />Training / learned weights</span><span><i className={styles.evaluationLine} />Offline validation</span></div>
    <aside id={`${id}-inspector`} className={styles.inspector} aria-label="Selected segmentation subsystem" aria-live="polite" aria-atomic="true"><div><p className={styles.overline}>Inspect / {domain.letter}</p><h4>{domain.title}</h4><p className={styles.hint}>Select a subsystem to inspect the engineering decisions.</p></div><details ref={notesRef} className={styles.notes} open><summary><span>Engineering decisions &amp; boundaries</span><span className={styles.disclosureMark} aria-hidden="true" /></summary><div><p>{domain.description}</p><p><strong>Trade-off.</strong> {domain.tradeoff}</p><p className={styles.source}>SOURCE / {domain.source}</p></div></details></aside>
    <details className={styles.textSummary}><summary><span>Text architecture &amp; implementation scope</span><span className={styles.disclosureMark} aria-hidden="true" /></summary><div><p><strong>Offline development.</strong> Inspection images and refined polygon instance annotations are partitioned into training, validation, and test data. Targeted augmentation applies only to the training split. Baseline and augmented training configurations produce trained YOLOv8n-seg weights for comparison.</p><p><strong>Inspection inference.</strong> A new image enters a trained model. The standard YOLOv8-seg backbone extracts visual features, multi-scale processing fuses them, and the Segment head predicts boxes, classes, mask coefficients, and prototypes used for instance masks. This is a functional architecture, not a proprietary model graph.</p><p><strong>Separate validation.</strong> Validation images use the trained model’s prediction path in an offline evaluation run. Predictions are compared against validation ground truth; the dashed connections express that relationship, not background evaluation of every new inspection image. Mask metrics and class-level failures inform review of annotation and augmentation choices.</p><p><strong>Evidence boundary.</strong> All supplied numerical results are validation mask metrics. The augmented-model comparison includes a decline in Short Shot recall and mAP. Dataset counts, transformation recipes, confidence values, private configurations, custom layers, and deployment claims are deliberately unspecified. Every visual example is synthetic.</p></div></details>
    <figcaption className={styles.caption}><span>FIG. 01 / Industrial defect detection &amp; segmentation</span><span>Interactive architecture · synthetic visuals · no model execution</span></figcaption>
  </figure>;
}
