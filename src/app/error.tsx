"use client";

import { Button, ButtonLink } from "@/components/ui/button";
import { Container } from "@/components/ui/layout";

export default function Error({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <Container className="flex min-h-[60vh] flex-col items-center justify-center py-24 text-center">
      <h1 className="text-h2 font-semibold">Something went wrong.</h1>
      <p className="mt-4 max-w-md text-fg-muted">An unexpected error occurred while loading this page.</p>
      <div className="mt-8 flex flex-col gap-3 xs:flex-row">
        <Button onClick={reset}>Try again</Button>
        <ButtonLink href="/" variant="secondary">
          Go to home
        </ButtonLink>
      </div>
    </Container>
  );
}
