import { useEffect, useRef, type RefObject } from "react";
import type { DomainId } from "./content";
import styles from "./VisionArchitecture.module.css";

type Point = { x: number; y: number };
const flows: { name: string; domains: DomainId[]; offline?: boolean }[] = [
  { name: "input", domains: ["data", "backbone"] },
  { name: "features", domains: ["backbone", "aspp"] },
  ...Array.from({ length: 5 }, (_, i) => ({ name: `split-${i}`, domains: ["aspp"] as DomainId[] })),
  ...Array.from({ length: 5 }, (_, i) => ({ name: `merge-${i}`, domains: ["aspp"] as DomainId[] })),
  { name: "classify", domains: ["aspp", "classifier"] },
  { name: "prediction", domains: ["classifier", "outputs"] },
  { name: "evaluate", domains: ["outputs", "evaluation"], offline: true },
];

export function Connections({ mapRef, id, selected, branch }: { mapRef: RefObject<HTMLDivElement | null>; id: string; selected: DomainId; branch: number }) {
  const ref = useRef<SVGSVGElement>(null);
  useEffect(() => {
    const map = mapRef.current, svg = ref.current;
    if (!map || !svg) return;
    let frame = 0, disposed = false;
    function draw() {
      if (!map || !svg) return;
      const origin = map.getBoundingClientRect();
      svg.setAttribute("viewBox", `0 0 ${origin.width} ${origin.height}`);
      const box = (name: string) => {
        const n = map.querySelector(`[data-vision-anchor="${name}"]`)!;
        const r = n.getBoundingClientRect(), s = getComputedStyle(n);
        return { left: r.left-origin.left+parseFloat(s.borderLeftWidth)/2, right: r.right-origin.left-parseFloat(s.borderRightWidth)/2, top: r.top-origin.top+parseFloat(s.borderTopWidth)/2, bottom: r.bottom-origin.top-parseFloat(s.borderBottomWidth)/2, x: r.left+r.width/2-origin.left, y: r.top+r.height/2-origin.top };
      };
      const path = (name: string, points: Point[]) => svg.querySelector(`[data-vision-flow="${name}"]`)?.setAttribute("d", points.map((p,i)=>`${i?"L":"M"}${p.x.toFixed(2)} ${p.y.toFixed(2)}`).join(" "));
      const down = (name: string, a: ReturnType<typeof box>, b: ReturnType<typeof box>) => {
        const y = (a.bottom+b.top)/2;
        path(name,[{x:a.x,y:a.bottom},{x:a.x,y},{x:b.x,y},{x:b.x,y:b.top}]);
      };
      const input=box("data"), model=box("model"), backbone=box("backbone"), aspp=box("aspp-input"), fusion=box("fusion"), classifier=box("classifier"), outputs=box("outputs"), evaluation=box("evaluation");
      down("input",input,model);
      down("features",backbone,aspp);
      down("classify",fusion,classifier);
      down("prediction",model,box("output-domain"));
      const branches = Array.from({length:5},(_,i)=>box(`branch-${i}`));
      const vertical = branches[1].top > branches[0].bottom;
      const top = (aspp.bottom+branches[0].top)/2;
      const bottom = (branches[4].bottom+fusion.top)/2;
      const wrap = box("branches");
      branches.forEach((b,i)=>{
        if (vertical) {
          const left=(wrap.left+b.left)/2, right=(wrap.right+b.right)/2;
          path(`split-${i}`,[{x:aspp.x,y:aspp.bottom},{x:aspp.x,y:top},{x:left,y:top},{x:left,y:b.y},{x:b.left,y:b.y}]);
          path(`merge-${i}`,[{x:b.right,y:b.y},{x:right,y:b.y},{x:right,y:bottom},{x:fusion.x,y:bottom},{x:fusion.x,y:fusion.top}]);
        } else {
          path(`split-${i}`,[{x:aspp.x,y:aspp.bottom},{x:aspp.x,y:top},{x:b.x,y:top},{x:b.x,y:b.top}]);
          path(`merge-${i}`,[{x:b.x,y:b.bottom},{x:b.x,y:bottom},{x:fusion.x,y:bottom},{x:fusion.x,y:fusion.top}]);
        }
      });
      if(evaluation.top >= outputs.bottom) down("evaluate",outputs,evaluation);
      else {
        const x=(outputs.right+evaluation.left)/2;
        path("evaluate",[{x:outputs.right,y:outputs.y},{x,y:outputs.y},{x,y:evaluation.y},{x:evaluation.left,y:evaluation.y}]);
      }
      svg.dataset.ready="true";
    }
    const schedule=()=>{if(!disposed){cancelAnimationFrame(frame);frame=requestAnimationFrame(draw);}};
    const observer=new ResizeObserver(schedule);
    observer.observe(map);
    map.querySelectorAll("[data-vision-anchor]").forEach(n=>observer.observe(n));
    document.fonts.ready.then(schedule);
    schedule();
    return()=>{disposed=true;observer.disconnect();cancelAnimationFrame(frame);};
  },[mapRef]);
  return <svg ref={ref} className={styles.connections} fill="none" aria-hidden="true">
    <defs><marker id={`${id}-arrow`} viewBox="0 0 6 6" markerWidth="6" markerHeight="6" markerUnits="userSpaceOnUse" refX="6" refY="3" orient="auto"><path d="M0 0 6 3 0 6Z" fill="context-stroke" stroke="none" /></marker></defs>
    <g stroke="currentColor" strokeWidth="1" markerEnd={`url(#${id}-arrow)`}>
      {flows.map(flow=><path key={flow.name} data-vision-flow={flow.name} data-active={flow.domains.includes(selected)} data-branch-selected={flow.name===`split-${branch}`||flow.name===`merge-${branch}`} className={flow.offline?styles.offlineFlow:undefined} />)}
    </g>
  </svg>;
}
