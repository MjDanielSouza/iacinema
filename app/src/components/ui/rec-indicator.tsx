export function RecIndicator({
  label = "REC",
  delayMs,
  className = "",
}: {
  label?: string;
  delayMs?: number;
  className?: string;
}) {
  return (
    <span className={`inline-flex items-center gap-2 font-technical text-xs uppercase tracking-[0.14em] text-subtitle ${className}`}>
      <span
        className="w-2 h-2 rounded-full bg-red rec-pulse shrink-0"
        style={delayMs ? { animationDelay: `${delayMs}ms` } : undefined}
        aria-hidden="true"
      />
      {label}
    </span>
  );
}
