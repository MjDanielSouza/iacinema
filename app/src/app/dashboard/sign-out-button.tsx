"use client";

import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

export function SignOutButton() {
  const router = useRouter();

  async function handleSignOut() {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push("/login");
    router.refresh();
  }

  return (
    <button
      onClick={handleSignOut}
      className="text-xs text-zinc-500 hover:text-zinc-300 border border-[#2a2a2f] rounded-lg px-3 py-2 transition-colors"
    >
      Sair
    </button>
  );
}
