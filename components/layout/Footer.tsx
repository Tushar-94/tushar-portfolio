import { Container } from "@/components/layout/Container";

export function Footer() {

  return (

    <footer className="border-t border-border py-8">

      <Container>

        <div className="flex flex-col gap-4 text-sm text-muted sm:flex-row sm:items-center sm:justify-between">

          <p>© 2026 Tushar Rao</p>

          <p>

            Built with Next.js, TypeScript, and Tailwind CSS.

          </p>

        </div>

      </Container>

    </footer>

  );

}