"use client";

import { useId, useRef, useState, type KeyboardEvent } from "react";
import type { CaseStudy } from "@/types/case-study";
import { CaseStudySection } from "./CaseStudySection";
import { LogIQInvestigationShowcase } from "./LogIQInvestigationShowcase";
import styles from "./LogIQRoleDemo.module.css";

export function LogIQRoleDemo({ roles }: { roles: NonNullable<CaseStudy["roles"]> }) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const id = useId();

  function handleKeyDown(event: KeyboardEvent<HTMLButtonElement>, index: number) {
    let nextIndex: number;
    switch (event.key) {
      case "ArrowRight": nextIndex = (index + 1) % roles.length; break;
      case "ArrowLeft": nextIndex = (index - 1 + roles.length) % roles.length; break;
      case "Home": nextIndex = 0; break;
      case "End": nextIndex = roles.length - 1; break;
      default: return;
    }
    event.preventDefault();
    setSelectedIndex(nextIndex);
    tabRefs.current[nextIndex]?.focus();
  }

  return (
    <>
      <CaseStudySection number="03" title="Role-Aware Intelligence">
        <p className="mb-5 text-sm leading-6 text-muted">Select a role to see its focus and the investigation below adapt.</p>
        <div role="tablist" aria-label="Investigation perspective" aria-orientation="horizontal"
          className="grid grid-cols-3 gap-1 rounded-xl border border-border bg-surface p-1">
          {roles.map((role, index) => (
            <button key={role.title} type="button" role="tab" id={`${id}-tab-${index}`}
              aria-selected={selectedIndex === index} aria-controls={`${id}-panel-${index}`}
              tabIndex={selectedIndex === index ? 0 : -1}
              ref={(element) => { tabRefs.current[index] = element; }}
              onClick={() => setSelectedIndex(index)} onKeyDown={(event) => handleKeyDown(event, index)}
              className={`min-h-11 rounded-lg px-2 py-2 text-sm font-medium transition-colors ${selectedIndex === index ? "bg-foreground text-background" : "bg-surface text-foreground hover:bg-background"}`}>
              {role.title}
            </button>
          ))}
        </div>
        {roles.map((role, index) => (
          <div key={role.title} role="tabpanel" id={`${id}-panel-${index}`}
            aria-labelledby={`${id}-tab-${index}`} hidden={selectedIndex !== index} tabIndex={0}
            className="mt-5 rounded-lg focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-foreground">
            {selectedIndex === index && (
              <dl className={`${styles.result} grid gap-4 text-sm leading-6 sm:grid-cols-[1fr_1.5fr]`}>
                <div><dt className="font-mono text-xs text-muted">Focus</dt><dd className="mt-1">{role.focus}</dd></div>
                <div><dt className="font-mono text-xs text-muted">Output</dt><dd className="mt-1">{role.output}</dd></div>
              </dl>
            )}
          </div>
        ))}
      </CaseStudySection>

      <LogIQInvestigationShowcase selectedRole={roles[selectedIndex].title} />
    </>
  );
}
