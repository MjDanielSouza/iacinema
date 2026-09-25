import { addProjectPrompt, deleteProjectAsset } from "@/app/projetos/actions";
import { PromptAssetItem } from "./prompt-asset-item";

interface PromptItem {
  id: string;
  label: string | null;
  prompt_text: string;
}

export function PromptComposer({
  projectId,
  phaseNumber,
  prompts,
}: {
  projectId: string;
  phaseNumber: number;
  prompts: PromptItem[];
}) {
  return (
    <div className="bg-[#0D0E12] border border-white/10 rounded-xl p-4">
      <span className="text-xs uppercase tracking-wider text-zinc-500 font-semibold block mb-3">
        Prompts desta Fase
      </span>

      {prompts.length > 0 && (
        <div className="space-y-2 mb-4">
          {prompts.map((p) => (
            <PromptAssetItem
              key={p.id}
              label={p.label}
              text={p.prompt_text}
              deleteAction={deleteProjectAsset.bind(null, p.id, projectId, phaseNumber, null)}
            />
          ))}
        </div>
      )}

      <form action={addProjectPrompt} className="flex flex-col gap-2">
        <input type="hidden" name="projectId" value={projectId} />
        <input type="hidden" name="phaseNumber" value={phaseNumber} />
        <input
          type="text"
          name="label"
          placeholder="Título do prompt (opcional)"
          className="bg-[#050507] border border-white/10 rounded-lg px-3 py-2 text-xs text-zinc-200"
        />
        <textarea
          name="promptText"
          rows={3}
          placeholder="Cole ou escreva o prompt desta fase..."
          required
          className="bg-[#050507] border border-white/10 rounded-lg px-3 py-2 text-xs text-zinc-200 resize-y"
        />
        <button className="self-start px-4 py-2 rounded-lg bg-amber-500 text-[#050507] font-semibold text-xs">
          Salvar prompt
        </button>
      </form>
    </div>
  );
}
