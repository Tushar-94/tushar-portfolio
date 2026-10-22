// Verified against agent.py, tools.py (TOOLS), FUNCTIONS.md, prepare_data.py,
// load.py and sql/schema.sql in the local logiq-ai-agent-hackathon repository.
// Families group the registry by responsibility; they are not separate services.
export const toolFamilies = [
  { title: "Search & scope", description: "Find log lines, inspect corpus coverage, and extract or filter message fields.", tools: ["corpus_overview", "search_logs", "extract_field", "filter_numeric"] },
  { title: "Event investigation", description: "Inspect events, neighboring lines, template history, tracebacks, and entity context.", tools: ["get_nearby_events", "investigate_event", "template_history", "get_traceback", "trace_instance"] },
  { title: "Aggregation & trends", description: "Measure groups, recurrence, time buckets, period changes, and estimated episodes.", tools: ["count_problems", "problem_trend", "recurring_problems", "compare_periods", "count_incidents"] },
  { title: "Correlation", description: "Explore preceding patterns, correlated templates, and candidate event chains. Association does not establish cause.", tools: ["preceding_patterns", "correlate_templates", "correlation_chains", "chain_profile"] },
  { title: "Prioritization", description: "Rank observed patterns or teams using documented severity, frequency, spread, and trend signals.", tools: ["risk_ranking"] },
] as const;

export const perspectives = [
  { id: "engineer", title: "Engineer", focus: "Technical diagnostic evidence", detail: "Log lines, traceback context, labeled hypotheses, and concrete diagnostic checks." },
  { id: "team_lead", title: "Team Lead", focus: "Investigation & coordination", detail: "Recurring patterns, scope, ownership context, and priorities for follow-up." },
  { id: "manager", title: "Manager", focus: "Operational interpretation", detail: "Observed risk, accountable follow-up, recommended actions, and explicit unknowns." },
] as const;

export type LogIQPerspective = (typeof perspectives)[number];

export const domains = [
  { id: "request", letter: "A", title: "Investigation request", decision: "A natural-language question enters a session with a selected role. Dataset, time range, and other filters become tool arguments when relevant to the question.", tradeoff: "Scope must travel with the evidence. A local time window and a tool’s broader historical context must not be presented as the same population.", source: "agent.py / Session, system_prompt, run · tools.py / tool input schemas" },
  { id: "agent", letter: "B", title: "Agent orchestration", decision: "One agent uses the question, conversation context, role instructions, and returned evidence to choose its next named tool and arguments. Tool results return to that same conversation; the agent can gather further evidence or finish its answer.", tradeoff: "Tool selection is dynamic. A simple aggregation can be sufficient; the architecture does not require all 19 tools or a fixed investigation sequence. Planning and interpretation are responsibilities inside the shared agent loop.", source: "agent.py / _execute, _run_anthropic, _run_openai, system_prompt" },
  { id: "tools", letter: "C", title: "SQL tool execution", decision: "The 19 registered functions are grouped here into search, investigation, aggregation, correlation, and prioritization responsibilities. The dispatcher invokes the selected function; predefined query templates and bound values execute in SereneDB.", tradeoff: "The model selects tools and arguments, not arbitrary SQL. Each function can run multiple queries. Families describe responsibilities, not isolated deployments or role-exclusive tool sets.", source: "tools.py / TOOLS, call_tool, Evidence.run · FUNCTIONS.md" },
  { id: "evidence", letter: "D", title: "Evidence synthesis", decision: "The agent interprets returned log evidence, counts, error patterns, and temporal context. The evidence envelope retains scope, filters, executed SQL, parameters, bounded data, and caveats for source-level traceability.", tradeoff: "Matching lines are not independent incidents. Time proximity and correlation do not prove causality; incomplete or truncated evidence must remain visible in the interpretation.", source: "tools.py / Evidence.result · agent.py / CORE, _execute" },
  { id: "data", letter: "E", title: "Historical log data", decision: "BGL and OpenStack archives are parsed into structured CSVs and loaded before investigation. SereneDB stores unified events with ownership views and an inverted full-text index. SQL search and aggregation run against these recorded logs.", tradeoff: "The recorded corpus contains 4,955,783 log lines. This is historical data, not live telemetry, a streaming ingestion system, or a count of incidents. The database returns bounded results rather than sending the full corpus to the model.", source: "prepare_data.py · load.py · sql/schema.sql · README.md / The Data" },
  { id: "reporting", letter: "F", title: "Role-aware reporting", decision: "Role instructions configure the same agent’s evidence gathering and presentation. Engineer, Team Lead, and Manager are three supported perspectives, not three independent agents. The answer and its supporting evidence remain inspectable.", tradeoff: "Changing perspective changes emphasis, not what the logs prove. Operational impact, root cause, and ownership must not be invented when the evidence does not establish them.", source: "agent.py / ROLES, system_prompt · FUNCTIONS.md / Same tools, different evidence per role" },
] as const;

export type DomainId = typeof domains[number]["id"];
