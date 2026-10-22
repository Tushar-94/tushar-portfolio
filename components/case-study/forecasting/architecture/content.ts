import { forecastChannels, forecastOrigins } from "@/data/forecasting";

export type DomainId = "foundation" | "representation" | "development" | "evaluation" | "decision";
const names: Record<string,string> = {BookingCom:"Booking.com",ChannelManager:"Channel Manager",Direct:"Direct",Ibe:"IBE"};
export const channels = forecastChannels.map(channel => ({...channel,label:names[channel.name]}));
export const origins = forecastOrigins;
export const forecastPeriod = {start:"2024-06-01",end:"2025-05-31"};
export const calendarStart = "2023-01-01";
export const calendarEnd = "2024-06-01";
const day = 86400000;
export function shiftMonths(date: string, months: number) {
  const parsed = new Date(`${date}T00:00:00Z`);
  return new Date(Date.UTC(parsed.getUTCFullYear(), parsed.getUTCMonth()+months, 1)).toISOString().slice(0,10);
}
export function previousDay(date: string) { return new Date(Date.parse(`${date}T00:00:00Z`)-day).toISOString().slice(0,10); }
export function daysBetween(start: string, end: string) { return (Date.parse(`${end}T00:00:00Z`)-Date.parse(`${start}T00:00:00Z`))/day; }
export function windowAt(origin: string, months: number) {
  const historyStart=shiftMonths(origin,-months),evaluationEnd=previousDay(shiftMonths(origin,2));
  return {historyStart,historyEnd:previousDay(origin),evaluationStart:origin,evaluationEnd,historyDays:daysBetween(historyStart,origin),evaluationDays:daysBetween(origin,shiftMonths(origin,2))};
}

export const domains: {id:DomainId;letter:string;title:string;description:string;tradeoff:string;source:string}[] = [
  {id:"foundation",letter:"A",title:"Data foundation",description:"Dates are parsed and completed stays with positive lengths of stay are retained. Each reservation expands from arrival through the day before departure. The code checks that expanded rows equal the sum of stay lengths, then counts room nights by date and booking channel.",tradeoff:"A reservation count is not a room-night target. The existing portfolio reports 18,067 valid records and 51,696 expanded nights. The underlying workbook is private, so those totals are reported evidence rather than values recomputed by this visualization.",source:"01_historical_demand.py; 07_final_forecast.py / validation and expansion"},
  {id:"representation",letter:"B",title:"Demand representation",description:"Daily realized room-night counts form a complete date × channel grid. The investigation examines daily history, day-of-week summaries, and chronological monthly means. Within the accepted observation period, absent date-channel combinations are represented as zero demand.",tradeoff:"Missing coverage is not automatically zero demand. The analysis adopts 2022-10-01 as the usable-history start after investigating early gaps. The symbolic series here show table structure, not invented historical observations.",source:"01_historical_demand.py / complete grid, weekday and monthly exploration"},
  {id:"development",letter:"C",title:"Forecast development",description:"The initial temporal split compares a seven-day seasonal-naive baseline with a three-month recent mean. Repeated-origin experiments test recent-mean history windows of one, three, and six months, weekday-specific means, and linear trends. The final approach retains channel-specific recent means.",tradeoff:"The seasonal-naive baseline belongs to the initial April–May 2024 split; it is not represented as evaluated across all four origins. Weekday and trend investigations do not imply those features are used by the final constant-mean forecast.",source:"02_temporal_validation.py; 03_rolling_backtest.py; 04_weekday_model.py; 05_trend_model.py"},
  {id:"evaluation",letter:"D",title:"Temporal evaluation",description:"Four historical origins separate preceding history from the following two calendar months. MAE and RMSE are measured by channel, with comparisons across origins. Selecting a channel changes the displayed recent-mean history window to the configuration selected in the project.",tradeoff:"History always ends before the origin; future demand is used for scoring. The same origins informed history-window selection, so these comparisons are model-selection evidence, not an independent final test. Two-month backtests do not establish 365-day forecast accuracy.",source:"03_rolling_backtest.py; 06_channel_specific_model.py / four chronological origins"},
  {id:"decision",letter:"E",title:"Decision intelligence",description:"At the 2024-06-01 origin, each selected channel mean is fitted using only earlier dates and projected unchanged for 365 days, through 2025-05-31. Channel forecasts are summed for aggregate demand. Downside and upside scenarios apply a transparent ±8% planning stress around the unrounded base forecast.",tradeoff:"The reported base is 31,622 room nights. The ±8% stress is informed by the worst historical aggregate error, rounded from about 7.87%, but is not a calibrated prediction interval. Reported scenario and channel totals are rounded independently; no pricing, revenue optimization, or deployed service is implied.",source:"07_final_forecast.py; notes/01-forecasting.md / final forecast and scenario definitions"},
];
