export function PhaseHeader({
  kicker,
  title,
  subtitle,
  objective,
}: {
  kicker: string;
  title: string;
  subtitle: string;
  objective: string;
}) {
  return (
    <header className="mb-8">
      <div className="text-cyan-400 text-xs font-semibold uppercase tracking-widest mb-2">
        {kicker}
      </div>
      <h1 className="font-display font-semibold text-3xl sm:text-4xl text-white mb-2">{title}</h1>
      <p className="text-zinc-400 text-sm sm:text-base">{subtitle}</p>
      <div className="mt-4 bg-[#141417] border border-[#2a2a2f] rounded-lg p-4 text-sm text-zinc-400">
        <span className="text-amber-400 font-semibold">Objetivo da etapa:</span>{" "}
        {objective}
      </div>
    </header>
  );
}
