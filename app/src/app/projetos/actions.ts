"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import type { ChecklistState } from "@/lib/supabase/database.types";

async function requireUserId() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) throw new Error("Não autenticado.");
  return { supabase, userId: user.id };
}

export async function createProject(formData: FormData) {
  const { supabase, userId } = await requireUserId();
  const name = String(formData.get("name") ?? "").trim();
  if (!name) return;

  const { data: profile } = await supabase
    .from("profiles")
    .select("project_limit")
    .eq("id", userId)
    .single();

  const { count } = await supabase
    .from("projects")
    .select("id", { count: "exact", head: true })
    .eq("owner_id", userId);

  const limit = profile?.project_limit ?? 1;
  if ((count ?? 0) >= limit) {
    redirect("/projetos?erro=limite");
  }

  const { data: project, error } = await supabase
    .from("projects")
    .insert({ name, owner_id: userId })
    .select("id")
    .single();

  if (error || !project) {
    redirect("/projetos?erro=criar");
  }

  revalidatePath("/projetos");
  redirect(`/projetos/${project.id}`);
}

export async function saveProjectPhaseText(
  projectId: string,
  phaseNumber: number,
  field: "script_text" | "notes",
  value: string,
) {
  const { supabase } = await requireUserId();
  await supabase.from("project_phases").upsert(
    {
      project_id: projectId,
      phase_number: phaseNumber,
      [field]: value,
      updated_at: new Date().toISOString(),
    },
    { onConflict: "project_id,phase_number" },
  );
  revalidatePath(`/projetos/${projectId}/fase/${phaseNumber}`);
}

export async function saveProjectPhaseChecklist(
  projectId: string,
  phaseNumber: number,
  checklist: ChecklistState,
) {
  const { supabase } = await requireUserId();
  await supabase.from("project_phases").upsert(
    {
      project_id: projectId,
      phase_number: phaseNumber,
      checklist,
      updated_at: new Date().toISOString(),
    },
    { onConflict: "project_id,phase_number" },
  );
  revalidatePath(`/projetos/${projectId}/fase/${phaseNumber}`);
}

export async function completeProjectPhase(projectId: string, phaseNumber: number) {
  const { supabase } = await requireUserId();
  await supabase.from("project_phases").upsert(
    {
      project_id: projectId,
      phase_number: phaseNumber,
      completed_at: new Date().toISOString(),
    },
    { onConflict: "project_id,phase_number" },
  );
  revalidatePath(`/projetos/${projectId}/fase/${phaseNumber}`);
  revalidatePath(`/projetos/${projectId}`);
}

export async function uploadProjectImage(formData: FormData) {
  const { supabase, userId } = await requireUserId();
  const projectId = String(formData.get("projectId"));
  const phaseNumber = Number(formData.get("phaseNumber"));
  const label = String(formData.get("label") ?? "").trim();
  const file = formData.get("file") as File | null;

  if (!file || file.size === 0) return;

  const ext = file.name.split(".").pop() ?? "png";
  const path = `${projectId}/${phaseNumber}/${crypto.randomUUID()}.${ext}`;

  const { error: uploadError } = await supabase.storage
    .from("project-assets")
    .upload(path, file, { contentType: file.type });

  if (!uploadError) {
    await supabase.from("project_assets").insert({
      project_id: projectId,
      phase_number: phaseNumber,
      kind: "image",
      label: label || file.name,
      storage_path: path,
      created_by: userId,
    });
  }

  revalidatePath(`/projetos/${projectId}/fase/${phaseNumber}`);
}

export async function addProjectPrompt(formData: FormData) {
  const { supabase, userId } = await requireUserId();
  const projectId = String(formData.get("projectId"));
  const phaseNumber = Number(formData.get("phaseNumber"));
  const label = String(formData.get("label") ?? "").trim();
  const promptText = String(formData.get("promptText") ?? "").trim();

  if (!promptText) return;

  await supabase.from("project_assets").insert({
    project_id: projectId,
    phase_number: phaseNumber,
    kind: "prompt",
    label: label || null,
    prompt_text: promptText,
    created_by: userId,
  });

  revalidatePath(`/projetos/${projectId}/fase/${phaseNumber}`);
}

export async function deleteProjectAsset(
  assetId: string,
  projectId: string,
  phaseNumber: number,
  storagePath: string | null,
) {
  const { supabase } = await requireUserId();
  if (storagePath) {
    await supabase.storage.from("project-assets").remove([storagePath]);
  }
  await supabase.from("project_assets").delete().eq("id", assetId);
  revalidatePath(`/projetos/${projectId}/fase/${phaseNumber}`);
}

export async function addProjectMember(formData: FormData) {
  const { supabase } = await requireUserId();
  const projectId = String(formData.get("projectId"));
  const email = String(formData.get("email") ?? "").trim().toLowerCase();
  if (!email) return;

  const { data: targetProfile } = await supabase
    .from("profiles")
    .select("id")
    .eq("email", email)
    .maybeSingle();

  if (!targetProfile) {
    redirect(`/projetos/${projectId}?erro=usuario_nao_encontrado`);
  }

  await supabase.from("project_members").insert({
    project_id: projectId,
    user_id: targetProfile.id,
    role: "editor",
  });

  revalidatePath(`/projetos/${projectId}`);
}

export async function removeProjectMember(projectId: string, userId: string) {
  const { supabase } = await requireUserId();
  await supabase
    .from("project_members")
    .delete()
    .eq("project_id", projectId)
    .eq("user_id", userId);
  revalidatePath(`/projetos/${projectId}`);
}
