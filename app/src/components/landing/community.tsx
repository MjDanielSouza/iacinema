import { Button } from "@/components/ui/button";

function IconTeam() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6 text-white" aria-hidden="true">
      <circle cx="9" cy="8" r="3" stroke="currentColor" strokeWidth="1.6" />
      <path d="M3 20c0-3.3 2.7-6 6-6s6 2.7 6 6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      <path d="M16 4.5c1.7.4 3 2 3 3.8 0 1.9-1.3 3.4-3 3.8M21 20c0-2.8-2-5.1-4.6-5.8" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}

function IconFrame() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6 text-white" aria-hidden="true">
      <rect x="3" y="4" width="18" height="16" rx="1.5" stroke="currentColor" strokeWidth="1.6" />
      <circle cx="8.5" cy="10" r="1.5" stroke="currentColor" strokeWidth="1.6" />
      <path d="M3 16l5-4 4 3 4-5 5 6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function IconChallenge() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6 text-white" aria-hidden="true">
      <path d="M8 4h8v4a4 4 0 0 1-8 0V4z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
      <path d="M8 5H5a3 3 0 0 0 3 5M16 5h3a3 3 0 0 1-3 5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      <path d="M12 12v4M9 20h6M10 16h4v4h-4z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
    </svg>
  );
}

const FEATURES = [
  {
    tag: "[DIRETOR] + [DIR. ARTE] + [EDITOR]",
    title: "Produção em equipe",
    body: "Vários papéis, um projeto só — cada colaborador trabalha na fase que é dele, com o mesmo roteiro e os mesmos assets.",
    icon: IconTeam,
  },
  {
    tag: "[REF: CHAR_SHEET_02.PNG]",
    title: "Consistência compartilhada",
    body: "Character sheets e referências de arte ficam salvos no projeto — raccord travado entre todo mundo que colabora.",
    icon: IconFrame,
  },
  {
    tag: "[DESAFIO // CURTA-METRAGEM]",
    title: "Desafios e feedback técnico",
    body: "Desafios periódicos de curtas-metragens e análise de raccord/prompt entre membros da comunidade.",
    icon: IconChallenge,
  },
];

export function Community({ communityHref }: { communityHref: string }) {
  return (
    <section id="comunidade" className="relative scroll-mt-20 bg-bg-violet-night overflow-hidden">
      <div
        className="absolute inset-0"
        style={{ background: "var(--gradient-hero-glow-violet)", opacity: 0.6 }}
        aria-hidden="true"
      />
      <div
        className="relative max-w-[1240px] mx-auto px-[clamp(20px,4vw,48px)]"
        style={{ paddingBlock: "var(--section-spacing)" }}
      >
        <h2
          className="scroll-reveal font-editorial leading-[1.02] tracking-[-0.015em] mb-6 max-w-3xl"
          style={{ fontSize: "clamp(2.5rem, 5.5vw, 5rem)" }}
        >
          Você não entra num curso. Entra num{" "}
          <em className="text-violet">ecossistema de cineastas IA</em>.
        </h2>
        <p className="scroll-reveal text-lg text-body leading-relaxed max-w-2xl mb-14">
          Cada projeto é um set de verdade: convide colaboradores, divida
          papéis, e produza junto — com feedback técnico de gente que fala a
          mesma língua de raccord, prompt e direção de cena.
        </p>

        <div className="scroll-reveal-stagger grid sm:grid-cols-3 gap-5 mb-14">
          {FEATURES.map((f) => (
            <div key={f.title} className="bg-surface-card border border-border-default rounded-md p-7">
              <div
                className="w-16 h-16 rounded-sm flex items-center justify-center mb-5"
                style={{ background: "var(--accent-glow-green)" }}
              >
                <f.icon />
              </div>
              <p className="font-technical text-[11px] uppercase tracking-[0.14em] text-subtitle mb-3">
                {f.tag}
              </p>
              <p className="text-base font-semibold text-title mb-2">{f.title}</p>
              <p className="text-sm text-body leading-relaxed">{f.body}</p>
            </div>
          ))}
        </div>

        <Button href={communityHref} variant="primary">
          Entrar na comunidade e iniciar meu filme
        </Button>
      </div>
    </section>
  );
}
