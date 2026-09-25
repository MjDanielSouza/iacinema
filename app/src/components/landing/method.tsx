import { Card } from "@/components/ui/card";
import { SectionBackdrop } from "./section-backdrop";

const BACKDROP =
  "https://d8j0ntlcm91z4.cloudfront.net/user_31jsKS5Tv7Qv1EoTdhaNio59PHu/hf_20260925_224455_c55427f5-5a63-4b2b-bdf7-903ebf6769d0.png";

function IconX() {
  return (
    <svg viewBox="0 0 16 16" fill="none" className="w-3.5 h-3.5 shrink-0" aria-hidden="true">
      <path d="M4 4l8 8M12 4l-8 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function IconCheck() {
  return (
    <svg viewBox="0 0 16 16" fill="none" className="w-3.5 h-3.5 shrink-0 text-lime" aria-hidden="true">
      <path d="M3 8.5l3.2 3.2L13 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function Method() {
  return (
    <section id="metodo" className="relative scroll-mt-20 overflow-hidden" style={{ paddingBlock: "var(--section-spacing)" }}>
      <SectionBackdrop src={BACKDROP} alt="Mesa de pré-produção com storyboard, roteiro e claquete" />
      <div className="relative max-w-[1240px] mx-auto px-[clamp(20px,4vw,48px)]">
        <p
          className="scroll-reveal font-editorial leading-[1.02] tracking-[-0.015em] mb-14"
          style={{ fontSize: "clamp(2.5rem, 5.5vw, 5rem)", maxWidth: "30ch" }}
        >
          A maioria dos tutoriais de IA te dá prompts soltos. Aqui você aprende{" "}
          <em className="text-violet">o pipeline inteiro</em>{" "}
          — a mesma lógica de decupagem, raccord de figurino e direção de
          fotografia que uma produção de verdade usa, adaptada pra IA
          generativa.
        </p>

        <div className="scroll-reveal-stagger grid sm:grid-cols-2 gap-5">
          <Card variant="base" className="p-7 sm:p-10">
            <p className="flex items-center gap-2 font-technical text-xs uppercase tracking-[0.14em] text-red mb-5">
              <IconX /> Fluxo comum (prompts soltos)
            </p>
            <ul className="space-y-3 text-sm text-body">
              <li>Personagem muda de rosto e roupa a cada take</li>
              <li>Prompts gigantes tentando adivinhar iluminação</li>
              <li>Zero continuidade entre planos</li>
            </ul>
          </Card>
          <div className="border border-border-accent rounded-lg bg-bg-raised p-7 sm:p-10">
            <p className="flex items-center gap-2 font-technical text-xs uppercase tracking-[0.14em] text-lime mb-5">
              <IconCheck /> Fluxo pipeline (estúdio)
            </p>
            <ul className="space-y-3 text-sm text-subtitle">
              <li>Decupagem prévia do roteiro inteiro</li>
              <li>Character Sheet travado por cena</li>
              <li>Direção de câmera separada do asset visual</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
