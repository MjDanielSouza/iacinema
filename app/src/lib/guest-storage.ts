// Chaves de persistência local do "Modo Visitante" da Fase 1 — permite
// experimentar o laboratório de decupagem sem cadastro (ETAPA 4).
export const GUEST_DRAFT_KEY = "pipeline_fase1_draft";
export const GUEST_CHECKLIST_KEY = "pipeline_fase1_checklist";
export const GUEST_COMPLETED_KEY = "pipeline_fase1_completed";

export const GUEST_DRAFT_PLACEHOLDER = `INT. GALPÃO ABANDONADO – NOITE

Um raio de lua atravessa as venezianas quebradas. RAFAEL (35), casaco de
couro surrado, cicatriz na sobrancelha esquerda, avança lentamente
segurando uma LANTERNA A QUEROSENE.

RAFAEL
(sussurrando)
Ela disse que estaria aqui...

Um barulho metálico ecoa. MARINA (28), cabelo curto grisalho, jaqueta
tática cinza, surge das sombras empunhando uma CHAVE DE FENDA como arma
improvisada.

MARINA
Você não devia ter vindo sozinho.`;

export function readGuestDraft(): string {
  if (typeof window === "undefined") return GUEST_DRAFT_PLACEHOLDER;
  try {
    return localStorage.getItem(GUEST_DRAFT_KEY) ?? GUEST_DRAFT_PLACEHOLDER;
  } catch {
    return GUEST_DRAFT_PLACEHOLDER;
  }
}

export function hasGuestProgress(): boolean {
  if (typeof window === "undefined") return false;
  try {
    const draft = localStorage.getItem(GUEST_DRAFT_KEY);
    const completed = localStorage.getItem(GUEST_COMPLETED_KEY);
    return (!!draft && draft.trim() !== GUEST_DRAFT_PLACEHOLDER.trim() && draft.trim() !== "") || completed === "true";
  } catch {
    return false;
  }
}

export function clearGuestProgress() {
  if (typeof window === "undefined") return;
  try {
    localStorage.removeItem(GUEST_DRAFT_KEY);
    localStorage.removeItem(GUEST_CHECKLIST_KEY);
    localStorage.removeItem(GUEST_COMPLETED_KEY);
  } catch {
    // localStorage indisponível (modo privado etc.) — nada a limpar
  }
}
