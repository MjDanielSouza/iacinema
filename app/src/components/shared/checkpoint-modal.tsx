"use client";

import Link from "next/link";

function IconArrow() {
  return (
    <svg viewBox="0 0 16 16" fill="none" className="w-3.5 h-3.5" aria-hidden="true">
      <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function CheckpointModal({
  loginHref,
  onClose,
}: {
  loginHref: string;
  onClose: () => void;
}) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm px-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="checkpoint-title"
    >
      <div className="glass relative w-full max-w-md p-7">
        <button
          onClick={onClose}
          aria-label="Fechar"
          className="absolute top-3 right-3 font-tech text-[10px] uppercase tracking-widest text-muted hover:text-[#FAFAFA] transition-colors duration-100 border border-line px-2 py-1"
        >
          [ESC / FECHAR]
        </button>

        <p className="font-tech text-[10px] uppercase tracking-widest text-[#D4FF00] mb-3">
          [CHECKPOINT DE PRODUÇÃO — FASE 01 CONCLUÍDA]
        </p>
        <h2 id="checkpoint-title" className="font-display text-2xl text-[#FAFAFA] mb-3">
          Muito bem. Bora salvar isso.
        </h2>
        <p className="text-sm text-muted leading-relaxed mb-6">
          Sua decupagem ficou salva só neste navegador. Crie sua conta grátis
          para levá-la pra nuvem, destravar as Fases 02 a 05 e entrar na
          comunidade Pipeline.
        </p>

        <div className="flex flex-col gap-3">
          <Link
            href={loginHref}
            className="flex items-center justify-center gap-2 text-center font-tech text-xs uppercase tracking-wider px-6 py-3.5 bg-[#D4FF00] text-[#050507] hover:bg-[#e2ff4d] transition-colors duration-100"
          >
            Criar conta grátis e continuar <IconArrow />
          </Link>
          <button
            onClick={onClose}
            className="font-tech text-[10px] uppercase tracking-widest text-muted hover:text-[#FAFAFA] transition-colors duration-100"
          >
            Continuar sem salvar por enquanto
          </button>
        </div>
      </div>
    </div>
  );
}
