"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import type { Plan, Role } from "@/lib/supabase/database.types";

export async function updateUserPermissions(
  targetUserId: string,
  updates: { role: Role; plan: Plan; project_limit: number },
) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) throw new Error("Não autenticado.");

  const { data: myProfile } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", user.id)
    .maybeSingle();

  if (myProfile?.role !== "admin") {
    throw new Error("Só administradores podem alterar permissões.");
  }

  const projectLimit = Number.isFinite(updates.project_limit)
    ? Math.max(0, Math.trunc(updates.project_limit))
    : 1;

  await supabase
    .from("profiles")
    .update({ role: updates.role, plan: updates.plan, project_limit: projectLimit })
    .eq("id", targetUserId);

  revalidatePath("/admin");
}
