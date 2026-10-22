"use client";

import { useId, useRef, useState } from "react";
import { forecastScenarios, forecastTotal } from "@/data/forecasting";
import { BacktestMatrix } from "./architecture/BacktestMatrix";
import { Connections } from "./architecture/Connections";
import { SeriesSchema, StayExpansion } from "./architecture/Visuals";
import { channels,domains,forecastPeriod,previousDay,shiftMonths,type DomainId } from "./architecture/content";
import styles from "./architecture/ForecastArchitecture.module.css";

export function ForecastArchitecture() {
  const id=useId();
  const mapRef=useRef<HTMLDivElement>(null);
  const notesRef=useRef<HTMLDetailsElement>(null);
  const [selected,setSelected]=useState<DomainId>("evaluation");
  const [channelIndex,setChannelIndex]=useState(0);
  const [originIndex,setOriginIndex]=useState(3);
  const [scenarioIndex,setScenarioIndex]=useState(1);
  const channel=channels[channelIndex],scenario=forecastScenarios[scenarioIndex];
  const domain=domains.find(item=>item.id===selected)!;
  function inspect(key:DomainId){setSelected(key);if(notesRef.current)notesRef.current.open=true;}
  function heading(key:DomainId){const item=domains.find(d=>d.id===key)!;return <button type="button" className={styles.heading} aria-label={`Inspect ${item.title}`} aria-pressed={selected===key} aria-controls={`${id}-inspector`} onClick={()=>inspect(key)}><span className={styles.letter}>{item.letter}</span><span>{item.title}</span><span className={styles.inspect} aria-hidden="true">↗</span></button>;}
  const number=(value:number)=>value.toLocaleString("en-US");

  return <figure className={styles.architecture} aria-labelledby={`${id}-title`} aria-describedby={`${id}-summary`}>
    <header className={styles.masthead}><div><p className={styles.overline}>Forecasting / Analytical architecture</p><h3 id={`${id}-title`}>Every forecast starts with a boundary.</h3></div><p className={styles.status}>Historical room-night demand<br />Evaluation before extrapolation</p></header>
    <p id={`${id}-summary`} className={styles.intro}>Turn reservation intervals into daily demand. Test forecasting choices against time. Carry the selected channel models into an explicit planning horizon.</p>

    <div ref={mapRef} className={styles.map} data-forecast-map>
      <Connections mapRef={mapRef} id={id} selected={selected} scenario={scenarioIndex} />
      <section className={styles.domain} data-forecast-anchor="foundation" data-selected={selected==="foundation"} aria-label="Data foundation subsystem">
        {heading("foundation")}
        <div className={styles.foundationFlow}>
          <div className={styles.foundationStep}><span className={styles.label}>01 / Validate reservations</span><h4>Completed, positive-length stays</h4><p>Parse dates · retain checked-out stays<br />18,067 valid reservation records</p></div>
          <div className={styles.expansionStep}><span className={styles.label}>02 / Expand occupied nights</span><StayExpansion /><p>Illustrative stay · departure date excluded</p></div>
          <div className={styles.foundationStep}><span className={styles.label}>03 / Count by date + channel</span><h4>51,696 room nights</h4><p>One row per occupied night.<br />Aggregate into daily channel counts.</p></div>
        </div>
        <p className={styles.foundationFoot}>Transformation check / expanded rows = sum of valid lengths of stay</p>
      </section>

      <div className={styles.analysis}>
        <section className={styles.domain} data-forecast-anchor="representation" data-selected={selected==="representation"} aria-label="Demand representation subsystem">
          {heading("representation")}
          <div className={styles.representationIntro}><h4>One daily series per channel</h4><p>Select a channel to trace its verified history window and forecast output.</p></div>
          <div className={styles.channelRows} data-forecast-anchor="channel-series" role="group" aria-label="Booking channel">{channels.map((item,index)=><button key={item.name} type="button" aria-pressed={channelIndex===index} aria-controls={`${id}-matrix ${id}-channel-forecast`} onClick={()=>{setChannelIndex(index);inspect("representation");}}><span>{item.label}</span><SeriesSchema /></button>)}</div>
          <p className={styles.schemaNote}>Symbolic date × channel grid · yₜ denotes a daily count. No historical observations are plotted.</p>
          <div className={styles.seasonality}><div><span className={styles.label}>Day-of-week effects</span><h4>Mon → Sun</h4><p>Compare weekday demand summaries</p></div><div><span className={styles.label}>Monthly evolution</span><h4>Calendar-month means</h4><p>Inspect changes through time</p></div></div>
          <p className={styles.representationFoot}>Zero-fill date-channel gaps only within the accepted observation period, starting 2022-10-01.</p>
        </section>

        <section className={`${styles.domain} ${styles.development}`} data-forecast-anchor="development" data-selected={selected==="development"} aria-label="Forecast development subsystem">
          {heading("development")}
          <div className={styles.experiments}>
            <div><span className={styles.label}>Initial temporal split / Apr–May 2024</span><h4>Establish baselines</h4><p>Seven-day seasonal-naive<br />Three-month recent mean</p></div>
            <div data-forecast-anchor="rolling-candidates"><span className={styles.label}>Repeated historical origins</span><h4>Test extensions &amp; history</h4><ul><li>Recent means · 1, 3, 6 months</li><li>Channel × weekday means</li><li>Linear-trend extrapolation</li></ul></div>
          </div>
          <div className={styles.retained}><span className={styles.label}>Rule retained after comparison</span><h4>Channel-specific recent mean</h4><p>Forecast = mean daily demand<br />over the selected channel history.</p><p className={styles.formula} aria-label="Future daily demand equals the mean of the selected historical daily counts">ŷ(c, t) = mean(Hc)</p></div>
          <p className={styles.developmentFoot}>Weekday and trend experiments are not components of the final constant-mean forecast.</p>
        </section>
      </div>

      <section className={`${styles.domain} ${styles.evaluation}`} data-forecast-anchor="evaluation" data-selected={selected==="evaluation"} aria-label="Temporal evaluation subsystem">
        {heading("evaluation")}
        <BacktestMatrix months={channel.historyMonths} channel={channel.label} selected={originIndex} onSelect={index=>{setOriginIndex(index);inspect("evaluation");}} id={id} />
        <div className={styles.evaluationOutcome}><div><span className={styles.label}>Measure across origins</span><h4>MAE · RMSE · channel diagnostics</h4><p>Compare average errors and variation between historical simulations.</p></div><div><span className={styles.label}>Select a history window</span><h4>{channel.label} / {channel.historyMonths} months</h4><p>The same four origins informed selection. These are model-selection comparisons, not an independent final test.</p></div></div>
      </section>

      <section className={styles.domain} data-forecast-anchor="decision" data-selected={selected==="decision"} aria-label="Decision intelligence subsystem">
        {heading("decision")}
        <div id={`${id}-channel-forecast`} className={styles.forecastRun} aria-live="polite" aria-atomic="true"><div><span className={styles.label}>Final fit / {channel.label}</span><h4>{channel.historyMonths}-month historical mean</h4><p><time dateTime={shiftMonths(forecastPeriod.start,-channel.historyMonths)}>{shiftMonths(forecastPeriod.start,-channel.historyMonths)}</time> → <time dateTime={previousDay(forecastPeriod.start)}>{previousDay(forecastPeriod.start)}</time></p></div><div><span className={styles.label}>Reported channel forecast</span><h4>{number(channel.roomNights)} room nights</h4><p>Same daily mean projected across 365 dates</p></div></div>
        <div className={styles.horizon}><div><span className={styles.label}>365-day forecast horizon</span><span>Constant-mean projection / schematic, no daily values plotted</span></div><div className={styles.projection} aria-hidden="true"><i /><span /><i /></div><div className={styles.horizonDates}><time dateTime={forecastPeriod.start}>{forecastPeriod.start}</time><time dateTime={forecastPeriod.end}>{forecastPeriod.end}</time></div></div>
        <div className={styles.aggregate} data-forecast-anchor="aggregate"><div><span className={styles.label}>Sum dates + channels</span><h4>{number(forecastTotal)} room nights</h4></div><p>365 days × 4 channels<br />1,460 channel-level daily predictions</p></div>
        <div className={styles.scenarioGroup}>
          <p className={styles.label} data-forecast-anchor="scenario-label">Branch into planning assumptions</p>
          <div className={styles.scenarios} role="group" aria-label="Planning scenario assumptions">{forecastScenarios.map((item,index)=><button key={item.name} type="button" data-forecast-anchor={`scenario-${index}`} aria-pressed={scenarioIndex===index} aria-controls={`${id}-scenario-detail`} onClick={()=>{setScenarioIndex(index);inspect("decision");}}><span className={styles.label}>{item.name}</span><strong>{number(item.roomNights)}</strong><span>{item.assumption}</span></button>)}</div>
          <p id={`${id}-scenario-detail`} className={styles.scenarioDetail} aria-live="polite" aria-atomic="true"><strong>{scenario.name}:</strong> {scenario.base?"The aggregated point forecast, before scenario stress.":`${scenario.assumption} planning stress around the base forecast.`} All values are reported room-night totals.</p>
        </div>
        <p className={styles.planningBoundary}>Scenarios are planning assumptions, not calibrated prediction intervals. Two-month backtests do not validate a 365-day horizon. Revenue intelligence and broader decision-support functionality remain planned.</p>
      </section>
    </div>

    <div className={styles.legend} aria-label="Architecture connection legend"><span><i />Demand / forecast data</span><span><i className={styles.evaluationLine} />Historical evaluation</span><span><i className={styles.scenarioLine} />Planning assumptions</span></div>
    <aside id={`${id}-inspector`} className={styles.inspector} aria-label="Selected forecasting subsystem" aria-live="polite" aria-atomic="true"><div><p className={styles.overline}>Inspect / {domain.letter}</p><h4>{domain.title}</h4><p className={styles.hint}>Select a subsystem to inspect its analytical decisions.</p></div><details ref={notesRef} className={styles.notes} open><summary><span>Methodology &amp; boundaries</span><span className={styles.disclosureMark} aria-hidden="true" /></summary><div><p>{domain.description}</p><p><strong>Trade-off.</strong> {domain.tradeoff}</p><p className={styles.source}>SOURCE / {domain.source}</p></div></details></aside>
    <details className={styles.textSummary}><summary><span>Text architecture &amp; evidence scope</span><span className={styles.disclosureMark} aria-hidden="true" /></summary><div><p><strong>Foundation.</strong> Completed reservations with positive lengths of stay expand to occupied nights, including arrival and excluding departure. Expanded row counts are checked against total stay lengths. Daily counts are grouped by date and channel, with zero-fill limited to the accepted history window.</p><p><strong>Development and evaluation.</strong> The initial April–May 2024 split tests seasonal-naive and recent-mean baselines. Rolling-origin experiments compare recent-mean history windows, weekday means, and linear trends at 2023-07-01, 2023-10-01, 2024-01-01, and 2024-04-01. Each origin uses only preceding history and evaluates the following two calendar months. MAE and RMSE inform channel-specific history-window selection.</p><p><strong>Forecast and planning.</strong> The retained recent means use six months for Booking.com, three for Channel Manager, one for Direct, and three for IBE. History ends on 2024-05-31, before the 365-day forecast starts. Channel forecasts aggregate to the reported 31,622 room-night base. Downside and upside totals reflect ±8% stress applied to the unrounded base; reported totals are rounded independently.</p><p><strong>Limits.</strong> The same backtests informed model selection and do not establish independent or year-ahead performance. Scenarios are assumptions, not probability intervals. Symbols and the example reservation illustrate data structure rather than raw observations. The source workbook is private; the existing processing totals are preserved rather than recomputed here. No deployed pricing engine, automated retraining, or revenue-optimization result is claimed.</p></div></details>
    <figcaption className={styles.caption}><span>FIG. 01 / Forecasting &amp; decision intelligence</span><span>Verified workflow · interactive explanation · no forecasting jobs executed</span></figcaption>
  </figure>;
}
