import Image from "next/image";
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

function IconArrow({ className = "w-3.5 h-3.5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 16 16" fill="none" className={className} aria-hidden="true">
      <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function IconCheck({ className = "w-3.5 h-3.5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 16 16" fill="none" className={className} aria-hidden="true">
      <path d="M3 8.5l3.2 3.2L13 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function IconX({ className = "w-3.5 h-3.5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 16 16" fill="none" className={className} aria-hidden="true">
      <path d="M4 4l8 8M12 4l-8 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default async function Home() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const navHref = user ? "/dashboard" : "/login";
  const navLabel = user ? "Dashboard" : "Entrar";

  const primaryHref = user ? "/dashboard" : "/curso/1";
  const primaryLabel = user ? "Ir para o Dashboard" : "Começar Fase 1 Agora — Grátis";

  const communityHref = user ? "/projetos" : "/login?next=/projetos";

  return (
    <main className="bg-[#050507] text-[#FAFAFA] overflow-x-hidden">
      {/* ============ A. NAVBAR ============ */}
      <nav className="chrome-edge sticky top-0 z-50 bg-[#050507]/80 backdrop-blur-xl backdrop-saturate-150">
        <div className="max-w-6xl mx-auto flex items-center gap-6 px-5 sm:px-8 h-16">
          <Link href="/" className="flex items-center gap-2 shrink-0">
            <span className="font-semibold text-base">Pipeline.</span>
          </Link>
          <div className="hidden sm:flex items-center gap-6 text-sm text-muted flex-1">
            <a href="#metodo" className="hover:text-[#FAFAFA] transition-colors duration-150">
              Método
            </a>
            <a href="#fases" className="hover:text-[#FAFAFA] transition-colors duration-150">
              As 5 Fases
            </a>
            <a href="#comunidade" className="hover:text-[#FAFAFA] transition-colors duration-150">
              Comunidade
            </a>
          </div>
          <div className="flex-1 sm:hidden" />
          <Link
            href={navHref}
            className="press flex items-center px-5 py-2 rounded-full text-sm font-medium bg-[#D4FF00] text-[#050507] hover:bg-[#e2ff4d] transition duration-150 ease-out shrink-0"
          >
            {navLabel}
          </Link>
        </div>
      </nav>

      <div className="max-w-6xl mx-auto">
        {/* ============ B. HERO ============ */}
        <section className="relative">
          <div className="grid grid-cols-1 lg:grid-cols-2 items-center gap-10 md:gap-16 px-6 md:px-12 lg:px-16 py-12 md:py-20">
            <div>
              <span className="inline-block text-xs font-medium tracking-wide text-accent-secondary bg-accent-secondary/10 rounded-full px-3 py-1 mb-6">
                Curso + Ferramenta de Produção com IA
              </span>
              <h1 className="text-[2.3rem] leading-[1.1] sm:text-5xl sm:leading-[1.08] tracking-[-0.02em] font-semibold mb-6">
                O pipeline que leva um roteiro até a tela,{" "}
                <span className="font-display text-[1.1em] leading-none">
                  ensinado e aplicado
                </span>{" "}
                no mesmo lugar.
              </h1>
              <p className="text-base sm:text-lg text-muted max-w-lg leading-relaxed mb-10">
                Cinco fases — roteiro, pesquisa, assets, direção de cena e
                pós-produção — com laboratórios práticos em cada uma, e um
                espaço pra aplicar tudo isso em um projeto de verdade, com sua
                equipe.
              </p>

              <div className="flex flex-wrap gap-3">
                <Link
                  href={primaryHref}
                  className="press flex items-center gap-2 rounded-full text-sm font-medium px-6 py-3.5 bg-[#D4FF00] text-[#050507] hover:bg-[#e2ff4d] transition duration-150 ease-out"
                >
                  {primaryLabel} <IconArrow />
                </Link>
                <a
                  href="#comunidade"
                  className="press rounded-full text-sm font-medium px-6 py-3.5 border border-line text-[#FAFAFA] hover:border-[#FAFAFA] transition duration-150 ease-out"
                >
                  Conhecer a Comunidade &amp; Método
                </a>
              </div>
            </div>

            {/* Foto de destaque do hero */}
            <div className="atmosphere relative">
              <div className="relative w-full aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl shadow-black/50 border border-line">
                <Image
                  src={HERO_IMAGE}
                  alt="Frame cinematográfico gerado por IA: personagem em ambiente noturno, estilo anamórfico 35mm"
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 560px"
                  className="object-cover"
                />
              </div>
              <div className="glass absolute -bottom-5 left-5 right-5 sm:left-6 sm:right-auto sm:w-auto rounded-2xl px-4 py-3 flex items-center gap-3">
                <span className="w-2 h-2 rounded-full bg-[#D4FF00] shrink-0" />
                <p className="text-xs text-[#FAFAFA]/90">
                  Frame gerado a partir de roteiro decupado + character sheet
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ============ C. MANIFESTO ============ */}
        <section id="metodo" className="border-b border-line scroll-mt-12">
          <div className="p-6 md:p-12 lg:p-16">
            <p className="font-display text-2xl sm:text-3xl leading-snug tracking-[-0.01em] max-w-3xl mb-10">
              A maioria dos tutoriais de IA te dá prompts soltos. Aqui você
              aprende o pipeline inteiro — a mesma lógica de decupagem, raccord
              de figurino e direção de fotografia que uma produção de verdade
              usa, adaptada pra IA generativa.
            </p>

            <div className="grid sm:grid-cols-2 border border-line">
              <div className="p-6 border-b sm:border-b-0 sm:border-r border-line">
                <p className="flex items-center gap-2 font-tech text-xs uppercase tracking-widest text-rec mb-4">
                  <IconX className="w-3 h-3" /> Fluxo comum (prompts soltos)
                </p>
                <ul className="space-y-2 text-sm text-muted">
                  <li>Personagem muda de rosto e roupa a cada take</li>
                  <li>Prompts gigantes tentando adivinhar iluminação</li>
                  <li>Zero continuidade entre planos</li>
                </ul>
              </div>
              <div className="p-6">
                <p className="flex items-center gap-2 font-tech text-xs uppercase tracking-widest text-[#D4FF00] mb-4">
                  <IconCheck className="w-3 h-3" /> Fluxo pipeline (estúdio)
                </p>
                <ul className="space-y-2 text-sm text-[#FAFAFA]/80">
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
            <p className="font-tech text-xs uppercase tracking-widest text-accent-secondary mb-3">
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
              <p className="font-tech text-xs uppercase tracking-widest text-accent-secondary mb-4">
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
                  <p className="text-[#FAFAFA]/70">teoria · 5min</p>
                </div>
                <div className="p-3">
                  <p className="text-accent-secondary mb-1">[LABORATÓRIO PRÁTICO]</p>
                  <p className="text-[#FAFAFA]/70">interativo · sem limite</p>
                </div>
              </div>
            </div>

            <div className="p-6 md:p-10">
              <p className="font-tech text-xs uppercase tracking-widest text-accent-secondary mb-4">
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
                <div className="px-3 py-2 flex items-center justify-between text-[#FAFAFA]/70">
                  <span>01_Roteiro</span>
                  <span className="text-accent-secondary">[DIRETOR]</span>
                </div>
                <div className="px-3 py-2 flex items-center justify-between text-[#FAFAFA]/70 border-t border-line">
                  <span>02_Referências</span>
                  <span className="text-[#D4FF00]">[DIR. ARTE]</span>
                </div>
                <div className="px-3 py-2 flex items-center justify-between text-[#FAFAFA]/70 border-t border-line">
                  <span>05_Pós-Produção</span>
                  <span className="text-emerald-400">[EDITOR]</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ============ E.5 COMUNIDADE ============ */}
        <section id="comunidade" className="border-b border-line scroll-mt-12">
          <div className="p-6 md:p-12 lg:p-16">
            <p className="font-tech text-xs uppercase tracking-widest text-[#D4FF00] mb-3">
              Comunidade Pipeline
            </p>
            <h2 className="text-2xl sm:text-3xl font-semibold mb-4 max-w-2xl">
              Você não entra num curso. Entra num ecossistema de cineastas IA.
            </h2>
            <p className="text-sm sm:text-base text-muted max-w-2xl leading-relaxed mb-10">
              Cada projeto é um set de verdade: convide colaboradores, divida
              papéis, e produza junto — com feedback técnico de gente que fala
              a mesma língua de raccord, prompt e direção de cena.
            </p>

            <div className="grid sm:grid-cols-3 border border-line mb-10">
              <div className="p-6 border-b sm:border-b-0 sm:border-r border-line">
                <p className="font-tech text-xs text-[#D4FF00] mb-3">[DIRETOR] + [DIR. ARTE] + [EDITOR]</p>
                <p className="text-sm font-semibold text-[#FAFAFA] mb-2">Produção em equipe</p>
                <p className="text-sm text-muted leading-relaxed">
                  Vários papéis, um projeto só — cada colaborador trabalha na
                  fase que é dele, com o mesmo roteiro e os mesmos assets.
                </p>
              </div>
              <div className="p-6 border-b sm:border-b-0 sm:border-r border-line">
                <p className="font-tech text-xs text-[#D4FF00] mb-3">[REF: CHAR_SHEET_02.PNG]</p>
                <p className="text-sm font-semibold text-[#FAFAFA] mb-2">Consistência compartilhada</p>
                <p className="text-sm text-muted leading-relaxed">
                  Character sheets e referências de arte ficam salvos no
                  projeto — raccord travado entre todo mundo que colabora.
                </p>
              </div>
              <div className="p-6">
                <p className="font-tech text-xs text-[#D4FF00] mb-3">[DESAFIO // CURTA-METRAGEM]</p>
                <p className="text-sm font-semibold text-[#FAFAFA] mb-2">Desafios e feedback técnico</p>
                <p className="text-sm text-muted leading-relaxed">
                  Desafios periódicos de curtas-metragens e análise de
                  raccord/prompt entre membros da comunidade.
                </p>
              </div>
            </div>

            <Link
              href={communityHref}
              className="press inline-flex items-center gap-2 font-tech text-xs uppercase tracking-wider px-6 py-3.5 bg-[#D4FF00] text-[#050507] hover:bg-[#e2ff4d] transition duration-150 ease-out"
            >
              Entrar na comunidade e iniciar meu filme <IconArrow />
            </Link>
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
                <p className="font-tech text-xs text-accent-secondary mb-4">{item.n}/03</p>
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
                <p className="flex items-center gap-2 font-tech text-[10px] uppercase tracking-widest text-rec mb-4">
                  <IconX className="w-3 h-3" /> Prompt amador (redundante)
                </p>
                <p className="font-tech text-xs leading-relaxed line-through text-muted">
                  mulher jovem, cabelo curto preto, jaqueta de couro vermelha,
                  bar escuro com neon, luz azul e rosa, câmera em plano médio...
                </p>
              </div>
              <div className="p-6">
                <p className="flex items-center gap-2 font-tech text-[10px] uppercase tracking-widest text-[#D4FF00] mb-4">
                  <IconCheck className="w-3 h-3" /> Padrão pipeline
                </p>
                <p className="font-tech text-xs leading-relaxed text-[#FAFAFA]/80">
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
            <h2 className="font-display text-3xl sm:text-5xl tracking-[-0.02em] mb-10">
              Comece pela Fase 1, de graça.
            </h2>
            <Link
              href={primaryHref}
              className="press inline-flex items-center gap-2 font-tech text-xs uppercase tracking-wider px-8 py-4 bg-[#D4FF00] text-[#050507] hover:bg-[#e2ff4d] transition duration-150 ease-out"
            >
              {primaryLabel} <IconArrow />
            </Link>
          </div>
        </section>

        <footer className="p-6 md:px-12 py-10">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 font-tech text-[10px] uppercase tracking-widest text-muted mb-8">
            <div>
              <p className="text-[#FAFAFA] mb-3">Pipeline.</p>
              <p className="normal-case tracking-normal leading-relaxed">
                Curso + ferramenta de produção cinematográfica com IA.
              </p>
            </div>
            <div className="space-y-2">
              <p className="text-[#FAFAFA]">Navegar</p>
              <Link href="/" className="block hover:text-[#FAFAFA] transition-colors duration-100">Início</Link>
              <a href="#metodo" className="block hover:text-[#FAFAFA] transition-colors duration-100">O Método</a>
              <a href="#fases" className="block hover:text-[#FAFAFA] transition-colors duration-100">As 5 Fases</a>
            </div>
            <div className="space-y-2">
              <p className="text-[#FAFAFA]">Começar</p>
              <Link href="/curso/1" className="block hover:text-[#FAFAFA] transition-colors duration-100">
                Laboratório Fase 1
              </Link>
              <a href="#comunidade" className="block hover:text-[#FAFAFA] transition-colors duration-100">Comunidade</a>
            </div>
            <div className="space-y-2">
              <p className="text-[#FAFAFA]">Conta</p>
              <Link href={navHref} className="block hover:text-[#FAFAFA] transition-colors duration-100">
                {user ? "Dashboard" : "Entrar / Criar Conta"}
              </Link>
            </div>
          </div>
          <div className="pt-6 border-t border-line font-tech text-[10px] uppercase tracking-widest text-muted">
            {PHASES.map((p) => `0${p.number}`).join(" / ")} — Roteiro a Pós-Produção
          </div>
        </footer>
      </div>
    </main>
  );
}
