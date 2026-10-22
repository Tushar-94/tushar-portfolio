import { useEffect, useRef, type RefObject } from "react";
import type { DomainId } from "./content";
import styles from "./AnomalyArchitecture.module.css";

type Point = { x: number; y: number };
const flows: { id: string; domains: DomainId[]; kind?: "matching" | "offline" }[] = [
  {id:"reference",domains:["reference","features"]}, {id:"inspection",domains:["inspection","features"]},
  {id:"reference-features",domains:["reference","features","roi"]}, {id:"inspection-features",domains:["inspection","features","roi"]},
  {id:"reference-match",domains:["reference","roi","matching"],kind:"matching"}, {id:"inspection-match",domains:["inspection","roi","matching"],kind:"matching"},
  {id:"decision",domains:["matching","decision"]}, {id:"evaluation",domains:["matching","evaluation"],kind:"offline"},
];

export function AnomalyConnections({ mapRef, id, selected }: { mapRef: RefObject<HTMLDivElement | null>; id: string; selected: DomainId }) {
  const svgRef=useRef<SVGSVGElement>(null);
  useEffect(()=>{
    const map=mapRef.current,svg=svgRef.current;
    if(!map||!svg)return;
    let frame=0,disposed=false;
    function draw(){
      if(!map||!svg)return;
      const origin=map.getBoundingClientRect();
      svg.setAttribute("viewBox",`0 0 ${origin.width} ${origin.height}`);
      const rect=(name:string)=>map.querySelector(`[data-cv-anchor="${name}"]`)!.getBoundingClientRect();
      const anchor=(name:string,side:"top"|"bottom"|"right",fraction=.5):Point=>{
        const node=map.querySelector(`[data-cv-anchor="${name}"]`)!,r=node.getBoundingClientRect(),s=getComputedStyle(node);
        if(side==="right")return{x:r.right-origin.left-parseFloat(s.borderRightWidth)/2,y:r.top-origin.top+r.height*fraction};
        return{x:r.left-origin.left+r.width*fraction,y:(side==="top"?r.top+parseFloat(s.borderTopWidth)/2:r.bottom-parseFloat(s.borderBottomWidth)/2)-origin.top};
      };
      const path=(name:string,points:Point[])=>svg.querySelector(`[data-cv-flow="${name}"]`)?.setAttribute("d",points.map((p,i)=>`${i?"L":"M"}${p.x.toFixed(2)} ${p.y.toFixed(2)}`).join(" "));
      const label=(name:string,x:number,y:number)=>{const n=svg.querySelector(`[data-cv-label="${name}"]`);n?.setAttribute("x",String(x));n?.setAttribute("y",String(y));};
      const connect=(name:string,from:Point,to:Point)=>{
        const mid=(from.y+to.y)/2;
        path(name,[from,{x:from.x,y:mid},{x:to.x,y:mid},to]);
        label(name,(from.x+to.x)/2,mid-7);
      };
      connect("reference",anchor("reference","bottom"),anchor("encoder","top",.25));
      connect("inspection",anchor("inspection","bottom"),anchor("encoder","top",.75));
      connect("reference-features",anchor("encoder","bottom",.25),anchor("roi","top",.25));
      connect("inspection-features",anchor("encoder","bottom",.75),anchor("roi","top",.75));
      connect("reference-match",anchor("roi","bottom",.25),anchor("matching","top",.25));
      connect("inspection-match",anchor("roi","bottom",.75),anchor("matching","top",.75));
      connect("decision",anchor("matching","bottom",.75),anchor("decision","top",.75));
      const score=rect("score"),matching=rect("matching"),evaluation=rect("evaluation"),gutter=origin.width-1;
      const end=anchor("evaluation","top"),offlineY=(rect("decision").bottom+evaluation.top)/2-origin.top;
      path("evaluation",[{x:matching.right-origin.left,y:score.top+score.height/2-origin.top},{x:gutter,y:score.top+score.height/2-origin.top},{x:gutter,y:offlineY},{x:end.x,y:offlineY},end]);
      label("evaluation",(gutter+end.x)/2,offlineY-7);
      svg.dataset.ready="true";
    }
    const schedule=()=>{if(!disposed){cancelAnimationFrame(frame);frame=requestAnimationFrame(draw);}};
    const observer=new ResizeObserver(schedule);observer.observe(map);map.querySelectorAll("[data-cv-anchor]").forEach(n=>observer.observe(n));
    schedule();document.fonts.ready.then(schedule);
    return()=>{disposed=true;observer.disconnect();cancelAnimationFrame(frame);};
  },[mapRef]);
  return <svg ref={svgRef} className={styles.connections} aria-hidden="true" fill="none">
    <defs><marker id={`${id}-arrow`} viewBox="0 0 6 6" markerWidth="6" markerHeight="6" refX="6" refY="3" markerUnits="userSpaceOnUse" orient="auto"><path d="M0 0 6 3 0 6Z" fill="context-stroke" stroke="none" /></marker></defs>
    <g stroke="currentColor" strokeWidth="1" markerEnd={`url(#${id}-arrow)`}>{flows.map(flow=><path key={flow.id} data-cv-flow={flow.id} data-active={flow.domains.includes(selected)} className={flow.kind==="offline"?styles.offlineFlow:flow.kind==="matching"?styles.matchFlow:undefined} />)}</g>
    <g className={styles.flowLabels} textAnchor="middle"><text data-cv-label="reference">reference images</text><text data-cv-label="inspection">inspection image</text><text data-cv-label="reference-features">patch features</text><text data-cv-label="inspection-features">patch features</text><text data-cv-label="reference-match">reference memory</text><text data-cv-label="inspection-match">inspection features</text><text data-cv-label="decision">image score</text><text data-cv-label="evaluation">offline / labeled score analysis</text></g>
  </svg>;
}
