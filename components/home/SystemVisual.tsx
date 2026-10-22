"use client";

import { useEffect, useRef, type PointerEvent } from "react";
import styles from "./Home.module.css";

export function SystemVisual() {
  const ref = useRef<SVGSVGElement>(null);
  const frame = useRef<number | null>(null);
  const allowed = useRef(false);
  const target = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const preference = window.matchMedia("(prefers-reduced-motion: no-preference) and (pointer: fine)");
    function updatePreference() { allowed.current = preference.matches; if (!preference.matches) reset(); }
    updatePreference();
    preference.addEventListener("change", updatePreference);
    return () => { preference.removeEventListener("change", updatePreference); if (frame.current !== null) cancelAnimationFrame(frame.current); };
  }, []);

  function move(event: PointerEvent<HTMLElement>) {
    if (event.pointerType !== "mouse" || !allowed.current) return;
    const bounds = event.currentTarget.getBoundingClientRect();
    target.current = {
      x: Math.max(-1, Math.min(1, (event.clientX - bounds.left) / bounds.width * 2 - 1)) * 5,
      y: Math.max(-1, Math.min(1, (event.clientY - bounds.top) / bounds.height * 2 - 1)) * 4,
    };
    if (frame.current !== null) return;
    frame.current = requestAnimationFrame(() => {
      const { x, y } = target.current;
      ref.current?.style.setProperty("--signal-x", `${x}px`);
      ref.current?.style.setProperty("--signal-y", `${y}px`);
      ref.current?.style.setProperty("--signal-rx", `${-y * .22}deg`);
      ref.current?.style.setProperty("--signal-ry", `${x * .22}deg`);
      frame.current = null;
    });
  }
  function reset() {
    if (frame.current !== null) cancelAnimationFrame(frame.current);
    frame.current = null;
    ref.current?.style.setProperty("--signal-x", "0px");
    ref.current?.style.setProperty("--signal-y", "0px");
    ref.current?.style.setProperty("--signal-rx", "0deg");
    ref.current?.style.setProperty("--signal-ry", "0deg");
  }
  return (
    <figure className={`${styles.systemVisual} ${styles.entrance}`} onPointerMove={move} onPointerLeave={reset} onPointerCancel={reset}>
      <svg ref={ref} viewBox="0 0 540 200" role="img" aria-label="Conceptual intelligent system: inputs connect to a model, evaluation, and useful outputs." className={styles.systemSvg}>
        <g className={styles.signalPaths} fill="none" stroke="#c4c4c4" strokeWidth="1">
          <path d="M42 46h68l58 54M42 100h126M42 154h68l58-54M268 100h56m-6-4 6 4-6 4M410 100h79m-6-4 6 4-6 4" />
          <path d="M218 58V28h150v35M368 137v35H218v-30" strokeDasharray="3 5" />
          <rect x="168" y="58" width="100" height="84" rx="12" fill="#fafafa" /><rect x="324" y="63" width="86" height="74" rx="10" fill="#fafafa" />
        </g>
        <g fill="#fafafa" stroke="#b0b0b0"><circle cx="42" cy="46" r="5" /><circle cx="42" cy="100" r="5" /><circle cx="42" cy="154" r="5" /></g>
        <g stroke="#858585" fill="none"><path d="m193 83 25 17 25-17m-50 34 25-17 25 17m-50-34v34m50-34v34" />
          <circle cx="193" cy="83" r="3" fill="#fafafa" /><circle cx="193" cy="117" r="3" fill="#fafafa" /><circle cx="243" cy="83" r="3" fill="#fafafa" /><circle cx="243" cy="117" r="3" fill="#fafafa" />
        </g>
        <circle cx="218" cy="100" r="5" fill="#111" />
        <path d="m352 100 10 10 20-22" stroke="#111" strokeWidth="1.5" fill="none" />
        <rect x="485" y="84" width="32" height="32" rx="8" fill="#111" /><path d="M494 100h14m-5-5 5 5-5 5" stroke="#fafafa" fill="none" />
        <g fontFamily="var(--font-geist-mono), monospace" fontSize="10" fill="#666" textAnchor="middle"><text x="42" y="182">INPUTS</text><text x="218" y="162">MODEL</text><text x="368" y="158">EVALUATE</text><text x="501" y="140">OUTPUT</text></g>
        <g className={styles.signalMarkers} fill="#111"><circle cx="103" cy="100" r="2.5" /><circle cx="295" cy="100" r="2.5" /><circle cx="449" cy="100" r="2.5" /></g>
      </svg>
      <figcaption><span className={styles.visualStatus} aria-hidden="true" />Intelligence is a system, not a single model.<span>Conceptual diagram</span></figcaption>
    </figure>
  );
}
