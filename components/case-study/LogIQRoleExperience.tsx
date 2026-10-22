"use client";

import { useState } from "react";
import { CaseStudySection } from "./CaseStudySection";
import { LogIQArchitectureDiagram } from "./LogIQArchitectureDiagram";
import { LogIQInvestigationShowcase } from "./LogIQInvestigationShowcase";
import { perspectives, type LogIQPerspective } from "./logiq-architecture/content";

export function LogIQRoleExperience({ note, sourceUrl }: { note?: string; sourceUrl?: string }) {
  const [perspective, setPerspective] = useState<LogIQPerspective>(perspectives[0]);

  return (
    <>
      <CaseStudySection number="02" title="System Architecture">
        <LogIQArchitectureDiagram note={note} perspective={perspective} onRoleChange={setPerspective} />
      </CaseStudySection>
      <LogIQInvestigationShowcase selectedRole={perspective.title} sourceUrl={sourceUrl} />
    </>
  );
}
