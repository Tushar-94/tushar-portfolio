import styles from "./AnomalyArchitecture.module.css";

export function ComponentDrawing({ collection = false, inspection = false }: { collection?: boolean; inspection?: boolean }) {
  return <svg className={styles.component} viewBox="0 0 128 112" aria-hidden="true" fill="none">
    {collection && <><rect x="17" y="11" width="96" height="88" rx="3" fill="#eee" stroke="#ccc" /><rect x="10" y="17" width="96" height="88" rx="3" fill="#f5f5f5" stroke="#bbb" /></>}
    <rect x="3" y="23" width="96" height="83" rx="3" fill="#fafafa" stroke="#aaa" />
    <path d="M27 36h48l12 12v33L75 93H27L15 81V48Z" fill="#ddd" stroke="#888" />
    <circle cx="51" cy="65" r="20" fill="#fafafa" stroke="#888" /><circle cx="51" cy="65" r="12" stroke="#bbb" />
    {[[26,47],[76,47],[26,82],[76,82]].map(([x,y])=><circle key={`${x}-${y}`} cx={x} cy={y} r="3" fill="#999" />)}
    {inspection && <path d="m72 73-5 5 3 5-5 4" stroke="#333" strokeWidth="1.5" />}
    <path d="M2 13V5h8m104 8V5h-8M114 99v8h-8" stroke="#bbb" />
  </svg>;
}

export function PatchGrid({ masked = false, variant = "reference" }: { masked?: boolean; variant?: "reference" | "inspection" | "anomaly" }) {
  return <svg className={styles.patchGrid} viewBox="0 0 72 72" aria-hidden="true">
    {Array.from({length: 64},(_,i)=>{
      const x=i%8,y=Math.floor(i/8),foreground=(x-3.5)**2+(y-3.5)**2<12;
      const anomaly=variant==="anomaly"&&x>=4&&x<=6&&y>=4&&y<=6;
      const shade=variant==="anomaly" ? (anomaly ? 75+(x+y)%3*28 : 230) : 170+(x*7+y*11+(variant==="inspection"?19:0))%65;
      return <rect key={i} x={x*9+.5} y={y*9+.5} width="7.5" height="7.5" fill={masked&&!foreground?"#fafafa":`rgb(${shade},${shade},${shade})`} stroke={masked&&!foreground?"#ddd":"none"} strokeDasharray={masked&&!foreground?"1 2":undefined} />;
    })}
    {masked&&<path d="M19 1h34l18 18v34L53 71H19L1 53V19Z" fill="none" stroke="#666" strokeDasharray="2 2" />}
  </svg>;
}
