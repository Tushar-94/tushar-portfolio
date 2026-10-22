import Link from "next/link";
import { Container } from "@/components/layout/Container";
import { projects } from "@/data/projects";
import { profile } from "@/data/profile";
import { experience } from "@/data/experience";
import { HomeNavigation } from "./HomeNavigation";
import { SystemVisual } from "./SystemVisual";
import { ProjectPreview } from "./ProjectPreviews";
import { EngineeringSequence } from "./EngineeringSequence";
import { Reveal } from "./Reveal";
import styles from "./Home.module.css";

const featuredSlugs = ["industrial-knowledge-copilot", "industrial-vision-anomaly-detection", "forecasting-decision-intelligence"];
const secondarySlugs = ["logiq-ai-agent", "industrial-defect-detection-segmentation", "visionseg"];
const expertise = [
  { title: "Applied AI & Intelligent Systems", description: "RAG systems, LLM applications, agentic workflows, and intelligent automation.", keywords: ["Retrieval", "Reasoning", "Automation"], symbol: "systems" },
  { title: "Computer Vision & Deep Learning", description: "Object detection, semantic segmentation, anomaly detection, and visual quality inspection.", keywords: ["Perception", "Segmentation", "Inspection"], symbol: "vision" },
  { title: "Data Science & ML Engineering", description: "Predictive modelling, experimentation, statistical evaluation, and scalable ML pipelines.", keywords: ["Experimentation", "Evaluation", "Reliability"], symbol: "data" },
];

export function Arrow({ diagonal = false }: { diagonal?: boolean }) {
  return <svg aria-hidden="true" width="18" height="18" viewBox="0 0 24 24" fill="none"><path d={diagonal ? "M5 19 19 5M5 5h14v14" : "M4 12h16m-6-6 6 6-6 6"} stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>;
}

function ExpertiseSymbol({ kind }: { kind: string }) {
  return (
    <svg aria-hidden="true" viewBox="0 0 64 48" fill="none" className={styles.expertiseSymbol}>
      {kind === "systems" ? <>
        <path d="M12 12h17l14 24H29L15 12m14 0h14M29 36H12" stroke="currentColor" />
        <circle cx="12" cy="12" r="4" fill="var(--background)" stroke="currentColor" /><circle cx="43" cy="12" r="4" fill="var(--background)" stroke="currentColor" /><circle cx="12" cy="36" r="4" fill="var(--background)" stroke="currentColor" /><circle cx="43" cy="36" r="4" fill="currentColor" />
      </> : kind === "vision" ? <>
        <path d="M10 17V8h10m24 0h10v9M10 31v9h10m24 0h10v-9" stroke="currentColor" /><path d="M16 24s6-9 16-9 16 9 16 9-6 9-16 9-16-9-16-9Z" stroke="currentColor" /><circle cx="32" cy="24" r="4" fill="currentColor" />
      </> : <>
        <path d="M10 39h45M14 30V18m12 12V9m12 21V15m12 15V5" stroke="currentColor" /><circle cx="14" cy="18" r="3" fill="currentColor" /><circle cx="26" cy="9" r="3" fill="currentColor" /><circle cx="38" cy="15" r="3" fill="currentColor" /><circle cx="50" cy="5" r="3" fill="currentColor" />
      </>}
    </svg>
  );
}

export function HomePage() {
  return (
    <div className={styles.home} id="top">
      <a href="#main-content" className={styles.skipLink}>Skip to content</a>
      <HomeNavigation />
      <main id="main-content" tabIndex={-1}>
        <section id="home" className={styles.hero} aria-labelledby="hero-title">
          <Container>
            <div className={`${styles.heroEyebrow} ${styles.entrance}`}>
              <p className={styles.eyebrow}>{profile.role} <span aria-hidden="true">/</span> {profile.location}</p>
              <span className={styles.heroIndex}>Systems. Models. Real-world problems.</span>
            </div>
            <h1 id="hero-title" className={`${styles.heroTitle} ${styles.entrance}`}><span>Engineering Intelligence.</span><span>Building What Matters.</span></h1>
            <div className={styles.heroBottom}>
              <div className={styles.heroIntroduction}>
                <p className={`${styles.heroCopy} ${styles.entrance}`}>I design and engineer intelligent systems across machine learning, computer vision, and applied AI—turning complex problems into reliable, practical solutions.</p>
                <div className={`${styles.actions} ${styles.entrance}`}><a href="#projects" className={styles.primaryButton}>Explore My Work <Arrow /></a><Link href="/about" className={styles.textLink}>About Me <Arrow diagonal /></Link></div>
              </div>
              <SystemVisual />
            </div>
            <div className={styles.heroFootnote}><span>From an idea to an evaluated system.</span><a href="#expertise" className={styles.textLink}>A closer look <span aria-hidden="true">↓</span></a></div>
          </Container>
        </section>

        <section id="expertise" className={styles.section} aria-labelledby="expertise-title">
          <Container><Reveal>
            <div className={styles.sectionHeading}><p className={styles.eyebrow}>01 / Expertise</p><h2 id="expertise-title">What I Build</h2></div>
            <div className={styles.expertiseGrid}>{expertise.map((item, index) => (
              <article className={styles.expertiseCard} key={item.title} tabIndex={0} aria-labelledby={`expertise-${item.symbol}`}>
                <div className={styles.cardTop}><span className={styles.eyebrow}>0{index + 1}</span><ExpertiseSymbol kind={item.symbol} /></div>
                <h3 id={`expertise-${item.symbol}`}>{item.title}</h3><p>{item.description}</p>
                <ul className={styles.keywords} aria-label={`${item.title} focus areas`}>{item.keywords.map((word) => <li key={word}>{word}</li>)}</ul>
              </article>
            ))}</div>
          </Reveal></Container>
        </section>

        <section id="projects" className={`${styles.section} ${styles.workSection}`} aria-labelledby="work-title">
          <Container>
            <Reveal><div className={`${styles.sectionHeading} ${styles.workHeading}`}><div><p className={styles.eyebrow}>02 / Selected Work</p><h2 id="work-title">Selected Work</h2></div><p>Intelligent systems,<br />engineered with purpose.</p></div></Reveal>
            <div className={styles.featuredProjects}>{featuredSlugs.map((slug, index) => {
              const project = projects.find((item) => item.slug === slug)!;
              return <Reveal key={slug}>
                <article className={`${styles.featuredProject} ${index % 2 ? styles.reversed : ""}`} aria-labelledby={`title-${slug}`}>
                  <ProjectPreview slug={slug} />
                  <div className={styles.projectContent}>
                    <div className={styles.projectMeta}><span>0{index + 1}</span><span>{project.category}</span></div>
                    <h3 id={`title-${slug}`}><Link href={`/projects/${slug}`}>{project.title}</Link></h3>
                    <p>{project.description}</p>
                    <ul className={styles.tags} aria-label={`${project.title} technologies`}>{project.technologies.slice(0, 4).map((tag) => <li key={tag}>{tag}</li>)}</ul>
                    <Link href={`/projects/${slug}`} className={styles.caseLink}>Explore case study <Arrow /><span className="sr-only">: {project.title}</span></Link>
                  </div>
                </article>
              </Reveal>;
            })}</div>
            <Reveal>
              <div className={styles.moreWorkHeading}><h3>More explorations.</h3><Link href="/projects" className={styles.textLink}>View All Projects <Arrow /></Link></div>
              <div className={styles.secondaryGrid}>{secondarySlugs.map((slug, index) => {
                const project = projects.find((item) => item.slug === slug)!;
                return <Link key={slug} href={`/projects/${slug}`} className={styles.secondaryProject} aria-labelledby={`secondary-${slug}`}>
                  <div className={styles.cardTop}><span className={styles.eyebrow}>0{index + 4}</span><Arrow diagonal /></div>
                  <span className={styles.secondaryCategory}>{project.category}</span><h4 id={`secondary-${slug}`}>{project.title}</h4><p>{project.description}</p><span className={styles.secondaryTags}>{project.technologies.slice(0, 3).join(" / ")}</span>
                </Link>;
              })}</div>
            </Reveal>
          </Container>
        </section>

        <section id="approach" className={`${styles.section} ${styles.approachSection}`} aria-labelledby="approach-title">
          <Container><Reveal><div className={styles.sectionHeading}><p className={styles.eyebrow}>03 / How I Approach Engineering</p><h2 id="approach-title">Great models are only<br className={styles.desktopBreak} /> part of great systems.</h2></div><EngineeringSequence /></Reveal></Container>
        </section>

        <section id="experience" className={styles.section} aria-labelledby="experience-title">
          <Container><Reveal><div className={styles.experienceLayout}>
            <div className={styles.experienceIntro}><p className={styles.eyebrow}>04 / Professional Background</p><h2 id="experience-title">Experience</h2><p>A foundation in engineering,<br />across AI, software, and data.</p><Link href="/about" className={styles.textLink}>More About Me <Arrow diagonal /></Link></div>
            <ol className={styles.timeline}>{experience.map((item) => <li key={`${item.company}-${item.role}`}>
              <div className={styles.timelineHeading}><h3>{item.company}</h3><span>{item.period}</span></div><p className={styles.experienceRole}>{item.role}</p>{item.location && <p className={styles.experienceLocation}>{item.location}</p>}<p className={styles.experienceSummary}>{item.summary}</p>
            </li>)}</ol>
          </div></Reveal></Container>
        </section>

        <section id="writing" className={`${styles.section} ${styles.writingPreview}`} aria-labelledby="writing-preview-title">
          <Container><Reveal>
            <div className={`${styles.sectionHeading} ${styles.writingPreviewHeading}`}>
              <div><p className={styles.eyebrow}>05 / Notes from the Field</p><h2 id="writing-preview-title">Ideas, experiments<br />&amp; engineering lessons.</h2></div>
              <Link href="/writing" className={`${styles.textLink} ${styles.homePreviewCta}`}>Explore My Writing <Arrow /></Link>
            </div>
          </Reveal></Container>
        </section>

        <section id="contact" className={styles.contactSection} aria-labelledby="contact-title">
          <Container><Reveal>
            <p className={styles.eyebrow}>06 / Start a Conversation</p><p className={styles.contactQuestion}>Have a challenging problem?</p><h2 id="contact-title">Let’s build something<br />meaningful.</h2>
            <div className={styles.contactBottom}><p>Open to conversations about applied AI, computer vision, machine learning, and engineering opportunities.</p><a href={`mailto:${profile.email}`} className={styles.contactButton}>Get in Touch <Arrow diagonal /></a></div>
            <div className={styles.contactLinks}><a href={`mailto:${profile.email}`}>{profile.email}</a><div>
              <a href={profile.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn <Arrow diagonal /><span className="sr-only"> (opens in a new tab)</span></a><a href={profile.github} target="_blank" rel="noopener noreferrer">GitHub <Arrow diagonal /><span className="sr-only"> (opens in a new tab)</span></a>
            </div></div>
          </Reveal></Container>
        </section>
      </main>
      <footer className={styles.footer}><Container><div className={styles.footerInner}><p>© {new Date().getFullYear()} {profile.name}</p><p>Thoughtfully engineered.</p><a href="#top">Back to top <span aria-hidden="true">↑</span></a></div></Container></footer>
    </div>
  );
}
