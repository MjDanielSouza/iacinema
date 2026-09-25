import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { getPhase, PHASES } from "@/lib/phases";
import { PhaseHeader } from "@/components/shared/phase-header";
import { PromptBox } from "@/components/shared/prompt-box";
import { ChecklistGate } from "@/components/shared/checklist-gate";
import { EditableTextarea } from "@/components/project/editable-textarea";
import { ImageGallery } from "@/components/project/image-gallery";
import { PromptComposer } from "@/components/project/prompt-composer";
import {
  saveProjectPhaseText,
  saveProjectPhaseChecklist,
  completeProjectPhase,
} from "@/app/projetos/actions";
import type { ChecklistState } from "@/lib/supabase/database.types";

export default async function ProjectPhasePage({
  params,
}: {
  params: Promise<{ id: string; numero: string }>;
}) {
  const { id, numero } = await params;
  const phaseNumber = Number(numero);
  const phase = getPhase(phaseNumber);
  if (!phase) notFound();

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect(`/login?next=/projetos/${id}/fase/${phaseNumber}`);

  const { data: project } = await supabase
    .from("projects")
    .select("id, name")
    .eq("id", id)
    .maybeSingle();
  if (!project) notFound();

  const { data: phaseRow } = await supabase
    .from("project_phases")
    .select("script_text, notes, checklist, completed_at")
    .eq("project_id", id)
    .eq("phase_number", phaseNumber)
    .maybeSingle();

  const { data: assets } = await supabase
    .from("project_assets")
    .select("id, kind, label, storage_path, prompt_text")
    .eq("project_id", id)
    .eq("phase_number", phaseNumber)
    .order("created_at", { ascending: false });

  const images = (assets ?? [])
    .filter((a) => a.kind === "image" && a.storage_path)
    .map((a) => ({
      id: a.id,
      label: a.label,
      url: supabase.storage.from("project-assets").getPublicUrl(a.storage_path!).data
        .publicUrl,
    }));

  const prompts = (assets ?? [])
    .filter((a) => a.kind === "prompt" && a.prompt_text)
    .map((a) => ({ id: a.id, label: a.label, prompt_text: a.prompt_text! }));

  const checklist: ChecklistState = phaseRow?.checklist ?? [false, false, false];
  const completed = !!phaseRow?.completed_at;
  const nextPhase = PHASES.find((p) => p.number === phaseNumber + 1);

  return (
    <main className="min-h-screen bg-[#0a0a0c] text-zinc-300 px-4 py-10">
      <div className="max-w-4xl mx-auto">
        <Link
          href={`/projetos/${id}`}
          className="text-xs text-zinc-500 hover:text-zinc-300 mb-6 inline-block"
        >
          ← {project.name}
        </Link>

        <PhaseHeader
          kicker={phase.kicker}
          title={phase.title}
          subtitle={phase.subtitle}
          objective={phase.objective}
        />

        <div className="mb-10">
          <PromptBox
            text={phase.imagePrompt}
            label="Prompt de Imagem de Referência (exemplo do curso)"
          />
        </div>

        <div className="mb-10">
          {phaseNumber === 1 ? (
            <EditableTextarea
              label="Roteiro"
              placeholder="Cole aqui o texto do roteiro deste projeto..."
              initialValue={phaseRow?.script_text ?? ""}
              rows={16}
              onSave={saveProjectPhaseText.bind(null, id, phaseNumber, "script_text")}
            />
          ) : (
            <div className="grid md:grid-cols-2 gap-4">
              <ImageGallery projectId={id} phaseNumber={phaseNumber} images={images} />
              <PromptComposer projectId={id} phaseNumber={phaseNumber} prompts={prompts} />
            </div>
          )}
        </div>

        <ChecklistGate
          items={phase.checklistItems}
          initialChecklist={checklist}
          initialCompleted={completed}
          onSaveChecklist={saveProjectPhaseChecklist.bind(null, id, phaseNumber)}
          onComplete={completeProjectPhase.bind(null, id, phaseNumber)}
          completeLabel={`Concluir Fase ${phaseNumber}`}
          afterComplete={
            <div className="bg-gradient-to-r from-amber-500/20 to-cyan-500/20 border border-amber-500 rounded-lg p-4 text-sm text-amber-200 flex items-center justify-between gap-4 flex-wrap">
              <span>Fase {phaseNumber} concluída.</span>
              {nextPhase ? (
                <Link
                  href={`/projetos/${id}/fase/${nextPhase.number}`}
                  className="text-xs font-semibold text-amber-300 underline"
                >
                  Ir para a Fase {nextPhase.number} →
                </Link>
              ) : (
                <Link
                  href={`/projetos/${id}`}
                  className="text-xs font-semibold text-amber-300 underline"
                >
                  Ver resumo do projeto →
                </Link>
              )}
            </div>
          }
        />
      </div>
    </main>
  );
}
