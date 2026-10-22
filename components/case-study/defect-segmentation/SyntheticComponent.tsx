"use client";

import { useId } from "react";
import type { DefectClass } from "@/data/defectSegmentation";

type SyntheticComponentProps = {
  defect?: DefectClass | "both";
  masks?: boolean;
  boxes?: boolean;
  opacity?: number;
  transformed?: boolean;
  polygon?: boolean;
  labels?: boolean;
};

const shortShot = "154,108 172,86 190,86 183,101 195,112 181,126 190,139 173,153 154,145";
const sinkMark = "320,218 332,207 353,201 378,204 396,215 405,232 399,250 382,263 361,267 339,261 323,246 316,231";
const body = "M172 86H468L486 104V133H526Q540 133 540 147V283Q540 297 526 297H486V326L468 344H172L154 326V297H114Q100 297 100 283V147Q100 133 114 133H154V104Z";

export function SyntheticComponent({ defect = "both", masks = true, boxes = true, opacity = 0.45, transformed = false, polygon = false, labels = true }: SyntheticComponentProps) {
  const id = useId();
  const shortSelected = defect === "both" || defect === "short-shot";
  const sinkSelected = defect === "both" || defect === "sink-mark";

  return (
    <svg viewBox="0 0 640 430" role="img" aria-label={`Synthetic industrial component illustration${transformed ? " with an illustrative geometric transformation" : ""}. ${shortSelected ? "Short Shot" : ""}${defect === "both" ? " and " : ""}${sinkSelected ? "Sink Mark" : ""}. ${masks ? "Illustrative masks visible." : "Masks hidden."} ${boxes ? "Illustrative boxes visible." : "Boxes hidden."}`} className="block h-auto w-full">
      <defs>
        <pattern id={`${id}-grid`} width="32" height="32" patternUnits="userSpaceOnUse"><path d="M32 0H0V32" fill="none" stroke="#e6e7e4" strokeWidth="0.6" /></pattern>
        <linearGradient id={`${id}-surface`} x1="0" x2="0.8" y2="1"><stop stopColor="#f1f1ed" /><stop offset="1" stopColor="#d9dcd8" /></linearGradient>
        <radialGradient id={`${id}-depression`}><stop stopColor="#aeb5b1" /><stop offset="0.65" stopColor="#c8ceca" /><stop offset="1" stopColor="#d9ded9" /></radialGradient>
      </defs>
      <rect width="640" height="430" fill="#f5f6f3" />
      <rect x="24" y="24" width="592" height="382" fill={`url(#${id}-grid)`} />
      <g fill="none" stroke="#b9bdb7" strokeWidth="1">
        <path d="M24 48V24h24m544 0h24v24M24 382v24h24m544 0h24v-24" />
        <path d="M306 32h28M320 24v16M306 398h28M320 390v16" />
      </g>
      <g transform={transformed ? "translate(8 -2) rotate(-8 320 215)" : undefined}>
        <path d={body} transform="translate(0 9)" fill="#c4c9c3" stroke="#969e97" strokeWidth="1.2" />
        <path d={body} fill={`url(#${id}-surface)`} stroke="#828b83" strokeWidth="1.5" />
        <rect x="185" y="118" width="270" height="194" rx="22" fill="#e2e6e0" stroke="#9aa39a" strokeWidth="1.5" />
        <rect x="208" y="141" width="224" height="148" rx="12" fill="#d7ddd6" stroke="#aab2a9" />
        <path d="M208 153v124q0 12 12 12h200" fill="none" stroke="#f8faf5" strokeWidth="2" />
        {[228, 258, 288, 318, 348, 378, 408].map(x => <path key={x} d={`M${x} 151v44m0 42v42`} stroke="#c0c8be" strokeWidth="3" />)}
        {[132, 508].flatMap(x => [166, 264].map(y => <g key={`${x}-${y}`}><circle cx={x} cy={y} r="19" fill="#d1d7ce" stroke="#9aa399" /><circle cx={x} cy={y} r="9" fill="#f5f6f3" stroke="#879184" strokeWidth="1.5" /><path d={`M${x - 12} ${y + 13}q12 7 24 0`} fill="none" stroke="#f5f8f2" /></g>))}
        <path d="M192 103h250m-250 223h250" stroke="#b5beb2" strokeWidth="2" strokeLinecap="round" />
        <polygon points={shortShot} fill="#f5f6f3" />
        <path d="M190 86l-7 15 12 11-14 14 9 13-17 14-19-8" fill="none" stroke="#949b90" strokeWidth="1.5" />
        <path d="M320 218c12-21 53-24 76-3 23 22 4 46-35 52-29 2-53-21-41-49Z" fill={`url(#${id}-depression)`} stroke="#b2bcb0" />
        <path d="M326 242q31 29 69-1" fill="none" stroke="#f0f3eb" strokeWidth="2" />
        <g data-overlay="short-shot-mask" data-visible={masks && shortSelected} opacity={masks && shortSelected ? opacity : 0} className="transition-opacity duration-150"><polygon points={shortShot} fill="#ad5636" stroke="#ad5636" strokeWidth="2" /></g>
        <g data-overlay="sink-mark-mask" data-visible={masks && sinkSelected} opacity={masks && sinkSelected ? opacity : 0} className="transition-opacity duration-150"><polygon points={sinkMark} fill="#337989" stroke="#337989" strokeWidth="2" /></g>
        <g data-overlay="short-shot-box" data-visible={boxes && shortSelected} opacity={boxes && shortSelected ? 1 : 0} className="transition-opacity duration-150"><rect x="145" y="77" width="60" height="86" rx="3" fill="none" stroke="#ad5636" strokeWidth="1.8" strokeDasharray="5 4" /></g>
        <g data-overlay="sink-mark-box" data-visible={boxes && sinkSelected} opacity={boxes && sinkSelected ? 1 : 0} className="transition-opacity duration-150"><rect x="307" y="192" width="108" height="84" rx="3" fill="none" stroke="#337989" strokeWidth="1.8" strokeDasharray="5 4" /></g>
        {polygon && <g><polygon points={shortShot} fill="#ad5636" fillOpacity="0.18" stroke="#ad5636" strokeWidth="2" />{shortShot.split(" ").map(point => { const [x, y] = point.split(","); return <circle key={point} cx={x} cy={y} r="3" fill="#f5f6f3" stroke="#ad5636" strokeWidth="1.5" />; })}</g>}
      </g>
      {labels && <g fontFamily="monospace" fontSize="12" fontWeight="500">
        {shortSelected && <g><path d="M174 77V56H66" fill="none" stroke="#ad5636" /><circle cx="174" cy="77" r="2.5" fill="#ad5636" /><text x="66" y="47" fill="#88442c">SHORT SHOT</text></g>}
        {sinkSelected && <g><path d="M405 262l51 89h110" fill="none" stroke="#337989" /><circle cx="405" cy="262" r="2.5" fill="#337989" /><text x="470" y="373" fill="#28616e">SINK MARK</text></g>}
      </g>}
    </svg>
  );
}
