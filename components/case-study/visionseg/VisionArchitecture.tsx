"use client";

import { useId, useRef, useState } from "react";
import { Connections } from "./architecture/Connections";
import { ConfusionSymbol, FeatureMaps, SamplingGrid, VehicleSample } from "./architecture/Visuals";
import { branches, domains, type DomainId } from "./architecture/content";
import styles from "./architecture/VisionArchitecture.module.css";

export function VisionArchitecture() {
  const id=useId();
  const mapRef=useRef<HTMLDivElement>(null);
  const notesRef=useRef<HTMLDetailsElement>(null);
  const [selected,setSelected]=useState<DomainId>("aspp");
  const [branch,setBranch]=useState(2);
  const domain=domains.find(d=>d.id===selected)!;
  function inspect(key:DomainId){setSelected(key);if(notesRef.current)notesRef.current.open=true;}
  function control(key:DomainId,label:string){return <button type="button" className={styles.inspectButton} aria-label={`Inspect ${label}`} aria-pressed={selected===key} aria-controls={`${id}-inspector`} onClick={()=>inspect(key)}>{label}<span aria-hidden="true">↗</span></button>;}

  return <figure className={styles.architecture} aria-labelledby={`${id}-title`} aria-describedby={`${id}-summary`}>
    <header className={styles.masthead}><div><p className={styles.overline}>VisionSeg / Semantic segmentation</p><h3 id={`${id}-title`}>Context at every scale.<br />A class at every pixel.</h3></div><p className={styles.figureId}>SYSTEM FIGURE / 01<br />DeepLabV3 · ResNet-50</p></header>
    <p id={`${id}-summary`} className={styles.intro}>An image-only forward path, from spatial features to semantic classes. Paired labels support learning and offline evaluation separately.</p>

    <div ref={mapRef} className={styles.map} data-vision-map>
      <Connections mapRef={mapRef} id={id} selected={selected} branch={branch} />
      <section className={styles.data} data-vision-anchor="data" data-selected={selected==="data"} aria-label="Data and preprocessing domain">
        <div className={styles.domainHeading}><span className={styles.letter}>A</span><h4>{control("data","Data & preprocessing")}</h4><span className={styles.phase}>Image input</span></div>
        <div className={styles.dataBody}>
          <div><VehicleSample /><p className={styles.sampleLabel}>Synthetic RGB image</p></div>
          <div className={styles.preprocess}><span className={styles.label}>Geometry + pixel values</span><h5>Resize &amp; pad</h5><p>Preserve aspect ratio.<br />Tensor conversion + normalization.</p></div>
          <div className={styles.tensor}><span className={styles.tensorSymbol} aria-hidden="true">3 × H × W</span><h5>Model-ready tensor</h5><p>Image only at inference</p></div>
        </div>
        <p className={styles.labelNote}><strong>Paired labels / learning &amp; evaluation only.</strong> Class-index masks use nearest-neighbor resizing; class IDs remain discrete.</p>
      </section>

      <section className={styles.model} data-vision-anchor="model" aria-label="DeepLabV3 with ResNet-50 model domain">
        <div className={styles.modelHeading}><span className={styles.letter}>B</span><div><h4>DeepLabV3 + ResNet-50</h4><p>Standard Torchvision model · functional forward path</p></div></div>
        <div className={styles.modelBody}>
          <div className={styles.backbone} data-vision-anchor="backbone" data-selected={selected==="backbone"}>
            <div><span className={styles.label}>01 / Spatial representation</span><h5>{control("backbone","ResNet-50 features")}</h5><p>Residual feature extraction<br />Dilated later stages retain spatial detail.</p></div>
            <FeatureMaps /><span className={styles.featureNote}>Hierarchical features<br />Schematic dimensions</span>
          </div>
          <div className={styles.aspp} data-selected={selected==="aspp"}>
            <div className={styles.asppInput} data-vision-anchor="aspp-input"><span className={styles.label}>02 / Parallel context</span><h5>{control("aspp","Atrous spatial pyramid pooling")}</h5><p>One shared spatial feature map feeds all five branches.</p></div>
            <div className={styles.branches} data-vision-anchor="branches" role="group" aria-label="ASPP parallel branches">
              {branches.map((item,index)=><button type="button" key={item.name} className={styles.branch} data-vision-anchor={`branch-${index}`} aria-label={`Explore ${item.name}`} aria-pressed={branch===index} aria-controls={`${id}-branch ${id}-inspector`} onClick={()=>{setBranch(index);inspect("aspp");}}><SamplingGrid variant={item.sampling} /><span><strong>{item.name}</strong><span className={styles.operation}>{item.operation}</span><span className={styles.branchContext}>{item.context}</span></span></button>)}
            </div>
            <div className={styles.fusion} data-vision-anchor="fusion"><h5>Concatenate &amp; project</h5><p>Join branch features · 1 × 1 projection</p></div>

          </div>
          <div className={styles.classifier} data-vision-anchor="classifier" data-selected={selected==="classifier"}>
            <div><span className={styles.label}>03 / Dense prediction</span><h5>{control("classifier","Pixel classification & resizing")}</h5></div>
            <ol><li><strong>3 × 3 conv</strong><span>Refine features</span></li><li><strong>1 × 1 class scores</strong><span>Per-pixel logits</span></li><li><strong>Bilinear resize</strong><span>Model-input resolution</span></li></ol>
          </div>
        </div>
      </section>

      <div className={styles.outputDomain} data-vision-anchor="output-domain">
        <div className={styles.domainHeading}><span className={styles.letter}>C</span><h4>Segmentation outputs &amp; evaluation</h4></div>
        <div className={styles.outputsGrid}>
          <section className={styles.output} data-vision-anchor="outputs" data-selected={selected==="outputs"} aria-label="Semantic segmentation output">
            <h5>{control("outputs","Semantic output")}</h5><p>Argmax across class scores</p><VehicleSample mask />
            <p className={styles.sampleLabel}>One class index per pixel</p>
            <div className={styles.classKey} aria-label="Illustrated semantic class key"><span><i className={styles.backgroundKey} />BG / background</span><span><i className={styles.rearKey} />RD / rear door</span><span><i className={styles.frontKey} />FD / front door</span></div>
          </section>
          <section className={styles.evaluation} data-vision-anchor="evaluation" data-selected={selected==="evaluation"} aria-label="Offline segmentation evaluation">
            <span className={styles.label}>Offline / labeled validation</span><h5>{control("evaluation","Offline evaluation")}</h5>
            <div className={styles.evaluationInputs}><span>Predicted class map</span><span>Held-out class mask</span></div>
            <div className={styles.metricFlow}><ConfusionSymbol /><div><h6>Pixel confusion matrix</h6><p>Class intersections &amp; unions</p></div></div>
            <ul className={styles.metrics}><li>Per-class IoU</li><li>Mean IoU</li><li>Foreground mean IoU</li></ul>
            <p className={styles.evaluationNote}>Metric utilities implemented.<br />Analysis runner remains a scaffold.</p>
          </section>
        </div>
      </div>
    </div>

    <p id={`${id}-branch`} className={styles.branchNote} aria-live="polite" aria-atomic="true"><strong>{branches[branch].name}.</strong> {branch===0?"Pointwise projection preserves local spatial evidence.":branch===4?"Image-level pooling adds global context, then resizes it to the shared feature grid.":"A dilated kernel samples a wider neighborhood without another spatial downsampling step."} <span>Sampling grids are conceptual; dilation rates are symbolic.</span></p>
    <div className={styles.legend} aria-label="Connection legend"><span><i />Image / feature / prediction flow</span><span><i className={styles.dashed} />Offline comparison</span></div>
    <aside id={`${id}-inspector`} className={styles.inspector} aria-label="Selected VisionSeg subsystem" aria-live="polite" aria-atomic="true"><div><p className={styles.overline}>Engineering lens</p><h4>{domain.title}</h4></div><details ref={notesRef} open><summary>Decisions &amp; trade-offs<span aria-hidden="true">＋</span></summary><div><p>{domain.detail}</p><p><strong>Trade-off.</strong> {domain.tradeoff}</p><p className={styles.source}>SOURCE / {domain.source}</p></div></details></aside>
    <details className={styles.textSummary}><summary>Text architecture &amp; implementation scope<span aria-hidden="true">＋</span></summary><div><p>RGB images are resized and padded without changing aspect ratio, converted to tensors and normalized. ResNet-50 extracts spatial features. DeepLabV3’s ASPP applies parallel pointwise, atrous and image-pooling branches, concatenates their outputs, and projects them before a segmentation classifier. Logits are resized to the model-input resolution; argmax assigns a semantic class per pixel.</p><p>Ground-truth masks are separate from inference inputs. Paired masks support supervised development; held-out masks and predicted class maps support offline confusion-matrix and IoU evaluation. The model factory supports an optional auxiliary head for training; this figure shows the main prediction path. Training and inference runners are scaffolds, so the figure does not assert a completed training run, a trained checkpoint, or a deployed system.</p><p>Dataset checks, transformations, model construction, class selection and metric calculations are verified in the local vehicle-part semantic segmentation implementation. ASPP and resizing follow the standard Torchvision architecture; no extra DeepLabV3+ decoder is shown. All images, feature maps and sampling patterns are original synthetic schematics, with no measured activations or performance values.</p></div></details>
    <figcaption className={styles.caption}>Functional architecture · synthetic illustrations · no model inference executed</figcaption>
  </figure>;
}
