import { roadmap } from "./architecture/content";
import styles from "./architecture/VisionArchitecture.module.css";

export function EngineeringRoadmap() {
  return <div className={styles.roadmap}>
    <p className={styles.roadmapIntro}>Implemented building blocks, unfinished runners, and planned integrations. Status reflects inspected source code; it does not imply a completed training run or production deployment.</p>
    <table><caption className="sr-only">VisionSeg engineering capabilities and source-verified implementation status</caption><thead><tr><th scope="col">Capability</th><th scope="col">Engineering purpose</th><th scope="col">Status</th></tr></thead><tbody>{roadmap.map(item=><tr key={item.capability}><th scope="row">{item.capability}<span className={styles.mobilePurpose}>{item.purpose}<span className={styles.roadmapSource}>{item.evidence}</span></span></th><td>{item.purpose}<span className={styles.roadmapSource}>{item.evidence}</span></td><td><span className={styles.status} data-status={item.status}>{item.status}</span></td></tr>)}</tbody></table>
    <p className={styles.roadmapFoot}>Scaffold = entry point exists without an implemented workflow. FastAPI, Docker, ONNX and GitHub Actions remain integration targets.</p>
  </div>;
}
