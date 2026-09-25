"use client";

import { useEffect } from "react";
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
  useEffect(() => {
    function handleKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm px-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="checkpoint-title"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="glass glass-in relative w-full max-w-md p-7">
        <button
          onClick={onClose}
          aria-label="Fechar"
          className="press absolute top-3 right-3 font-tech text-[10px] uppercase tracking-widest text-muted hover:text-title transition duration-150 ease-out border border-line px-2 py-1"
        >
          [ESC / FECHAR]
        </button>

        <p className="font-tech text-[10px] uppercase tracking-widest text-lime mb-3">
          [CHECKPOINT DE PRODUÇÃO — FASE 01 CONCLUÍDA]
        </p>
        <h2
          id="checkpoint-title"
          className="font-display text-2xl text-title mb-3 tracking-[-0.01em]"
        >
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
            className="press flex items-center justify-center gap-2 text-center font-tech text-xs uppercase tracking-wider px-6 py-3.5 bg-lime text-on-accent hover:bg-lime-hover transition duration-150 ease-out"
          >
            Criar conta grátis e continuar <IconArrow />
          </Link>
          <button
            onClick={onClose}
            className="press font-tech text-[10px] uppercase tracking-widest text-muted hover:text-title transition duration-150 ease-out"
          >
            Continuar sem salvar por enquanto
          </button>
        </div>
      </div>
    </div>
  );
}
