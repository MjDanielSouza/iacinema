export function AngularDivider({
  accent = true,
  className = "",
}: {
  accent?: boolean;
  className?: string;
}) {
  return (
    <div className={`relative w-full h-8 ${className}`} aria-hidden="true">
      <svg viewBox="0 0 1200 32" preserveAspectRatio="none" className="absolute inset-0 w-full h-full">
        <path
          d="M0 18 L500 18 L525 6 L675 6 L700 18 L1200 18"
          fill="none"
          stroke="var(--border-hairline-white)"
          strokeWidth="1"
          vectorEffect="non-scaling-stroke"
        />
        {accent && (
          <path
            d="M480 26 L1200 26"
            fill="none"
            stroke="var(--accent-red)"
            strokeWidth="1"
            vectorEffect="non-scaling-stroke"
          />
        )}
      </svg>
    </div>
  );
}
