import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { PHASES } from "@/lib/phases";

const HERO_IMAGE =
  "https://d8j0ntlcm91z4.cloudfront.net/user_31jsKS5Tv7Qv1EoTdhaNio59PHu/hf_20260925_143804_fe6bfb96-5977-45b9-86a9-afab1ded104b.png";

export default async function Home() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const primaryHref = user ? "/dashboard" : "/login";
  const primaryLabel = user ? "Ir para o Dashboard" : "Começar agora";

  return (
    <main className="bg-[#0a0a0c] text-zinc-300">
      {/* ============ NAV ============ */}
      <nav className="fixed top-0 inset-x-0 z-50 border-b border-white/5 bg-[#0a0a0c]/70 backdrop-blur-md">
        <div className="max-w-6xl mx-auto px-5 sm:px-8 h-16 flex items-center justify-between">
          <span className="font-display font-semibold text-lg text-white tracking-tight">
            Pipeline<span className="text-amber-400">.</span>
          </span>
          <Link
            href={primaryHref}
            className="px-4 py-2 rounded-full bg-amber-500 text-[#0a0a0c] text-sm font-semibold hover:bg-amber-400 transition-colors"
          >
            {user ? "Dashboard" : "Entrar"}
          </Link>
        </div>
      </nav>

      {/* ============ HERO ============ */}
      <section className="relative min-h-[92vh] flex items-end overflow-hidden">
        <div className="absolute inset-0">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={HERO_IMAGE}
            alt=""
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0c] via-[#0a0a0c]/60 to-[#0a0a0c]/20" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0a0a0c]/80 via-transparent to-transparent" />
        </div>

        <div className="relative max-w-6xl mx-auto px-5 sm:px-8 pb-20 pt-40 w-full">
          <p className="text-xs uppercase tracking-[0.2em] text-cyan-400 font-semibold mb-5">
            Curso + ferramenta de produção
          </p>
          <h1 className="font-display font-semibold text-[2.5rem] leading-[1.05] sm:text-6xl sm:leading-[1.05] text-white max-w-3xl mb-6">
            O pipeline que leva um roteiro até a tela,
            <span className="italic text-amber-400"> ensinado e aplicado</span> no
            mesmo lugar.
          </h1>
          <p className="text-base sm:text-lg text-zinc-400 max-w-xl mb-10 leading-relaxed">
            Cinco fases — roteiro, pesquisa, assets, direção de cena e
            pós-produção — com laboratórios práticos em cada uma, e um espaço
            pra aplicar tudo isso em um projeto de verdade, com sua equipe.
          </p>
          <div className="flex flex-wrap items-center gap-4">
            <Link
              href={primaryHref}
              className="px-7 py-3.5 rounded-full bg-amber-500 text-[#0a0a0c] font-semibold text-sm hover:bg-amber-400 transition-colors"
            >
              {primaryLabel}
            </Link>
            <a
              href="#fases"
              className="px-7 py-3.5 rounded-full border border-white/15 text-zinc-200 font-semibold text-sm hover:border-white/40 transition-colors"
            >
              Ver as 5 fases
            </a>
          </div>
        </div>
      </section>

      {/* ============ MÉTODO ============ */}
      <section className="border-t border-white/5">
        <div className="max-w-3xl mx-auto px-5 sm:px-8 py-24 text-center">
          <p className="font-display italic text-2xl sm:text-3xl text-white leading-snug">
            A maioria dos tutoriais de IA te dá prompts soltos. Aqui você
            aprende o pipeline inteiro —
            <span className="text-cyan-400 not-italic">
              {" "}
              a mesma lógica de decupagem, raccord de figurino e direção de
              fotografia{" "}
            </span>
            que uma produção de verdade usa, adaptada pra IA generativa.
          </p>
        </div>
      </section>

      {/* ============ AS 5 FASES ============ */}
      <section id="fases" className="border-t border-white/5 scroll-mt-16">
        <div className="max-w-6xl mx-auto px-5 sm:px-8 py-24">
          <p className="text-xs uppercase tracking-[0.2em] text-cyan-400 font-semibold mb-3">
            O pipeline
          </p>
          <h2 className="font-display font-semibold text-3xl sm:text-4xl text-white mb-14 max-w-xl">
            Cinco fases, do papel à tela.
          </h2>

          <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-px bg-white/5 rounded-2xl overflow-hidden border border-white/5">
            {PHASES.map((phase) => (
              <div
                key={phase.number}
                className="bg-[#0a0a0c] p-6 flex flex-col min-h-[220px]"
              >
                <span className="font-display text-4xl text-amber-500/80 mb-6">
                  {String(phase.number).padStart(2, "0")}
                </span>
                <h3 className="text-sm font-semibold text-white mb-2 leading-snug">
                  {phase.title}
                </h3>
                <p className="text-xs text-zinc-500 leading-relaxed">
                  {phase.subtitle}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============ CURSO + PROJETOS ============ */}
      <section className="border-t border-white/5">
        <div className="max-w-6xl mx-auto px-5 sm:px-8 py-24">
          <div className="grid md:grid-cols-2 gap-6">
            <div className="rounded-2xl border border-white/10 p-8 sm:p-10 bg-gradient-to-br from-amber-500/[0.06] to-transparent">
              <p className="text-xs uppercase tracking-[0.2em] text-amber-400 font-semibold mb-4">
                Curso
              </p>
              <h3 className="font-display font-semibold text-2xl text-white mb-4">
                Aprenda o processo, fase por fase.
              </h3>
              <p className="text-sm text-zinc-400 leading-relaxed">
                Teoria curta e direta, mais um laboratório interativo em cada
                fase — decupagem de roteiro, organização de referências,
                construção de assets, direção de cena, e a timeline de
                pós-produção. A Fase 1 é livre, sem cadastro.
              </p>
            </div>
            <div className="rounded-2xl border border-white/10 p-8 sm:p-10 bg-gradient-to-br from-cyan-500/[0.06] to-transparent">
              <p className="text-xs uppercase tracking-[0.2em] text-cyan-400 font-semibold mb-4">
                Projetos
              </p>
              <h3 className="font-display font-semibold text-2xl text-white mb-4">
                Aplique em um filme de verdade.
              </h3>
              <p className="text-sm text-zinc-400 leading-relaxed">
                Crie um projeto, cole o roteiro, suba imagens de referência e
                salve os prompts de cada fase. Convide colaboradores pra
                trabalhar junto no mesmo projeto.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ============ PRINCÍPIOS ============ */}
      <section className="border-t border-white/5">
        <div className="max-w-6xl mx-auto px-5 sm:px-8 py-24">
          <div className="grid sm:grid-cols-3 gap-10">
            <div>
              <p className="font-display italic text-lg text-amber-400 mb-3">
                Raccord de verdade
              </p>
              <p className="text-sm text-zinc-500 leading-relaxed">
                Character sheets por cena garantem que seu personagem não
                troque de roupa sozinho entre um plano e outro.
              </p>
            </div>
            <div>
              <p className="font-display italic text-lg text-cyan-400 mb-3">
                Prompt de vídeo sem redundância
              </p>
              <p className="text-sm text-zinc-500 leading-relaxed">
                A regra de ouro: nunca redescrever o que a IA já recebeu como
                referência visual — só blocking, câmera e diálogo.
              </p>
            </div>
            <div>
              <p className="font-display italic text-lg text-amber-400 mb-3">
                Processo, não sorte
              </p>
              <p className="text-sm text-zinc-500 leading-relaxed">
                Um pipeline repetível, documentado, que escala de uma cena de
                teste até um curta inteiro.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ============ CTA FINAL ============ */}
      <section className="border-t border-white/5">
        <div className="max-w-3xl mx-auto px-5 sm:px-8 py-28 text-center">
          <h2 className="font-display font-semibold text-3xl sm:text-4xl text-white mb-8">
            Comece pela Fase 1, de graça.
          </h2>
          <Link
            href={primaryHref}
            className="inline-block px-8 py-4 rounded-full bg-amber-500 text-[#0a0a0c] font-semibold text-sm hover:bg-amber-400 transition-colors"
          >
            {primaryLabel}
          </Link>
        </div>
      </section>

      {/* ============ FOOTER ============ */}
      <footer className="border-t border-white/5">
        <div className="max-w-6xl mx-auto px-5 sm:px-8 py-8 text-xs text-zinc-600">
          Pipeline de Produção Cinematográfica com IA
        </div>
      </footer>
    </main>
  );
}
