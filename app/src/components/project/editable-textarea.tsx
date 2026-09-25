"use client";

import { useEffect, useRef, useState, useTransition } from "react";

export function EditableTextarea({
  initialValue,
  placeholder,
  label,
  rows = 8,
  onSave,
}: {
  initialValue: string;
  placeholder: string;
  label: string;
  rows?: number;
  onSave: (value: string) => Promise<void>;
}) {
  const [value, setValue] = useState(initialValue);
  const [status, setStatus] = useState<"idle" | "saving" | "saved">("idle");
  const [, startTransition] = useTransition();
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  function handleChange(next: string) {
    setValue(next);
    setStatus("idle");
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => {
      setStatus("saving");
      startTransition(async () => {
        await onSave(next);
        setStatus("saved");
      });
    }, 800);
  }

  return (
    <div className="bg-[#141417] border border-[#2a2a2f] rounded-xl p-4">
      <div className="flex items-center justify-between mb-2">
        <span className="text-xs uppercase tracking-wider text-zinc-500 font-semibold">
          {label}
        </span>
        <span className="text-[11px] text-zinc-600">
          {status === "saving" && "Salvando..."}
          {status === "saved" && "Salvo ✓"}
        </span>
      </div>
      <textarea
        value={value}
        onChange={(e) => handleChange(e.target.value)}
        placeholder={placeholder}
        rows={rows}
        className="w-full bg-[#0d0d10] border border-[#2a2a2f] rounded-lg p-3 text-sm text-zinc-200 leading-relaxed resize-y focus:outline-none focus:border-cyan-700"
      />
    </div>
  );
}
