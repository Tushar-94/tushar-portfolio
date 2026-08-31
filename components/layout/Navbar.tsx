"use client";

import { useState } from "react";

import { Container } from "@/components/layout/Container";

const navigation = [

  { label: "About", href: "#about" },

  { label: "Experience", href: "#experience" },

  { label: "Projects", href: "#projects" },

  { label: "Writing", href: "#writing" },

];

export function Navbar() {

  const [isOpen, setIsOpen] = useState(false);

  function closeMenu() {

    setIsOpen(false);

  }

  return (

    <header className="sticky top-0 z-50 border-b border-black/5 bg-background/90 backdrop-blur-md">

      <Container>

        <nav

          className="flex h-20 items-center justify-between"

          aria-label="Primary navigation"

        >

          <a

            href="#top"

            onClick={closeMenu}

            className="rounded-sm text-sm font-semibold tracking-[0.14em] text-foreground outline-none focus-visible:ring-2 focus-visible:ring-foreground focus-visible:ring-offset-4 focus-visible:ring-offset-background"

          >

            TUSHAR RAO

          </a>

          <div className="hidden items-center gap-8 md:flex">

            {navigation.map((item) => (

              <a

                key={item.label}

                href={item.href}

                className="rounded-sm text-sm text-muted transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground focus-visible:ring-offset-4 focus-visible:ring-offset-background"

              >

                {item.label}

              </a>

            ))}

            <a

              href="#contact"

              className="rounded-full border border-border bg-surface px-4 py-2 text-sm font-medium transition-colors hover:bg-neutral-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground focus-visible:ring-offset-4 focus-visible:ring-offset-background"

            >

              Contact

            </a>

          </div>

          <button

            type="button"

            className="flex h-10 w-10 items-center justify-center rounded-full border border-border bg-surface text-foreground md:hidden"

            aria-expanded={isOpen}

            aria-controls="mobile-navigation"

            aria-label={isOpen ? "Close navigation menu" : "Open navigation menu"}

            onClick={() => setIsOpen((current) => !current)}

          >

            <span

              aria-hidden="true"

              className="font-mono text-lg leading-none"

            >

              {isOpen ? "×" : "☰"}

            </span>

          </button>

        </nav>

        {isOpen && (

          <div

            id="mobile-navigation"

            className="border-t border-border py-6 md:hidden"

          >

            <div className="flex flex-col">

              {navigation.map((item) => (

                <a

                  key={item.label}

                  href={item.href}

                  onClick={closeMenu}

                  className="border-b border-border py-4 text-base font-medium text-foreground"

                >

                  {item.label}

                </a>

              ))}

              <a

                href="#contact"

                onClick={closeMenu}

                className="mt-6 inline-flex w-fit rounded-full bg-foreground px-5 py-3 text-sm font-medium text-white"

              >

                Contact

              </a>

            </div>

          </div>

        )}

      </Container>

    </header>

  );

}