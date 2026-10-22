import type { ReactNode } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import styles from "./Directory.module.css";

export function DirectoryShell({ children, activePath }: { children: ReactNode; activePath: string }) {
  return <>
    <a href="#directory-content" className={styles.skipLink}>Skip to content</a>
    <Navbar activePath={activePath} />
    <main id="directory-content" tabIndex={-1} className={styles.directory}>{children}</main>
    <Footer />
  </>;
}

export function Arrow({ diagonal = false }: { diagonal?: boolean }) {
  return <svg aria-hidden="true" width="20" height="20" viewBox="0 0 24 24" fill="none"><path d={diagonal ? "M6 18 18 6M6 6h12v12" : "M4 12h16m-6-6 6 6-6 6"} stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" /></svg>;
}
