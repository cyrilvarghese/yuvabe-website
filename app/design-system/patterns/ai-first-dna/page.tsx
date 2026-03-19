import { StudioAiFirstSection } from "@/components/studio/studio-ai-first-section";

// This preview route isolates the dark AI-first section so the white-to-dark cut can be reviewed before homepage placement.
export default function AiFirstDnaPatternPage() {
  return (
    <main className="min-h-screen bg-white text-foreground">
      {/* The upper light band makes the hard transition into the dark block easy to inspect. */}
      <section className="border-b border-slate-200/80 bg-white">
        <div className="mx-auto flex max-w-7xl flex-col gap-3 px-6 py-14 md:px-10 md:py-16">
          <p className="text-label-sm uppercase tracking-[0.22em] text-[var(--color-text-tertiary)]">Pattern preview</p>
          <div className="max-w-3xl space-y-2">
            <h1 className="text-heading-xl text-foreground">Standalone AI-first DNA section</h1>
            <p className="text-body-lg text-muted-foreground">
              This light band is only here to confirm the sharp cut into the dark pattern block below.
            </p>
          </div>
        </div>
      </section>

      <StudioAiFirstSection />

      {/* The lower light band confirms the dark section reads as a self-contained stripe, not a page takeover. */}
      <section className="border-t border-slate-200/80 bg-white">
        <div className="mx-auto max-w-7xl px-6 py-14 md:px-10 md:py-16">
          <div className="max-w-2xl space-y-2">
            <h2 className="text-heading-md text-foreground">Return to light canvas</h2>
            <p className="text-body-md text-muted-foreground">
              The section should still feel modular when the page comes back to the standard light shell below it.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
