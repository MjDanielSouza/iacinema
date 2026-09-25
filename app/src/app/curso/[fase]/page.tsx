import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { getPhase, PHASES } from "@/lib/phases";
import { PhaseHeader } from "@/components/shared/phase-header";
import { PromptBox } from "@/components/shared/prompt-box";
import { TheoryCards } from "@/components/shared/theory-cards";
import { ChecklistGate } from "@/components/shared/checklist-gate";
import { AppHeader } from "@/components/shared/app-header";
import { CourseLab } from "@/components/course/course-lab";
import { GuestFase1Draft } from "@/components/course/labs/guest-fase1-draft";
import { GuestImportBanner } from "@/components/course/guest-import-banner";
import { saveCourseChecklist, completeCoursePhase } from "../actions";
import type { ChecklistState } from "@/lib/supabase/database.types";

export default async function CursoFasePage({
  params,
}: {
  params: Promise<{ fase: string }>;
}) {
  const { fase } = await params;
  const phaseNumber = Number(fase);
  const phase = getPhase(phaseNumber);
  if (!phase) notFound();

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user && phaseNumber > 1) {
    redirect(`/login?next=/curso/${phaseNumber}`);
  }

  const isGuest = !user && phaseNumber === 1;

  let checklist: ChecklistState = [false, false, false];
  let completed = false;

  if (user) {
    const { data } = await supabase
      .from("course_phase_progress")
      .select("checklist, completed_at")
      .eq("user_id", user.id)
      .eq("phase_number", phaseNumber)
      .maybeSingle();
    if (data) {
      checklist = data.checklist;
      completed = !!data.completed_at;
    }
  }

  const nextPhase = PHASES.find((p) => p.number === phaseNumber + 1);

  return (
    <>
      <AppHeader
        authed={!!user}
        backHref="/curso"
        backLabel="Todas as fases"
        currentLabel={`Fase 0${phase.number} — ${phase.subtitle}`}
      />
      <main className="min-h-screen bg-bg-base text-zinc-300 px-4 py-12">
      <div className="max-w-4xl mx-auto">
        {isGuest && (
          <div className="mb-8 flex items-center justify-between gap-3 flex-wrap border border-lime/30 bg-lime/[0.06] px-4 py-2.5">
            <span className="font-tech text-[10px] uppercase tracking-widest text-lime">
              [MODO VISITANTE // SALVAMENTO LOCAL ATIVO]
            </span>
            <Link
              href="/"
              className="font-tech text-[10px] uppercase tracking-widest text-muted hover:text-title transition-colors duration-100"
            >
              &larr; Voltar para a Home
            </Link>
          </div>
        )}

        {user && <GuestImportBanner />}

        <PhaseHeader
          kicker={phase.kicker}
          title={phase.title}
          subtitle={phase.subtitle}
          objective={phase.objective}
        />

        <div className="mb-10">
          <PromptBox text={phase.imagePrompt} />
        </div>

        <TheoryCards cards={phase.theoryCards} />

        <CourseLab phaseNumber={phase.number} />

        {isGuest && <GuestFase1Draft />}

        {user ? (
          <ChecklistGate
            items={phase.checklistItems}
            initialChecklist={checklist}
            initialCompleted={completed}
            onSaveChecklist={saveCourseChecklist.bind(null, phaseNumber)}
            onComplete={completeCoursePhase.bind(null, phaseNumber)}
            completeLabel={`Concluir Fase ${phase.number}`}
            afterComplete={
              <div className="bg-gradient-to-r from-lime/20 to-lime/20 border border-lime rounded-lg p-4 text-sm text-lime flex items-center justify-between gap-4 flex-wrap">
                <span>Fase {phase.number} concluída.</span>
                {nextPhase ? (
                  <Link
                    href={`/curso/${nextPhase.number}`}
                    className="text-xs font-semibold text-lime underline"
                  >
                    Ir para a Fase {nextPhase.number} →
                  </Link>
                ) : (
                  <span className="text-xs font-semibold">
                    Você concluiu o curso 🎬
                  </span>
                )}
              </div>
            }
          />
        ) : isGuest ? (
          <ChecklistGate
            guestMode
            items={phase.checklistItems}
            initialChecklist={checklist}
            initialCompleted={completed}
            completeLabel={`Concluir Fase ${phase.number}`}
            checkpointLoginHref="/login?intent=migrate_fase1&next=/curso/2"
          />
        ) : (
          <div className="bg-surface-card border border-white/10 rounded-xl p-5 text-sm text-zinc-400 text-center">
            <Link href="/login" className="text-lime underline">
              Entre com sua conta
            </Link>{" "}
            para marcar o checklist e salvar seu progresso.
          </div>
        )}
      </div>
      </main>
    </>
  );
}
