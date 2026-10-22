import styles from "./ForecastArchitecture.module.css";

export function StayExpansion() {
  return <svg viewBox="0 0 240 114" className={styles.expansion} role="img" aria-label="Illustrative stay: arrival on day 1 and departure on day 4 produces occupied nights on days 1, 2 and 3; departure day is excluded.">
    <path d="M25 20H215" fill="none" stroke="#999" />
    <path d="M25 16v8M215 16v8" stroke="#555" />
    <text x="25" y="11" fontSize="11" fill="#555" fontFamily="monospace">ARRIVE</text><text x="215" y="11" textAnchor="end" fontSize="11" fill="#555" fontFamily="monospace">DEPART</text>
    {[0,1,2,3].map(i=><g key={i}><path d={`M${35+i*56} 23V41`} stroke="#aaa" strokeDasharray={i===3?"2 3":undefined} /><rect x={15+i*56} y="44" width="40" height="37" rx="2" fill={i===3?"#fff":"#333"} stroke={i===3?"#aaa":"#333"} strokeDasharray={i===3?"3 3":undefined} /><text x={35+i*56} y="67" textAnchor="middle" fontSize="13" fill={i===3?"#666":"#fff"} fontFamily="monospace">{i+1}</text></g>)}
    <text x="91" y="101" textAnchor="middle" fontSize="11" fill="#555" fontFamily="monospace">3 occupied nights</text><text x="203" y="101" textAnchor="middle" fontSize="10" fill="#666" fontFamily="monospace">excluded</text>
  </svg>;
}

export function SeriesSchema() {
  return <svg viewBox="0 0 140 38" className={styles.seriesSchema} aria-hidden="true" fill="none"><path d="M5 30h130" stroke="currentColor" opacity=".5" />{[0,1,2,3,4].map(i=><g key={i}><path d={`M${12+i*29} 26v8`} stroke="currentColor" opacity=".5" /><text x={12+i*29} y="17" textAnchor="middle" fontSize="10" fill="currentColor" fontFamily="monospace">{["y₁","y₂","y₃","…","yₜ"][i]}</text></g>)}</svg>;
}
