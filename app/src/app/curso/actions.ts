"use server";

import { revalidatePath } from "next/cache";
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

export async function saveCourseChecklist(
  phaseNumber: number,
  checklist: ChecklistState,
) {
  const { supabase, userId } = await requireUserId();
  await supabase.from("course_phase_progress").upsert(
    {
      user_id: userId,
      phase_number: phaseNumber,
      checklist,
      updated_at: new Date().toISOString(),
    },
    { onConflict: "user_id,phase_number" },
  );
  revalidatePath(`/curso/${phaseNumber}`);
  revalidatePath("/curso");
}

export async function completeCoursePhase(phaseNumber: number) {
  const { supabase, userId } = await requireUserId();
  await supabase.from("course_phase_progress").upsert(
    {
      user_id: userId,
      phase_number: phaseNumber,
      completed_at: new Date().toISOString(),
    },
    { onConflict: "user_id,phase_number" },
  );
  revalidatePath(`/curso/${phaseNumber}`);
  revalidatePath("/curso");
}
