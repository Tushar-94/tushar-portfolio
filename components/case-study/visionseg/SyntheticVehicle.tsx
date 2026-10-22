"use client";

import { useId } from "react";
import { semanticClasses, type SegmentationMode, type SemanticClass } from "@/data/visionseg";

const silhouette = "M130 254l21-46q5-10 26-15l78-12 67-55q15-10 40-10h137q23 0 40 19l49 46 62 12q30 5 47 31l14 32-3 32h-56q-4-43-44-43t-44 43H299q-5-43-45-43t-47 43h-64q-14-6-13-34Z";
const rearDoor = "M305 185l34-52h79v151H301q-3-28-14-36l3-48Z";
const frontDoor = "M425 133h68q20 0 33 15l32 37-6 99H425Z";
const predictedRearDoor = "M305 185l34-52h99v151H301q-3-28-14-36l3-48Z";
const predictedFrontDoor = "M438 133h55q20 0 33 15l32 37-6 99H438Z";
const frontFender = "M560 188l86 10q33 7 49 31l9 26-2 31h-50q-3-41-44-41-30 0-43 27l-11-5Z";
const rearFender = "M153 214l132-22 13 23-4 40q-26-20-53-8-24 10-34 40h-64q-14-7-11-33Z";

export function SyntheticVehicle({ mode = "overlay", opacity = 0.55, selectedClass, highlight = false }: { mode?: SegmentationMode; opacity?: number; selectedClass?: SemanticClass; highlight?: boolean }) {
  const id = useId();
  const prediction = mode === "prediction" || mode === "overlay";
  const layerOpacity = mode === "original" ? 0 : mode === "overlay" ? opacity : 1;
  const parts = [
    { id: "rear-door", path: prediction ? predictedRearDoor : rearDoor },
    { id: "front-door", path: prediction ? predictedFrontDoor : frontDoor },
    { id: "front-fender", path: frontFender },
    { id: "rear-fender", path: rearFender },
  ];
  const active = (part: string) => highlight && mode !== "original" && selectedClass === part;

  return (
    <svg role="img" aria-label={`Original synthetic vehicle. ${mode === "original" ? "No semantic overlay." : "Conceptual semantic regions, not model output."}`} viewBox="0 0 800 430" className="block h-auto w-full">
      <defs>
        <linearGradient id={`${id}-body`} x2="0" y2="1"><stop stopColor="#f1f2ee" /><stop offset="1" stopColor="#d1d6cf" /></linearGradient>
        <pattern id={`${id}-grid`} width="36" height="36" patternUnits="userSpaceOnUse"><path d="M36 0H0V36" fill="none" stroke="#e3e6e1" strokeWidth="0.5" /></pattern>
        <mask id={`${id}-background`}><rect width="800" height="430" fill="white" />{parts.map(part => <path key={part.id} d={part.path} fill="black" />)}<rect x="378" y="201" width="24" height="8" rx="3" fill="black" /><rect x="501" y="201" width="24" height="8" rx="3" fill="black" /></mask>
      </defs>
      <rect width="800" height="430" fill="#f5f6f2" />
      <rect x="24" y="24" width="752" height="382" fill={`url(#${id}-grid)`} />
      <path d="M69 322h664M69 328v-12m664 12v-12" stroke="#c9cec5" />
      <path d={silhouette} fill={`url(#${id}-body)`} stroke="#7e887b" strokeWidth="1.5" />
      <path d="M279 179l57-45q9-5 24-5h57v50Zm147-50h68q15 0 28 14l31 36H426Z" fill="#7d8d8d" stroke="#5e7070" strokeWidth="1.2" />
      <path d="M308 191l-8 91m123-152v156m136-94-7 90" fill="none" stroke="#8e9989" strokeWidth="1.3" />
      <path d="M154 229h133m17 5h248m15-4h126M301 276h253" stroke="#b5beb0" fill="none" />
      <path d="M680 211l16 17h-31l-8-13Z" fill="#edf0df" stroke="#afb89f" />
      <path d="M148 218l20-5-5 13h-18Z" fill="#b9a18c" />
      <rect x="378" y="201" width="24" height="8" rx="3" fill="#727d70" />
      <rect x="501" y="201" width="24" height="8" rx="3" fill="#727d70" />
      <path d="M541 177h19l12 14h-22Z" fill="#939e8d" stroke="#73806e" />
      {[254, 608].map(x => <g key={x}><circle cx={x} cy="288" r="37" fill="#414a40" /><circle cx={x} cy="288" r="25" fill="#bdc5b6" stroke="#7a8770" strokeWidth="2" /><circle cx={x} cy="288" r="9" fill="#7f8d75" />{[0, 60, 120].map(angle => <path key={angle} d={`M${x} 267v42`} transform={`rotate(${angle} ${x} 288)`} stroke="#87947e" strokeWidth="3" />)}</g>)}
      <g data-layer="semantic" data-visible={mode !== "original"} opacity={layerOpacity} className="transition-opacity duration-150">
        <rect data-part="background" width="800" height="430" mask={`url(#${id}-background)`} fill={semanticClasses[0].color} stroke={active("background") ? "#28372c" : "none"} strokeWidth="3" />
        {parts.map(part => <path key={part.id} data-part={part.id} d={part.path} fill={semanticClasses.find(item => item.id === part.id)!.color} stroke={active(part.id) ? "#243327" : "#f5f6f2"} strokeWidth={active(part.id) ? 3 : 1} />)}
        <g data-part="door-handle" fill={semanticClasses[5].color} stroke={active("door-handle") ? "#243327" : "none"} strokeWidth="2">
          <rect x={prediction ? 383 : 378} y="201" width={prediction ? 16 : 24} height="8" rx="3" /><rect x="501" y="201" width="24" height="8" rx="3" />
        </g>
      </g>
      {highlight && mode !== "original" && <g data-layer="highlight" fill="none" stroke="#243327" strokeWidth="2" strokeDasharray="5 4">
        {selectedClass === "background" && <rect x="26" y="26" width="748" height="378" rx="2" />}
        {parts.filter(part => part.id === selectedClass).map(part => <path key={part.id} d={part.path} />)}
        {selectedClass === "door-handle" && <><rect x="372" y="195" width="36" height="20" rx="4" /><rect x="495" y="195" width="36" height="20" rx="4" /></>}
      </g>}
      <g fontFamily="monospace" fontSize="11" fill="#586356"><text x="35" y="49">SYNTHETIC VEHICLE · SIDE VIEW</text><text x="600" y="376">FRONT <tspan aria-hidden="true">→</tspan></text></g>
    </svg>
  );
}
