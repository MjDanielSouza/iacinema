import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { PHASES } from "@/lib/phases";
import { FasesInspector } from "@/components/landing/fases-inspector";

const HERO_IMAGE =
  "https://d8j0ntlcm91z4.cloudfront.net/user_31jsKS5Tv7Qv1EoTdhaNio59PHu/hf_20260925_143804_fe6bfb96-5977-45b9-86a9-afab1ded104b.png";

function Crosshair({ className = "" }: { className?: string }) {
  return (
    <span className={`crosshair absolute ${className}`} aria-hidden="true">
      +
    </span>
  );
}

export default async function Home() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const primaryHref = user ? "/dashboard" : "/login";
  const primaryLabel = user ? "Ir para o Dashboard" : "Começar agora";

  return (
    <main className="bg-[#0c0c0b] text-[#F2EFE9] overflow-x-hidden">
      {/* ============ A. NAVBAR ============ */}
      <nav className="sticky top-0 z-50 bg-[#0c0c0b]/95 backdrop-blur-sm border-b border-line">
        <div className="max-w-6xl mx-auto flex divide-x divide-line border-x border-line">
          <Link href="/" className="px-5 h-12 flex items-center gap-2 shrink-0">
            <span className="font-semibold text-sm">Pipeline.</span>
            <span className="font-tech text-[10px] text-muted">[SYS v1.0]</span>
          </Link>
          <div className="hidden md:flex items-center px-5 font-tech text-[10px] uppercase tracking-widest text-muted flex-1">
            MODO: CURSO + FERRAMENTA DE PRODUÇÃO
          </div>
          <div className="hidden sm:flex items-center gap-5 px-5 font-tech text-[10px] uppercase tracking-widest text-muted">
            <a href="#metodo" className="hover:text-[#F2EFE9] transition-colors duration-100">
              #metodo
            </a>
            <a href="#fases" className="hover:text-[#F2EFE9] transition-colors duration-100">
              #fases
            </a>
            <a href="#laboratorio" className="hover:text-[#F2EFE9] transition-colors duration-100">
              #laboratorio
            </a>
          </div>
          <Link
            href={primaryHref}
            className="flex items-center px-6 font-tech text-xs uppercase tracking-wider bg-[#F2EFE9] text-[#0c0c0b] hover:bg-amber-400 transition-colors duration-100 shrink-0"
          >
            {user ? "Dashboard" : "Entrar"}
          </Link>
        </div>
      </nav>

      <div className="max-w-6xl mx-auto border-x border-line">
        {/* ============ B. HERO ============ */}
        <section className="relative grid grid-cols-1 lg:grid-cols-12 border-b border-line">
          <Crosshair className="top-2 left-2 hidden lg:block" />
          <Crosshair className="top-2 right-2 hidden lg:block" />

          <div className="lg:col-span-7 p-6 md:p-12 lg:p-16 flex flex-col justify-between border-b lg:border-b-0 lg:border-r border-line">
            <div>
              <p className="font-tech text-xs uppercase tracking-widest text-amber-400 mb-6">
                [00 // CURSO + FERRAMENTA DE PRODUÇÃO]
              </p>
              <h1 className="text-[2.1rem] leading-[1.15] sm:text-5xl sm:leading-[1.15] font-semibold mb-6">
                O pipeline que leva um roteiro até a tela,{" "}
                <span className="font-display text-[1.15em] leading-none">
                  ensinado e aplicado
                </span>{" "}
                no mesmo lugar.
              </h1>
              <p className="text-sm sm:text-base text-muted max-w-lg leading-relaxed">
                Cinco fases — roteiro, pesquisa, assets, direção de cena e
                pós-produção — com laboratórios práticos em cada uma, e um
                espaço pra aplicar tudo isso em um projeto de verdade, com sua
                equipe.
              </p>
            </div>

            <div className="flex flex-wrap gap-3 mt-10">
              <Link
                href={primaryHref}
                className="font-tech text-xs uppercase tracking-wider px-6 py-3.5 bg-amber-500 text-[#0c0c0b] hover:bg-amber-400 transition-colors duration-100"
              >
                {primaryLabel} [-&gt;]
              </Link>
              <a
                href="#fases"
                className="font-tech text-xs uppercase tracking-wider px-6 py-3.5 border border-line text-[#F2EFE9] hover:border-[#F2EFE9] transition-colors duration-100"
              >
                Ver as 5 fases [01-05]
              </a>
            </div>
          </div>

          {/* Monitor de Decupagem — 3 camadas */}
          <div className="lg:col-span-5 bg-[#141413] flex flex-col">
            <div className="p-5 border-b border-line">
              <p className="font-tech text-[10px] uppercase tracking-widest text-muted mb-3">
                Camada 01 — Roteiro Decupado
              </p>
              <p className="font-tech text-xs leading-relaxed text-[#F2EFE9]/80">
                INT. GALPÃO ABANDONADO — NOITE
                <br />
                <span className="text-amber-400">[PERSONAGEM: RAFAEL]</span> avança
                segurando uma <span className="text-sky-400">[PROP: LANTERNA]</span>.
              </p>
            </div>

            <div className="p-5 border-b border-line">
              <p className="font-tech text-[10px] uppercase tracking-widest text-muted mb-3">
                Camada 02 — Monitor de Frame
              </p>
              <div className="relative w-full aspect-[2.39/1] bg-[#0c0c0b] border border-line overflow-hidden">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={HERO_IMAGE} alt="" className="w-full h-full object-cover" />
              </div>
              <div className="flex items-center justify-between mt-2">
                <div className="flex gap-1">
                  {["#0c0c0b", "#3a2a1a", "#8e6a3a", "#c9a46a", "#e8d8b8"].map((c) => (
                    <div key={c} className="w-3 h-3 border border-line" style={{ background: c }} />
                  ))}
                </div>
                <p className="font-tech text-[10px] text-muted">TC 01:04:22:10</p>
              </div>
              <p className="font-tech text-[10px] text-muted mt-1">
                LENTE: 35MM ANAMÓRFICA &middot; RACCORD: TRAVADO
              </p>
            </div>

            <div className="p-5">
              <p className="font-tech text-[10px] uppercase tracking-widest text-muted mb-3">
                Camada 03 — Prompt de Cena Enxuto
              </p>
              <p className="font-tech text-xs leading-relaxed text-[#F2EFE9]/80">
                <span className="text-amber-400">BLOCKING:</span> avança
                lentamente, ergue a lanterna.
                <br />
                <span className="text-amber-400">CÂMERA:</span> dolly in, 35mm.
              </p>
            </div>
          </div>
        </section>

        {/* ============ C. MANIFESTO ============ */}
        <section id="metodo" className="border-b border-line scroll-mt-12">
          <div className="p-6 md:p-12 lg:p-16">
            <p className="font-display text-2xl sm:text-3xl leading-snug max-w-3xl mb-10">
              A maioria dos tutoriais de IA te dá prompts soltos. Aqui você
              aprende o pipeline inteiro — a mesma lógica de decupagem, raccord
              de figurino e direção de fotografia que uma produção de verdade
              usa, adaptada pra IA generativa.
            </p>

            <div className="grid sm:grid-cols-2 border border-line">
              <div className="p-6 border-b sm:border-b-0 sm:border-r border-line">
                <p className="font-tech text-xs uppercase tracking-widest text-rec mb-4">
                  [X] Fluxo comum (prompts soltos)
                </p>
                <ul className="space-y-2 text-sm text-muted">
                  <li>Personagem muda de rosto e roupa a cada take</li>
                  <li>Prompts gigantes tentando adivinhar iluminação</li>
                  <li>Zero continuidade entre planos</li>
                </ul>
              </div>
              <div className="p-6">
                <p className="font-tech text-xs uppercase tracking-widest text-amber-400 mb-4">
                  [✓] Fluxo pipeline (estúdio)
                </p>
                <ul className="space-y-2 text-sm text-[#F2EFE9]/80">
                  <li>Decupagem prévia do roteiro inteiro</li>
                  <li>Character Sheet travado por cena</li>
                  <li>Direção de câmera separada do asset visual</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* ============ D. AS 5 FASES ============ */}
        <section id="fases" className="border-b border-line scroll-mt-12">
          <div className="p-6 md:p-12 lg:p-16">
            <p className="font-tech text-xs uppercase tracking-widest text-amber-400 mb-3">
              O pipeline
            </p>
            <h2 className="text-2xl sm:text-3xl font-semibold mb-10">
              Cinco fases, do papel à tela.
            </h2>

            <div id="laboratorio" className="scroll-mt-12">
              <FasesInspector />
            </div>
          </div>
        </section>

        {/* ============ E. CURSO + PROJETOS ============ */}
        <section className="border-b border-line">
          <div className="grid md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-line">
            <div className="p-6 md:p-10">
              <p className="font-tech text-xs uppercase tracking-widest text-amber-400 mb-4">
                Curso
              </p>
              <h3 className="text-xl font-semibold mb-3">
                Aprenda o processo, fase por fase.
              </h3>
              <p className="text-sm text-muted leading-relaxed mb-6">
                Teoria curta e direta, mais um laboratório interativo em cada
                fase — decupagem de roteiro, organização de referências,
                construção de assets, direção de cena, e a timeline de
                pós-produção. A Fase 1 é livre, sem cadastro.
              </p>
              <div className="grid grid-cols-2 border border-line font-tech text-[10px] uppercase tracking-wider">
                <div className="p-3 border-r border-line">
                  <p className="text-muted mb-1">[AULA CURTA]</p>
                  <p className="text-[#F2EFE9]/70">teoria · 5min</p>
                </div>
                <div className="p-3">
                  <p className="text-amber-400 mb-1">[LABORATÓRIO PRÁTICO]</p>
                  <p className="text-[#F2EFE9]/70">interativo · sem limite</p>
                </div>
              </div>
            </div>

            <div className="p-6 md:p-10">
              <p className="font-tech text-xs uppercase tracking-widest text-amber-400 mb-4">
                Projetos
              </p>
              <h3 className="text-xl font-semibold mb-3">
                Aplique em um filme de verdade.
              </h3>
              <p className="text-sm text-muted leading-relaxed mb-6">
                Crie um projeto, cole o roteiro, suba imagens de referência e
                salve os prompts de cada fase. Convide colaboradores pra
                trabalhar junto no mesmo projeto.
              </p>
              <div className="border border-line font-tech text-[10px]">
                <div className="px-3 py-2 border-b border-line text-muted uppercase tracking-wider">
                  /PROJETO_FILME_B
                </div>
                <div className="px-3 py-2 flex items-center justify-between text-[#F2EFE9]/70">
                  <span>01_Roteiro</span>
                  <span className="text-amber-400">[DIRETOR]</span>
                </div>
                <div className="px-3 py-2 flex items-center justify-between text-[#F2EFE9]/70 border-t border-line">
                  <span>02_Referências</span>
                  <span className="text-sky-400">[DIR. ARTE]</span>
                </div>
                <div className="px-3 py-2 flex items-center justify-between text-[#F2EFE9]/70 border-t border-line">
                  <span>05_Pós-Produção</span>
                  <span className="text-emerald-400">[EDITOR]</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ============ F. 3 PILARES + REGRA DE OURO ============ */}
        <section className="border-b border-line">
          <div className="grid sm:grid-cols-3 divide-y sm:divide-y-0 sm:divide-x divide-line border-b border-line">
            {[
              {
                n: "01",
                title: "Raccord de verdade",
                body: "Character sheets por cena garantem que seu personagem não troque de roupa sozinho entre um plano e outro.",
              },
              {
                n: "02",
                title: "Prompt de vídeo sem redundância",
                body: "A regra de ouro: nunca redescrever o que a IA já recebeu como referência visual — só blocking, câmera e diálogo.",
              },
              {
                n: "03",
                title: "Processo, não sorte",
                body: "Um pipeline repetível, documentado, que escala de uma cena de teste até um curta inteiro.",
              },
            ].map((item) => (
              <div key={item.n} className="p-6 md:p-10">
                <p className="font-tech text-xs text-amber-400 mb-4">{item.n}/03</p>
                <p className="font-display text-lg mb-3">{item.title}</p>
                <p className="text-sm text-muted leading-relaxed">{item.body}</p>
              </div>
            ))}
          </div>

          <div className="p-6 md:p-12 lg:p-16">
            <p className="font-tech text-xs uppercase tracking-widest text-muted mb-6">
              [DEMONSTRAÇÃO — REGRA DE OURO]
            </p>
            <div className="grid sm:grid-cols-2 border border-line">
              <div className="p-6 border-b sm:border-b-0 sm:border-r border-line">
                <p className="font-tech text-[10px] uppercase tracking-widest text-rec mb-4">
                  Prompt amador (redundante)
                </p>
                <p className="font-tech text-xs leading-relaxed line-through text-muted">
                  mulher jovem, cabelo curto preto, jaqueta de couro vermelha,
                  bar escuro com neon, luz azul e rosa, câmera em plano médio...
                </p>
              </div>
              <div className="p-6">
                <p className="font-tech text-[10px] uppercase tracking-widest text-amber-400 mb-4">
                  Padrão pipeline
                </p>
                <p className="font-tech text-xs leading-relaxed text-[#F2EFE9]/80">
                  [REF: CHAR_SHEET_02.PNG]
                  <br />
                  BLOCKING: caminha até o balcão
                  <br />
                  CÂMERA: 35mm, dolly in
                  <br />
                  DIÁLOGO: &quot;Já é tarde.&quot;
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ============ G. FOOTER / CTA FINAL ============ */}
        <section className="relative border-b border-line">
          <Crosshair className="bottom-2 left-2 hidden lg:block" />
          <Crosshair className="bottom-2 right-2 hidden lg:block" />
          <div className="p-10 md:p-20 text-center">
            <h2 className="font-display text-3xl sm:text-5xl mb-10">
              Comece pela Fase 1, de graça.
            </h2>
            <Link
              href={primaryHref}
              className="inline-block font-tech text-xs uppercase tracking-wider px-8 py-4 bg-amber-500 text-[#0c0c0b] hover:bg-amber-400 transition-colors duration-100"
            >
              {primaryLabel} [-&gt;]
            </Link>
          </div>
        </section>

        <footer className="p-6 md:px-12">
          <div className="grid sm:grid-cols-3 gap-4 font-tech text-[10px] uppercase tracking-widest text-muted">
            <p>Pipeline de Produção Cinematográfica com IA</p>
            <p className="sm:text-center">
              {PHASES.map((p) => `0${p.number}`).join(" / ")} — Roteiro a Pós-Produção
            </p>
            <div className="sm:text-right space-x-4">
              <a href="#fases" className="hover:text-[#F2EFE9] transition-colors duration-100">
                fases
              </a>
              <Link href="/login" className="hover:text-[#F2EFE9] transition-colors duration-100">
                entrar
              </Link>
            </div>
          </div>
        </footer>
      </div>
    </main>
  );
}
