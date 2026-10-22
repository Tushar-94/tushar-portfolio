import { calendarStart,calendarEnd,daysBetween,origins,windowAt } from "./content";
import styles from "./ForecastArchitecture.module.css";

export function BacktestMatrix({months,channel,selected,onSelect,id}: {months:number;channel:string;selected:number;onSelect:(index:number)=>void;id:string}) {
  const totalDays=daysBetween(calendarStart,calendarEnd);
  const position=(date:string)=>daysBetween(calendarStart,date)/totalDays*100;
  const ticks=[{date:"2023-01-01",label:"Jan 2023"},{date:"2023-04-01",label:"Apr"},{date:"2023-07-01",label:"Jul"},{date:"2023-10-01",label:"Oct"},{date:"2024-01-01",label:"Jan 2024"},{date:"2024-04-01",label:"Apr"},{date:"2024-05-01",label:"May"}];
  const current=windowAt(origins[selected].date,months);
  return <div id={`${id}-matrix`} className={styles.matrix}>
    <div className={styles.matrixIntro}><p>Rolling origins / <strong>{channel}</strong></p><span>{months}-month selected history · 2-calendar-month evaluation</span></div>
    <div className={styles.calendarAxis} aria-hidden="true"><span>Forecast origin</span><div>{ticks.map((tick,i)=><span key={tick.date} style={{left:`${position(tick.date)}%`}} data-edge={i===0?"start":i===ticks.length-1?"end":undefined}>{tick.label}</span>)}</div></div>
    <div role="group" aria-label="Historical forecast origin" className={styles.originRows}>
      {origins.map((origin,index)=>{
        const w=windowAt(origin.date,months),historyLeft=position(w.historyStart),split=position(origin.date),right=split+w.evaluationDays/totalDays*100;
        return <button key={origin.date} type="button" className={styles.originRow} aria-pressed={selected===index} aria-label={`Inspect origin ${origin.date}`} aria-controls={`${id}-origin-details`} onClick={()=>onSelect(index)} data-history-start={w.historyStart} data-history-end={w.historyEnd} data-evaluation-start={w.evaluationStart} data-evaluation-end={w.evaluationEnd}>
          <span className={styles.originDate}><span className={styles.originNumber}>0{index+1}</span><time dateTime={origin.date}>{origin.date}</time></span>
          <span className={styles.globalTrack} aria-hidden="true"><span className={styles.trackGrid}>{ticks.map(tick=><i key={tick.date} style={{left:`${position(tick.date)}%`}} />)}</span><span className={styles.historyBar} style={{left:`${historyLeft}%`,width:`${split-historyLeft}%`}} /><span className={styles.validationBar} style={{left:`${split}%`,width:`${right-split}%`}} /><span className={styles.cutoff} style={{left:`${split}%`}} /></span>
          <span className={styles.localTrack} aria-hidden="true"><span className={styles.historyBar} style={{width:`${w.historyDays/(w.historyDays+w.evaluationDays)*100}%`}} /><span className={styles.validationBar} style={{width:`${w.evaluationDays/(w.historyDays+w.evaluationDays)*100}%`}} /></span>
          <span className={styles.mobileDates}><span>History <time dateTime={w.historyStart}>{w.historyStart}</time> → <time dateTime={w.historyEnd}>{w.historyEnd}</time></span><span>Evaluate <time dateTime={w.evaluationStart}>{w.evaluationStart}</time> → <time dateTime={w.evaluationEnd}>{w.evaluationEnd}</time></span></span>
        </button>;
      })}
    </div>
    <div className={styles.matrixLegend}><span><i className={styles.historyKey} />Earlier history</span><span><i className={styles.validationKey} />Future validation</span><span><i className={styles.cutoffKey} />Forecast origin</span></div>
    <div id={`${id}-origin-details`} className={styles.originDetails} aria-live="polite" aria-atomic="true"><div><span className={styles.label}>Fit / {current.historyDays} days</span><p><time dateTime={current.historyStart}>{current.historyStart}</time><span aria-hidden="true"> → </span><span className={styles.srOnly}> through </span><time dateTime={current.historyEnd}>{current.historyEnd}</time></p></div><div><span className={styles.label}>Evaluate / {current.evaluationDays} days</span><p><time dateTime={current.evaluationStart}>{current.evaluationStart}</time><span aria-hidden="true"> → </span><span className={styles.srOnly}> through </span><time dateTime={current.evaluationEnd}>{current.evaluationEnd}</time></p></div></div>
    <p className={styles.matrixFoot}>Each row advances the information cutoff. History stops before its origin; future observations are used only to measure errors. Compact layouts show each row on its own relative time axis.</p>
  </div>;
}
