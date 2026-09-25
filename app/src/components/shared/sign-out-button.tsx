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
      className="font-tech text-[10px] uppercase tracking-widest text-muted hover:text-[#F2EFE9] border border-line px-3 py-1.5 transition-colors duration-100"
    >
      Sair
    </button>
  );
}
