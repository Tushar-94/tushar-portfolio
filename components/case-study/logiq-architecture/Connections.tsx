import { useEffect, useRef, type RefObject } from "react";
import type { DomainId } from "./content";
import styles from "./LogIQArchitecture.module.css";

type Point = { x: number; y: number };

export function Connections({ mapRef, id, selected }: { mapRef: RefObject<HTMLDivElement | null>; id: string; selected: DomainId }) {
  const svgRef = useRef<SVGSVGElement>(null);
  useEffect(() => {
    const map = mapRef.current, svg = svgRef.current;
    if (!map || !svg) return;
    let frame = 0, disposed = false;
    function draw() {
      if (!map || !svg) return;
      const origin = map.getBoundingClientRect();
      svg.setAttribute("viewBox", `0 0 ${origin.width} ${origin.height}`);
      const box = (name: string) => {
        const rect = map.querySelector(`[data-logiq-anchor="${name}"]`)!.getBoundingClientRect();
        return { left: rect.left - origin.left, right: rect.right - origin.left, top: rect.top - origin.top, bottom: rect.bottom - origin.top, x: rect.left + rect.width / 2 - origin.left, y: rect.top + rect.height / 2 - origin.top };
      };
      const path = (name: string, points: Point[]) => svg.querySelector(`[data-flow="${name}"]`)?.setAttribute("d", points.map((p,i) => `${i ? "L" : "M"}${p.x.toFixed(2)} ${p.y.toFixed(2)}`).join(" "));
      const label = (name: string, x: number, y: number) => { const n = svg.querySelector(`[data-flow-label="${name}"]`); n?.setAttribute("x", String(x)); n?.setAttribute("y", String(y)); };
      const agent = box("agent"), tools = box("tools");
      // Land on the center of the receiving border, not an inset content box.
      const agentStyle = getComputedStyle(map.querySelector('[data-logiq-anchor="agent"]')!);
      const toolsStyle = getComputedStyle(map.querySelector('[data-logiq-anchor="tools"]')!);
      const agentTop = agent.top + parseFloat(agentStyle.borderTopWidth) / 2;
      const agentRight = agent.right - parseFloat(agentStyle.borderRightWidth) / 2;
      const toolsLeft = tools.left + parseFloat(toolsStyle.borderLeftWidth) / 2;
      const request = box("request-out"), agentIn = box("agent-in");
      path("request", [{x:request.x,y:request.y+3},{x:request.x,y:(request.y+agentIn.y)/2},{x:agentIn.x,y:(request.y+agentIn.y)/2},{x:agentIn.x,y:agentTop}]);
      label("request", (request.x+agentIn.x)/2, (request.y+agentIn.y)/2-9);
      const call = box("agent-call"), dispatch = box("tool-call"), result = box("tool-result"), observe = box("agent-observe");
      const middle = (agent.right+tools.left)/2;
      path("invoke", [{x:call.right,y:call.y},{x:middle-8,y:call.y},{x:middle-8,y:dispatch.y},{x:toolsLeft,y:dispatch.y}]);
      path("return", [{x:result.left,y:result.y},{x:middle+8,y:result.y},{x:middle+8,y:observe.y},{x:agentRight,y:observe.y}]);
      label("invoke", middle, Math.min(call.y,dispatch.y)-11);
      label("return", middle, Math.max(observe.y,result.y)+16);
      const sql = box("sql-out"), sqlIn = box("sql-in"), rows = box("rows-out"), rowsIn = box("rows-in");
      path("sql", [{x:sql.x,y:sql.y+3},{x:sql.x,y:(sql.y+sqlIn.y)/2},{x:sqlIn.x,y:(sql.y+sqlIn.y)/2},{x:sqlIn.x,y:sqlIn.y-4}]);
      path("rows", [{x:rows.x,y:rows.y-3},{x:rows.x,y:(rows.y+rowsIn.y)/2},{x:rowsIn.x,y:(rows.y+rowsIn.y)/2},{x:rowsIn.x,y:rowsIn.y+4}]);
      label("sql",sql.x,(sql.y+sqlIn.y)/2-8); label("rows",rows.x,(rows.y+rowsIn.y)/2-8);
      const synthesis = box("synthesis-out"), evidence = box("evidence-in");
      path("synthesis",[{x:synthesis.x,y:synthesis.y+3},{x:synthesis.x,y:(synthesis.y+evidence.y)/2},{x:evidence.x,y:(synthesis.y+evidence.y)/2},{x:evidence.x,y:evidence.y-4}]);
      label("synthesis",evidence.x,(synthesis.y+evidence.y)/2-9);
      const findings = box("findings-out"), report = box("report-in");
      path("report",[{x:findings.x,y:findings.y+3},{x:findings.x,y:(findings.y+report.y)/2},{x:report.x,y:(findings.y+report.y)/2},{x:report.x,y:report.y-4}]);
      label("report",report.x,(findings.y+report.y)/2-9);
      svg.dataset.ready = "true";
    }
    const schedule = () => { if (!disposed) { cancelAnimationFrame(frame); frame = requestAnimationFrame(draw); } };
    const observer = new ResizeObserver(schedule); observer.observe(map);
    map.querySelectorAll("[data-logiq-anchor]").forEach(n => observer.observe(n));
    schedule(); document.fonts.ready.then(schedule);
    return () => { disposed = true; observer.disconnect(); cancelAnimationFrame(frame); };
  }, [mapRef]);

  const active = (...ids: DomainId[]) => ids.includes(selected);
  return <svg ref={svgRef} className={styles.connections} fill="none" aria-hidden="true">
    <defs>
      {/* The filled tip is the endpoint; its body bridges the final dotted gap. */}
      <marker id={`${id}-arrow`} viewBox="0 0 6 6" markerWidth="6" markerHeight="6" markerUnits="userSpaceOnUse" refX="6" refY="3" orient="auto">
        <path d="M0 0 6 3 0 6Z" fill="context-stroke" stroke="none" />
      </marker>
    </defs>
    <g stroke="currentColor" strokeWidth="1" markerEnd={`url(#${id}-arrow)`}>
      <path data-flow="request" data-active={active("request","agent")} className={styles.controlFlow} />
      <path data-flow="invoke" data-active={active("agent","tools")} className={styles.controlFlow} />
      <path data-flow="return" data-active={active("agent","tools","evidence")} />
      <path data-flow="sql" data-active={active("tools","data")} className={styles.controlFlow} />
      <path data-flow="rows" data-active={active("tools","data")} />
      <path data-flow="synthesis" data-active={active("agent","evidence")} />
      <path data-flow="report" data-active={active("evidence","reporting")} />
    </g>
    <g className={styles.flowLabels} textAnchor="middle"><text data-flow-label="request">question + role</text><text data-flow-label="invoke">invoke</text><text data-flow-label="return">return</text><text data-flow-label="sql">SQL ↓</text><text data-flow-label="rows">rows ↑</text><text data-flow-label="synthesis">interpreted evidence</text><text data-flow-label="report">findings + sources</text></g>
  </svg>;
}
