import { Container } from "@/components/layout/Container";

import { profile } from "@/data/profile";

export function Footer() {

  return (

    <footer className="border-t border-border py-8">

      <Container>

        <div className="flex flex-col gap-4 text-sm text-muted sm:flex-row sm:items-center sm:justify-between">

          <p>© 2026 {profile.name}</p>

          <div className="flex flex-wrap items-center gap-5">

            <a

              href={profile.github}

              target="_blank"

              rel="noreferrer"

              className="transition-colors hover:text-foreground"

            >

              GitHub ↗

            </a>

            <span>Built with Next.js, TypeScript, and Tailwind CSS.</span>

          </div>

        </div>

      </Container>

    </footer>

  );

}