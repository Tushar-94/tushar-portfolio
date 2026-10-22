"use client";

import { useId, useRef, useState, type KeyboardEvent } from "react";
import { illustrativeConfusion, semanticClasses } from "@/data/visionseg";

function interpretation(actual: number, predicted: number) {
  if (actual === predicted) return "A diagonal cell illustrates agreement. It does not establish measured model accuracy.";
  if (actual === 5) return "Fine handle regions can blend into adjacent panels or background, motivating small-object review.";
  if ((actual === 1 && predicted === 2) || (actual === 2 && predicted === 1) || (actual === 3 && predicted === 4) || (actual === 4 && predicted === 3)) return "Visually similar components can share features. Review class-level confusion and difficult boundaries.";
  return "Ambiguous boundaries can move pixels into a neighboring class. Inspect examples before planning improvements.";
}

export function EvaluationExplorer() {
  const [cell, setCell] = useState({ actual: 1, predicted: 2 });
  const refs = useRef<(HTMLButtonElement | null)[]>([]);
  const id = useId();

  function selectClass(index: number) {
    const row = illustrativeConfusion[index];
    const candidate = row.reduce((best, value, column) => column !== index && value > row[best] ? column : best, index === 0 ? 1 : 0);
    setCell({ actual: index, predicted: candidate });
  }

  function moveCell(event: KeyboardEvent<HTMLButtonElement>, actual: number, predicted: number) {
    let row = actual;
    let column = predicted;
    switch (event.key) {
      case "ArrowRight": column = Math.min(5, predicted + 1); break;
      case "ArrowLeft": column = Math.max(0, predicted - 1); break;
      case "ArrowDown": row = Math.min(5, actual + 1); break;
      case "ArrowUp": row = Math.max(0, actual - 1); break;
      case "Home": column = 0; if (event.ctrlKey || event.metaKey) row = 0; break;
      case "End": column = 5; if (event.ctrlKey || event.metaKey) row = 5; break;
      default: return;
    }
    event.preventDefault();
    setCell({ actual: row, predicted: column });
    refs.current[row * 6 + column]?.focus();
  }

  return (
    <figure aria-labelledby={`${id}-title`} className="rounded-2xl border border-border bg-surface p-5 sm:p-6">
      <h3 id={`${id}-title`} className="text-sm font-semibold">Illustrative confusion matrix</h3>
      <p className="mt-2 text-xs leading-6 text-muted">Authored, row-normalized percentages. These synthetic values are not experiment results or a VisionSeg benchmark.</p>
      <div role="group" aria-label="Confusion matrix semantic class" className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-3">
        {semanticClasses.map((item, index) => <button key={item.id} type="button" aria-pressed={cell.actual === index} onClick={() => selectClass(index)} className={`flex min-h-10 items-center gap-2 rounded-lg border px-3 py-2 text-left text-xs font-medium transition-colors ${cell.actual === index ? "border-foreground bg-background" : "border-border hover:bg-background"}`}><span aria-hidden="true" className="h-2 w-2 shrink-0 rounded-full" style={{ backgroundColor: item.color }} />{item.name}</button>)}
      </div>
      <p id={`${id}-instructions`} className="mt-5 font-mono text-[10px] leading-5 text-muted">Rows: actual class · columns: predicted class<br />Select a cell; use arrow keys to explore.</p>
      <div role="region" aria-label="Scrollable illustrative confusion matrix" tabIndex={0} className="mt-3 min-w-0 overflow-x-auto rounded-lg pb-2 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-foreground">
        <table aria-describedby={`${id}-instructions`} className="mx-auto w-full min-w-[360px] max-w-2xl table-fixed border-separate border-spacing-1 text-center">
          <caption className="sr-only">Illustrative confusion matrix, six semantic classes, synthetic row-normalized percentages</caption>
          <thead>
            <tr>
              <th scope="col" className="w-24 px-1 text-left font-mono text-[10px] font-normal text-muted">Actual ↓<br />Predicted →</th>
              {semanticClasses.map(item => <th key={item.id} scope="col" className="py-2 font-mono text-[10px] font-normal text-muted"><abbr title={item.name} className="no-underline">{item.abbreviation}</abbr></th>)}
            </tr>
          </thead>
          <tbody>
            {semanticClasses.map((actual, row) => (
              <tr key={actual.id}>
                <th scope="row" className={`rounded-md px-2 text-left text-[10px] font-medium leading-5 ${cell.actual === row ? "bg-background" : "text-muted"}`}>{actual.name}</th>
                {semanticClasses.map((predicted, column) => {
                  const value = illustrativeConfusion[row][column];
                  const active = cell.actual === row && cell.predicted === column;
                  return <td key={predicted.id} className="p-0">
                    <button ref={element => { refs.current[row * 6 + column] = element; }} type="button" aria-label={`Illustrative actual ${actual.name}, predicted ${predicted.name}: ${value}%`} aria-pressed={active}
                      tabIndex={active ? 0 : -1} onClick={() => setCell({ actual: row, predicted: column })} onKeyDown={event => moveCell(event, row, column)} style={{ backgroundColor: `rgba(17,17,17,${0.04 + value / 100 * 0.8})` }}
                      className={`h-11 w-full rounded-md font-mono text-[11px] tabular-nums transition-[outline-color] ${value >= 70 ? "text-white" : "text-foreground"} ${active ? "outline-2 outline-offset-1 outline-foreground" : "hover:outline hover:outline-1 hover:outline-border"}`}>{value}%</button>
                  </td>;
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="mt-1 font-mono text-[10px] text-muted md:hidden">Scroll horizontally to inspect every class →</p>
      <div aria-live="polite" aria-atomic="true" className="mt-5 grid border-t border-border pt-4">
        {semanticClasses.flatMap((actual, row) => semanticClasses.map((predicted, column) => (
          <div key={`${actual.id}-${predicted.id}`} aria-hidden={cell.actual !== row || cell.predicted !== column} className={`col-start-1 row-start-1 ${cell.actual !== row || cell.predicted !== column ? "invisible" : ""}`}>
            <h4 className="text-sm font-medium">{actual.name} <span aria-hidden="true">→</span> {predicted.name}</h4>
            <p className="mt-2 text-xs leading-6 text-muted">Illustrative: {illustrativeConfusion[row][column]}% of pixels labeled {actual.name} are assigned {predicted.name} in this synthetic matrix. {interpretation(row, column)}</p>
          </div>
        )))}
      </div>
      <figcaption className="mt-4 text-[11px] leading-6 text-muted">This matrix explains an evaluation method. It does not report independently reproduced VisionSeg performance.</figcaption>
    </figure>
  );
}
