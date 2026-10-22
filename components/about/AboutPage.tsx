import Link from "next/link";
import { Navbar } from "@/components/layout/Navbar";
import { Container } from "@/components/layout/Container";
import { Reveal } from "@/components/home/Reveal";
import { profile } from "@/data/profile";
import { DisciplineMap } from "./DisciplineMap";
import { Journey } from "./Journey";
import { ExpertiseExplorer } from "./ExpertiseExplorer";
import { expertiseCategories, journeyStages } from "./content";
import styles from "./About.module.css";

const principles = [
  { title: "Engineering Beyond the Model", description: "A model becomes valuable when it can be evaluated, integrated, maintained, and improved.", detail: "Think in systems." },
  { title: "Evidence Before Assumptions", description: "Reliable decisions require meaningful metrics, careful experimentation, and an understanding of uncertainty.", detail: "Make the reasoning inspectable." },
  { title: "Practical Impact", description: "The goal is not to use the most complicated technology, but to build the right solution for the problem.", detail: "Let the problem guide the tools." },
];
const education = [
  { degree: "Master of Science", subject: "Data and Knowledge Engineering", university: "Otto von Guericke University Magdeburg", country: "Germany", symbol: "M.Sc." },
  { degree: "Bachelor of Technology", subject: "Information Technology", university: "GITAM University", country: "India", symbol: "B.Tech." },
];

export function AboutPage() {
  return (
    <div className={styles.about} id="about-top">
      <a href="#about-content" className={styles.skipLink}>Skip to content</a>
      <Navbar activePath="/about" />
      <main id="about-content" tabIndex={-1}>
        <section className={styles.hero} aria-labelledby="about-title">
          <Container>
            <div className={`${styles.heroEyebrow} ${styles.entrance}`}><p className={styles.eyebrow}>About / Engineering & Intelligence</p><span>{profile.location} <span aria-hidden="true">↗</span></span></div>
            <h1 className={`${styles.heroTitle} ${styles.entrance}`} id="about-title"><span>Building intelligent systems,</span><span>grounded in engineering.</span></h1>
            <div className={styles.heroBody}>
              <div className={`${styles.introduction} ${styles.entrance}`}>
                <p>I’m a machine learning and AI engineer based in Germany, with a background spanning software engineering, data science, and computer vision.</p>
                <p>My work focuses on translating complex technical problems into practical systems—from data pipelines and predictive models to industrial vision applications and LLM-powered tools.</p>
                <p className={styles.heroStatement}>What interests me most is the engineering that connects a promising model to a reliable, useful application.</p>
              </div>
              <DisciplineMap />
            </div>
            <div className={styles.heroFootnote}><span>Software, data, models—and the connections between them.</span><a href="#journey">Follow the journey <span aria-hidden="true">↓</span></a></div>
          </Container>
        </section>

        <section id="journey" className={`${styles.section} ${styles.journeySection}`} aria-labelledby="journey-title">
          <Container><Reveal>
            <div className={styles.sectionHeading}><div><p className={styles.eyebrow}>01 / My Journey</p><h2 id="journey-title">From Software to<br />Intelligent Systems</h2></div><p className={styles.sectionNote}>A conceptual progression across overlapping disciplines—not separate employment periods.</p></div>
            <Journey stages={journeyStages} />
          </Reveal></Container>
        </section>

        <section id="principles" className={styles.section} aria-labelledby="principles-title">
          <Container><Reveal><div className={styles.principlesLayout}>
            <div className={styles.principlesIntro}><p className={styles.eyebrow}>02 / Engineering Principles</p><h2 id="principles-title">What Drives<br />My Work</h2><p>The decisions around a model matter as much as the model itself.</p></div>
            <div className={styles.principles}>{principles.map((principle, index) => <article key={principle.title} tabIndex={0} aria-labelledby={`principle-${index}`}><span className={styles.principleNumber}>0{index + 1}</span><div><h3 id={`principle-${index}`}>{principle.title}</h3><p>{principle.description}</p><span className={styles.principleDetail}>{principle.detail}</span></div></article>)}</div>
          </div></Reveal></Container>
        </section>

        <section id="expertise" className={`${styles.section} ${styles.expertiseSection}`} aria-labelledby="expertise-title">
          <Container><Reveal>
            <div className={styles.sectionHeading}><div><p className={styles.eyebrow}>03 / Technical Expertise</p><h2 id="expertise-title">The Tools Behind<br />the Systems</h2></div><p className={styles.sectionNote}>Explore the disciplines, methods, and project work that inform my approach.</p></div>
            <ExpertiseExplorer categories={expertiseCategories} />
          </Reveal></Container>
        </section>

        <section id="education" className={`${styles.section} ${styles.educationSection}`} aria-labelledby="education-title">
          <Container><Reveal>
            <div className={styles.sectionHeading}><div><p className={styles.eyebrow}>04 / Education & Research Interests</p><h2 id="education-title">Academic Foundations</h2></div></div>
            <div className={styles.educationGrid}>{education.map((item) => <article key={item.degree} className={styles.educationCard}>
              <div className={styles.educationTop}><p className={styles.eyebrow}>{item.degree}</p><span aria-hidden="true">{item.symbol}</span></div><h3>{item.subject}</h3><p>{item.university}</p><span className={styles.educationCountry}>{item.country}</span>
            </article>)}</div>
            <div className={styles.researchInterests}><h3 className={styles.eyebrow}>Research interests</h3><ul>{["Machine Learning", "Visual Computing", "Knowledge Systems", "Applied Artificial Intelligence"].map((interest) => <li key={interest}>{interest}</li>)}</ul></div>
          </Reveal></Container>
        </section>

        <section id="beyond" className={styles.closing} aria-labelledby="closing-title">
          <Container><Reveal>
            <p className={styles.eyebrow}>05 / Beyond the Code</p><h2 id="closing-title">Curious by Nature.<br /><span>Engineering by Practice.</span></h2>
            <div className={styles.closingBody}><p className={styles.closingStatement}>I enjoy working at the intersection of research and practical engineering, where complex ideas become systems that people can actually use.</p><div><p>My interests span intelligent automation, visual understanding, reliable machine learning, and the broader challenge of making AI useful beyond controlled experiments.</p><p>I’m particularly interested in opportunities that combine technical depth, thoughtful engineering, and meaningful real-world applications.</p></div></div>
            <div className={styles.closingActions}><Link href="/projects" className={styles.primaryButton}>Explore My Projects <span aria-hidden="true">↗</span></Link><a href={`mailto:${profile.email}`} className={styles.contactLink}>Get in Touch <span aria-hidden="true">↗</span></a></div>
          </Reveal></Container>
        </section>
      </main>
      <footer className={styles.footer}><Container><div className={styles.footerInner}><p>© {new Date().getFullYear()} {profile.name}</p><div><a href={profile.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn <span aria-hidden="true">↗</span><span className="sr-only"> (opens in a new tab)</span></a><a href={profile.github} target="_blank" rel="noopener noreferrer">GitHub <span aria-hidden="true">↗</span><span className="sr-only"> (opens in a new tab)</span></a><a href="#about-top">Back to top <span aria-hidden="true">↑</span></a></div></div></Container></footer>
    </div>
  );
}
