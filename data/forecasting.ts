export const forecasting = {
  slug: "forecasting-decision-intelligence",
  githubUrl: "https://github.com/Tushar-94/forecasting-and-decision-intelligence",
  title: "Forecasting & Decision Intelligence",
  subtitle: "Evaluation-Driven Demand Forecasting and Uncertainty-Aware Planning",
  category: "Predictive Analytics / Data Science",
  description: "An evaluation-driven forecasting workflow that transforms reservation transactions into daily room-night demand, compares forecasting strategies through rolling-origin backtesting, and generates channel-level predictions with uncertainty-aware planning scenarios.",
  technologies: [
    "Python",
    "Pandas",
    "NumPy",
    "Matplotlib",
    "Time-Series Forecasting",
    "Rolling-Origin Backtesting",
    "Statistical Analysis",
  ],
};

export const forecastChannels = [
  { name: "BookingCom", roomNights: 18200, historyMonths: 6, commonMAE: 6.01, selectedMAE: 5.69, improvement: "5.3% lower", shade: "bg-foreground" },
  { name: "ChannelManager", roomNights: 4297, historyMonths: 3, commonMAE: 2.61, selectedMAE: 2.61, improvement: undefined, shade: "bg-foreground/60" },
  { name: "Direct", roomNights: 754, historyMonths: 1, commonMAE: 4.73, selectedMAE: 3.60, improvement: "24% lower", shade: "bg-foreground/25" },
  { name: "Ibe", roomNights: 8371, historyMonths: 3, commonMAE: 4.67, selectedMAE: 4.67, improvement: undefined, shade: "bg-foreground/40" },
];

export const forecastTotal = forecastChannels.reduce((total, channel) => total + channel.roomNights, 0);

export const forecastOrigins = [
  { date: "2023-07-01", label: "July 1, 2023" },
  { date: "2023-10-01", label: "October 1, 2023" },
  { date: "2024-01-01", label: "January 1, 2024" },
  { date: "2024-04-01", label: "April 1, 2024" },
];

export const forecastScenarios = [
  { name: "Downside", roomNights: 29092, assumption: "≈ −8%", base: false },
  { name: "Base", roomNights: forecastTotal, assumption: "Point forecast", base: true },
  { name: "Upside", roomNights: 34151, assumption: "≈ +8%", base: false },
];

export const forecastDecisions = [
  {
    title: "Channel-Specific Forecasting",
    problem: "Booking channels exhibit different levels of demand stability.",
    decision: "Select a history window for each channel through rolling-origin evaluation.",
  },
  {
    title: "Complexity Must Earn Its Place",
    problem: "Weekday patterns and linear trends appeared useful in historical data.",
    decision: "Reject extensions that failed to improve out-of-sample performance consistently.",
  },
  {
    title: "Leakage-Free Validation",
    problem: "Future information can accidentally enter historical experiments.",
    decision: "Enforce chronological information boundaries at every forecast origin.",
  },
];

export const forecastTechnologyGroups = [
  { title: "Data Engineering", items: ["Python", "Pandas", "NumPy"] },
  { title: "Forecasting", items: ["Recent-Mean Models", "Seasonal Baselines", "Linear Trends", "Channel-Specific Models"] },
  { title: "Evaluation", items: ["Rolling-Origin Backtesting", "MAE", "RMSE", "Error Analysis"] },
  { title: "Visualization", items: ["Matplotlib"] },
  { title: "Development", items: ["Git", "GitHub", "Markdown"] },
];
