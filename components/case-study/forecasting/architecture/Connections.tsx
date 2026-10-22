import { useEffect,useRef,type RefObject } from "react";
import type { DomainId } from "./content";
import styles from "./ForecastArchitecture.module.css";

type Point={x:number;y:number};
const flows:{name:string;domains:DomainId[];evaluation?:boolean}[]=[
  {name:"foundation",domains:["foundation","representation"]},
  {name:"development",domains:["representation","development"]},
  {name:"backtest",domains:["development","evaluation"],evaluation:true},
  {name:"actuals",domains:["representation","evaluation"],evaluation:true},
  {name:"selection",domains:["evaluation","decision"]},
];

export function Connections({mapRef,id,selected,scenario}: {mapRef:RefObject<HTMLDivElement|null>;id:string;selected:DomainId;scenario:number}) {
  const svgRef=useRef<SVGSVGElement>(null);
  useEffect(()=>{
    const map=mapRef.current,svg=svgRef.current;
    if(!map||!svg)return;
    let frame=0,disposed=false;
    function draw(){
      if(!map||!svg)return;
      const origin=map.getBoundingClientRect();svg.setAttribute("viewBox",`0 0 ${origin.width} ${origin.height}`);
      const box=(name:string)=>{const node=map.querySelector(`[data-forecast-anchor="${name}"]`)!,r=node.getBoundingClientRect(),s=getComputedStyle(node);return{left:r.left-origin.left+parseFloat(s.borderLeftWidth)/2,right:r.right-origin.left-parseFloat(s.borderRightWidth)/2,top:r.top-origin.top+parseFloat(s.borderTopWidth)/2,bottom:r.bottom-origin.top-parseFloat(s.borderBottomWidth)/2,x:r.left+r.width/2-origin.left,y:r.top+r.height/2-origin.top};};
      const path=(name:string,points:Point[])=>svg.querySelector(`[data-forecast-flow="${name}"]`)?.setAttribute("d",points.map((p,i)=>`${i?"L":"M"}${p.x.toFixed(2)} ${p.y.toFixed(2)}`).join(" "));
      const label=(name:string,x:number,y:number)=>{const n=svg.querySelector(`[data-forecast-label="${name}"]`);n?.setAttribute("x",String(x));n?.setAttribute("y",String(y));};
      const foundation=box("foundation"),representation=box("representation"),development=box("development"),evaluation=box("evaluation"),decision=box("decision"),series=box("channel-series"),candidates=box("rolling-candidates");
      const foundationX=foundation.left+(foundation.right-foundation.left)*.25,foundationY=(foundation.bottom+representation.top)/2;
      path("foundation",[{x:foundationX,y:foundation.bottom},{x:foundationX,y:foundationY},{x:representation.x,y:foundationY},{x:representation.x,y:representation.top}]);
      label("foundation",(foundationX+representation.x)/2,foundationY-8);
      const seriesX=(representation.right+development.left)/2;
      path("development",[{x:representation.right,y:series.y},{x:seriesX,y:series.y},{x:seriesX,y:candidates.y},{x:development.left,y:candidates.y}]);
      label("development",seriesX,(series.y+candidates.y)/2-9);
      const evaluationX=evaluation.left+(evaluation.right-evaluation.left)*.75,backtestY=(development.bottom+evaluation.top)/2;
      path("backtest",[{x:development.x,y:development.bottom},{x:development.x,y:backtestY},{x:evaluationX,y:backtestY},{x:evaluationX,y:evaluation.top}]);
      label("backtest",(development.x+evaluationX)/2,backtestY-8);
      const actualsX=evaluation.left+(evaluation.right-evaluation.left)*.25,actualsY=(Math.max(representation.bottom,development.bottom)+evaluation.top)/2;
      path("actuals",[{x:representation.left,y:series.y},{x:1,y:series.y},{x:1,y:actualsY},{x:actualsX,y:actualsY},{x:actualsX,y:evaluation.top}]);
      label("actuals",(1+actualsX)/2,actualsY-8);
      const selectionY=(evaluation.bottom+decision.top)/2;
      path("selection",[{x:evaluation.x,y:evaluation.bottom},{x:evaluation.x,y:selectionY},{x:decision.x,y:selectionY},{x:decision.x,y:decision.top}]);
      label("selection",(evaluation.x+decision.x)/2,selectionY-8);
      const aggregate=box("aggregate"),caption=box("scenario-label"),scenarioBoxes=[0,1,2].map(i=>box(`scenario-${i}`)),junctionY=(caption.bottom+Math.min(...scenarioBoxes.map(b=>b.top)))/2;
      path("planning-stem",[{x:aggregate.x,y:aggregate.bottom},{x:aggregate.x,y:junctionY}]);
      scenarioBoxes.forEach((b,i)=>path(`scenario-${i}`,[{x:aggregate.x,y:junctionY},{x:b.x,y:junctionY},{x:b.x,y:b.top}]));
      svg.dataset.ready="true";
    }
    const schedule=()=>{if(!disposed){cancelAnimationFrame(frame);frame=requestAnimationFrame(draw);}};
    const observer=new ResizeObserver(schedule);observer.observe(map);map.querySelectorAll("[data-forecast-anchor]").forEach(n=>observer.observe(n));schedule();document.fonts.ready.then(schedule);
    return()=>{disposed=true;observer.disconnect();cancelAnimationFrame(frame);};
  },[mapRef]);
  return <svg ref={svgRef} className={styles.connections} fill="none" aria-hidden="true"><defs><marker id={`${id}-arrow`} viewBox="0 0 6 6" markerWidth="6" markerHeight="6" markerUnits="userSpaceOnUse" refX="6" refY="3" orient="auto"><path d="M0 0 6 3 0 6Z" fill="context-stroke" stroke="none" /></marker></defs>
    <g stroke="currentColor" strokeWidth="1" markerEnd={`url(#${id}-arrow)`}>{flows.map(flow=><path key={flow.name} data-forecast-flow={flow.name} data-active={flow.domains.includes(selected)} className={flow.evaluation?styles.evaluationFlow:undefined} />)}<path data-forecast-flow="planning-stem" className={styles.planningFlow} data-active={selected==="decision"} markerEnd="none" />{[0,1,2].map(index=><path key={index} data-forecast-flow={`scenario-${index}`} className={styles.planningFlow} data-active={selected==="decision"&&scenario===index} />)}</g>
    <g className={styles.flowLabels} textAnchor="middle"><text data-forecast-label="foundation">daily channel counts</text><text data-forecast-label="development">series</text><text data-forecast-label="backtest">historical simulations</text><text data-forecast-label="actuals">observed demand</text><text data-forecast-label="selection">selected channel rules</text></g>
  </svg>;
}
