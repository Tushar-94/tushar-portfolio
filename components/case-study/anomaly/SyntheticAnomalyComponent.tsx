"use client";

import { useId } from "react";

type SyntheticAnomalyComponentProps = {
  roi?: boolean;
  heatmap?: boolean;
  opacity?: number;
  highlight?: boolean;
  decision?: "review" | "below";
};

const plate = "M160 87H480L500 107V137H535Q546 137 546 148V282Q546 293 535 293H500V323L480 343H160L140 323V293H105Q94 293 94 282V148Q94 137 105 137H140V107Z";

export function SyntheticAnomalyComponent({ roi = true, heatmap = true, opacity = 0.55, highlight = true, decision }: SyntheticAnomalyComponentProps) {
  const id = useId();
  return (
    <svg role="img" aria-label="Synthetic industrial component with illustrative anomaly inspection layers. Not actual DINOv2 inference." viewBox="0 0 640 430" className="block h-auto w-full">
      <defs>
        <pattern id={`${id}-grid`} width="32" height="32" patternUnits="userSpaceOnUse"><path d="M32 0H0V32" fill="none" stroke="#e3e5e1" strokeWidth="0.6" /></pattern>
        <linearGradient id={`${id}-metal`} x2="0.8" y2="1"><stop stopColor="#f2f3ee" /><stop offset="1" stopColor="#d6dcd4" /></linearGradient>
        <radialGradient id={`${id}-heat`}><stop stopColor="#a9532f" /><stop offset="0.35" stopColor="#d29c54" /><stop offset="0.65" stopColor="#7baca5" /><stop offset="1" stopColor="#7baca5" stopOpacity="0" /></radialGradient>
        <clipPath id={`${id}-roi`}><rect x="153" y="98" width="334" height="234" rx="16" /></clipPath>
      </defs>
      <rect width="640" height="430" fill="#f5f6f3" />
      <rect x="24" y="24" width="592" height="382" fill={`url(#${id}-grid)`} />
      <path d={plate} transform="translate(0 9)" fill="#bcc5b9" stroke="#929d8e" strokeWidth="1.2" />
      <path d={plate} fill={`url(#${id}-metal)`} stroke="#8e998b" strokeWidth="1.5" />
      <rect x="177" y="120" width="286" height="190" rx="18" fill="#e1e6dc" stroke="#a3ad9d" strokeWidth="1.5" />
      <rect x="198" y="141" width="244" height="148" rx="10" fill="#d9e0d4" stroke="#b3bdad" />
      <path d="M198 153v125q0 11 11 11h221" fill="none" stroke="#f5f7f1" strokeWidth="2" />
      {[218, 248, 278, 308, 338, 368, 398, 428].map(x => <path key={x} d={`M${x} 152v124`} stroke="#c7d0c0" strokeWidth="2.5" />)}
      {[122, 518].flatMap(x => [167, 263].map(y => <g key={`${x}-${y}`}><circle cx={x} cy={y} r="18" fill="#d2dacd" stroke="#a5b09f" /><circle cx={x} cy={y} r="8" fill="#f5f6f3" stroke="#8e9b87" /></g>))}
      <path d="M343 212q18-13 40 3m-34 10q16-11 32 1m-27 9q12-5 21 1" fill="none" stroke="#acb9a4" strokeWidth="1.5" strokeLinecap="round" />
      <g data-layer="roi" data-visible={roi} opacity={roi ? 1 : 0} className="transition-opacity duration-150">
        <path d="M24 24H616V406H24ZM153 114v202q0 16 16 16h302q16 0 16-16V114q0-16-16-16H169q-16 0-16 16Z" fill="#26372a" fillOpacity="0.12" fillRule="evenodd" />
        <rect x="153" y="98" width="334" height="234" rx="16" fill="none" stroke="#50746b" strokeWidth="1.6" strokeDasharray="6 4" />
        <path d="M153 84V61H76" fill="none" stroke="#50746b" />
        <text x="76" y="51" fill="#3e6259" fontFamily="monospace" fontSize="12">REGION OF INTEREST</text>
      </g>
      <g data-layer="heatmap" data-visible={heatmap} opacity={heatmap ? opacity : 0} clipPath={`url(#${id}-roi)`} className="transition-opacity duration-150">
        <ellipse cx="365" cy="225" rx="76" ry="58" fill={`url(#${id}-heat)`} />
        <ellipse cx="327" cy="205" rx="45" ry="34" fill={`url(#${id}-heat)`} opacity="0.35" />
      </g>
      <g data-layer="highlight" data-visible={highlight && heatmap} opacity={highlight && heatmap ? 1 : 0} className="transition-opacity duration-150">
        <ellipse cx="363" cy="225" rx="48" ry="33" fill="none" stroke="#9a542d" strokeWidth="1.5" strokeDasharray="4 4" />
        <path d="M405 246l55 109h102" fill="none" stroke="#9a542d" />
        <circle cx="405" cy="246" r="2.5" fill="#9a542d" />
        <text x="416" y="377" fill="#884929" fontFamily="monospace" fontSize="12">SUSPICIOUS REGION</text>
      </g>
      {decision && <g data-layer="decision"><rect x="374" y="32" width="228" height="32" rx="6" fill={decision === "review" ? "#f4e9db" : "#e0ece8"} stroke={decision === "review" ? "#b98552" : "#71978a"} /><text x="388" y="52" fill={decision === "review" ? "#7c4924" : "#365f53"} fontFamily="monospace" fontSize="11">{decision === "review" ? "ILLUSTRATIVE: REVIEW" : "ILLUSTRATIVE: BELOW THRESHOLD"}</text></g>}
    </svg>
  );
}
