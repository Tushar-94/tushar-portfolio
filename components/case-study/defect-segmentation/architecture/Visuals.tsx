import { useId } from "react";
import type { DefectClass } from "@/data/defectSegmentation";
import styles from "./DefectArchitecture.module.css";

type View = "image" | "annotation" | "box" | "mask";
const shortBoundary = "205,37 225,37 225,64 217,62 213,70 205,62 209,54 200,48";
const sinkBoundary = "112,101 120,91 139,87 156,93 162,106 154,120 135,125 119,119 111,110";

export function Specimen({ view = "image", defect = "short-shot" }: { view?: View; defect?: DefectClass }) {
  const id = useId();
  const short = defect === "short-shot";
  const region = short ? shortBoundary : sinkBoundary;
  return <svg className={styles.specimen} viewBox="0 0 280 170" aria-hidden="true" fill="none">
    <defs><pattern id={`${id}-hatch`} width="6" height="6" patternUnits="userSpaceOnUse"><path d="M-1 1 1-1M0 6 6 0M5 7 7 5" stroke="#555" strokeWidth="1" /></pattern></defs>
    <path d="M30 29h220v114H30Z" fill="#f5f5f5" stroke="#d5d5d5" />
    <path d="M58 37h167v34h21v50h-21v16H58v-16H37V71h21Z" fill="#ddd" stroke="#999" />
    <rect x="76" y="52" width="129" height="70" rx="8" fill="#eee" stroke="#bbb" />
    <path d="M91 62h99M91 73h99M91 84h99" stroke="#d2d2d2" />
    <circle cx="57" cy="96" r="8" fill="#fafafa" stroke="#999" /><circle cx="226" cy="96" r="8" fill="#fafafa" stroke="#999" />
    <polygon points={shortBoundary} fill="#fafafa" /><path d="m205 37-5 11 9 6-4 8 8 8 4-8 8 2" stroke="#999" />
    <polygon points={sinkBoundary} fill="#c5c5c5" stroke="#aaa" /><path d="M119 109q18 17 35 0" stroke="#eee" />
    {view === "annotation" && <g stroke="#444"><polygon points={shortBoundary} fill={`url(#${id}-hatch)`} /><polygon points={sinkBoundary} fill={`url(#${id}-hatch)`} />{[...shortBoundary.split(" "),...sinkBoundary.split(" ")].map((point,i)=>{const [x,y]=point.split(",");return <circle key={i} cx={x} cy={y} r="2" fill="#fff" />;})}</g>}
    {view === "mask" && <polygon points={region} fill={`url(#${id}-hatch)`} stroke="#333" strokeWidth="1.5" />}
    {view === "box" && <rect x={short?195:105} y={short?30:81} width={short?37:65} height={short?47:51} stroke="#333" strokeWidth="1.4" strokeDasharray="5 3" />}
    <path d="M20 36V19h17m206 0h17v17M20 134v17h17m206 0h17v-17" stroke="#bbb" />
  </svg>;
}

export function FeaturePyramid({ fused = false }: { fused?: boolean }) {
  return <svg className={styles.pyramid} viewBox="0 0 140 104" aria-hidden="true" fill="none">
    {(fused ? [0,1,2] : [2,1,0]).map((level,i)=>{
      const width=65-level*13,x=12+level*7,y=10+i*27;
      return <g key={level}><path d={`M${x+6} ${y-4}h${width}v21l-6 4`} stroke="#858585" /><rect x={x} y={y} width={width} height="21" fill={fused?"#555":"#444"} stroke="#a5a5a5" />{[1,2,3,4].map(n=><path key={n} d={`M${x+width*n/5} ${y}v21`} stroke="#858585" />)}<path d={`M${x} ${y+10.5}h${width}`} stroke="#858585" /><path d={`M${x+width+6} ${y+10.5}H90${fused?`M7 ${y+10.5}H${x}`:""}`} stroke="#aaa" />{fused&&<text x="100" y={y+5} fill="#ddd" fontSize="9" fontFamily="monospace">P{i+3}</text>}</g>;
    })}
    <path d={`M90 20.5v54M90 48h${fused?47:6}`} stroke="#bbb" />
    <circle data-defect-anchor={fused?"neck-out":"backbone-out"} cx={fused?137:96} cy="48" r="1.5" fill="#ddd" />
    {fused&&<><path d="M3 48h4M7 20.5v54" stroke="#bbb" /><circle data-defect-anchor="neck-in" cx="3" cy="48" r="1.5" fill="#ddd" /></>}
  </svg>;
}

export function MaskBasis() {
  return <svg className={styles.maskBasis} viewBox="0 0 100 58" aria-hidden="true" fill="none"><rect x="17" y="4" width="43" height="39" stroke="#999" /><rect x="11" y="10" width="43" height="39" fill="#303030" stroke="#aaa" /><rect x="5" y="16" width="43" height="39" fill="#444" stroke="#bbb" /><path d="M13 46 18 27 31 24 41 38 33 49Z" fill="#888" /><path d="M64 27h25m-4-3 4 3-4 3" stroke="#bbb" /><path d="M67 40h5m5 0h5m5 0h5" stroke="#bbb" /></svg>;
}
