import { RoleTag } from "@/components/ui/role-tag";

export function CourseBento() {
  return (
    <section style={{ paddingBottom: "var(--section-spacing)" }}>
      <div className="max-w-[1240px] mx-auto px-[clamp(20px,4vw,48px)]">
        <div className="border border-border-accent rounded-lg bg-bg-raised p-6 sm:p-10">
          <div className="scroll-reveal-stagger grid md:grid-cols-12 gap-4">
            <div className="md:col-span-7 bg-surface-card border border-border-default rounded-md p-7 sm:p-9">
              <p className="font-technical text-xs uppercase tracking-[0.14em] text-lime mb-4">Curso</p>
              <h3 className="font-display font-semibold text-xl text-title mb-3">
                Aprenda o processo, fase por fase.
              </h3>
              <p className="text-sm text-body leading-relaxed mb-7">
                Teoria curta e direta, mais um laboratório interativo em cada
                fase — decupagem de roteiro, organização de referências,
                construção de assets, direção de cena, e a timeline de
                pós-produção. A Fase 1 é livre, sem cadastro.
              </p>
              <div className="flex flex-wrap gap-2">
                <RoleTag>[AULA CURTA] teoria · 5min</RoleTag>
                <RoleTag>[LABORATÓRIO PRÁTICO] interativo · sem limite</RoleTag>
              </div>
            </div>

            <div className="md:col-span-5 -mt-6 bg-lime text-on-accent rounded-md p-7 sm:p-9 shadow-float">
              <p className="font-technical text-xs uppercase tracking-[0.14em] mb-4 opacity-70">Projetos</p>
              <h3 className="font-display font-semibold text-xl mb-3">
                Aplique em um filme de verdade.
              </h3>
              <p className="text-sm leading-relaxed opacity-80">
                Crie um projeto, cole o roteiro, suba imagens de referência e
                salve os prompts de cada fase. Convide colaboradores pra
                trabalhar junto no mesmo projeto.
              </p>
            </div>

            <div className="md:col-span-12 bg-surface-card border border-border-default rounded-md font-technical text-[13px] overflow-hidden">
              <div className="px-4 py-2.5 border-b border-border-default text-muted uppercase tracking-wide">
                /PROJETO_FILME_B
              </div>
              {[
                { name: "01_Roteiro", role: "[DIRETOR]" },
                { name: "02_Referências", role: "[DIR. ARTE]" },
                { name: "05_Pós-Produção", role: "[EDITOR]" },
              ].map((row) => (
                <div
                  key={row.name}
                  className="px-4 py-2.5 flex items-center justify-between text-subtitle border-t border-border-subtle first:border-t-0 hover:bg-surface-card-elevated transition-colors duration-150"
                >
                  <span>{row.name}</span>
                  <span className="text-lime">{row.role}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
