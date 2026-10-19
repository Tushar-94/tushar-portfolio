import styles from "./LogIQRoleDemo.module.css";
import { CaseStudySection } from "./CaseStudySection";

const perspectives = [
  {
    role: "Engineer",
    focus: "Technical diagnosis",
    finding: "Disk inspection failed with a missing-path diagnostic.",
    action: "Check disk paths, image cache, and instance lifecycle timing.",
  },
  {
    role: "Team Lead",
    focus: "Investigation coordination",
    finding: "Recurring component errors; ownership was unassigned in the sample mapping.",
    action: "Assign an owner and coordinate compute/storage investigation.",
  },
  {
    role: "Manager",
    focus: "Operational prioritization",
    finding: "Recurring disk errors and a separate CRITICAL identity-service signal.",
    action: "Prioritize follow-up by severity and scope; assign responsible owners.",
  },
];

export function LogIQInvestigationShowcase({ selectedRole }: { selectedRole: string }) {
  const perspective = perspectives.find((item) => item.role === selectedRole) ?? perspectives[0];

  return (
    <CaseStudySection number="04" title="Investigation in Action">
      <header>
        <h3 className="text-xl font-semibold tracking-tight">OpenStack — Disk Inspection Failure</h3>
        <p className="mt-3 max-w-2xl text-sm leading-6 text-muted">
          Historical infrastructure logs revealed disk inspection errors involving{" "}
          <span className="font-mono text-xs">qemu-img</span> and{" "}
          <span className="font-mono text-xs">InvalidDiskInfo</span>.
        </p>
      </header>

      <div aria-live="polite" aria-atomic="true" className="mt-5 border-l-2 border-border pl-5">
        <div key={perspective.role} className={styles.result}>
          <p className="font-mono text-xs text-muted">{perspective.role} perspective</p>
          <dl className="mt-4 grid gap-5 text-sm leading-6 sm:grid-cols-2">
            <div>
              <dt className="font-medium">Finding</dt>
              <dd className="mt-1 text-muted">{perspective.finding}</dd>
            </div>
            <div>
              <dt className="font-medium">Recommended action</dt>
              <dd className="mt-1 text-muted">{perspective.action}</dd>
            </div>
          </dl>
        </div>
      </div>

      <p className="mt-5 text-xs leading-5 text-muted">
        Based on recorded log evidence. Root cause and operational impact were not confirmed.
      </p>
    </CaseStudySection>
  );
}
