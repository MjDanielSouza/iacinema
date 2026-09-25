import { Button } from "@/components/ui/button";

export function FinalCta({
  primaryHref,
  primaryLabel,
}: {
  primaryHref: string;
  primaryLabel: string;
}) {
  return (
    <section className="relative text-center overflow-hidden" style={{ paddingBlock: "var(--section-spacing)" }}>
      <div
        className="absolute inset-0"
        style={{ background: "var(--gradient-hero-glow-green)" }}
        aria-hidden="true"
      />
      <div className="relative max-w-[1240px] mx-auto px-[clamp(20px,4vw,48px)]">
        <h2
          className="scroll-reveal font-display font-bold text-title mb-10"
          style={{ fontSize: "clamp(2.5rem, 5vw, 4.5rem)" }}
        >
          Comece pela Fase 1, de graça.
        </h2>
        <div className="scroll-reveal flex justify-center">
          <Button href={primaryHref} variant="primary">
            {primaryLabel}
          </Button>
        </div>
      </div>
    </section>
  );
}
