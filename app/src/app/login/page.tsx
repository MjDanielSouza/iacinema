import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { LoginCard } from "./login-card";

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ next?: string }>;
}) {
  const { next } = await searchParams;
  const safeNext = next && next.startsWith("/") ? next : "/dashboard";

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (user) {
    redirect(safeNext);
  }

  return (
    <main className="min-h-screen bg-[#0c0c0b] text-[#F2EFE9] flex items-center justify-center px-4">
      <LoginCard next={safeNext} />
    </main>
  );
}
