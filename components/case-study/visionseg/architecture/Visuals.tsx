import { useId } from "react";
import styles from "./VisionArchitecture.module.css";

// Original, monochrome vector schematics. No dataset imagery or measured activations.
export function VehicleSample({ mask = false }: { mask?: boolean }) {
  const id = useId();
  return <svg viewBox="0 0 240 124" role="img" aria-label={mask ? "Synthetic semantic class map, authored illustration" : "Synthetic vehicle image, authored illustration"} className={styles.sample}>
    <defs><pattern id={`${id}-hatch`} width="5" height="5" patternUnits="userSpaceOnUse"><path d="m-1 1 6 6M4-1l2 2" stroke="#666" strokeWidth=".7" /></pattern></defs>
    <rect x=".5" y=".5" width="239" height="123" fill="#f5f5f5" stroke="#e5e5e5" />
    <path d="M21 81l10-21 41-8 24-22h52l27 23 32 10 12 19v14h-27a20 20 0 0 0-40 0H83a20 20 0 0 0-40 0H21Z" fill={mask ? "#dedede" : "#e6e6e6"} stroke="#666" />
    <path d="m79 52 21-17h20v17Zm47-17h20l20 17h-40Z" fill={mask ? "#f5f5f5" : "#999"} stroke="#666" />
    <path d="M78 57h42v36H85l-8-15Z" fill={mask ? `url(#${id}-hatch)` : "none"} stroke="#666" />
    <path d="M126 57h39l-4 36h-35Z" fill={mask ? "#777" : "none"} stroke="#666" />
    {[63,172].map(x=><g key={x}><circle cx={x} cy="95" r="14" fill="#555" /><circle cx={x} cy="95" r="7" fill="#ddd" /></g>)}
    <path d="M105 65h9m36 0h9M14 112h212" stroke="#777" strokeWidth="1.5" />
    {mask && <g fontFamily="monospace" fontSize="8"><text x="94" y="82">RD</text><text x="135" y="82" fill="#050505">FD</text><text x="7" y="15" fill="#666">BG</text></g>}
  </svg>;
}

export function FeatureMaps() {
  return <svg viewBox="0 0 200 80" aria-hidden="true" className={styles.featureMaps}>
    {[0,1,2].map(i=><g key={i} transform={`translate(${10+i*58} ${9+i*6})`}>
      {[2,1,0].map(z=><rect key={z} x={z*4} y={-z*3} width={48-i*9} height={54-i*10} fill={z ? "#eee" : "#fafafa"} stroke="#aaa" strokeWidth=".8" />)}
      {[0,1,2,3].map(n=><path key={n} d={`M${(n+1)*(48-i*9)/5} 0v${54-i*10}M0 ${(n+1)*(54-i*10)/5}h${48-i*9}`} stroke="#d0d0d0" strokeWidth=".7" />)}
    </g>)}
  </svg>;
}

export function SamplingGrid({ variant }: { variant: number }) {
  return <svg viewBox="0 0 58 58" aria-hidden="true" className={styles.sampling}>
    {Array.from({length:49},(_,i)=>{const x=i%7,y=Math.floor(i/7);const step=variant===0?0:Math.min(3,variant);const on=variant===4 || (step===0 ? x===3&&y===3 : [3-step,3,3+step].includes(x)&&[3-step,3,3+step].includes(y));return <rect key={i} x={x*8+2} y={y*8+2} width="6" height="6" fill={on ? variant===4 ? "#999" : "#555" : "#e7e7e7"} />;})}
  </svg>;
}

export function ConfusionSymbol() {
  return <svg viewBox="0 0 68 68" aria-hidden="true" className={styles.confusion}>
    {Array.from({length:16},(_,i)=><rect key={i} x={i%4*16+2} y={Math.floor(i/4)*16+2} width="13" height="13" fill={i%5===0?"#555":"#e5e5e5"} />)}
  </svg>;
}
