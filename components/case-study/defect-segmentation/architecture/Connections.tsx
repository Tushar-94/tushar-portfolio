import { useEffect, useRef, type RefObject } from "react";
import type { DomainId } from "./content";
import styles from "./DefectArchitecture.module.css";

type Point = { x: number; y: number };
const flows: { name: string; domains: DomainId[]; kind?: "training" | "evaluation" }[] = [
  { name: "training", domains: ["dataset","training"], kind: "training" },
  { name: "weights", domains: ["training","model"], kind: "training" },
  { name: "image", domains: ["inference","model"] },
  { name: "backbone", domains: ["model"] },
  { name: "head", domains: ["model"] },
  { name: "outputs", domains: ["model","outputs"] },
  { name: "ground-truth", domains: ["dataset","evaluation"], kind: "evaluation" },
  { name: "validation", domains: ["model","outputs","evaluation"], kind: "evaluation" },
];

export function Connections({mapRef,id,selected}: {mapRef: RefObject<HTMLDivElement | null>;id:string;selected:DomainId}) {
  const svgRef=useRef<SVGSVGElement>(null);
  useEffect(()=>{
    const map=mapRef.current,svg=svgRef.current;
    if(!map||!svg)return;
    let frame=0,disposed=false;
    function draw(){
      if(!map||!svg)return;
      const origin=map.getBoundingClientRect();
      svg.setAttribute("viewBox",`0 0 ${origin.width} ${origin.height}`);
      const node=(name:string)=>map.querySelector(`[data-defect-anchor="${name}"]`)!;
      const box=(name:string)=>{const n=node(name),r=n.getBoundingClientRect(),s=getComputedStyle(n);return {left:r.left-origin.left+parseFloat(s.borderLeftWidth)/2,right:r.right-origin.left-parseFloat(s.borderRightWidth)/2,top:r.top-origin.top+parseFloat(s.borderTopWidth)/2,bottom:r.bottom-origin.top-parseFloat(s.borderBottomWidth)/2,x:r.left+r.width/2-origin.left,y:r.top+r.height/2-origin.top};};
      const path=(name:string,points:Point[])=>svg.querySelector(`[data-defect-flow="${name}"]`)?.setAttribute("d",points.map((p,i)=>`${i?"L":"M"}${p.x.toFixed(2)} ${p.y.toFixed(2)}`).join(" "));
      const label=(name:string,x:number,y:number)=>{const n=svg.querySelector(`[data-defect-label="${name}"]`);n?.setAttribute("x",String(x));n?.setAttribute("y",String(y));};
      const dataset=box("dataset"),training=box("training"),train=box("train-split"),trainer=box("trainer"),model=box("model"),input=box("inference"),outputs=box("outputs"),evaluation=box("evaluation"),validation=box("validation-split"),head=box("head");
      const trainingX=(dataset.right+training.left)/2;
      path("training",[{x:dataset.right,y:train.y},{x:trainingX,y:train.y},{x:trainingX,y:trainer.y},{x:training.left,y:trainer.y}]);
      label("training",trainingX,(train.y+trainer.y)/2-9);
      const weightsY=(training.bottom+model.top)/2;
      path("weights",[{x:training.x,y:training.bottom},{x:training.x,y:weightsY},{x:model.x,y:weightsY},{x:model.x,y:model.top}]);
      label("weights",(training.x+model.x)/2,weightsY-8);
      path("image",[{x:input.right,y:input.y},{x:model.left,y:input.y}]);
      label("image",(input.right+model.left)/2,input.y-9);
      // Connect actual feature-map ports, rather than invisible grid-column edges.
      const backboneOut=box("backbone-out"),neckIn=box("neck-in"),neckOut=box("neck-out");
      const featureX=(backboneOut.x+neckIn.x)/2;
      path("backbone",[{x:backboneOut.x,y:backboneOut.y},{x:featureX,y:backboneOut.y},{x:featureX,y:neckIn.y},{x:neckIn.x,y:neckIn.y}]);
      path("head",[{x:neckOut.x,y:neckOut.y},{x:head.left,y:neckOut.y}]);
      const outputsY=(model.bottom+outputs.top)/2;
      path("outputs",[{x:head.x,y:model.bottom},{x:head.x,y:outputsY},{x:outputs.x,y:outputsY},{x:outputs.x,y:outputs.top}]);
      label("outputs",(head.x+outputs.x)/2,outputsY-8);
      const evaluationY=(outputs.bottom+evaluation.top)/2;
      const validationX=evaluation.left+(evaluation.right-evaluation.left)*.25;
      path("ground-truth",[{x:dataset.left,y:validation.y},{x:1,y:validation.y},{x:1,y:evaluationY},{x:validationX,y:evaluationY},{x:validationX,y:evaluation.top}]);
      label("ground-truth",(1+validationX)/2,evaluationY-8);
      const predictionsX=evaluation.left+(evaluation.right-evaluation.left)*.75;
      path("validation",[{x:predictionsX,y:outputs.bottom},{x:predictionsX,y:evaluation.top}]);
      label("validation",predictionsX,evaluationY-8);
      svg.dataset.ready="true";
    }
    const schedule=()=>{if(!disposed){cancelAnimationFrame(frame);frame=requestAnimationFrame(draw);}};
    const observer=new ResizeObserver(schedule);observer.observe(map);map.querySelectorAll("[data-defect-anchor]").forEach(n=>observer.observe(n));
    schedule();document.fonts.ready.then(schedule);
    return()=>{disposed=true;observer.disconnect();cancelAnimationFrame(frame);};
  },[mapRef]);
  return <svg ref={svgRef} className={styles.connections} fill="none" aria-hidden="true">
    <defs><marker id={`${id}-arrow`} viewBox="0 0 6 6" markerWidth="6" markerHeight="6" markerUnits="userSpaceOnUse" refX="6" refY="3" orient="auto"><path d="M0 0 6 3 0 6Z" fill="context-stroke" stroke="none" /></marker></defs>
    <g stroke="currentColor" strokeWidth="1" markerEnd={`url(#${id}-arrow)`}>{flows.map(flow=><path key={flow.name} data-defect-flow={flow.name} data-active={flow.domains.includes(selected)} className={flow.kind==="training"?styles.trainingFlow:flow.kind==="evaluation"?styles.evaluationFlow:undefined} />)}</g>
    <g className={styles.flowLabels} textAnchor="middle"><text data-defect-label="training">train only</text><text data-defect-label="weights">trained weights</text><text data-defect-label="image">image</text><text data-defect-label="outputs">boxes + masks</text><text data-defect-label="ground-truth">validation + labels</text><text data-defect-label="validation">validation predictions</text></g>
  </svg>;
}
