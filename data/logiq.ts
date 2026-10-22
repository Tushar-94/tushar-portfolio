export const logiqEvidence = [
  { value: 8, title: "Matching error lines", scope: "InvalidDiskInfo search matches", operation: "search_logs" },
  { value: 24, title: "Related diagnostic matches", scope: "qemu-img search matches", operation: "search_logs" },
  { value: 192, title: "Component-level ERROR volume", scope: "oslo_service.periodic_task", operation: "count_problems" },
];

export const logiqStages = [
  { title: "Natural-Language Question", label: "Question", description: "Investigate recurring InvalidDiskInfo / qemu-img failures in OpenStack on May 16–17, 2017. Separate observed evidence from possible causes.", detail: "Scope: 2017-05-16 00:00:00 inclusive to 2017-05-18 00:00:00 exclusive. Timestamps remain as recorded, without timezone conversion." },
  { title: "Tool Selection", label: "Tools", description: "One AI agent selects from 19 predefined investigation tools. This recorded investigation uses search, event-context inspection, and problem aggregation.", detail: "search_logs finds matching lines; investigate_event expands local context; count_problems measures component-level problem volume." },
  { title: "Parameterized SQL Execution", label: "SQL", description: "Selected tools execute predefined, parameterized SQL against historical data in SereneDB. Tool inputs define the dataset, time window, and search terms.", detail: "The agent chooses tools and arguments; it does not generate arbitrary SQL. The evidence explorer describes operations without reconstructing query executions." },
  { title: "Retrieved Evidence", label: "Evidence", description: "The recorded searches found 8 InvalidDiskInfo matching lines and 24 qemu-img matches. A separate aggregation counted 192 ERROR lines in oslo_service.periodic_task.", detail: "These are overlapping search and aggregation measures. Do not sum them or interpret them as independent incidents." },
  { title: "Role-Aware Interpretation", label: "Interpretation", description: "The same evidence supports diagnostic, coordination, or risk-focused interpretation.", detail: "A missing-path diagnostic is an observation. It does not establish why the disk file was unavailable, a confirmed root cause, or customer impact." },
];

export const logiqPerspectives = [
  { role: "Engineer", finding: "Disk inspection failed with a missing-path diagnostic.", action: "Check disk paths, image-cache state, and instance lifecycle timing; verify against the recorded traceback." },
  { role: "Team Lead", finding: "The component shows recurring error patterns; the recorded ownership mapping is unassigned.", action: "Assign an owner, coordinate compute/storage checks, and verify the scope before escalating." },
  { role: "Manager", finding: "Recurring disk errors warrant follow-up; operational impact and the underlying cause remain unconfirmed.", action: "Request a scoped risk assessment and named follow-up owner. Keep separate CRITICAL identity-service signals distinct from this disk investigation." },
];

// Recorded tool arguments and log excerpt from engineer/Q1–Q2 and
// team_lead/Q2 in the existing linked worked-investigation report.
export const logiqTools = [
  { label: "Search logs", family: "Search", name: "search_logs", parameters: { dataset: "openstack", text: "InvalidDiskInfo", start: "2017-05-16 00:00:00", end: "2017-05-18 00:00:00", limit: 20 }, evidenceType: "Matching lines and total match count", operation: "Search the indexed log content within the supplied dataset and time window; return representative matches and a separate total count.", limitation: "A search match is a log line, not a complete traceback or an independent incident." },
  { label: "Event context", family: "Investigation", name: "investigate_event", parameters: { dataset: "openstack", line_id: 45631, window: 10 }, evidenceType: "Event detail and nearby log context", operation: "Inspect the recorded event and adjacent log lines. The tool also consults recurrence and same-source context with their own scopes.", limitation: "Nearby messages and recurrence are supporting context, not proof of causation. Some tool subqueries extend beyond the two-day search window." },
  { label: "Component counts", family: "Aggregation", name: "count_problems", parameters: { dataset: "openstack", group_by: "component", start: "2017-05-16 00:00:00", end: "2017-05-18 00:00:00", limit: 10 }, evidenceType: "Component-level problem aggregation", operation: "Aggregate problem log lines by component within the supplied historical window; inspect the recorded ERROR volume for oslo_service.periodic_task.", limitation: "The 192 ERROR lines are a component-level measurement. They do not establish 192 disk failures or 192 independent incidents." },
];

export const logiqLogContext = "InvalidDiskInfo: Disk info file is invalid: qemu-img failed to execute on /var/lib/nova/instances/16797a0f-32fb-494c-8f36-38588148c35d/disk : Unexpected error while running command.";
