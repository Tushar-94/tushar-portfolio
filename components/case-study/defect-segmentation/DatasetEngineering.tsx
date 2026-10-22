import { annotationWorkflow } from "@/data/defectSegmentation";
import { CompactPipeline } from "../CompactPipeline";
import { SyntheticComponent } from "./SyntheticComponent";

export function DatasetEngineering() {
  return (
    <>
      <p className="text-sm leading-7 text-muted">Accurate polygon annotations teach the model where defects end. The two categories presented different modelling difficulties; targeted augmentation investigated whether additional short-shot training variation could improve segmentation.</p>
      <div className="mt-6 rounded-2xl border border-border bg-surface p-4 sm:p-5">
        <CompactPipeline label="Dataset engineering workflow" steps={annotationWorkflow} />
      </div>
      <figure aria-label="Synthetic augmentation and polygon transformation example" className="mt-5 overflow-hidden rounded-2xl border border-border bg-surface">
        <div className="grid grid-cols-3 divide-x divide-border">
          {[
            { name: "Original", transformed: false, polygon: false },
            { name: "Augmented", transformed: true, polygon: false },
            { name: "Transformed Polygon", transformed: true, polygon: true },
          ].map((view, index) => (
            <div key={view.name} className="min-w-0">
              <SyntheticComponent defect="short-shot" masks={false} boxes={false} labels={false} transformed={view.transformed} polygon={view.polygon} />
              <p className="border-t border-border px-2 py-3 text-center font-mono text-[10px] leading-5 text-muted">{view.name}{index < 2 && <span aria-hidden="true" className="ml-2">→</span>}</p>
            </div>
          ))}
        </div>
        <figcaption className="border-t border-border p-4 text-xs leading-6 text-muted">
          <strong className="font-medium text-foreground">Synthetic augmentation illustration.</strong> An illustrative geometric transform moves the component and polygon together; it does not reproduce a proprietary training sample or a model prediction.
        </figcaption>
      </figure>
      <p className="mt-5 border-l-2 border-foreground pl-4 text-xs leading-6 text-muted"><strong className="font-medium text-foreground">Training-only augmentation.</strong> Validation and test observations were excluded from augmentation.</p>
    </>
  );
}
