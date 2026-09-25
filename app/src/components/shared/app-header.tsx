import Link from "next/link";
import { SignOutButton } from "./sign-out-button";

export function AppHeader({
  backHref,
  backLabel,
  userName,
  avatarUrl,
  authed,
}: {
  backHref?: string;
  backLabel?: string;
  userName?: string | null;
  avatarUrl?: string | null;
  authed: boolean;
}) {
  return (
    <header className="sticky top-0 z-40 bg-[#0c0c0b]/95 backdrop-blur-sm border-b border-line">
      <div className="max-w-5xl mx-auto flex divide-x divide-line border-x border-line">
        <Link href={authed ? "/dashboard" : "/"} className="px-5 h-12 flex items-center gap-2 shrink-0">
          <span className="font-semibold text-sm">Pipeline.</span>
        </Link>

        {backHref && backLabel && (
          <Link
            href={backHref}
            className="hidden sm:flex items-center px-5 font-tech text-[10px] uppercase tracking-widest text-muted hover:text-[#F2EFE9] transition-colors duration-100 truncate max-w-xs"
          >
            &larr; {backLabel}
          </Link>
        )}

        <div className="flex-1" />

        {authed ? (
          <>
            {userName && (
              <span className="hidden md:flex items-center px-5 font-tech text-[10px] uppercase tracking-widest text-muted truncate max-w-[160px]">
                {userName}
              </span>
            )}
            {avatarUrl && (
              <span className="hidden sm:flex items-center px-3">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={avatarUrl} alt="" className="w-6 h-6 border border-line" />
              </span>
            )}
            <span className="flex items-center px-4 shrink-0">
              <SignOutButton />
            </span>
          </>
        ) : (
          <Link
            href="/login"
            className="flex items-center px-6 font-tech text-xs uppercase tracking-wider bg-[#F2EFE9] text-[#0c0c0b] hover:bg-amber-400 transition-colors duration-100 shrink-0"
          >
            Entrar
          </Link>
        )}
      </div>

      {backHref && backLabel && (
        <div className="sm:hidden max-w-5xl mx-auto px-5 py-2 border-t border-line">
          <Link href={backHref} className="font-tech text-[10px] uppercase tracking-widest text-muted">
            &larr; {backLabel}
          </Link>
        </div>
      )}
    </header>
  );
}
