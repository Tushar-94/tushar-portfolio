"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { Container } from "@/components/layout/Container";
import { profile } from "@/data/profile";

const navigation = [
  { label: "About", href: "/about" },
  { label: "Experience", href: "/#experience", section: "experience" },
  { label: "Projects", href: "/projects" },
  { label: "Writing", href: "/writing" },
  { label: "Contact", href: "/#contact", section: "contact" },
];

type NavbarProps = { activePath?: string; home?: boolean };

export function Navbar({ activePath, home = false }: NavbarProps = {}) {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const header = useRef<HTMLElement>(null);
  const trigger = useRef<HTMLButtonElement>(null);
  const editorial = home || activePath === "/projects";
  const mobileId = home ? "home-mobile-navigation" : "mobile-navigation";

  // Preserve the homepage's section-aware navigation in the shared header.
  useEffect(() => {
    if (!home || !("IntersectionObserver" in window)) return;
    const sections = Array.from(document.querySelectorAll<HTMLElement>("main > section[id]"));
    const footer = document.querySelector("footer");
    let observer: IntersectionObserver;
    function updateActive() {
      const line = (header.current?.offsetHeight ?? 76) + 24;
      const current = sections.filter(section => section.getBoundingClientRect().top <= line + 1).at(-1);
      const atClosingSection = footer && footer.getBoundingClientRect().top < window.innerHeight;
      setActiveSection(atClosingSection ? "contact" : current?.id ?? "");
    }
    function observeSections() {
      observer?.disconnect();
      const top = (header.current?.offsetHeight ?? 76) + 24;
      const bottom = Math.max(0, window.innerHeight - top - 2);
      observer = new IntersectionObserver(updateActive, { rootMargin: `-${top}px 0px -${bottom}px 0px`, threshold: 0 });
      sections.forEach(section => observer.observe(section));
      updateActive();
    }
    observeSections();
    const footerObserver = new IntersectionObserver(updateActive, { threshold: [0, .1] });
    if (footer) footerObserver.observe(footer);
    window.addEventListener("resize", observeSections);
    return () => {
      observer.disconnect();
      footerObserver.disconnect();
      window.removeEventListener("resize", observeSections);
    };
  }, [home]);

  useEffect(() => {
    const desktop = window.matchMedia("(min-width: 768px)");
    const closeOnDesktop = () => { if (desktop.matches) setIsOpen(false); };
    desktop.addEventListener("change", closeOnDesktop);
    return () => desktop.removeEventListener("change", closeOnDesktop);
  }, []);

  useEffect(() => {
    if (!isOpen) return;
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") { setIsOpen(false); trigger.current?.focus(); }
    }
    function onPointerDown(event: PointerEvent) {
      if (!header.current?.contains(event.target as Node)) setIsOpen(false);
    }
    document.addEventListener("keydown", onKeyDown);
    document.addEventListener("pointerdown", onPointerDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.removeEventListener("pointerdown", onPointerDown);
    };
  }, [isOpen]);

  function links(mobile = false) {
    return navigation.map(item => {
      const contact = item.label === "Contact";
      const href = home && item.href.startsWith("/#") ? item.href.slice(1) : item.href;
      const current = activePath === item.href ? "page" : home && item.section === activeSection ? "location" : undefined;
      const className = mobile
        ? contact
          ? editorial
            ? "mt-5 inline-flex min-h-11 w-fit items-center justify-between gap-5 rounded-full border border-border px-4 py-3 text-sm font-medium"
            : "mt-6 inline-flex min-h-11 w-fit rounded-full bg-foreground px-5 py-3 text-sm font-medium text-white!"
          : "flex min-h-11 items-center border-b border-border py-4 text-base font-medium aria-[current]:underline! aria-[current]:underline-offset-4"
        : contact
          ? `inline-flex items-center gap-5 rounded-full border border-border bg-surface px-4 py-2 transition-colors hover:bg-neutral-100 ${editorial ? "text-xs" : "text-sm font-medium"}`
          : `rounded-sm text-muted! transition-colors hover:text-foreground! aria-[current]:text-foreground! aria-[current]:underline! aria-[current]:underline-offset-8 ${editorial ? "py-2.5 text-[13px]" : "text-sm"}`;
      return <Link key={item.label} href={href} onClick={() => setIsOpen(false)} aria-current={current} className={`${className} focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-foreground`}>
        {item.label}{contact && editorial && <span aria-hidden="true">↗</span>}
      </Link>;
    });
  }

  return <header ref={header} className={`sticky top-0 z-50 border-b ${editorial ? "border-border bg-background" : "border-black/5 bg-background/90 backdrop-blur-md"}`} onBlur={event => { if (!event.currentTarget.contains(event.relatedTarget)) setIsOpen(false); }}>
    <Container>
      <nav className={`flex items-center justify-between gap-6 ${editorial ? "h-[68px] md:h-[76px]" : "h-20"}`} aria-label="Primary navigation">
        <Link href="/" onClick={() => setIsOpen(false)} className={`whitespace-nowrap rounded-sm font-semibold uppercase focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-foreground ${editorial ? "text-[11px] tracking-[0.13em] md:text-xs" : "text-sm tracking-[0.14em]"}`}>{profile.name}</Link>
        <div className={`hidden items-center md:flex ${editorial ? "gap-7" : "gap-8"}`}>{links()}</div>
        <button ref={trigger} type="button" className={`flex shrink-0 items-center justify-center rounded-full border border-border md:hidden focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-foreground ${editorial ? "h-11 w-11 bg-transparent" : "h-10 w-10 bg-surface"}`} aria-expanded={isOpen} aria-controls={mobileId} aria-label={isOpen ? "Close navigation menu" : "Open navigation menu"} onClick={() => setIsOpen(open => !open)}>
          {editorial ? <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true"><path d={isOpen ? "M3 3l12 12M15 3 3 15" : "M1 6h16M1 12h16"} stroke="currentColor" /></svg> : <span aria-hidden="true" className="font-mono text-lg leading-none">{isOpen ? "×" : "☰"}</span>}
        </button>
      </nav>
      <div id={mobileId} hidden={!isOpen} className={editorial ? "absolute inset-x-0 top-full border-b border-border bg-background px-6 pb-6 pt-2.5 md:hidden" : "border-t border-border py-6 md:hidden"}>
        <div className="flex flex-col">{links(true)}</div>
      </div>
    </Container>
  </header>;
}
