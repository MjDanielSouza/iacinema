import Link from "next/link";
import { PHASES } from "@/lib/phases";

export function Footer({
  user,
  navHref,
}: {
  user: boolean;
  navHref: string;
}) {
  return (
    <footer className="bg-bg-deep border-t border-border-subtle">
      <div className="max-w-[1240px] mx-auto px-[clamp(20px,4vw,48px)] py-16">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          <div>
            <p className="font-editorial text-2xl text-title mb-3">Pipeline.</p>
            <p className="text-sm text-body leading-relaxed max-w-xs">
              Curso + ferramenta de produção cinematográfica com IA.
            </p>
          </div>
          <div>
            <p className="text-sm font-medium text-title mb-4">Navegar</p>
            <div className="flex flex-col gap-3 text-sm text-body">
              <Link href="/" className="link-underline w-fit">
                Início
              </Link>
              <a href="#metodo" className="link-underline w-fit">
                O Método
              </a>
              <a href="#fases" className="link-underline w-fit">
                As 5 Fases
              </a>
            </div>
          </div>
          <div>
            <p className="text-sm font-medium text-title mb-4">Começar</p>
            <div className="flex flex-col gap-3 text-sm text-body">
              <Link href="/curso/1" className="link-underline w-fit">
                Laboratório Fase 1
              </Link>
              <a href="#comunidade" className="link-underline w-fit">
                Comunidade
              </a>
            </div>
          </div>
          <div>
            <p className="text-sm font-medium text-title mb-4">Conta</p>
            <div className="flex flex-col gap-3 text-sm text-body">
              <Link href={navHref} className="link-underline w-fit">
                {user ? "Dashboard" : "Entrar / Criar Conta"}
              </Link>
            </div>
          </div>
        </div>
        <div className="pt-8 border-t border-border-subtle font-technical text-xs uppercase tracking-[0.14em] text-muted">
          <span className="text-lime">01</span>
          {PHASES.slice(1).map((p) => ` / 0${p.number}`).join("")} — Roteiro a Pós-Produção
        </div>
      </div>
    </footer>
  );
}
