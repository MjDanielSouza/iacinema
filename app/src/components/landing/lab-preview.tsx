const SIDEBAR_ITEMS = ["Roteiro", "Referências", "Assets", "Cena", "Pós"];

function Tag({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center rounded-pill px-2 py-0.5 bg-lime/[0.14] border border-lime/35 text-lime font-technical text-[11px] uppercase tracking-wide">
      {children}
    </span>
  );
}

export function LabPreview() {
  return (
    <div className="mt-6 border border-border-default rounded-lg bg-bg-raised overflow-hidden">
      <p className="font-technical text-[11px] uppercase tracking-[0.14em] text-lime px-5 pt-4 pb-2">
        [LAB 01] — PRÉVIA DE INTERFACE
      </p>
      <div className="grid sm:grid-cols-[220px_1fr] border-t border-border-subtle">
        <aside className="bg-bg-deep p-3 flex sm:flex-col gap-1 overflow-x-auto sm:overflow-visible">
          {SIDEBAR_ITEMS.map((item) => (
            <div
              key={item}
              className={`shrink-0 px-3 py-2 rounded-sm text-sm font-medium whitespace-nowrap ${
                item === "Roteiro" ? "bg-surface-card-elevated text-title" : "text-muted"
              }`}
            >
              {item}
            </div>
          ))}
        </aside>
        <div className="p-5">
          <p className="font-technical text-xs uppercase tracking-wide text-muted mb-3">
            [SC-01] — INT. CAFÉ - NOITE
          </p>
          <p className="text-sm text-subtitle leading-relaxed mb-5">
            <Tag>PERSONAGEM: ELENA</Tag> entra, sacode a chuva do{" "}
            <Tag>FIGURINO: TRENCH COAT BEGE</Tag>. A cena é banhada por{" "}
            <Tag>LUZ: TUNGSTÊNIO 3200K</Tag> vindo do balcão.
          </p>
          <p className="font-technical text-[11px] uppercase tracking-wide text-muted mb-2">
            Lista de necessidades gerada
          </p>
          <div className="flex flex-col gap-1.5">
            {["1 personagem — Elena", "1 figurino — trench coat bege", "1 locação — café, período noturno"].map(
              (item) => (
                <span
                  key={item}
                  className="font-technical text-xs bg-surface-card-elevated border border-border-default rounded-xs px-2 py-1 text-subtitle w-fit"
                >
                  {item}
                </span>
              ),
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
