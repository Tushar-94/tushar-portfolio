import { useEffect, useRef, type RefObject } from "react";
import type { ArchitectureDomain } from "./architectureContent";
import styles from "./CopilotArchitecture.module.css";

type Point = { x: number; y: number };

// Measure real ports after layout. No viewport-specific or percentage node coordinates.
export function ArchitectureConnections({ mapRef, id, selected }: { mapRef: RefObject<HTMLDivElement | null>; id: string; selected: ArchitectureDomain }) {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    const map = mapRef.current;
    const svg = svgRef.current;
    if (!map || !svg) return;
    let frame = 0;
    let disposed = false;

    function draw() {
      if (!map || !svg) return;
      const origin = map.getBoundingClientRect();
      svg.setAttribute("viewBox", `0 0 ${origin.width} ${origin.height}`);
      const box = (name: string) => {
        const element = map.querySelector(`[data-architecture-anchor="${name}"]`);
        if (!element) throw new Error(`Missing architecture anchor: ${name}`);
        const rect = element.getBoundingClientRect();
        return { left: rect.left - origin.left, right: rect.right - origin.left, top: rect.top - origin.top, bottom: rect.bottom - origin.top, x: rect.left + rect.width / 2 - origin.left, y: rect.top + rect.height / 2 - origin.top };
      };
      const setPath = (name: string, points: Point[]) => {
        svg.querySelector(`[data-connection="${name}"]`)?.setAttribute("d", points.map((p, index) => `${index ? "L" : "M"}${p.x.toFixed(2)} ${p.y.toFixed(2)}`).join(" "));
      };
      const text = (name: string, x: number, y: number) => {
        const node = svg.querySelector(`[data-connection-label="${name}"]`);
        node?.setAttribute("x", x.toFixed(2)); node?.setAttribute("y", y.toFixed(2));
      };
      for (const [source, target, name, offset] of [["chunk-output", "lexical-input", "lexical-index", 0], ["vector-output", "dense-input", "vector-index", 12]] as const) {
        const a = box(source), b = box(target);
        const middle = a.y + (b.y - a.y) / 2 + offset;
        setPath(name, [{ x: a.x, y: a.y + 3 }, { x: a.x, y: middle }, { x: b.x, y: middle }, { x: b.x, y: b.y - 4 }]);
      }
      const decision = box("decision"), eligibility = box("eligibility"), query = box("query-domain"), retrieval = box("retrieval-domain");
      const controlX = query.right + (retrieval.left - query.right) / 2;
      setPath("control", [{ x: decision.right, y: decision.y }, { x: controlX, y: decision.y }, { x: controlX, y: eligibility.y }, { x: eligibility.left - 2, y: eligibility.y }]);
      text("control", controlX, eligibility.y - 12);

      const ranking = box("ranking"), evidence = box("evidence"), response = box("response-domain");
      const evidenceX = retrieval.right + (response.left - retrieval.right) / 2;
      setPath("evidence", [{ x: ranking.right, y: ranking.y }, { x: evidenceX, y: ranking.y }, { x: evidenceX, y: evidence.y }, { x: evidence.left - 2, y: evidence.y }]);
      text("evidence", evidenceX, evidence.y - 12);

      const runtime = box("runtime"), evaluation = box("evaluation-input");
      const offlineX = response.left - (response.left - retrieval.right) / 4;
      const offlineY = runtime.bottom + (evaluation.y - runtime.bottom) / 2;
      setPath("evaluation", [{ x: evidence.left, y: evidence.bottom - 8 }, { x: offlineX, y: evidence.bottom - 8 }, { x: offlineX, y: offlineY }, { x: evaluation.x, y: offlineY }, { x: evaluation.x, y: evaluation.y - 4 }]);
      text("evaluation", evaluation.x, offlineY - 10);
      svg.dataset.ready = "true";
    }

    const schedule = () => { if (!disposed) { cancelAnimationFrame(frame); frame = requestAnimationFrame(draw); } };
    const observer = new ResizeObserver(schedule);
    observer.observe(map);
    map.querySelectorAll("[data-architecture-anchor]").forEach(element => observer.observe(element));
    schedule();
    document.fonts.ready.then(schedule);
    return () => { disposed = true; observer.disconnect(); cancelAnimationFrame(frame); };
  }, [mapRef]);

  return <svg ref={svgRef} className={styles.connections} fill="none" aria-hidden="true">
    <defs><marker id={`${id}-arrow`} markerWidth="7" markerHeight="7" refX="6" refY="3.5" orient="auto"><path d="m1 1 4 2.5L1 6" stroke="currentColor" strokeWidth="1" fill="none" /></marker></defs>
    <g stroke="currentColor" strokeWidth="1" markerEnd={`url(#${id}-arrow)`}>
      <path data-connection="lexical-index" data-active={selected === "knowledge" || selected === "retrieval"} />
      <path data-connection="vector-index" data-active={selected === "knowledge" || selected === "retrieval"} />
      <path data-connection="control" className={styles.controlPath} data-active={selected === "query" || selected === "retrieval"} />
      <path data-connection="evidence" data-active={selected === "retrieval" || selected === "response"} />
      <path data-connection="evaluation" className={styles.evaluationPath} data-active={selected === "evaluation"} />
    </g>
    <g className={styles.connectionLabels} textAnchor="middle"><text data-connection-label="control">mode</text><text data-connection-label="evidence">top-K</text><text data-connection-label="evaluation">offline assessment</text></g>
  </svg>;
}
