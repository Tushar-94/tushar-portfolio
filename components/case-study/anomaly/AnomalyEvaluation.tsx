import { anomalyCalibration, calibrationScoreRanges, historicalROI } from "@/data/anomalyDetection";

function RangeBand({ lower, upper, point, minimum = 0, maximum = 1, shade = "bg-foreground/20" }: { lower: number; upper: number; point: number; minimum?: number; maximum?: number; shade?: string }) {
  const position = (value: number) => (value - minimum) / (maximum - minimum) * 100;
  return (
    <div aria-hidden="true" className="relative h-8">
      <div className="absolute top-1/2 h-px w-full bg-border" />
      <div className={`absolute top-1/2 h-3 -translate-y-1/2 rounded-full ${shade}`} style={{ left: `${position(lower)}%`, width: `${position(upper) - position(lower)}%` }} />
      {[lower, upper].map(bound => <span key={bound} className="absolute top-1/2 h-5 w-px -translate-y-1/2 bg-foreground/50" style={{ left: `${position(bound)}%` }} />)}
      <span className="absolute top-1/2 h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-foreground ring-4 ring-surface" style={{ left: `${position(point)}%` }} />
    </div>
  );
}

export function AnomalyEvaluation() {
  return (
    <>
      <div className="grid gap-4 xl:grid-cols-2">
        <figure aria-labelledby="calibration-auroc-title" className="rounded-2xl border border-border bg-surface p-5 sm:p-6">
          <div role="group" aria-label="Calibration AUROC and bootstrap confidence interval">
            <h3 id="calibration-auroc-title" className="text-sm font-semibold">Calibration AUROC</h3>
            <p className="mt-4 text-5xl font-semibold tracking-[-0.05em] tabular-nums">{anomalyCalibration.auroc.toFixed(3)}</p>
            <p className="mt-3 text-xs leading-6 text-muted">95% Bootstrap CI: {anomalyCalibration.lower.toFixed(3)}–{anomalyCalibration.upper.toFixed(3)}</p>
          </div>
          <div className="mt-5">
            <RangeBand lower={anomalyCalibration.lower} upper={anomalyCalibration.upper} point={anomalyCalibration.auroc} />
            <div aria-hidden="true" className="mt-2 flex justify-between font-mono text-[10px] text-muted">{["0", "0.25", "0.50", "0.75", "1"].map(tick => <span key={tick}>{tick}</span>)}</div>
          </div>
          <figcaption className="mt-5 border-t border-border pt-4 text-xs leading-6 text-muted">The wide confidence interval indicates uncertainty in the estimated anomaly-ranking performance. Point: calibration AUROC; band: 95% bootstrap CI. These are calibration-set results, not independent holdout or production performance.</figcaption>
        </figure>
        <figure aria-labelledby="historical-roi-title" className="rounded-2xl border border-border bg-surface p-5 sm:p-6">
          <h3 id="historical-roi-title" className="text-sm font-semibold">Historical ROI Evaluation</h3>
          <p className="mt-3 text-xs leading-6 text-muted">Separate historical evaluation</p>
          <dl className="mt-6 space-y-5">
            {[
              { label: "Before ROI masking", value: historicalROI.before, shade: "bg-foreground/25" },
              { label: "After ROI masking", value: historicalROI.after, shade: "bg-foreground" },
            ].map(result => (
              <div key={result.label}>
                <dt className="text-xs text-muted">{result.label}</dt>
                <dd className="mt-2 grid grid-cols-[minmax(0,1fr)_3rem] items-center gap-4">
                  <div aria-hidden="true" className="h-2 rounded-sm bg-background"><div className={`h-full rounded-sm ${result.shade}`} style={{ width: `${result.value * 100}%` }} /></div>
                  <span className="text-right font-mono text-xs tabular-nums">~{result.value.toFixed(2)}<span className="sr-only"> AUROC</span></span>
                </dd>
              </div>
            ))}
          </dl>
          <p aria-hidden="true" className="mt-4 font-mono text-[10px] text-muted">AUROC · common bar scale: 0–1</p>
          <figcaption className="mt-5 border-t border-border pt-4 text-xs leading-6 text-muted">ROI-aware processing improved anomaly ranking in an earlier masking experiment. This separate evaluation is not directly comparable with the later calibration AUROC and does not establish production performance.</figcaption>
        </figure>
      </div>
      <figure aria-labelledby="score-ranges-title" className="mt-5 rounded-2xl border border-border bg-surface p-5 sm:p-6">
        <div className="flex flex-wrap items-baseline justify-between gap-3">
          <h3 id="score-ranges-title" className="text-sm font-semibold">Calibration score overlap</h3>
          <span className="font-mono text-[10px] text-muted">Aggregate ranges & means only</span>
        </div>
        <dl className="mt-5 space-y-5">
          {calibrationScoreRanges.map(group => (
            <div key={group.label} className="grid gap-2 sm:grid-cols-[130px_minmax(0,1fr)] sm:gap-5">
              <dt className="text-xs font-medium leading-6">{group.label}</dt>
              <dd className="min-w-0">
                <RangeBand lower={group.lower} upper={group.upper} point={group.mean} minimum={0.20} maximum={0.45} shade={group.shade} />
                <p className="font-mono text-[10px] leading-6 text-muted">Range {group.lower.toFixed(4)}–{group.upper.toFixed(4)} · mean {group.mean.toFixed(4)}</p>
              </dd>
            </div>
          ))}
        </dl>
        <div aria-hidden="true" className="mt-3 grid sm:grid-cols-[130px_minmax(0,1fr)] sm:gap-5">
          <span /><div className="flex justify-between font-mono text-[10px] text-muted">{["0.20", "0.25", "0.30", "0.35", "0.40", "0.45"].map(tick => <span key={tick}>{tick}</span>)}</div>
        </div>
        <figcaption className="mt-5 border-t border-border pt-4 text-xs leading-6 text-muted">Bands show observed ranges; dots mark means. These are not per-image observations or fitted distributions. Overlapping scores make threshold selection challenging.</figcaption>
      </figure>
    </>
  );
}
