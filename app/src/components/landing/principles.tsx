const ITEMS = [
  {
    n: "01",
    title: "Raccord de verdade",
    body: "Character sheets por cena garantem que seu personagem não troque de roupa sozinho entre um plano e outro.",
  },
  {
    n: "02",
    title: "Prompt de vídeo sem redundância",
    body: "A regra de ouro: nunca redescrever o que a IA já recebeu como referência visual — só blocking, câmera e diálogo.",
  },
  {
    n: "03",
    title: "Processo, não sorte",
    body: "Um pipeline repetível, documentado, que escala de uma cena de teste até um curta inteiro.",
  },
];

export function Principles() {
  return (
    <section style={{ paddingBottom: "var(--section-spacing)" }}>
      <div className="max-w-[1240px] mx-auto px-[clamp(20px,4vw,48px)]">
        <div className="scroll-reveal-stagger grid sm:grid-cols-3 divide-y sm:divide-y-0 sm:divide-x divide-border-subtle border border-border-default rounded-lg">
          {ITEMS.map((item) => (
            <div key={item.n} className="p-8 sm:p-10">
              <p className="font-editorial mb-4" style={{ fontSize: "clamp(2rem, 3vw, 2.75rem)" }}>
                {item.n}/03
              </p>
              <p className="font-display font-semibold text-lg text-title mb-3">{item.title}</p>
              <p className="text-sm text-body leading-relaxed">{item.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
