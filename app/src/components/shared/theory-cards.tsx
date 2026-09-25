import { ACCENT_CLASSES, type TheoryCard } from "@/lib/phases";

export function TheoryCards({ cards }: { cards: TheoryCard[] }) {
  return (
    <div className="grid sm:grid-cols-2 gap-4 mb-10">
      {cards.map((c) => (
        <div
          key={c.title}
          className="bg-[#141417] border border-[#2a2a2f] rounded-xl p-4"
        >
          <div className={`font-semibold text-sm mb-2 ${ACCENT_CLASSES[c.accent]}`}>
            {c.title}
          </div>
          <p className="text-sm text-zinc-400">{c.body}</p>
        </div>
      ))}
    </div>
  );
}
