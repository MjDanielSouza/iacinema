import { createClient } from "@/lib/supabase/server";
import { Header } from "@/components/landing/header";
import { Hero } from "@/components/landing/hero";
import { Method } from "@/components/landing/method";
import { Phases } from "@/components/landing/phases";
import { CourseBento } from "@/components/landing/course-bento";
import { Community } from "@/components/landing/community";
import { Principles } from "@/components/landing/principles";
import { GoldenRule } from "@/components/landing/golden-rule";
import { FinalCta } from "@/components/landing/final-cta";
import { Footer } from "@/components/landing/footer";

export default async function Home() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const navHref = user ? "/dashboard" : "/login";
  const navLabel = user ? "Dashboard" : "Entrar";

  const primaryHref = user ? "/dashboard" : "/curso/1";
  const primaryLabel = user ? "Ir para o Dashboard" : "Começar Fase 1 Agora — Grátis";

  const communityHref = user ? "/projetos" : "/login?next=/projetos";

  return (
    <main className="bg-bg-base text-body overflow-x-hidden">
      <Header navHref={navHref} navLabel={navLabel} />
      <Hero primaryHref={primaryHref} primaryLabel={primaryLabel} />
      <Method />
      <Phases />
      <CourseBento />
      <Community communityHref={communityHref} />
      <Principles />
      <GoldenRule />
      <FinalCta primaryHref={primaryHref} primaryLabel={primaryLabel} />
      <Footer user={!!user} navHref={navHref} />
    </main>
  );
}
