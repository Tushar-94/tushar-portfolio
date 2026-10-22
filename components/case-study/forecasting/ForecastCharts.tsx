import { forecastChannels, forecastTotal } from "@/data/forecasting";

const number = (value: number) => value.toLocaleString("en-US");

export function ChannelComposition() {
  return (
    <figure aria-labelledby="channel-mix-title" className="rounded-2xl border border-border bg-surface p-5 sm:p-6">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h3 id="channel-mix-title" className="font-mono text-xs text-muted">Forecast room nights · annual channel mix</h3>
          <p className="mt-4 text-5xl font-semibold tracking-[-0.05em] tabular-nums">{number(forecastTotal)}</p>
        </div>
        <p className="font-mono text-xs text-muted">365 days · 4 channels</p>
      </div>
      <div aria-hidden="true" className="mt-7 flex h-5 overflow-hidden rounded-full">
        {forecastChannels.map((channel) => (
          <div key={channel.name} className={channel.shade} style={{ width: `${channel.roomNights / forecastTotal * 100}%` }} />
        ))}
      </div>
      <table className="mt-6 w-full text-left text-sm">
        <caption className="sr-only">Annual forecast room nights and share by booking channel</caption>
        <thead className="font-mono text-[10px] text-muted">
          <tr>
            <th scope="col" className="pb-3 font-normal">Channel</th>
            <th scope="col" className="pb-3 text-right font-normal">Forecast</th>
            <th scope="col" className="pb-3 text-right font-normal">Share</th>
          </tr>
        </thead>
        <tbody>
          {forecastChannels.map((channel) => (
            <tr key={channel.name} className="border-t border-border">
              <th scope="row" className="py-3 font-medium">
                <span aria-hidden="true" className={`mr-2 inline-block h-2 w-2 rounded-full ${channel.shade}`} />
                {channel.name}
              </th>
              <td className="py-3 text-right font-mono text-xs tabular-nums">{number(channel.roomNights)}</td>
              <td className="py-3 pl-3 text-right font-mono text-xs tabular-nums text-muted">{(channel.roomNights / forecastTotal * 100).toFixed(1)}%</td>
            </tr>
          ))}
        </tbody>
      </table>
      <figcaption className="mt-3 border-t border-border pt-4 text-xs leading-6 text-muted">
        BookingCom and Ibe account for approximately 84% of forecast room-night demand.
      </figcaption>
    </figure>
  );
}

export function ModelComparison() {
  return (
    <figure aria-labelledby="mae-chart-title" className="rounded-2xl border border-border bg-surface p-5 sm:p-6">
      <div className="flex flex-wrap items-baseline justify-between gap-3">
        <h3 id="mae-chart-title" className="text-sm font-semibold">Model-selection MAE</h3>
        <span className="font-mono text-[10px] text-muted">Room nights / day · lower is better</span>
      </div>
      <ul aria-label="Chart legend" className="mt-4 flex flex-wrap gap-x-5 gap-y-2 text-xs text-muted">
        <li><span aria-hidden="true" className="mr-2 inline-block h-2 w-4 rounded-sm bg-foreground/20" />Common 3-month window</li>
        <li><span aria-hidden="true" className="mr-2 inline-block h-2 w-4 rounded-sm bg-foreground" />Channel-specific window</li>
      </ul>
      <div aria-hidden="true" className="mt-6 hidden grid-cols-[145px_minmax(0,1fr)_36px] gap-5 sm:grid">
        <span />
        <div className="relative h-4 font-mono text-[10px] text-muted">
          {[0, 2, 4, 6].map((tick) => <span key={tick} className="absolute" style={{ left: `${tick / 7 * 100}%` }}>{tick}</span>)}
        </div>
      </div>
      <ul className="mt-5 space-y-6 sm:mt-2">
        {forecastChannels.map((channel) => (
          <li key={channel.name} className="grid gap-3 sm:grid-cols-[145px_minmax(0,1fr)] sm:items-center sm:gap-5">
            <div>
              <h4 className="text-sm font-medium">{channel.name}</h4>
              <p className="mt-1 font-mono text-[10px] text-muted">{channel.historyMonths}-month history{channel.improvement && <span className="mt-1 block text-foreground">{channel.improvement} MAE</span>}</p>
            </div>
            <div className="space-y-2">
              {[
                { value: channel.commonMAE, label: "Common 3-month window MAE", shade: "bg-foreground/20" },
                { value: channel.selectedMAE, label: "Channel-specific window MAE", shade: "bg-foreground" },
              ].map((model) => (
                <div key={model.label} className="grid grid-cols-[minmax(0,1fr)_36px] items-center gap-5">
                  <div aria-hidden="true" className="h-2 rounded-sm bg-background">
                    <div className={`h-full rounded-sm ${model.shade}`} style={{ width: `${model.value / 7 * 100}%` }} />
                  </div>
                  <p className="text-right font-mono text-xs tabular-nums"><span className="sr-only">{model.label}: </span>{model.value.toFixed(2)}</p>
                </div>
              ))}
            </div>
          </li>
        ))}
      </ul>
      <figcaption className="mt-6 border-t border-border pt-4 text-xs leading-6 text-muted">
        The same four historical origins informed model selection. These are model-selection backtest comparisons, not independent final-test results.
      </figcaption>
    </figure>
  );
}
