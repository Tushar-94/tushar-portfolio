import { Container } from "@/components/layout/Container";

const navigation = [

  { label: "About", href: "#about" },

  { label: "Experience", href: "#experience" },

  { label: "Projects", href: "#projects" },

  { label: "Writing", href: "#writing" },

];

export function Navbar() {

  return (

    <header className="sticky top-0 z-50 border-b border-black/5 bg-background/90 backdrop-blur-md">

      <Container>

        <nav

          className="flex h-20 items-center justify-between"

          aria-label="Primary navigation"

        >

          <a

            href="#top"

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

        </nav>

      </Container>

    </header>

  );

}